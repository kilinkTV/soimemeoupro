"use client";

import { useMemo, useState } from "react";
import type { NiveauCompetence, Projet } from "@/lib/types";
import { calculerComparaison } from "@/lib/calcul";
import ResultatComparatif from "./ResultatComparatif";

// SMIC horaire net (référence objective, revalorisé au 1er juin 2026)
const VALEUR_HORAIRE_PAR_DEFAUT = 9.74;

type ModeTemps = "plaisir" | "travail";

const UNITES_SURFACIQUES = ["m2", "ml"];

function quantiteParDefaut(projet: Projet | undefined): number {
  return projet && UNITES_SURFACIQUES.includes(projet.unite) ? 10 : 1;
}

export default function Calculateur({
  projets,
  projetInitialId,
  verrouillerProjet = false,
}: {
  projets: Projet[];
  projetInitialId?: string;
  verrouillerProjet?: boolean;
}) {
  const [projetId, setProjetId] = useState(projetInitialId ?? projets[0]?.id ?? "");
  const projetsParCategorie: Record<string, Projet[]> = {
    maison: projets.filter((p) => p.categorie === "maison"),
    auto: projets.filter((p) => p.categorie === "auto"),
    jardin: projets.filter((p) => p.categorie === "jardin"),
  };
  const LABEL_CATEGORIE: Record<string, string> = { maison: "Maison", auto: "Auto", jardin: "Jardin" };
  const [surface, setSurface] = useState(() =>
    quantiteParDefaut(projets.find((p) => p.id === (projetInitialId ?? projets[0]?.id)))
  );
  const [niveau, setNiveau] = useState<NiveauCompetence>("intermediaire");
  const [modeTemps, setModeTemps] = useState<ModeTemps>("travail");
  const [valeurHoraire, setValeurHoraire] = useState(VALEUR_HORAIRE_PAR_DEFAUT);

  const valeurHoraireEffective = modeTemps === "plaisir" ? 0 : valeurHoraire;

  const projet = useMemo(() => projets.find((p) => p.id === projetId), [projets, projetId]);

  const resultat = useMemo(() => {
    if (!projet || surface <= 0) return null;
    return calculerComparaison({ projet, surface, niveau, valeurHoraire: valeurHoraireEffective });
  }, [projet, surface, niveau, valeurHoraireEffective]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!verrouillerProjet && (
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Type de projet</span>
            <select
              className="mt-1 w-full rounded-md border border-slate-300 p-2"
              value={projetId}
              onChange={(e) => {
                const nouvelId = e.target.value;
                setProjetId(nouvelId);
                setSurface(quantiteParDefaut(projets.find((p) => p.id === nouvelId)));
              }}
            >
              {Object.entries(projetsParCategorie).map(
                ([categorie, projetsCategorie]) =>
                  projetsCategorie.length > 0 && (
                    <optgroup key={categorie} label={LABEL_CATEGORIE[categorie]}>
                      {projetsCategorie.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nom}
                        </option>
                      ))}
                    </optgroup>
                  )
              )}
            </select>
          </label>
        )}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Quantité ({projet?.nom_unite ?? "unité"})
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Votre niveau</span>
          <select
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value as NiveauCompetence)}
          >
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="experimente">Expérimenté</option>
          </select>
        </label>

        <div className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Votre temps, vous le prenez où ?</span>
          <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModeTemps("plaisir")}
              className={`rounded-md border p-2 text-sm text-left ${
                modeTemps === "plaisir"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Sur mon temps libre, par plaisir
            </button>
            <button
              type="button"
              onClick={() => setModeTemps("travail")}
              className={`rounded-md border p-2 text-sm text-left ${
                modeTemps === "travail"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Sur mes heures de travail
            </button>
          </div>

          {modeTemps === "travail" && (
            <label className="block mt-2">
              <span className="text-sm text-slate-600">Valeur de votre temps (€/heure)</span>
              <input
                type="number"
                min={0}
                step={1}
                className="mt-1 w-full rounded-md border border-slate-300 p-2"
                value={valeurHoraire}
                onChange={(e) => setValeurHoraire(Number(e.target.value))}
              />
            </label>
          )}
        </div>
      </div>

      {resultat && projet && <ResultatComparatif resultat={resultat} projet={projet} />}
    </div>
  );
}
