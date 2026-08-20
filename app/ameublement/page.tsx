import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
import FilAriane from "@/components/FilAriane";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION = "Montage, réparation et relooking de meubles : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets ameublement — Soi-même ou Pro",
  description: DESCRIPTION,
  alternates: { canonical: "/ameublement" },
};

export default function AmeublementPage() {
  const projets = getProjetsParCategorie("ameublement");

  return (
    <div className="space-y-6">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "Projets ameublement" }]} />
      <BanniereCategorie categorie="ameublement" />
      <div>
        <TitreCategorie
          categorie="ameublement"
          texte="Projets ameublement"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          C&apos;est la catégorie où le compromis penche le plus nettement vers le DIY : tous les projets
          d&apos;ameublement présentés ici sont classés à risque faible. Le seul point souvent oublié n&apos;est
          pas technique mais administratif : que faire de l&apos;ancien meuble remplacé, sujet couvert par
          notre{" "}
          <Link href="/guides/reprise-gratuite-meubles-usages-eco-mobilier" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur la reprise gratuite obligatoire
          </Link>
          .
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
