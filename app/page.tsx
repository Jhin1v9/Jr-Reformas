import { SITE } from '@/lib/constants';

/** Static-export-safe redirect to the default locale. */
export default function RootPage() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content="0;url=/es/" />
        <link rel="canonical" href={`${SITE.url}/es/`} />
        <title>{SITE.name}</title>
      </head>
      <body>
        <a href="/es/">Junior Reformas — Reformas integrales en Sabadell</a>
      </body>
    </html>
  );
}
