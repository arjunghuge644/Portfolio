'use client';
import React from 'react';
import { Award, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Achievements() {
  const missions = [
    {
      year: '2026',
      title: 'NEURAL-SYNC AI RAG ENGINE ARCHITECTURE',
      role: 'LEAD AI SOFTWARE ENGINEER',
      description: 'Engineered high-speed vector retrieval system achieving under 50ms query latency using Python, LangChain, and Pinecone vector index.',
      tag: 'AI / RAG ARCHITECTURE'
    },
    {
      year: '2025',
      title: 'PRESCRIPTO FULL STACK HEALTHCARE PLATFORM',
      role: 'FULL STACK ENGINEER',
      description: 'Designed and deployed scalable doctor booking dashboard with JWT authentication, MongoDB schemas, and admin analytics.',
      tag: 'FULL STACK WEB'
    },
    {
      year: '2025',
      title: 'NATIONAL HACKATHON FINALIST & AI INNOVATOR',
      role: 'TEAM LEAD / SYSTEM ARCHITECT',
      description: 'Recognized for building automated AI documentation parsing agent using LLM APIs under 36-hour sprint constraints.',
      tag: 'HACKATHON MILESTONE'
    },
    {
      year: '2024',
      title: 'INFORMATION TECHNOLOGY ACADEMIC EXCELLENCE',
      role: 'IT ENGINEERING SCHOLAR',
      description: 'Maintained top academic standing with emphasis on Data Structures, Algorithms, Operating Systems, and Web Microservices.',
      tag: 'ACADEMIC MILESTONE'
    }
  ];

  return (
    <section id="achievements" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Telemetry Section Header */}
        <div className="hud-label">04 // MISSION HISTORY</div>
        <h2 className="heading-editorial">
          MISSION HISTORY &<br />
          <span style={{ color: 'var(--accent-cyan)' }}>ENGINEERING MILESTONES</span>
        </h2>

        {/* Timeline Container with Cyan Vertical Guide */}
        <div style={{ position: 'relative', marginTop: '4rem', paddingLeft: '2rem' }}>
          
          {/* Vertical Cyan Arc Line */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '9px',
              width: '2px',
              backgroundColor: 'var(--border-primary)',
              boxShadow: '0 0 10px rgba(0, 217, 255, 0.2)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, var(--accent-cyan) 0%, rgba(0, 217, 255, 0.3) 100%)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {missions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative'
                }}
              >
                {/* Arc Reactor Timeline Node */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.4rem',
                    top: '1.2rem',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--accent-cyan)',
                    boxShadow: '0 0 12px var(--accent-cyan)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent-cyan)', borderRadius: '50%' }} />
                </div>

                {/* Timeline Mission Card */}
                <div
                  className="hud-panel hud-corner-brackets"
                  style={{
                    padding: '1.6rem 1.8rem',
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 180px',
                    gap: '2rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Year Tag */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--accent-cyan)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Mission Title & Role */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                        letterSpacing: '0.03em'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
                      SYS_ROLE // {item.role}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Mission Category Badge */}
                  <div style={{ textAlign: 'right' }} className="mission-tag-col">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--bg-panel)',
                        border: '1px solid var(--border-primary)',
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .hud-panel {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .mission-tag-col {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
