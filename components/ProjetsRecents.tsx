"use client";

import { useEffect, useState } from "react";
import { GrilleProjets } from "@/components/ListeProjets";
import type { Projet } from "@/lib/types";
import { getProjetsRecentsIds } from "@/lib/recents";

// Lu uniquement côté client (localStorage) : rien côté serveur, donc rien à
// l'affichage initial pour un premier visiteur, la section apparaît après hydratation
// si l'historique n'est pas vide. Pas de compte utilisateur nécessaire.
export default function ProjetsRecents({ tousLesProjets }: { tousLesProjets: Projet[] }) {
  const [projetsRecents, setProjetsRecents] = useState<Projet[] | null>(null);

  useEffect(() => {
    const parId = new Map(tousLesProjets.map((projet) => [projet.id, projet]));
    const ids = getProjetsRecentsIds();
    setProjetsRecents(
      ids.map((id) => parId.get(id)).filter((projet): projet is Projet => projet !== undefined)
    );
  }, [tousLesProjets]);

  if (!projetsRecents || projetsRecents.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Vos projets récents</h2>
      <GrilleProjets projets={projetsRecents} afficherCategorie />
    </section>
  );
}
