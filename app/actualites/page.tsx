import { MDXRemote } from "next-mdx-remote/rsc";
import FilAriane from "@/components/FilAriane";
import { MDX_COMPONENTS } from "@/components/mdx/mdxComponents";
import { LABEL_PAR_CATEGORIE } from "@/lib/categories";
import { getToutesLesActualites, libelleDateEffet } from "@/lib/actualites";

export const metadata = {
  title: "Actualités réglementaires — Soi-même ou Pro",
  description:
    "Les changements de loi, de normes ou d'aides qui touchent le bricolage et l'entretien fait soi-même : brèves sourcées, mises à jour chaque semaine.",
  alternates: { canonical: "/actualites" },
};

export default function ActualitesPage() {
  const actualites = getToutesLesActualites();

  return (
    <div className="space-y-6">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "Actualités réglementaires" }]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Actualités réglementaires</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Les changements de loi, de normes ou d&apos;aides qui touchent le bricolage et l&apos;entretien fait
          soi-même. Chaque brève est sourcée et datée ; mise à jour visée chaque semaine.
        </p>
      </div>

      {actualites.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Aucune actualité pour le moment.</p>
      ) : (
        <ul className="space-y-6">
          {actualites.map((actualite) => (
            <li
              key={actualite.slug}
              id={actualite.slug}
              className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <time dateTime={actualite.frontmatter.dateEffet ?? actualite.frontmatter.date}>
                  {libelleDateEffet(actualite.frontmatter.dateEffet ?? actualite.frontmatter.date)}
                </time>
                {actualite.frontmatter.categories && actualite.frontmatter.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {actualite.frontmatter.categories.map((categorie) => (
                      <span
                        key={categorie}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {LABEL_PAR_CATEGORIE[categorie]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {actualite.frontmatter.title}
              </h2>
              <article className="prose prose-slate prose-sm mt-2 max-w-none dark:prose-invert">
                <MDXRemote source={actualite.content} components={MDX_COMPONENTS} />
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
