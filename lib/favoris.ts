const CLE_STOCKAGE = "smop:projets-favoris";
const EVENEMENT_CHANGEMENT = "smop:favoris-changed";

// Liste des ids de projets mis en favori par l'utilisateur, le plus récemment ajouté
// en tête. Stockée en localStorage uniquement (pas de compte utilisateur), même
// approche que recents.ts : rien côté serveur, erreurs de stockage avalées en
// silence (navigation privée stricte, quota dépassé...).

// L'événement "storage" natif ne se déclenche que dans les *autres* onglets, jamais
// dans celui qui écrit — insuffisant pour rafraîchir le compteur du header (persistant
// entre les pages) au même endroit où on vient de cocher un favori. D'où cet événement
// maison, écouté par LienMesProjets.
function notifierChangementFavoris(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENEMENT_CHANGEMENT));
  }
}

export function ecouterChangementsFavoris(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENEMENT_CHANGEMENT, callback);
  return () => window.removeEventListener(EVENEMENT_CHANGEMENT, callback);
}

export function getFavorisIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE);
    if (!brut) return [];
    const ids: unknown = JSON.parse(brut);
    return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function estFavori(id: string): boolean {
  return getFavorisIds().includes(id);
}

// Ajoute ou retire le projet des favoris et renvoie la liste à jour, pour que
// l'appelant puisse resynchroniser son état local sans relire le stockage.
export function basculerFavori(id: string): string[] {
  const actuels = getFavorisIds();
  const suivants = actuels.includes(id)
    ? actuels.filter((existant) => existant !== id)
    : [id, ...actuels];
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(suivants));
    } catch {
      // Stockage indisponible : on ignore, ce n'est qu'une fonctionnalité de confort.
    }
  }
  notifierChangementFavoris();
  return suivants;
}

export function viderFavoris(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CLE_STOCKAGE);
  } catch {
    // Stockage indisponible : on ignore, ce n'est qu'une fonctionnalité de confort.
  }
  notifierChangementFavoris();
}
