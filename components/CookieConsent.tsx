"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  lireConsentement,
  ecrireConsentement,
  CHOIX_TOUT_ACCEPTE,
  CHOIX_TOUT_REFUSE,
  EVENEMENT_OUVRIR_PARAMETRES_COOKIES,
  type ChoixConsentement,
} from "@/lib/consentement";

type Vue = "fermee" | "bandeau" | "parametres";

export default function CookieConsent() {
  const [vue, setVue] = useState<Vue>("fermee");
  // true tant qu'aucun choix n'a jamais été enregistré : dans ce cas, fermer la
  // fenêtre de paramétrage doit ramener à la question initiale plutôt que de la
  // faire disparaître sans décision (le choix n'est pas optionnel la première fois).
  const [modeInitial, setModeInitial] = useState(true);
  const [detailsOuverts, setDetailsOuverts] = useState(false);
  const [choixEnCours, setChoixEnCours] = useState<ChoixConsentement>(CHOIX_TOUT_REFUSE);
  const conteneurRef = useRef<HTMLDivElement>(null);

  const SELECTEUR_FOCUSABLE = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

  useEffect(() => {
    // Le cookie n'existe que côté navigateur : lu après le premier rendu pour éviter
    // tout écart entre le HTML généré côté serveur et l'hydratation côté client.
    const stocke = lireConsentement();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVue(stocke === null ? "bandeau" : "fermee");
    if (stocke) setChoixEnCours(stocke);

    // Permet au lien « Paramètres de confidentialité » du pied de page (n'importe quelle page)
    // de rouvrir ce composant sans faire remonter d'état jusqu'à la racine.
    function ouvrirParametres() {
      setChoixEnCours(lireConsentement() ?? CHOIX_TOUT_REFUSE);
      setModeInitial(false);
      setVue("parametres");
    }
    window.addEventListener(EVENEMENT_OUVRIR_PARAMETRES_COOKIES, ouvrirParametres);
    return () => window.removeEventListener(EVENEMENT_OUVRIR_PARAMETRES_COOKIES, ouvrirParametres);
  }, []);

  useEffect(() => {
    if (vue === "fermee") return;
    // Focus initial dans la fenêtre à son ouverture (patron ARIA "dialog") : sans ça,
    // le focus clavier resterait sous l'overlay, sur l'élément ayant déclenché
    // l'ouverture — inutilisable au clavier ou au lecteur d'écran.
    conteneurRef.current?.querySelector<HTMLElement>(SELECTEUR_FOCUSABLE)?.focus();
  }, [vue]);

  function surTouche(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      // Sur le bandeau initial, Échap ne fait rien : la CNIL n'autorise pas à esquiver
      // le choix accepter/refuser sans le faire explicitement. Depuis les paramètres,
      // Échap se comporte comme le bouton de fermeture.
      if (vue === "parametres") {
        e.preventDefault();
        fermerParametres();
      }
      return;
    }
    if (e.key !== "Tab" || !conteneurRef.current) return;
    // Piège le focus clavier à l'intérieur de la fenêtre modale (patron ARIA "dialog") :
    // sans ça, Tab pourrait sortir sur des éléments cachés sous l'overlay.
    const focusables = Array.from(conteneurRef.current.querySelectorAll<HTMLElement>(SELECTEUR_FOCUSABLE));
    if (focusables.length === 0) return;
    const premier = focusables[0];
    const dernier = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === premier) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && document.activeElement === dernier) {
      e.preventDefault();
      premier.focus();
    }
  }

  function valider(choix: ChoixConsentement) {
    ecrireConsentement(choix);
    setVue("fermee");
    // Recharge pour que les scripts concernés (AdSense) tiennent compte du choix.
    window.location.reload();
  }

  function fermerParametres() {
    // Premier passage sans décision prise : on revient au bandeau plutôt que de tout
    // fermer, la CNIL n'autorise pas à esquiver le choix. Une fois un choix déjà
    // enregistré (réouverture via « Paramètres de confidentialité »), fermer suffit.
    setVue(modeInitial ? "bandeau" : "fermee");
  }

  if (vue === "fermee") return null;

  return (
    <div
      ref={conteneurRef}
      onKeyDown={surTouche}
      className="no-print fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-titre"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-2xl dark:bg-brand-900/40"
            >
              🍪
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
                <Image src="/logo-icon.png" alt="" width={16} height={14} className="h-3.5 w-auto" />
                <span>
                  <span className="text-brand-600">soimemeoupro</span>
                  <span className="text-slate-900 dark:text-slate-100">.fr</span>
                </span>
              </p>
              <h2 id="cookie-consent-titre" className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
                {vue === "bandeau" ? "Consentement aux cookies" : "Paramètres des cookies"}
              </h2>
            </div>
          </div>
          {vue === "parametres" && (
            <button
              type="button"
              onClick={fermerParametres}
              aria-label="Fermer les paramètres"
              className="shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>

        {vue === "bandeau" ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sous réserve de votre consentement, soimemeoupro.fr dépose des cookies strictement nécessaires au
              fonctionnement du site (toujours actifs), ainsi que des cookies de publicité (Google AdSense) une fois ce
              programme activé sur le site.
            </p>
            <button
              type="button"
              onClick={() => setDetailsOuverts((v) => !v)}
              className="mt-2 text-sm font-medium text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Détails et base légale
            </button>
            {detailsOuverts && (
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Les cookies strictement nécessaires (dont celui qui mémorise votre choix ci-dessous) reposent sur
                l&apos;intérêt légitime du site à fonctionner correctement et sont exemptés de consentement par la CNIL.
                Le cookie de publicité personnalisée, déposé par Google AdSense, n&apos;est chargé qu&apos;avec votre
                consentement explicite (art. 6.1.a du RGPD) et peut entraîner un transfert de données hors de l&apos;Union
                européenne, encadré par les clauses contractuelles types de Google. Vous pouvez retirer ce consentement
                à tout moment via le lien « Paramètres de confidentialité » en pied de page.
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link
                href="/politique-de-confidentialite"
                className="text-slate-500 underline hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/mentions-legales"
                className="text-slate-500 underline hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Mentions légales
              </Link>
              <button
                type="button"
                onClick={() => {
                  setModeInitial(true);
                  setVue("parametres");
                }}
                className="text-slate-500 underline hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Paramètres
              </button>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => valider(CHOIX_TOUT_REFUSE)}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => valider(CHOIX_TOUT_ACCEPTE)}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Accepter
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Cookies nécessaires</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      Indispensables au fonctionnement du site : mémorisation de votre choix de consentement. Non
                      soumis à consentement (exemption CNIL), donc toujours actifs.
                    </p>
                  </div>
                  <span className="mt-0.5 shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Toujours actif
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <label htmlFor="cookie-toggle-publicite" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Publicité personnalisée
                    </label>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      Google AdSense, une fois ce programme activé sur le site. Peut entraîner un transfert de données
                      hors de l&apos;Union européenne.
                    </p>
                  </div>
                  <button
                    type="button"
                    id="cookie-toggle-publicite"
                    role="switch"
                    aria-checked={choixEnCours.publicite}
                    onClick={() => setChoixEnCours((c) => ({ ...c, publicite: !c.publicite }))}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      choixEnCours.publicite ? "bg-brand-600" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        choixEnCours.publicite ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link
                href="/politique-de-confidentialite"
                className="text-slate-500 underline hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/mentions-legales"
                className="text-slate-500 underline hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Mentions légales
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => valider(choixEnCours)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => valider(CHOIX_TOUT_REFUSE)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => valider(CHOIX_TOUT_ACCEPTE)}
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Accepter
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
