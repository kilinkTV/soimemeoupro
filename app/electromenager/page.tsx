import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Installation et petites réparations d'appareils électriques : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets électroménager — Soi-même ou Pro",
  description: DESCRIPTION,
  alternates: { canonical: "/electromenager" },
};

export default function ElectromenagerPage() {
  const projets = getProjetsParCategorie("electromenager");

  return (
    <div className="space-y-6">
      <BanniereCategorie categorie="electromenager" />
      <div>
        <TitreCategorie
          categorie="electromenager"
          texte="Projets électroménager"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          Aucun projet de cette catégorie n&apos;est classé à risque élevé : la plupart combinent simplement
          électricité et eau (lave-linge, lave-vaisselle), ce qui justifie de toujours débrancher l&apos;appareil
          avant d&apos;intervenir. Le remplacement d&apos;un appareil laisse souvent l&apos;ancien sur les bras — sa
          reprise par le magasin est gratuite et obligatoire dans la plupart des cas, voir notre{" "}
          <Link href="/guides/deee-recyclage-electromenager" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur la reprise des vieux appareils
          </Link>
          .
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
