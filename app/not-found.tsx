import Link from "next/link";

export const metadata = {
  title: "Page introuvable — Soi-même ou Pro",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
        Erreur 404
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Cette page n&apos;existe pas (ou plus)
      </h1>
      <p className="max-w-md text-slate-600 dark:text-slate-400">
        Le lien est peut-être obsolète, ou l&apos;adresse mal orthographiée. Vous pouvez chercher un
        projet ou un guide dans la barre en haut de page, ou repartir d&apos;ici :
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition-colors hover:bg-brand-700"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/projets"
          className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
        >
          Tous les projets
        </Link>
        <Link
          href="/guides"
          className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
        >
          Guides pratiques
        </Link>
      </div>
    </div>
  );
}
