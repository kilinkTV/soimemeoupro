import type { CalculResultat, Projet } from "@/lib/types";

function formatEuros(valeur: number): string {
  return Math.round(valeur).toLocaleString("fr-FR") + " €";
}

function formatHeures(valeur: number): string {
  return valeur.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " h";
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
  equilibre: {
    titre: "Les deux options se valent à peu près",
    classe: "bg-slate-50 border-slate-300 text-slate-900",
  },
};

export default function ResultatComparatif({ resultat, projet }: { resultat: CalculResultat; projet: Projet }) {
  const verdict = VERDICT_LABELS[resultat.verdict];

  return (
    <div className="space-y-4">
      <div className={`rounded-lg border p-4 ${verdict.classe}`}>
        <p className="font-semibold text-lg">{verdict.titre}</p>
        <p className="text-sm mt-1">
          Économie estimée en faisant vous-même :{" "}
          <strong>
            {formatEuros(resultat.economie.min)} – {formatEuros(resultat.economie.max)}
          </strong>
        </p>
      </div>

      {resultat.avertissementSecurite && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-900 text-sm">
          <p className="font-semibold mb-1">Point de vigilance réglementaire</p>
          <p>{resultat.avertissementSecurite}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Faire soi-même (DIY)</p>
          <p className="text-xl font-semibold">
            {formatEuros(resultat.coutTotalDIY.min)} – {formatEuros(resultat.coutTotalDIY.max)}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Temps estimé : {formatHeures(resultat.tempsAmateurEstimeHeures)}
          </p>
          <p className="text-sm text-slate-500">
            Risque d&apos;échec nécessitant un pro en rattrapage : {Math.round(resultat.probabiliteEchec * 100)} %
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Faire appel à un artisan</p>
          <p className="text-xl font-semibold">
            {formatEuros(resultat.coutTotalPro.min)} – {formatEuros(resultat.coutTotalPro.max)}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Temps estimé : {formatHeures(resultat.tempsProEstimeHeures)}
          </p>
          <p className="text-sm text-slate-500">
            Temps supplémentaire si DIY : {formatHeures(resultat.tempsPerduSupplementaireHeures)}
          </p>
        </div>
      </div>

      {projet.outils_necessaires.length > 0 && (
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">Matériel nécessaire</p>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            {projet.outils_necessaires.map((outil) => (
              <li key={outil}>{outil}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
