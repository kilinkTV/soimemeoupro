import { GrilleProjets } from "@/components/ListeProjets";
import type { Projet } from "@/lib/types";

const NOMBRE_MAX = 4;

// Priorité aux projets de la même sous-catégorie (ex. "Freinage"), puis on complète
// avec le reste de la catégorie si besoin, en excluant toujours le projet courant.
export default function ProjetsSimilaires({
  projet,
  tousLesProjets,
}: {
  projet: Projet;
  tousLesProjets: Projet[];
}) {
  const memeSousCategorie = tousLesProjets.filter(
    (p) => p.id !== projet.id && p.categorie === projet.categorie && p.sous_categorie === projet.sous_categorie
  );
  const resteCategorie = tousLesProjets.filter(
    (p) => p.id !== projet.id && p.categorie === projet.categorie && p.sous_categorie !== projet.sous_categorie
  );
  const suggestions = [...memeSousCategorie, ...resteCategorie].slice(0, NOMBRE_MAX);

  if (suggestions.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Projets similaires</h2>
      <GrilleProjets projets={suggestions} />
    </section>
  );
}
