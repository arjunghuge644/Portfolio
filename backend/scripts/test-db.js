import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { getDb } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend/.env first, then root .env fallback
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runDatabaseCheck() {
  console.log('\n====================================================');
  console.log('         DATABASE CONNECTION DIAGNOSTIC             ');
  console.log('====================================================\n');

  // 1. Check Local DB JSON
  try {
    const db = getDb();
    console.log('✓ File-based Database (db.json): CONNECTED & OPERATIONAL');
    console.log(`  - Projects stored: ${db.projects?.length || 0}`);
    console.log(`  - Articles stored: ${db.articles?.length || 0}`);
    console.log(`  - Messages in inbox: ${db.messages?.length || 0}`);
    console.log(`  - Admin user configured: ${db.adminUser?.email || 'None'}\n`);
  } catch (err) {
    console.error('❌ File-based Database error:', err.message);
  }

  // 2. Check MongoDB Atlas if MONGO_URI is set
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri && mongoUri.trim() !== '') {
    const maskedUri = mongoUri.replace(/:([^@]+)@/, ':****@');
    console.log(`🔍 Testing MongoDB Atlas Connection: ${maskedUri}`);
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log('✓ MongoDB Atlas: CONNECTED SUCCESSFULLY');
      console.log(`  - Database Name: ${mongoose.connection.name}`);
      console.log(`  - Connection Host: ${mongoose.connection.host}`);
      await mongoose.disconnect();
    } catch (err) {
      console.error('❌ MongoDB Atlas Connection Failed:', err.message);
    }
  } else {
    console.log('ℹ️ MONGO_URI is currently empty in .env files.');
    console.log('   Add MONGO_URI=mongodb+srv://... to backend/.env or root .env to test MongoDB Atlas.');
  }

  console.log('\n====================================================\n');
}

runDatabaseCheck().then(() => process.exit(0)).catch((err) => {
  console.error('Diagnostic error:', err);
  process.exit(1);
});
