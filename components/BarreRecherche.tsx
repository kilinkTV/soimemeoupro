"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ElementRecherche } from "@/lib/projets";
import { LABEL_PAR_CATEGORIE } from "@/lib/categories";
import { retirerAccents } from "@/lib/texte";

const ID_LISTE_RESULTATS = "barre-recherche-resultats";

function hrefElement(element: ElementRecherche): string {
  switch (element.type) {
    case "projet":
      return `/projets/${element.id}`;
    case "guide":
      return `/guides/${element.id}`;
    case "terme":
      return `/glossaire#${element.id}`;
    case "faq":
      return `/faq#${element.id}`;
  }
}

// Libellé du groupe affiché au-dessus des résultats d'un type donné (en-tête de
// section dans la liste déroulante).
function groupeElement(element: ElementRecherche): string {
  switch (element.type) {
    case "projet":
      return LABEL_PAR_CATEGORIE[element.categorie];
    case "guide":
      return "Guides pratiques";
    case "terme":
      return "Glossaire";
    case "faq":
      return "FAQ";
  }
}

function idOption(index: number): string {
  return `barre-recherche-option-${index}`;
}

export default function BarreRecherche({ index }: { index: ElementRecherche[] }) {
  const [requete, setRequete] = useState("");
  const [ouvert, setOuvert] = useState(false);
  // Index du résultat mis en avant au clavier (flèches ↑/↓) — pattern ARIA combobox,
  // pour qu'Entrée valide le résultat visé plutôt que toujours le premier.
  const [surligne, setSurligne] = useState(0);
  const conteneurRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const resultats = useMemo(() => {
    const q = retirerAccents(requete.trim().toLowerCase());
    if (q.length < 2) return [];
    // Cherche dans le nom, la sous-catégorie ("Freinage") et le libellé de catégorie
    // ("Auto & Moto"), pas seulement le nom exact du projet — ex. "frein" doit remonter
    // "Changement de plaquettes de frein" même si le mot n'est pas dans son propre nom.
    return index
      .filter((p) => {
        const champs = [
          p.nom,
          p.type === "projet" ? p.sousCategorie : "",
          p.type === "projet" ? LABEL_PAR_CATEGORIE[p.categorie] : "",
        ];
        return champs.some((champ) => retirerAccents(champ.toLowerCase()).includes(q));
      })
      .slice(0, 8);
  }, [requete, index]);

  useEffect(() => {
    setSurligne(0);
  }, [resultats]);

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
    const cible = resultats[surligne] ?? resultats[0];
    if (cible) {
      router.push(hrefElement(cible));
      fermerEtReinitialiser();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!ouvert || resultats.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSurligne((i) => (i + 1) % resultats.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSurligne((i) => (i - 1 + resultats.length) % resultats.length);
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
            role="combobox"
            aria-expanded={ouvert && resultats.length > 0}
            aria-controls={ID_LISTE_RESULTATS}
            aria-autocomplete="list"
            aria-activedescendant={ouvert && resultats.length > 0 ? idOption(surligne) : undefined}
            value={requete}
            onChange={(e) => {
              setRequete(e.target.value);
              setOuvert(true);
            }}
            onFocus={() => setOuvert(true)}
            onKeyDown={onKeyDown}
            placeholder="Rechercher un projet ou un guide (ex. vidange, assurance...)"
            aria-label="Rechercher un projet ou un guide"
            className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </form>

      {ouvert && requete.trim().length >= 2 && (
        <div
          id={ID_LISTE_RESULTATS}
          role="listbox"
          className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {resultats.length > 0 ? (
            resultats.map((element, i) => {
              const groupe = groupeElement(element);
              // En-tête de groupe affiché uniquement au changement de catégorie/type,
              // pour repérer d'un coup d'œil d'où vient chaque résultat mélangé.
              const elementPrecedent = i > 0 ? resultats[i - 1] : null;
              const groupePrecedent = elementPrecedent === null ? null : groupeElement(elementPrecedent);
              const nouveauGroupe = groupe !== groupePrecedent;
              return (
                <div key={`${element.type}-${element.id}`}>
                  {nouveauGroupe && (
                    <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 first:pt-1">
                      {groupe}
                    </p>
                  )}
                  <Link
                    id={idOption(i)}
                    role="option"
                    aria-selected={i === surligne}
                    href={hrefElement(element)}
                    onClick={fermerEtReinitialiser}
                    onMouseEnter={() => setSurligne(i)}
                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-50 dark:hover:bg-slate-800 ${
                      i === surligne ? "bg-brand-50 dark:bg-slate-800" : ""
                    }`}
                  >
                    <span className="font-medium text-slate-900 dark:text-slate-100">{element.nom}</span>
                    {element.type === "projet" && (
                      <span className="shrink-0 text-xs text-slate-400">{element.sousCategorie}</span>
                    )}
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="px-3 py-2 text-sm text-slate-400">Aucun résultat trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
