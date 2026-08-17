'use client';
import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, FileText, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-primary)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">

        {/* Top Terminal Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
              ARJUN<span style={{ color: 'var(--accent-cyan)' }}>.DEV</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <span className="hud-status-dot" />
              <span>SYSTEM STATUS: <strong style={{ color: 'var(--accent-cyan)' }}>ONLINE</strong></span>
              <span>// LEVEL 5 CLEARANCE</span>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              className="social-icon-btn"
              aria-label="GitHub Profile"
              data-cursor="GITHUB"
            >
              <Github size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              className="social-icon-btn"
              aria-label="LinkedIn Profile"
              data-cursor="LINKEDIN"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:arjun.engineering@example.com"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              className="social-icon-btn"
              aria-label="Email Contact"
              data-cursor="EMAIL"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-primary)', width: '100%', marginBottom: '2rem' }} />

        {/* Bottom Telemetry Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '1.2rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} ARJUN // ENGINEERING ARCHIVE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Resume PDF Download Triggered"); }}
              style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              data-cursor="RESUME"
            >
              <FileText size={15} /> RESUME PDF
            </a>

            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              data-cursor="TOP"
            >
              BACK TO TOP <ArrowUp size={15} className="text-cyan" />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .social-icon-btn:hover {
          background-color: var(--accent-cyan) !important;
          color: #050608 !important;
          border-color: var(--accent-cyan) !important;
          transform: translateY(-2px);
          box-shadow: 0 0 15px var(--accent-cyan-muted);
        }
      `}</style>
    </footer>
  );
}
