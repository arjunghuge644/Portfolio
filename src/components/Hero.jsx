import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);

  // Mouse Parallax & 3D Tilt State using Framer Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth tilt response & neutral return
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });
  const imgTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  const imgTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Cinematic Scroll Exit Animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.96]);

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle Mouse Hover Physics on Portrait Card
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

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(184, 255, 53, 0.06) 0%, rgba(11, 11, 11, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Cinematic Scroll Container */}
      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="container">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2.5rem'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                padding: '6px 18px',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--text-secondary)'
              }}
            >
              <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-lime)', borderRadius: '50%', boxShadow: '0 0 12px var(--accent-lime)' }}></span>
              AVAILABLE FOR SUMMER 2026 INTERNSHIPS & ROLES
            </div>
          </motion.div>

          {/* 3-Column Editorial Hero Grid */}
          <div className="hero-editorial-grid">
            
            {/* LEFT: Display Heading Part 1 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hero-left"
            >
              <h1 className="hero-heading" style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5rem)' }}>
                ARJUN
              </h1>
              <div className="hero-subtext-left">
                <span className="text-lime font-mono" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block' }}>
                  // IT ENGINEER & AI BUILDER
                </span>
                <p style={{ marginTop: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 400 }}>
                  Crafting production software architectures, AI systems, and high-performance editorial digital experiences.
                </p>
              </div>
            </motion.div>

            {/* CENTER: Floating Editorial Portrait Object with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hero-center-portrait"
              data-cursor="ARJUN"
            >
              {/* Continuous Floating Motion Loop */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [0, -9, 0, 9, 0],
                        x: [0, 3, 0, -3, 0]
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ perspective: 1000 }}
              >
                {/* Interactive Card Container with 3D Tilt */}
                <motion.div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: 'preserve-3d'
                  }}
                  className="portrait-wrapper"
                >
                  <motion.img
                    src="/assets/portrait.png"
                    alt="Arjun - Software Engineer Editorial Portrait"
                    className="portrait-image"
                    style={{
                      x: imgTranslateX,
                      y: imgTranslateY
                    }}
                  />
                  <div className="portrait-overlay" />
                </motion.div>

                {/* Overlapping Lime Circular Interactive CTA Element */}
                <motion.div
                  className="circle-cta-hero"
                  onClick={scrollToProjects}
                  data-cursor="EXPLORE"
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <div className="circle-cta">
                    <ArrowDownRight size={22} style={{ marginBottom: '2px' }} />
                    <span>EXPLORE</span>
                    <span style={{ fontSize: '0.55rem', opacity: 0.8 }}>WORK</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Display Heading Part 2 & Subtext */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hero-right"
            >
              <h1 className="hero-heading" style={{ fontSize: 'clamp(2rem, 3.3vw, 3.7rem)' }}>
                SOFTWARE<br />
                <span style={{ color: 'var(--accent-lime)' }}>ENGINEER</span>
              </h1>
              
              <p className="hero-description" style={{ marginTop: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 400 }}>
                IT engineering student building software, AI systems and creative digital experiences with focus on technical efficiency and minimal clutter.
              </p>

              <div className="hero-tags">
                <span className="hero-tag">FULL-STACK</span>
                <span className="hero-tag">AI / ML</span>
                <span className="hero-tag">CLOUD</span>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>

      <style>{`
        .hero-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 340px 1.25fr;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }

        .hero-left, .hero-right {
          min-width: 0;
        }

        .hero-heading {
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .hero-subtext-left {
          margin-top: 1.5rem;
          max-width: 340px;
        }

        .hero-center-portrait {
          position: relative;
          will-change: transform;
        }

        .portrait-wrapper {
          position: relative;
          width: 100%;
          height: 460px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background-color: var(--bg-surface-secondary);
          /* Soft multi-layered depth shadow instead of hard border */
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.85), 0 10px 30px rgba(184, 255, 53, 0.05);
          transition: box-shadow 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .hero-center-portrait:hover .portrait-wrapper {
          box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 0 15px 40px rgba(184, 255, 53, 0.15);
          border-color: rgba(184, 255, 53, 0.3);
        }

        .portrait-image {
          width: 108%;
          height: 108%;
          margin-top: -4%;
          margin-left: -4%;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(15%) contrast(105%);
          transition: filter 0.5s ease;
        }

        .hero-center-portrait:hover .portrait-image {
          filter: grayscale(0%) contrast(108%);
        }

        .portrait-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(11,11,11,0) 60%, rgba(11,11,11,0.7) 100%);
          pointer-events: none;
        }

        .circle-cta-hero {
          position: absolute;
          bottom: -22px;
          right: -25px;
          z-index: 10;
        }

        .hero-description {
          margin-top: 1.5rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 420px;
        }

        .hero-tags {
          display: flex;
          gap: 10px;
          margin-top: 1.8rem;
          flex-wrap: wrap;
        }

        .hero-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-thin);
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        @media (max-width: 1024px) {
          .hero-editorial-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2.5rem;
          }
          .hero-subtext-left {
            margin: 1.5rem auto 0;
          }
          .hero-center-portrait {
            max-width: 320px;
            margin: 0 auto;
          }
          .portrait-wrapper {
            height: 400px;
          }
          .hero-description {
            margin: 1.5rem auto 0;
          }
          .hero-tags {
            justify-content: center;
          }
          .circle-cta-hero {
            right: 0;
            bottom: -15px;
          }
        }
      `}</style>
    </section>
  );
}
