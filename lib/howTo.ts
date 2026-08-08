import { nettoyerMarkdown } from "@/lib/texte";

export interface Etape {
  nom: string;
  texte: string;
}

// Extrait les étapes numérotées de la section "## Étapes clés du projet" d'un guide
// MDX (chaque étape étant "N. **intitulé court** reste de la phrase."), pour
// alimenter un schéma HowTo. Ne matche volontairement que l'intitulé exact, sans
// parenthèse : les variantes "(vue d'ensemble)" ou "(à titre informatif...)"
// signalent des étapes qui ne sont pas de vraies instructions à suivre par le
// lecteur (ex. tableau électrique réservé à un pro), donc ne doivent pas produire de
// schéma HowTo. Retourne un tableau vide si le guide n'a pas de section correspondante.
export function extraireEtapesMdx(content: string): Etape[] {
  const items: Etape[] = [];
  let dansEtapes = false;

  for (const ligne of content.split("\n")) {
    if (/^##\s+Étapes clés du projet\s*$/.test(ligne)) {
      dansEtapes = true;
      continue;
    }
    if (!dansEtapes) continue;
    if (/^##\s+/.test(ligne)) break;

    // Le reste de la phrase garde son espacement d'origine (espace ou virgule
    // juste après le gras) pour ne pas recoller les mots lors de la concaténation.
    const matchEtape = /^\d+\.\s+\*\*([^*]+)\*\*(.*)$/.exec(ligne.trim());
    if (matchEtape) {
      const [, nom, reste] = matchEtape;
      items.push({
        nom: nettoyerMarkdown(nom),
        texte: nettoyerMarkdown(`${nom}${reste}`),
      });
    }
  }

  return items;
}
