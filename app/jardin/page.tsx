import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION = "Aménagement et entretien extérieur : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets jardin — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function JardinPage() {
  const projets = getProjetsParCategorie("jardin");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="jardin"
          texte="Projets jardin"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

