import { getDb, saveDb } from '../config/database.js';

// Record public site visit
export function recordVisit(req, res) {
  try {
    const db = getDb();
    db.visitsCount = (db.visitsCount || 0) + 1;
    db.lastVisitedAt = new Date().toISOString();
    saveDb(db);

    res.json({
      success: true,
      visitsCount: db.visitsCount,
      message: 'Visit recorded successfully'
    });
  } catch (err) {
    console.error('Error recording visit:', err);
    res.status(500).json({ error: 'SERVER_ERROR', message: 'Failed to record site visit.' });
  }
}

// Get public site visit stats
export function getVisitStats(req, res) {
  try {
    const db = getDb();
    res.json({
      visitsCount: db.visitsCount || 0,
      lastVisitedAt: db.lastVisitedAt || null
    });
  } catch (err) {
    console.error('Error fetching visit stats:', err);
    res.status(500).json({ error: 'SERVER_ERROR', message: 'Failed to fetch site visit stats.' });
  }
}
