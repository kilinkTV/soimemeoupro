"use client";

import { useEffect, useState } from "react";
import type { SectionMdx } from "@/lib/tableDesMatieres";

const DECALAGE_PAR_DEFAUT = 96;

// Sommaire d'un article/guide long : reste visible au scroll (sticky, juste sous le
// header dont la hauteur varie selon la largeur d'écran — mesurée via ResizeObserver
// plutôt que codée en dur) et met en avant la section actuellement lue grâce à un
// IntersectionObserver sur les titres ## correspondants.
export default function SommaireArticle({ sections }: { sections: SectionMdx[] }) {
  const [actif, setActif] = useState<string | null>(null);
  const [decalageHaut, setDecalageHaut] = useState(DECALAGE_PAR_DEFAUT);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const majDecalage = () => setDecalageHaut(header.getBoundingClientRect().height + 8);
    majDecalage();
    const observer = new ResizeObserver(majDecalage);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sections.length < 2) return;
    const elements = sections
      .map((section) => document.getElementById(section.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActif(visible.target.id);
      },
      { rootMargin: `-${decalageHaut + 32}px 0px -70% 0px` }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, decalageHaut]);

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Sommaire de l'article"
      className="sticky z-10 -mx-1 flex flex-wrap gap-2 bg-slate-50/95 px-1 py-2 backdrop-blur-sm dark:bg-slate-950/95"
      style={{ top: decalageHaut }}
    >
      {sections.map((section) => {
        const estActif = section.slug === actif;
        return (
          <a
            key={section.slug}
            href={`#${section.slug}`}
            className={
              estActif
                ? "rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition-colors dark:border-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
                : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
            }
          >
            {section.titre}
          </a>
        );
      })}
    </nav>
  );
}
