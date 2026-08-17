import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { downloadArtifact } from '@electron/get';
import extract from 'extract-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const electronDir = path.join(rootDir, 'node_modules/electron');
const targetDist = path.join(electronDir, 'dist');
const pathFile = path.join(electronDir, 'path.txt');

async function installElectron() {
  const pkgPath = path.join(electronDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error('Electron module package.json not found at', pkgPath);
    process.exit(1);
  }
  const version = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).version;
  console.log(`[Electron Installer] Downloading Electron v${version} binary...`);

  const zipPath = await downloadArtifact({
    version,
    artifactName: 'electron',
    platform: process.platform,
    arch: process.arch
  });

  console.log(`[Electron Installer] Extracting zip from ${zipPath} to ${targetDist}...`);
  if (!fs.existsSync(targetDist)) {
    fs.mkdirSync(targetDist, { recursive: true });
  }

  try {
    await extract(zipPath, { dir: targetDist });
    console.log('[Electron Installer] Zip extracted successfully!');
  } catch (err) {
    console.error('[Extract Error]', err);
  }

  fs.writeFileSync(pathFile, 'electron', 'utf-8');
  console.log('✓ [Electron Installer] path.txt written! Setup complete.');
}

installElectron().catch(err => {
  console.error('[Electron Installer Fatal Error]', err);
  process.exit(1);
});
