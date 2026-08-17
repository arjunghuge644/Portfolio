import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/db.json');

// Initial Data Structure
const defaultData = {
  adminUser: {
    id: 'admin_1',
    email: 'admin@arjun.dev',
    // Default password hash for 'Admin@123456'
    passwordHash: bcrypt.hashSync('Admin@123456', 10),
    mfaEnabled: false,
    mfaSecret: null,
    role: 'SUPER_ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  visitsCount: 148,
  sessions: [],
  auditLogs: [
    {
      id: 'log_init',
      timestamp: new Date().toISOString(),
      event: 'SYSTEM_INITIALIZED',
      details: 'Portfolio Security Database and Admin CMS initialized',
      ip: '127.0.0.1',
      userAgent: 'System Core'
    }
  ],
  profile: {
    name: 'Arjun',
    title: 'Software Engineer & AI Builder',
    status: 'AVAILABLE FOR SUMMER 2026 INTERNSHIPS & ROLES',
    subtext: 'Crafting production software architectures, AI systems, and high-performance editorial digital experiences.',
    bio: 'IT engineering student building scalable software, AI systems, and creative digital web applications with minimal clutter and maximum visual impact.',
    email: 'arjunghuge644@gmail.com',
    location: 'Mumbai, India',
    github: 'https://github.com/arjunghuge644',
    linkedin: 'https://in.linkedin.com/in/arjun-ghuge-18903a2b8',
    twitter: 'https://twitter.com'
  },
  skills: [
    { id: '1', category: 'FULL-STACK', name: 'React.js / Node.js / Express', level: 95 },
    { id: '2', category: 'AI & ML', name: 'Python / LangChain / RAG / Pinecone', level: 90 },
    { id: '3', category: 'DATABASES', name: 'MongoDB / PostgreSQL / Redis', level: 88 },
    { id: '4', category: 'CLOUD & INFRA', name: 'AWS / Docker / GitHub Actions', level: 85 }
  ],
  education: [
    { id: '1', degree: 'B.Tech in Information Technology', institution: 'University College of Engineering', period: '2023 - 2027', grade: '8.8/10 CGPA' }
  ],
  experience: [
    { id: '1', role: 'Full-Stack & AI Engineering Intern', company: 'Tech Innovation Labs', period: 'Jan 2026 - Present', description: 'Engineered RAG search pipeline and microservices dashboard.' }
  ],
  achievements: [
    { id: '1', title: 'Winner - National Hackathon 2025', description: 'Built an AI-driven medical triage engine.' },
    { id: '2', title: 'Top 1% Algorithmic Coder', description: 'Solved 500+ data structure problems across platforms.' }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'NEURAL-SYNC AI RAG ENGINE',
      category: 'ARTIFICIAL INTELLIGENCE / RAG',
      description: 'An enterprise-grade Retrieval-Augmented Generation (RAG) platform powered by vector search embeddings and LLMs for real-time document context querying.',
      techStack: ['Python', 'LangChain', 'Pinecone DB', 'OpenAI API', 'FastAPI', 'React.js'],
      image: '/assets/project1.png',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj_2',
      title: 'PRESCRIPTO HEALTHCARE PLATFORM',
      category: 'FULL-STACK APPLICATION',
      description: 'A comprehensive doctor appointment scheduling system with admin analytics, doctor schedule management, patient dashboard, and automated booking notifications.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj_3',
      title: 'EV BATTERY HEALTH & RANGE PREDICTOR',
      category: 'MACHINE LEARNING / ANALYTICS',
      description: 'Predictive analytics platform utilizing ML regression models to forecast Electric Vehicle battery State-of-Health (SoH) and real-time range degradation.',
      techStack: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'Flask', 'Chart.js'],
      image: '/assets/project3.png',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj_4',
      title: 'AUTONOMOUS CODE REVIEWER AGENT',
      category: 'DEVELOPER TOOL / AI AGENT',
      description: 'Automated GitHub pull request reviewer using LLM AST parsing to identify security vulnerabilities, style infractions, and performance bottlenecks in codebases.',
      techStack: ['Python', 'Gemini API', 'Docker', 'GitHub Actions', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
      published: true,
      createdAt: new Date().toISOString()
    }
  ],
  articles: [
    {
      id: 'art_1',
      title: 'Building Enterprise RAG Architectures with LangChain & Pinecone',
      slug: 'building-enterprise-rag-architectures',
      excerpt: 'A deep dive into chunking strategies, vector embeddings, and prompt optimization for real-time document context engines.',
      content: '# Building Enterprise RAG Architectures\n\nRetrieval-Augmented Generation (RAG) unlocks real-time domain knowledge for LLMs...\n',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      category: 'AI & ML',
      tags: ['RAG', 'LangChain', 'Python', 'Vector Search'],
      published: true,
      createdAt: new Date().toISOString()
    }
  ],
  messages: [
    {
      id: 'msg_1',
      name: 'Sarah Connor',
      email: 'sarah@cyberdyne.com',
      subject: 'AI Systems Engineering Role Inquiry',
      message: 'Hi Arjun, loved your Neural-Sync RAG project! We are looking for an AI Engineering intern for Summer 2026.',
      status: 'UNREAD',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    }
  ],
  media: [],
  seo: {
    siteTitle: 'Arjun Ghuge | Full Stack Web Developer & AI Solutions',
    metaDescription: 'Editorial digital portfolio of Arjun, featuring Full-Stack Web Development, Artificial Intelligence systems, RAG engines, and Machine Learning models.',
    ogImage: '/assets/portrait.png',
    canonicalUrl: 'https://arjunghuge.me'
  }
};

// Ensure data directory exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load or Initialize DB
export function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    saveDb(defaultData);
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (typeof data.visitsCount !== 'number') {
      data.visitsCount = 148;
    }
    return data;
  } catch (err) {
    console.error('Error reading db file, re-initializing:', err);
    saveDb(defaultData);
    return defaultData;
  }
}

// Write DB atomically
export function saveDb(data) {
  const tempPath = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE);
}
