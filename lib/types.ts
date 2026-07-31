export type NiveauCompetence = "debutant" | "intermediaire" | "experimente";

export type NiveauRisque = "faible" | "moyen" | "eleve";

export type Categorie = "maison" | "auto" | "jardin" | "electromenager" | "velo";

export interface Fourchette {
  min: number;
  max: number;
}

export interface OutilNecessaire {
  nom: string;
  // Prix moyen constaté (France), en euros. 0 signifie que cet outil est en réalité
  // la pièce/le consommable déjà comptabilisé dans cout_materiaux_unite (par ex. la
  // chaîne neuve elle-même) : il n'est donc pas additionné ni cochable comme "déjà possédé".
  prix_moyen: number;
}

export interface Projet {
  id: string;
  categorie: Categorie;
  nom: string;
  description: string;
  unite: string;
  nom_unite: string;
  niveau_risque: NiveauRisque;
  avertissement_reglementaire: string | null;
  cout_materiaux_unite: Fourchette;
  cout_pro_unite: Fourchette;
  temps_pro_heures_par_unite: number;
  facteur_temps_amateur: Record<NiveauCompetence, number>;
  facteur_risque_reprise: Record<NiveauCompetence, number>;
  cout_reprise_si_echec_pct_du_pro: number;
  outils_necessaires: OutilNecessaire[];
  video_youtube_id?: string;
  video_titre?: string;
}

export interface CalculInput {
  projet: Projet;
  surface: number;
  niveau: NiveauCompetence;
  valeurHoraire: number;
  coutOutilsAAcheter: number;
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
