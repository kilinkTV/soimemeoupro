import FavorisProjets from "@/components/FavorisProjets";
import FilAriane from "@/components/FilAriane";
import HistoriqueProjets from "@/components/HistoriqueProjets";
import { getTousLesProjets } from "@/lib/projets";

export const metadata = {
  title: "Mes projets — Soi-même ou Pro",
  description: "Retrouvez vos projets favoris et les projets récemment consultés sur ce site.",
  alternates: { canonical: "/mes-projets" },
};

export default function MesProjetsPage() {
  const projets = getTousLesProjets();

  return (
    <div className="space-y-10">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "Mes projets" }]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Mes projets</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Favoris et historique sont stockés uniquement sur votre appareil (aucun compte, aucun
          envoi à ce site) : ils disparaissent si vous videz les données de navigation de ce
          navigateur.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Mes favoris</h2>
        <FavorisProjets tousLesProjets={projets} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Projets consultés récemment</h2>
        <HistoriqueProjets tousLesProjets={projets} />
      </section>
    </div>
  );
}
