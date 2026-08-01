import type { CalculInput, CalculResultat, Fourchette, Verdict } from "./types";

const SEUIL_ECONOMIE_SIGNIFICATIVE = 150;

interface DecompositionCoutDIY {
  materiaux: Fourchette;
  mainOeuvre: number;
  outilsAAcheter: number;
  total: Fourchette;
}

// Décompose le coût DIY en ses composantes indépendantes. Les matériaux/consommables
// sont toujours présents, quels que soient les outils cochés "déjà possédés" — seule
// la ligne "outils à acheter" en dépend. Le risque d'échec n'est volontairement pas
// monétisé ici (on part du principe que le projet aboutit) : il reste affiché à
// l'utilisateur uniquement sous forme de probabilité informative (voir probabiliteEchec).
function calculerDecompositionDIY(input: CalculInput, tempsAmateurHeures: number): DecompositionCoutDIY {
  const { projet, surface, valeurHoraire, coutOutilsAAcheter } = input;
  const mainOeuvre = valeurHoraire * tempsAmateurHeures;

  const materiaux: Fourchette = {
    min: projet.cout_materiaux_unite.min * surface,
    max: projet.cout_materiaux_unite.max * surface,
  };

  return {
    materiaux,
    mainOeuvre,
    outilsAAcheter: coutOutilsAAcheter,
    total: {
      min: materiaux.min + mainOeuvre + coutOutilsAAcheter,
      max: materiaux.max + mainOeuvre + coutOutilsAAcheter,
    },
  };
}

function calculerCoutTotalPro(input: CalculInput): Fourchette {
  const { projet, surface } = input;
  return {
    min: projet.cout_pro_unite.min * surface,
    max: projet.cout_pro_unite.max * surface,
  };
}

function milieu(f: Fourchette): number {
  return (f.min + f.max) / 2;
}

function determinerVerdict(economieMid: number, valeurHoraire: number, niveauRisqueProjet: string): Verdict {
  if (economieMid < valeurHoraire * 2) {
    return "pro-recommande";
  }
  if (economieMid > SEUIL_ECONOMIE_SIGNIFICATIVE && niveauRisqueProjet === "faible") {
    return "diy-recommande";
  }
  return "equilibre";
}

export function calculerComparaison(input: CalculInput): CalculResultat {
  const { projet, surface, niveau } = input;

  const tempsProEstimeHeures = projet.temps_pro_heures_par_unite * surface;
  const tempsAmateurEstimeHeures = tempsProEstimeHeures * projet.facteur_temps_amateur[niveau];
  const probabiliteEchec = projet.facteur_risque_reprise[niveau];

  const decompositionDIY = calculerDecompositionDIY(input, tempsAmateurEstimeHeures);
  const coutTotalDIY = decompositionDIY.total;
  const coutTotalPro = calculerCoutTotalPro(input);

  const economie: Fourchette = {
    min: coutTotalPro.min - coutTotalDIY.max,
    max: coutTotalPro.max - coutTotalDIY.min,
  };

  const verdict = determinerVerdict(milieu(economie), input.valeurHoraire, projet.niveau_risque);

  const avertissementSecurite =
    projet.niveau_risque === "eleve" || projet.niveau_risque === "moyen" ? projet.avertissement_reglementaire : null;

  return {
    coutTotalDIY,
    coutTotalPro,
    economie,
    coutMateriaux: decompositionDIY.materiaux,
    coutMainOeuvre: decompositionDIY.mainOeuvre,
    coutOutilsAAcheter: decompositionDIY.outilsAAcheter,
    tempsProEstimeHeures,
    tempsAmateurEstimeHeures,
    tempsPerduSupplementaireHeures: tempsAmateurEstimeHeures - tempsProEstimeHeures,
    probabiliteEchec,
    verdict,
    avertissementSecurite,
  };
}
