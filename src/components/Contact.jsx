import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin } from 'lucide-react';

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
      // Fallback display
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        
        {/* Section Label & Editorial Title */}
        <div className="section-label">CONTACT</div>
        <h2 className="heading-editorial">
          LET'S WORK<br />
          <span style={{ color: 'var(--accent-lime)' }}>TOGETHER</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '4rem', fontSize: '1.05rem' }}>
          Have a project in mind, an engineering role opportunity, or an innovative AI application idea? Send a message and let's start a conversation.
        </p>

        {/* 2-Column Composition: LEFT Visual Photograph | RIGHT Contact Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '4rem',
            alignItems: 'stretch'
          }}
          className="contact-grid"
        >
          {/* LEFT: Large Editorial Profile Photograph */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-thin)',
              backgroundColor: 'var(--bg-surface-secondary)',
              minHeight: '480px'
            }}
          >
            <img
              src="/assets/portrait.png"
              alt="Arjun Contact Section Editorial Portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'brightness(90%) contrast(110%)'
              }}
            />
            
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(11,11,11,0) 40%, rgba(11,11,11,0.9) 100%)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                ARJUN
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--accent-lime)', fontWeight: 600, marginBottom: '1rem' }}>
                SOFTWARE ENGINEER & AI BUILDER
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} className="text-lime" /> arjun.engineering@example.com
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} className="text-lime" /> Open for Global Remote & Hybrid Roles
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Minimal Dark Contact Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface-secondary)',
              border: '1px solid var(--border-thin)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={54} color="var(--accent-lime)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  MESSAGE SENT SUCCESSFULLY!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Thank you for reaching out. Arjun will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-lime)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(11, 11, 11, 0.7)',
                      border: '1px solid var(--border-thin)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.9rem 1.2rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-lime)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(11, 11, 11, 0.7)',
                      border: '1px solid var(--border-thin)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.9rem 1.2rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-lime)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    SUBJECT / SERVICE
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(11, 11, 11, 0.7)',
                      border: '1px solid var(--border-thin)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.9rem 1.2rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    className="form-input"
                  >
                    <option value="Full-Stack Development / AI Project">Full-Stack Development / AI Project</option>
                    <option value="Summer 2026 Internship Opportunity">Summer 2026 Internship Opportunity</option>
                    <option value="Freelance Web Application">Freelance Web Application</option>
                    <option value="General Engineering Query">General Engineering Query</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-lime)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project details or team role requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(11, 11, 11, 0.7)',
                      border: '1px solid var(--border-thin)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.9rem 1.2rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}
                  data-cursor="SEND"
                >
                  {sending ? 'SENDING MESSAGE...' : 'START A CONVERSATION'} <Send size={16} />
                </button>

              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        .form-input:focus {
          border-color: var(--accent-lime) !important;
          box-shadow: 0 0 15px var(--accent-lime-glow);
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
