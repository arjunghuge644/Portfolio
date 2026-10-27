/**
 * Personal Portfolio Website — Interactive Core Logic
 * Supports Figma Showcase Mode & Arjun's Live Portfolio Mode
 * Hardened for Production, Keyboard Accessibility & Submission Integrity
 */

// Import portfolio-data.json directly for live mode
import portfolioData from '../portfolio-data.json';

// State management
let currentMode = 'arjun'; // 'arjun' | 'figma'
let lastFocusedTrigger = null;
let toastTimer = null;

// Legal & Policy Information for footer interaction
const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    body: `
      <p style="margin-bottom: 12px; color: #5c6479; line-height: 1.7;">
        This personal engineering portfolio is designed to showcase projects, skills, and technical publications. We hold privacy and data minimization as first principles:
      </p>
      <ul style="padding-left: 20px; margin-bottom: 16px; color: #5c6479; line-height: 1.8;">
        <li><strong>No Tracking & Analytics:</strong> This site uses zero third-party telemetry, tracking beacons, or cross-site fingerprinting scripts.</li>
        <li><strong>Form Inquiries:</strong> Any contact message transmitted via email or the contact section is used strictly to respond to professional opportunities or collaborations.</li>
        <li><strong>No Commercial Data Sharing:</strong> Your personal contact information is never sold, leased, or distributed to any third parties.</li>
      </ul>
      <p style="color: #5c6479; line-height: 1.7;">
        For privacy-related questions or data deletion requests, contact Arjun directly at <a href="mailto:arjunghuge644@gmail.com" style="color: #5e3bee; font-weight: 600;">arjunghuge644@gmail.com</a>.
      </p>
    `
  },
  terms: {
    title: 'Terms of Service',
    body: `
      <p style="margin-bottom: 12px; color: #5c6479; line-height: 1.7;">
        Welcome to Arjun Ghuge's professional portfolio. By accessing this web application, you agree to the following terms:
      </p>
      <ul style="padding-left: 20px; margin-bottom: 16px; color: #5c6479; line-height: 1.8;">
        <li><strong>Intellectual Property:</strong> Code architecture, project showcases, and technical documentation are authored by Arjun Ghuge unless explicitly noted otherwise.</li>
        <li><strong>Open-Source Licensing:</strong> Individual projects featured on this portfolio are governed by their respective repository licenses hosted on GitHub.</li>
        <li><strong>Showcase Demonstration:</strong> The "Figma View" is an interactive faithful recreation of a community design template for UX demonstration purposes.</li>
      </ul>
      <p style="color: #5c6479; line-height: 1.7;">
        You are free to review the source code for learning and educational evaluation.
      </p>
    `
  },
  cookies: {
    title: 'Cookies & Storage Policy',
    body: `
      <p style="margin-bottom: 12px; color: #5c6479; line-height: 1.7;">
        This portfolio is built to respect digital autonomy and minimalist client storage:
      </p>
      <ul style="padding-left: 20px; margin-bottom: 16px; color: #5c6479; line-height: 1.8;">
        <li><strong>No Tracking Cookies:</strong> No third-party profiling or advertising cookies are planted in your browser.</li>
        <li><strong>Session State:</strong> Any UI state (such as the active Figma vs. Arjun portfolio display view) is handled in local memory.</li>
      </ul>
      <p style="color: #5c6479; line-height: 1.7;">
        You can browse the entire portfolio with all cookies disabled without any degradation of functionality.
      </p>
    `
  }
};

