import Link from "next/link";
import type { CalculResultat, Fourchette, Projet } from "@/lib/types";
import { lienAmazon, lienManoMano, marchandsCategoriels } from "@/lib/affiliation";
import { cleGroupementOutil, type UsageOutil } from "@/lib/outils";
import { formatEuros } from "@/lib/format";
import LienMarchand from "@/components/LienMarchand";
import TrouverArtisan from "@/components/TrouverArtisan";

function formatFourchette(f: { min: number; max: number }): string {
  if (Math.round(f.min) === Math.round(f.max)) return formatEuros(f.min);
  return `${formatEuros(f.min)} – ${formatEuros(f.max)}`;
}

function milieu(f: { min: number; max: number }): number {
  return (f.min + f.max) / 2;
}

function formatHeures(valeur: number): string {
  const totalMinutes = Math.round((valeur * 60) / 5) * 5;
  if (totalMinutes <= 0) return valeur > 0 ? "< 5 min" : "0 min";
  const heures = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (heures === 0) return `${minutes} min`;
  if (minutes === 0) return `${heures} h`;
  return `${heures} h ${minutes.toString().padStart(2, "0")}`;
}

// Durée réaliste d'une session de bricolage amateur, pauses comprises (pas 8 h à la
// chaîne) : sert uniquement à donner un repère "combien de journées/week-ends" pour les
// gros projets, en plus du décompte précis en heures ci-dessus.
const HEURES_PAR_JOUR_BRICOLAGE = 6;
const SEUIL_AFFICHAGE_JOURS = 6;

function formatDureeEnJours(heuresTotal: number): string | null {
  if (heuresTotal < SEUIL_AFFICHAGE_JOURS) return null;
  const jours = Math.round((heuresTotal / HEURES_PAR_JOUR_BRICOLAGE) * 2) / 2;
  const texteJours = jours === 1 ? "1 jour" : `${jours} jours`;
  if (jours <= 2) return `≈ ${texteJours} de bricolage`;
  const weekEnds = Math.ceil(jours / 2);
  return `≈ ${texteJours} de bricolage, à étaler sur ${weekEnds} week-ends par exemple`;
}

function texteEconomie(economie: Fourchette): { intro: string; montant: string; fourchette: string } {
  const mid = milieu(economie);
  const bornesAbs = [Math.abs(economie.min), Math.abs(economie.max)].sort((a, b) => a - b);
  const fourchetteAbs = formatFourchette({ min: bornesAbs[0], max: bornesAbs[1] });
  if (mid >= 0) {
    return {
      intro: "Économie estimée en faisant vous-même :",
      montant: formatEuros(mid),
      fourchette: fourchetteAbs,
    };
  }
  return {
    intro: "Le pro vous ferait économiser environ :",
    montant: formatEuros(Math.abs(mid)),
    fourchette: fourchetteAbs,
  };
}

const VERDICT_LABELS: Record<CalculResultat["verdict"], { titre: string; classe: string }> = {
  "diy-recommande": {
    titre: "DIY recommandé",
    classe: "bg-green-50 border-green-300 text-green-900 dark:bg-green-950/50 dark:border-green-800 dark:text-green-100",
  },
  "pro-recommande": {
    titre: "Le pro est probablement plus rentable",
    classe: "bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-100",
  },
};

