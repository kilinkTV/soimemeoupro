import type { Projet } from "./types";

// Dans les listes déjà regroupées sous un intitulé "Moto" (page /auto, sélecteur du
// comparateur), répéter "moto" dans chaque nom de projet est redondant. On ne touche
// pas au champ `nom` lui-même (utilisé tel quel comme titre de page, balise <title> et
// dans la recherche globale, où le contexte "Moto" n'est pas forcément visible).
export function nomAffiche(projet: Projet): string {
  if (projet.sous_categorie !== "Moto") return projet.nom;
  return projet.nom.replace(/\s*\(moto\)\s*$/i, "").replace(/\s+moto\s*$/i, "");
}
