/**
 * Renders a schema.org JSON-LD block. Server-safe; the data is serialised at
 * render time so search engines see it in the initial HTML.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is our own, static content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
