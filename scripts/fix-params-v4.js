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

  // 1. Fix generateMetadata return type to Promise<Metadata>
  text = text.replace(
    /export async function generateMetadata\(\{ params \}: Props\): Metadata \{/g,
    'export async function generateMetadata({ params }: Props): Promise<Metadata> {'
  );

  // 2. In slug pages, fix generateMetadata destructuring and usage
  if (text.includes('params: Promise<{ locale: string; slug: string }>')) {
    // Replace generateMetadata locale-only destructuring with locale+slug
    text = text.replace(
      /(export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{\s*)const \{ locale: localeParam \} = await params;/,
      '$1const { locale: localeParam, slug } = await params;'
    );
  }

  // 3. Fix default exports: ensure locale is declared before isLocale check
  // Pattern: const { locale: localeParam } = await params;\n  if (!isLocale(locale)) notFound();\n  const locale: Locale = localeParam;
  text = text.replace(
    /const \{ locale: localeParam(, slug)? \} = await params;\s*if \(!isLocale\(locale\)\) notFound\(\);\s*const locale: Locale = localeParam;/g,
    'const { locale: localeParam$1 } = await params;\n  if (!isLocale(localeParam)) notFound();\n  const locale: Locale = localeParam;'
  );

  // 4. Fix remaining `const locale: Locale = localeParam;` without isLocale check by adding check before it
  // Only if the next line doesn't already have isLocale check above
  // We'll do a simpler global fix: replace any `if (!isLocale(locale)) notFound();` with `if (!isLocale(localeParam)) notFound();`
  text = text.replace(/if \(!isLocale\(locale\)\) notFound\(\);/g, 'if (!isLocale(localeParam)) notFound();');

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Fixed: ${rel}`);
}
