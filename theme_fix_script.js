const fs = require('fs');
const path = require('path');
const root = path.resolve('.');

function allFiles(dir) {
  let entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (let entry of entries) {
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
const replacements = [
  ["darkMode: 'class'", 'darkMode: false'],
  ['bg-neutral-950/40', 'bg-[#334155]/15'],
  ['bg-neutral-950', 'bg-[#ccd5ae]'],
  ['bg-neutral-900', 'bg-[#e9edc9]'],
  ['bg-neutral-800', 'bg-[#faedcd]'],
  ['hover:bg-neutral-800', 'hover:bg-[#e9edc9]'],
  ['border-neutral-800', 'border-[#ccd5ae]'],
  ['focus:border-neutral-950', 'focus:border-[#ccd5ae]'],
  ['dark:bg-neutral-950', ''],
  ['dark:bg-neutral-900', ''],
  ['dark:bg-neutral-850', ''],
  ['dark:bg-neutral-800/50', ''],
  ['dark:bg-neutral-800', ''],
  ['dark:border-neutral-800', ''],
  ['dark:text-white', ''],
  ['dark:text-neutral-950', ''],
  ['dark:text-neutral-400', ''],
  ['dark:hover:text-white', ''],
  ['dark:hover:bg-neutral-700', ''],
  ['dark:hover:bg-neutral-800', ''],
  ['dark:hover:bg-neutral-100', ''],
  ['dark:bg-white', ''],
  ['dark:shadow-sm', ''],
  ['dark:hover:bg-neutral-900', ''],
  ['dark:border-white', ''],
  ['dark:stroke-white', ''],
  ['dark:fill-white', ''],
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  let original = text;
  for (const [oldStr, newStr] of replacements) {
    text = text.split(oldStr).join(newStr);
  }
  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    console.log('Updated', file);
  }
}
