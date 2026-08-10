"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GrilleProjets } from "@/components/ListeProjets";
import type { Projet } from "@/lib/types";
import { getProjetsRecentsIds, viderProjetsRecents } from "@/lib/recents";

// Lu uniquement côté client (localStorage) : rien côté serveur, donc l'état initial
// est indéterminé (null) jusqu'à l'hydratation, pour éviter d'afficher à tort l'état
// vide avant d'avoir pu lire le stockage.
export default function HistoriqueProjets({ tousLesProjets }: { tousLesProjets: Projet[] }) {
  const [projetsRecents, setProjetsRecents] = useState<Projet[] | null>(null);

  useEffect(() => {
    const parId = new Map(tousLesProjets.map((projet) => [projet.id, projet]));
    const ids = getProjetsRecentsIds();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProjetsRecents(
      ids.map((id) => parId.get(id)).filter((projet): projet is Projet => projet !== undefined)
    );
  }, [tousLesProjets]);

  if (projetsRecents === null) return null;

  if (projetsRecents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 py-10 text-center dark:border-slate-800">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3.5 2" />
          </svg>
        </span>
        <p className="max-w-sm text-slate-600 dark:text-slate-400">
          Vous n&apos;avez encore consulté aucun projet.{" "}
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
          {projetsRecents.length} projet{projetsRecents.length > 1 ? "s" : ""} consulté
          {projetsRecents.length > 1 ? "s" : ""} récemment, le plus récent en premier.
        </p>
        <button
          type="button"
          onClick={() => {
            viderProjetsRecents();
            setProjetsRecents([]);
          }}
          className="shrink-0 text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-red-700 hover:decoration-red-400 dark:text-slate-400 dark:decoration-slate-600 dark:hover:text-red-400"
        >
          Vider l&apos;historique
        </button>
      </div>
      <GrilleProjets projets={projetsRecents} afficherCategorie />
    </div>
  );
}
