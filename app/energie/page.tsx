import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Solaire, isolation, borne de recharge et équipements liés à l'énergie : chiffrez le compromis avant de vous lancer, certaines installations imposant un professionnel certifié.";

export const metadata = {
  title: "Projets énergie — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function EnergiePage() {
  const projets = getProjetsParCategorie("energie");

  return (
    <div className="space-y-6">
      <BanniereCategorie categorie="energie" />
      <div>
        <TitreCategorie
          categorie="energie"
          texte="Projets énergie"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          C&apos;est la catégorie la plus administrativement chargée du site : presque tous ses projets
          comportent un avertissement, et l&apos;installation d&apos;une borne de recharge pour véhicule
          électrique est classée à risque élevé. Pour le solaire, même un kit plug-and-play d&apos;un seul
          panneau nécessite une déclaration à Enedis — voir nos guides sur les{" "}
          <Link href="/guides/panneaux-solaires-demarches-administratives" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            démarches d&apos;un kit solaire
          </Link>{" "}
          et sur{" "}
          <Link href="/guides/autoconsommation-solaire-installation-toiture" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            l&apos;autoconsommation en toiture
          </Link>
          . Autre point à connaître avant de se lancer : les aides publiques à l&apos;autoconsommation sont
          conditionnées à une pose par un professionnel certifié RGE, ce qui exclut d&apos;office une
          installation faite soi-même, quelle que soit sa qualité.
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
