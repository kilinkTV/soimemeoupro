import type { OutilPopulaire } from "@/lib/projets";
import { lienAmazon, lienManoMano } from "@/lib/affiliation";
import LienMarchand from "@/components/LienMarchand";

function formatEuros(valeur: number): string {
  return Math.round(valeur).toLocaleString("fr-FR") + " €";
}

export default function ProduitsPopulaires({ outils }: { outils: OutilPopulaire[] }) {
  if (outils.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {outils.map((outil) => (
        <li
          key={outil.nom}
          className="flex flex-col gap-2 rounded-xl border border-slate-200 border-l-4 border-l-brand-400 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="font-medium text-slate-900 capitalize">{outil.nom}</p>
          <p className="text-xs text-slate-500">
            Utilisé dans {outil.nombreProjets} projet{outil.nombreProjets > 1 ? "s" : ""} — env.{" "}
            {formatEuros(outil.prixMoyen)}
          </p>
          <div className="mt-auto flex gap-3 pt-2">
            <LienMarchand
              marchand="amazon"
              href={lienAmazon(outil.nom)}
              className="text-xs underline text-brand-600 hover:text-brand-800"
            />
            <LienMarchand
              marchand="manomano"
              href={lienManoMano(outil.nom)}
              className="text-xs underline text-brand-600 hover:text-brand-800"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
