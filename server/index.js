import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Controllers
import * as authController from './controllers/authController.js';
import * as securityController from './controllers/securityController.js';
import * as profileController from './controllers/profileController.js';
import * as projectsController from './controllers/projectsController.js';
import * as insightsController from './controllers/insightsController.js';
import * as messagesController from './controllers/messagesController.js';
import * as mediaController from './controllers/mediaController.js';
import * as seoController from './controllers/seoController.js';

// Middleware
import { requireAuth, requireRecentAuth } from './middleware/auth.js';
import { requireRole } from './middleware/rbac.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Allow local dev preview
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Server-managed Secure Sessions
app.use(session({
  name: 'portfolio.sid',
  secret: process.env.SESSION_SECRET || 'crypto_secure_session_secret_portfolio_2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevents XSS cookie theft
    secure: false, // Set to true in production HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiters for Brute-Force Defense
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts
  message: { error: 'TOO_MANY_REQUESTS', message: 'Too many authentication attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 contact submissions per hour
  message: { error: 'TOO_MANY_REQUESTS', message: 'Rate limit exceeded for contact form submissions. Please try again later.' }
});

// ==========================================
// 1. PUBLIC API ROUTES
// ==========================================
app.get('/api/public/profile', profileController.getProfile);
app.get('/api/public/projects', projectsController.getPublicProjects);
app.get('/api/public/articles', insightsController.getPublicArticles);
app.get('/api/public/seo', seoController.getSeoSettings);
app.post('/api/public/contact', contactRateLimiter, messagesController.submitContactForm);

// ==========================================
// 2. AUTHENTICATION & MFA ROUTES
// ==========================================
app.post('/api/auth/login', authRateLimiter, authController.loginStep1);
app.post('/api/auth/mfa-login', authRateLimiter, authController.verifyMfaLogin);
app.get('/api/auth/me', requireAuth, authController.getMe);
app.post('/api/auth/logout', requireAuth, authController.logout);
app.post('/api/auth/change-password', requireAuth, authController.changePassword);

// Active Sessions
app.get('/api/admin/security/sessions', requireAuth, authController.getActiveSessions);
app.delete('/api/admin/security/sessions/:sessionId', requireAuth, authController.revokeSession);
app.post('/api/admin/security/sessions/revoke-others', requireAuth, authController.revokeAllOtherSessions);

// Security Dashboard & MFA Setup
app.get('/api/admin/security/stats', requireAuth, securityController.getSecurityStats);
app.get('/api/admin/security/audit-logs', requireAuth, securityController.getAuditLogs);
app.post('/api/admin/security/mfa/setup', requireAuth, securityController.setupMfa);
app.post('/api/admin/security/mfa/enable', requireAuth, securityController.enableMfa);
app.post('/api/admin/security/mfa/disable', requireAuth, securityController.disableMfa);

// ==========================================
// 3. ADMIN CONTENT MANAGEMENT ROUTES (RBAC Protected)
// ==========================================
// Profile & Portfolio Info
app.put('/api/admin/profile', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), profileController.updateProfile);
app.put('/api/admin/skills', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), profileController.updateSkills);
app.put('/api/admin/experience', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), profileController.updateExperience);
app.put('/api/admin/education', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), profileController.updateEducation);
app.put('/api/admin/achievements', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), profileController.updateAchievements);

// Projects CMS
app.get('/api/admin/projects', requireAuth, projectsController.getAllProjectsAdmin);
app.post('/api/admin/projects', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), projectsController.createProject);
app.put('/api/admin/projects/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), projectsController.updateProject);
app.delete('/api/admin/projects/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), projectsController.deleteProject);

// Insights / Articles CMS
app.get('/api/admin/articles', requireAuth, insightsController.getAllArticlesAdmin);
app.post('/api/admin/articles', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), insightsController.createArticle);
app.put('/api/admin/articles/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), insightsController.updateArticle);
app.delete('/api/admin/articles/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), insightsController.deleteArticle);

// Messages Inbox
app.get('/api/admin/messages', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), messagesController.getMessagesAdmin);
app.put('/api/admin/messages/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), messagesController.updateMessageStatus);
app.delete('/api/admin/messages/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), messagesController.deleteMessage);

// Media Library
app.get('/api/admin/media', requireAuth, mediaController.getMediaAdmin);
app.post('/api/admin/media/upload', requireAuth, mediaController.uploadMiddleware, mediaController.handleUploadSuccess);
app.delete('/api/admin/media/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), mediaController.deleteMedia);

// SEO Settings
app.get('/api/admin/seo', requireAuth, seoController.getSeoSettings);
app.put('/api/admin/seo', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), seoController.updateSeoSettings);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Exception:', err);
  res.status(err.status || 500).json({
    error: 'SERVER_ERROR',
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  PORTFOLIO SECURITY API SERVER RUNNING ON PORT ${PORT}`);
  console.log(`  Admin CMS API Base: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
