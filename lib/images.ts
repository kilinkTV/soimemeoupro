// Paliers générés à côté des JPEG sources par un script one-off (sharp, qualité 78,
// même traitement que la recompression du carrousel) : <nom>-480w.jpg, -768w.jpg,
// -1024w.jpg, plus l'équivalent .webp pour chaque palier (y compris la largeur
// d'origine). Pas automatisé dans le build : à relancer manuellement si de nouvelles
// images sont ajoutées dans public/images/carrousel ou public/images/categories.
const LARGEURS_RESPONSIVES = [480, 768, 1024] as const;

// `unoptimized: true` (export statique, cf next.config.mjs) empêche next/image de
// générer un srcset : on le construit nous-mêmes à partir des paliers pré-générés.
export function srcSetResponsive(chemin: string, largeurOriginale: number): string {
  const base = chemin.replace(/\.jpg$/, "");
  const entrees = LARGEURS_RESPONSIVES.filter((w) => w < largeurOriginale).map(
    (w) => `${base}-${w}w.jpg ${w}w`,
  );
  entrees.push(`${chemin} ${largeurOriginale}w`);
  return entrees.join(", ");
}

// Même chose en WebP (~30% plus léger que le JPEG à qualité équivalente), pour le
// <source type="image/webp"> d'un <picture> — le <img> JPEG reste le fallback.
export function srcSetWebp(chemin: string, largeurOriginale: number): string {
  const base = chemin.replace(/\.jpg$/, "");
  const entrees = LARGEURS_RESPONSIVES.filter((w) => w < largeurOriginale).map(
    (w) => `${base}-${w}w.webp ${w}w`,
  );
  entrees.push(`${base}.webp ${largeurOriginale}w`);
  return entrees.join(", ");
}
