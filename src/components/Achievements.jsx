import React from 'react';
import { Award, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      year: '2026',
      title: 'NEURAL-SYNC AI RAG ENGINE ARCHITECTURE',
      role: 'Lead AI Software Developer',
      description: 'Engineered high-speed vector retrieval system achieving under 50ms latency using Python, LangChain, and Pinecone vector store.',
      tag: 'AI / MACHINE LEARNING'
    },
    {
      year: '2025',
      title: 'PRESCRIPTO FULL STACK HEALTHCARE PLATFORM',
      role: 'Full Stack Engineer',
      description: 'Designed and deployed scalable doctor booking dashboard with JWT authentication, MongoDB schemas, and admin management.',
      tag: 'FULL STACK WEB'
    },
    {
      year: '2025',
      title: 'NATIONAL HACKATHON FINALIST & AI INNOVATOR',
      role: 'Team Lead',
      description: 'Recognized for building automated AI documentation parsing tool using LLM APIs under 36-hour sprint constraints.',
      tag: 'ACADEMIC & COMPETITION'
    },
    {
      year: '2024',
      title: 'INFORMATION TECHNOLOGY ACADEMIC EXCELLENCE',
      role: 'IT Engineering Scholar',
      description: 'Maintained top academic standing with emphasis on Data Structures & Algorithms, Operating Systems, and Web Microservices.',
      tag: 'EDUCATION'
    }
  ];

  return (
    <section id="achievements" className="section-padding">
      <div className="container">
        
        {/* Section Label & Editorial Title */}
        <div className="section-label">ACHIEVEMENTS & MILESTONES</div>
        <h2 className="heading-editorial">
          EXPERIENCE &<br />
          <span style={{ color: 'var(--accent-lime)' }}>RECOGNITION</span>
        </h2>

        <div style={{ marginTop: '4rem' }}>
          {achievements.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 200px',
                gap: '2rem',
                alignItems: 'center',
                padding: '2.2rem 0',
                borderTop: '1px solid var(--border-thin)',
                borderBottom: idx === achievements.length - 1 ? '1px solid var(--border-thin)' : 'none'
              }}
              className="achievement-row"
            >
              {/* Year Marker */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--accent-lime)'
                }}
              >
                {item.year}
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  {item.role}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '640px' }}>
                  {item.description}
                </p>
              </div>

              {/* Category Tag */}
              <div style={{ textAlign: 'right' }} className="achievement-tag-col">
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    border: '1px solid var(--border-thin)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .achievement-row {
            grid-template-columns: 1fr !important;
            gap: 0.8rem !important;
          }
          .achievement-tag-col {
            text-align: left !important;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
