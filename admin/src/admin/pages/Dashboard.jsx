import React, { useEffect, useState } from 'react';
import { Briefcase, BookOpen, MessageSquare, ShieldCheck, Activity, ArrowUpRight, Lock, Eye } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    projectsCount: 0,
    articlesCount: 0,
    messagesCount: 0,
    visitsCount: 0,
    mfaEnabled: false,
    activeSessions: 1,
    auditLogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [projRes, artRes, msgRes, secRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/articles'),
        fetch('/api/admin/messages'),
        fetch('/api/admin/security/stats')
      ]);

      const projects = projRes.ok ? await projRes.json() : { projects: [] };
      const articles = artRes.ok ? await artRes.json() : { articles: [] };
      const messages = msgRes.ok ? await msgRes.json() : { messages: [] };
      const security = secRes.ok ? await secRes.json() : { mfaEnabled: false, activeSessionsCount: 1, visitsCount: 0 };

      const auditRes = await fetch('/api/admin/security/audit-logs');
      const logs = auditRes.ok ? await auditRes.json() : { auditLogs: [] };

      setStats({
        projectsCount: projects.projects ? projects.projects.length : 0,
        articlesCount: articles.articles ? articles.articles.length : 0,
        messagesCount: messages.messages ? messages.messages.filter(m => m.status === 'UNREAD').length : 0,
        visitsCount: security.visitsCount !== undefined ? security.visitsCount : 0,
        mfaEnabled: security.mfaEnabled,
        activeSessions: security.activeSessionsCount,
        auditLogs: logs.auditLogs ? logs.auditLogs.slice(0, 6) : []
      });
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'PUBLIC SITE VISITS', value: Number(stats.visitsCount || 0).toLocaleString(), label: 'Total public page views', icon: <Eye size={22} color="#00d9ff" />, tab: 'dashboard' },
    { title: 'TOTAL PROJECTS', value: stats.projectsCount, label: 'Case studies & work', icon: <Briefcase size={22} color="#00d9ff" />, tab: 'projects' },
    { title: 'PUBLISHED ARTICLES', value: stats.articlesCount, label: 'Technical insights', icon: <BookOpen size={22} color="#60a5fa" />, tab: 'insights' },
    { title: 'UNREAD MESSAGES', value: stats.messagesCount, label: 'Contact inbox', icon: <MessageSquare size={22} color="#ffc857" />, tab: 'messages' },
    { title: 'MFA SECURITY STATUS', value: stats.mfaEnabled ? 'ENABLED' : 'DISABLED', label: `${stats.activeSessions} Active Sessions`, icon: <ShieldCheck size={22} color={stats.mfaEnabled ? '#00e676' : '#ed1d24'} />, tab: 'security' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div style={{ backgroundColor: '#0d1117', border: '1px solid #252b33', borderRadius: '6px', padding: '1.8rem 2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f5f7fa', margin: 0, fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
            STARK HUD // <span style={{ color: '#00d9ff' }}>ADMINISTRATION COMMAND</span>
          </h1>
          <p style={{ color: '#8b95a5', fontSize: '0.85rem', marginTop: '0.3rem', fontFamily: 'var(--font-mono)' }}>
            SYS_STATUS: ALL SECURITY BOUNDARIES ACTIVE & OPERATIONAL
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('projects')}
            style={{ padding: '0.65rem 1.4rem', borderRadius: '4px', border: 'none', backgroundColor: '#00d9ff', color: '#050608', fontWeight: 800, fontSize: '0.82rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            + ADD PROJECT <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(card.tab)}
            style={{ backgroundColor: '#0d1117', border: '1px solid #252b33', borderRadius: '6px', padding: '1.4rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: '#8b95a5', fontFamily: 'var(--font-mono)' }}>{card.title}</span>
              <div style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#11161c', border: '1px solid #252b33' }}>{card.icon}</div>
            </div>

            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f5f7fa', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{card.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#58616d', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Audit Feed */}
      <div style={{ backgroundColor: '#0d1117', border: '1px solid #252b33', borderRadius: '6px', padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#00d9ff" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f5f7fa', margin: 0, fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>SECURITY & ACTIVITY AUDIT FEED</h3>
          </div>
          <button
            onClick={() => onNavigate('security')}
            style={{ background: 'none', border: 'none', color: '#00d9ff', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', cursor: 'pointer' }}
          >
            View All Security Audit Logs →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stats.auditLogs.map((log) => (
            <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#11161c', borderRadius: '4px', border: '1px solid #252b33' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '3px', backgroundColor: 'rgba(0, 217, 255, 0.12)', color: '#00d9ff', border: '1px solid rgba(0, 217, 255, 0.3)', marginRight: '10px', fontFamily: 'var(--font-mono)' }}>
                  {log.event}
                </span>
                <span style={{ fontSize: '0.88rem', color: '#f5f7fa', fontWeight: 500 }}>
                  {log.details}
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#58616d', fontFamily: 'var(--font-mono)' }}>
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
