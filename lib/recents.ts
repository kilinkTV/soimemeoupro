const CLE_STOCKAGE = "smop:projets-recents";
const MAX_RECENTS = 8;

// Liste des ids de projets consultés récemment, la plus récente en tête. Stockée en
// localStorage uniquement (pas de compte utilisateur) : ces fonctions ne font rien
// côté serveur (typeof window === "undefined") et avalent silencieusement les erreurs
// de stockage (navigation privée stricte, quota dépassé...).

export function getProjetsRecentsIds(): string[] {
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

export function enregistrerVisiteProjet(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const actuels = getProjetsRecentsIds().filter((existant) => existant !== id);
    const suivants = [id, ...actuels].slice(0, MAX_RECENTS);
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(suivants));
  } catch {
    // Stockage indisponible : on ignore, ce n'est qu'une fonctionnalité de confort.
  }
}

export function viderProjetsRecents(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CLE_STOCKAGE);
  } catch {
    // Stockage indisponible : on ignore, ce n'est qu'une fonctionnalité de confort.
  }
}
