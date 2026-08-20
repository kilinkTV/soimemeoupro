import BanniereCategorie from "@/components/BanniereCategorie";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Entretien et réparation courants d'une voiture ou d'une moto : chiffrez le compromis avant de vous lancer, et repérez les cas où la sécurité impose de passer par un professionnel.";

export const metadata = {
  title: "Projets auto & moto — Soi-même ou Pro",
  description: DESCRIPTION,
  alternates: { canonical: "/auto" },
};

export default function AutoPage() {
  const projets = getProjetsParCategorie("auto");

  return (
    <div className="space-y-6">
      <BanniereCategorie categorie="auto" />
      <div>
        <TitreCategorie
          categorie="auto"
          texte="Projets auto & moto"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          Aucun projet de cette catégorie n&apos;est classé à risque élevé dans notre méthodologie, mais la
          répartition n&apos;est pas homogène pour autant : l&apos;entretien courant (fluides, filtres,
          ampoules) se prête bien au DIY, tandis que le freinage et la direction/suspension touchent
          directement à la sécurité active du véhicule. Sur ces deux dernières familles, une reprise par un
          professionnel après votre intervention — ou un contrôle avant remise en circulation — reste un
          réflexe raisonnable en cas de doute, plus que sur le reste de la catégorie.
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
