import type { NiveauRisque } from "./types";

export const RISQUE_LABELS: Record<NiveauRisque, { label: string; classe: string }> = {
  faible: {
    label: "Risque faible",
    classe: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-400 dark:border-green-800",
  },
  moyen: {
    label: "Risque moyen",
    classe: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800",
  },
  eleve: {
    label: "Risque élevé",
    classe: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800",
  },
};
