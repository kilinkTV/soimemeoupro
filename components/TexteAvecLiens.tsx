import Link from "next/link";

// Rend un texte contenant une syntaxe de lien markdown allégée ([texte](/chemin)) en
// JSX, avec de vrais <Link> internes cliquables — évite de dupliquer les réponses FAQ
// en deux versions (texte brut pour le JSON-LD, JSX pour l'affichage). matchAll plutôt
// qu'un regex.exec en boucle : pas de lastIndex partagé à réinitialiser.
export default function TexteAvecLiens({ texte }: { texte: string }) {
  const parties: React.ReactNode[] = [];
  let curseur = 0;
  let cle = 0;

  for (const correspondance of texte.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const index = correspondance.index ?? 0;
    if (index > curseur) {
      parties.push(texte.slice(curseur, index));
    }
    parties.push(
      <Link key={cle++} href={correspondance[2]} className="underline hover:text-brand-700 dark:hover:text-brand-400">
        {correspondance[1]}
      </Link>
    );
    curseur = index + correspondance[0].length;
  }
  if (curseur < texte.length) {
    parties.push(texte.slice(curseur));
  }

  return <>{parties}</>;
}
