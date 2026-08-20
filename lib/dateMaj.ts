const FORMATTER = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

// Date "Prix vérifiés en <mois> <année>" affichée sur les fiches projet : calculée à
// la volée à partir de la date du jour, aucun champ à maintenir dans les données.
// Les pages projet étant générées statiquement (generateStaticParams), cette date
// correspond au dernier build/déploiement du site, pas à la date de consultation.
export function dateMajAffichee(): string {
  return FORMATTER.format(new Date());
}

// Même date que dateMajAffichee(), au format ISO (YYYY-MM-DD) pour les champs
// dateModified des données structurées (schema.org) — sur les pages guides.
export function dateMajISO(): string {
  return new Date().toISOString().slice(0, 10);
}
