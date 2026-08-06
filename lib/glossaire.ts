export interface TermeGlossaire {
  id: string;
  terme: string;
  definition: string;
  sources: { nom: string; href: string }[];
  guide?: { label: string; href: string };
}

export interface GroupeGlossaire {
  titre: string;
  termes: TermeGlossaire[];
}

export const GROUPES_GLOSSAIRE: GroupeGlossaire[] = [
  {
    titre: "Électricité",
    termes: [
      {
        id: "nf-c-15-100",
        terme: "Norme NF C 15-100",
        definition:
          "La norme de référence pour toute installation électrique basse tension en France : nombre minimum de prises et points lumineux par pièce, disjoncteur différentiel 30 mA, mise à la terre, un disjoncteur par circuit au tableau, conducteurs sous gaine protégée. Un particulier a le droit de réaliser ses propres travaux électriques, mais le résultat doit respecter cette norme, que le chantier soit fait par un professionnel ou non.",
        sources: [
          { nom: "Promotelec — NF C 15-100, la norme de référence pour l'installation électrique", href: "https://www.promotelec.com/particuliers/fiche/nf-c-15-100-la-norme-de-reference-pour-linstallation-electrique/" },
        ],
        guide: { label: "Électricité : ce qu'un particulier peut légalement faire seul", href: "/guides/electricite-ce-que-vous-pouvez-faire" },
      },
      {
        id: "disjoncteur-differentiel",
        terme: "Disjoncteur différentiel",
        definition:
          "Dispositif de sécurité du tableau électrique qui coupe automatiquement le courant dès qu'il détecte une fuite anormale (défaut d'isolement, câble abîmé, humidité...). Il protège les personnes contre l'électrocution et les biens contre les surintensités. Sa présence, au calibre 30 mA, est imposée par la norme NF C 15-100.",
        sources: [
          { nom: "ENGIE — Disjoncteur différentiel : rôle, types et normes essentielles", href: "https://particuliers.engie.fr/electricite/conseils-electricite/conseils-installation-electrique/disjoncteur-differentiel.html" },
          { nom: "Legrand — Qu'est-ce qu'un disjoncteur différentiel ?", href: "https://www.legrand.fr/questions-frequentes/quest-ce-quun-disjoncteur-differentiel-et-comment-le-choisir" },
        ],
      },
      {
        id: "consuel",
        terme: "CONSUEL / attestation de conformité électrique",
        definition:
          "Le Consuel (Comité national pour la sécurité des usagers de l'électricité) délivre l'attestation de conformité électrique, un document obligatoire pour raccorder toute installation neuve ou entièrement rénovée au réseau public. Si les travaux ont été réalisés par vous-même plutôt que par un électricien, une visite de contrôle du Consuel sur place devient obligatoire avant la délivrance de l'attestation.",
        sources: [
          { nom: "EDF Particulier — Consuel : attestation de conformité électrique", href: "https://particulier.edf.fr/fr/accueil/guide-energie/electricite/consuel.html" },
        ],
        guide: { label: "Électricité : ce qu'un particulier peut légalement faire seul", href: "/guides/electricite-ce-que-vous-pouvez-faire" },
      },
    ],
  },
  {
    titre: "Urbanisme et administratif",
    termes: [
      {
        id: "declaration-prealable",
        terme: "Déclaration préalable de travaux",
        definition:
          "Autorisation d'urbanisme simplifiée, à obtenir en mairie avant certains travaux qui ne relèvent pas d'un permis de construire : abri de jardin, pergola, carport ou terrasse surélevée entre 5 et 20 m² d'emprise au sol, modification de l'aspect extérieur (panneaux solaires en toiture, ravalement, changement de fenêtres...). Comptez environ un mois d'instruction, deux mois en secteur protégé.",
        sources: [
          { nom: "Service-Public.fr — Déclaration préalable de travaux (DP)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17578" },
          { nom: "Légifrance — Article R.421-9 du Code de l'urbanisme", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037799137/" },
        ],
        guide: { label: "Quand une déclaration préalable est-elle obligatoire ?", href: "/guides/declaration-prealable-travaux-exterieurs" },
      },
      {
        id: "permis-de-construire",
        terme: "Permis de construire",
        definition:
          "Autorisation d'urbanisme complète, requise au-delà des seuils de la déclaration préalable : plus de 20 m² d'emprise au sol pour une construction nouvelle (abri, extension...), ou surface de plancher supérieure selon les cas. La procédure et le délai d'instruction sont plus lourds que ceux d'une simple déclaration préalable.",
        sources: [
          { nom: "Légifrance — Article R.421-9 du Code de l'urbanisme", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037799137/" },
        ],
        guide: { label: "Quand une déclaration préalable est-elle obligatoire ?", href: "/guides/declaration-prealable-travaux-exterieurs" },
      },
      {
        id: "enedis",
        terme: "Enedis",
        definition:
          "Gestionnaire du réseau public de distribution d'électricité en France (hors quelques zones desservies par des entreprises locales de distribution). C'est auprès d'Enedis que doit être déclarée toute installation photovoltaïque raccordée à votre réseau électrique intérieur, y compris un kit solaire d'un seul panneau en autoconsommation totale sans revente.",
        sources: [
          { nom: "Enedis — Raccordement d'une installation de production électrique", href: "https://www.enedis.fr/raccordement-installation-production-electrique" },
        ],
        guide: { label: "Panneaux solaires plug-and-play : les démarches obligatoires", href: "/guides/panneaux-solaires-demarches-administratives" },
      },
    ],
  },
  {
    titre: "Assurance et responsabilité",
    termes: [
      {
        id: "responsabilite-civile",
        terme: "Responsabilité civile (RC)",
        definition:
          "Garantie incluse dans la quasi-totalité des contrats d'assurance habitation, qui couvre les dommages que vous causez à autrui en bricolant (un voisin dont le logement est abîmé par une fuite, un passant blessé...). Elle ne couvre en revanche ni vos propres blessures, ni les dégâts que vous causez à votre propre logement ou matériel — c'est une confusion fréquente.",
        sources: [
          { nom: "MAIF — Assurance responsabilité civile habitation", href: "https://www.maif.fr/habitation/guide-assurance-habitation/responsabilite-civile" },
        ],
        guide: { label: "Assurance habitation et bricolage : ce qui est couvert", href: "/guides/assurance-bricolage" },
      },
      {
        id: "garantie-decennale",
        terme: "Garantie décennale",
        definition:
          "Responsabilité de dix ans qui pèse sur un constructeur (professionnel ou particulier assimilé « constructeur non professionnel ») pour les dommages compromettant la solidité d'un ouvrage ou le rendant impropre à sa destination. Elle peut s'appliquer à un particulier qui réalise lui-même des travaux assimilables à une opération de construction (extension, surélévation, agrandissement) — pas à de l'entretien courant ou de petites réparations.",
        sources: [
          { nom: "Service-Public.fr — Garantie décennale des constructeurs", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/R33764" },
        ],
        guide: { label: "Assurance habitation et bricolage : ce qui est couvert", href: "/guides/assurance-bricolage" },
      },
    ],
  },
  {
    titre: "Énergie solaire",
    termes: [
      {
        id: "autoconsommation",
        terme: "Autoconsommation",
        definition:
          "Fait de consommer directement l'électricité produite par ses propres panneaux solaires, plutôt que de la revendre en totalité au réseau. Même en autoconsommation totale, sans aucune injection ni revente, une déclaration auprès d'Enedis reste obligatoire dès que l'installation est raccordée au réseau électrique du logement.",
        sources: [
          { nom: "Enedis — Raccordement d'une installation de production électrique", href: "https://www.enedis.fr/raccordement-installation-production-electrique" },
        ],
        guide: { label: "Panneaux solaires plug-and-play : les démarches obligatoires", href: "/guides/panneaux-solaires-demarches-administratives" },
      },
      {
        id: "onduleur",
        terme: "Onduleur",
        definition:
          "Appareil qui transforme le courant continu (DC) produit par les panneaux solaires en courant alternatif (AC), utilisable par les appareils électriques du logement et compatible avec le réseau. Un onduleur hybride gère en plus le stockage sur batterie et l'arbitrage entre autoconsommation et injection réseau.",
        sources: [
          { nom: "Reno.energy — Définition des termes techniques du photovoltaïque", href: "https://reno.energy/fr-fr/aide-support/photovoltaique/definition-des-termes-techniques-dans-le-secteur-photovoltaique/" },
        ],
      },
      {
        id: "kwc",
        terme: "kWc (kilowatt-crête)",
        definition:
          "Unité qui mesure la puissance maximale qu'un panneau solaire peut fournir dans des conditions d'ensoleillement standardisées (fort ensoleillement, 25 °C, inclinaison optimale). Le seuil des 3 kWc conditionne à la fois l'obligation d'attestation Consuel et l'exonération fiscale sur la revente du surplus pour une installation en toiture.",
        sources: [
          { nom: "Opéra Énergie — Le kilowatt-crête (kWc) : une unité pour le photovoltaïque", href: "https://opera-energie.com/kwc/" },
        ],
        guide: { label: "Autoconsommation solaire au-delà du kit plug-and-play", href: "/guides/autoconsommation-solaire-installation-toiture" },
      },
      {
        id: "rge",
        terme: "RGE (Reconnu Garant de l'Environnement)",
        definition:
          "Mention attribuée par les pouvoirs publics et l'ADEME aux professionnels du bâtiment et des énergies renouvelables ayant fait valider leurs compétences. Elle est indispensable pour que le client bénéficie d'aides publiques (MaPrimeRénov', primes CEE...) — une installation posée soi-même en exclut d'office, quelle que soit la qualité du travail réalisé.",
        sources: [
          { nom: "Ministère de la Transition écologique — Le label RGE", href: "https://www.ecologie.gouv.fr/politiques-publiques/label-reconnu-garant-lenvironnement-rge" },
        ],
        guide: { label: "Autoconsommation solaire au-delà du kit plug-and-play", href: "/guides/autoconsommation-solaire-installation-toiture" },
      },
    ],
  },
  {
    titre: "Plomberie et eau",
    termes: [
      {
        id: "clapet-anti-retour",
        terme: "Clapet anti-retour",
        definition:
          "Dispositif mécanique simple, installé juste après le compteur, qui laisse l'eau s'écouler dans un seul sens et se referme en cas d'inversion du débit. Il suffit dans la plupart des usages domestiques standards (chauffe-eau, machine à laver, robinet extérieur simple) pour empêcher un retour d'eau polluée vers le réseau public.",
        sources: [
          { nom: "Légifrance — Article R.1321-57 du Code de la santé publique", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046840694" },
        ],
        guide: { label: "Clapet anti-retour et disconnecteur : une obligation qu'on oublie", href: "/guides/disconnecteur-clapet-anti-retour-obligatoire" },
      },
      {
        id: "disconnecteur",
        terme: "Disconnecteur",
        definition:
          "Protection renforcée contre les retours d'eau, requise dès qu'un usage présente un risque de pollution plus élevé (adoucisseur d'eau, arrosage avec injection d'engrais, raccordement à une cuve de récupération d'eau de pluie). Contrairement au simple clapet anti-retour, il nécessite une installation particulière et un entretien annuel par un professionnel agréé.",
        sources: [
          { nom: "Légifrance — Article R.1321-57 du Code de la santé publique", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046840694" },
        ],
        guide: { label: "Clapet anti-retour et disconnecteur : une obligation qu'on oublie", href: "/guides/disconnecteur-clapet-anti-retour-obligatoire" },
      },
    ],
  },
  {
    titre: "Recyclage et environnement",
    termes: [
      {
        id: "deee",
        terme: "DEEE (déchets d'équipements électriques et électroniques)",
        definition:
          "Tout appareil fonctionnant à l'électricité ou par champ électromagnétique devenu un déchet (lave-linge, four, vélo électrique, ampoule...). Leur collecte est réglementée depuis 2006 pour éviter qu'ils ne finissent avec les ordures ménagères classiques : la reprise par le distributeur est gratuite et obligatoire, à l'achat d'un équivalent neuf ou, pour les petits appareils, même sans achat dans les grandes surfaces spécialisées.",
        sources: [
          { nom: "ADEME — Que faire de mes équipements électriques et électroniques", href: "https://quefairedemesdechets.ademe.fr/categories/equipements-electriques-electroniques-deee/" },
        ],
        guide: { label: "Vieil électroménager : la reprise gratuite obligatoire", href: "/guides/deee-recyclage-electromenager" },
      },
      {
        id: "eco-organisme",
        terme: "Éco-organisme / filière REP",
        definition:
          "Organisme agréé par l'État, financé par les producteurs (au titre de la responsabilité élargie du producteur, REP), chargé d'organiser la collecte et le recyclage d'une catégorie de déchets — Ecomaison pour l'ameublement, par exemple. C'est ce système qui finance les points de collecte gratuits en déchèterie pour les meubles ou l'électroménager usagés.",
        sources: [
          { nom: "ADEME — Filières REP", href: "https://filieres-rep.ademe.fr/" },
        ],
        guide: { label: "Vieux meubles : la reprise gratuite obligatoire depuis 2022", href: "/guides/reprise-gratuite-meubles-usages-eco-mobilier" },
      },
    ],
  },
  {
    titre: "Jardin et nature",
    termes: [
      {
        id: "periode-nidification",
        terme: "Période de nidification",
        definition:
          "Contrairement à une idée reçue, il n'existe pas de date légale d'interdiction de taille des haies pour les particuliers (la fenêtre du 16 mars au 15 août ne s'impose qu'aux agriculteurs touchant des aides PAC). La règle qui s'applique à tous, toute l'année, est plus générale : l'article L.411-1 du Code de l'environnement interdit de détruire un nid actif d'espèce protégée, quelle que soit la date.",
        sources: [
          { nom: "Légifrance — Article L.411-1 du Code de l'environnement", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006833715/2005-02-24" },
        ],
        guide: { label: "Taille des haies et des arbres : ce que dit vraiment la loi", href: "/guides/taille-haies-arbres-periode-nidification" },
      },
    ],
  },
  {
    titre: "Vélo électrique",
    termes: [
      {
        id: "vae",
        terme: "VAE (vélo à assistance électrique)",
        definition:
          "Catégorie légale définie par deux critères précis : une puissance maximale de 250 W, et une assistance qui s'interrompt à 25 km/h ou dès l'arrêt du pédalage. Un vélo qui dépasse ces seuils (par débridage notamment) n'est plus juridiquement un cycle, mais un véhicule à moteur soumis à immatriculation et assurance.",
        sources: [
          { nom: "Légifrance — Article R.311-1 du Code de la route", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006841579/2009-04-13" },
        ],
        guide: { label: "Débridage d'un vélo électrique : pourquoi c'est un délit", href: "/guides/debridage-velo-electrique-interdit" },
      },
    ],
  },
];

export function getTousLesTermesGlossaire(): TermeGlossaire[] {
  return GROUPES_GLOSSAIRE.flatMap((g) => g.termes);
}
