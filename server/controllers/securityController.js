import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

// Setup TOTP MFA - Returns Secret & QR Code Data URL
export async function setupMfa(req, res) {
  const db = getDb();
  const admin = db.adminUser;

  // Generate new secret for user
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(admin.email, 'Portfolio Security (Arjun)', secret);

  const qrCodeUrl = await QRCode.toDataURL(otpauth);

  // Temporarily store pending secret
  req.session.pendingMfaSecret = secret;

  res.json({
    secret,
    qrCodeUrl,
    message: 'Scan the QR Code with your TOTP Authenticator app (e.g. Google Authenticator, Authy).'
  });
}

// Confirm & Enable TOTP MFA
export async function enableMfa(req, res) {
  const { token } = req.body;
  const secret = req.session.pendingMfaSecret;

  if (!token || !secret) {
    return res.status(400).json({ error: 'MISSING_DATA', message: 'MFA setup secret or verification token missing.' });
  }

  const isValid = authenticator.verify({ token, secret });
  if (!isValid) {
    return res.status(400).json({ error: 'INVALID_TOKEN', message: 'Invalid 6-digit TOTP code.' });
  }

  const db = getDb();
  db.adminUser.mfaEnabled = true;
  db.adminUser.mfaSecret = secret;
  db.adminUser.updatedAt = new Date().toISOString();
  saveDb(db);

  delete req.session.pendingMfaSecret;

  logAudit('MFA_ENABLED', 'Multi-Factor Authentication enabled for admin account', req);

  res.json({ message: 'MFA enabled successfully.' });
}

// Disable TOTP MFA
export async function disableMfa(req, res) {
  const { password } = req.body;
  const db = getDb();

  // Re-verify password before disabling security settings
  if (!password) {
    return res.status(400).json({ error: 'PASSWORD_REQUIRED', message: 'Password confirmation is required to disable MFA.' });
  }

  const bcrypt = (await import('bcryptjs')).default;
  const isPasswordValid = bcrypt.compareSync(password, db.adminUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'INVALID_PASSWORD', message: 'Incorrect password.' });
  }

  db.adminUser.mfaEnabled = false;
  db.adminUser.mfaSecret = null;
  db.adminUser.updatedAt = new Date().toISOString();
  saveDb(db);

  logAudit('MFA_DISABLED', 'Multi-Factor Authentication disabled', req);

  res.json({ message: 'MFA has been disabled.' });
}

// Get Security Overview Stats
export function getSecurityStats(req, res) {
  const db = getDb();
  const admin = db.adminUser;

  res.json({
    mfaEnabled: admin.mfaEnabled,
    role: admin.role,
    activeSessionsCount: db.sessions.length,
    totalAuditLogs: db.auditLogs.length,
    recentLogins: db.auditLogs.filter(l => l.event === 'SUCCESSFUL_LOGIN' || l.event === 'MFA_VERIFIED').slice(0, 5)
  });
}

// Get Audit Logs History
export function getAuditLogs(req, res) {
  const db = getDb();
  res.json({ auditLogs: db.auditLogs });
}
