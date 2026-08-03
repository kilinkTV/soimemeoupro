import type { NiveauCompetence, Projet } from "./types";

// Le niveau n'est plus demandé à l'utilisateur : on prend une moyenne raisonnable
// (intermédiaire) pour ne pas alourdir le formulaire.
export const NIVEAU_PAR_DEFAUT: NiveauCompetence = "intermediaire";

const UNITES_SURFACIQUES = ["m2", "ml"];

export function quantiteParDefaut(projet: Projet | undefined): number {
  return projet && UNITES_SURFACIQUES.includes(projet.unite) ? 10 : 1;
}
