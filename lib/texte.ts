export function retirerAccents(texte: string): string {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "");
}
