import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
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
      <BanniereCategorie categorie="domotique" />
      <div>
        <TitreCategorie
          categorie="domotique"
          texte="Projets domotique"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          La majorité de ces installations restent des projets à risque faible, surtout quand elles se
          branchent sur une prise ou un rail existant sans toucher au tableau électrique. Dès qu&apos;un
          appareil connecté se raccorde directement à un circuit (thermostat filaire, volet motorisé câblé),
          les mêmes règles que pour l&apos;électricité classique s&apos;appliquent — voir notre{" "}
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
