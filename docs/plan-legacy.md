# PLAN — Junior Reformas (jr-reformas.com)

SEO ES EL PRODUCTO. Next.js 14 + TS + Tailwind, i18n es/en/pt, Lucide icons, banderas SVG propias, 43 fotos en /public/fotos/. Build verificado entre fases, sin pausas.

## Stage 0 — Setup (Orchestrator)
- Leer skills: vibecoding-webapp-swarm (composition/orchestration), webapp-building-swarm (implementation).
- Preparar /mnt/agents/output/jr-reformas/ + /public/fotos con los 43 assets subidos (logo PNG + 41 JPEG + reseñas screenshot; 8 MP4 → /public/videos si se usan).

## Stage 1 — FASE 1 Fundación (coder subagent)
- Scaffold Next.js 14 App Router + TypeScript + Tailwind + Lucide.
- i18n por rutas: /es (default), /en, /pt. Banderas SVG custom (ES/GB/PT) en header switcher. hreflang.
- Tokens de marca (cobre/naranja + plata sobre negro), logo en /public.
- `npm run build` verde.

## Stage 2 — FASE 2 Arquitectura SEO + FASE 3 contenidos (coder subagent)
- Leer MASTER v2.0 + AUDITORIA_SEO_SENIOR_PROMPT en /mnt/agents/upload.
- 12 servicios con keywords, páginas servicios + [servicio]/[barrio], LocalBusiness/Service/FAQ JSON-LD, sitemap.xml, robots.txt, CWV budget.
- Contenido ES completo (Inicio, servicios, barrios top, Sobre Junior, Contacto 2 formularios, WhatsApp +34 644 16 42 61) + traducciones EN/PT.

## Stage 3 — FASE 4 datos autónomos + FASE 5 galería (researcher + coder, paralelo)
- Researcher: 4 lacunas (temporada, competidores Sabadell, quejas, proyectos) vía web → /docs/autonomous-data.md (según PROMPT_AUTONOMIA_SWARM).
- Coder: blog 10 posts ES (+EN/PT), calculadora presupuestos, comparador 2.0, /precios, galería clasificada por sala/estilo/superficie (PROMPT_FOTOCLASSIFIER), reseñas reales (8×5★ screenshot), antes/después.

## Stage 4 — FASE 6 QA + build producción
- Checklist Fase 6: lint, 0 console errors, build, i18n 3 idiomas, metadata/JSON-LD, robots/sitemap, responsive, accesibilidad básica, performance.
- Fix loop hasta build limpio.

## Stage 5 — Entrega
- website_version_manager build_version (type static) con el proyecto Next.js compilado.
