"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProjetIndex } from "@/lib/projets";
import { LABEL_PAR_CATEGORIE } from "@/lib/categories";
import { retirerAccents } from "@/lib/texte";

export default function BarreRecherche({ index }: { index: ProjetIndex[] }) {
  const [requete, setRequete] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const conteneurRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const resultats = useMemo(() => {
    const q = retirerAccents(requete.trim().toLowerCase());
    if (q.length < 2) return [];
    return index
      .filter((p) => retirerAccents(p.nom.toLowerCase()).includes(q))
      .slice(0, 8);
  }, [requete, index]);

  useEffect(() => {
    if (!ouvert) return;

    function fermerSiExterieur(e: MouseEvent) {
      if (conteneurRef.current && !conteneurRef.current.contains(e.target as Node)) {
        setOuvert(false);
      }
    }
    function fermerSiEchap(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }

    document.addEventListener("mousedown", fermerSiExterieur);
    document.addEventListener("keydown", fermerSiEchap);
    return () => {
      document.removeEventListener("mousedown", fermerSiExterieur);
      document.removeEventListener("keydown", fermerSiEchap);
    };
  }, [ouvert]);

  function fermerEtReinitialiser() {
    setOuvert(false);
    setRequete("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (resultats[0]) {
      router.push(`/projets/${resultats[0].id}`);
      fermerEtReinitialiser();
    }
  }

  return (
    <div ref={conteneurRef} className="relative w-full max-w-md">
      <form onSubmit={onSubmit} role="search">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={requete}
            onChange={(e) => {
              setRequete(e.target.value);
              setOuvert(true);
            }}
            onFocus={() => setOuvert(true)}
            placeholder="Rechercher un projet (ex. vidange, terrasse...)"
            aria-label="Rechercher un projet"
            className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
      </form>

      {ouvert && requete.trim().length >= 2 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          {resultats.length > 0 ? (
            resultats.map((projet) => (
              <Link
                key={projet.id}
                href={`/projets/${projet.id}`}
                onClick={fermerEtReinitialiser}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-50"
              >
                <span className="font-medium text-slate-900">{projet.nom}</span>
                <span className="shrink-0 text-xs text-slate-400">
                  {LABEL_PAR_CATEGORIE[projet.categorie]}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-slate-400">Aucun projet trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
