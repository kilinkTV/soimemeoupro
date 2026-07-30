"use client";

import { useMemo, useState } from "react";
import type { NiveauCompetence, Projet } from "@/lib/types";
import { calculerComparaison } from "@/lib/calcul";
import ResultatComparatif from "./ResultatComparatif";

const VALEUR_HORAIRE_PAR_DEFAUT = 15;

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
  const [surface, setSurface] = useState(10);
  const [niveau, setNiveau] = useState<NiveauCompetence>("intermediaire");
  const [valeurHoraire, setValeurHoraire] = useState(VALEUR_HORAIRE_PAR_DEFAUT);

  const projet = useMemo(() => projets.find((p) => p.id === projetId), [projets, projetId]);

  const resultat = useMemo(() => {
    if (!projet || surface <= 0) return null;
    return calculerComparaison({ projet, surface, niveau, valeurHoraire });
  }, [projet, surface, niveau, valeurHoraire]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!verrouillerProjet && (
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Type de projet</span>
            <select
              className="mt-1 w-full rounded-md border border-slate-300 p-2"
              value={projetId}
              onChange={(e) => setProjetId(e.target.value)}
            >
              {projets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Surface / quantité ({projet?.nom_unite ?? "unité"})
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

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Valeur de votre temps (€/heure)
          </span>
          <input
            type="number"
            min={0}
            step={1}
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
            value={valeurHoraire}
            onChange={(e) => setValeurHoraire(Number(e.target.value))}
          />
        </label>
      </div>

      {resultat && projet && <ResultatComparatif resultat={resultat} projet={projet} />}
    </div>
  );
}
