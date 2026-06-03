from pathlib import Path

root = Path('.')
files = list(root.rglob('src/**/*.*')) + [root / 'tailwind.config.ts']
files = [f for f in files if f.suffix in {'.tsx', '.ts', '.css'}]
replacements = [
    ('darkMode: \'class\'', 'darkMode: false'),
    ('bg-neutral-950/40', 'bg-[#334155]/15'),
    ('bg-neutral-950', 'bg-[#ccd5ae]'),
    ('bg-neutral-900', 'bg-[#e9edc9]'),
    ('bg-neutral-800', 'bg-[#faedcd]'),
    ('hover:bg-neutral-800', 'hover:bg-[#e9edc9]'),
    ('border-neutral-800', 'border-[#ccd5ae]'),
    ('focus:border-neutral-950', 'focus:border-[#ccd5ae]'),
    ('dark:bg-neutral-950', ''),
    ('dark:bg-neutral-900', ''),
    ('dark:bg-neutral-850', ''),
    ('dark:bg-neutral-800/50', ''),
    ('dark:bg-neutral-800', ''),
    ('dark:border-neutral-800', ''),
    ('dark:text-white', ''),
    ('dark:text-neutral-950', ''),
    ('dark:text-neutral-400', ''),
    ('dark:hover:text-white', ''),
    ('dark:hover:bg-neutral-700', ''),
    ('dark:hover:bg-neutral-800', ''),
    ('dark:hover:bg-neutral-100', ''),
    ('dark:bg-white', ''),
    ('dark:shadow-sm', ''),
    ('dark:hover:bg-neutral-900', ''),
    ('dark:border-white', ''),
    ('dark:stroke-white', ''),
    ('dark:fill-white', ''),
]

for path in files:
    text = path.read_text(encoding='utf-8')
    original = text
    for old, new in replacements:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Updated {path}')
