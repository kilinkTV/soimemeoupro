import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets électricité — Soi-même ou Pro",
};

export default function ElectricitePage() {
  const projets = getProjetsParCategorie("electricite");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="electricite"
          texte="Projets électricité"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Petits travaux électriques courants : chiffrez le compromis avant de vous lancer, et
          coupez toujours le disjoncteur concerné avant d&apos;intervenir.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

