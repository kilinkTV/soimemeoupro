import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets piscine — Soi-même ou Pro",
};

export default function PiscinePage() {
  const projets = getProjetsParCategorie("piscine");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="piscine"
          texte="Projets piscine"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Entretien courant d&apos;une piscine hors-sol : chiffrez le compromis avant de vous
          lancer, et respectez toujours les consignes de sécurité sur les produits chimiques.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

