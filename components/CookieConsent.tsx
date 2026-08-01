"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lireConsentement, ecrireConsentement, type ChoixConsentement } from "@/lib/consentement";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Le cookie n'existe que côté navigateur : lu après le premier rendu pour éviter
    // tout écart entre le HTML généré côté serveur et l'hydratation côté client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(lireConsentement() === null);
  }, []);

  function repondre(valeur: ChoixConsentement) {
    ecrireConsentement(valeur);
    setVisible(false);
    // Recharge pour que les scripts concernés (AdSense) tiennent compte du choix.
    window.location.reload();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Ce site utilise des cookies non essentiels une fois la publicité activée (Google AdSense), ainsi que des
          liens affiliés (Amazon, ManoMano). Vous pouvez accepter ou refuser ces cookies. Voir notre{" "}
          <Link href="/politique-de-confidentialite" className="underline hover:text-brand-600">
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => repondre("refuse")}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => repondre("accepte")}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
