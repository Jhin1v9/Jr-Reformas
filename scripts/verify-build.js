const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../out');

const REQUIRED_FILES = [
  'index.html',
  'es/index.html',
  'en/index.html',
  'pt/index.html',
  'es/servicios/index.html',
  'es/localidades/index.html',
  'es/contacto/index.html',
  'es/presupuesto/index.html',
  'es/proceso/index.html',
  'es/sobre-junior/index.html',
  'es/blog/index.html',
  'es/proyectos/galeria/index.html',
  'es/antes-y-despues/index.html',
  'es/gracias/index.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
];

const REQUIRED_SERVICES = [
  'reformas-integrales',
  'suelos-y-parquet',
  'banos',
  'cocinas',
  'albanileria',
  'electricidad',
  'fontaneria',
  'pintura',
  'pladur-y-techos',
  'fachadas-y-terrazas',
  'locales-comerciales',
  'carpinteria',
];

const REQUIRED_LOCALITIES = [
  'reformas-sabadell',
  'reformas-barcelona',
  'reformas-terrassa',
  'reformas-mataro',
];

let errors = 0;

console.log('🔍 Verificando build de Junior Reformas...\n');

REQUIRED_FILES.forEach((file) => {
  const fullPath = path.join(OUT_DIR, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ FALTANDO: ${file}`);
    errors++;
  }
});

REQUIRED_SERVICES.forEach((slug) => {
  const file = `es/servicios/${slug}/index.html`;
  const fullPath = path.join(OUT_DIR, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ FALTANDO: ${file}`);
    errors++;
  }
});

REQUIRED_LOCALITIES.forEach((slug) => {
  const file = `es/localidades/${slug}/index.html`;
  const fullPath = path.join(OUT_DIR, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ FALTANDO: ${file}`);
    errors++;
  }
});

if (fs.existsSync(path.join(OUT_DIR, 'sitemap.xml'))) {
  const sitemap = fs.readFileSync(path.join(OUT_DIR, 'sitemap.xml'), 'utf8');
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`✅ sitemap.xml (${urlCount} URLs)`);
  if (urlCount < 30) {
    console.log(`⚠️  Sitemap tem apenas ${urlCount} URLs (esperado: 30+)`);
  }
} else {
  console.log(`❌ FALTANDO: sitemap.xml`);
  errors++;
}

if (fs.existsSync(path.join(OUT_DIR, 'robots.txt'))) {
  const robots = fs.readFileSync(path.join(OUT_DIR, 'robots.txt'), 'utf8');
  if (robots.includes('Sitemap:')) {
    console.log(`✅ robots.txt (com Sitemap)`);
  } else {
    console.log(`⚠️  robots.txt (sem Sitemap)`);
  }
} else {
  console.log(`❌ FALTANDO: robots.txt`);
  errors++;
}

console.log(`\n${errors === 0 ? '✅' : '❌'} Build ${errors === 0 ? 'COMPLETO' : 'INCOMPLETO'} — ${errors} erro(s) encontrado(s)`);
process.exit(errors > 0 ? 1 : 0);