// Datasets
const FIGMA_DATA = {
  logo: 'logoipsum',
  greeting: 'Hey, I am John',
  titleHighlight: 'product design',
  titleSuffix: 'and brand experience',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  heroImage: '/assets/figma/hero-illustration.png',
  aboutImage: '/assets/figma/about-person-full.png',
  aboutTag: 'About',
  aboutTitle: 'About Me',
  aboutParagraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque.',
    'Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus r.'
  ],
  socialBtnText: 'Visit My Dribbble',
  socialBtnUrl: 'https://dribbble.com',
  socialBtnClass: 'btn-dribbble',
  socialIconSvg: `<svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.2c2.408 0 4.622.868 6.347 2.308-1.026 1.488-2.483 2.658-4.184 3.344-1.298-2.673-2.883-4.595-3.076-4.825.297-.04.603-.06.913-.06zm-3.23 1.258c.24.28 1.83 2.19 3.12 4.88-3.924 1.205-8.118 1.154-8.87 1.14 1.056-2.73 3.178-4.887 5.75-6.02zm-6.52 7.822c.45.006 4.394.04 8.275-1.127.348.742.67 1.507.962 2.29-4.22 1.34-7.854 4.54-8.082 4.743-.76-1.674-1.155-3.553-1.155-5.906zm2.467 7.228c.39-.34 3.77-3.29 7.9-4.57 1.06 2.8 1.76 5.86 1.95 6.78-1.74.83-3.69 1.3-5.75 1.3-1.53 0-2.98-.26-4.1-.71zm11.776-.874c-.21-.99-.87-3.86-1.89-6.53 1.63-.67 3.35-.99 5.09-1.02-.32 3.14-1.72 5.89-3.2 7.55zm-1.1-9.256c-1.68.04-3.34.35-4.94.99-.27-.72-.56-1.42-.88-2.1 1.61-.64 3-1.73 4-3.11 1.09 1.09 1.82 2.58 1.82 4.22z"/></svg>`,
  skills: [
    {
      name: 'Strategy & Direction',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
    },
    {
      name: 'Branding & Logo',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
    },
    {
      name: 'UI & UX Design',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
    },
    {
      name: 'Webflow Development',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
    }
  ],
  projects: [
    {
      id: 'ahuse',
      name: 'Ahuse',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/assets/figma/portfolio-ahuse.png',
      linkLabel: 'View In Dribbble',
      linkUrl: 'https://dribbble.com',
      tech: ['Figma', 'UI/UX', 'Real Estate Web']
    },
    {
      id: 'dashboard',
      name: 'App Dashboard',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/assets/figma/portfolio-dashboard.png',
      linkLabel: 'View In Dribbble',
      linkUrl: 'https://dribbble.com',
      tech: ['SaaS UI', 'Design System', 'Dashboard']
    },
    {
      id: 'easyrent',
      name: 'Easy Rent',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/assets/figma/portfolio-easyrent.png',
      linkLabel: 'View In Dribbble',
      linkUrl: 'https://dribbble.com',
      tech: ['Webflow', 'Responsive Layout', 'Prototype']
    }
  ],
  testimonials: [
    {
      name: 'Dianne Russell',
      company: 'Starbucks',
      avatar: '/assets/figma/avatar-dianne.png',
      quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra."'
    },
    {
      name: 'Kristin Watson',
      company: 'Louis Vuitton',
      avatar: '/assets/figma/avatar-kristin.png',
      quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra."'
    },
    {
      name: 'Kathryn Murphy',
      company: "McDonald's",
      avatar: '/assets/figma/avatar-kathryn.png',
      quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra."'
    }
  ],
  copyright: 'Made with 💖 by Airdokan'
};

