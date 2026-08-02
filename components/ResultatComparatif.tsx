import type { CalculResultat, Fourchette, Projet } from "@/lib/types";
import { lienAmazon, lienManoMano } from "@/lib/affiliation";
import LienMarchand from "@/components/LienMarchand";
import TrouverArtisan from "@/components/TrouverArtisan";

function formatEuros(valeur: number): string {
  return Math.round(valeur).toLocaleString("fr-FR") + " €";
}

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
    classe: "bg-green-50 border-green-300 text-green-900",
  },
  "pro-recommande": {
    titre: "Le pro est probablement plus rentable",
    classe: "bg-amber-50 border-amber-300 text-amber-900",
  },
};

export default function ResultatComparatif({
  resultat,
  projet,
  materielDejaPossede,
  onToggleMaterielPossede,
}: {
  resultat: CalculResultat;
  projet: Projet;
  materielDejaPossede: Set<string>;
  onToggleMaterielPossede: (nom: string) => void;
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

      {resultat.avertissementSecurite && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-red-900 text-sm">
          <p className="font-semibold mb-1">Point de vigilance réglementaire</p>
          <p>{resultat.avertissementSecurite}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Faire soi-même (DIY)</p>
          <p className="text-2xl font-bold text-slate-900">≈ {formatEuros(milieu(resultat.coutTotalDIY))}</p>
          <p className="text-xs text-slate-400">{formatFourchette(resultat.coutTotalDIY)} selon les devis</p>

          <ul className="mt-3 space-y-0.5 text-xs text-slate-500">
            <li>
              Matériel à acheter : {formatFourchette(resultat.coutMaterielAAcheter)}
              {toutDejaPossede && " (tout déjà possédé)"}
            </li>
            {resultat.coutMainOeuvre > 0 && <li>Votre temps valorisé : {formatEuros(resultat.coutMainOeuvre)}</li>}
          </ul>

          <p className="text-sm text-slate-500 mt-3">
            Temps estimé : {formatHeures(resultat.tempsAmateurEstimeHeures)}
          </p>
          <p className="text-sm text-slate-500">
            Risque d&apos;échec nécessitant un pro en rattrapage : {Math.round(resultat.probabiliteEchec * 100)} %
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Faire appel à un artisan</p>
          <p className="text-2xl font-bold text-slate-900">≈ {formatEuros(milieu(resultat.coutTotalPro))}</p>
          <p className="text-xs text-slate-400">{formatFourchette(resultat.coutTotalPro)} selon les devis</p>

          <p className="text-sm text-slate-500 mt-3">
            Temps estimé : {formatHeures(resultat.tempsProEstimeHeures)}
          </p>
          <p className="text-sm text-slate-500">
            Temps supplémentaire si DIY : {formatHeures(resultat.tempsPerduSupplementaireHeures)}
          </p>

          <TrouverArtisan categorie={projet.categorie} />
        </div>
      </div>

      {resultat.materielDetail.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 mb-2">Matériel nécessaire</p>
          <p className="text-xs text-slate-400 mb-3">
            Décochez ce que vous possédez déjà (outils réutilisables ou matériaux en stock) : le
            coût DIY se met à jour en conséquence, et peut descendre à 0 € si vous avez déjà tout.
          </p>
          <ul className="text-sm text-slate-600 space-y-2">
            {resultat.materielDetail.map((item) => {
              const dejaPossede = materielDejaPossede.has(item.nom);
              return (
                <li key={item.nom} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 accent-brand-600"
                      checked={!dejaPossede}
                      onChange={() => onToggleMaterielPossede(item.nom)}
                      aria-label={`À acheter : ${item.nom}`}
                    />
                    <span className={dejaPossede ? "line-through text-slate-400" : ""}>
                      {item.nom}
                      <span className="text-slate-400"> — env. {formatFourchette({ min: item.coutMin, max: item.coutMax })}</span>
                    </span>
                  </span>
                  <span className="flex gap-3 shrink-0">
                    <LienMarchand
                      marchand="amazon"
                      href={lienAmazon(item.nom)}
                      className="text-xs underline text-slate-500 hover:text-slate-800"
                    />
                    <LienMarchand
                      marchand="manomano"
                      href={lienManoMano(item.nom)}
                      className="text-xs underline text-slate-500 hover:text-slate-800"
                    />
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-sm font-medium text-slate-700 mt-3 pt-3 border-t border-slate-200">
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
          <p className="text-xs text-slate-400 mt-3">
            Liens affiliés (dont Amazon Partenaires) : ils peuvent nous rémunérer sans coût
            supplémentaire pour vous.
          </p>
        </div>
      )}
    </div>
  );
}
