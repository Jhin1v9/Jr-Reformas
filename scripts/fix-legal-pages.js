const fs = require('fs');
const path = require('path');

const files = [
  'app/[locale]/aviso-legal/page.tsx',
  'app/[locale]/politica-cookies/page.tsx',
  'app/[locale]/politica-privacidad/page.tsx',
];

const ROOT = path.join(__dirname, '..');

for (const rel of files) {
  const filePath = path.join(ROOT, rel);
  let text = fs.readFileSync(filePath, 'utf8');

  // Ensure Locale type is imported
  if (!text.includes('type Locale')) {
    text = text.replace(
      /import \{ isLocale \} from '@\/lib\/i18n';/,
      "import { isLocale } from '@/lib/i18n';\nimport { type Locale } from '@/lib/constants';"
    );
  }

  // Replace `const { locale: localeParam } = await params;` in default export with locale declaration
  text = text.replace(
    /export default async function \w+\(\{ params \}: Props\) \{\s*const \{ locale: localeParam \} = await params;\s*return \(\s*<LegalPage params=\{params\}/,
    (match) => match.replace(
      'const { locale: localeParam } = await params;',
      "const { locale: localeParam } = await params;\n  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';"
    ).replace('params={params}', 'params={{ locale }}')
  );

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Fixed: ${rel}`);
}
