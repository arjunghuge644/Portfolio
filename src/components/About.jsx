import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award, BookOpen, Cpu, ShieldCheck } from 'lucide-react';

export default function About() {
  const skillCategories = [
    {
      title: 'LANGUAGES',
      skills: ['C++', 'JavaScript (ES6+)', 'Python', 'Java', 'SQL', 'HTML5/CSS3']
    },
    {
      title: 'FRAMEWORKS & LIBRARIES',
      skills: ['React.js', 'Node.js', 'Express.js', 'Next.js', 'TailwindCSS', 'Framer Motion']
    },
    {
      title: 'DATABASE & STORAGE',
      skills: ['MongoDB', 'MySQL', 'Redis', 'Pinecone Vector DB']
    },
    {
      title: 'AI / MACHINE LEARNING',
      skills: ['Python', 'Scikit-learn', 'RAG Architecture', 'LLM APIs (OpenAI/Gemini)', 'LangChain']
    },
    {
      title: 'CLOUD & DEVELOPER TOOLS',
      skills: ['AWS (EC2, S3)', 'Docker', 'Git & GitHub', 'Postman', 'Vite', 'Linux']
    }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container">
        
        {/* Section Label & Large Editorial Title */}
        <div className="section-label">ABOUT ME</div>
        <h2 className="heading-editorial">
          ENGINEERING WITH<br />
          <span style={{ color: 'var(--accent-lime)' }}>PURPOSE & CREATIVITY</span>
        </h2>

        {/* 2-Column Editorial About Content Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '4rem',
            marginBottom: '6rem',
            alignItems: 'start'
          }}
          className="about-grid"
        >
          {/* Main Narrative */}
          <div>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: '1.7', fontWeight: 500, marginBottom: '1.8rem' }}>
              I am an <strong style={{ color: 'var(--accent-lime)' }}>Information Technology Engineering student</strong> passionate about crafting production-ready full-stack applications, intelligent AI models, and refined editorial web experiences.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '2rem' }}>
              My engineering philosophy revolves around clarity, high performance, and minimal visual clutter. Rather than relying on generic design frameworks or cookie-cutter solutions, I engineer custom digital platforms where code efficiency matches visual craftsmanship.
            </p>

            {/* Key Information Cards / Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-surface-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-thin)'
                }}
              >
                <div style={{ color: 'var(--accent-lime)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  EDUCATION
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>B.Tech in Information Technology</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Focused on Data Structures, Web Systems & AI Architectures.</p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-surface-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-thin)'
                }}
              >
                <div style={{ color: 'var(--accent-lime)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  CORE FOCUS
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>AI-Driven Full Stack Systems</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Combining robust backend microservices with intelligent RAG LLM capabilities.</p>
              </div>
            </div>
          </div>

          {/* Quick Highlight Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-thin)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <Terminal size={22} className="text-lime" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>PHILOSOPHY</h3>
            </div>

            <blockquote style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: '1.7', borderLeft: '3px solid var(--accent-lime)', paddingLeft: '1.2rem' }}>
              "Software engineering is not just about writing code that works; it's about building elegant systems that communicate clarity, scale effortlessly, and solve real human problems."
            </blockquote>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-thin)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} className="text-lime" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Clean Code Architecture & Zero Visual Noise</span>
            </div>
          </div>
        </div>

        {/* Integrated Editorial Technical Skills */}
        <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-thin)' }}>
          <div className="section-label">TECHNICAL CAPABILITIES</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3rem' }}>
            SKILLSET & TOOLKIT
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {skillCategories.map((cat, i) => (
              <div key={i} style={{ borderLeft: '2px solid var(--border-thin)', paddingLeft: '1.2rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: 'var(--accent-lime)',
                    marginBottom: '1rem'
                  }}
                >
                  {cat.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '2' }}>
                  {cat.skills.join('  ·  ')}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
