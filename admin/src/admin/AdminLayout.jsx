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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050608', color: '#f5f7fa', fontFamily: 'var(--font-body)' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#0d1117', borderRight: '1px solid #252b33', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
        <div>
          {/* Logo / Admin Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #252b33' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'rgba(0, 217, 255, 0.12)', color: '#00d9ff', border: '1px solid rgba(0, 217, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em', color: '#f5f7fa', fontFamily: 'var(--font-display)' }}>
                <span style={{ color: '#00d9ff' }}>ARJUN</span>.DEV
              </div>
              <div style={{ fontSize: '0.65rem', color: '#8b95a5', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}>
                STARK HUD // ADMIN
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                    borderRadius: '4px',
                    border: active ? '1px solid #00d9ff' : '1px solid transparent',
                    backgroundColor: active ? '#00d9ff' : 'transparent',
                    color: active ? '#050608' : '#8b95a5',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
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
        <div style={{ paddingTop: '1rem', borderTop: '1px solid #252b33', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:3000'}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: '#11161c',
              border: '1px solid #252b33',
              color: '#8b95a5',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            <span>VIEW PUBLIC SITE</span>
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
              borderRadius: '4px',
              border: '1px solid rgba(237, 29, 36, 0.4)',
              backgroundColor: 'rgba(237, 29, 36, 0.1)',
              color: '#ed1d24',
              fontWeight: 700,
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              justifyContent: 'center'
            }}
          >
            <LogOut size={15} /> TRANSMIT SIGN OUT
          </button>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Bar */}
        <header style={{ height: '64px', backgroundColor: '#0d1117', borderBottom: '1px solid #252b33', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.8rem', color: '#8b95a5', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
            STATUS: <span style={{ color: '#00e676', fontWeight: 700 }}>● AUTHENTICATED</span> // STARK HUD V4.0
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f5f7fa', fontFamily: 'var(--font-mono)' }}>{user?.email || 'admin@arjun.dev'}</div>
              <div style={{ fontSize: '0.68rem', color: '#00d9ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{user?.role || 'SUPER_ADMIN'}</div>
            </div>
            <div style={{ width: '34px', height: '34px', borderRadius: '4px', backgroundColor: '#00d9ff', color: '#050608', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
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
