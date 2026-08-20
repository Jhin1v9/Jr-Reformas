const fs = require('fs');
const path = require('path');

const files = [
  'app/[locale]/page.tsx',
  'app/[locale]/antes-y-despues/page.tsx',
  'app/[locale]/aviso-legal/page.tsx',
  'app/[locale]/blog/page.tsx',
  'app/[locale]/blog/[slug]/page.tsx',
  'app/[locale]/contacto/page.tsx',
  'app/[locale]/gracias/page.tsx',
  'app/[locale]/localidades/page.tsx',
  'app/[locale]/localidades/[slug]/page.tsx',
  'app/[locale]/politica-cookies/page.tsx',
  'app/[locale]/politica-privacidad/page.tsx',
  'app/[locale]/presupuesto/page.tsx',
  'app/[locale]/proceso/page.tsx',
  'app/[locale]/proyectos/galeria/page.tsx',
  'app/[locale]/servicios/page.tsx',
  'app/[locale]/servicios/[slug]/page.tsx',
  'app/[locale]/sobre-junior/page.tsx',
];

const ROOT = path.join(__dirname, '..');

for (const rel of files) {
  const filePath = path.join(ROOT, rel);
  let text = fs.readFileSync(filePath, 'utf8');

  // 1. In generateMetadata: rename locale to localeParam and fix subsequent lines
  text = text.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Metadata \{\s*)const \{ locale \} = await params;(\s*)const locale: Locale = isLocale\(locale\) \? locale : 'es';/,
    "$1const { locale: localeParam } = await params;$2const locale: Locale = isLocale(localeParam) ? localeParam : 'es';"
  );

  text = text.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Metadata \{\s*)const \{ locale \} = await params;(\s*)const locale = isLocale\(locale\) \? locale : 'es';/,
    "$1const { locale: localeParam } = await params;$2const locale: Locale = isLocale(localeParam) ? localeParam : 'es';"
  );

  // 2. In default export with slug
  text = text.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\s*)const \{ locale, slug \} = await params;(\s*)const locale: Locale = locale;/,
    "$1const { locale: localeParam, slug } = await params;$2const locale: Locale = localeParam;"
  );

  // 3. In default export without slug
  text = text.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\s*)const \{ locale \} = await params;(\s*)const locale: Locale = locale;/,
    "$1const { locale: localeParam } = await params;$2const locale: Locale = localeParam;"
  );

  // 4. In default export without type annotation
  text = text.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\s*)const \{ locale \} = await params;(\s*)if \(!isLocale\(locale\)\) notFound\(\);/,
    "$1const { locale: localeParam } = await params;$2if (!isLocale(localeParam)) notFound();"
  );

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Fixed: ${rel}`);
}
