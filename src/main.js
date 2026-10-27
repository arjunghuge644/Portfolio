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
  beyondTag: 'Philosophy & Practice',
  beyondTitle: 'Beyond the Code',
  beyondSubtitle: 'The tools I use, the projects I build, and the principles that guide my engineering journey.',
  beyondCards: [
    {
      type: 'public',
      badge: 'Design Systems & Open Source',
      title: 'Building in Public',
      desc: 'Explore template design systems, component libraries, and community UI kits.',
      githubProfile: {
        handle: '@figma-community',
        meta: 'Sample Design Template',
        url: 'https://github.com'
      },
      featuredRepos: [
        {
          name: 'Design-System-Tokens',
          badge: 'Template',
          url: 'https://github.com',
          desc: 'Harmonious color palettes, typographic scales, and responsive design guidelines for modern web applications.',
          tech: ['Figma', 'CSS Tokens', 'Style Dictionary']
        },
        {
          name: 'Accessible-UI-Library',
          badge: 'Template',
          url: 'https://github.com',
          desc: 'WCAG AAA compliant component primitives with semantic markup, focus rings, and high-contrast support.',
          tech: ['Vanilla JS', 'Semantic HTML', 'WCAG 2.1'],
          actionLabel: 'View Accessible-UI-Library template'
        },
        {
          name: 'Developer-Showcase-Kit',
          badge: 'Template',
          url: 'https://github.com',
          desc: 'Project discovery cards, deployment status indicators, and clean layout patterns for portfolio showcases.',
          tech: ['Figma Kit', 'Design Tokens', 'Discovery UI'],
          linkText: 'View Prototype',
          actionLabel: 'View Developer-Showcase-Kit template'
        }
      ]
    },
    {
      type: 'toolkit',
      badge: 'Design Stack & Workflow',
      title: 'My Developer Toolkit',
      desc: 'The languages, frameworks, databases, AI tools, and development environment I use to build software.',
      groups: [
        {
          title: 'Design & Prototyping',
          skills: [
            { name: 'Figma', logo: '/assets/tech/figma.svg' },
            { name: 'Auto Layout', logo: '/assets/tech/layout.svg' },
            { name: 'Design Tokens', logo: '/assets/tech/components.svg' },
            { name: 'Prototyping', logo: '/assets/tech/design.svg' },
            { name: 'Component Variants', logo: '/assets/tech/components.svg' }
          ]
        },
        {
          title: 'Frontend Foundations',
          skills: [
            { name: 'HTML5', logo: '/assets/tech/html5.svg' },
            { name: 'Vanilla CSS', logo: '/assets/tech/css3.svg' },
            { name: 'JavaScript (ES6+)', logo: '/assets/tech/javascript.svg' },
            { name: 'Responsive Layouts', logo: '/assets/tech/layout.svg' }
          ]
        },
        {
          title: 'Design Handoff & Tooling',
          skills: [
            { name: 'Git', logo: '/assets/tech/git.svg' },
            { name: 'Vite Dev Server', logo: '/assets/tech/vite.svg' },
            { name: 'SVG Optimization', logo: '/assets/tech/code.svg' },
            { name: 'CSS Variables', logo: '/assets/tech/css3.svg' }
          ]
        },
        {
          title: 'Accessibility & QA',
          skills: [
            { name: 'Contrast Validation', logo: '/assets/tech/a11y.svg' },
            { name: 'Keyboard Navigation', logo: '/assets/tech/a11y.svg' },
            { name: 'Screen Reader Semantics', logo: '/assets/tech/a11y.svg' }
          ]
        }
      ]
    },
    {
      type: 'beyond',
      badge: 'Community & Craft',
      title: 'Beyond Programming',
      desc: 'Exploring new technologies, learning through experimentation, and collaborating on engineering and community activities.',
      activities: [
        {
          icon: 'star',
          title: 'Design System Workshops',
          text: 'Facilitating hands-on sessions on typography, component tokens, and responsive layout systems.'
        },
        {
          icon: 'award',
          title: 'Community Design Challenges',
          text: 'Participating in UI/UX sprint challenges and publishing open-source Figma community resources.'
        },
        {
          icon: 'wifi',
          title: 'Interactive Micro-interactions',
          text: 'Experimenting with lightweight CSS transitions, focus indicators, and state animations.'
        },
        {
          icon: 'users',
          title: 'Mentorship & Peer Feedback',
          text: 'Reviewing interface designs and providing actionable accessibility feedback.'
        }
      ]
    },
    {
      type: 'philosophy',
      badge: 'Design Principles',
      title: 'My Engineering Philosophy',
      desc: 'I believe in understanding the problem, designing maintainable systems, validating solutions, and improving continuously.',
      principles: [
        {
          num: '01',
          title: 'Clarity before complexity.',
          text: 'Design with purpose and clarity before adding embellishments. A clean hierarchy solves user problems directly.'
        },
        {
          num: '02',
          title: 'Reliability through testing.',
          text: 'Verify designs across viewport sizes, keyboard navigation, and high-contrast environments.'
        },
        {
          num: '03',
          title: 'Continuous learning and improvement.',
          text: 'Iterate based on real user feedback, track evolving web standards, and continuously hone craft.'
        }
      ]
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
  beyondTag: 'Philosophy & Practice',
  beyondTitle: 'Beyond the Code',
  beyondSubtitle: 'The tools I use, the projects I build, and the principles that guide my engineering journey.',
  beyondCards: [
    {
      type: 'public',
      badge: 'Open Source & Code',
      title: 'Building in Public',
      desc: 'Explore my repositories, development activity, and open-source contributions.',
      githubProfile: {
        handle: '@arjunghuge644',
        meta: 'Verified GitHub Account',
        url: 'https://github.com/arjunghuge644'
      },
      featuredRepos: [
        {
          name: 'CareerPulse',
          badge: 'Public',
          url: 'https://github.com/arjunghuge644/CareerPulse',
          desc: 'AI-driven career development platform that analyzes student skill profiles, identifies competency gaps, and generates structured learning roadmaps.',
          tech: ['React', 'TypeScript', 'FastAPI']
        },
        {
          name: 'prescripto',
          badge: 'Public',
          url: 'https://github.com/arjunghuge644/prescripto',
          desc: 'Hospital management and doctor appointment scheduling system with patient booking workflows, doctor schedules, and role-based access.',
          tech: ['Node.js', 'Express', 'MongoDB'],
          actionLabel: 'View Prescripto repository on GitHub'
        },
        {
          name: 'deployed.site',
          badge: 'Live Platform',
          url: 'https://www.deployed.site',
          desc: 'A developer showcase platform for publishing and discovering deployed projects, featuring deployment status badges and project discovery.',
          tech: [],
          linkText: 'View Platform',
          actionLabel: 'View deployed.site platform'
        }
      ]
    },
    {
      type: 'toolkit',
      badge: 'Core Stack & Workflow',
      title: 'My Developer Toolkit',
      desc: 'The languages, frameworks, databases, AI tools, and development environment I use to build software.',
      groups: [
        {
          title: 'Languages & Frameworks',
          skills: [
            { name: 'Python', logo: '/assets/tech/python.svg' },
            { name: 'Node.js', logo: '/assets/tech/nodejs.svg' },
            { name: 'Express.js', logo: '/assets/tech/express.svg' },
            { name: 'React.js', logo: '/assets/tech/react.svg' },
            { name: 'TypeScript', logo: '/assets/tech/typescript.svg' },
            { name: 'JavaScript', logo: '/assets/tech/javascript.svg' },
            { name: 'HTML5', logo: '/assets/tech/html5.svg' },
            { name: 'CSS3', logo: '/assets/tech/css3.svg' }
          ]
        },
        {
          title: 'Databases & Caching',
          skills: [
            { name: 'MongoDB', logo: '/assets/tech/mongodb.svg' },
            { name: 'PostgreSQL', logo: '/assets/tech/postgresql.svg' },
            { name: 'MySQL', logo: '/assets/tech/mysql.svg' },
            { name: 'Redis', logo: '/assets/tech/redis.svg' }
          ]
        },
        {
          title: 'AI & ML Engineering',
          skills: [
            { name: 'FastAPI', logo: '/assets/tech/fastapi.svg' },
            { name: 'Scikit-learn', logo: '/assets/tech/scikit-learn.svg' },
            { name: 'RAG Architectures', logo: '/assets/tech/rag.svg' },
            { name: 'LLM Integration', logo: '/assets/tech/llm.svg' },
            { name: 'Streamlit', logo: '/assets/tech/streamlit.svg' }
          ]
        },
        {
          title: 'DevOps & Tools',
          skills: [
            { name: 'Git', logo: '/assets/tech/git.svg' },
            { name: 'GitHub', logo: '/assets/tech/github.svg' },
            { name: 'Docker', logo: '/assets/tech/docker.svg' },
            { name: 'Postman', logo: '/assets/tech/postman.svg' },
            { name: 'Vite', logo: '/assets/tech/vite.svg' },
            { name: 'Linux / Bash', logo: '/assets/tech/linux.svg' }
          ]
        }
      ]
    },
    {
      type: 'beyond',
      badge: 'Leadership & Community',
      title: 'Beyond Programming',
      desc: 'Exploring new technologies, learning through experimentation, and collaborating on engineering and community activities.',
      activities: [
        {
          icon: 'star',
          title: 'NSS Design Co-Head',
          text: 'Led creative direction and design initiatives for college community outreach, social welfare campaigns, and awareness drives.'
        },
        {
          icon: 'award',
          title: 'IDEA FORGE — 2nd Prize Winner',
          text: 'Awarded second prize in college inter-department engineering innovation competition for building practical technical solutions.'
        },
        {
          icon: 'wifi',
          title: 'Hardware & Signal Sensing Research',
          text: 'Prototyping with ESP32 microcontrollers and Wi-Fi Channel State Information (CSI) for device-free indoor motion sensing.'
        },
        {
          icon: 'users',
          title: 'Cohort Mentorship & Peer Code Reviews',
          text: 'Collaborating with fellow IT engineers at P.E.S. Modern College of Engineering on full-stack architecture, API reviews, and open discussions.'
        }
      ]
    },
    {
      type: 'philosophy',
      badge: 'Engineering Principles',
      title: 'My Engineering Philosophy',
      desc: 'I believe in understanding the problem, designing maintainable systems, validating solutions, and improving continuously.',
      principles: [
        {
          num: '01',
          title: 'Clarity before complexity.',
          text: 'Focus on deep problem understanding and clean architecture before introducing abstractions. The most elegant solution is often the most direct one.'
        },
        {
          num: '02',
          title: 'Reliability through testing.',
          text: 'Build dependable systems with automated verification, edge-case coverage, and honest failure states rather than assuming optimistic paths.'
        },
        {
          num: '03',
          title: 'Continuous learning and improvement.',
          text: 'Stay curious with emerging AI and systems engineering, iterate rapidly through hands-on experimentation, and consistently refine engineering craft.'
        }
      ]
    }
  ],
  copyright: 'Made with 💖 by Arjun • Pune, India'
};

// Dynamic DOM Elements References
let modeToggleBtn, mobileModeToggleBtn, optFigma, optArjun;
let heroGreeting, heroTitleHighlight, heroTitle, heroDescription, heroImage, aboutImage, aboutParagraphs;
let portfolioSocialBtn, portfolioGrid, expertiseGrid, beyondGrid, beyondTag, beyondTitle, beyondSubtitle, footerCopyright;
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
  beyondGrid = document.getElementById('beyondGrid');
  beyondTag = document.getElementById('beyondTag');
  beyondTitle = document.getElementById('beyondTitle');
  beyondSubtitle = document.getElementById('beyondSubtitle');
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
  initToolkitCarousels();
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

  // Render Beyond the Code Section
  if (beyondTag && data.beyondTag) beyondTag.textContent = data.beyondTag;
  if (beyondTitle && data.beyondTitle) beyondTitle.textContent = data.beyondTitle;
  if (beyondSubtitle && data.beyondSubtitle) beyondSubtitle.textContent = data.beyondSubtitle;

  if (beyondGrid && data.beyondCards) {
    beyondGrid.innerHTML = renderBeyondCardsHtml(data.beyondCards);
    initToolkitCarousels();
  }

  // Copyright
  if (footerCopyright && data.copyright) {
    footerCopyright.textContent = data.copyright;
  }
}

