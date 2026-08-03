import type { OutilPopulaire } from "@/lib/projets";
import { lienAmazon, lienManoMano } from "@/lib/affiliation";
import { formatEuros } from "@/lib/format";
import LienMarchand from "@/components/LienMarchand";

export default function ProduitsPopulaires({ outils }: { outils: OutilPopulaire[] }) {
  if (outils.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {outils.map((outil) => (
        <li
          key={outil.nom}
          className="flex flex-col gap-2 rounded-xl border border-slate-200 border-l-4 border-l-brand-400 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:border-l-brand-500 dark:bg-slate-900"
        >
          <p className="font-medium text-slate-900 capitalize dark:text-slate-100">{outil.nom}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Utilisé dans {outil.nombreProjets} projet{outil.nombreProjets > 1 ? "s" : ""} — env.{" "}
            {formatEuros(outil.prixMoyen)}
          </p>
          <div className="mt-auto flex gap-3 pt-2">
            <LienMarchand
              marchand="amazon"
              href={lienAmazon(outil.nom)}
              className="text-xs underline text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            />
            <LienMarchand
              marchand="manomano"
              href={lienManoMano(outil.nom)}
              className="text-xs underline text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
