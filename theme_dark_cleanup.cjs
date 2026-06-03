const fs = require('fs');
const path = require('path');
const root = path.resolve('.');

function allFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(allFiles(full));
    } else if (['.tsx', '.ts', '.css'].includes(path.extname(full))) {
      files.push(full);
    }
  }
  return files;
}

const files = allFiles(path.join(root, 'src')).concat([path.join(root, 'tailwind.config.ts')]);
const colorMap = [
  ['bg-neutral-950', 'bg-[#ccd5ae]'],
  ['bg-neutral-900', 'bg-[#e9edc9]'],
  ['bg-neutral-800', 'bg-[#faedcd]'],
  ['hover:bg-neutral-800', 'hover:bg-[#e9edc9]'],
  ['bg-slate-900', 'bg-[#ccd5ae]'],
  ['bg-slate-800', 'bg-[#e9edc9]'],
  ['bg-indigo-600', 'bg-[#faedcd]'],
  ['bg-indigo-700', 'bg-[#ccd5ae]'],
  ['hover:bg-indigo-700', 'hover:bg-[#ccd5ae]'],
  ['bg-red-950/20', 'bg-red-50'],
  ['bg-red-950', 'bg-red-50'],
  ['text-white', 'text-neutral-950'],
  ['bg-[#ccd5ae] text-neutral-950', 'bg-[#ccd5ae] text-neutral-950'],
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;

  // remove dark: prefixed Tailwind classes
  text = text.replace(/\bdark:[A-Za-z0-9_\-\[\]\/\.]+\b/g, '');

  for (const [oldStr, newStr] of colorMap) {
    text = text.split(oldStr).join(newStr);
  }

  // Clean double spaces from removed dark: tokens
  text = text.replace(/\s{2,}/g, ' ');
  text = text.replace(/className=\"\s+/g, 'className="');
  text = text.replace(/\s+\"/g, '"');

  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    console.log('Updated', file);
  }
}
