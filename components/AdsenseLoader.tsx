"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { lireConsentement } from "@/lib/consentement";

export default function AdsenseLoader({ clientId }: { clientId: string }) {
  const [autorise, setAutorise] = useState(false);

  useEffect(() => {
    // Le cookie n'existe que côté navigateur : lu après le premier rendu pour éviter
    // tout écart entre le HTML généré côté serveur et l'hydratation côté client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAutorise(lireConsentement() === "accepte");
  }, []);

  if (!autorise) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
