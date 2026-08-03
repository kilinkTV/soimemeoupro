import { slugifier } from "./slugifier";

export interface SectionMdx {
  titre: string;
  slug: string;
}

// Extrait les titres de section de niveau 2 (## Titre) d'un article MDX, dans l'ordre
// d'apparition, pour construire une mini table des matières. Les slugs générés ici
// doivent correspondre exactement à ceux posés sur les <h2> rendus (voir
// components/mdx/H2AvecAncre.tsx), sous peine de liens d'ancre cassés.
export function extraireSectionsMdx(content: string): SectionMdx[] {
  const sections: SectionMdx[] = [];
  for (const ligne of content.split("\n")) {
    const match = /^##\s+(.+?)\s*$/.exec(ligne);
    if (match) {
      const titre = match[1].trim();
      sections.push({ titre, slug: slugifier(titre) });
    }
  }
  return sections;
}
