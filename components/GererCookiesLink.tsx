"use client";

import { EVENEMENT_OUVRIR_PARAMETRES_COOKIES } from "@/lib/consentement";

// Permet de revenir sur son choix de cookies à tout moment depuis le pied de page,
// sans quoi le consentement donné (ou refusé) à la première visite ne pourrait plus
// être modifié avant l'expiration du cookie — non conforme aux recommandations CNIL.
export default function GererCookiesLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENEMENT_OUVRIR_PARAMETRES_COOKIES))}
      className="bg-transparent p-0 underline hover:text-brand-600 dark:hover:text-brand-400"
    >
      Paramètres de confidentialité
    </button>
  );
}
