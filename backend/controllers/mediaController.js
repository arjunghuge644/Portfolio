import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '../uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Storage engine configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    cb(null, `${Date.now()}_${safeName}${ext}`);
  }
});

// File filter for security
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE: Only JPEG, PNG, WEBP, GIF, SVG, and PDF files are allowed.'), false);
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('file');

export function getMediaAdmin(req, res) {
  const db = getDb();
  res.json({ media: db.media });
}

export function handleUploadSuccess(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'NO_FILE', message: 'No file uploaded.' });
  }

  const db = getDb();
  const fileUrl = `/uploads/${req.file.filename}`;

  const mediaItem = {
    id: `med_${Date.now()}`,
    originalName: req.file.originalname,
    filename: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: fileUrl,
    uploadedAt: new Date().toISOString()
  };

  db.media.unshift(mediaItem);
  saveDb(db);

  logAudit('FILE_UPLOADED', `Uploaded file: ${req.file.originalname} (${req.file.mimetype})`, req);

  res.json({ message: 'File uploaded successfully.', media: mediaItem });
}

export function deleteMedia(req, res) {
  const { id } = req.params;
  const db = getDb();

  const item = db.media.find(m => m.id === id);
  if (!item) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Media item not found.' });
  }

  // Remove file from disk
  const filePath = path.join(UPLOADS_DIR, item.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  db.media = db.media.filter(m => m.id !== id);
  saveDb(db);

  logAudit('FILE_DELETED', `Deleted file: ${item.originalName}`, req);

  res.json({ message: 'Media deleted successfully.' });
}
