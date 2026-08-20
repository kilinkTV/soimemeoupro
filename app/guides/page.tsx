import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import { getTousLesGuides } from "@/lib/guides";
import { LABEL_PAR_CATEGORIE } from "@/lib/categories";
import { VISUEL_PAR_CATEGORIE } from "@/components/icones/IconesCategories";

export const metadata = {
  title: "Guides pratiques — Soi-même ou Pro",
  description:
    "Assurance, statut juridique, obligations légales : des dossiers de fond pour bricoler en connaissance de cause, au-delà du coût d'un projet précis.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const guides = getTousLesGuides();

  return (
    <div className="space-y-6">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "Guides pratiques" }]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Guides pratiques</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Assurance, statut juridique, obligations légales : des dossiers de fond pour bricoler en
          connaissance de cause, au-delà du coût d&apos;un projet précis.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-slate-900 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
                  {guide.frontmatter.title}
                </p>
                {guide.frontmatter.categories && guide.frontmatter.categories.length > 0 && (
                  <div className="flex shrink-0 flex-wrap justify-end gap-1">
                    {guide.frontmatter.categories.map((categorie) => {
                      const visuel = VISUEL_PAR_CATEGORIE[categorie];
                      const Icone = visuel.icone;
                      return (
                        <span
                          key={categorie}
                          className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${visuel.classesFond} ${visuel.classesIcone}`}
                        >
                          <Icone className="h-3 w-3 shrink-0" />
                          {LABEL_PAR_CATEGORIE[categorie]}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{guide.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