const ARJUN_DATA = {
  logo: 'Arjun.',
  greeting: 'Hey, I am Arjun',
  titleHtml: 'Building the future with<br /><span class="highlight-purple" id="heroTitleHighlight">code, AI & innovation.</span>',
  description: 'Building scalable applications and intelligent solutions through software engineering and AI.',
  heroImage: '/assets/arjun-hero.png',
  aboutImage: '/assets/about-arjun-layered.png?v=white-bg',
  aboutTag: 'About',
  aboutTitle: 'About Me',
  aboutParagraphs: [
    'I’m a Software Engineer and final-year Information Technology student at P.E.S. Modern College of Engineering, Pune. I specialize in building scalable backend systems, REST APIs, machine learning solutions, and AI-powered full-stack applications using Python, Node.js, Express, React, and MongoDB.',
    'I enjoy solving complex problems, designing reliable software architectures, and transforming innovative ideas into practical, impactful applications.'
  ],
  socialBtnText: 'Visit My GitHub',
  socialBtnUrl: 'https://github.com/arjunghuge644',
  socialBtnClass: 'btn-primary',
  socialIconSvg: `<svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  skills: [
    {
      name: 'Backend & Systems Architecture',
      desc: 'Node.js, Express.js, RESTful microservices, WebSockets, and real-time signaling engineered for high reliability.'
    },
    {
      name: 'AI & Machine Learning',
      desc: 'Python, LLMs, RAG context retrieval, Manim mathematical animation, and predictive ML models.'
    },
    {
      name: 'Database & Cloud Pipelines',
      desc: 'MongoDB, MySQL, PostgreSQL relational modeling, Redis caching, and Docker containerization.'
    },
    {
      name: 'Full-Stack Web Development',
      desc: 'React.js, TypeScript, Tailwind CSS, Vite, and responsive user interfaces with accessible interactions.'
    }
  ],
  projects: [
    {
      id: 'careerpulse',
      name: 'CAREERPULSE',
      status: 'In Progress',
      desc: 'AI-driven career development platform that analyzes student skill profiles, identifies competency gaps, and generates structured learning roadmaps.',
      image: '/assets/careerpulse-preview.jpg',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge644/CareerPulse',
      tech: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Tailwind CSS']
    },
    {
      id: 'ai-workforce',
      name: 'AI WORKFORCE',
      status: 'Proof of Concept',
      desc: 'Workforce-as-a-Service (WaaS) platform for creating, configuring, and coordinating virtual AI employees with role templates and task DAG dependency workflows.',
      image: '/assets/ai-workforce-preview.jpg',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge644',
      tech: ['FastAPI', 'Python', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      id: 'wifi-csi-lab',
      name: 'WIFI CSI LAB',
      status: 'Proof of Concept',
      desc: 'ESP32 human motion sensing platform for acquiring, visualizing, processing, and classifying Wi-Fi Channel State Information (CSI) in real time.',
      image: '/assets/wificsi-preview.jpg',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge644',
      tech: ['Python', 'FastAPI', 'PySerial', 'WebSockets', 'React', 'ESP32']
    },
    {
      id: 'mathtube-ai',
      name: 'MATHTUBE AI',
      status: 'Proof of Concept',
      desc: 'Automated mathematical educational video generation engine utilizing SymPy for formula validation and Manim for programmatic mathematical animation.',
      image: '/assets/mathtube-preview.jpg',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge644',
      tech: ['Python', 'LLMs', 'RAG', 'SymPy', 'Manim', 'FastAPI']
    },
    {
      id: 'prescripto',
      name: 'PRESCRIPTO',
      status: 'Completed',
      desc: 'Hospital management and doctor appointment scheduling system with patient booking workflows, doctor schedule management, and role-based access.',
      image: '/assets/prescripto-preview.png',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge644/prescripto',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API']
    },
    {
      id: 'hikers-junction',
      name: 'HIKERS JUNCTION',
      status: 'In Progress',
      desc: 'Outdoor adventure and mountain trail discovery platform providing hikers with elevation profiles, route itineraries, and community trek coordination.',
      image: '/assets/hikers-junction-preview.jpg',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge644',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS']
    }
  ],
  testimonials: [
    {
      name: 'Academic Project Review',
      company: 'P.E.S. Modern College of Engineering',
      avatar: '/assets/figma/avatar-dianne.png',
      quote: '"Arjun demonstrates exceptional discipline in software engineering, backend architectures, and research initiatives with real-time Wi-Fi signal sensing."'
    },
    {
      name: 'Healthcare Platform Mentorship',
      company: 'Neeraj Healthcare Solutions',
      avatar: '/assets/figma/avatar-kristin.png',
      quote: '"Delivered reliable backend REST APIs and real-time WebRTC communication workflows. Strong understanding of role-based security and database structures."'
    },
    {
      name: 'Peer & Project Collaborators',
      company: 'Student Engineering Cohort',
      avatar: '/assets/figma/avatar-kathryn.png',
      quote: '"Great team partner on full-stack web and AI initiatives. Writes clean, modular code and consistently focuses on pragmatic, user-centric implementation."'
    }
  ],
  copyright: 'Made with 💖 by Arjun • Pune, India'
};

// Dynamic DOM Elements References
let modeToggleBtn, mobileModeToggleBtn, optFigma, optArjun;
let heroGreeting, heroTitleHighlight, heroTitle, heroDescription, heroImage, aboutImage, aboutParagraphs;
let portfolioSocialBtn, portfolioGrid, expertiseGrid, testimonialsGrid, footerCopyright;
let contactForm, formStatusNotice, toastNotification, toastMessage, toastIcon, toastCloseBtn;
let backToTopBtn, mobileMenuToggle, mobileDrawer, projectModal, modalBody, modalCloseBtn, modalBackdrop, siteHeader;

function refreshDOMElements() {
  modeToggleBtn = document.getElementById('modeToggleBtn');
  mobileModeToggleBtn = document.getElementById('mobileModeToggleBtn');
  optFigma = document.getElementById('optFigma');
  optArjun = document.getElementById('optArjun');

  heroGreeting = document.getElementById('heroGreeting');
  heroTitleHighlight = document.getElementById('heroTitleHighlight');
  heroTitle = document.getElementById('heroTitle');
  heroDescription = document.getElementById('heroDescription');
  heroImage = document.getElementById('heroImage');
  aboutImage = document.getElementById('aboutImage');
  aboutParagraphs = document.getElementById('aboutParagraphs');

  portfolioSocialBtn = document.getElementById('portfolioSocialBtn');
  portfolioGrid = document.getElementById('portfolioGrid');
  expertiseGrid = document.getElementById('expertiseGrid');
  testimonialsGrid = document.getElementById('testimonialsGrid');
  footerCopyright = document.getElementById('footerCopyright');

  contactForm = document.getElementById('contactForm');
  formStatusNotice = document.getElementById('formStatusNotice');
  toastNotification = document.getElementById('toastNotification');
  toastMessage = document.getElementById('toastMessage');
  toastIcon = document.getElementById('toastIcon');
  toastCloseBtn = document.getElementById('toastCloseBtn');
  backToTopBtn = document.getElementById('backToTopBtn');
  mobileMenuToggle = document.getElementById('mobileMenuToggle');
  mobileDrawer = document.getElementById('mobileDrawer');
  projectModal = document.getElementById('projectModal');
  modalBody = document.getElementById('modalBody');
  modalCloseBtn = document.getElementById('modalCloseBtn');
  modalBackdrop = document.getElementById('modalBackdrop');
  siteHeader = document.getElementById('header');
}

// Initialize app
function init() {
  refreshDOMElements();
  setupEventListeners();
  setupScrollSpy();
  toggleMode('arjun', true);
}

// Render dynamic content according to current mode
function renderContent(data) {
  if (heroGreeting) heroGreeting.textContent = data.greeting;

  if (heroTitle) {
    if (data.titleHtml) {
      heroTitle.innerHTML = data.titleHtml;
    } else {
      heroTitle.innerHTML = `I ${currentMode === 'arjun' ? 'architect' : 'create'} <span class="highlight-purple" id="heroTitleHighlight">${data.titleHighlight}</span><br />${data.titleSuffix}`;
    }
  }

  if (heroDescription) heroDescription.textContent = data.description;
  if (heroImage) heroImage.src = data.heroImage;
  if (aboutImage) aboutImage.src = data.aboutImage;

  // Render About Paragraphs
  if (aboutParagraphs && data.aboutParagraphs) {
    aboutParagraphs.innerHTML = data.aboutParagraphs.map(p => `<p>${p}</p>`).join('');
  }

  // Render Social Button in Portfolio Header
  if (portfolioSocialBtn) {
    portfolioSocialBtn.href = data.socialBtnUrl;
    portfolioSocialBtn.className = `btn ${data.socialBtnClass}`;
    portfolioSocialBtn.innerHTML = `${data.socialIconSvg}<span>${data.socialBtnText}</span>`;
    portfolioSocialBtn.setAttribute('aria-label', `${data.socialBtnText} (opens in new window)`);
  }

  // Render Skills
  if (expertiseGrid && data.skills) {
    const expertiseCards = expertiseGrid.querySelectorAll('.expertise-card');
    data.skills.forEach((skill, index) => {
      if (expertiseCards[index]) {
        const nameEl = expertiseCards[index].querySelector('.expertise-name');
        const descEl = expertiseCards[index].querySelector('.expertise-desc');
        if (nameEl) nameEl.textContent = skill.name;
        if (descEl) descEl.textContent = skill.desc;
      }
    });
  }

  // Render Projects
  if (portfolioGrid && data.projects) {
    portfolioGrid.innerHTML = data.projects.map(project => {
      let statusClass = 'status-in-progress';
      if (project.status === 'Completed') statusClass = 'status-completed';
      else if (project.status === 'Proof of Concept') statusClass = 'status-poc';

      const statusBadge = project.status ? `
        <span class="portfolio-status ${statusClass}">
          ${project.status}
        </span>
      ` : '';

      return `
        <article class="portfolio-card" data-project="${project.id}">
          <div class="portfolio-media" role="button" tabindex="0" aria-label="Open detailed preview for ${project.name}" title="Click to preview project details">
            <img
              src="${project.image}"
              alt="Preview of ${project.name}"
              class="portfolio-img"
              loading="lazy"
            />
          </div>
          <div class="portfolio-info">
            ${statusBadge}
            <h3 class="portfolio-name" role="button" tabindex="0" aria-label="Open preview for ${project.name}">
              ${project.name}
            </h3>
            <p class="portfolio-desc">${project.desc}</p>
            <a href="${project.linkUrl}" target="_blank" rel="noopener noreferrer" class="portfolio-link" data-id="${project.id}" aria-label="${project.linkLabel || 'View Repository'} for ${project.name} (opens in new window)">
              <span>${project.linkLabel || 'View Details'}</span>
              <svg viewBox="0 0 16 16" fill="none" class="link-arrow" aria-hidden="true">
                <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Attach accessible modal listeners to project card media & title triggers
    portfolioGrid.querySelectorAll('.portfolio-card').forEach(card => {
      const projId = card.getAttribute('data-project');
      const proj = data.projects.find(p => p.id === projId);
      if (!proj) return;

      const media = card.querySelector('.portfolio-media');
      if (media) {
        media.addEventListener('click', () => openProjectModal(proj));
        media.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectModal(proj);
          }
        });
      }

      const title = card.querySelector('.portfolio-name');
      if (title) {
        title.addEventListener('click', () => openProjectModal(proj));
        title.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectModal(proj);
          }
        });
      }
      // Note: .portfolio-link is deliberately NOT prevented. Clicking it navigates directly to the external repository.
    });
  }

  // Render Testimonials
  if (testimonialsGrid && data.testimonials) {
    testimonialsGrid.innerHTML = data.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="rating-stars" aria-label="5 out of 5 stars">
          ${Array(5).fill(`
            <svg viewBox="0 0 20 20" fill="#006b60" class="star-icon" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          `).join('')}
        </div>
        <blockquote class="testimonial-quote">
          ${t.quote}
        </blockquote>
        <div class="client-info">
          <img src="${t.avatar}" alt="Portrait of ${t.name}" class="client-avatar" loading="lazy" />
          <div>
            <h4 class="client-name">${t.name}</h4>
            <p class="client-company">${t.company}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Copyright
  if (footerCopyright && data.copyright) {
    footerCopyright.textContent = data.copyright;
  }
}

