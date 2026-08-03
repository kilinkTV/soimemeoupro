import Link from "next/link";
import { getGuidesParProjet } from "@/lib/guides";
import type { Categorie } from "@/lib/types";

const NOMBRE_MAX = 2;

// Met en avant, sur une fiche projet, le ou les guides pratiques évergreen les plus
// pertinents pour sa catégorie/sous-catégorie (ex. le guide sécurité piscine sur un
// projet de la catégorie piscine).
export default function GuideLie({ categorie, sousCategorie }: { categorie: Categorie; sousCategorie: string }) {
  const guides = getGuidesParProjet(categorie, sousCategorie).slice(0, NOMBRE_MAX);
  if (guides.length === 0) return null;

  return (
    <div className={guides.length > 1 ? "grid gap-3 sm:grid-cols-2" : undefined}>
      {guides.map((guide) => (
        <Link
          key={guide.slug}
          href={`/guides/${guide.slug}`}
          className="block rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm shadow-sm transition-colors hover:border-brand-300 dark:border-brand-800 dark:bg-brand-900/10 dark:hover:border-brand-700"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
            Guide pratique
          </p>
          <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{guide.frontmatter.title}</p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">{guide.frontmatter.description}</p>
        </Link>
      ))}
    </div>
  );
}
