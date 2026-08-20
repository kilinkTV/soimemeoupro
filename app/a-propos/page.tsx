import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import { VISUEL_PAR_CATEGORIE } from "@/components/icones/IconesCategories";
import { getTousLesGuides } from "@/lib/guides";
import { getTousLesProjets } from "@/lib/projets";

export const metadata = {
  title: "À propos — Soi-même ou Pro",
  description:
    "Pourquoi ce comparateur existe, comment il est construit, et comment il se finance.",
  alternates: { canonical: "/a-propos" },
};

const STATS = [
  { valeur: (n: { projets: number; categories: number; guides: number }) => n.projets, label: "projets chiffrés" },
  { valeur: (n: { projets: number; categories: number; guides: number }) => n.categories, label: "catégories" },
  { valeur: (n: { projets: number; categories: number; guides: number }) => n.guides, label: "guides pratiques" },
];

export default function AProposPage() {
  const nombres = {
    projets: getTousLesProjets().length,
    categories: Object.keys(VISUEL_PAR_CATEGORIE).length,
    guides: getTousLesGuides().length,
  };

  return (
    <div className="space-y-8">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">À propos</h1>
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Pourquoi ce site existe, et comment il est construit.
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white py-5 text-center shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-400 sm:text-3xl">{stat.valeur(nombres)}</p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pourquoi ce comparateur</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Avant de se lancer dans un projet — changer une pompe de piscine, poser une terrasse,
          réviser un vélo — la question est toujours la même : le faire soi-même, ou payer un
          professionnel ? La réponse dépend de trois choses rarement chiffrées ensemble au même
          endroit : le coût réel (matériel + temps, si on le valorise), le temps que ça prend
          vraiment pour un amateur (pas pour un pro qui le fait tous les jours), et le risque de
          devoir de toute façon payer un professionnel en rattrapage si ça tourne mal.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Soi-même ou Pro rassemble ces trois éléments projet par projet, pour donner une réponse
          chiffrée plutôt qu&apos;une intuition.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Comment les chiffres sont construits</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Chaque fiche est calibrée à partir de taux horaires artisans réellement constatés en
          France, recoupés par métier, et d&apos;estimations de temps et de matériel propres à
          chaque projet. Ce ne sont pas des devis réels ni une base de prix officielle : le détail
          complet, sources à l&apos;appui, est sur la page{" "}
          <Link href="/methodologie" className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            Méthodologie et sources
          </Link>
          . Pour tout ce qui touche à des obligations légales ou des normes (sécurité piscine,
          électricité...), le site s&apos;appuie sur les textes officiels, cités et liés
          directement dans les guides concernés.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Comment le site se finance</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          L&apos;accès au comparateur est gratuit et sans compte à créer. Le site se finance par des
          liens d&apos;affiliation (Amazon Partenaires, ManoMano notamment) vers le matériel
          mentionné dans les fiches, et par de la publicité une fois activée : voir le détail sur
          la page{" "}
          <Link href="/mentions-legales" className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            mentions légales
          </Link>
          . Ces liens ne changent ni le classement ni le contenu des fiches — le verdict DIY ou
          pro reste basé uniquement sur le calcul.
        </p>
      </section>
    </div>
  );
}