// Toggle Display Mode
function toggleMode(targetMode, silent = false) {
  currentMode = targetMode || (currentMode === 'figma' ? 'arjun' : 'figma');

  if (currentMode === 'arjun') {
    if (modeToggleBtn) {
      modeToggleBtn.classList.add('arjun-active');
      modeToggleBtn.setAttribute('aria-checked', 'true');
    }
    if (optFigma) optFigma.classList.remove('active');
    if (optArjun) optArjun.classList.add('active');
    if (mobileModeToggleBtn) {
      mobileModeToggleBtn.textContent = 'Switch to Figma Template';
      mobileModeToggleBtn.setAttribute('aria-label', 'Switch to Figma sample view');
    }
    renderContent(ARJUN_DATA);
    if (!silent) showToast("Switched to Arjun's Live Portfolio Data!", 'info');
  } else {
    if (modeToggleBtn) {
      modeToggleBtn.classList.remove('arjun-active');
      modeToggleBtn.setAttribute('aria-checked', 'false');
    }
    if (optFigma) optFigma.classList.add('active');
    if (optArjun) optArjun.classList.remove('active');
    if (mobileModeToggleBtn) {
      mobileModeToggleBtn.textContent = "Switch to Arjun's Data";
      mobileModeToggleBtn.setAttribute('aria-label', "Switch to Arjun's portfolio view");
    }
    renderContent(FIGMA_DATA);
    if (!silent) showToast('Switched to Original Figma Template View!', 'info');
  }
}

