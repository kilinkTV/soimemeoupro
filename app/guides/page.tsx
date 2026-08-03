import Link from "next/link";
import { getTousLesGuides } from "@/lib/guides";

export const metadata = {
  title: "Guides pratiques — Soi-même ou Pro",
  description:
    "Assurance, statut juridique, obligations légales : des dossiers de fond pour bricoler en connaissance de cause, au-delà du coût d'un projet précis.",
};

export default function GuidesPage() {
  const guides = getTousLesGuides();

  return (
    <div className="space-y-6">
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
              <p className="font-medium text-slate-900 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
                {guide.frontmatter.title}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{guide.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

