"use client";

import { useEffect } from "react";
import { enregistrerVisiteProjet } from "@/lib/recents";

// Composant invisible : enregistre la visite d'une fiche projet en localStorage pour
// la section "Vos projets récents" de la home (voir components/ProjetsRecents.tsx).
export default function EnregistrerVisite({ projetId }: { projetId: string }) {
  useEffect(() => {
    enregistrerVisiteProjet(projetId);
  }, [projetId]);

  return null;
}
