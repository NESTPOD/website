#!/usr/bin/env node

/**
 * Post-Build Script: Rename NestPod index.html to nestpodindex.html
 *
 * This script runs after Next.js build and renames the output file
 * so it's distinguishable from other websites' index files.
 *
 * Usage: Add to package.json scripts:
 * "build": "next build && node scripts/rename-build-output.js"
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = './out';
const OLD_NAME = 'index.html';
const NEW_NAME = 'nestpodindex.html';

const oldPath = path.join(OUT_DIR, OLD_NAME);
const newPath = path.join(OUT_DIR, NEW_NAME);

try {
  if (!fs.existsSync(oldPath)) {
    console.log(`⚠️  File not found: ${oldPath}`);
    console.log('Skipping rename (static export may not be enabled).');
    process.exit(0);
  }

  fs.renameSync(oldPath, newPath);
  console.log(`✅ Renamed: ${OLD_NAME} → ${NEW_NAME}`);
  console.log(`📁 Location: ${newPath}`);
} catch (error) {
  console.error(`❌ Error renaming file:`, error.message);
  process.exit(1);
}
