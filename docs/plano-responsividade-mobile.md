# Plano de Responsividade Mobile — Junior Reformas

> Arquitetura de UI Mobile-First para small / medium / large phones.
> Baseado em auditoria de código local + melhores práticas de engenharia frontend.

---

## 1. Resumo Executivo

**Fotos caídas:** Nenhuma. Todas as 32 fotos do `metadata.json` existem fisicamente em `public/fotos/` e todas as referências hardcoded estão consistentes.

**Nota geral de responsividade mobile:** 6,5 / 10

O site já possui base mobile-first razoável (grids de 1 coluna, paddings relativos, fontes fluidas parciais), mas tem **falhas funcionais importantes em touch**: navegação de carrossel/lightbox inexistente, CTAs escondidas por hover, áreas de toque abaixo de 44 px e tipografia não escalada para telas < 375 px.

---

## 2. Dispositivos de Referência

| Categoria | Viewport | Exemplos | Estratégia |
|-----------|----------|----------|------------|
| **SMALL** | < 375 px | iPhone SE (320×667), Android compacto | Tipografia mínima, 1 coluna, touch targets 48 px |
| **MEDIUM** | 375–414 px | iPhone 12/13/14, Galaxy S21/S22 | 1–2 colunas, badges legíveis, CTAs largura total |
| **LARGE** | 414–480 px | iPhone Pro Max, Galaxy Ultra, Pixel Pro | 2 colunas, safe-area, swipe habilitado |

> Todos os ajustes devem usar **Tailwind mobile-first** (`base` → `sm:` → `md:` → `lg:`).

---

## 3. Problemas por Severidade

### 🔴 Críticos (quebram usabilidade ou conversão)

| # | Problema | Arquivo(s) | Telas | Solução |
|---|----------|------------|-------|---------|
| 1 | **Drawer mobile sem scroll próprio** — menu pode extrapolar viewport | `Header.tsx` | SMALL/MEDIUM/LARGE | Envolver nav em `flex-1 overflow-y-auto` |
| 2 | **Lightbox sem navegação touch/swipe** — usuário fica preso na imagem | `Lightbox.tsx` | todos mobile | Implementar `onTouchStart/Move/End` + manter setas visíveis |
| 3 | **Carrossel sem navegação visível** — setas `hidden md:flex` e dots 8×8 px | `Carousel.tsx`, `HeroCarousel.tsx` | todos mobile | Setas sempre visíveis + dots com hit area 44×44 px |
| 4 | **CTAs dos cards de serviço ocultas por hover** — usuário mobile nunca vê "Ver proyectos" | `ServiceCard.tsx`, `ServicesPhotoGrid.tsx`, `ServicesCarousel.tsx` | todos touch | CTA sempre visível em mobile: `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` |
| 5 | **CTAs do hero de serviço não esticam** — ficam alinhados à esquerda em mobile | `servicios/[slug]/page.tsx` | SMALL/MEDIUM | `className="w-full"` nos CTAButton dentro de `flex-col` |
| 6 | **Checkboxes GDPR abaixo de 44 px** — difícil acertar o toque | `ContactForm.tsx`, `SmartBudgetForm.tsx` | todos mobile | `min-h-[44px] min-w-[44px]` + label envolvendo input |

### 🟡 Importantes (poluem UX ou acessibilidade)

| # | Problema | Arquivo(s) | Telas | Solução |
|---|----------|------------|-------|---------|
| 7 | **Títulos `text-5xl`/`text-4xl` sem escala mobile** | `HeroCarousel.tsx`, `CTAFinal.tsx`, `servicios/[slug]/page.tsx` | SMALL/MEDIUM | Escala: `text-3xl sm:text-4xl md:text-5xl` |
| 8 | **Hero `min-h-[600px]` pode exceder viewport baixa** | `HeroCarousel.tsx` | SMALL | `min-h-[500px] md:min-h-[600px]` |
| 9 | **Padding fixo `p-6` em cards estreitos** | `ServiceCard.tsx`, `ServicesCarousel.tsx`, etc. | SMALL/MEDIUM | `p-4 sm:p-5 md:p-6` |
| 10 | **Grids de 2 colunas muito apertados em < 375 px** | `SmartBudgetForm.tsx`, `BudgetCalculator.tsx`, `MasonryGrid.tsx` | SMALL | Usar `grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3` |
| 11 | **Overlays de galeria só aparecem no hover** | `MasonryGrid.tsx`, `PhotoGallery.tsx` | todos touch | Sempre visíveis em mobile: `opacity-100 md:opacity-0 md:group-hover:opacity-100` |
| 12 | **Footer padding/gap excessivos em mobile** | `Footer.tsx` | todos mobile | `py-10 md:py-14`, `gap-8 md:gap-10` |
| 13 | **SectionWrapper `py-16` dilui densidade visual** | `SectionWrapper.tsx` | SMALL/MEDIUM | `py-12 md:py-20 lg:py-24` |
| 14 | **CTAButton altura efetiva < 44 px** | `CTAButton.tsx` | todos | Adicionar `min-h-[48px]` |

