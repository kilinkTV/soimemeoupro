import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION = "Aménagement et entretien extérieur : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets jardin — Soi-même ou Pro",
  description: DESCRIPTION,
  alternates: { canonical: "/jardin" },
};

export default function JardinPage() {
  const projets = getProjetsParCategorie("jardin");

  return (
    <div className="space-y-6">
      <BanniereCategorie categorie="jardin" />
      <div>
        <TitreCategorie
          categorie="jardin"
          texte="Projets jardin"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          L&apos;entretien courant (tonte, taille, arrosage) reste la partie la plus accessible de cette
          catégorie. Deux projets se distinguent par un risque plus élevé : la construction d&apos;un mur de
          soutènement, qui touche à la stabilité du terrain, et la taille des arbres en hauteur. Sur la taille
          des haies et des arbres, notre{" "}
          <Link href="/guides/taille-haies-arbres-periode-nidification" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur la période de nidification
          </Link>{" "}
          détaille une règle souvent mal comprise et valable toute l&apos;année, pas seulement au printemps.
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
