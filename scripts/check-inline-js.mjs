#!/usr/bin/env node
/**
 * Lightweight pre-deploy checks for this static website.
 *
 * Extract and parse inline JavaScript from both HTML pages. This catches
 * syntax errors before GitHub Pages can publish a page that cannot start.
 * Also reject duplicate HTML IDs because the UI binds controls by ID.
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const pages = ['index.html', '3d.html'];
const tempDir = mkdtempSync(join(tmpdir(), 'oscilloscopes-art-check-'));
let failed = false;

try {
  for (const page of pages) {
    const html = readFileSync(resolve(page), 'utf8');
    const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
    const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

    if (duplicates.length) {
      console.error('FAIL ' + page + ': duplicate IDs: ' + duplicates.join(', '));
      failed = true;
    } else {
      console.log('PASS ' + page + ': HTML IDs are unique (' + ids.length + ' IDs)');
    }

    const tags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
    let scriptNumber = 0;
    for (const tag of tags) {
      const attributes = tag[1];
      const source = tag[2];
      if (/\bsrc\s*=/i.test(attributes) || !source.trim() || /\btype\s*=\s*["'](?:importmap|application\/json)["']/i.test(attributes)) continue;

      scriptNumber += 1;
      const isModule = /\btype\s*=\s*["']module["']/i.test(attributes);
      const safePage = page.replace(/[^a-z0-9]/gi, '_');
      const file = join(tempDir, safePage + '-' + scriptNumber + (isModule ? '.mjs' : '.js'));
      writeFileSync(file, source);

      const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
      if (check.status !== 0) {
        console.error('FAIL ' + page + ' inline script #' + scriptNumber + ' syntax check:');
        console.error(check.stderr || check.stdout);
        failed = true;
      } else {
        console.log('PASS ' + page + ' inline script #' + scriptNumber + ' parses');
      }
    }

    if (scriptNumber === 0) {
      console.error('FAIL ' + page + ': no inline scripts found to check');
      failed = true;
    }
  }
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

if (failed) process.exit(1);
console.log('All static checks passed.');
