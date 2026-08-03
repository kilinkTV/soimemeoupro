import type { Fourchette, Projet } from "./types";
import { calculerComparaison } from "./calcul";
import { NIVEAU_PAR_DEFAUT, quantiteParDefaut } from "./defauts";

// Coût DIY par défaut (temps libre non valorisé, rien de déjà possédé, quantité par
// défaut) : le même calcul que celui affiché en ouvrant la fiche projet, utilisé ici
// pour un aperçu de coût sur les cartes de listing.
export function apercuCoutDIY(projet: Projet): Fourchette {
  const resultat = calculerComparaison({
    projet,
    surface: quantiteParDefaut(projet),
    niveau: NIVEAU_PAR_DEFAUT,
    valeurHoraire: 0,
    materielDejaPossede: new Set(),
  });
  return resultat.coutTotalDIY;
}

// Même principe que apercuCoutDIY, pour le temps amateur estimé (utilisé par le
// filtre "temps estimé" de la page Tous les projets).
export function apercuTempsDIYHeures(projet: Projet): number {
  const resultat = calculerComparaison({
    projet,
    surface: quantiteParDefaut(projet),
    niveau: NIVEAU_PAR_DEFAUT,
    valeurHoraire: 0,
    materielDejaPossede: new Set(),
  });
  return resultat.tempsAmateurEstimeHeures;
}
