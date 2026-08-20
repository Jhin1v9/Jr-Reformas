# Componentes compartilhados — Junior Reformas

## Adicionar um novo serviço (5 minutos)

1. Abra `lib/services.ts`.
2. Adicione um novo objeto no array `SERVICES` seguindo a interface `Service`.
3. Campos obrigatórios:
   - `slug`: identificador único em kebab-case
   - `title`: nome do serviço
   - `shortDesc`: descrição curta (1 linha)
   - `metaTitle`, `metaDesc`, `keywords`: SEO
   - `icon`: ícone Lucide (só usado em fallback/listagens técnicas)
   - `main: true` para os 3 serviços principais
   - `categoria`: uma das categorias do tipo `Categoria`
   - `includes`, `processSteps`, `faq`: conteúdo da página de detalhe
4. Imagem do serviço:
   - Se tiver foto real da categoria, use `heroFoto: 'despues/nome-do-arquivo.ext'`
   - Se não tiver foto específica, use `gradient: 'from-<cor> via-carbon to-carbon-light'`
   - **Nunca use foto de outro serviço**
5. `npm run build` para validar.

## Componentes premium disponíveis

### Carousel
```tsx
import Carousel from '@/components/shared/Carousel';

<Carousel
  slides={[{ id: '1', content: <div>...</div> }]}
  interval={5000}
  showArrows
  showDots
/>
```

### PhotoCard
```tsx
import PhotoCard from '@/components/shared/PhotoCard';

<PhotoCard
  src="/fotos/despues/exemplo.jpg"
  alt="Descrição da foto"
  aspect="landscape"
  onClick={() => abrirLightbox()}
/>
```

### VideoCard
```tsx
import VideoCard from '@/components/shared/VideoCard';

<VideoCard
  src="/videos/exemplo.mp4"
  poster="/fotos/despues/poster.jpg"
  aspect="video"
/>
```

### MasonryGrid
```tsx
import MasonryGrid, { type MasonryItem } from '@/components/shared/MasonryGrid';

const items: MasonryItem[] = [
  { id: '1', src: '/fotos/...', alt: '...', category: 'BANO', aspect: 'portrait' },
];

<MasonryGrid items={items} columns={3} />
```

### ServiceCard
```tsx
import ServiceCard from '@/components/shared/ServiceCard';

<ServiceCard
  title="Reformas integrales"
  description="..."
  href="/es/servicios/reformas-integrales"
  image="/fotos/despues/..."
  variant="hero"
/>
```

## Regras visuais

- Lucide só em listagens técnicas, nunca como elemento principal de um card de serviço.
- Sem foto específica = gradiente temático, nunca foto trocada.
- Cores dos gradientes:
  - Madeira/parquet: `from-amber-900 via-carbon to-carbon-light`
  - Elétrica: `from-yellow-900 via-carbon to-carbon-light`
  - Hidráulica: `from-blue-900 via-carbon to-carbon-light`
  - Exterior/terraço: `from-olive via-carbon to-carbon-light`
  - Comercial: `from-carbon-mid via-carbon to-carbon-light`
