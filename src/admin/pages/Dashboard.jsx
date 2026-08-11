import React, { useEffect, useState } from 'react';
import { Briefcase, BookOpen, MessageSquare, ShieldCheck, Activity, ArrowUpRight, Lock } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    projectsCount: 0,
    articlesCount: 0,
    messagesCount: 0,
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
      const security = secRes.ok ? await secRes.json() : { mfaEnabled: false, activeSessionsCount: 1 };

      const auditRes = await fetch('/api/admin/security/audit-logs');
      const logs = auditRes.ok ? await auditRes.json() : { auditLogs: [] };

      setStats({
        projectsCount: projects.projects ? projects.projects.length : 0,
        articlesCount: articles.articles ? articles.articles.length : 0,
        messagesCount: messages.messages ? messages.messages.filter(m => m.status === 'UNREAD').length : 0,
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
    { title: 'TOTAL PROJECTS', value: stats.projectsCount, label: 'Case studies & work', icon: <Briefcase size={22} color="#b8ff35" />, tab: 'projects' },
    { title: 'PUBLISHED ARTICLES', value: stats.articlesCount, label: 'Technical insights', icon: <BookOpen size={22} color="#60a5fa" />, tab: 'insights' },
    { title: 'UNREAD MESSAGES', value: stats.messagesCount, label: 'Contact inbox', icon: <MessageSquare size={22} color="#f59e0b" />, tab: 'messages' },
    { title: 'MFA SECURITY STATUS', value: stats.mfaEnabled ? 'ENABLED' : 'DISABLED', label: `${stats.activeSessions} Active Sessions`, icon: <ShieldCheck size={22} color={stats.mfaEnabled ? '#22c55e' : '#ef4444'} />, tab: 'security' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.8rem 2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            ADMINISTRATION DASHBOARD
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            System Status: All security boundaries active & operational.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('projects')}
            style={{ padding: '0.65rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            + Add Project <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(card.tab)}
            style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '12px', padding: '1.4rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: '#94a3b8' }}>{card.title}</span>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#1e2330' }}>{card.icon}</div>
            </div>

            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.5rem' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Audit Feed */}
      <div style={{ backgroundColor: '#161922', border: '1px solid #232733', borderRadius: '14px', padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#b8ff35" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>SECURITY & ACTIVITY AUDIT FEED</h3>
          </div>
          <button
            onClick={() => onNavigate('security')}
            style={{ background: 'none', border: 'none', color: '#b8ff35', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
          >
            View All Security Audit Logs →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stats.auditLogs.map((log) => (
            <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1e2330', borderRadius: '8px', border: '1px solid #282e3f' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(184, 255, 53, 0.15)', color: '#b8ff35', marginRight: '10px' }}>
                  {log.event}
                </span>
                <span style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 500 }}>
                  {log.details}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
