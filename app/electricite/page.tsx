import Link from "next/link";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Petits travaux électriques courants : chiffrez le compromis avant de vous lancer, et coupez toujours le disjoncteur concerné avant d'intervenir.";

export const metadata = {
  title: "Projets électricité — Soi-même ou Pro",
  description: DESCRIPTION,
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
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          Rien n&apos;interdit légalement à un particulier de faire ses propres travaux électriques, mais
          presque tous les projets de cette catégorie portent un avertissement à lire avant de commencer, et le
          remplacement du tableau électrique est le seul classé à risque élevé. La norme NF C 15-100 sert de
          référence quel que soit qui réalise les travaux — voir notre{" "}
          <Link href="/guides/electricite-ce-que-vous-pouvez-faire" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur ce qu&apos;un particulier peut légalement faire seul
          </Link>
          .
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
