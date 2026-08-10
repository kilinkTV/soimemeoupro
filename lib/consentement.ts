export const COOKIE_CONSENTEMENT = "consentement_cookies";

// Catégories de cookies non essentiels proposées au choix de la personne qui visite
// le site. Les cookies strictement nécessaires (dont ce cookie de consentement
// lui-même) ne figurent pas ici : ils ne sont pas soumis à consentement (exemption
// CNIL) et sont donc toujours actifs, sans bascule possible.
export interface ChoixConsentement {
  // Google AdSense, chargé uniquement une fois ce programme activé sur le site.
  publicite: boolean;
}

export const CHOIX_TOUT_ACCEPTE: ChoixConsentement = { publicite: true };
export const CHOIX_TOUT_REFUSE: ChoixConsentement = { publicite: false };

export function lireConsentement(): ChoixConsentement | null {
  if (typeof document === "undefined") return null;
  const correspondance = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENTEMENT}=([^;]*)`));
  if (!correspondance) return null;
  try {
    const valeur = JSON.parse(decodeURIComponent(correspondance[1]));
    if (typeof valeur?.publicite !== "boolean") return null;
    return { publicite: valeur.publicite };
  } catch {
    return null;
  }
}

export function ecrireConsentement(choix: ChoixConsentement): void {
  // ~13 mois : durée maximale recommandée par la CNIL pour la conservation d'un
  // choix de consentement aux cookies.
  const treizeMois = 60 * 60 * 24 * 396;
  document.cookie = `${COOKIE_CONSENTEMENT}=${encodeURIComponent(JSON.stringify(choix))}; max-age=${treizeMois}; path=/; SameSite=Lax`;
}

export function effacerConsentement(): void {
  document.cookie = `${COOKIE_CONSENTEMENT}=; max-age=0; path=/; SameSite=Lax`;
}

// Nom de l'évènement DOM utilisé pour rouvrir la fenêtre de paramétrage des cookies
// depuis n'importe quel endroit du site (ex. lien « Paramètres de confidentialité » du pied de
// page), sans avoir à faire remonter un état React jusqu'à la racine.
export const EVENEMENT_OUVRIR_PARAMETRES_COOKIES = "smop:ouvrir-parametres-cookies";
