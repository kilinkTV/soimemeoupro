import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION = "Montage, réparation et relooking de meubles : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets ameublement — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function AmeublementPage() {
  const projets = getProjetsParCategorie("ameublement");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="ameublement"
          texte="Projets ameublement"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}

