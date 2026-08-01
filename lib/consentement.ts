export const COOKIE_CONSENTEMENT = "consentement_cookies";

export type ChoixConsentement = "accepte" | "refuse";

export function lireConsentement(): ChoixConsentement | null {
  if (typeof document === "undefined") return null;
  const correspondance = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENTEMENT}=([^;]*)`));
  const valeur = correspondance ? decodeURIComponent(correspondance[1]) : null;
  return valeur === "accepte" || valeur === "refuse" ? valeur : null;
}

export function ecrireConsentement(valeur: ChoixConsentement): void {
  const unAn = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE_CONSENTEMENT}=${valeur}; max-age=${unAn}; path=/; SameSite=Lax`;
}

export function effacerConsentement(): void {
  document.cookie = `${COOKIE_CONSENTEMENT}=; max-age=0; path=/; SameSite=Lax`;
}
