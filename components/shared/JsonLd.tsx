interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Injects JSON-LD structured data. */
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
