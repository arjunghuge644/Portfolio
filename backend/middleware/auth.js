import { getDb, saveDb } from '../config/database.js';

export function requireAuth(req, res, next) {
  const db = getDb();
  const sessionID = req.sessionID || (req.session && req.session.id);
  const sessionData = req.session && req.session.adminUser;

  if (!sessionData) {
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Authentication session required. Please log in.'
    });
  }

  // Update session last active timestamp
  const activeSessionIndex = db.sessions.findIndex(s => s.id === sessionID);
  if (activeSessionIndex !== -1) {
    db.sessions[activeSessionIndex].lastActive = new Date().toISOString();
    saveDb(db);
  }

  req.adminUser = sessionData;
  next();
}

export function requireRecentAuth(req, res, next) {
  const lastAuthTime = req.session.lastAuthTime;
  const TEN_MINUTES = 10 * 60 * 1000;

  if (!lastAuthTime || (Date.now() - new Date(lastAuthTime).getTime() > TEN_MINUTES)) {
    return res.status(403).json({
      error: 'REAUTHENTICATION_REQUIRED',
      message: 'Sensitive security operation requires recent re-authentication.'
    });
  }

  next();
}
