export interface QuestionFaqGenerale {
  id: string;
  question: string;
  // Réponse en markdown allégé : texte brut avec éventuels liens [texte](/chemin).
  // Rendue en JSX par RenduFaqAvecLiens (components/faq), et nettoyée de ses liens
  // pour le JSON-LD FAQPage (voir texteBrutSansLiens) et l'index de recherche.
  reponse: string;
}

export interface GroupeFaqGenerale {
  titre: string;
  questions: QuestionFaqGenerale[];
}

export const GROUPES_FAQ: GroupeFaqGenerale[] = [
  {
    titre: "Le comparateur et les prix",
    questions: [
      {
        id: "calcul-prix",
        question: "Comment sont calculés les prix affichés sur une fiche projet ?",
        reponse:
          "Le coût DIY additionne le matériel à acheter (hors ce que vous possédez déjà) et le temps estimé, valorisé à votre taux horaire déclaré. Le coût professionnel vient d'une fourchette de prix tout compris par unité (m², pièce...), recoupée avec les taux horaires moyens constatés en France par métier. Le site recommande le DIY seulement si l'économie dépasse environ deux fois votre valeur horaire — sinon il recommande un professionnel par défaut, par prudence. Détail complet sur la page [méthodologie et sources](/methodologie).",
      },
      {
        id: "tarifs-pro",
        question: "D'où viennent les tarifs « professionnel » du comparateur ?",
        reponse:
          "Ce ne sont pas des devis réels ni une base de données officielle (aucune ne recense de prix par micro-tâche à l'échelle nationale) : ils sont calibrés puis recoupés avec les taux horaires moyens réellement constatés en France par métier, chacun listé avec ses sources sur la page [méthodologie et sources](/methodologie).",
      },
      {
        id: "risque-echec",
        question: "Le risque de devoir refaire le travail est-il inclus dans le prix DIY affiché ?",
        reponse:
          "Non : le site part du principe que le projet aboutit, et n'ajoute pas ce risque au coût affiché. Il est montré séparément, comme une probabilité informative selon votre niveau déclaré (débutant, intermédiaire, expérimenté), à vous de l'intégrer dans votre décision.",
      },
      {
        id: "diy-toujours-recommande",
        question: "Le DIY est-il toujours la solution recommandée par le site ?",
        reponse:
          "Non. Le verdict dépend de votre valeur horaire déclarée et du projet : dès que l'économie estimée reste faible au regard de votre temps, le comparateur recommande un professionnel par défaut. Pour certains projets jugés trop risqués (électriques, structurels...), le verdict professionnel peut même être imposé indépendamment du calcul de coût.",
      },
    ],
  },
  {
    titre: "Ce que vous avez le droit de faire vous-même",
    questions: [
      {
        id: "droit-electricite",
        question: "Ai-je le droit de faire mes travaux électriques moi-même ?",
        reponse:
          "Oui : il n'existe pas d'interdiction générale, aucune qualification n'est légalement exigée pour bricoler chez soi. Le résultat doit en revanche respecter la [norme NF C 15-100](/glossaire#nf-c-15-100), et une installation neuve ou entièrement rénovée doit être validée par le [Consuel](/glossaire#consuel) avant la mise sous tension. Détail dans notre [guide électricité](/guides/electricite-ce-que-vous-pouvez-faire).",
      },
      {
        id: "declaration-mairie",
        question: "Dois-je déclarer mes travaux à la mairie ?",
        reponse:
          "Cela dépend de la nature et de la taille du projet. Une construction extérieure (abri, pergola, carport, terrasse surélevée) entre 5 et 20 m² d'emprise au sol nécessite une [déclaration préalable de travaux](/glossaire#declaration-prealable), et au-delà de 20 m² un permis de construire. Poser des panneaux solaires en toiture déclenche la même obligation, car cela modifie l'aspect extérieur du bâtiment. Détail des seuils dans notre [guide dédié](/guides/declaration-prealable-travaux-exterieurs).",
      },
      {
        id: "payer-depanner-ami",
        question: "Puis-je me faire payer pour dépanner un ami ou un voisin ?",
        reponse:
          "Un coup de main occasionnel et non rémunéré reste de l'entraide légale ; seul le remboursement des fournitures achetées, au prix coûtant, est autorisé. Se faire payer régulièrement pour le travail lui-même — au-delà du simple remboursement de frais — expose à une requalification en travail dissimulé, une infraction pénale. Notre [guide sur l'entraide et le travail dissimulé](/guides/depanner-ami-voisin-legal) détaille les critères et les statuts pour se faire payer dans les règles.",
      },
      {
        id: "aides-publiques-diy",
        question: "Une aide publique (MaPrimeRénov', prime CEE...) est-elle compatible avec un projet fait soi-même ?",
        reponse:
          "Non, en tout cas pour les aides à l'autoconsommation solaire : elles sont conditionnées à une pose par un professionnel certifié [RGE](/glossaire#rge), ce qui exclut d'office une installation faite soi-même, indépendamment de la qualité du travail réalisé. Voir notre [guide sur l'autoconsommation en toiture](/guides/autoconsommation-solaire-installation-toiture).",
      },
    ],
  },
  {
    titre: "Assurance et responsabilité",
    questions: [
      {
        id: "assurance-bricolage",
        question: "Mon assurance habitation me couvre-t-elle si ça tourne mal en bricolant ?",
        reponse:
          "Ça dépend de qui est touché. [La responsabilité civile](/glossaire#responsabilite-civile), incluse dans la quasi-totalité des contrats d'assurance habitation, couvre les dommages causés à autrui — mais pas vos propres blessures, ni les dégâts que vous causez à votre propre logement ou matériel en travaillant. Détail dans notre [guide assurance et bricolage](/guides/assurance-bricolage).",
      },
      {
        id: "garantie-decennale-particulier",
        question: "Puis-je engager ma responsabilité en tant que « constructeur » en bricolant ?",
        reponse:
          "Oui, si les travaux réalisés sont assimilables à une opération de construction (extension, surélévation, agrandissement) : la loi peut alors vous considérer comme un « constructeur non professionnel », avec une [garantie décennale](/glossaire#garantie-decennale) de dix ans à votre charge. Ce n'est pas un sujet pour de l'entretien courant ou de petites réparations, qui couvrent l'essentiel des projets présentés sur ce site.",
      },
    ],
  },
  {
    titre: "Que faire des déchets et de l'ancien matériel",
    questions: [
      {
        id: "vieux-electromenager",
        question: "Que faire d'un vieil appareil électroménager remplacé ?",
        reponse:
          "Sa reprise par le magasin est gratuite et obligatoire à l'achat d'un appareil équivalent neuf, et même sans achat pour les petits appareils dans les magasins d'au moins 400 m². Voir notre [guide sur la reprise des DEEE](/guides/deee-recyclage-electromenager).",
      },
      {
        id: "vieux-meuble",
        question: "Que faire d'un vieux meuble remplacé ?",
        reponse:
          "Depuis 2022, sa reprise par le magasin est gratuite : à l'achat d'un meuble équivalent dans les magasins de 200 à 1000 m², et même sans achat au-delà de 1000 m². Il peut aussi être déposé gratuitement en déchèterie. Voir notre [guide sur la reprise des meubles](/guides/reprise-gratuite-meubles-usages-eco-mobilier).",
      },
      {
        id: "huile-vidange",
        question: "Que faire de l'huile de vidange usagée après une vidange faite soi-même ?",
        reponse:
          "La jeter avec les ordures ménagères, dans la nature ou dans les égouts est une infraction pénale (dépôt de déchet dangereux). Sa reprise est gratuite pour tous depuis 2022, en déchèterie ou chez de nombreux professionnels de l'automobile. Voir notre [guide sur l'huile de vidange usagée](/guides/huile-vidange-usagee-que-faire).",
      },
    ],
  },
];

export function getToutesLesQuestionsFaq(): QuestionFaqGenerale[] {
  return GROUPES_FAQ.flatMap((g) => g.questions);
}

// Retire la syntaxe de lien markdown [texte](/chemin) pour obtenir du texte brut,
// utilisé pour le JSON-LD FAQPage (Google recommande du texte simple sans balisage).
export function texteBrutSansLiens(texte: string): string {
  return texte.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
