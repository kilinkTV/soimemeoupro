export function retirerAccents(texte: string): string {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Nettoie le markdown basique (gras, italique, liens) pour obtenir un texte brut
// adapté à des données structurées JSON-LD (Google recommande du texte simple).
export function nettoyerMarkdown(texte: string): string {
  return texte
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}
