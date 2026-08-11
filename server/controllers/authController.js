import bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';
import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

// Step 1 Login: Verify Email & Password
export async function loginStep1(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'MISSING_FIELDS', message: 'Email and password are required.' });
  }

  const db = getDb();
  const admin = db.adminUser;

  if (admin.email.toLowerCase() !== email.toLowerCase()) {
    logAudit('FAILED_LOGIN', `Attempted login with unknown email: ${email}`, req);
    return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.passwordHash);
  if (!isPasswordValid) {
    logAudit('FAILED_LOGIN', `Incorrect password for ${email}`, req);
    return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
  }

  // Check if Multi-Factor Authentication is enabled
  if (admin.mfaEnabled) {
    req.session.pendingMfa = {
      userId: admin.id,
      email: admin.email,
      authenticatedAt: new Date().toISOString()
    };
    return res.json({
      mfaRequired: true,
      message: 'Password verified. Enter 6-digit TOTP token to complete authentication.'
    });
  }

  // Set up authenticated admin session
  req.session.adminUser = {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    mfaEnabled: admin.mfaEnabled
  };
  req.session.lastAuthTime = new Date().toISOString();

  // Record Session
  const sessionID = req.sessionID;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown';

  db.sessions = db.sessions.filter(s => s.id !== sessionID);
  db.sessions.push({
    id: sessionID,
    userId: admin.id,
    ip,
    userAgent,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString()
  });
  saveDb(db);

  logAudit('SUCCESSFUL_LOGIN', 'Admin authenticated successfully', req);

  res.json({
    mfaRequired: false,
    user: req.session.adminUser,
    message: 'Authentication successful.'
  });
}

// Step 2 Login: TOTP MFA Verification
export async function verifyMfaLogin(req, res) {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'MISSING_CODE', message: 'MFA TOTP code is required.' });
  }

  const pending = req.session.pendingMfa;
  if (!pending) {
    return res.status(400).json({ error: 'NO_PENDING_MFA', message: 'No pending MFA session found. Please log in again.' });
  }

  const db = getDb();
  const admin = db.adminUser;

  const isValidToken = authenticator.verify({
    token: code,
    secret: admin.mfaSecret
  });

  if (!isValidToken) {
    logAudit('FAILED_MFA', `Invalid MFA code attempt for ${admin.email}`, req);
    return res.status(401).json({ error: 'INVALID_MFA_TOKEN', message: 'Invalid 6-digit MFA token.' });
  }

  delete req.session.pendingMfa;

  req.session.adminUser = {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    mfaEnabled: admin.mfaEnabled
  };
  req.session.lastAuthTime = new Date().toISOString();

  // Record Session
  const sessionID = req.sessionID;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown';

  db.sessions = db.sessions.filter(s => s.id !== sessionID);
  db.sessions.push({
    id: sessionID,
    userId: admin.id,
    ip,
    userAgent,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString()
  });
  saveDb(db);

  logAudit('MFA_VERIFIED', 'Admin completed MFA verification successfully', req);

  res.json({
    user: req.session.adminUser,
    message: 'MFA verified. Authentication complete.'
  });
}

// Get Current Logged-In User
export function getMe(req, res) {
  const db = getDb();
  res.json({
    user: req.session.adminUser,
    mfaEnabled: db.adminUser.mfaEnabled
  });
}

// Logout
export function logout(req, res) {
  const sessionID = req.sessionID;
  logAudit('LOGOUT', 'User logged out', req);

  const db = getDb();
  db.sessions = db.sessions.filter(s => s.id !== sessionID);
  saveDb(db);

  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'LOGOUT_ERROR', message: 'Error terminating session.' });
    }
    res.clearCookie('portfolio.sid');
    res.json({ message: 'Logged out successfully.' });
  });
}

// Change Password
export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'MISSING_FIELDS', message: 'Current and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'WEAK_PASSWORD', message: 'New password must be at least 8 characters long.' });
  }

  const db = getDb();
  const admin = db.adminUser;

  const isPasswordValid = bcrypt.compareSync(currentPassword, admin.passwordHash);
  if (!isPasswordValid) {
    logAudit('FAILED_PASSWORD_CHANGE', 'Incorrect current password provided', req);
    return res.status(401).json({ error: 'INVALID_CURRENT_PASSWORD', message: 'Incorrect current password.' });
  }

  admin.passwordHash = bcrypt.hashSync(newPassword, 10);
  admin.updatedAt = new Date().toISOString();

  // Revoke all other active sessions for safety
  const currentSessionID = req.sessionID;
  db.sessions = db.sessions.filter(s => s.id === currentSessionID);
  saveDb(db);

  logAudit('PASSWORD_CHANGED', 'Admin updated password and revoked secondary sessions', req);

  res.json({ message: 'Password updated successfully. Other active sessions have been revoked.' });
}

// Active Sessions List
export function getActiveSessions(req, res) {
  const db = getDb();
  const currentSessionID = req.sessionID;

  const sessions = db.sessions.map(s => ({
    ...s,
    isCurrent: s.id === currentSessionID
  }));

  res.json({ sessions });
}

// Revoke Specific Session
export function revokeSession(req, res) {
  const { sessionId } = req.params;
  const db = getDb();

  db.sessions = db.sessions.filter(s => s.id !== sessionId);
  saveDb(db);

  logAudit('SESSION_REVOKED', `Admin revoked session: ${sessionId}`, req);

  res.json({ message: 'Session revoked successfully.' });
}

// Revoke All Other Sessions
export function revokeAllOtherSessions(req, res) {
  const currentSessionID = req.sessionID;
  const db = getDb();

  db.sessions = db.sessions.filter(s => s.id === currentSessionID);
  saveDb(db);

  logAudit('ALL_OTHER_SESSIONS_REVOKED', 'Admin revoked all other active sessions', req);

  res.json({ message: 'All other active sessions have been revoked.' });
}
