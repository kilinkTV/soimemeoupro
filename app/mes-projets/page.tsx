import HistoriqueProjets from "@/components/HistoriqueProjets";
import { getTousLesProjets } from "@/lib/projets";

export const metadata = {
  title: "Mes projets consultés — Soi-même ou Pro",
  description: "Retrouvez les projets que vous avez récemment consultés sur ce site.",
};

export default function MesProjetsPage() {
  const projets = getTousLesProjets();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Mes projets consultés</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Cet historique est stocké uniquement sur votre appareil (aucun compte, aucun envoi à ce
          site) : il disparaît si vous videz les données de navigation de ce navigateur.
        </p>
      </div>

      <HistoriqueProjets tousLesProjets={projets} />
    </div>
  );
}
