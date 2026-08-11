import React, { useState } from 'react';
import { useAdminAuth } from './context/AdminAuthContext';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  BookOpen, 
  MessageSquare, 
  Folder, 
  Globe, 
  ShieldCheck, 
  LogOut,
  ExternalLink,
  Lock
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import ProfileManager from './pages/ProfileManager';
import ProjectsManager from './pages/ProjectsManager';
import InsightsManager from './pages/InsightsManager';
import MessagesManager from './pages/MessagesManager';
import MediaLibrary from './pages/MediaLibrary';
import SEOManager from './pages/SEOManager';
import SecurityCenter from './pages/SecurityCenter';

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'profile', label: 'Profile & Skills', icon: <User size={18} /> },
    { id: 'projects', label: 'Projects CMS', icon: <Briefcase size={18} /> },
    { id: 'insights', label: 'Articles CMS', icon: <BookOpen size={18} /> },
    { id: 'messages', label: 'Messages Inbox', icon: <MessageSquare size={18} /> },
    { id: 'media', label: 'Media Library', icon: <Folder size={18} /> },
    { id: 'seo', label: 'SEO Settings', icon: <Globe size={18} /> },
    { id: 'security', label: 'Security Center', icon: <ShieldCheck size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'profile': return <ProfileManager />;
      case 'projects': return <ProjectsManager />;
      case 'insights': return <InsightsManager />;
      case 'messages': return <MessagesManager />;
      case 'media': return <MediaLibrary />;
      case 'seo': return <SEOManager />;
      case 'security': return <SecurityCenter />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f1117', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#161922', borderRight: '1px solid #232733', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
        <div>
          {/* Logo / Admin Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #232733' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(184, 255, 53, 0.15)', color: '#b8ff35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em', color: '#f8fafc' }}>PORTFOLIO CMS</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Admin</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: active ? '#b8ff35' : 'transparent',
                    color: active ? '#0b0b0b' : '#94a3b8',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid #232733', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: '#1e2330',
              color: '#94a3b8',
              fontSize: '0.8rem',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            <span>View Public Site</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              justifyContent: 'center'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Bar */}
        <header style={{ height: '64px', backgroundColor: '#161922', borderBottom: '1px solid #232733', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>
            Session Status: <span style={{ color: '#22c55e' }}>● Authenticated</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{user?.email || 'admin@arjun.dev'}</div>
              <div style={{ fontSize: '0.7rem', color: '#b8ff35', fontWeight: 700 }}>{user?.role || 'SUPER_ADMIN'}</div>
            </div>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#b8ff35', color: '#0b0b0b', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              A
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>

    </div>
  );
}
