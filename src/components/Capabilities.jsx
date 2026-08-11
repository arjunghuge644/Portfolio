import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, Code, Cpu, Globe, Cloud } from 'lucide-react';

export default function Capabilities() {
  const [expandedIndex, setExpandedIndex] = useState(0); // Default first expanded

  const capabilities = [
    {
      num: '01',
      title: 'FULL-STACK DEVELOPMENT',
      category: 'ENGINEERING',
      icon: <Code size={20} className="text-lime" />,
      description: 'End-to-end web application architecture from database schemas to polished frontend user interfaces.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'TypeScript'],
      experience: '3+ Years hands-on project building & system design',
      typeOfWork: 'Scalable web apps, REST APIs, stateful platforms, admin dashboards',
      relevantProjects: ['Prescripto Healthcare Platform', 'E-Commerce Core']
    },
    {
      num: '02',
      title: 'AI & MACHINE LEARNING',
      category: 'INTELLIGENCE',
      icon: <Cpu size={20} className="text-lime" />,
      description: 'Integration of LLMs, Retrieval-Augmented Generation (RAG) pipelines, and intelligent automated workflows.',
      technologies: ['Python', 'PyTorch', 'Scikit-Learn', 'LangChain', 'RAG', 'Vector DBs (Pinecone)'],
      experience: 'Deep focus on LLM APIs, prompt engineering, fine-tuning & document RAG',
      typeOfWork: 'AI Assistant agents, automated document extraction, intelligent recommendation engines',
      relevantProjects: ['Neural-Sync RAG Engine', 'Autonomous Code Reviewer']
    },
    {
      num: '03',
      title: 'WEB APPLICATIONS',
      category: 'INTERACTION',
      icon: <Globe size={20} className="text-lime" />,
      description: 'Crafting ultra-responsive, visually captivating digital interfaces with fluid micro-interactions.',
      technologies: ['React 18', 'Vite', 'Vanilla CSS', 'Framer Motion', 'TailwindCSS', 'HTML5/ES6+'],
      experience: 'Focused on UI design, dark mode aesthetics, accessibility, and high performance',
      typeOfWork: 'Creative agency sites, SaaS user panels, editorial design systems',
      relevantProjects: ['Personal Digital Editorial Portfolio', 'Analytics UI Dashboard']
    },
    {
      num: '04',
      title: 'CLOUD & DEPLOYMENT',
      category: 'INFRASTRUCTURE',
      icon: <Cloud size={20} className="text-lime" />,
      description: 'Containerized deployment pipelines, cloud infrastructure setup, and automated CI/CD workflows.',
      technologies: ['AWS (EC2, S3)', 'Docker', 'Git / GitHub Actions', 'Vercel', 'Nginx', 'Linux'],
      experience: 'Setting up production environments, environment isolation, and automated deployments',
      typeOfWork: 'Microservices containerization, cloud hosting, domain & ssl configuration',
      relevantProjects: ['Cloud Dockerized Microservices API Gateway']
    }
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="capabilities" className="section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-label">SERVICES</div>
        <h2 className="heading-editorial">
          WHAT I CAN<br />
          <span style={{ color: 'var(--accent-lime)' }}>DO FOR YOU</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '4rem', fontSize: '1.05rem' }}>
          Delivering robust technical engineering combined with modern visual design standards across the full stack.
        </p>

        {/* Large Horizontal Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {capabilities.map((item, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderTop: '1px solid var(--border-thin)',
                  borderBottom: idx === capabilities.length - 1 ? '1px solid var(--border-thin)' : 'none',
                  transition: 'background-color 0.3s ease'
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
                    padding: '2.2rem 0',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: isOpen ? 'var(--accent-lime)' : 'var(--text-muted)'
                      }}
                    >
                      {item.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.4rem, 3.2vw, 2.5rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: isOpen ? 'var(--accent-lime)' : 'var(--text-primary)',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span
                      className="category-pill"
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        display: 'none' // Enabled via CSS on desktop
                      }}
                    >
                      {item.category}
                    </span>
                    <button
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'var(--accent-lime)' : 'var(--bg-surface-secondary)',
                        color: isOpen ? '#0b0b0b' : 'var(--text-primary)',
                        border: '1px solid var(--border-thin)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      aria-label="Toggle Capability"
                    >
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
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
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          paddingBottom: '2.5rem',
                          paddingLeft: '3.5rem',
                          paddingRight: '1rem',
                          display: 'grid',
                          gridTemplateColumns: '1.2fr 1fr',
                          gap: '3rem'
                        }}
                        className="accordion-content-grid"
                      >
                        <div>
                          <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            {item.description}
                          </p>

                          <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent-lime)', marginBottom: '0.6rem' }}>
                              TECHNOLOGIES & STACK
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {item.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  style={{
                                    fontSize: '0.8rem',
                                    padding: '4px 12px',
                                    borderRadius: 'var(--radius-full)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--bg-surface-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-thin)' }}>
                          <div style={{ marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>PRACTICAL FOCUS</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.typeOfWork}</span>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>RELEVANT PROJECT EXAMPLES</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                              {item.relevantProjects.map((proj, p) => (
                                <span key={p} style={{ fontSize: '0.85rem', color: 'var(--accent-lime)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <ArrowUpRight size={14} /> {proj}
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
            padding-left: 0 !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
