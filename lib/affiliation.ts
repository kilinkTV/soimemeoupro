const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
const MANOMANO_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_MANOMANO_AFFILIATE_PREFIX;

export function lienAmazon(recherche: string): string {
  const params = new URLSearchParams({ k: recherche });
  if (AMAZON_TAG) {
    params.set("tag", AMAZON_TAG);
  }
  return `https://www.amazon.fr/s?${params.toString()}`;
}

export function lienManoMano(recherche: string): string {
  const cible = `https://www.manomano.fr/recherche/${encodeURIComponent(recherche)}`;
  if (MANOMANO_AFFILIATE_PREFIX) {
    return `${MANOMANO_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

export type Marchand = "amazon" | "manomano";

// On n'a pas le droit de redistribuer les logos Amazon/ManoMano en tant que fichiers
// du site (marques déposées) ; on affiche donc leur favicon public à la volée via le
// service favicon de Google, ce qui identifie visuellement chaque marchand sans copier
// leurs assets.
export const MARCHANDS: Record<Marchand, { nom: string; domaine: string }> = {
  amazon: { nom: "Amazon", domaine: "amazon.fr" },
  manomano: { nom: "ManoMano", domaine: "manomano.fr" },
};

export function faviconUrl(domaine: string, taille = 16): string {
  return `https://www.google.com/s2/favicons?domain=${domaine}&sz=${taille}`;
}
