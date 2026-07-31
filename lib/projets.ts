import projetsData from "@/data/projets.json";
import type { Categorie, Projet } from "./types";

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

export interface OutilPopulaire {
  nom: string;
  prixMoyen: number;
  nombreProjets: number;
}

// Regroupe singulier/pluriel ("chiffon" / "chiffons") sous la même entrée.
function cleGroupement(nom: string): string {
  return nom.trim().toLowerCase().replace(/s$/, "");
}

// Proxy faute de vraies statistiques d'achat (site pas encore en ligne) : les outils
// qui reviennent le plus souvent dans les guides projets, pas "les plus achetés".
export function getOutilsPopulaires(limite = 8): OutilPopulaire[] {
  const parCle = new Map<
    string,
    { total: number; occurrences: number; formes: Map<string, number> }
  >();

  for (const projet of projets) {
    for (const outil of projet.outils_necessaires) {
      if (outil.prix_moyen <= 0) continue;
      const cle = cleGroupement(outil.nom);
      const entree = parCle.get(cle) ?? { total: 0, occurrences: 0, formes: new Map() };
      entree.total += outil.prix_moyen;
      entree.occurrences += 1;
      entree.formes.set(outil.nom, (entree.formes.get(outil.nom) ?? 0) + 1);
      parCle.set(cle, entree);
    }
  }

  return Array.from(parCle.values())
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
