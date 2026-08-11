import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, FileText } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#070707',
        borderTop: '1px solid var(--border-thin)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Top Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              ARJUN <span style={{ color: 'var(--accent-lime)' }}>.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Software Engineer & AI Systems Developer
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-thin)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              className="social-icon-btn"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-thin)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              className="social-icon-btn"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="mailto:arjun.engineering@example.com"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-thin)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              className="social-icon-btn"
              aria-label="Email Contact"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Middle Line */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-thin)', width: '100%', marginBottom: '2.5rem' }} />

        {/* Bottom Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} ARJUN. DESIGNED & ENGINEERED WITH DARK EDITORIAL AESTHETIC.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Resume PDF Download Triggered"); }}
              style={{ color: 'var(--accent-lime)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FileText size={16} /> RESUME PDF
            </a>

            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              data-cursor="TOP"
            >
              BACK TO TOP <ArrowUp size={16} className="text-lime" />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .social-icon-btn:hover {
          background-color: var(--accent-lime) !important;
          color: #0b0b0b !important;
          border-color: var(--accent-lime) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
}
