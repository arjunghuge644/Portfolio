'use client';
import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Radio, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack Development / AI Project',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'Full-Stack Development / AI Project', message: '' });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Telemetry Section Header */}
        <div className="hud-label">07 // SECURE TRANSMISSION CHANNEL</div>
        <h2 className="heading-editorial">
          ESTABLISH CONNECTION // <br />
          <span style={{ color: 'var(--accent-cyan)' }}>TRANSMITTER</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '3.5rem', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
          Transmit direct engineering project inquiries, Summer 2026 internship roles, or technical collaboration requests.
        </p>

        {/* 2-Column HUD Layout: LEFT Identity Frame | RIGHT Connection Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            alignItems: 'stretch'
          }}
          className="contact-grid"
        >
          {/* LEFT: HUD Identity & Telemetry Container */}
          <div
            className="hud-panel hud-corner-brackets"
            style={{
              position: 'relative',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '480px'
            }}
          >
            <div className="portrait-hud-header">
              <span>FREQUENCY: 142.80 MHZ</span>
              <span className="text-cyan">LINK: ENCRYPTED</span>
            </div>

            <div style={{ position: 'relative', flex: 1, borderRadius: 'var(--radius-sm)', overflow: 'hidden', margin: '6px 0', border: '1px solid var(--border-primary)' }}>
              <img
                src="/assets/portrait.png"
                alt="Arjun Contact Section HUD Portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'contrast(110%) brightness(92%)'
                }}
              />
              <div className="portrait-scanline-effect" />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(5,6,8,0) 40%, rgba(5,6,8,0.92) 100%)',
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.3rem', letterSpacing: '0.04em' }}>
                  ARJUN GHUGE
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
                  SOFTWARE ENGINEER & AI BUILDER
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} className="text-cyan" /> arjun.engineering@example.com
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} className="text-cyan" /> PUNE, INDIA (REMOTE / HYBRID)
                  </span>
                </div>
              </div>
            </div>

            <div className="portrait-hud-footer">
              <span>STATUS: ONLINE</span>
              <span style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> READY
              </span>
            </div>
          </div>

          {/* RIGHT: HUD Connection Form Panel */}
          <div
            className="hud-panel hud-corner-brackets"
            style={{
              padding: '2.2rem 2.2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1.2rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                  TRANSMISSION SUCCESSFUL
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Signal acknowledged. Response will be dispatched within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    SENDER_NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ENTER YOUR NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.8rem 1rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="hud-form-input"
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    SENDER_EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="SENDER@DOMAIN.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.8rem 1rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="hud-form-input"
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    TRANSMISSION_SUBJECT
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.8rem 1rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    className="hud-form-input"
                  >
                    <option value="Full-Stack Development / AI Project">Full-Stack Development / AI Project</option>
                    <option value="Summer 2026 Internship Opportunity">Summer 2026 Internship Opportunity</option>
                    <option value="Freelance Engineering Systems">Freelance Engineering Systems</option>
                    <option value="General Technical Query">General Technical Query</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    PAYLOAD_MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="ENTER DETAILED TRANSMISSION PAYLOAD..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.8rem 1rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="hud-form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '0.4rem', padding: '0.95rem' }}
                  data-cursor="TRANSMIT"
                >
                  {sending ? 'TRANSMITTING SIGNAL...' : '[ TRANSMIT MESSAGE ]'} <Radio size={16} />
                </button>

              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        .hud-form-input:focus {
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 15px var(--accent-cyan-muted);
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
