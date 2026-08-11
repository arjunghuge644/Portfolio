import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

export function getSeoSettings(req, res) {
  const db = getDb();
  res.json({ seo: db.seo });
}

export function updateSeoSettings(req, res) {
  const db = getDb();
  db.seo = { ...db.seo, ...req.body };
  saveDb(db);

  logAudit('SEO_SETTINGS_UPDATED', 'Admin updated global SEO & OpenGraph settings', req);

  res.json({ message: 'SEO settings updated successfully.', seo: db.seo });
}
