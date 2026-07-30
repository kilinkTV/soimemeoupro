export type NiveauCompetence = "debutant" | "intermediaire" | "experimente";

export type NiveauRisque = "faible" | "moyen" | "eleve";

export interface Fourchette {
  min: number;
  max: number;
}

export interface Projet {
  id: string;
  nom: string;
  description: string;
  unite: string;
  nom_unite: string;
  niveau_risque: NiveauRisque;
  avertissement_reglementaire: string | null;
  cout_materiaux_m2: Fourchette;
  cout_pro_m2: Fourchette;
  temps_pro_heures_par_m2: number;
  facteur_temps_amateur: Record<NiveauCompetence, number>;
  facteur_risque_reprise: Record<NiveauCompetence, number>;
  cout_reprise_si_echec_pct_du_pro: number;
  outils_necessaires: string[];
}

export interface CalculInput {
  projet: Projet;
  surface: number;
  niveau: NiveauCompetence;
  valeurHoraire: number;
}

export type Verdict = "diy-recommande" | "pro-recommande" | "equilibre";

export interface ArticleFrontmatter {
  title: string;
  description: string;
  projetId?: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export interface CalculResultat {
  coutTotalDIY: Fourchette;
  coutTotalPro: Fourchette;
  economie: Fourchette;
  tempsProEstimeHeures: number;
  tempsAmateurEstimeHeures: number;
  tempsPerduSupplementaireHeures: number;
  probabiliteEchec: number;
  verdict: Verdict;
  avertissementSecurite: string | null;
}
