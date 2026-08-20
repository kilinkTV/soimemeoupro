import Link from "next/link";
import { GROUPES_GLOSSAIRE } from "@/lib/glossaire";

export const metadata = {
  title: "Glossaire — Soi-même ou Pro",
  description:
    "Les termes techniques, légaux et administratifs qui reviennent dans nos fiches projets : norme électrique, garantie décennale, DEEE, autoconsommation... expliqués simplement, sources officielles à l'appui.",
  alternates: { canonical: "/glossaire" },
};

export default function GlossairePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Glossaire</h1>
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Les termes techniques, légaux et administratifs qui reviennent dans nos fiches — expliqués simplement,
          sources officielles ou professionnelles à l&apos;appui.
        </p>
      </div>

      {GROUPES_GLOSSAIRE.map((groupe) => (
        <section key={groupe.titre} className="space-y-3">
          <h2 className="border-b border-slate-200 pb-2 text-xl font-bold tracking-tight text-slate-900 dark:border-slate-800 dark:text-slate-100">
            {groupe.titre}
          </h2>
          {/* <dl> (plutôt qu'une suite de <div>) : un glossaire est justement une liste de
              paires terme/définition, la structure sémantique naturelle pour ce contenu
              (et plus facile à extraire pour un lecteur automatisé). */}
          <dl className="space-y-4">
            {groupe.termes.map((t) => (
              <div
                key={t.id}
                id={t.id}
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <dt className="font-semibold text-slate-900 dark:text-slate-100">{t.terme}</dt>
                <dd className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.definition}</dd>
                <dd className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  {t.sources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      {s.nom}
                    </a>
                  ))}
                  {t.guide && (
                    <Link
                      href={t.guide.href}
                      className="font-medium text-slate-500 underline hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
                    >
                      En savoir plus : {t.guide.label} →
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