### 🟢 Melhorias (polimento)

| # | Problema | Arquivo(s) | Telas | Solução |
|---|----------|------------|-------|---------|
| 15 | **Safe area não considerada** | `Header.tsx`, `WhatsAppButton.tsx` | MEDIUM/LARGE | `pt-[env(safe-area-inset-top)]`, `bottom-[max(1.25rem,env(safe-area-inset-bottom))]` |
| 16 | **Badge `text-[11px]` tracking amplo pode estourar** | `SectionHeader.tsx`, `servicios/[slug]/page.tsx` | SMALL | `text-[10px] tracking-[0.12em] sm:text-[11px] sm:tracking-[0.2em]` |
| 17 | **Micro-interações só no hover** | `BlogPreview.tsx`, `StatsBanner.tsx` | todos touch | Adicionar `active:` states |
| 18 | **E-mail pode vazar** | `contacto/page.tsx` | SMALL | `break-all` no e-mail |

---

## 4. Diretrizes Técnicas

### 4.1 Escala Tipográfica Mobile

```tsx
// Hero / títulos principais
<h1 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">

// Section titles
<h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">

// Badges
<span className="text-[10px] tracking-[0.12em] sm:text-[11px] sm:tracking-[0.2em]">
```

### 4.2 Touch Targets

```tsx
// Mínimo 44×44 px para qualquer elemento interativo
<button className="h-11 w-11">...</button>
<input type="checkbox" className="min-h-[44px] min-w-[44px]" />
<a className="inline-flex min-h-[44px] items-center py-2">...</a>
```

### 4.3 Grids Responsivos

```tsx
// Nunca 2 colunas em < 375 px sem min-width custom
<div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-3">
```

### 4.4 Overlay Touch-Friendly

```tsx
<div className="opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
```

### 4.5 Lightbox Swipe

```tsx
// Implementar handlers no container da imagem
onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
onTouchMove={(e) => setTouchMove(e.touches[0].clientX)}
onTouchEnd={() => {
  if (touchStart - touchMove > 50) next();
  if (touchMove - touchStart > 50) prev();
}}
```

---

## 5. Ordem de Implementação Recomendada

### Fase 1 — Conversão Mobile (impacto direto)
1. CTAButton: `min-h-[48px]`
2. Hero de serviço: CTAs `w-full`
3. Cards de serviço: CTA sempre visível em mobile
4. Formulários: checkboxes 44×44 px
5. Header: drawer com scroll + botão hambúrguer 44 px

### Fase 2 — Navegação e Galeria
6. Lightbox: swipe + setas visíveis
7. Carousel/HeroCarousel: dots e setas touch-friendly
8. Galerias: overlays visíveis em touch

### Fase 3 — Polimento Visual
9. Escalar tipografia mobile (hero, section titles, badges)
10. Ajustar paddings/gaps verticais
11. Safe areas e micro-interações touch

### Fase 4 — Validação
12. Build (`npm run build`)
13. Verify (`npm run verify`)
14. Testes manuais via DevTools em 320×667, 375×812, 414×896
15. Deploy

---

## 6. Checklist de Aceite

- [ ] Nenhum elemento interativo abaixo de 44×44 px em mobile.
- [ ] Navegação do menu mobile rola corretamente com todos os serviços expandidos.
- [ ] Lightbox navega por swipe e/ou setas visíveis em mobile.
- [ ] Carrossel tem dots e setas tocáveis.
- [ ] CTAs de serviço sempre visíveis em touch.
- [ ] Hero de serviço tem CTAs em largura total até `sm`.
- [ ] Formulários: checkbox GDPR e marketing são fáceis de tocar.
- [ ] Nenhum título `text-4xl`/`text-5xl` na base sem escala mobile.
- [ ] Grids nunca ficam com colunas < 160 px em SMALL.
- [ ] Nenhum overlay depende exclusivamente de hover em mobile.
- [ ] Build passa sem erros.
- [ ] Verify passa sem erros.

---

## 7. Notas do Arquiteto

- **Não reescrever componentes do zero.** Os componentes estão bem estruturados; as correções são majoritariamente ajustes de classes Tailwind + handlers touch.
- **Manter a identidade visual.** Cores, fontes e hierarquia permanecem inalteradas.
- **Priorizar conversão.** CTAs e formulários vêm antes de polimentos visuais.
- **Testar em dispositivos reais quando possível.** Emulador cobre 80%, mas toque real revela áreas de clique e scroll inertia.
- **Documentar alterações.** Cada fase deve ter commit separado para facilitar rollback.

---

*Documento gerado em: 2026-08-21*
*Próximo passo: implementar Fase 1 após aprovação do usuário.*
