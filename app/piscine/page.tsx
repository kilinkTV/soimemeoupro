import Link from "next/link";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { estPiscineEnterree } from "@/lib/piscine";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Piscine hors-sol ou piscine enterrée : chiffrez le compromis avant de vous lancer. Les deux espaces n'ont ni les mêmes projets ni les mêmes obligations réglementaires.";

export const metadata = {
  title: "Projets piscine — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function PiscinePage() {
  const projets = getProjetsParCategorie("piscine");
  const projetsEnterree = projets.filter((p) => estPiscineEnterree(p.id));
  const projetsHorsSol = projets.filter((p) => !estPiscineEnterree(p.id));

  return (
    <div className="space-y-10">
      <div>
        <TitreCategorie
          categorie="piscine"
          texte="Projets piscine"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
      </div>

      <div className="space-y-4">
        <TitreCategorie
          categorie="piscine"
          texte="Piscine hors-sol"
          niveau="h2"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <ProjetsCategorie projets={projetsHorsSol} prefixeAncre="horssol-" />
      </div>

      <div className="space-y-4">
        <TitreCategorie
          categorie="piscine"
          texte="Piscine enterrée"
          niveau="h2"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Une piscine enterrée ou semi-enterrée est soumise à une obligation légale de
          sécurité (barrière, alarme, couverture ou abri normalisés) — voir notre{" "}
          <Link
            href="/guides/securite-piscine-loi"
            className="underline hover:text-brand-700 dark:hover:text-brand-400"
          >
            guide sur la loi piscine
          </Link>
          .
        </p>
        <ProjetsCategorie projets={projetsEnterree} prefixeAncre="enterree-" />
      </div>
    </div>
  );
}
