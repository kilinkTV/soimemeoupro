"use client";

import { useEffect, useState } from "react";
import { basculerFavori, estFavori } from "@/lib/favoris";

// Cœur classique (deux lobes ronds, pointe nette en bas) — export pour être réutilisé
// tel quel par le lien "Mes projets" du header.
export function IconeCoeur({ plein, className = "h-4 w-4" }: { plein: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={plein ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function BoutonFavori({
  projetId,
  avecLabel = false,
}: {
  projetId: string;
  // Variante compacte (icône seule) pour les cartes projet, ou étendue avec libellé
  // pour la fiche projet.
  avecLabel?: boolean;
}) {
  // null tant que non monté côté client, pour éviter un mismatch serveur/client (le
  // favori dépend du localStorage, absent côté serveur) — même approche que ThemeToggle.
  const [favori, setFavori] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavori(estFavori(projetId));
  }, [projetId]);

  function basculer(e: React.MouseEvent) {
    // Les cartes projet enveloppent ce bouton dans un <Link> : on empêche la
    // navigation et la propagation pour que le clic ne fasse que basculer le favori.
    e.preventDefault();
    e.stopPropagation();
    setFavori(basculerFavori(projetId).includes(projetId));
  }

  const estActif = favori === true;
  const label = estActif ? "Retirer des favoris" : "Ajouter aux favoris";

  if (avecLabel) {
    return (
      <button
        type="button"
        onClick={basculer}
        aria-pressed={estActif}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          estActif
            ? "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
            : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
        }`}
      >
        <IconeCoeur plein={estActif} />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={basculer}
      aria-pressed={estActif}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
        estActif
          ? "border-red-300 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
          : "border-slate-200 bg-white text-slate-400 hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-red-800 dark:hover:text-red-400"
      }`}
    >
      <IconeCoeur plein={estActif} />
    </button>
  );
}
