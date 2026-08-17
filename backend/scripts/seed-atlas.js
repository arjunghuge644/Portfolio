import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { getDb } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function seedMongoAtlas() {
  console.log('\n====================================================');
  console.log('       SEEDING MONGODB ATLAS WITH PORTFOLIO DATA    ');
  console.log('====================================================\n');

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.trim() === '') {
    console.error('❌ MONGO_URI is not set in backend/.env file!');
    process.exit(1);
  }

  const maskedUri = mongoUri.replace(/:([^@]+)@/, ':****@');
  console.log(`Connecting to MongoDB Atlas: ${maskedUri}`);

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log('✓ Connected to MongoDB Atlas successfully!\n');

    const db = mongoose.connection.db;
    const localData = getDb();

    console.log('Clearing existing collections in MongoDB Atlas...');

    // Seed Profile
    if (localData.profile) {
      await db.collection('profiles').deleteMany({});
      await db.collection('profiles').insertOne(localData.profile);
      console.log('✓ Seeded: profiles (1 document)');
    }

    // Seed Admin User
    if (localData.adminUser) {
      await db.collection('admin_users').deleteMany({});
      await db.collection('admin_users').insertOne(localData.adminUser);
      console.log('✓ Seeded: admin_users (1 document)');
    }

    // Seed Projects
    if (Array.isArray(localData.projects) && localData.projects.length > 0) {
      await db.collection('projects').deleteMany({});
      await db.collection('projects').insertMany(localData.projects);
      console.log(`✓ Seeded: projects (${localData.projects.length} documents)`);
    }

    // Seed Skills
    if (Array.isArray(localData.skills) && localData.skills.length > 0) {
      await db.collection('skills').deleteMany({});
      await db.collection('skills').insertMany(localData.skills);
      console.log(`✓ Seeded: skills (${localData.skills.length} documents)`);
    }

    // Seed Education
    if (Array.isArray(localData.education) && localData.education.length > 0) {
      await db.collection('education').deleteMany({});
      await db.collection('education').insertMany(localData.education);
      console.log(`✓ Seeded: education (${localData.education.length} documents)`);
    }

    // Seed Experience
    if (Array.isArray(localData.experience) && localData.experience.length > 0) {
      await db.collection('experiences').deleteMany({});
      await db.collection('experiences').insertMany(localData.experience);
      console.log(`✓ Seeded: experiences (${localData.experience.length} documents)`);
    }

    // Seed Achievements
    if (Array.isArray(localData.achievements) && localData.achievements.length > 0) {
      await db.collection('achievements').deleteMany({});
      await db.collection('achievements').insertMany(localData.achievements);
      console.log(`✓ Seeded: achievements (${localData.achievements.length} documents)`);
    }

    // Seed Articles
    if (Array.isArray(localData.articles) && localData.articles.length > 0) {
      await db.collection('articles').deleteMany({});
      await db.collection('articles').insertMany(localData.articles);
      console.log(`✓ Seeded: articles (${localData.articles.length} documents)`);
    }

    // Seed Messages
    if (Array.isArray(localData.messages) && localData.messages.length > 0) {
      await db.collection('messages').deleteMany({});
      await db.collection('messages').insertMany(localData.messages);
      console.log(`✓ Seeded: messages (${localData.messages.length} documents)`);
    }

    // Seed SEO
    if (localData.seo) {
      await db.collection('seo').deleteMany({});
      await db.collection('seo').insertOne(localData.seo);
      console.log('✓ Seeded: seo (1 document)');
    }

    // Seed Analytics & Visit Counter
    await db.collection('analytics').deleteMany({});
    await db.collection('analytics').insertOne({
      type: 'PUBLIC_SITE_VISITS',
      visitsCount: localData.visitsCount || 151,
      lastVisitedAt: localData.lastVisitedAt || new Date().toISOString()
    });
    console.log(`✓ Seeded: analytics (1 document, visitsCount: ${localData.visitsCount || 151})`);

    console.log('\n====================================================');
    console.log('    🎉 MONGODB ATLAS SEEDING COMPLETED SUCCESSFULLY! ');
    console.log('====================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding MongoDB Atlas:', err);
    process.exit(1);
  }
}

seedMongoAtlas();
