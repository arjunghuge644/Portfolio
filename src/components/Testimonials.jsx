import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Arjun possesses a rare combination of strong algorithmic thinking and modern visual aesthetic. His full-stack engineering work on complex database platforms is clean, reliable, and exceptionally well executed.",
      author: "PROFESSOR & TECH MENTOR",
      organization: "Department of Information Technology"
    },
    {
      quote: "Working with Arjun on our AI RAG pipeline was seamless. He delivers clean code, structured APIs, and pays close attention to user experience details that elevate the entire project.",
      author: "PROJECT COLLABORATOR",
      organization: "AI Systems Engineering Group"
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#0e0e0e' }}>
      <div className="container">
        
        <div className="section-label">TESTIMONIALS</div>
        <h2 className="heading-editorial">
          WHAT PEOPLE<br />
          <span style={{ color: 'var(--accent-lime)' }}>SAY</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '4rem' }} className="testimonials-grid">
          {testimonials.map((item, i) => (
            <div
              key={i}
              style={{
                borderLeft: '2px solid var(--accent-lime)',
                paddingLeft: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <blockquote
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  color: 'var(--text-primary)',
                  lineHeight: '1.7',
                  fontStyle: 'normal',
                  marginBottom: '2rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400
                }}
              >
                "{item.quote}"
              </blockquote>

              <div style={{ paddingTop: '1.2rem', borderTop: '1px solid var(--border-thin)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--accent-lime)', letterSpacing: '0.05em' }}>
                  {item.author}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
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
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
