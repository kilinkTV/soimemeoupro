import type { Categorie } from "@/lib/types";

// Les noms de `materiel_necessaire` sont écrits pour être lus dans la liste "Matériel
// nécessaire" (précis, avec leurs qualificatifs entre parenthèses ou en fin de phrase :
// "(optionnel)", "(recommandé)", "(si nécessaire)", "adapté au véhicule"...), mais ces
// qualificatifs n'ont rien à faire dans une recherche sur un site marchand — ils
// produisent des résultats vides ou bizarres. On nettoie donc la requête envoyée aux
// marchands sans toucher au texte affiché à l'utilisateur (qui reste `item.nom` tel
// quel dans ResultatComparatif.tsx/ProduitsPopulaires.tsx).
export function nomPourRecherche(nom: string): string {
  // Note : pas de \b en fin de motif ici — après une lettre accentuée comme "é", \b ne
  // détecte pas de frontière de mot en JS (\b se base sur \w, qui ignore les accents),
  // donc "... adapté" en toute fin de chaîne ne matchait pas avec un \b final. Comme .*$
  // consomme de toute façon jusqu'à la fin, la frontière n'est pas nécessaire.
  return nom
    .replace(/\s*\([^)]*\)/g, "") // tout le contenu entre parenthèses
    .replace(/\s+adapté(e|es|s)?.*$/i, "") // "adapté(e)(s) ..." et ce qui suit
    .replace(/\s+si nécessaire.*$/i, "") // "si nécessaire" hors parenthèses
    .replace(/\s+selon\s+.*$/i, "") // "selon la marque/le modèle/..." hors parenthèses
    .trim();
}

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
const MANOMANO_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_MANOMANO_AFFILIATE_PREFIX;
const DECATHLON_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_DECATHLON_AFFILIATE_PREFIX;
const NORAUTO_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_NORAUTO_AFFILIATE_PREFIX;
const BOULANGER_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_BOULANGER_AFFILIATE_PREFIX;
const CONFORAMA_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_CONFORAMA_AFFILIATE_PREFIX;
const CDISCOUNT_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_CDISCOUNT_AFFILIATE_PREFIX;
const DARTY_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_DARTY_AFFILIATE_PREFIX;
const PISCINE_CENTER_AFFILIATE_PREFIX = process.env.NEXT_PUBLIC_PISCINE_CENTER_AFFILIATE_PREFIX;

export function lienAmazon(recherche: string): string {
  const params = new URLSearchParams({ k: nomPourRecherche(recherche) });
  if (AMAZON_TAG) {
    params.set("tag", AMAZON_TAG);
  }
  return `https://www.amazon.fr/s?${params.toString()}`;
}

