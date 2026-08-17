import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

export function getPublicArticles(req, res) {
  const db = getDb();
  const published = db.articles.filter(a => a.published !== false);
  res.json({ articles: published });
}

export function getAllArticlesAdmin(req, res) {
  const db = getDb();
  res.json({ articles: db.articles });
}

export function createArticle(req, res) {
  const { title, excerpt, content, coverImage, category, tags, published } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'MISSING_FIELDS', message: 'Article title and content are required.' });
  }

  const db = getDb();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newArticle = {
    id: `art_${Date.now()}`,
    title,
    slug,
    excerpt: excerpt || '',
    content,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: category || 'TECHNICAL INSIGHTS',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
    published: published !== undefined ? published : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.articles.unshift(newArticle);
  saveDb(db);

  logAudit('ARTICLE_CREATED', `Admin created article: "${title}"`, req);

  res.json({ message: 'Article created successfully.', article: newArticle });
}

export function updateArticle(req, res) {
  const { id } = req.params;
  const db = getDb();
  const index = db.articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Article not found.' });
  }

  const existing = db.articles[index];
  const updatedArticle = {
    ...existing,
    ...req.body,
    tags: Array.isArray(req.body.tags) ? req.body.tags : (typeof req.body.tags === 'string' ? req.body.tags.split(',').map(t => t.trim()) : existing.tags),
    updatedAt: new Date().toISOString()
  };

  db.articles[index] = updatedArticle;
  saveDb(db);

  logAudit('ARTICLE_UPDATED', `Admin updated article: "${updatedArticle.title}"`, req);

  res.json({ message: 'Article updated successfully.', article: updatedArticle });
}

export function deleteArticle(req, res) {
  const { id } = req.params;
  const db = getDb();

  const article = db.articles.find(a => a.id === id);
  if (!article) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Article not found.' });
  }

  db.articles = db.articles.filter(a => a.id !== id);
  saveDb(db);

  logAudit('ARTICLE_DELETED', `Admin deleted article: "${article.title}"`, req);

  res.json({ message: 'Article deleted successfully.' });
}
