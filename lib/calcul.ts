import type { CalculInput, CalculResultat, Fourchette, MaterielCalcule, Verdict } from "./types";

interface DecompositionCoutDIY {
  mainOeuvre: number;
  materielAAcheter: Fourchette;
  materielDetail: MaterielCalcule[];
  total: Fourchette;
}

// Décompose le coût DIY en ses composantes indépendantes. Chaque ligne de
// materiel_necessaire (outil réutilisable ou matériau/consommable du projet) est
// multipliée par la quantité du projet quand par_unite vaut true, puis exclue du total
// si l'utilisateur a coché "déjà possédé" — le coût DIY peut donc tomber à 0 (hors
// temps valorisé) si tout est déjà en sa possession. Le risque d'échec n'est
// volontairement pas monétisé ici (on part du principe que le projet aboutit) : il
// reste affiché à l'utilisateur uniquement sous forme de probabilité informative (voir
// probabiliteEchec).
function calculerDecompositionDIY(input: CalculInput, tempsAmateurHeures: number): DecompositionCoutDIY {
  const { projet, surface, valeurHoraire, materielDejaPossede } = input;
  const mainOeuvre = valeurHoraire * tempsAmateurHeures;

  const materielDetail: MaterielCalcule[] = projet.materiel_necessaire.map((item) => {
    const facteur = item.par_unite ? surface : 1;
    return {
      nom: item.nom,
      type: item.type,
      coutMin: item.prix_min * facteur,
      coutMax: item.prix_max * facteur,
    };
  });

  const materielAAcheter = materielDetail.reduce<Fourchette>(
    (total, item) => {
      if (materielDejaPossede.has(item.nom)) return total;
      return { min: total.min + item.coutMin, max: total.max + item.coutMax };
    },
    { min: 0, max: 0 }
  );

  return {
    mainOeuvre,
    materielAAcheter,
    materielDetail,
    total: {
      min: materielAAcheter.min + mainOeuvre,
      max: materielAAcheter.max + mainOeuvre,
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

function determinerVerdict(economieMid: number, valeurHoraire: number): Verdict {
  if (economieMid < valeurHoraire * 2) {
    return "pro-recommande";
  }
  return "diy-recommande";
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

  const verdict = determinerVerdict(milieu(economie), input.valeurHoraire);

  const avertissementSecurite =
    projet.niveau_risque === "eleve" || projet.niveau_risque === "moyen" ? projet.avertissement_reglementaire : null;

  return {
    coutTotalDIY,
    coutTotalPro,
    economie,
    coutMainOeuvre: decompositionDIY.mainOeuvre,
    coutMaterielAAcheter: decompositionDIY.materielAAcheter,
    materielDetail: decompositionDIY.materielDetail,
    tempsProEstimeHeures,
    tempsAmateurEstimeHeures,
    tempsPerduSupplementaireHeures: tempsAmateurEstimeHeures - tempsProEstimeHeures,
    probabiliteEchec,
    verdict,
    avertissementSecurite,
  };
}
