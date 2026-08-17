import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

// Public Contact Form Submission Endpoint
export function submitContactForm(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'MISSING_FIELDS', message: 'Name, email, and message are required.' });
  }

  // Basic email syntax check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'INVALID_EMAIL', message: 'Please provide a valid email address.' });
  }

  const db = getDb();
  const newMessage = {
    id: `msg_${Date.now()}`,
    name,
    email,
    subject: subject || 'Portfolio Contact Form Submission',
    message,
    status: 'UNREAD',
    createdAt: new Date().toISOString()
  };

  db.messages.unshift(newMessage);
  saveDb(db);

  res.json({ message: 'Thank you! Your message has been sent successfully.' });
}

// Admin: Get All Messages Inbox
export function getMessagesAdmin(req, res) {
  const db = getDb();
  res.json({ messages: db.messages });
}

// Admin: Update Message Status (UNREAD / READ / REPLIED / ARCHIVED)
export function updateMessageStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['UNREAD', 'READ', 'REPLIED', 'ARCHIVED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'INVALID_STATUS', message: 'Invalid status value.' });
  }

  const db = getDb();
  const msg = db.messages.find(m => m.id === id);

  if (!msg) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Message not found.' });
  }

  msg.status = status;
  saveDb(db);

  logAudit('MESSAGE_STATUS_UPDATED', `Message ${id} marked as ${status}`, req);

  res.json({ message: 'Message status updated.', messageItem: msg });
}

// Admin: Delete Message
export function deleteMessage(req, res) {
  const { id } = req.params;
  const db = getDb();

  db.messages = db.messages.filter(m => m.id !== id);
  saveDb(db);

  logAudit('MESSAGE_DELETED', `Admin deleted contact message ${id}`, req);

  res.json({ message: 'Message deleted successfully.' });
}
