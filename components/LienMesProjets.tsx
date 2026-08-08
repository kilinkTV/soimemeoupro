"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ecouterChangementsFavoris, getFavorisIds } from "@/lib/favoris";
import { IconeCoeur } from "@/components/BoutonFavori";

// Accès permanent à "Mes projets" depuis toute page (le lien existait déjà en pied de
// page, mais noyé parmi les pages légales) : icône dans le header, avec le nombre de
// favoris en badge pour donner un vrai repère visuel, pas juste un raccourci muet.
export default function LienMesProjets() {
  const [nombreFavoris, setNombreFavoris] = useState<number | null>(null);

  useEffect(() => {
    const rafraichir = () => setNombreFavoris(getFavorisIds().length);
    rafraichir();
    return ecouterChangementsFavoris(rafraichir);
  }, []);

  return (
    <Link
      href="/mes-projets"
      aria-label="Mes projets"
      title="Mes projets"
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
    >
      <IconeCoeur plein={false} />
      {!!nombreFavoris && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-700 px-1 text-[10px] font-semibold text-white">
          {nombreFavoris}
        </span>
      )}
    </Link>
  );
}
