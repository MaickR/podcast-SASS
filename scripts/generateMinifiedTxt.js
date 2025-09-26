const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT, 'codigo-minificado.txt');
const TEXT_EXTENSIONS = new Set([
  '.css',
  '.scss',
  '.js',
  '.json',
  '.html',
  '.txt',
  '.md',
  '.svg',
  '.map',
  '.gitignore'
]);
const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  '.vscode',
  '.idea',
  'build/img',
  'src/img'
]);
const IGNORE_FILES = new Set(['codigo-minificado.txt']);

const collected = [];

function shouldProcess(filePath) {
  const rel = path.relative(ROOT, filePath);
  if (rel.startsWith('..')) {
    return false;
  }
  const parts = rel.split(path.sep);
  for (let i = 0; i < parts.length - 1; i++) {
    const partial = parts.slice(0, i + 1).join('/');
    if (IGNORE_DIRS.has(partial)) {
      return false;
    }
  }
  const ext = path.extname(filePath);
  if (ext === '' && path.basename(filePath) === '.gitignore') {
    return true;
  }
  return TEXT_EXTENSIONS.has(ext);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(path.relative(ROOT, fullPath).split(path.sep).join('/'))) {
        walk(fullPath);
      }
    } else if (entry.isFile()) {
      if (!IGNORE_FILES.has(path.relative(ROOT, fullPath).split(path.sep).join('/')) && shouldProcess(fullPath)) {
        collected.push(fullPath);
      }
    }
  }
}

function minifyContent(content, ext) {
  if (ext === '.json' || ext === '.map') {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed);
    } catch (error) {
      // fall through to generic minify
    }
  }
  let result = content.replace(/\r?\n|\r/g, ' ');
  result = result.replace(/\s{2,}/g, ' ');
  result = result.replace(/\s*([{};,>\(\)\[\]])\s*/g, '$1');
  result = result.trim();
  return result;
}

walk(ROOT);
collected.sort((a, b) => a.localeCompare(b));

let output = '';
for (const filePath of collected) {
  const relPath = path.relative(ROOT, filePath).split(path.sep).join('/');
  const ext = path.extname(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const minified = minifyContent(content, ext);
  output += `=== ${relPath} ===\n`;
  output += `${minified}\n\n`;
}

fs.writeFileSync(OUTPUT_FILE, output.trim() + '\n', 'utf8');

console.log(`Archivo generado: ${path.relative(ROOT, OUTPUT_FILE)}`);
