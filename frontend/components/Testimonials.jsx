'use client';
import React from 'react';
import { Quote, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Arjun possesses a rare combination of strong algorithmic thinking and modern visual aesthetic. His full-stack engineering work on complex database platforms is clean, reliable, and exceptionally well executed.",
      author: "PROFESSOR & TECH MENTOR",
      organization: "DEPARTMENT OF INFORMATION TECHNOLOGY"
    },
    {
      quote: "Working with Arjun on our AI RAG pipeline was seamless. He delivers clean code, structured APIs, and pays close attention to user experience details that elevate the entire project.",
      author: "PROJECT COLLABORATOR",
      organization: "AI SYSTEMS ENGINEERING GROUP"
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Telemetry Section Header */}
        <div className="hud-label">05 // RECOMMENDATION ARCHIVE</div>
        <h2 className="heading-editorial">
          RECOMMENDATIONS &<br />
          <span style={{ color: 'var(--accent-cyan)' }}>CLASSIFIED FEEDBACK</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '3.5rem' }} className="testimonials-grid">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="hud-panel hud-corner-brackets"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--border-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <span>RECOMMENDATION // 0{i + 1}</span>
                  <span style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} /> LEVEL 5 CLEARED
                  </span>
                </div>

                <blockquote
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.65',
                    fontStyle: 'normal',
                    marginBottom: '1.8rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400
                  }}
                >
                  “{item.quote}”
                </blockquote>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>
                  — {item.author}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {item.organization}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
