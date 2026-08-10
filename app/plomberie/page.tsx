import Link from "next/link";
import BanniereCategorie from "@/components/BanniereCategorie";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Réparations et installations courantes de plomberie : chiffrez le compromis avant de vous lancer, en particulier quand une fuite ou un raccordement est en jeu.";

export const metadata = {
  title: "Projets plomberie — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function PlomberiePage() {
  const projets = getProjetsParCategorie("plomberie");

  return (
    <div className="space-y-6">
      <BanniereCategorie categorie="plomberie" />
      <div>
        <TitreCategorie
          categorie="plomberie"
          texte="Projets plomberie"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          Presque toutes les fiches de cette catégorie comportent un avertissement à lire avant de commencer,
          sans qu&apos;aucune ne soit classée à risque élevé — le principal danger est moins l&apos;intervention
          elle-même que ses conséquences en cas d&apos;oubli. Raccorder un chauffe-eau, un adoucisseur ou un
          arrosage automatique impose une protection contre les retours d&apos;eau vers le réseau public, une
          obligation souvent ignorée en DIY et détaillée dans notre{" "}
          <Link href="/guides/disconnecteur-clapet-anti-retour-obligatoire" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur le clapet anti-retour et le disconnecteur
          </Link>
          .
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
