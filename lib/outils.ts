import type { Projet } from "./types";

// Regroupe singulier/pluriel ("chiffon" / "chiffons") sous la même entrée. Fichier
// séparé de projets.ts (qui dépend de guides.ts, donc de fs/path) car ces fonctions
// doivent aussi tourner côté client, sur les données déjà chargées, sans jamais tirer
// de dépendance Node dans le bundle navigateur.
export function cleGroupementOutil(nom: string): string {
  return nom.trim().toLowerCase().replace(/s$/, "");
}

export interface UsageOutil {
  total: number;
  occurrences: number;
  formes: Map<string, number>;
}

export function calculerUsageOutils(projets: Projet[]): Map<string, UsageOutil> {
  const parCle = new Map<string, UsageOutil>();

  for (const projet of projets) {
    for (const item of projet.materiel_necessaire) {
      // Seuls les outils réutilisables comptent ici — les matériaux/consommables
      // (peinture, carrelage...) ne sont pas concernés par la réutilisation.
      if (item.type !== "outil") continue;
      const prixMoyen = (item.prix_min + item.prix_max) / 2;
      if (prixMoyen <= 0) continue;
      const cle = cleGroupementOutil(item.nom);
      const entree = parCle.get(cle) ?? { total: 0, occurrences: 0, formes: new Map() };
      entree.total += prixMoyen;
      entree.occurrences += 1;
      entree.formes.set(item.nom, (entree.formes.get(item.nom) ?? 0) + 1);
      parCle.set(cle, entree);
    }
  }

  return parCle;
}
