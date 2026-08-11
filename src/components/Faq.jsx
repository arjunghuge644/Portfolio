import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      num: '01',
      question: 'WHAT DO YOU BUILD?',
      answer: 'I build modern full-stack web applications, AI/ML integrations (RAG pipelines & LLM APIs), microservices backend APIs, and creative digital portfolio experiences focused on high speed and editorial design.'
    },
    {
      num: '02',
      question: 'WHAT TECHNOLOGIES DO YOU USE?',
      answer: 'My primary stack includes React.js, Node.js, Express, MongoDB, Python, C++, SQL, PyTorch, LangChain, Pinecone Vector DB, AWS, Docker, Git, and modern CSS/Tailwind.'
    },
    {
      num: '03',
      question: 'ARE YOU AVAILABLE FOR COLLABORATIONS & INTERNSHIPS?',
      answer: 'Yes! I am actively looking for Summer 2026 software engineering internships, AI/ML developer roles, and high-impact full-stack collaborations.'
    },
    {
      num: '04',
      question: 'HOW CAN I CONTACT YOU?',
      answer: 'You can directly send a message using the Contact section below, email me, or connect with me via LinkedIn and GitHub.'
    }
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="container">
        
        <div className="section-label">FAQ</div>
        <h2 className="heading-editorial">
          FREQUENTLY ASKED<br />
          <span style={{ color: 'var(--accent-lime)' }}>QUESTIONS</span>
        </h2>

        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderTop: '1px solid var(--border-thin)',
                  borderBottom: idx === faqs.length - 1 ? '1px solid var(--border-thin)' : 'none'
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
                    padding: '2rem 0',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: isOpen ? 'var(--accent-lime)' : 'var(--text-muted)'
                      }}
                    >
                      {faq.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: isOpen ? 'var(--accent-lime)' : 'var(--text-primary)',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <button
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--accent-lime)' : 'var(--bg-surface-secondary)',
                      color: isOpen ? '#0b0b0b' : 'var(--text-primary)',
                      border: '1px solid var(--border-thin)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    aria-label="Toggle Question"
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          paddingBottom: '2rem',
                          paddingLeft: '3.5rem',
                          fontSize: '1.05rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.7',
                          maxWidth: '750px'
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
