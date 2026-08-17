'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, Code, Cpu, Globe, Cloud } from 'lucide-react';

export default function Capabilities() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const capabilities = [
    {
      num: '01',
      title: 'FULL-STACK ENGINEERING',
      category: 'SYSTEM_ARCH',
      icon: <Code size={20} className="text-cyan" />,
      description: 'End-to-end web application architecture from resilient database schemas to high-performance user interfaces.',
      technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'TypeScript'],
      experience: 'Production platform architecture, REST APIs, and admin control panels',
      typeOfWork: 'Scalable web applications, stateful engines, microservices API gateways',
      relevantProjects: ['Prescripto Healthcare Platform', 'E-Commerce Core System']
    },
    {
      num: '02',
      title: 'AI SYSTEMS & RAG',
      category: 'INTELLIGENCE',
      icon: <Cpu size={20} className="text-cyan" />,
      description: 'Integration of Large Language Models, Retrieval-Augmented Generation (RAG) pipelines, and autonomous agent workflows.',
      technologies: ['Python', 'PyTorch', 'LangChain', 'RAG Engines', 'Vector Search (Pinecone/Faiss)', 'LLM APIs'],
      experience: 'Vector index optimization, document embedding pipelines, prompt orchestration',
      typeOfWork: 'Autonomous AI agents, document knowledge archives, intelligent search systems',
      relevantProjects: ['Neural-Sync RAG Engine', 'Autonomous Code Reviewer']
    },
    {
      num: '03',
      title: 'WEB APPLICATIONS & UI',
      category: 'INTERACTION',
      icon: <Globe size={20} className="text-cyan" />,
      description: 'Crafting responsive, high-contrast digital command interfaces with smooth micro-interactions and minimal latency.',
      technologies: ['React 18', 'Vite', 'Vanilla CSS', 'Framer Motion', 'TypeScript', 'HTML5/ES6+'],
      experience: 'Design token systems, dark telemetry visual language, responsive HUD interfaces',
      typeOfWork: 'Command dashboards, developer tools, high-impact technical portfolio platforms',
      relevantProjects: ['Personal Digital Engineering HUD', 'Analytics UI Telemetry Panel']
    },
    {
      num: '04',
      title: 'CLOUD INFRASTRUCTURE',
      category: 'DEVOPS',
      icon: <Cloud size={20} className="text-cyan" />,
      description: 'Containerized deployment pipelines, cloud infrastructure orchestration, and automated server workflows.',
      technologies: ['AWS (EC2, S3)', 'Docker', 'Git / GitHub Actions', 'Vercel', 'Nginx', 'Linux'],
      experience: 'Production deployment automation, environment isolation, zero-downtime integration',
      typeOfWork: 'Containerized microservices, cloud server orchestration, SSL & DNS security',
      relevantProjects: ['Cloud Dockerized Microservices API Gateway']
    }
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="capabilities" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Telemetry Section Header */}
        <div className="hud-label">01 // TECHNICAL CAPABILITIES</div>
        <h2 className="heading-editorial">
          ENGINEERING & <br />
          <span style={{ color: 'var(--accent-cyan)' }}>TECHNICAL CAPABILITIES</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '3.5rem', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
          Delivering production-grade software architectures, AI search pipelines, and crisp engineering command interfaces.
        </p>

        {/* Technical Capability Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {capabilities.map((item, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="hud-panel"
                style={{
                  border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-primary)',
                  boxShadow: isOpen ? '0 0 20px rgba(0, 217, 255, 0.12)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => toggleAccordion(idx)}
                  className="accordion-header"
                  data-cursor={isOpen ? 'CLOSE' : 'EXPAND'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.8rem 1.8rem',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', flex: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: isOpen ? 'var(--accent-cyan)' : 'var(--text-muted)'
                      }}
                    >
                      {item.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: isOpen ? 'var(--accent-cyan)' : 'var(--text-primary)',
                        transition: 'color 0.2s ease',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        display: 'none'
                      }}
                      className="category-pill"
                    >
                      SYS // {item.category}
                    </span>

                    <button
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isOpen ? 'var(--accent-cyan)' : 'var(--bg-panel)',
                        color: isOpen ? '#050608' : 'var(--text-primary)',
                        border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      aria-label="Toggle Capability"
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Content Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          paddingBottom: '2rem',
                          paddingLeft: '1.8rem',
                          paddingRight: '1.8rem',
                          display: 'grid',
                          gridTemplateColumns: '1.2fr 1fr',
                          gap: '2.5rem',
                          borderTop: '1px solid var(--border-primary)',
                          paddingTop: '1.5rem'
                        }}
                        className="accordion-content-grid"
                      >
                        <div>
                          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.65', marginBottom: '1.4rem' }}>
                            {item.description}
                          </p>

                          <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
                              TECHNOLOGY_STACK
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {item.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    padding: '4px 10px',
                                    borderRadius: 'var(--radius-sm)',
                                    backgroundColor: 'var(--bg-panel)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-primary)'
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)' }}>
                          <div style={{ marginBottom: '1.2rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>TECHNICAL FOCUS</span>
                            <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.typeOfWork}</span>
                          </div>

                          <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>CASE FILE EXAMPLES</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                              {item.relevantProjects.map((proj, p) => (
                                <span key={p} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                  <ArrowUpRight size={13} /> {proj}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .category-pill {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .accordion-content-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