export default function ResultatComparatif({
  resultat,
  projet,
  materielDejaPossede,
  onToggleMaterielPossede,
  usageOutils,
}: {
  resultat: CalculResultat;
  projet: Projet;
  materielDejaPossede: Set<string>;
  onToggleMaterielPossede: (nom: string) => void;
  usageOutils: Map<string, UsageOutil>;
}) {
  const verdict = VERDICT_LABELS[resultat.verdict];
  const economie = texteEconomie(resultat.economie);
  const toutDejaPossede = milieu(resultat.coutMaterielAAcheter) === 0;

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border p-4 shadow-sm ${verdict.classe}`}>
        <p className="font-semibold text-lg">{verdict.titre}</p>
        <p className="text-sm mt-1">
          {economie.intro} <strong>≈ {economie.montant}</strong>{" "}
          <span className="opacity-70">({economie.fourchette} selon les devis)</span>
        </p>
      </div>

      <Link
        href="/methodologie"
        className="no-print inline-block text-xs text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-brand-700 hover:decoration-brand-400 dark:text-slate-400 dark:decoration-slate-600 dark:hover:text-brand-400"
      >
        D&apos;où viennent ces chiffres ?
      </Link>

      {resultat.avertissementSecurite && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-red-900 text-sm dark:border-red-800 dark:bg-red-950/50 dark:text-red-100">
          <p className="font-semibold mb-1">Point de vigilance réglementaire</p>
          <p>{resultat.avertissementSecurite}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Faire soi-même (DIY)</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">≈ {formatEuros(milieu(resultat.coutTotalDIY))}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{formatFourchette(resultat.coutTotalDIY)} selon les devis</p>

          <ul className="mt-3 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
            <li>
              Matériel à acheter : {formatFourchette(resultat.coutMaterielAAcheter)}
              {toutDejaPossede && " (tout déjà possédé)"}
            </li>
            {resultat.coutMainOeuvre > 0 && <li>Votre temps valorisé : {formatEuros(resultat.coutMainOeuvre)}</li>}
          </ul>

          <p className="text-sm text-slate-500 mt-3 dark:text-slate-400">
            Temps estimé : {formatHeures(resultat.tempsAmateurEstimeHeures)}
          </p>
          {formatDureeEnJours(resultat.tempsAmateurEstimeHeures) && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {formatDureeEnJours(resultat.tempsAmateurEstimeHeures)}
            </p>
          )}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Risque d&apos;échec nécessitant un pro en rattrapage : {Math.round(resultat.probabiliteEchec * 100)} %
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Faire appel à un artisan</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">≈ {formatEuros(milieu(resultat.coutTotalPro))}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{formatFourchette(resultat.coutTotalPro)} selon les devis</p>

          <p className="text-sm text-slate-500 mt-3 dark:text-slate-400">
            Temps estimé : {formatHeures(resultat.tempsProEstimeHeures)}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Temps supplémentaire si DIY : {formatHeures(resultat.tempsPerduSupplementaireHeures)}
          </p>

          <div className="no-print">
            <TrouverArtisan categorie={projet.categorie} sousCategorie={projet.sous_categorie} />
          </div>
        </div>
      </div>

      {resultat.materielDetail.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-700 mb-2 dark:text-slate-300">Matériel nécessaire</p>
          <p className="text-xs text-slate-400 mb-3 dark:text-slate-500">
            Décochez ce que vous possédez déjà (outils réutilisables ou matériaux en stock) : le
            coût DIY se met à jour en conséquence, et peut descendre à 0 € si vous avez déjà tout.
          </p>
          <ul className="text-sm text-slate-600 space-y-2 dark:text-slate-400">
            {resultat.materielDetail.map((item) => {
              const dejaPossede = materielDejaPossede.has(item.nom);
              // Un outil réutilisé ailleurs sur le site amortit mieux son achat qu'un
              // outil à usage unique : on ne l'affiche que pour les vrais outils
              // réutilisables (pas les matériaux/consommables), et seulement s'il sert
              // à au moins un autre projet que celui-ci.
              const nombreAutresProjets =
                item.type === "outil" ? (usageOutils.get(cleGroupementOutil(item.nom))?.occurrences ?? 1) - 1 : 0;
              const specialises = marchandsCategoriels(projet.categorie, item.nom);
              return (
                <li key={item.nom} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="flex flex-wrap items-center gap-2">
                    {/* Toute la ligne (pas juste la case de 16px) est cliquable via ce
                        <label> : zone de contact bien plus confortable au tactile. */}
                    <label className="flex cursor-pointer items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 accent-brand-600 dark:border-slate-600"
                        checked={!dejaPossede}
                        onChange={() => onToggleMaterielPossede(item.nom)}
                      />
                      <span className={dejaPossede ? "line-through text-slate-400 dark:text-slate-500" : ""}>
                        {item.nom}
                        <span className="text-slate-400 dark:text-slate-500"> — env. {formatFourchette({ min: item.coutMin, max: item.coutMax })}</span>
                      </span>
                    </label>
                    {nombreAutresProjets > 0 && (
                      <span className="whitespace-nowrap rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-400">
                        Sert aussi pour {nombreAutresProjets} autre{nombreAutresProjets > 1 ? "s" : ""} projet
                        {nombreAutresProjets > 1 ? "s" : ""}
                      </span>
                    )}
                  </span>
                  <span className="no-print flex flex-wrap gap-2">
                    <LienMarchand
                      marchand="amazon"
                      href={lienAmazon(item.nom)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
                    />
                    <LienMarchand
                      marchand="manomano"
                      href={lienManoMano(item.nom)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
                    />
                    {specialises.map((specialise) => (
                      <LienMarchand
                        key={specialise.marchand}
                        marchand={specialise.marchand}
                        href={specialise.href}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
                      />
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-sm font-medium text-slate-700 mt-3 pt-3 border-t border-slate-200 dark:text-slate-300 dark:border-slate-800">
            {toutDejaPossede ? (
              "Tout est déjà coché comme possédé : 0 € à acheter."
            ) : (
              <>
                Total à acheter (décochez ce que vous possédez déjà) :{" "}
                <strong>{formatFourchette(resultat.coutMaterielAAcheter)}</strong>, déjà inclus dans
                le coût DIY ci-dessus.
              </>
            )}
          </p>
          <p className="no-print text-xs text-slate-400 mt-3 dark:text-slate-500">
            Liens affiliés (dont Amazon Partenaires) : ils peuvent nous rémunérer sans coût
            supplémentaire pour vous.
          </p>
        </div>
      )}
    </div>
  );
}
