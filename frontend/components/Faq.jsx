'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      num: '01',
      question: 'ARE YOU AVAILABLE FOR INTERNSHIPS & ROLES?',
      answer: 'Yes! I am actively available for Summer 2026 software engineering internships, full-stack developer roles, and AI/ML system collaborations.'
    },
    {
      num: '02',
      question: 'WHAT TECHNOLOGIES DO YOU USE?',
      answer: 'My primary stack includes React.js, Next.js, Node.js, Express, MongoDB, Python, C++, SQL, PyTorch, LangChain, Pinecone Vector DB, AWS, Docker, Git, and modern CSS.'
    },
    {
      num: '03',
      question: 'WHAT PROJECTS DO YOU BUILD?',
      answer: 'I build production full-stack web applications, AI/ML integrations (RAG vector pipelines & LLM agents), microservices backend APIs, and developer tools focused on high throughput and clean design.'
    },
    {
      num: '04',
      question: 'HOW CAN I CONTACT YOU?',
      answer: 'You can transmit a message directly using the Connection Channel below, email me, or connect via LinkedIn and GitHub.'
    }
  ];

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Telemetry Section Header */}
        <div className="hud-label">06 // SYSTEM KNOWLEDGE ARCHIVE</div>
        <h2 className="heading-editorial">
          FAQ // <br />
          <span style={{ color: 'var(--accent-cyan)' }}>SYSTEM KNOWLEDGE</span>
        </h2>

        <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="hud-panel"
                style={{
                  border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-primary)',
                  boxShadow: isOpen ? '0 0 15px rgba(0, 217, 255, 0.1)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="accordion-header"
                  data-cursor={isOpen ? 'CLOSE' : 'OPEN'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.4rem 1.6rem',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: isOpen ? 'var(--accent-cyan)' : 'var(--text-muted)'
                      }}
                    >
                      {faq.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: isOpen ? 'var(--accent-cyan)' : 'var(--text-primary)',
                        transition: 'color 0.2s ease',
                        letterSpacing: '0.03em'
                      }}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <button
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isOpen ? 'var(--accent-cyan)' : 'var(--bg-panel)',
                      color: isOpen ? '#050608' : 'var(--text-primary)',
                      border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    aria-label="Toggle Question"
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          paddingBottom: '1.5rem',
                          paddingLeft: '1.6rem',
                          paddingRight: '1.6rem',
                          fontSize: '0.95rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.65',
                          maxWidth: '750px',
                          borderTop: '1px solid var(--border-primary)',
                          paddingTop: '1rem'
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
