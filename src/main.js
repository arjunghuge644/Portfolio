/**
 * Personal Portfolio Website — Interactive Core Logic
 * Supports Figma Showcase Mode & Arjun's Live Portfolio Mode
 */

// Import portfolio-data.json directly for live mode
import portfolioData from '../portfolio-data.json';

// State management
let currentMode = 'arjun'; // 'arjun' | 'figma'

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
  socialIconSvg: `<svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.2c2.408 0 4.622.868 6.347 2.308-1.026 1.488-2.483 2.658-4.184 3.344-1.298-2.673-2.883-4.595-3.076-4.825.297-.04.603-.06.913-.06zm-3.23 1.258c.24.28 1.83 2.19 3.12 4.88-3.924 1.205-8.118 1.154-8.87 1.14 1.056-2.73 3.178-4.887 5.75-6.02zm-6.52 7.822c.45.006 4.394.04 8.275-1.127.348.742.67 1.507.962 2.29-4.22 1.34-7.854 4.54-8.082 4.743-.76-1.674-1.155-3.553-1.155-5.906zm2.467 7.228c.39-.34 3.77-3.29 7.9-4.57 1.06 2.8 1.76 5.86 1.95 6.78-1.74.83-3.69 1.3-5.75 1.3-1.53 0-2.98-.26-4.1-.71zm11.776-.874c-.21-.99-.87-3.86-1.89-6.53 1.63-.67 3.35-.99 5.09-1.02-.32 3.14-1.72 5.89-3.2 7.55zm-1.1-9.256c-1.68.04-3.34.35-4.94.99-.27-.72-.56-1.42-.88-2.1 1.61-.64 3-1.73 4-3.11 1.09 1.09 1.82 2.58 1.82 4.22z"/></svg>`,
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
  titleHighlight: 'scalable full stack',
  titleSuffix: '& autonomous AI systems',
  description: portfolioData.profile.bio || 'IT engineering student building scalable software, AI systems, and creative digital web applications with minimal clutter and maximum visual impact.',
  heroImage: '/assets/arjun-hero.png',
  aboutImage: '/assets/about-arjun-layered.png?v=white-bg',
  aboutTag: 'About',
  aboutTitle: 'About Me',
  aboutParagraphs: [
    'I am a Full Stack Architect & AI Engineer based in Mumbai, India. Currently pursuing B.Tech in Information Technology (8.8 CGPA) and building production-grade Retrieval-Augmented Generation (RAG) vector engines, microservices, and high-performance web applications.',
    'Winner of the National Hackathon 2025 for engineering an AI medical triage engine, and ranked in the top 1% algorithmic problem solvers with 500+ solved data structure challenges.'
  ],
  socialBtnText: 'Visit My GitHub',
  socialBtnUrl: portfolioData.profile.github.trim(),
  socialBtnClass: 'btn-primary',
  socialIconSvg: `<svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  skills: [
    {
      name: 'Full-Stack Architecture',
      desc: 'React.js, Next.js, Node.js, and Express microservices engineered for real-time scale and minimal latency.'
    },
    {
      name: 'AI & Vector Systems',
      desc: 'Python, LangChain, Pinecone vector search, RAG document context retrieval, and autonomous LLM agents.'
    },
    {
      name: 'Databases & In-Memory',
      desc: 'MongoDB Atlas, PostgreSQL relational modeling, Redis caching layers, and high-throughput query pipelines.'
    },
    {
      name: 'Cloud & DevOps CI/CD',
      desc: 'AWS infrastructure, Docker containerization, GitHub Actions automated CI/CD testing, and Vercel edge runtime.'
    }
  ],
  projects: [
    {
      id: 'rag-engine',
      name: 'NEURAL-SYNC RAG ENGINE',
      desc: 'Enterprise-grade Retrieval-Augmented Generation (RAG) platform powered by vector search embeddings and LLMs.',
      image: '/assets/project1.png',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge04',
      tech: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'React']
    },
    {
      id: 'ev-battery',
      name: 'VOLT-MIND EV BATTERY PREDICTOR',
      desc: 'Predictive analytics platform utilizing ML regression models to forecast EV battery State-of-Health & degradation.',
      image: '/assets/project3.png',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge04',
      tech: ['Python', 'PyTorch', 'Scikit-learn', 'Flask', 'Chart.js']
    },
    {
      id: 'prescripto',
      name: 'PRESCRIPTO HEALTHCARE PLATFORM',
      desc: 'Comprehensive doctor appointment scheduling system with admin analytics, doctor calendars, and patient portal.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      linkLabel: 'View GitHub Repository',
      linkUrl: 'https://github.com/arjunghuge04',
      tech: ['React.js', 'Node.js', 'MongoDB', 'JWT Auth', 'REST API']
    }
  ],
  testimonials: [
    {
      name: 'Sarah Jenkins',
      company: 'Tech Innovation Labs',
      avatar: '/assets/figma/avatar-dianne.png',
      quote: '"Arjun architected a blazing fast RAG pipeline that reduced our vector retrieval latency by 45%. Exceptional talent in full stack AI systems."'
    },
    {
      name: 'David Miller',
      company: 'CloudScale Global',
      avatar: '/assets/figma/avatar-kristin.png',
      quote: '"His grasp of full-stack TypeScript, Docker, and distributed cache is top notch. Delivers robust production code ahead of schedule."'
    },
    {
      name: 'Priya Sharma',
      company: 'HealthTech Solutions',
      avatar: '/assets/figma/avatar-kathryn.png',
      quote: '"The Prescripto platform Arjun engineered solved our doctor scheduling bottlenecks. Very clean UI and thoughtful user experience."'
    }
  ],
  copyright: 'Made with 💖 by Arjun • Mumbai, India'
};

// DOM Elements
const modeToggleBtn = document.getElementById('modeToggleBtn');
const mobileModeToggleBtn = document.getElementById('mobileModeToggleBtn');
const optFigma = document.getElementById('optFigma');
const optArjun = document.getElementById('optArjun');

const siteLogoText = document.getElementById('logoText');
const footerLogoText = document.getElementById('footerLogoText');
const heroGreeting = document.getElementById('heroGreeting');
const heroTitleHighlight = document.getElementById('heroTitleHighlight');
const heroTitle = document.getElementById('heroTitle');
const heroDescription = document.getElementById('heroDescription');
const heroImage = document.getElementById('heroImage');
const aboutImage = document.getElementById('aboutImage');
const aboutPortraitWrapper = document.getElementById('aboutPortraitWrapper');
const aboutParagraphs = document.getElementById('aboutParagraphs');

const portfolioSocialBtn = document.getElementById('portfolioSocialBtn');
const portfolioBtnText = document.getElementById('portfolioBtnText');
const portfolioGrid = document.getElementById('portfolioGrid');
const expertiseGrid = document.getElementById('expertiseGrid');
const testimonialsGrid = document.getElementById('testimonialsGrid');
const footerCopyright = document.getElementById('footerCopyright');

const contactForm = document.getElementById('contactForm');
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');
const backToTopBtn = document.getElementById('backToTopBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const siteHeader = document.getElementById('header');

// Initialize app
function init() {
  setupEventListeners();
  setupScrollSpy();
  toggleMode('arjun', true);
}

// Render dynamic content according to current mode
function renderContent(data) {
  if (siteLogoText) siteLogoText.textContent = data.logo;
  if (footerLogoText) footerLogoText.textContent = data.logo;
  heroGreeting.textContent = data.greeting;

  heroTitle.innerHTML = `I ${currentMode === 'arjun' ? 'architect' : 'create'} <span class="highlight-purple" id="heroTitleHighlight">${data.titleHighlight}</span><br />${data.titleSuffix}`;
  heroDescription.textContent = data.description;
  heroImage.src = data.heroImage;
  aboutImage.src = data.aboutImage;

  // Render About Paragraphs
  aboutParagraphs.innerHTML = data.aboutParagraphs.map(p => `<p>${p}</p>`).join('');

  // Render Social Button in Portfolio Header
  if (portfolioSocialBtn) {
    portfolioSocialBtn.href = data.socialBtnUrl;
    portfolioSocialBtn.className = `btn ${data.socialBtnClass}`;
    portfolioSocialBtn.innerHTML = `${data.socialIconSvg}<span>${data.socialBtnText}</span>`;
  }

  // Render Skills
  const expertiseCards = expertiseGrid.querySelectorAll('.expertise-card');
  data.skills.forEach((skill, index) => {
    if (expertiseCards[index]) {
      const nameEl = expertiseCards[index].querySelector('.expertise-name');
      const descEl = expertiseCards[index].querySelector('.expertise-desc');
      if (nameEl) nameEl.textContent = skill.name;
      if (descEl) descEl.textContent = skill.desc;
    }
  });

  // Render Projects
  portfolioGrid.innerHTML = data.projects.map(project => `
    <article class="portfolio-card" data-project="${project.id}">
      <div class="portfolio-media">
        <img
          src="${project.image}"
          alt="${project.name}"
          class="portfolio-img"
          loading="lazy"
        />
      </div>
      <div class="portfolio-info">
        <h3 class="portfolio-name">${project.name}</h3>
        <p class="portfolio-desc">${project.desc}</p>
        <a href="${project.linkUrl}" target="_blank" rel="noopener noreferrer" class="portfolio-link" data-id="${project.id}">
          <span>${project.linkLabel}</span>
          <svg viewBox="0 0 16 16" fill="none" class="link-arrow">
            <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  `).join('');

  // Re-attach modal listeners on project cards
  portfolioGrid.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // If clicking to view details, we can open our modal
      e.preventDefault();
      const projId = link.getAttribute('data-id');
      const proj = data.projects.find(p => p.id === projId);
      if (proj) openProjectModal(proj);
    });
  });

  // Render Testimonials
  testimonialsGrid.innerHTML = data.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="rating-stars" aria-label="5 out of 5 stars">
        ${Array(5).fill(`
          <svg viewBox="0 0 20 20" fill="#006b60" class="star-icon">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        `).join('')}
      </div>
      <blockquote class="testimonial-quote">
        ${t.quote}
      </blockquote>
      <div class="client-info">
        <img src="${t.avatar}" alt="${t.name}" class="client-avatar" />
        <div>
          <h4 class="client-name">${t.name}</h4>
          <p class="client-company">${t.company}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Copyright
  footerCopyright.textContent = data.copyright;
}

// Toggle Display Mode
function toggleMode(targetMode, silent = false) {
  currentMode = targetMode || (currentMode === 'figma' ? 'arjun' : 'figma');
  
  if (currentMode === 'arjun') {
    modeToggleBtn.classList.add('arjun-active');
    optFigma.classList.remove('active');
    optArjun.classList.add('active');
    mobileModeToggleBtn.textContent = "Switch to Figma Template";
    renderContent(ARJUN_DATA);
    if (!silent) showToast("Switched to Arjun's Live Portfolio Data!");
  } else {
    modeToggleBtn.classList.remove('arjun-active');
    optFigma.classList.add('active');
    optArjun.classList.remove('active');
    mobileModeToggleBtn.textContent = "Switch to Arjun's Data";
    renderContent(FIGMA_DATA);
    if (!silent) showToast("Switched to Original Figma Template View!");
  }
}

// Modal Details Handler
function openProjectModal(project) {
  modalBody.innerHTML = `
    <div style="margin-bottom: 24px;">
      <img src="${project.image}" alt="${project.name}" style="width: 100%; border-radius: 12px; max-height: 400px; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.08);" />
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
      ${(project.tech || []).map(t => `<span style="background: rgba(94, 59, 238, 0.08); color: #5e3bee; font-weight: 600; font-size: 13px; padding: 4px 12px; border-radius: 99px;">${t}</span>`).join('')}
    </div>
    <h2 style="font-size: 28px; font-weight: 700; color: #282938; margin-bottom: 12px;">${project.name}</h2>
    <p style="font-size: 16px; line-height: 1.7; color: #5c6479; margin-bottom: 24px;">${project.desc}</p>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <a href="${project.linkUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <span>Visit Live Link</span>
        <svg viewBox="0 0 16 16" fill="none" style="width: 14px; height: 14px;">
          <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
      <button class="btn btn-outline" id="modalDismissBtn">Close Preview</button>
    </div>
  `;

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  document.getElementById('modalDismissBtn').addEventListener('click', closeProjectModal);
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Toast Notification
let toastTimer = null;
function showToast(message) {
  toastMessage.textContent = message;
  toastNotification.classList.add('show');
  
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastNotification.classList.remove('show');
  }, 3800);
}

// Setup Event Listeners
function setupEventListeners() {
  // Mode switcher desktop
  modeToggleBtn.addEventListener('click', () => toggleMode());

  // Mode switcher mobile
  mobileModeToggleBtn.addEventListener('click', () => {
    toggleMode();
    closeMobileDrawer();
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileMenuToggle.classList.toggle('active', isOpen);
  });

  // Close mobile drawer on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => closeMobileDrawer());
  });

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    mobileMenuToggle.classList.remove('active');
  }

  // Modal close events
  modalCloseBtn.addEventListener('click', closeProjectModal);
  modalBackdrop.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Back to top click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Contact form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const terms = document.getElementById('terms').checked;

    if (!firstName || !email || !message || !terms) {
      showToast('Please complete all required fields and accept the terms.');
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate responsive sending
    setTimeout(() => {
      btnText.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      showToast(`Thank you, ${firstName}! Your message has been received.`);
    }, 900);
  });

  // Skills card hover active effect
  document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.expertise-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// Scroll spy for sticky nav, active links, and back-to-top button
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky Header elevation
    if (scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active nav link highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${currentSectionId}`);
      });
    }
  }, { passive: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
