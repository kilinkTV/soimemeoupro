"use client";

import { useEffect, useState } from "react";
import ListeProjets from "@/components/ListeProjets";
import { IconeCoeur } from "@/components/BoutonFavori";
import { ecouterChangementsFavoris, getFavorisIds } from "@/lib/favoris";
import type { Projet } from "@/lib/types";

// Enveloppe ListeProjets d'un bouton "Mes favoris uniquement" sur les pages de
// catégorie. Le bouton ne s'affiche que s'il y a au moins un favori dans la
// catégorie : pas de contrôle inutile pour qui n'utilise pas encore les favoris.
export default function ProjetsCategorie({
  projets,
  grouper,
  titreNiveau,
  prefixeAncre,
}: {
  projets: Projet[];
  grouper?: boolean;
  titreNiveau?: "h2" | "h3";
  prefixeAncre?: string;
}) {
  const [favorisUniquement, setFavorisUniquement] = useState(false);
  // null tant que non monté côté client (dépend du localStorage) — même approche que
  // BoutonFavori/ThemeToggle, pour éviter un mismatch serveur/client.
  const [favorisIds, setFavorisIds] = useState<string[] | null>(null);

  useEffect(() => {
    const rafraichir = () => setFavorisIds(getFavorisIds());
    rafraichir();
    return ecouterChangementsFavoris(rafraichir);
  }, []);

  const idsProjetsCategorie = new Set(projets.map((p) => p.id));
  const nombreFavoris = favorisIds?.filter((id) => idsProjetsCategorie.has(id)).length ?? 0;
  const projetsAffiches =
    favorisUniquement && favorisIds ? projets.filter((p) => favorisIds.includes(p.id)) : projets;

  return (
    <div className="space-y-4">
      {nombreFavoris > 0 && (
        <button
          type="button"
          onClick={() => setFavorisUniquement((v) => !v)}
          aria-pressed={favorisUniquement}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            favorisUniquement
              ? "border-brand-700 bg-brand-700 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
          }`}
        >
          <IconeCoeur plein={favorisUniquement} className="h-3.5 w-3.5" />
          {favorisUniquement ? "Voir tous les projets" : `Mes favoris uniquement (${nombreFavoris})`}
        </button>
      )}

      {favorisUniquement && projetsAffiches.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Aucun favori dans cette catégorie pour l&apos;instant.
        </p>
      ) : (
        <ListeProjets projets={projetsAffiches} grouper={grouper} titreNiveau={titreNiveau} prefixeAncre={prefixeAncre} />
      )}
    </div>
  );
}
