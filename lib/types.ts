export type NiveauCompetence = "debutant" | "intermediaire" | "experimente";

export type NiveauRisque = "faible" | "moyen" | "eleve";

export type Categorie =
  | "maison"
  | "auto"
  | "jardin"
  | "electromenager"
  | "velo"
  | "piscine"
  | "domotique"
  | "ameublement"
  | "electricite"
  | "plomberie"
  | "energie";

export interface Fourchette {
  min: number;
  max: number;
}

export type TypeMateriel = "outil" | "materiau";

export interface MaterielNecessaire {
  nom: string;
  // "outil" : équipement réutilisable (perceuse, niveau...), prix fixe quelle que soit
  // la quantité du projet. "materiau" : consommable/pièce du projet (peinture,
  // carrelage, chaîne neuve...), dont le prix est multiplié par la quantité saisie
  // quand par_unite vaut true.
  type: TypeMateriel;
  prix_min: number;
  prix_max: number;
  par_unite: boolean;
}

export interface Projet {
  id: string;
  categorie: Categorie;
  sous_categorie: string;
  nom: string;
  description: string;
  unite: string;
  nom_unite: string;
  niveau_risque: NiveauRisque;
  avertissement_reglementaire: string | null;
  cout_pro_unite: Fourchette;
  // Plancher tarifaire réaliste pour les projets à quantité variable (m², mètre
  // linéaire...) : un artisan facture rarement en pur prorata de `cout_pro_unite` sur
  // une toute petite surface, il amortit son déplacement/son installation par un
  // forfait minimum (documenté par les sites de devis : ~400-500 € pour un chantier
  // peinture/sol < 10-50 m², ~90 € pour une intervention électrique simple...). Absent
  // pour les projets non concernés (quantite_variable: false, ou déjà un montant
  // réaliste dès la première unité). Voir `calculerCoutTotalPro` dans lib/calcul.ts.
  cout_pro_forfait_min?: number;
  temps_pro_heures_par_unite: number;
  facteur_temps_amateur: Record<NiveauCompetence, number>;
  facteur_risque_reprise: Record<NiveauCompetence, number>;
  cout_reprise_si_echec_pct_du_pro: number;
  materiel_necessaire: MaterielNecessaire[];
  video_youtube_id?: string;
  video_titre?: string;
  quantite_variable: boolean;
  // Force le verdict à "pro-recommande" indépendamment du calcul économique : pour les
  // projets où avertissement_reglementaire déconseille le DIY même pour un amateur
  // expérimenté (ex. certification IRVE, tableau électrique), le seul écart de coût ne
  // doit pas afficher "DIY recommandé" alors que le texte dit explicitement le contraire.
  verdict_pro_force?: boolean;
}

export interface CalculInput {
  projet: Projet;
  surface: number;
  niveau: NiveauCompetence;
  valeurHoraire: number;
  materielDejaPossede: Set<string>;
}

export type Verdict = "diy-recommande" | "pro-recommande";

export interface ArticleFrontmatter {
  title: string;
  description: string;
  projetId?: string;
  // Guides évergreen uniquement (content/guides/) : catégories de projets auxquelles
  // le guide se rapporte, pour l'afficher sur les fiches projet concernées. Absent
  // pour les articles liés à un projet précis (projetId défini).
  categories?: Categorie[];
  // Restreint encore le rapprochement à certaines sous-catégories (ex. "Solaire" au
  // sein de la catégorie "energie", qui contient aussi "Recharge véhicule"). Absent :
  // le guide s'applique à toute la catégorie.
  sousCategories?: string[];
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export interface MaterielCalcule {
  nom: string;
  type: TypeMateriel;
  coutMin: number;
  coutMax: number;
}

export interface CalculResultat {
  coutTotalDIY: Fourchette;
  coutTotalPro: Fourchette;
  economie: Fourchette;
  // Décomposition du coût DIY : le risque d'échec n'est pas monétisé (voir
  // probabiliteEchec ci-dessous, affiché à titre informatif seulement). Si tout le
  // matériel nécessaire est déjà possédé, coutMaterielAAcheter tombe à 0 et le coût
  // DIY total se limite à la valorisation du temps (0 si non renseignée).
  coutMainOeuvre: number;
  coutMaterielAAcheter: Fourchette;
  // Détail par ligne (coût déjà multiplié par la quantité du projet), pour l'affichage
  // de la liste cochable "Matériel nécessaire".
  materielDetail: MaterielCalcule[];
  tempsProEstimeHeures: number;
  tempsAmateurEstimeHeures: number;
  tempsPerduSupplementaireHeures: number;
  probabiliteEchec: number;
  verdict: Verdict;
  avertissementSecurite: string | null;
}
