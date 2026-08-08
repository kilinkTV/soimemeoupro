import { nettoyerMarkdown } from "@/lib/texte";

export interface QuestionReponse {
  question: string;
  reponse: string;
}

// Extrait les paires question/réponse de la section "## FAQ" d'un guide MDX (chaque
// question étant un titre de niveau 3, suivie d'un ou plusieurs paragraphes de
// réponse), pour alimenter un schéma FAQPage. Retourne un tableau vide si le guide
// n'a pas de section FAQ.
export function extraireFaqMdx(content: string): QuestionReponse[] {
  const items: QuestionReponse[] = [];
  let dansFaq = false;
  let question: string | null = null;
  let reponseLignes: string[] = [];

  function flush() {
    if (question) {
      const reponse = nettoyerMarkdown(reponseLignes.join(" "));
      if (reponse) items.push({ question, reponse });
    }
    question = null;
    reponseLignes = [];
  }

  for (const ligne of content.split("\n")) {
    if (/^##\s+FAQ\s*$/i.test(ligne)) {
      dansFaq = true;
      continue;
    }
    if (!dansFaq) continue;
    if (/^##\s+/.test(ligne)) {
      flush();
      break;
    }
    const matchQuestion = /^###\s+(.+?)\s*$/.exec(ligne);
    if (matchQuestion) {
      flush();
      question = nettoyerMarkdown(matchQuestion[1]);
      continue;
    }
    if (question && ligne.trim().length > 0) {
      reponseLignes.push(ligne.trim());
    }
  }
  flush();

  return items;
}
