import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Installation d'appareils connectés (thermostat, prises, caméras, sonnette) : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets domotique — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function DomotiquePage() {
  const projets = getProjetsParCategorie("domotique");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="domotique"
          texte="Projets domotique"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}

