"use client";

import { useState } from "react";
import type { Categorie } from "@/lib/types";

const METIER_PAR_CATEGORIE: Record<Categorie, string> = {
  auto: "garagiste",
  maison: "artisan travaux maison",
  jardin: "paysagiste jardinier",
  electromenager: "réparateur électroménager",
  velo: "réparation vélo",
  piscine: "pisciniste",
  domotique: "électricien domotique",
  ameublement: "tapissier ameublement",
  electricite: "électricien",
  plomberie: "plombier",
  energie: "installateur panneaux solaires",
};

// La catégorie "Énergie" couvre des métiers très différents selon la sous-catégorie
// (solaire, recharge véhicule, électricité, plomberie/chauffage) : le métier par
// catégorie ci-dessus ne convient qu'au solaire, d'où ces surcharges ciblées.
const METIER_PAR_SOUS_CATEGORIE: Partial<Record<string, string>> = {
  "Recharge véhicule": "électricien borne de recharge",
  "Gestion de l'énergie": "électricien",
  "Économies d'énergie": "chauffagiste plombier",
};

function urlRecherche(metier: string, position?: GeolocationPosition): string {
  const requete = encodeURIComponent(metier);
  if (!position) {
    return `https://www.google.com/maps/search/${requete}`;
  }
  const { latitude, longitude } = position.coords;
  return `https://www.google.com/maps/search/${requete}/@${latitude},${longitude},14z`;
}

export default function TrouverArtisan({
  categorie,
  sousCategorie,
}: {
  categorie: Categorie;
  sousCategorie?: string;
}) {
  const [recherche, setRecherche] = useState(false);
  const metier = (sousCategorie && METIER_PAR_SOUS_CATEGORIE[sousCategorie]) || METIER_PAR_CATEGORIE[categorie];

  function ouvrirRecherche() {
    setRecherche(true);
    // Ouvre l'onglet tout de suite (dans le geste utilisateur) pour éviter les
    // bloqueurs de popup, puis on le redirige une fois la position connue.
    const onglet = window.open("", "_blank", "noopener,noreferrer");

    if (!("geolocation" in navigator)) {
      if (onglet) onglet.location.href = urlRecherche(metier);
      setRecherche(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (onglet) onglet.location.href = urlRecherche(metier, position);
        setRecherche(false);
      },
      () => {
        // Position refusée ou indisponible : recherche générique sans coordonnées.
        if (onglet) onglet.location.href = urlRecherche(metier);
        setRecherche(false);
      },
      { timeout: 8000 }
    );
  }

  return (
    <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
      <button
        type="button"
        onClick={ouvrirRecherche}
        disabled={recherche}
        className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {recherche ? "Localisation..." : "Trouver un artisan près de chez vous"}
      </button>
      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        Ouvre une recherche &laquo; {metier} &raquo; sur Google Maps. Si vous autorisez la localisation, elle n&apos;est
        utilisée qu&apos;une fois pour centrer la recherche : rien n&apos;est enregistré sur ce site.
      </p>
    </div>
  );
}
