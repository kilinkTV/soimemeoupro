import { describe, expect, it } from "vitest";
import { calculerComparaison } from "./calcul";
import type { CalculInput, Projet } from "./types";

// Fabrique un projet minimal valide, avec des valeurs faciles à recalculer à la main ;
// chaque test ne surcharge que les champs qui l'intéressent.
function creerProjet(overrides: Partial<Projet> = {}): Projet {
  return {
    id: "projet-test",
    categorie: "maison",
    sous_categorie: "Test",
    nom: "Projet de test",
    description: "Projet fictif pour les tests unitaires.",
    unite: "m2",
    nom_unite: "m²",
    niveau_risque: "faible",
    avertissement_reglementaire: null,
    cout_pro_unite: { min: 20, max: 40 },
    temps_pro_heures_par_unite: 1,
    facteur_temps_amateur: { debutant: 3, intermediaire: 2, experimente: 1.5 },
    facteur_risque_reprise: { debutant: 0.1, intermediaire: 0.05, experimente: 0.02 },
    cout_reprise_si_echec_pct_du_pro: 0.3,
    materiel_necessaire: [],
    quantite_variable: true,
    ...overrides,
  };
}

function creerInput(overrides: Partial<CalculInput> = {}): CalculInput {
  return {
    projet: creerProjet(),
    surface: 1,
    niveau: "intermediaire",
    valeurHoraire: 0,
    materielDejaPossede: new Set<string>(),
    ...overrides,
  };
}

describe("calculerComparaison — coût matériel", () => {
  it("multiplie par la surface les lignes 'materiau' (par_unite: true)", () => {
    const projet = creerProjet({
      materiel_necessaire: [{ nom: "peinture", type: "materiau", prix_min: 10, prix_max: 20, par_unite: true }],
    });
    const resultat = calculerComparaison(creerInput({ projet, surface: 3 }));
    expect(resultat.coutMaterielAAcheter).toEqual({ min: 30, max: 60 });
  });

  it("ne multiplie pas par la surface les lignes 'outil' (par_unite: false)", () => {
    const projet = creerProjet({
      materiel_necessaire: [{ nom: "rouleau", type: "outil", prix_min: 5, prix_max: 5, par_unite: false }],
    });
    const resultat = calculerComparaison(creerInput({ projet, surface: 10 }));
    expect(resultat.coutMaterielAAcheter).toEqual({ min: 5, max: 5 });
  });

  it("exclut du total le matériel déjà possédé, sans le retirer de materielDetail", () => {
    const projet = creerProjet({
      materiel_necessaire: [
        { nom: "peinture", type: "materiau", prix_min: 10, prix_max: 20, par_unite: true },
        { nom: "rouleau", type: "outil", prix_min: 5, prix_max: 5, par_unite: false },
      ],
    });
    const resultat = calculerComparaison(
      creerInput({ projet, surface: 1, materielDejaPossede: new Set(["rouleau"]) })
    );
    expect(resultat.coutMaterielAAcheter).toEqual({ min: 10, max: 20 });
    expect(resultat.materielDetail).toHaveLength(2);
  });

  it("place les 'materiau' avant les 'outil' dans materielDetail quel que soit l'ordre d'entrée", () => {
    const projet = creerProjet({
      materiel_necessaire: [
        { nom: "rouleau", type: "outil", prix_min: 5, prix_max: 5, par_unite: false },
        { nom: "peinture", type: "materiau", prix_min: 10, prix_max: 20, par_unite: true },
      ],
    });
    const resultat = calculerComparaison(creerInput({ projet }));
    expect(resultat.materielDetail.map((m) => m.nom)).toEqual(["peinture", "rouleau"]);
  });

  it("retombe à 0 quand tout le matériel est déjà possédé et le temps non valorisé", () => {
    const projet = creerProjet({
      materiel_necessaire: [{ nom: "peinture", type: "materiau", prix_min: 10, prix_max: 20, par_unite: true }],
    });
    const resultat = calculerComparaison(
      creerInput({ projet, valeurHoraire: 0, materielDejaPossede: new Set(["peinture"]) })
    );
    expect(resultat.coutTotalDIY).toEqual({ min: 0, max: 0 });
  });
});

