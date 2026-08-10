"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GrilleProjets } from "@/components/ListeProjets";
import { IconeCoeur } from "@/components/BoutonFavori";
import type { Projet } from "@/lib/types";
import { getFavorisIds, viderFavoris } from "@/lib/favoris";

// Lu uniquement côté client (localStorage) : rien côté serveur, donc l'état initial
// est indéterminé (null) jusqu'à l'hydratation, même approche que HistoriqueProjets.
export default function FavorisProjets({ tousLesProjets }: { tousLesProjets: Projet[] }) {
  const [favoris, setFavoris] = useState<Projet[] | null>(null);

  useEffect(() => {
    const parId = new Map(tousLesProjets.map((projet) => [projet.id, projet]));
    const ids = getFavorisIds();
    setFavoris(
      ids.map((id) => parId.get(id)).filter((projet): projet is Projet => projet !== undefined)
    );
  }, [tousLesProjets]);

  if (favoris === null) return null;

  if (favoris.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 py-10 text-center dark:border-slate-800">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <IconeCoeur plein={false} className="h-6 w-6" />
        </span>
        <p className="max-w-sm text-slate-600 dark:text-slate-400">
          Vous n&apos;avez encore ajouté aucun projet à vos favoris. Cliquez sur le cœur d&apos;une
          fiche projet pour le retrouver ici.{" "}
          <Link href="/projets" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            Parcourir tous les projets
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {favoris.length} projet{favoris.length > 1 ? "s" : ""} en favori{favoris.length > 1 ? "s" : ""}.
        </p>
        <button
          type="button"
          onClick={() => {
            viderFavoris();
            setFavoris([]);
          }}
          className="shrink-0 text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-red-700 hover:decoration-red-400 dark:text-slate-400 dark:decoration-slate-600 dark:hover:text-red-400"
        >
          Vider les favoris
        </button>
      </div>
      <GrilleProjets projets={favoris} afficherCategorie />
    </div>
  );
}