// Render HTML for the 4 Beyond the Code Cards
function renderBeyondCardsHtml(cards) {
  if (!cards || !Array.isArray(cards)) return '';

  return cards.map(card => {
    if (card.type === 'public') {
      return `
        <article class="beyond-card" aria-labelledby="cardTitlePublic">
          <div class="beyond-card-header">
            <div class="beyond-card-top">
              <div class="beyond-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                  <line x1="6" y1="3" x2="6" y2="15"></line>
                  <circle cx="18" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M18 9a9 9 0 0 1-9 9"></path>
                </svg>
              </div>
              <span class="beyond-badge">${card.badge}</span>
            </div>
            <h3 class="beyond-card-title" id="cardTitlePublic">${card.title}</h3>
            <p class="beyond-card-desc">${card.desc}</p>
          </div>

          <div class="beyond-card-body">
            <div class="beyond-github-profile">
              <div class="profile-info">
                <span class="profile-handle">${card.githubProfile.handle}</span>
                <span class="profile-meta">${card.githubProfile.meta}</span>
              </div>
              <a href="${card.githubProfile.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary beyond-profile-btn" aria-label="Visit ${card.githubProfile.handle} profile on GitHub (opens in a new tab)">
                <span>View GitHub Profile</span>
                <svg viewBox="0 0 20 20" fill="currentColor" class="external-icon" aria-hidden="true" width="16" height="16">
                  <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>

            <div class="beyond-repos-list">
              <h4 class="beyond-subheading">Featured Repositories</h4>
              <div class="beyond-repo-cards">
                ${card.featuredRepos.map(repo => `
                  <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="beyond-repo-item" aria-label="${repo.actionLabel || `View ${repo.name} repository on GitHub`} (opens in a new tab)">
                    <div class="repo-header">
                      <span class="repo-name">${repo.name}</span>
                      <span class="repo-badge">${repo.badge}</span>
                    </div>
                    <p class="repo-desc">${repo.desc}</p>
                    ${repo.tech && repo.tech.length ? `
                      <div class="repo-tech-pills">
                        ${repo.tech.map(t => `<span class="repo-tech-pill">${t}</span>`).join('')}
                      </div>
                    ` : ''}
                    ${repo.linkText ? `
                      <div class="repo-action-row">
                        <span class="repo-action-link">
                          <span>${repo.linkText}</span>
                          <svg viewBox="0 0 16 16" fill="none" class="link-arrow" aria-hidden="true" width="12" height="12">
                            <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </span>
                      </div>
                    ` : ''}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </article>
      `;
    }

    if (card.type === 'toolkit') {
      const carouselDirections = ['left', 'right', 'left', 'right'];
      const carouselDurations = ['30s', '26s', '32s', '28s'];

      return `
        <article class="beyond-card" aria-labelledby="cardTitleToolkit">
          <div class="beyond-card-header">
            <div class="beyond-card-top">
              <div class="beyond-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <span class="beyond-badge">${card.badge}</span>
            </div>
            <h3 class="beyond-card-title" id="cardTitleToolkit">${card.title}</h3>
            <p class="beyond-card-desc">${card.desc}</p>
          </div>

          <div class="beyond-card-body">
            <div class="toolkit-groups">
              ${card.groups.map((g, idx) => {
                const titleId = `toolkit-group-title-${idx + 1}`;
                const dir = carouselDirections[idx % carouselDirections.length];
                const duration = carouselDurations[idx % carouselDurations.length];

                // If a category has fewer items, repeat them so the track comfortably overflows the viewport
                const numSkills = g.skills.length;
                const repeatCount = Math.max(1, Math.ceil(8 / numSkills));

                const buildTileHtml = (s, isDecorative = false) => {
                  const name = typeof s === 'object' ? s.name : s;
                  const logo = typeof s === 'object' ? s.logo : '';
                  const decorativeAttr = isDecorative ? ' tabindex="-1" aria-hidden="true"' : '';
                  return `
                    <div class="toolkit-tile toolkit-pill" title="${name}"${decorativeAttr}>
                      ${logo ? `
                        <div class="toolkit-tile-icon-wrap"${isDecorative ? ' aria-hidden="true"' : ''}>
                          <img src="${logo}" alt="" aria-hidden="true" class="toolkit-tile-icon" width="34" height="34" loading="lazy" onerror="this.onerror=null; this.src='/assets/tech/code.svg';" />
                        </div>
                      ` : ''}
                      <span class="toolkit-tile-label"${isDecorative ? ' aria-hidden="true"' : ''}>${name}</span>
                    </div>
                  `;
                };

                // Primary group: first pass is accessible; subsequent repeats (if any) are decorative
                let primaryTilesHtml = '';
                for (let r = 0; r < repeatCount; r++) {
                  primaryTilesHtml += g.skills.map(s => buildTileHtml(s, r > 0)).join('');
                }

                // Duplicate group: completely decorative for seamless infinite loop
                let duplicateTilesHtml = '';
                for (let r = 0; r < repeatCount; r++) {
                  duplicateTilesHtml += g.skills.map(s => buildTileHtml(s, true)).join('');
                }

                return `
                  <div class="toolkit-group">
                    <div class="toolkit-group-header">
                      <h4 class="toolkit-group-title" id="${titleId}">${g.title}</h4>
                      <div class="toolkit-carousel-controls" aria-label="${g.title} navigation">
                        <button type="button" class="toolkit-nav-btn toolkit-nav-prev" aria-label="Previous ${g.title} technologies" title="Scroll left" disabled aria-disabled="true">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <button type="button" class="toolkit-nav-btn toolkit-nav-next" aria-label="Next ${g.title} technologies" title="Scroll right">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="toolkit-carousel" role="region" aria-labelledby="${titleId}" tabindex="0" aria-label="${g.title} technologies (auto-scrolling carousel, pause on hover)">
                      <div class="toolkit-track" data-direction="${dir}" style="--duration: ${duration};">
                        <div class="toolkit-track-group toolkit-track-primary toolkit-tiles toolkit-tags">
                          ${primaryTilesHtml}
                        </div>
                        <div class="toolkit-track-group toolkit-track-duplicate toolkit-tiles toolkit-tags" aria-hidden="true">
                          ${duplicateTilesHtml}
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </article>
      `;
    }

    if (card.type === 'beyond') {
      const getIconSvg = (iconName) => {
        if (iconName === 'star') {
          return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        }
        if (iconName === 'award') {
          return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`;
        }
        if (iconName === 'wifi') {
          return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`;
        }
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
      };

      return `
        <article class="beyond-card" aria-labelledby="cardTitleBeyond">
          <div class="beyond-card-header">
            <div class="beyond-card-top">
              <div class="beyond-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
              </div>
              <span class="beyond-badge">${card.badge}</span>
            </div>
            <h3 class="beyond-card-title" id="cardTitleBeyond">${card.title}</h3>
            <p class="beyond-card-desc">${card.desc}</p>
          </div>

          <div class="beyond-card-body">
            <div class="beyond-activity-list">
              ${card.activities.map(act => `
                <div class="beyond-activity-item">
                  <div class="activity-icon-wrap" aria-hidden="true">
                    ${getIconSvg(act.icon)}
                  </div>
                  <div class="activity-content">
                    <h4 class="activity-title">${act.title}</h4>
                    <p class="activity-text">${act.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </article>
      `;
    }

    if (card.type === 'philosophy') {
      return `
        <article class="beyond-card" aria-labelledby="cardTitlePhilosophy">
          <div class="beyond-card-header">
            <div class="beyond-card-top">
              <div class="beyond-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <span class="beyond-badge">${card.badge}</span>
            </div>
            <h3 class="beyond-card-title" id="cardTitlePhilosophy">${card.title}</h3>
            <p class="beyond-card-desc">${card.desc}</p>
          </div>

          <div class="beyond-card-body">
            <div class="philosophy-principles">
              ${card.principles.map(p => `
                <div class="philosophy-item">
                  <div class="principle-number" aria-hidden="true">${p.num}</div>
                  <div class="principle-content">
                    <h4 class="principle-heading">${p.title}</h4>
                    <p class="principle-desc">${p.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </article>
      `;
    }

    return '';
  }).join('');
}

// Global reference to ResizeObserver for cleanup
let toolkitResizeObserver = null;

// Initialize continuous infinite auto-scrolling carousels for technology toolkit categories
function initToolkitCarousels() {
  const groups = document.querySelectorAll('.toolkit-group');
  if (!groups.length) return;

  // Clean up any existing observer to prevent duplicate observers/leaks
  if (toolkitResizeObserver) {
    toolkitResizeObserver.disconnect();
    toolkitResizeObserver = null;
  }

  const prefersReducedMotion = (typeof window !== 'undefined' && window.matchMedia)
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  function updateTrackLoopDistance(track) {
    const primaryGroup = track.querySelector('.toolkit-track-primary');
    if (!primaryGroup) return;

    const gap = 10;
    // In headless test environments offsetWidth might be 0, calculate based on tiles
    const tileCount = primaryGroup.querySelectorAll('.toolkit-tile').length;
    const fallbackWidth = tileCount > 0 ? (tileCount * 84 + (tileCount - 1) * gap) : 752;
    const measuredWidth = primaryGroup.offsetWidth || fallbackWidth;
    const loopDist = Math.round(measuredWidth + gap);

    track.style.setProperty('--loop-dist', `${loopDist}px`);
  }

  function updateAllLoopDistances() {
    document.querySelectorAll('.toolkit-track').forEach(updateTrackLoopDistance);
  }

  // Initial calculation of loop distances
  updateAllLoopDistances();

  // Setup ResizeObserver for dynamic recalculation on viewport change
  if (typeof ResizeObserver !== 'undefined') {
    toolkitResizeObserver = new ResizeObserver(() => {
      updateAllLoopDistances();
    });

    document.querySelectorAll('.toolkit-carousel').forEach(carousel => {
      toolkitResizeObserver.observe(carousel);
    });
  }

  // Setup controls and interaction listeners for each group
  groups.forEach(group => {
    const carousel = group.querySelector('.toolkit-carousel');
    const track = group.querySelector('.toolkit-track');
    const prevBtn = group.querySelector('.toolkit-nav-prev');
    const nextBtn = group.querySelector('.toolkit-nav-next');

    if (!carousel || !prevBtn || !nextBtn) return;

    function updateControls() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const atStart = carousel.scrollLeft <= 4;
      const atEnd = maxScroll > 4 && carousel.scrollLeft >= maxScroll - 4;

      prevBtn.disabled = atStart;
      if (atStart) {
        prevBtn.setAttribute('aria-disabled', 'true');
      } else {
        prevBtn.removeAttribute('aria-disabled');
      }

      nextBtn.disabled = atEnd;
      if (atEnd) {
        nextBtn.setAttribute('aria-disabled', 'true');
      } else {
        nextBtn.removeAttribute('aria-disabled');
      }
    }

    const scrollStep = 188; // ~2 tiles

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -scrollStep,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: scrollStep,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });

    // Keyboard horizontal navigation when carousel container is focused
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        carousel.scrollBy({
          left: -94,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        carousel.scrollBy({
          left: 94,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        e.preventDefault();
      }
    });

    // Pause on hover or focus
    if (track) {
      carousel.addEventListener('pointerenter', () => {
        carousel.classList.add('is-paused');
      });
      carousel.addEventListener('pointerleave', () => {
        carousel.classList.remove('is-paused');
      });
      carousel.addEventListener('focusin', () => {
        carousel.classList.add('is-paused');
      });
      carousel.addEventListener('focusout', () => {
        carousel.classList.remove('is-paused');
      });
    }

    carousel.addEventListener('scroll', updateControls, { passive: true });
    updateControls();
  });
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

// Allowed Contact Form Topics
const ALLOWED_TOPICS = [
  'Job opportunity',
  'Freelance project',
  'Technical collaboration',
  'AI / research discussion',
  'General inquiry'
];

let isContactSubmitting = false;

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
    errors.phone = 'Please provide a valid phone number (7-20 digits) or leave blank.';
  }

  if (!fields.topic || fields.topic.trim() === '') {
    errors.topic = 'Please select a topic from the dropdown.';
  } else if (!ALLOWED_TOPICS.includes(fields.topic.trim())) {
    errors.topic = 'Please choose a valid topic from the options provided.';
  }

  if (!fields.message || fields.message.trim().length === 0) {
    errors.message = 'Please provide a message.';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Please provide a message with at least 10 characters.';
  } else if (fields.message.trim().length > 2500) {
    errors.message = 'Message cannot exceed 2,500 characters.';
  }

  if (!fields.terms) {
    errors.terms = 'Please accept the consent terms to submit your inquiry.';
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

  // Prevent duplicate submissions while a request is in flight
  if (isContactSubmitting) return;

  // Honeypot spam trap: if filled by a bot, silently discard without making a network request
  const honeypotEl = document.getElementById('formHoneypot');
  if (honeypotEl && honeypotEl.value.trim().length > 0) {
    showToast('Thank you! Your message has been received.', 'success');
    contactForm.reset();
    ['firstName', 'lastName', 'email', 'phone', 'topic', 'message', 'terms'].forEach(clearFieldError);
    return;
  }

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
    showToast('Please correct the highlighted fields and confirm your consent.', 'error');
    return;
  }

  // Set submitting flag and show loading state
  isContactSubmitting = true;
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const submitLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
  const originalText = btnText ? btnText.textContent : 'Submit';

  if (btnText) btnText.textContent = 'Sending...';
  if (submitLoader) submitLoader.style.display = 'inline-block';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
  }

  // Check if a live submission endpoint or access key is configured in environment or window config
  const configuredEndpoint = (typeof window !== 'undefined' && window.PORTFOLIO_CONTACT_ENDPOINT)
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_FORM_ENDPOINT)
    || null;

  const configuredKey = (typeof window !== 'undefined' && window.PORTFOLIO_CONTACT_KEY)
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
    || null;

  // Build mailto fallback URL using verified recipient email
  const recipientEmail = 'arjunghuge644@gmail.com';
  const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${fields.topic} - from ${fields.firstName.trim()} ${fields.lastName.trim()}`);
  const mailtoBody = encodeURIComponent(
    `Hello Arjun,\n\n${fields.message.trim()}\n\n---\nSender Details:\nName: ${fields.firstName.trim()} ${fields.lastName.trim()}\nEmail: ${fields.email.trim()}\nPhone: ${fields.phone ? fields.phone.trim() : 'Not provided'}\nTopic: ${fields.topic}\nSent from Portfolio Website Contact Form`
  );
  const mailtoUrl = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  try {
    if (configuredEndpoint) {
      // Offline check
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        throw new Error('OFFLINE_ERROR');
      }

      // Live remote submission service configured (Formspree, Web3Forms, etc.)
      const payload = {
        name: `${fields.firstName.trim()} ${fields.lastName.trim()}`,
        firstName: fields.firstName.trim(),
        lastName: fields.lastName.trim(),
        email: fields.email.trim(),
        phone: fields.phone ? fields.phone.trim() : '',
        topic: fields.topic,
        message: fields.message.trim(),
        _gotcha: '', // Formspree honeypot
        botcheck: false, // Web3Forms honeypot
        subject: `[Portfolio Inquiry] ${fields.topic} - from ${fields.firstName.trim()} ${fields.lastName.trim()}`,
        submittedAt: new Date().toISOString()
      };

      if (configuredKey) {
        payload.access_key = configuredKey;
      }

      // Timeout handler (15 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      let response;
      try {
        response = await fetch(configuredEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeoutId);
      }

      let responseData = null;
      try {
        responseData = await response.json();
      } catch (err) {
        // Fallback for non-JSON or empty response
      }

      const isSuccess = response.ok && (!responseData || (responseData.success !== false && responseData.ok !== false));

      if (isSuccess) {
        showToast(`Thank you, ${fields.firstName.trim()}! Your message has been sent successfully.`, 'success', 6000);
        contactForm.reset();
        ['firstName', 'lastName', 'email', 'phone', 'topic', 'message', 'terms'].forEach(clearFieldError);
        if (formStatusNotice) {
          formStatusNotice.className = 'form-status-notice notice-success show';
          formStatusNotice.innerHTML = `<strong>Message Sent:</strong> Thank you, ${fields.firstName.trim()}! Arjun will review your inquiry and respond to <strong>${fields.email.trim()}</strong> shortly.`;
        }
      } else {
        const errorMsg = (responseData && (responseData.message || responseData.error)) || `Service responded with status ${response.status}`;
        throw new Error(errorMsg);
      }
    } else {
      // Direct Email Delivery: Default unconfigured static deployment state.
      // Delivers via the visitor's mail client directly to arjunghuge644@gmail.com without false success claims.
      showToast('Opening your email client to send your message directly to Arjun.', 'info', 6000);

      if (formStatusNotice) {
        formStatusNotice.className = 'form-status-notice notice-info show';
        formStatusNotice.innerHTML = `
          <strong>Direct Email Delivery:</strong> Thank you, ${fields.firstName.trim()}! Your message has been prepared for direct email delivery to <a href="mailto:${recipientEmail}">${recipientEmail}</a>.
          <br />Your message details are preserved below. If your email application did not launch automatically:
          <br /><a href="${mailtoUrl}" class="direct-email-link">Click here to send directly via email to ${recipientEmail}</a>
        `;
      }

      // Trigger mailto intent
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl;
      }
    }
  } catch (error) {
    let userMessage = 'Failed to connect to the configured submission service. Please email arjunghuge644@gmail.com.';
    let statusDetails = 'Could not confirm message delivery through the configured service.';

    if (error && error.name === 'AbortError') {
      userMessage = 'Submission request timed out after 15 seconds. Please check your connection and retry.';
      statusDetails = 'The request to the form delivery service timed out after 15 seconds.';
    } else if ((error && error.message === 'OFFLINE_ERROR') || (typeof navigator !== 'undefined' && navigator.onLine === false)) {
      userMessage = 'You appear to be offline. Please verify your internet connection and try again.';
      statusDetails = 'Network connection is offline. Your message was not sent.';
    } else if (error && error.message) {
      userMessage = `Submission delivery issue: ${error.message}. Please retry or contact Arjun directly.`;
      statusDetails = `Provider error: ${error.message}`;
    }

    showToast(userMessage, 'error', 7000);

    if (formStatusNotice) {
      formStatusNotice.className = 'form-status-notice notice-error show';
      formStatusNotice.innerHTML = `
        <strong>Submission Delivery Issue:</strong> ${statusDetails}
        <br />Your message has been preserved. You can retry or email Arjun directly at <a href="mailto:${recipientEmail}">${recipientEmail}</a>.
        <br /><a href="${mailtoUrl}" class="direct-email-link">Click here to send directly via your email client</a>
      `;
    }
  } finally {
    if (btnText) btnText.textContent = originalText;
    if (submitLoader) submitLoader.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
    }
    isContactSubmitting = false;
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

  // Real-time form validation: clear error and hide old status notice on input
  ['firstName', 'lastName', 'email', 'phone', 'topic', 'message', 'terms'].forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', () => {
        clearFieldError(fieldId);
        if (formStatusNotice && formStatusNotice.classList.contains('show')) {
          formStatusNotice.classList.remove('show');
        }
      });
      el.addEventListener('change', () => {
        clearFieldError(fieldId);
        if (formStatusNotice && formStatusNotice.classList.contains('show')) {
          formStatusNotice.classList.remove('show');
        }
      });
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
  initToolkitCarousels,
  ALLOWED_TOPICS,
  ARJUN_DATA,
  FIGMA_DATA,
  LEGAL_CONTENT
};
