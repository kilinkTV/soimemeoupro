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
