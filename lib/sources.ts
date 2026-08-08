export interface SourcePrincipale {
  label: string;
  url: string;
}

// Extrait le premier lien de la section "## Sources" d'un article MDX (toujours
// classé en premier par convention éditoriale, c'est la source officielle la plus
// directe) pour l'afficher en évidence en haut de la page, en plus de la liste
// complète déjà présente en bas d'article. Retourne null si l'article n'a pas de
// section Sources (ex. articles évergreen sans obligation légale précise).
export function extraireSourcePrincipale(content: string): SourcePrincipale | null {
  let dansSources = false;

  for (const ligne of content.split("\n")) {
    if (/^##\s+Sources\s*$/i.test(ligne)) {
      dansSources = true;
      continue;
    }
    if (!dansSources) continue;
    if (/^##\s+/.test(ligne)) break;

    const match = /^-\s+\[(.+?)\]\((.+?)\)/.exec(ligne.trim());
    if (match) {
      return { label: match[1], url: match[2] };
    }
  }

  return null;
}