describe("calculerComparaison — main d'œuvre et temps", () => {
  it("valorise le temps amateur (temps pro × facteur du niveau) à la valeur horaire choisie", () => {
    const projet = creerProjet({ temps_pro_heures_par_unite: 2, facteur_temps_amateur: { debutant: 3, intermediaire: 2, experimente: 1.5 } });
    const resultat = calculerComparaison(creerInput({ projet, surface: 1, niveau: "intermediaire", valeurHoraire: 15 }));
    // temps pro = 2h, temps amateur = 2h * 2 = 4h, main d'œuvre = 4h * 15€ = 60€
    expect(resultat.tempsProEstimeHeures).toBe(2);
    expect(resultat.tempsAmateurEstimeHeures).toBe(4);
    expect(resultat.tempsPerduSupplementaireHeures).toBe(2);
    expect(resultat.coutMainOeuvre).toBe(60);
  });

  it("lit la probabilité d'échec dans facteur_risque_reprise au niveau choisi", () => {
    const projet = creerProjet({ facteur_risque_reprise: { debutant: 0.2, intermediaire: 0.08, experimente: 0.01 } });
    const resultat = calculerComparaison(creerInput({ projet, niveau: "debutant" }));
    expect(resultat.probabiliteEchec).toBe(0.2);
  });
});

describe("calculerComparaison — plancher forfaitaire pro (cout_pro_forfait_min)", () => {
  it("applique le plancher quand le prorata linéaire est en dessous", () => {
    const projet = creerProjet({ cout_pro_unite: { min: 20, max: 40 }, cout_pro_forfait_min: 400 });
    const resultat = calculerComparaison(creerInput({ projet, surface: 1 }));
    // prorata linéaire : 20-40€, très en dessous du plancher de 400€
    expect(resultat.coutTotalPro).toEqual({ min: 400, max: 400 });
  });

  it("laisse le prorata linéaire l'emporter une fois au-dessus du plancher", () => {
    const projet = creerProjet({ cout_pro_unite: { min: 20, max: 40 }, cout_pro_forfait_min: 400 });
    const resultat = calculerComparaison(creerInput({ projet, surface: 50 }));
    // prorata linéaire : 1000-2000€, largement au-dessus du plancher
    expect(resultat.coutTotalPro).toEqual({ min: 1000, max: 2000 });
  });

  it("reste purement linéaire quand cout_pro_forfait_min est absent", () => {
    const projet = creerProjet({ cout_pro_unite: { min: 20, max: 40 } });
    const resultat = calculerComparaison(creerInput({ projet, surface: 0.5 }));
    expect(resultat.coutTotalPro).toEqual({ min: 10, max: 20 });
  });
});

describe("calculerComparaison — verdict", () => {
  it("recommande le DIY quand l'économie dépasse deux fois la valeur horaire", () => {
    const projet = creerProjet({ cout_pro_unite: { min: 100, max: 100 }, temps_pro_heures_par_unite: 1, facteur_temps_amateur: { debutant: 1, intermediaire: 1, experimente: 1 } });
    // pro = 100€, DIY = 0€ (pas de matériel, temps non valorisé) → économie 100€ >> 0
    const resultat = calculerComparaison(creerInput({ projet, valeurHoraire: 0 }));
    expect(resultat.verdict).toBe("diy-recommande");
  });

  it("recommande le pro quand l'économie ne dépasse pas deux fois la valeur horaire", () => {
    const projet = creerProjet({
      cout_pro_unite: { min: 50, max: 50 },
      materiel_necessaire: [{ nom: "matériau", type: "materiau", prix_min: 40, prix_max: 40, par_unite: true }],
    });
    // pro = 50€, DIY = 40€ de matériel → économie mid = 10€, en dessous de 2 × 15€ = 30€
    const resultat = calculerComparaison(creerInput({ projet, valeurHoraire: 15 }));
    expect(resultat.verdict).toBe("pro-recommande");
  });

  it("force 'pro-recommande' quand verdict_pro_force est vrai, même si le DIY est nettement moins cher", () => {
    const projet = creerProjet({
      cout_pro_unite: { min: 1000, max: 1000 },
      verdict_pro_force: true,
    });
    const resultat = calculerComparaison(creerInput({ projet, valeurHoraire: 0 }));
    expect(resultat.verdict).toBe("pro-recommande");
  });
});

describe("calculerComparaison — avertissement de sécurité", () => {
  it("n'affiche aucun avertissement pour un risque faible", () => {
    const projet = creerProjet({ niveau_risque: "faible", avertissement_reglementaire: "Texte présent mais non affiché" });
    const resultat = calculerComparaison(creerInput({ projet }));
    expect(resultat.avertissementSecurite).toBeNull();
  });

  it("affiche l'avertissement réglementaire pour un risque moyen ou élevé", () => {
    const projetMoyen = creerProjet({ niveau_risque: "moyen", avertissement_reglementaire: "Attention moyen" });
    const projetEleve = creerProjet({ niveau_risque: "eleve", avertissement_reglementaire: "Attention élevé" });
    expect(calculerComparaison(creerInput({ projet: projetMoyen })).avertissementSecurite).toBe("Attention moyen");
    expect(calculerComparaison(creerInput({ projet: projetEleve })).avertissementSecurite).toBe("Attention élevé");
  });
});
