># Fotos — Junior Reformas

## Adicionar uma nova foto (3 minutos)

1. Escolha a pasta correta em `public/fotos/`:
   - `despues/` — fotos do resultado final
   - `durante/` — fotos da obra em andamento
   - `detalle/` — detalhes e acabamentos
   - `equipo/` — fotos da equipe
2. Nomeie o arquivo de forma descritiva em inglês/minúsculas com hífen:
   - `bano-marmol-doble-lavabo-despues-01.jpg`
   - `cocina-gris-cabinets-despues-01.jpg`
3. Prefira WebP para web. JPG é aceito.
4. Se a foto for usada como hero de um serviço, referencie em `lib/services.ts`:
   ```ts
   heroFoto: 'despues/nome-do-arquivo.ext',
   ```
5. Se for adicionar à galeria geral, o arquivo pode ser listado em `lib/photos.ts` no array `HOME_GALLERY` ou aproveitado via `metadata.json`.
6. `npm run build` para validar.

## Classificação das fotos

As fotos devem refletir a categoria real do ambiente:

| Categoria | Significado |
|-----------|-------------|
| COCINA | Cozinhas |
| BANO | Banheiros |
| PISO | Pisos/ambientes completos |
| SUELO | Pisos e parquet |
| LOCAL | Locais comerciais |
| EXTERIOR | Fachadas e terraços |
| INSTAL | Instalações (elétrica/hidráulica) |
| DEMO | Demolição e obra grussa |

## Regra de ouro

> Nunca use uma foto de banheiro para representar eletricidade, ou uma foto de cozinha para representar um terraço.
> Sem foto específica = gradiente temático.
