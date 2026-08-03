import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets électroménager — Soi-même ou Pro",
};

export default function ElectromenagerPage() {
  const projets = getProjetsParCategorie("electromenager");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="electromenager"
          texte="Projets électroménager"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Installation et petites réparations d&apos;appareils électriques : chiffrez le
          compromis avant de vous lancer.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