export function lienManoMano(recherche: string): string {
  const cible = `https://www.manomano.fr/recherche/${encodeURIComponent(nomPourRecherche(recherche))}`;
  if (MANOMANO_AFFILIATE_PREFIX) {
    return `${MANOMANO_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Decathlon est pertinent uniquement pour l'outillage vélo (leur programme d'affiliation
// passe par Awin, même mécanique de préfixe de redirection que ManoMano) : à n'appeler
// que pour les projets de catégorie "velo", pas pour l'outillage générique.
export function lienDecathlon(recherche: string): string {
  const cible = `https://www.decathlon.fr/search?Ntt=${encodeURIComponent(nomPourRecherche(recherche))}`;
  if (DECATHLON_AFFILIATE_PREFIX) {
    return `${DECATHLON_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Norauto est pertinent uniquement pour la catégorie Auto & Moto (leur programme
// d'affiliation passe par le réseau Effiliation, même mécanique de préfixe que
// ManoMano/Decathlon) : à n'appeler que pour les projets de catégorie "auto".
// Contrairement à ManoMano/Decathlon, l'URL de recherche exacte de norauto.fr n'a pas pu
// être vérifiée (le site bloque les navigateurs automatisés y compris pour une simple
// visite, avant même toute tentative de scraping) : en attendant la configuration du
// préfixe d'affiliation, on retombe donc sur la page d'accueil plutôt que de deviner une
// URL de recherche qui pourrait ne pas fonctionner. Une fois le compte Effiliation
// approuvé, leur outil de génération de liens donnera l'URL de recherche exacte à
// utiliser ici.
export function lienNorauto(): string {
  const cible = "https://www.norauto.fr/";
  if (NORAUTO_AFFILIATE_PREFIX) {
    return `${NORAUTO_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Boulanger est pertinent pour l'Électroménager et la Domotique (leur programme
// d'affiliation passe par Effiliation). URL de recherche vérifiée manuellement (clic
// sur la loupe du site) : /resultats?tr=<requête>.
export function lienBoulanger(recherche: string): string {
  const cible = `https://www.boulanger.com/resultats?tr=${encodeURIComponent(nomPourRecherche(recherche))}`;
  if (BOULANGER_AFFILIATE_PREFIX) {
    return `${BOULANGER_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Conforama est pertinent uniquement pour l'Ameublement (leur programme d'affiliation
// passe par Awin). URL de recherche vérifiée manuellement : /recherche-conforama/<requête>.
export function lienConforama(recherche: string): string {
  const cible = `https://www.conforama.fr/recherche-conforama/${encodeURIComponent(nomPourRecherche(recherche))}`;
  if (CONFORAMA_AFFILIATE_PREFIX) {
    return `${CONFORAMA_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Cdiscount est un marchand généraliste (comme Amazon) : on ne l'affiche que sur les
// catégories qui n'ont pas déjà un marchand spécialisé plus pertinent (Auto/Vélo/
// Électroménager/Domotique/Ameublement), pour servir de filet sur Maison, Jardin,
// Piscine, Électricité, Plomberie et Énergie sans surcharger les autres pages de
// liens redondants. Leur programme d'affiliation passe par Awin. URL de recherche
// vérifiée manuellement : /search/10/<requête, espaces en "+">.html.
export function lienCdiscount(recherche: string): string {
  const cible = `https://www.cdiscount.com/search/10/${encodeURIComponent(nomPourRecherche(recherche)).replace(/%20/g, "+")}.html`;
  if (CDISCOUNT_AFFILIATE_PREFIX) {
    return `${CDISCOUNT_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Darty est pertinent pour l'Électroménager et la Domotique, en complément de
// Boulanger (même positionnement, deux enseignes concurrentes toutes deux avec un
// vrai programme d'affiliation actif). Leur programme passe par Awin. URL de
// recherche vérifiée manuellement (bouton "Voir tous les résultats" de leur barre de
// recherche) : /nav/recherche?text=<requête>.
export function lienDarty(recherche: string): string {
  const cible = `https://www.darty.com/nav/recherche?text=${encodeURIComponent(nomPourRecherche(recherche))}`;
  if (DARTY_AFFILIATE_PREFIX) {
    return `${DARTY_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

// Piscine Center est pertinent pour la catégorie Piscine (leur programme d'affiliation
// self-service "Piscine Center CPA" est confirmé actif sur le réseau Kwanko, août 2026).
// Contrairement à Boulanger/Darty/Conforama/Cdiscount, leur moteur de recherche est un
// widget JS tiers (Doofinder) qui n'expose aucune URL de résultats avec paramètre de
// requête simple (testé : ni le formulaire natif PrestaShop `/recherche?...s=`, ni une
// navigation classique au clic/Entrée ne changent l'URL — tout se joue en overlay AJAX).
// Même logique que Norauto : on retombe sur la page d'accueil plutôt que deviner une URL
// de recherche qui casserait silencieusement. À revoir une fois le compte Kwanko
// approuvé : leurs outils de génération de liens donneront l'URL exacte à utiliser.
export function lienPiscineCenter(): string {
  const cible = "https://www.piscine-center.net/";
  if (PISCINE_CENTER_AFFILIATE_PREFIX) {
    return `${PISCINE_CENTER_AFFILIATE_PREFIX}${encodeURIComponent(cible)}`;
  }
  return cible;
}

export type Marchand =
  | "amazon"
  | "manomano"
  | "decathlon"
  | "norauto"
  | "boulanger"
  | "conforama"
  | "cdiscount"
  | "darty"
  | "piscine-center";

// On n'a pas le droit de redistribuer les logos de ces marchands en tant que fichiers
// du site (marques déposées) ; on affiche donc leur favicon public à la volée via le
// service favicon de Google, ce qui identifie visuellement chaque marchand sans copier
// leurs assets.
export const MARCHANDS: Record<Marchand, { nom: string; domaine: string }> = {
  amazon: { nom: "Amazon", domaine: "amazon.fr" },
  manomano: { nom: "ManoMano", domaine: "manomano.fr" },
  decathlon: { nom: "Decathlon", domaine: "decathlon.fr" },
  norauto: { nom: "Norauto", domaine: "norauto.fr" },
  boulanger: { nom: "Boulanger", domaine: "boulanger.com" },
  conforama: { nom: "Conforama", domaine: "conforama.fr" },
  cdiscount: { nom: "Cdiscount", domaine: "cdiscount.com" },
  darty: { nom: "Darty", domaine: "darty.com" },
  "piscine-center": { nom: "Piscine Center", domaine: "piscine-center.net" },
};

// Taille demandée à Google, pas la taille d'affichage (fixée à 14px dans
// LienMarchand.tsx) : à sz=16, le service renvoie parfois une icône générique grise
// (simple lettre) au lieu du vrai logo pour certains domaines (observé sur Amazon) ;
// à sz=64, il renvoie fiablement la vraie icône de marque, y compris pour tous les
// marchands ci-dessus (vérifié manuellement un par un). Le navigateur la redimensionne
// ensuite à l'affichage, avec un rendu plus net qu'une icône nativement petite.
export function faviconUrl(domaine: string, taille = 64): string {
  return `https://www.google.com/s2/favicons?domain=${domaine}&sz=${taille}`;
}

// Marchand(s) spécialisé(s) complémentaire(s) à Amazon/ManoMano selon la catégorie du
// projet — centralisé ici pour que la répartition catégorie → marchand reste à un seul
// endroit plutôt que dupliquée dans chaque composant qui affiche des liens marchands.
// Cdiscount sert de filet généraliste pour les catégories sans spécialiste identifié à
// ce jour. Électroménager/Domotique ont deux enseignes concurrentes pertinentes
// (Boulanger et Darty), affichées toutes les deux plutôt que de trancher arbitrairement.
// Piscine garde aussi Cdiscount en complément de Piscine Center : le lien de ce dernier
// pointe vers la page d'accueil (pas de recherche produit ciblée, voir lienPiscineCenter),
// donc Cdiscount reste utile pour une recherche vraiment ciblée en attendant.
export function marchandsCategoriels(categorie: Categorie, recherche: string): { marchand: Marchand; href: string }[] {
  switch (categorie) {
    case "velo":
      return [{ marchand: "decathlon", href: lienDecathlon(recherche) }];
    case "auto":
      return [{ marchand: "norauto", href: lienNorauto() }];
    case "electromenager":
    case "domotique":
      return [
        { marchand: "boulanger", href: lienBoulanger(recherche) },
        { marchand: "darty", href: lienDarty(recherche) },
      ];
    case "ameublement":
      return [{ marchand: "conforama", href: lienConforama(recherche) }];
    case "piscine":
      return [
        { marchand: "piscine-center", href: lienPiscineCenter() },
        { marchand: "cdiscount", href: lienCdiscount(recherche) },
      ];
    default:
      return [{ marchand: "cdiscount", href: lienCdiscount(recherche) }];
  }
}
