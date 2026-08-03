export function formatEuros(valeur: number): string {
  return Math.round(valeur).toLocaleString("fr-FR") + " €";
}
