import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

function StickyProjectCaseStudy({ project, index, total }) {
  const cardRef = useRef(null);

  // Scroll progress for individual sticky container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Recede & Scale animation as the next card stacks over it
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.45]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.45, 0.75]);

  const handleCardClick = (e) => {
    // If user clicked directly on or inside a link/button, allow native navigation
    if (e.target.closest('a, button')) return;

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
        marginBottom: '40vh'
      }}
      className="sticky-card-wrapper"
    >
      <motion.div
        onClick={handleCardClick}
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
          cursor: 'pointer'
        }}
        className="project-case-study-card"
        data-cursor="FOCUS"
      >
        {/* Top Case Study Header Bar */}
        <div className="case-study-top-bar">
          <div className="case-study-step-tag">
            <span className="step-dot" />
            CASE STUDY 0{index + 1} OF 0{total}
          </div>
          <div className="case-study-category">
            {project.category}
          </div>
        </div>

        {/* 1. Main Image Showcase Container (Compact Height) */}
        <div
          className="project-image-container"
          data-cursor="VIEW CASE"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              y: imageY
            }}
            className="project-image"
          />
          
          {/* Dynamic Dark Overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="project-image-overlay"
          />

          {/* Project Large Number Watermark */}
          <div className="project-number-indicator">
            0{index + 1}
          </div>
        </div>

        {/* 2. Details & Action Buttons Stacked Below Image */}
        <div className="project-info-container">
          <div className="project-text-content">
            <h3 className="project-title">
              {project.title}
            </h3>

            <p className="project-description">
              {project.description}
            </p>

            {/* Tech Stack Badges */}
            <div className="project-tech-stack-row">
              {project.techStack.map((tech, t) => (
                <span key={t} className="project-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="project-actions">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              data-cursor="GITHUB"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '0.55rem 1.2rem', fontSize: '0.75rem' }}
            >
              <Github size={14} /> REPO
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              data-cursor="LIVE DEMO"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '0.55rem 1.2rem', fontSize: '0.75rem' }}
            >
              LIVE DEMO <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'NEURAL-SYNC AI RAG ENGINE',
      category: 'ARTIFICIAL INTELLIGENCE / RAG',
      description: 'An enterprise-grade Retrieval-Augmented Generation (RAG) platform powered by vector search embeddings and LLMs for real-time document context querying.',
      techStack: ['Python', 'LangChain', 'Pinecone DB', 'OpenAI API', 'FastAPI', 'React.js'],
      image: '/assets/project1.png',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 2,
      title: 'PRESCRIPTO HEALTHCARE PLATFORM',
      category: 'FULL-STACK APPLICATION',
      description: 'A comprehensive doctor appointment scheduling system with admin analytics, doctor schedule management, patient dashboard, and automated booking notifications.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 3,
      title: 'EV BATTERY HEALTH & RANGE PREDICTOR',
      category: 'MACHINE LEARNING / ANALYTICS',
      description: 'Predictive analytics platform utilizing ML regression models to forecast Electric Vehicle battery State-of-Health (SoH) and real-time range degradation.',
      techStack: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'Flask', 'Chart.js'],
      image: '/assets/project3.png',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 4,
      title: 'AUTONOMOUS CODE REVIEWER AGENT',
      category: 'DEVELOPER TOOL / AI AGENT',
      description: 'Automated GitHub pull request reviewer using LLM AST parsing to identify security vulnerabilities, style infractions, and performance bottlenecks in codebases.',
      techStack: ['Python', 'Gemini API', 'Docker', 'GitHub Actions', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    }
  ];

  return (
    <section id="projects" className="section-padding" style={{ paddingBottom: '10rem' }}>
      <div className="container">
        
        {/* Section Label & Editorial Title */}
        <div className="section-label">FEATURED WORK</div>
        <h2 className="heading-editorial">
          VISUAL CASE STUDIES &<br />
          <span style={{ color: 'var(--accent-lime)' }}>FEATURED PROJECTS</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '3.5rem', fontSize: '1rem' }}>
          Scroll through the continuous visual gallery sequence. Each project takes the spotlight as you scroll through the portfolio.
        </p>

        {/* Pinned Sticky Stacking Visual Gallery */}
        <div className="projects-stacking-container">
          {projects.map((project, index) => (
            <StickyProjectCaseStudy
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
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
            marginTop: '4.5rem',
            textAlign: 'center'
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            WANT TO SEE MORE REPOSITORIES & EXPERIMENTS?
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              fontWeight: 700
            }}
            data-cursor="GITHUB"
          >
            EXPLORE MORE PROJECTS ON GITHUB <ArrowUpRight size={16} />
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
          background-color: var(--bg-surface);
          border: 1px solid var(--border-thin);
          border-radius: var(--radius-lg);
          padding: 1.2rem 1.6rem;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          max-height: calc(100vh - 110px);
          will-change: transform, opacity;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .project-case-study-card:hover {
          border-color: var(--border-accent);
          box-shadow: 0 40px 85px rgba(0, 0, 0, 0.95), 0 12px 35px rgba(184, 255, 53, 0.1);
        }

        .case-study-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid var(--border-thin);
        }

        .case-study-step-tag {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-lime);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-lime);
          border-radius: 50%;
        }

        .case-study-category {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Image Container: Sleek Compact Viewport Height */
        .project-image-container {
          position: relative;
          width: 100%;
          height: clamp(160px, 22vh, 230px);
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-thin);
        }

        .project-image {
          width: 100%;
          height: 115%;
          object-fit: cover;
          object-position: center;
          filter: brightness(92%) contrast(106%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .project-case-study-card:hover .project-image {
          transform: scale(1.03);
          filter: brightness(100%) contrast(110%);
        }

        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(11,11,11,0) 40%, rgba(11,11,11,0.85) 100%);
          pointer-events: none;
        }

        .project-number-indicator {
          position: absolute;
          bottom: 0.5rem;
          right: 0.8rem;
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.12);
          line-height: 1;
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
          font-size: clamp(1.15rem, 2vw, 1.65rem);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 0.35rem;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        .project-case-study-card:hover .project-title {
          color: var(--accent-lime);
        }

        .project-description {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.48;
          max-width: 620px;
        }

        .project-tech-stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 0.5rem;
        }

        .project-tech-tag {
          font-size: 0.7rem;
          color: var(--text-muted);
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-thin);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .project-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .project-image-container {
            height: clamp(140px, 20vh, 190px);
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