// Modal Details Handler
function openProjectModal(project) {
  if (!projectModal || !modalBody) return;

  lastFocusedTrigger = document.activeElement;

  let statusClass = 'status-in-progress';
  if (project.status === 'Completed') statusClass = 'status-completed';
  else if (project.status === 'Proof of Concept') statusClass = 'status-poc';

  const statusBadge = project.status ? `
    <span class="portfolio-status ${statusClass}" style="margin-bottom: 0;">
      ${project.status}
    </span>
  ` : '';

  modalBody.innerHTML = `
    <div style="margin-bottom: 24px;">
      <img src="${project.image}" alt="Preview of ${project.name}" style="width: 100%; border-radius: 12px; max-height: 400px; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.08);" />
    </div>
    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 16px;">
      ${statusBadge}
      ${(project.tech || []).map(t => `<span style="background: rgba(94, 59, 238, 0.08); color: #5e3bee; font-weight: 600; font-size: 13px; padding: 4px 12px; border-radius: 99px;">${t}</span>`).join('')}
    </div>
    <h2 id="modalTitle" tabindex="-1" style="font-size: 28px; font-weight: 700; color: #282938; margin-bottom: 12px; outline: none;">${project.name}</h2>
    <p style="font-size: 16px; line-height: 1.7; color: #5c6479; margin-bottom: 24px;">${project.desc}</p>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <a href="${project.linkUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="modalExternalLink" aria-label="${project.linkLabel || 'View Repository'} (opens in new window)">
        <span>${project.linkLabel || 'View Repository'}</span>
        <svg viewBox="0 0 16 16" fill="none" style="width: 14px; height: 14px;" aria-hidden="true">
          <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
      <button type="button" class="btn btn-outline" id="modalDismissBtn">Close Preview</button>
    </div>
  `;

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const dismissBtn = document.getElementById('modalDismissBtn');
  if (dismissBtn) dismissBtn.addEventListener('click', closeProjectModal);

  // Set initial focus to close button
  if (modalCloseBtn) modalCloseBtn.focus();
}

