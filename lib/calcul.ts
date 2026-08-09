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

  // Le matériau (consommable/pièce du projet, ex. peinture, carrelage, chaîne neuve)
  // passe avant les outils (équipement réutilisable) : c'est l'élément central du
  // projet, il doit apparaître en premier dans la liste affichée à l'utilisateur.
  const materielOrdonne = [...projet.materiel_necessaire].sort(
    (a, b) => Number(a.type !== "materiau") - Number(b.type !== "materiau")
  );

  const materielDetail: MaterielCalcule[] = materielOrdonne.map((item) => {
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
  const forfaitMin = projet.cout_pro_forfait_min ?? 0;
  // Un artisan ne facture pas en pur prorata linéaire sur une petite quantité : il y a
  // un plancher (déplacement, installation de chantier, temps incompressible), d'où le
  // `Math.max` avec `cout_pro_forfait_min` quand il est renseigné. Au-delà de ce
  // plancher, le prorata linéaire reste l'approximation retenue (les vraies grilles
  // pro sont aussi dégressives sur les grandes surfaces, mais cette dégressivité varie
  // trop d'un corps de métier à l'autre pour être généralisée sans devis réels par
  // projet — voir le README).
  return {
    min: Math.max(projet.cout_pro_unite.min * surface, forfaitMin),
    max: Math.max(projet.cout_pro_unite.max * surface, forfaitMin),
  };
}

function milieu(f: Fourchette): number {
  return (f.min + f.max) / 2;
}

function determinerVerdict(economieMid: number, valeurHoraire: number, forcerProRecommande: boolean): Verdict {
  if (forcerProRecommande) {
    return "pro-recommande";
  }
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

  const verdict = determinerVerdict(milieu(economie), input.valeurHoraire, projet.verdict_pro_force === true);

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
