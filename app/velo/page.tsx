import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Entretien et petites réparations courantes : chiffrez le compromis avant de vous lancer, et repérez les cas où la sécurité (freins notamment) impose de faire vérifier votre travail.";

export const metadata = {
  title: "Projets vélo — Soi-même ou Pro",
  description: DESCRIPTION,
  alternates: { canonical: "/velo" },
};

export default function VeloPage() {
  const projets = getProjetsParCategorie("velo");

  return (
    <div className="space-y-6">
      <BanniereCategorie categorie="velo" />
      <div>
        <TitreCategorie
          categorie="velo"
          texte="Projets vélo"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          Une majorité des projets de cette catégorie sont classés à risque faible, mais le freinage mérite une
          vigilance particulière avant de reprendre la route. Pour un vélo à assistance électrique, remplacer
          une pièce à l&apos;identique (batterie, capteur) n&apos;a rien à voir avec un débridage — un point
          détaillé, avec les sanctions encourues, dans notre{" "}
          <Link href="/guides/debridage-velo-electrique-interdit" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur le débridage
          </Link>
          .
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