// Open Legal Notice in Accessible Modal Dialog
function openLegalModal(legalKey) {
  if (!projectModal || !modalBody) return;
  const content = LEGAL_CONTENT[legalKey];
  if (!content) return;

  lastFocusedTrigger = document.activeElement;

  modalBody.innerHTML = `
    <h2 id="modalTitle" tabindex="-1" style="font-size: 28px; font-weight: 700; color: #282938; margin-bottom: 16px; outline: none;">
      ${content.title}
    </h2>
    <div style="margin-bottom: 24px;">
      ${content.body}
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <button type="button" class="btn btn-primary" id="modalDismissBtn">Understood & Close</button>
    </div>
  `;

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const dismissBtn = document.getElementById('modalDismissBtn');
  if (dismissBtn) dismissBtn.addEventListener('click', closeProjectModal);

  if (modalCloseBtn) modalCloseBtn.focus();
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Restore focus to triggering control
  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
    lastFocusedTrigger.focus();
    lastFocusedTrigger = null;
  }
}

// Trap focus inside the modal dialog
function handleModalKeydown(e) {
  if (!projectModal || !projectModal.classList.contains('open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeProjectModal();
    return;
  }

  if (e.key === 'Tab') {
    const focusableSelectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(projectModal.querySelectorAll(focusableSelectors));

    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement || !projectModal.contains(document.activeElement)) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement || !projectModal.contains(document.activeElement)) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}

// Toast Notification
function showToast(message, type = 'info', duration = 4000) {
  if (!toastNotification || !toastMessage) return;

  toastMessage.textContent = message;

  // Set type styling and icon
  toastNotification.classList.remove('toast-info', 'toast-success', 'toast-error');
  if (type === 'error') {
    toastNotification.classList.add('toast-error');
    if (toastIcon) toastIcon.textContent = '!';
    toastNotification.setAttribute('role', 'alert');
  } else if (type === 'success') {
    toastNotification.classList.add('toast-success');
    if (toastIcon) toastIcon.textContent = '✓';
    toastNotification.setAttribute('role', 'status');
  } else {
    toastNotification.classList.add('toast-info');
    if (toastIcon) toastIcon.textContent = 'ℹ';
    toastNotification.setAttribute('role', 'status');
  }

  toastNotification.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    hideToast();
  }, duration);
}

function hideToast() {
  if (toastNotification) {
    toastNotification.classList.remove('show');
  }
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
}

