import { getDb, saveDb } from '../config/database.js';

export function logAudit(event, details, req) {
  try {
    const db = getDb();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown Browser';

    const logEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      event,
      details,
      ip,
      userAgent,
      user: req.adminUser ? req.adminUser.email : 'Unauthenticated'
    };

    db.auditLogs.unshift(logEntry);
    
    // Cap audit logs at 500 entries
    if (db.auditLogs.length > 500) {
      db.auditLogs = db.auditLogs.slice(0, 500);
    }

    saveDb(db);
  } catch (err) {
    console.error('Audit Log Error:', err);
  }
}
