'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Volume2, VolumeX, Terminal } from 'lucide-react';
import { hudAudio } from '../lib/hudAudio';
import HUDConsoleModal from './HUDConsoleModal';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);

  const [theme, setTheme] = useState('dark');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
    }
  }, [theme]);

  // Live HUD Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${mins}:${secs} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for console (~ key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setConsoleOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    hudAudio.playClick();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    hudAudio.setSoundEnabled(nextState);
  };

  const navLinks = [
    { id: 'capabilities', label: 'CAPABILITIES' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'achievements', label: 'TIMELINE' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    hudAudio.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 2.5rem)',
          maxWidth: '1280px',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 1.2rem',
            backgroundColor: 'var(--nav-bg)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          className="hud-corner-brackets"
        >
          {/* Brand Logo & Telemetry Tag */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={() => hudAudio.playHover()}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>ARJUN</span>
            <span className="hud-status-dot" style={{ marginLeft: '2px' }} />
          </a>

          {/* Desktop Technical Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.4rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  onMouseEnter={() => hudAudio.playHover()}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.12em',
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--accent-cyan)',
                        boxShadow: '0 0 6px var(--accent-cyan)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Primary Status & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>

            {/* Live Clock Ticker */}
            <div
              className="status-badge-desktop"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
              }}
            >
              {timeString}
            </div>

            {/* Interactive Console Drawer Trigger */}
            <button
              onClick={() => { hudAudio.playClick(); setConsoleOpen(true); }}
              style={{
                height: '32px',
                padding: '0 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
              data-cursor="CONSOLE"
              title="Open HUD Terminal Console (~)"
              onMouseEnter={() => hudAudio.playHover()}
            >
              <Terminal size={14} /> SYS_CONSOLE
            </button>

            {/* Web Audio Synthesizer Sound Toggle Button */}
            <button
              onClick={toggleAudio}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: audioEnabled ? 'var(--accent-cyan)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              data-cursor="AUDIO"
              title="Toggle HUD Sound FX (Web Audio API)"
            >
              {audioEnabled ? <Volume2 size={15} className="text-cyan" /> : <VolumeX size={15} />}
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              data-cursor="THEME"
              aria-label="Toggle Dark/Light Theme"
            >
              {theme === 'dark' ? <Sun size={15} className="text-cyan" /> : <Moon size={15} className="text-cyan" />}
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="btn-primary"
              style={{
                padding: '0.4rem 0.9rem',
                fontSize: '0.68rem',
                letterSpacing: '0.1em'
              }}
              data-cursor="HIRE"
            >
              HIRE ME <ArrowUpRight size={13} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'none',
                padding: '4px'
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
            className="hud-corner-brackets"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: activeSection === link.id ? 'var(--accent-cyan)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--border-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <style>{`
          @media (max-width: 960px) {
            .desktop-nav, .status-badge-desktop {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
        `}</style>
      </header>

      {/* Interactive HUD Command Telemetry Console */}
      <HUDConsoleModal isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />
    </>
  );
}