// Contact Form Client-Side Validation
function validateContactForm(fields) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[+]?[\d\s().-]{7,20}$/;

  if (!fields.firstName || fields.firstName.trim().length < 2) {
    errors.firstName = 'Please enter your first name (at least 2 characters).';
  }

  if (!fields.lastName || fields.lastName.trim().length < 1) {
    errors.lastName = 'Please enter your last name.';
  }

  if (!fields.email || !emailRegex.test(fields.email.trim())) {
    errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
  }

  if (fields.phone && fields.phone.trim().length > 0 && !phoneRegex.test(fields.phone.trim())) {
    errors.phone = 'Please provide a valid phone number or leave blank.';
  }

  if (!fields.topic || fields.topic.trim() === '') {
    errors.topic = 'Please select a topic from the dropdown.';
  }

  if (!fields.message || fields.message.trim().length < 10) {
    errors.message = 'Please provide a message with at least 10 characters.';
  }

  if (!fields.terms) {
    errors.terms = 'You must accept the terms before submitting.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Clear individual field error state
function clearFieldError(fieldId) {
  const group = document.getElementById(`group-${fieldId}`);
  if (group) group.classList.remove('has-error');
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (errorEl) errorEl.textContent = '';
  const inputEl = document.getElementById(fieldId);
  if (inputEl) inputEl.removeAttribute('aria-invalid');
}

// Apply errors to form DOM
function applyFormErrors(errors) {
  Object.keys(errors).forEach(fieldId => {
    const group = document.getElementById(`group-${fieldId}`);
    if (group) group.classList.add('has-error');
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (errorEl) errorEl.textContent = errors[fieldId];
    const inputEl = document.getElementById(fieldId);
    if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
  });

  // Focus the first invalid field
  const firstErrorKey = Object.keys(errors)[0];
  if (firstErrorKey) {
    const firstInvalidInput = document.getElementById(firstErrorKey);
    if (firstInvalidInput) firstInvalidInput.focus();
  }
}

// Contact form submission logic
async function handleContactSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (!contactForm) return;

  const firstNameEl = document.getElementById('firstName');
  const lastNameEl = document.getElementById('lastName');
  const emailEl = document.getElementById('email');
  const phoneEl = document.getElementById('phone');
  const topicEl = document.getElementById('topic');
  const messageEl = document.getElementById('message');
  const termsEl = document.getElementById('terms');
  const submitBtn = document.getElementById('submitBtn');

  const fields = {
    firstName: firstNameEl ? firstNameEl.value : '',
    lastName: lastNameEl ? lastNameEl.value : '',
    email: emailEl ? emailEl.value : '',
    phone: phoneEl ? phoneEl.value : '',
    topic: topicEl ? topicEl.value : '',
    message: messageEl ? messageEl.value : '',
    terms: termsEl ? termsEl.checked : false
  };

  const validation = validateContactForm(fields);

  if (!validation.isValid) {
    applyFormErrors(validation.errors);
    showToast('Please correct the highlighted fields and accept the terms.', 'error');
    return;
  }

  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const originalText = btnText ? btnText.textContent : 'Submit';
  if (btnText) btnText.textContent = 'Sending...';
  if (submitBtn) submitBtn.disabled = true;

  // Check if a live submission endpoint is configured in environment or window config
  const configuredEndpoint = (typeof window !== 'undefined' && window.PORTFOLIO_CONTACT_ENDPOINT)
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_FORM_ENDPOINT)
    || null;

  try {
    if (configuredEndpoint) {
      // Live remote submission service configured
      const response = await fetch(configuredEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName: fields.firstName.trim(),
          lastName: fields.lastName.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          topic: fields.topic,
          message: fields.message.trim(),
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        showToast(`Thank you, ${fields.firstName}! Your message has been sent successfully.`, 'success');
        contactForm.reset();
        if (formStatusNotice) {
          formStatusNotice.className = 'form-status-notice notice-success show';
          formStatusNotice.innerHTML = `<strong>Message Sent:</strong> Thank you, ${fields.firstName}! Your message was successfully received.`;
        }
      } else {
        throw new Error(`Submission failed with status: ${response.status}`);
      }
    } else {
      // HONEST STATE: No remote backend submission service is configured in this repository.
      // Do NOT display a false success message. Provide an immediate, reliable fallback via mailto
      // and explicit feedback so the user's message is preserved and delivered.
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${fields.topic} - from ${fields.firstName} ${fields.lastName}`);
      const body = encodeURIComponent(
        `Hello Arjun,\n\n${fields.message.trim()}\n\n---\nSender Details:\nName: ${fields.firstName} ${fields.lastName}\nEmail: ${fields.email.trim()}\nPhone: ${fields.phone.trim() || 'Not provided'}\nTopic: ${fields.topic}\nSent from Portfolio Website`
      );
      const mailtoUrl = `mailto:arjunghuge644@gmail.com?subject=${subject}&body=${body}`;

      showToast('No remote submission API configured. Launching email client to send directly to Arjun.', 'info', 5000);

      if (formStatusNotice) {
        formStatusNotice.className = 'form-status-notice notice-info show';
        formStatusNotice.innerHTML = `
          <strong>Direct Form Service Notice:</strong> No third-party form handler is configured on this static build.
          <br />Your message has been pre-packaged. 
          <a href="${mailtoUrl}" style="color: #5e3bee; text-decoration: underline; font-weight: 700;">Click here to send directly via your email client to arjunghuge644@gmail.com</a>.
        `;
      }

      // Trigger mailto intent
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl;
      }
    }
  } catch (error) {
    showToast('Failed to connect to the configured submission service. Please email arjunghuge644@gmail.com.', 'error', 6000);
    if (formStatusNotice) {
      formStatusNotice.className = 'form-status-notice notice-error show';
      formStatusNotice.innerHTML = `
        <strong>Submission Delivery Issue:</strong> Could not confirm message delivery through the configured service.
        Please email Arjun directly at <a href="mailto:arjunghuge644@gmail.com" style="color: #c91f5e; font-weight: 700; text-decoration: underline;">arjunghuge644@gmail.com</a>.
      `;
    }
  } finally {
    if (btnText) btnText.textContent = originalText;
    if (submitBtn) submitBtn.disabled = false;
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Mode switcher desktop
  if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => toggleMode());
  }

  // Mode switcher mobile
  if (mobileModeToggleBtn) {
    mobileModeToggleBtn.addEventListener('click', () => {
      toggleMode();
      closeMobileDrawer();
    });
  }

  // Mobile menu toggle
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuToggle.classList.toggle('active', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close mobile drawer on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => closeMobileDrawer());
    });
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileMenuToggle) return;
    mobileDrawer.classList.remove('open');
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  // Close mobile drawer on click outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer && mobileDrawer.classList.contains('open') && mobileMenuToggle) {
      if (!mobileDrawer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMobileDrawer();
      }
    }
  });

  // Modal close events
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  if (toastCloseBtn) toastCloseBtn.addEventListener('click', hideToast);

  // Global Keydown Handler: Escape key dismissal & modal focus trap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('open')) {
        closeProjectModal();
        return;
      }
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileDrawer();
        if (mobileMenuToggle) mobileMenuToggle.focus();
        return;
      }
    }

    if (projectModal && projectModal.classList.contains('open')) {
      handleModalKeydown(e);
    }
  });

  // Legal modal triggers in footer
  const legalPrivacyBtn = document.getElementById('legalPrivacyBtn');
  if (legalPrivacyBtn) legalPrivacyBtn.addEventListener('click', () => openLegalModal('privacy'));

  const legalTermsBtn = document.getElementById('legalTermsBtn');
  if (legalTermsBtn) legalTermsBtn.addEventListener('click', () => openLegalModal('terms'));

  const legalCookiesBtn = document.getElementById('legalCookiesBtn');
  if (legalCookiesBtn) legalCookiesBtn.addEventListener('click', () => openLegalModal('cookies'));

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const mainEl = document.getElementById('main') || document.getElementById('home');
      if (mainEl) mainEl.focus();
    });
  }

  // Real-time form validation: clear error on input
  ['firstName', 'lastName', 'email', 'phone', 'topic', 'message', 'terms'].forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', () => clearFieldError(fieldId));
      el.addEventListener('change', () => clearFieldError(fieldId));
    }
  });

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Skills card hover active effect
  document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.expertise-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Automatically close drawer on screen width resize above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileDrawer();
    }
  }, { passive: true });
}

// Scroll spy for sticky nav, active links, and back-to-top button
function setupScrollSpy() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  const mobileNavLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));

  function updateScrollSpy() {
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Sticky Header elevation
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility & keyboard accessibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
        backToTopBtn.setAttribute('tabindex', '0');
        backToTopBtn.setAttribute('aria-hidden', 'false');
      } else {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.setAttribute('tabindex', '-1');
        backToTopBtn.setAttribute('aria-hidden', 'true');
      }
    }

    // Active nav link highlight
    let currentSectionId = 'home';
    const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
    const scrollBottom = isScrollable && scrollY > 100 && (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 50);

    if (scrollBottom) {
      currentSectionId = 'contact';
    } else if (scrollY <= 80) {
      currentSectionId = 'home';
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          const id = section.getAttribute('id');
          // Map "expertise" to Home
          currentSectionId = (id === 'expertise') ? 'home' : id;
        }
      });
    }

    // Synchronize desktop nav
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      const isMatch = href === `#${currentSectionId}`;
      item.classList.toggle('active', isMatch);
      if (isMatch) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    // Synchronize mobile drawer nav
    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${currentSectionId}`;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();
}

// Initialize when DOM is ready in browser environment (skip auto-init during vitest execution)
const isTestEnv = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test')
  || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'test');

if (typeof window !== 'undefined' && !isTestEnv) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

function getCurrentMode() {
  return currentMode;
}

// Export for automated unit and interaction testing
export {
  currentMode,
  getCurrentMode,
  toggleMode,
  openProjectModal,
  closeProjectModal,
  openLegalModal,
  showToast,
  hideToast,
  validateContactForm,
  handleContactSubmit,
  setupEventListeners,
  setupScrollSpy,
  init,
  ARJUN_DATA,
  FIGMA_DATA,
  LEGAL_CONTENT
};
