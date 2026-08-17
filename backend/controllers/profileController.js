import { getDb, saveDb } from '../config/database.js';
import { logAudit } from '../middleware/auditLogger.js';

export function getProfile(req, res) {
  const db = getDb();
  res.json({
    profile: db.profile,
    skills: db.skills,
    education: db.education,
    experience: db.experience,
    achievements: db.achievements
  });
}

export function updateProfile(req, res) {
  const db = getDb();
  db.profile = { ...db.profile, ...req.body };
  saveDb(db);

  logAudit('PROFILE_UPDATED', 'Admin updated profile details', req);

  res.json({ message: 'Profile updated successfully.', profile: db.profile });
}

export function updateSkills(req, res) {
  const db = getDb();
  db.skills = req.body.skills || db.skills;
  saveDb(db);

  logAudit('SKILLS_UPDATED', 'Admin updated skills list', req);

  res.json({ message: 'Skills updated successfully.', skills: db.skills });
}

export function updateExperience(req, res) {
  const db = getDb();
  db.experience = req.body.experience || db.experience;
  saveDb(db);

  logAudit('EXPERIENCE_UPDATED', 'Admin updated experience timeline', req);

  res.json({ message: 'Experience updated successfully.', experience: db.experience });
}

export function updateEducation(req, res) {
  const db = getDb();
  db.education = req.body.education || db.education;
  saveDb(db);

  logAudit('EDUCATION_UPDATED', 'Admin updated education list', req);

  res.json({ message: 'Education updated successfully.', education: db.education });
}

export function updateAchievements(req, res) {
  const db = getDb();
  db.achievements = req.body.achievements || db.achievements;
  saveDb(db);

  logAudit('ACHIEVEMENTS_UPDATED', 'Admin updated achievements list', req);

  res.json({ message: 'Achievements updated successfully.', achievements: db.achievements });
}
