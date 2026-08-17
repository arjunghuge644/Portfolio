'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, FolderGit2, Filter } from 'lucide-react';
import { hudAudio } from '../lib/hudAudio';

function StickyProjectCaseStudy({ project, index, total }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const handleCardClick = (e) => {
    if (e.target.closest && e.target.closest('a, button')) return;
    hudAudio.playClick();
    if (cardRef.current) {
      const topOffset = 85 + index * 12;
      const elementTop = cardRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: `calc(85px + ${index * 12}px)`,
        zIndex: index + 1,
        marginBottom: '35vh'
      }}
      className="sticky-card-wrapper"
    >
      <motion.div
        onClick={handleCardClick}
        onMouseEnter={() => hudAudio.playHover()}
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
          cursor: 'pointer'
        }}
        className="project-case-study-card hud-corner-brackets"
        data-cursor="CASE FILE"
      >
        {/* Top Case Study Header Bar */}
        <div className="case-study-top-bar">
          <div className="case-study-step-tag">
            <span className="hud-status-dot" />
            CASE FILE 0{index + 1} OF 0{total}
          </div>
          <div className="case-study-status">
            STATUS: <span style={{ color: 'var(--accent-cyan)' }}>ACTIVE</span>
          </div>
        </div>

        {/* Main Image Showcase Container */}
        <div className="project-image-container" data-cursor="OPEN">
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ y: imageY }}
            className="project-image"
          />

          {/* Cyan Scanning Sweep Line Effect on Hover */}
          <div className="hud-scan-line-sweep" />

          {/* Project Number Watermark */}
          <div className="project-number-indicator">
            FILE_0{index + 1}
          </div>
        </div>

        {/* Details & Actions Stacked Below Image */}
        <div className="project-info-container">
          <div className="project-text-content">
            <h3 className="project-title">
              {project.title}
            </h3>

            <p className="project-description">
              {project.description}
            </p>

            {/* Tech Stack Tags */}
            <div className="project-tech-stack-row">
              {(Array.isArray(project.techStack) ? project.techStack : []).map((tech, t) => (
                <span key={t} className="project-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="project-actions">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                data-cursor="REPO"
                onClick={(e) => { e.stopPropagation(); hudAudio.playClick(); }}
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.72rem' }}
              >
                <Github size={14} /> REPO
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                data-cursor="OPEN"
                onClick={(e) => { e.stopPropagation(); hudAudio.playClick(); }}
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.72rem' }}
              >
                OPEN CASE FILE <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const defaultProjects = [
    {
      id: 1,
      title: 'NEURAL-SYNC AI RAG ENGINE',
      category: 'AI & RAG',
      description: 'An enterprise-grade Retrieval-Augmented Generation (RAG) platform powered by vector search embeddings and LLMs for real-time document context querying.',
      techStack: ['PYTHON', 'LANGCHAIN', 'PINECONE DB', 'OPENAI API', 'FASTAPI', 'REACT.JS'],
      image: '/assets/project1.png',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 2,
      title: 'PRESCRIPTO HEALTHCARE PLATFORM',
      category: 'FULL-STACK',
      description: 'A comprehensive doctor appointment scheduling system with admin analytics, doctor schedule management, patient dashboard, and automated booking notifications.',
      techStack: ['REACT.JS', 'NODE.JS', 'EXPRESS.JS', 'MONGODB', 'JWT AUTH', 'REST API'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 3,
      title: 'EV BATTERY HEALTH & RANGE PREDICTOR',
      category: 'ML & ANALYTICS',
      description: 'Predictive analytics platform utilizing ML regression models to forecast Electric Vehicle battery State-of-Health (SoH) and real-time range degradation.',
      techStack: ['PYTHON', 'SCIKIT-LEARN', 'PYTORCH', 'PANDAS', 'FLASK', 'CHART.JS'],
      image: '/assets/project3.png',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 4,
      title: 'AUTONOMOUS CODE REVIEWER AGENT',
      category: 'DEV TOOLS',
      description: 'Automated GitHub pull request reviewer using LLM AST parsing to identify security vulnerabilities, style infractions, and performance bottlenecks in codebases.',
      techStack: ['PYTHON', 'GEMINI API', 'DOCKER', 'GITHUB ACTIONS', 'NODE.JS'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    }
  ];

  const [projectsList, setProjectsList] = useState(defaultProjects);
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/public/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length > 0) {
          setProjectsList(data.projects);
        }
      })
      .catch(err => console.error('Loaded default portfolio projects:', err));
  }, []);

  const filters = ['ALL', 'AI & RAG', 'FULL-STACK', 'ML & ANALYTICS', 'DEV TOOLS'];

  const filteredProjects = selectedFilter === 'ALL'
    ? projectsList
    : projectsList.filter(p => p.category?.toUpperCase() === selectedFilter || p.category?.toUpperCase().includes(selectedFilter));

  const handleFilterSelect = (filter) => {
    hudAudio.playClick();
    setSelectedFilter(filter);
  };

  return (
    <section id="projects" className="section-padding" style={{ paddingBottom: '9rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* HUD Telemetry Section Header */}
        <div className="hud-label">03 // CASE FILES DATABASE</div>
        <h2 className="heading-editorial">
          ENGINEERING FILES &<br />
          <span style={{ color: 'var(--accent-cyan)' }}>FEATURED CASE STUDIES</span>
        </h2>

        {/* Interactive Category Filter Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-primary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '6px' }}>
              <Filter size={13} /> FILTER_BY:
            </span>

            {filters.map((f, i) => {
              const isActive = selectedFilter === f;
              return (
                <button
                  key={i}
                  onClick={() => handleFilterSelect(f)}
                  onMouseEnter={() => hudAudio.playHover()}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                    color: isActive ? '#050608' : 'var(--text-secondary)',
                    border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
            MATCHED: {filteredProjects.length} / {projectsList.length} FILES
          </div>
        </div>

        {/* Sticky Stacking Gallery */}
        <div className="projects-stacking-container">
          {filteredProjects.map((project, index) => (
            <StickyProjectCaseStudy
              key={project.id || index}
              project={project}
              index={index}
              total={filteredProjects.length}
            />
          ))}
        </div>

        {/* Explore More Projects CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '4rem',
            textAlign: 'center'
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            EXPLORE COMPLETE REPOSITORY ARCHIVE ON GITHUB
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{
              padding: '0.8rem 1.8rem',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              fontWeight: 700
            }}
            data-cursor="GITHUB"
            onClick={() => hudAudio.playClick()}
          >
            <FolderGit2 size={16} /> OPEN GITHUB ARCHIVE <ArrowUpRight size={15} />
          </a>
        </div>

      </div>

      <style>{`
        .projects-stacking-container {
          position: relative;
          display: flex;
          flex-direction: column;
          max-width: 960px;
          margin: 0 auto;
        }

        .project-case-study-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-sm);
          padding: 1.2rem 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          max-height: calc(100vh - 110px);
          will-change: transform, opacity;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }

        .project-case-study-card:hover {
          border-color: var(--accent-cyan);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 217, 255, 0.08);
        }

        .case-study-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid var(--border-primary);
          font-family: var(--font-mono);
        }

        .case-study-step-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .case-study-status {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .project-image-container {
          position: relative;
          width: 100%;
          height: clamp(160px, 22vh, 220px);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--bg-panel);
          border: 1px solid var(--border-primary);
        }

        .project-image {
          width: 100%;
          height: 112%;
          object-fit: cover;
          object-position: center;
          filter: brightness(92%) contrast(106%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
        }

        .project-case-study-card:hover .project-image {
          transform: scale(1.02);
          filter: brightness(100%) contrast(110%);
        }

        /* Scan Line Sweep */
        .hud-scan-line-sweep {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 217, 255, 0.12),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          transition: left 0.6s ease;
        }

        .project-case-study-card:hover .hud-scan-line-sweep {
          left: 150%;
        }

        .project-number-indicator {
          position: absolute;
          bottom: 0.4rem;
          right: 0.8rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-cyan);
          background-color: rgba(5, 6, 8, 0.8);
          border: 1px solid var(--border-primary);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          pointer-events: none;
        }

        .project-info-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.2rem;
        }

        .project-text-content {
          flex: 1;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 2vw, 1.6rem);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 0.35rem;
          color: var(--text-primary);
          transition: color 0.2s ease;
          letter-spacing: 0.03em;
        }

        .project-case-study-card:hover .project-title {
          color: var(--accent-cyan);
        }

        .project-description {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.48;
          max-width: 620px;
        }

        .project-tech-stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 0.5rem;
        }

        .project-tech-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-secondary);
          background-color: var(--bg-panel);
          border: 1px solid var(--border-primary);
          padding: 2px 7px;
          border-radius: var(--radius-sm);
        }

        .project-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .project-image-container {
            height: clamp(140px, 20vh, 180px);
          }
          .project-info-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
          .project-actions {
            width: 100%;
          }
          .project-actions a {
            flex: 1;
            text-align: center;
          }
          .project-case-study-card {
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
