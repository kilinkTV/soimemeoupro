import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets énergie — Soi-même ou Pro",
};

export default function EnergiePage() {
  const projets = getProjetsParCategorie("energie");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="energie"
          texte="Projets énergie"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Solaire, borne de recharge et équipements liés à l&apos;énergie : chiffrez le
          compromis avant de vous lancer, certaines installations imposant un professionnel
          certifié.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

