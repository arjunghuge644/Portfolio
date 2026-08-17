'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDownRight, Terminal, Cpu, Database, Cloud, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);

  // Mouse Parallax & 3D Tilt State using Framer Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for tilt & translation
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const imgTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const imgTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  // Cinematic Scroll Exit
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [heroProfile, setHeroProfile] = useState({
    name: 'ARJUN GHUGE',
    title: 'SOFTWARE ENGINEER & AI BUILDER',
    subtext: 'IT Engineering student engineering high-throughput software, production AI models, RAG vector retrieval pipelines, and clean technical systems.',
    location: 'PUNE [IN]'
  });

  useEffect(() => {
    fetch('/api/public/profile')
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setHeroProfile(prev => ({
            ...prev,
            ...data.profile,
            name: data.profile.name ? data.profile.name.toUpperCase() : prev.name,
            title: data.profile.title ? data.profile.title.toUpperCase() : prev.title,
            location: data.profile.location ? data.profile.location.toUpperCase() : prev.location
          }));
        }
      })
      .catch(err => console.error('Loaded default hero profile settings:', err));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '7.5rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Radial Arc Glow Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, var(--accent-cyan-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Animated Arc Reactor Video Watermark Backdrop (Audio Stripped) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '44%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '780px',
          height: '780px',
          objectFit: 'contain',
          opacity: 0.22,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'contrast(140%) brightness(130%)'
        }}
      >
        <source src="/assets/arc_reactor_animated.mp4" type="video/mp4" />
      </video>

      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="container">

          {/* Top HUD Telemetry Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '0.8rem',
              borderBottom: '1px solid var(--border-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="hud-status-dot" />
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>SYS_ONLINE</span>
              <span>// STARK HUD V4.0</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} className="hud-telemetry-meta">
              <span>LOC: {heroProfile.location || 'PUNE [IN]'}</span>
              <span>COORDS: 18.5204° N, 73.8567° E</span>
              <span style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} /> VERIFIED
              </span>
            </div>
          </motion.div>

          {/* Stark HUD Command Center Grid */}
          <div className="hero-hud-grid">

            {/* LEFT COLUMN: Main Telemetry Headings & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-left-content"
            >
              <div className="hud-label" style={{ marginBottom: '1.2rem' }}>
                <Terminal size={14} /> SYS // {heroProfile.name || 'ARJUN GHUGE'} PORTFOLIO
              </div>

              {/* Stacked Massive HUD Heading */}
              <h1 className="hero-massive-heading">
                {heroProfile.title && heroProfile.title.includes('&') ? (
                  <>
                    {heroProfile.title.split('&')[0]}<br />
                    <span style={{ color: 'var(--accent-cyan)' }}>& {heroProfile.title.split('&')[1]}</span>
                  </>
                ) : (
                  heroProfile.title || 'SOFTWARE ENGINEER & AI BUILDER'
                )}
              </h1>

              <div className="hero-subtitle-bar">
                <span className="hud-tag">FULL-STACK</span>
                <span className="hud-tag">AI SYSTEMS</span>
                <span className="hud-tag">RAG ENGINES</span>
                <span className="hud-tag">CLOUD ARCHITECTURE</span>
              </div>

              <p className="hero-description-text">
                {heroProfile.subtext || 'IT Engineering student engineering high-throughput software, production AI models, RAG vector retrieval pipelines, and clean technical systems.'}
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-group">
                <button
                  onClick={scrollToProjects}
                  className="btn-primary"
                  data-cursor="PROJECTS"
                >
                  INITIALIZE PROJECTS <ArrowDownRight size={15} />
                </button>

                <button
                  onClick={scrollToContact}
                  className="btn-secondary"
                  data-cursor="CONTACT"
                >
                  TRANSMIT MESSAGE
                </button>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Portrait HUD Target Frame with Arc Reactor Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hero-right-portrait"
            >
              <div className="portrait-hud-container hud-corner-brackets">

                {/* Technical HUD Overlay Telemetry */}
                <div className="portrait-hud-header">
                  <span>TARGET_ID: AG-01</span>
                  <span className="text-cyan">STATUS: ACTIVE</span>
                </div>

                <div className="portrait-hud-footer">
                  <span>REACTION_CORE: 100%</span>
                  <span>SECURITY: LEVEL 5</span>
                </div>

                {/* 3D Interactive Portrait Container */}
                <motion.div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: 'preserve-3d'
                  }}
                  className="portrait-frame"
                  data-cursor="TARGET"
                >
                  <motion.img
                    src="/assets/portrait.png"
                    alt="Arjun - Software Engineer HUD Portrait"
                    className="portrait-img"
                    style={{
                      x: imgTranslateX,
                      y: imgTranslateY
                    }}
                  />
                  <div className="portrait-scanline-effect" />
                </motion.div>

                {/* Arc Reactor Interactive Circle CTA */}
                <motion.div
                  className="circle-cta-hero"
                  onClick={scrollToProjects}
                  data-cursor="EXPLORE"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="circle-cta">
                    <ArrowDownRight size={20} style={{ marginBottom: '2px' }} />
                    <span>EXPLORE</span>
                    <span style={{ fontSize: '0.5rem', opacity: 0.8, marginTop: '2px' }}>CORE // 01</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>

      <style>{`
        .hero-hud-grid {
          display: grid;
          grid-template-columns: 1.2fr 380px;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-massive-heading {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 5.5vw, 5.2rem);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 0.92;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          margin-bottom: 1.4rem;
        }

        .hero-subtitle-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.4rem;
        }

        .hud-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          padding: 4px 12px;
          border-radius: var(--radius-sm);
        }

        .hero-description-text {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.65;
          max-width: 540px;
          margin-bottom: 2rem;
        }

        .hero-cta-group {
          display: flex;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .hero-right-portrait {
          position: relative;
        }

        .portrait-hud-container {
          position: relative;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          padding: 10px;
          border-radius: var(--radius-sm);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 217, 255, 0.06);
        }

        .portrait-hud-header,
        .portrait-hud-footer {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--text-muted);
          padding: 4px 6px;
        }

        .portrait-hud-header {
          border-bottom: 1px solid var(--border-primary);
          margin-bottom: 8px;
        }

        .portrait-hud-footer {
          border-top: 1px solid var(--border-primary);
          margin-top: 8px;
        }

        .portrait-frame {
          position: relative;
          width: 100%;
          height: 440px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: #000;
          border: 1px solid var(--border-primary);
        }

        .portrait-img {
          width: 108%;
          height: 108%;
          margin-top: -4%;
          margin-left: -4%;
          object-fit: cover;
          object-position: center top;
          filter: contrast(108%) brightness(95%);
          transition: filter 0.3s ease;
        }

        .portrait-frame:hover .portrait-img {
          filter: contrast(115%) brightness(102%);
        }

        .portrait-scanline-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 217, 255, 0) 0%,
            rgba(0, 217, 255, 0.08) 50%,
            rgba(0, 217, 255, 0) 100%
          );
          background-size: 100% 8px;
          pointer-events: none;
        }

        .circle-cta-hero {
          position: absolute;
          bottom: -20px;
          right: -20px;
          z-index: 10;
        }

        @media (max-width: 1024px) {
          .hero-hud-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-right-portrait {
            max-width: 380px;
            margin: 0 auto;
          }
          .hud-telemetry-meta {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
