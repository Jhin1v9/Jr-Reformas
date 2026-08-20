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

  // Replace any remaining `const { locale } = await params;` in default exports
  text = text.replace(
    /export default async function (\w+)\(\{ params \}: Props\) \{\s*const \{ locale \} = await params;/g,
    'export default async function $1({ params }: Props) {\n  const { locale: localeParam } = await params;'
  );

  // Replace any remaining `const { locale, slug } = await params;` in default exports
  text = text.replace(
    /export default async function (\w+)\(\{ params \}: Props\) \{\s*const \{ locale, slug \} = await params;/g,
    'export default async function $1({ params }: Props) {\n  const { locale: localeParam, slug } = await params;'
  );

  // Replace `const locale: Locale = locale;` with `const locale: Locale = localeParam;`
  text = text.replace(/const locale: Locale = locale;/g, 'const locale: Locale = localeParam;');

  // Replace any remaining bare `const locale = isLocale(locale) ? locale : 'es';`
  text = text.replace(/const locale = isLocale\(locale\) \? locale : 'es';/g, "const locale: Locale = isLocale(localeParam) ? localeParam : 'es';");

  // Replace any remaining `const { locale } = await params;` globally
  text = text.replace(/const \{ locale \} = await params;/g, 'const { locale: localeParam } = await params;');

  // Replace any remaining `const { locale, slug } = await params;` globally
  text = text.replace(/const \{ locale, slug \} = await params;/g, 'const { locale: localeParam, slug } = await params;');

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Fixed: ${rel}`);
}
