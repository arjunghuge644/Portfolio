'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, MapPin, GraduationCap } from 'lucide-react';

export default function About() {
  const [profileData, setProfileData] = useState({
    name: 'ARJUN GHUGE',
    title: 'Software Engineer & AI Builder',
    bio: 'Software Engineer & AI Builder specializing in production full-stack architecture, autonomous AI search systems, and high-performance engineering interfaces.',
    subtext: 'My engineering philosophy combines mathematical precision, robust code structure, and zero unnecessary visual clutter. Designed with high-contrast telemetry optics inspired by technical command HUDs.',
    location: 'PUNE // INDIA'
  });

  useEffect(() => {
    fetch('/api/public/profile')
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfileData(prev => ({
            ...prev,
            ...data.profile,
            name: data.profile.name ? data.profile.name.toUpperCase() : prev.name,
            location: data.profile.location ? data.profile.location.toUpperCase() : prev.location
          }));
        }
      })
      .catch(err => console.error('Loaded default profile settings:', err));
  }, []);
  const skillMeters = [
    { name: 'PYTHON & AI/ML', level: 90, bar: '██████████████████░░' },
    { name: 'REACT / NEXT.JS', level: 88, bar: '█████████████████░░░' },
    { name: 'NODE.JS & EXPRESS', level: 85, bar: '█████████████████░░░' },
    { name: 'RAG & VECTOR SEARCH', level: 85, bar: '█████████████████░░░' },
    { name: 'C++ & ALGORITHMS', level: 80, bar: '████████████████░░░░' },
    { name: 'CLOUD & DOCKER', level: 78, bar: '███████████████░░░░░' }
  ];

  const skillCategories = [
    {
      title: 'PROGRAMMING LANGUAGES',
      skills: ['C++', 'JavaScript (ES6+)', 'Python', 'Java', 'SQL', 'HTML5/CSS3']
    },
    {
      title: 'FRAMEWORKS & ARCHITECTURE',
      skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TailwindCSS', 'Framer Motion']
    },
    {
      title: 'DATABASE & VECTOR STORAGE',
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Pinecone Vector DB']
    },
    {
      title: 'AI / RAG / MACHINE LEARNING',
      skills: ['PyTorch', 'Scikit-Learn', 'LangChain', 'OpenAI/Gemini APIs', 'RAG Pipelines']
    },
    {
      title: 'DEVOPS & CLOUD TOOLS',
      skills: ['AWS (EC2, S3)', 'Docker', 'Git & GitHub Actions', 'Postman', 'Linux']
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Header */}
        <div className="hud-label">02 // IDENTITY PROFILE</div>
        <h2 className="heading-editorial">
          IDENTITY // <br />
          <span style={{ color: 'var(--accent-cyan)' }}>{profileData.name || 'ARJUN GHUGE'}</span>
        </h2>

        {/* Perfectly Aligned 2-Column Identity Profile Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '4.5rem',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* LEFT CONTAINER: Main Bio & Telemetry Data */}
          <div
            className="hud-panel hud-corner-brackets"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem', borderBottom: '1px solid var(--border-primary)', paddingBottom: '0.8rem' }}>
                <Terminal size={18} className="text-cyan" />
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
                  SYSTEM_BIO // PHILOSOPHY
                </h3>
              </div>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.65', fontWeight: 500, marginBottom: '1.2rem', fontFamily: 'var(--font-body)' }}>
                {profileData.bio}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.92rem' }}>
                {profileData.subtext}
              </p>
            </div>

            {/* Structured Telemetry Data Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.8rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
              <div style={{ padding: '0.4rem 0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> LOCATION
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>{profileData.location || 'PUNE // INDIA'}</h4>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>COORDS: 18.5204° N, 73.8567° E</p>
              </div>

              <div style={{ padding: '0.4rem 0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GraduationCap size={12} /> EDUCATION
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>BE INFORMATION TECH</h4>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Algorithms, Web Systems & AI</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER: Technical Telemetry Skill Meters Box */}
          <div
            className="hud-panel hud-corner-brackets"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem', borderBottom: '1px solid var(--border-primary)', paddingBottom: '0.8rem' }}>
                <Cpu size={18} className="text-cyan" />
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
                  TELEMETRY_SKILL_METERS
                </h3>
              </div>

              {/* Meter Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {skillMeters.map((meter, m) => (
                  <div key={m}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3px' }}>
                      <span>{meter.name}</span>
                      <span style={{ color: 'var(--accent-cyan)' }}>{meter.level}%</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '1px', color: 'var(--accent-cyan)' }}>
                      {meter.bar}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.8rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} className="text-cyan" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                VERIFIED BY PRODUCTION REPOSITORIES
              </span>
            </div>
          </div>
        </div>

        {/* Integrated Toolkit Grid */}
        <div style={{ marginTop: '4rem', paddingTop: '3.5rem', borderTop: '1px solid var(--border-primary)' }}>
          <div className="hud-label">TECHNICAL TOOLKIT</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.04em' }}>
            SYSTEM CAPABILITIES & FRAMEWORKS
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.8rem' }}>
            {skillCategories.map((cat, i) => (
              <div key={i} className="hud-panel" style={{ padding: '1.2rem', borderLeft: '2px solid var(--accent-cyan)' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.8rem'
                  }}
                >
                  {cat.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.8' }}>
                  {cat.skills.join('  •  ')}
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
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
