import { getToutesLesActualites } from "@/lib/actualites";
import { SITE_URL } from "@/lib/site";

// Requis par l'export statique (output: "export") : ce fichier ne dépend
// d'aucune donnée de requête, donc génération statique explicite.
export const dynamic = "force-static";

function echapperXml(texte: string): string {
  return texte.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const actualites = getToutesLesActualites();

  const items = actualites
    .map((actualite) => {
      const url = `${SITE_URL}/actualites#${actualite.slug}`;
      const date = new Date(`${actualite.frontmatter.date}T00:00:00Z`).toUTCString();
      return `    <item>
      <title>${echapperXml(actualite.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${actualite.slug}</guid>
      <pubDate>${date}</pubDate>
      <description>${echapperXml(actualite.frontmatter.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Actualités réglementaires — Soi-même ou Pro</title>
    <link>${SITE_URL}/actualites</link>
    <description>Les changements de loi, de normes ou d'aides qui touchent le bricolage et l'entretien fait soi-même.</description>
    <language>fr-fr</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
