import projetsData from "@/data/projets.json";
import type { Categorie, Projet } from "./types";
import { apercuCoutDIY } from "./apercuCout";
import { getToutesLesActualites } from "./actualites";
import { getToutesLesQuestionsFaq } from "./faqGenerale";
import { getTousLesTermesGlossaire } from "./glossaire";
import { getTousLesGuides } from "./guides";
import { calculerUsageOutils, cleGroupementOutil } from "./outils";

const projets = projetsData as Projet[];

export function getTousLesProjets(): Projet[] {
  return projets;
}

export function getProjetParId(id: string): Projet | undefined {
  return projets.find((p) => p.id === id);
}

export function getProjetsParCategorie(categorie: Categorie): Projet[] {
  return projets.filter((p) => p.categorie === categorie);
}

// Toutes catégories confondues, triés par coût DIY plancher croissant — met en avant
// les projets accessibles à petit budget sur la page d'accueil.
export function getProjetsMoinsChers(limite = 5): Projet[] {
  return [...projets]
    .sort((a, b) => apercuCoutDIY(a).min - apercuCoutDIY(b).min)
    .slice(0, limite);
}

// projet.id pour un projet, guide.slug pour un guide, terme.id (ancre) pour un terme
// du glossaire, question.id (ancre) pour une question de la FAQ générale, actualite.slug
// pour une actualité (résout vers une ancre #slug sur /actualites, voir hrefElement).
export type ElementRecherche =
  | { type: "projet"; id: string; nom: string; categorie: Categorie; sousCategorie: string }
  | { type: "guide"; id: string; nom: string }
  | { type: "terme"; id: string; nom: string }
  | { type: "faq"; id: string; nom: string }
  | { type: "actualite"; id: string; nom: string };

// Version allégée des projets, guides, termes de glossaire et questions FAQ (sans
// coûts/outils/vidéo/contenu) pour la recherche côté client, afin de ne pas expédier
// les ~260 Ko de data/projets.json (ni le contenu des guides) dans le bundle du
// header. sousCategorie reste une chaîne courte (ex. "Freinage") : coût négligeable
// pour le bundle, mais permet de retrouver un projet en tapant "frein" sans connaître
// son nom exact.
export function getIndexRecherche(): ElementRecherche[] {
  const indexProjets: ElementRecherche[] = projets.map((p) => ({
    type: "projet",
    id: p.id,
    nom: p.nom,
    categorie: p.categorie,
    sousCategorie: p.sous_categorie,
  }));
  const indexGuides: ElementRecherche[] = getTousLesGuides().map((g) => ({
    type: "guide",
    id: g.slug,
    nom: g.frontmatter.title,
  }));
  const indexTermes: ElementRecherche[] = getTousLesTermesGlossaire().map((t) => ({
    type: "terme",
    id: t.id,
    nom: t.terme,
  }));
  const indexFaq: ElementRecherche[] = getToutesLesQuestionsFaq().map((q) => ({
    type: "faq",
    id: q.id,
    nom: q.question,
  }));
  const indexActualites: ElementRecherche[] = getToutesLesActualites().map((a) => ({
    type: "actualite",
    id: a.slug,
    nom: a.frontmatter.title,
  }));
  return [...indexProjets, ...indexGuides, ...indexTermes, ...indexFaq, ...indexActualites];
}

export interface OutilPopulaire {
  nom: string;
  prixMoyen: number;
  nombreProjets: number;
}

// Calculé une seule fois au chargement du module (data statique) puis réutilisé par
// getOutilsPopulaires et getNombreProjetsPourOutil, plutôt que reparcouru à chaque appel.
const USAGE_OUTILS = calculerUsageOutils(projets);

// Proxy faute de vraies statistiques d'achat (site pas encore en ligne) : les outils
// qui reviennent le plus souvent dans les guides projets, pas "les plus achetés".
export function getOutilsPopulaires(limite = 12): OutilPopulaire[] {
  return Array.from(USAGE_OUTILS.values())
    .map(({ total, occurrences, formes }) => {
      const nom = Array.from(formes.entries()).sort((a, b) => b[1] - a[1])[0][0];
      return {
        nom,
        prixMoyen: Math.round(total / occurrences),
        nombreProjets: occurrences,
      };
    })
    .sort((a, b) => b.nombreProjets - a.nombreProjets || a.nom.localeCompare(b.nom))
    .slice(0, limite);
}

// Nombre de projets (toutes catégories confondues) qui utilisent cet outil — affiché
// sur une fiche projet pour signaler qu'un outil est réutilisable ailleurs sur le site,
// et donc rentable à acheter plutôt qu'à emprunter/jeter après ce seul projet.
export function getNombreProjetsPourOutil(nom: string): number {
  return USAGE_OUTILS.get(cleGroupementOutil(nom))?.occurrences ?? 0;
}
