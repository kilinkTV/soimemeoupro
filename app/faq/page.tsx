import FaqSchema from "@/components/FaqSchema";
import TexteAvecLiens from "@/components/TexteAvecLiens";
import { GROUPES_FAQ, texteBrutSansLiens } from "@/lib/faqGenerale";

export const metadata = {
  title: "FAQ — Soi-même ou Pro",
  description:
    "Les questions qui reviennent le plus souvent, avant même de choisir un projet : comment sont calculés les prix, ce que vous avez le droit de faire vous-même, assurance, et que faire de l'ancien matériel.",
};

export default function FaqPage() {
  const faqSchemaItems = GROUPES_FAQ.flatMap((g) =>
    g.questions.map((q) => ({ question: q.question, reponse: texteBrutSansLiens(q.reponse) }))
  );

  return (
    <div className="space-y-8">
      <FaqSchema items={faqSchemaItems} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Questions fréquentes
        </h1>
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Les questions qui reviennent le plus souvent, avant même de choisir un projet précis.
        </p>
      </div>

      <nav aria-label="Sommaire de la FAQ" className="flex flex-wrap gap-2 text-sm">
        {GROUPES_FAQ.flatMap((g) => g.questions).map((q) => (
          <a
            key={q.id}
            href={`#${q.id}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-brand-400"
          >
            {q.question}
          </a>
        ))}
      </nav>

      {GROUPES_FAQ.map((groupe) => (
        <section key={groupe.titre} className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{groupe.titre}</h2>
          <div className="space-y-4">
            {groupe.questions.map((q) => (
              <div
                key={q.id}
                id={q.id}
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{q.question}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  <TexteAvecLiens texte={q.reponse} />
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
