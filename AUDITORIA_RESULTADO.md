# Auditoria Junior Reformas — 2026-08-20

## Build
- [x] `npm run build` → exit 0
- [x] `/out/` gerado com todas as páginas
- [x] `npm run verify` → 0 erros

## Erros Corrigidos
- [x] **Favicon** → `public/favicon.ico` gerado a partir do logo (`logo-jr.png`) e metadata apontando para `/favicon.ico`
- [x] **Vulnerabilidades** → `npm audit` → 0 vulnerabilidades (atualizado Next.js/React/ESLint para versões seguras)
- [x] **Redirect** → meta refresh em `app/page.tsx` agora usa caminho relativo `/es/` em vez de URL absoluta hardcoded

## Correções Técnicas Adicionais
- [x] `app/[locale]/layout.tsx` atualizado para Next.js 16: `params` tratado como `Promise`
- [x] `components/shared/LanguageSwitcher.tsx`: tipo `JSX.Element` substituído por `React.ReactElement`
- [x] `app/robots.ts` e `app/sitemap.ts`: adicionado `export const dynamic = 'force-static'` para compatibilidade com `output: 'export'`
- [x] Todas as páginas em `app/[locale]/**/page.tsx` atualizadas para `params` como `Promise` (Next.js 16)
- [x] `generateMetadata` atualizado para retornar `Promise<Metadata>`
- [x] Páginas legais (`aviso-legal`, `politica-cookies`, `politica-privacidad`) ajustadas para passar `{ locale }` síncrono ao `LegalPage`

## SEO
- [x] Schema LocalBusiness presente no layout
- [x] Sitemap com 117 URLs
- [x] Robots.txt com Sitemap
- [x] Hreflang via alternates no sitemap
- [x] Open Graph configurado via `lib/seo.ts`

## Conteúdo
- [x] 0 ocorrências de "Lorem ipsum", "Placeholder" (exceto placeholders de formulários), "Sample text", "Example"
- [x] 10 artículos de blog gerados
- [x] 12 servicios gerados
- [x] 4 localidades geradas
- [x] Dados reais do briefing em `lib/constants.ts`

## Funcionalidades Verificadas
- [x] WhatsApp flutuante presente (`https://wa.me/34658187071`)
- [x] Formulário inteligente em `/presupuesto/`
- [x] Formulário de contacto em `/contacto/`
- [x] Language switcher (ES/EN/PT)
- [x] Mobile nav implementado
- [x] FAQ acordeão

## Design
- [x] Paleta e tokens verificados em `tailwind.config.ts`
- [x] Fontes Playfair Display + Inter
- [x] Logo visível em header e footer

## STATUS: ✅ PRONTO PARA DEPLOY
