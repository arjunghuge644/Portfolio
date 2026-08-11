import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

// Public Projects Endpoint (Only returns published projects)
export function getPublicProjects(req, res) {
  const db = getDb();
  const publishedProjects = db.projects.filter(p => p.published !== false);
  res.json({ projects: publishedProjects });
}

// Admin All Projects Endpoint (Returns all projects including drafts)
export function getAllProjectsAdmin(req, res) {
  const db = getDb();
  res.json({ projects: db.projects });
}

// Create Project
export function createProject(req, res) {
  const { title, category, description, techStack, image, liveUrl, githubUrl, featured, published, problem, solution, architecture, challenges, results } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'MISSING_FIELDS', message: 'Project title and description are required.' });
  }

  const db = getDb();
  const newProject = {
    id: `proj_${Date.now()}`,
    title,
    category: category || 'FULL-STACK DEVELOPMENT',
    description,
    techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
    image: image || '/assets/project1.png',
    liveUrl: liveUrl || '',
    githubUrl: githubUrl || '',
    featured: featured !== undefined ? featured : true,
    published: published !== undefined ? published : true,
    caseStudy: {
      problem: problem || '',
      solution: solution || '',
      architecture: architecture || '',
      challenges: challenges || '',
      results: results || ''
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.projects.unshift(newProject);
  saveDb(db);

  logAudit('PROJECT_CREATED', `Admin created project: "${title}"`, req);

  res.json({ message: 'Project created successfully.', project: newProject });
}

// Update Project
export function updateProject(req, res) {
  const { id } = req.params;
  const db = getDb();
  const index = db.projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Project not found.' });
  }

  const existing = db.projects[index];
  const updatedProject = {
    ...existing,
    ...req.body,
    techStack: Array.isArray(req.body.techStack) ? req.body.techStack : (typeof req.body.techStack === 'string' ? req.body.techStack.split(',').map(s => s.trim()) : existing.techStack),
    caseStudy: {
      ...existing.caseStudy,
      ...(req.body.caseStudy || {}),
      problem: req.body.problem !== undefined ? req.body.problem : (existing.caseStudy ? existing.caseStudy.problem : ''),
      solution: req.body.solution !== undefined ? req.body.solution : (existing.caseStudy ? existing.caseStudy.solution : ''),
      architecture: req.body.architecture !== undefined ? req.body.architecture : (existing.caseStudy ? existing.caseStudy.architecture : ''),
      challenges: req.body.challenges !== undefined ? req.body.challenges : (existing.caseStudy ? existing.caseStudy.challenges : ''),
      results: req.body.results !== undefined ? req.body.results : (existing.caseStudy ? existing.caseStudy.results : '')
    },
    updatedAt: new Date().toISOString()
  };

  db.projects[index] = updatedProject;
  saveDb(db);

  logAudit('PROJECT_UPDATED', `Admin updated project: "${updatedProject.title}"`, req);

  res.json({ message: 'Project updated successfully.', project: updatedProject });
}

// Delete Project
export function deleteProject(req, res) {
  const { id } = req.params;
  const db = getDb();

  const project = db.projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Project not found.' });
  }

  db.projects = db.projects.filter(p => p.id !== id);
  saveDb(db);

  logAudit('PROJECT_DELETED', `Admin deleted project: "${project.title}"`, req);

  res.json({ message: 'Project deleted successfully.' });
}
