import type { CalculInput, CalculResultat, Fourchette, Verdict } from "./types";

const SEUIL_ECONOMIE_SIGNIFICATIVE = 150;

function calculerCoutTotalDIY(input: CalculInput, tempsAmateurHeures: number, probabiliteEchec: number): Fourchette {
  const { projet, surface, valeurHoraire } = input;
  const coutMainOeuvreAmateur = valeurHoraire * tempsAmateurHeures;

  const coutRepriseMin = probabiliteEchec * projet.cout_reprise_si_echec_pct_du_pro * projet.cout_pro_m2.min * surface;
  const coutRepriseMax = probabiliteEchec * projet.cout_reprise_si_echec_pct_du_pro * projet.cout_pro_m2.max * surface;

  return {
    min: projet.cout_materiaux_m2.min * surface + coutMainOeuvreAmateur + coutRepriseMin,
    max: projet.cout_materiaux_m2.max * surface + coutMainOeuvreAmateur + coutRepriseMax,
  };
}

function calculerCoutTotalPro(input: CalculInput): Fourchette {
  const { projet, surface } = input;
  return {
    min: projet.cout_pro_m2.min * surface,
    max: projet.cout_pro_m2.max * surface,
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

  const tempsProEstimeHeures = projet.temps_pro_heures_par_m2 * surface;
  const tempsAmateurEstimeHeures = tempsProEstimeHeures * projet.facteur_temps_amateur[niveau];
  const probabiliteEchec = projet.facteur_risque_reprise[niveau];

  const coutTotalDIY = calculerCoutTotalDIY(input, tempsAmateurEstimeHeures, probabiliteEchec);
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
    tempsProEstimeHeures,
    tempsAmateurEstimeHeures,
    tempsPerduSupplementaireHeures: tempsAmateurEstimeHeures - tempsProEstimeHeures,
    probabiliteEchec,
    verdict,
    avertissementSecurite,
  };
}
