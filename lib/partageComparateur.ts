export interface EtatComparateurPartage {
  projetId?: string;
  surface?: number;
  surHeuresDeTravail?: boolean;
  valeurHoraire?: number;
  indicesPossedes?: number[];
}

// Lit l'état du comparateur (projet, quantité, valeur horaire, matériel déjà
// possédé) depuis les paramètres d'URL, pour restaurer un lien partagé. Ne fait rien
// côté serveur ; à appeler uniquement depuis un useEffect (après hydratation), pour
// ne jamais désynchroniser le HTML serveur du premier rendu client.
export function lireEtatDepuisUrl(): EtatComparateurPartage {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const etat: EtatComparateurPartage = {};

  const projet = params.get("projet");
  if (projet) etat.projetId = projet;

  const q = params.get("q");
  if (q !== null && Number.isFinite(Number(q))) etat.surface = Number(q);

  if (params.get("h") === "1") etat.surHeuresDeTravail = true;

  const v = params.get("v");
  if (v !== null && Number.isFinite(Number(v))) etat.valeurHoraire = Number(v);

  const possede = params.get("possede");
  if (possede) {
    etat.indicesPossedes = possede
      .split(",")
      .map((valeur) => Number(valeur))
      .filter((n) => Number.isInteger(n) && n >= 0);
  }

  return etat;
}

// Construit l'URL absolue à partager, ne reflétant que ce qui s'écarte des valeurs
// par défaut (pas de "possede" si rien n'est coché possédé, pas de "projet" si la
// page est déjà verrouillée sur un seul projet via son URL).
export function construireUrlPartage(params: {
  pathname: string;
  projetId: string;
  verrouillerProjet: boolean;
  surface: number;
  surHeuresDeTravail: boolean;
  valeurHoraire: number;
  indicesPossedes: number[];
}): string {
  const sp = new URLSearchParams();
  if (!params.verrouillerProjet) sp.set("projet", params.projetId);
  sp.set("q", String(params.surface));
  if (params.surHeuresDeTravail) {
    sp.set("h", "1");
    sp.set("v", String(params.valeurHoraire));
  }
  if (params.indicesPossedes.length > 0) sp.set("possede", params.indicesPossedes.join(","));

  const query = sp.toString();
  const origine = typeof window !== "undefined" ? window.location.origin : "";
  return `${origine}${params.pathname}${query ? `?${query}` : ""}`;
}
