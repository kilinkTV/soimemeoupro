import { GrilleProjets } from "@/components/ListeProjets";
import { estPiscineEnterree } from "@/lib/piscine";
import type { Projet } from "@/lib/types";

const NOMBRE_MAX = 4;

// Pour la piscine, les projets "hors-sol" et "enterrée" ne partagent ni les mêmes
// contraintes ni les mêmes obligations réglementaires : un projet piscine ne doit
// jamais être suggéré comme "similaire" à un projet de l'autre espace. Sans objet pour
// les autres catégories (retourne toujours true).
function memeEspacePiscine(a: Projet, b: Projet): boolean {
  if (a.categorie !== "piscine") return true;
  return estPiscineEnterree(a.id) === estPiscineEnterree(b.id);
}

// Priorité aux projets de la même sous-catégorie (ex. "Freinage"), puis on complète
// avec le reste de la catégorie si besoin, en excluant toujours le projet courant.
export default function ProjetsSimilaires({
  projet,
  tousLesProjets,
}: {
  projet: Projet;
  tousLesProjets: Projet[];
}) {
  const candidats = tousLesProjets.filter((p) => p.id !== projet.id && memeEspacePiscine(projet, p));
  const memeSousCategorie = candidats.filter(
    (p) => p.categorie === projet.categorie && p.sous_categorie === projet.sous_categorie
  );
  const resteCategorie = candidats.filter(
    (p) => p.categorie === projet.categorie && p.sous_categorie !== projet.sous_categorie
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
