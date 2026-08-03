"use client";

import { useMemo, useState } from "react";
import type { Categorie, NiveauRisque, Projet } from "@/lib/types";
import { apercuTempsDIYHeures } from "@/lib/apercuCout";
import AccordeonCategorie from "@/components/AccordeonCategorie";
import ListeProjets from "@/components/ListeProjets";

export interface GroupeCategorieProjets {
  categorie: Categorie;
  texte: string;
  projets: Projet[];
}

type FiltreTemps = "court" | "moyen" | "long";

const OPTIONS_RISQUE: { valeur: NiveauRisque | null; label: string }[] = [
  { valeur: null, label: "Tous" },
  { valeur: "faible", label: "Faible" },
  { valeur: "moyen", label: "Moyen" },
  { valeur: "eleve", label: "Élevé" },
];

const OPTIONS_TEMPS: { valeur: FiltreTemps | null; label: string }[] = [
  { valeur: null, label: "Tous" },
  { valeur: "court", label: "< 1 h" },
  { valeur: "moyen", label: "1 h – 3 h" },
  { valeur: "long", label: "> 3 h" },
];

function bucketTemps(heures: number): FiltreTemps {
  if (heures < 1) return "court";
  if (heures <= 3) return "moyen";
  return "long";
}

function BoutonFiltre<T>({
  valeur,
  label,
  actif,
  onClick,
}: {
  valeur: T;
  label: string;
  actif: boolean;
  onClick: (valeur: T) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={actif}
      onClick={() => onClick(valeur)}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        actif
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
      }`}
    >
      {label}
    </button>
  );
}

export default function FiltresProjets({ groupes }: { groupes: GroupeCategorieProjets[] }) {
  const [risque, setRisque] = useState<NiveauRisque | null>(null);
  const [temps, setTemps] = useState<FiltreTemps | null>(null);
  const filtreActif = risque !== null || temps !== null;

  const groupesFiltres = useMemo(() => {
    return groupes.map((groupe) => ({
      ...groupe,
      projets: groupe.projets.filter((projet) => {
        if (risque !== null && projet.niveau_risque !== risque) return false;
        if (temps !== null && bucketTemps(apercuTempsDIYHeures(projet)) !== temps) return false;
        return true;
      }),
    }));
  }, [groupes, risque, temps]);

  const totalFiltre = groupesFiltres.reduce((total, g) => total + g.projets.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div role="group" aria-label="Filtrer par risque" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Risque</span>
          {OPTIONS_RISQUE.map((option) => (
            <BoutonFiltre
              key={option.label}
              valeur={option.valeur}
              label={option.label}
              actif={risque === option.valeur}
              onClick={setRisque}
            />
          ))}
        </div>
        <div role="group" aria-label="Filtrer par temps estimé" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Temps estimé</span>
          {OPTIONS_TEMPS.map((option) => (
            <BoutonFiltre
              key={option.label}
              valeur={option.valeur}
              label={option.label}
              actif={temps === option.valeur}
              onClick={setTemps}
            />
          ))}
        </div>
        {filtreActif && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {totalFiltre} projet{totalFiltre > 1 ? "s" : ""} correspondant{totalFiltre > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {groupesFiltres.map((groupe) => {
          if (filtreActif && groupe.projets.length === 0) return null;
          return (
            <AccordeonCategorie
              key={`${groupe.categorie}-${risque}-${temps}`}
              categorie={groupe.categorie}
              texte={groupe.texte}
              nombre={groupe.projets.length}
              ouvertParDefaut={filtreActif}
            >
              <ListeProjets projets={groupe.projets} titreNiveau={groupe.categorie === "auto" ? "h3" : "h2"} />
            </AccordeonCategorie>
          );
        })}
      </div>
    </div>
  );
}
