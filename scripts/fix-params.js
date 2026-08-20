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

  // 1. Transform interface Props: params becomes Promise
  text = text.replace(
    /interface Props \{\s*params: \{([^}]+)\};\s*\}/,
    (match, inner) => `interface Props {\n  params: Promise<{${inner}}>;\n}`
  );

  // 2. Make generateMetadata async and await params with localeParam
  text = text.replace(
    /export function generateMetadata\(\{ params \}: Props\): Metadata \{/,
    'export async function generateMetadata({ params }: Props): Metadata {\n  const { locale: localeParam } = await params;'
  );

  // 3. Make default export async and await params with localeParam (and slug if present)
  text = text.replace(
    /export default function (\w+)\(\{ params \}: Props\) \{/,
    (match, name) => {
      if (text.includes('params: Promise<{ locale: string; slug: string }>')) {
        return `export default async function ${name}({ params }: Props) {\n  const { locale: localeParam, slug } = await params;`;
      }
      return `export default async function ${name}({ params }: Props) {\n  const { locale: localeParam } = await params;`;
    }
  );

  // 4. Replace `const locale: Locale = isLocale(params.locale) ? params.locale : 'es';`
  //    with `const locale: Locale = isLocale(localeParam) ? localeParam : 'es';`
  text = text.replace(
    /const locale: Locale = isLocale\(params\.locale\) \? params\.locale : 'es';/g,
    "const locale: Locale = isLocale(localeParam) ? localeParam : 'es';"
  );

  // 5. Replace `const locale = isLocale(params.locale) ? params.locale : 'es';`
  text = text.replace(
    /const locale = isLocale\(params\.locale\) \? params\.locale : 'es';/g,
    "const locale: Locale = isLocale(localeParam) ? localeParam : 'es';"
  );

  // 6. Replace remaining params.locale with localeParam
  text = text.replace(/params\.locale/g, 'localeParam');

  // 7. Replace params.slug with slug
  text = text.replace(/params\.slug/g, 'slug');

  // 8. Fix `if (!isLocale(params.locale)) notFound(); const locale: Locale = params.locale;`
  //    patterns that remain
  text = text.replace(
    /if \(!isLocale\(localeParam\)\) notFound\(\);\s*const locale: Locale = localeParam;/g,
    'if (!isLocale(localeParam)) notFound();\n  const locale: Locale = localeParam;'
  );

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Fixed: ${rel}`);
}
