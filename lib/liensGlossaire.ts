import { getTousLesTermesGlossaire } from "./glossaire";

// Formulations littérales à repérer dans le texte d'un article/guide pour chaque
// terme du glossaire (par ordre de priorité). Ne couvre que les termes qui ont un
// intérêt à être liés en contexte — inutile pour certains (ex. "onduleur" seul est
// trop générique dans certains contextes, mais reste ajouté ici volontairement car il
// n'a pas d'autre sens sur ce site).
const MOTIFS_PAR_TERME: Record<string, string[]> = {
  "nf-c-15-100": ["NF C 15-100", "NF C15-100"],
  "disjoncteur-differentiel": ["disjoncteur différentiel"],
  consuel: ["attestation de conformité électrique", "attestation Consuel", "Consuel"],
  "declaration-prealable": ["déclaration préalable de travaux", "déclaration préalable"],
  "permis-de-construire": ["permis de construire"],
  enedis: ["Enedis"],
  "responsabilite-civile": ["responsabilité civile"],
  "garantie-decennale": ["garantie décennale"],
  autoconsommation: ["autoconsommation"],
  onduleur: ["onduleur"],
  kwc: ["kWc"],
  rge: ["RGE"],
  "clapet-anti-retour": ["clapet anti-retour"],
  disconnecteur: ["disconnecteur"],
  deee: ["DEEE"],
  "eco-organisme": ["éco-organisme", "filière REP"],
  "periode-nidification": ["période de nidification"],
  vae: ["vélo à assistance électrique", "VAE"],
  "arrete-24-mars-1982": ["arrêté du 24 mars 1982"],
};

function echapperRegex(texte: string): string {
  return texte.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface MotifTerme {
  id: string;
  regex: RegExp;
}

// Construit une seule fois au chargement du module : un motif par formulation
// (pas par terme), dans l'ordre où les termes apparaissent dans le glossaire, pour un
// résultat stable d'un article à l'autre.
const MOTIFS: MotifTerme[] = getTousLesTermesGlossaire().flatMap((terme) =>
  (MOTIFS_PAR_TERME[terme.id] ?? []).map((motif) => ({
    id: terme.id,
    regex: new RegExp(`\\b${echapperRegex(motif)}\\b`, "i"),
  }))
);

// Ajoute un lien vers le glossaire sur la première occurrence de chaque terme
// reconnu, pour qu'un lecteur qui tombe sur "NF C 15-100" ou "garantie décennale" en
// plein milieu d'un article puisse cliquer pour la définition sans perdre le fil.
// Règles de sécurité pour ne jamais abîmer le contenu existant :
// - une seule occurrence par terme et par article (pas de lien à chaque mention) ;
// - jamais sur une ligne de titre (## ...), pour ne pas lier un intitulé de section ;
// - jamais sur une ligne qui contient déjà un lien markdown, pour ne jamais imbriquer
//   un lien dans un autre ni toucher à une URL existante ;
// - arrêt à la section FAQ : le corps explicatif au-dessus suffit, et évite toute
//   interaction avec extraireFaqMdx (qui retire de toute façon les liens de son texte).
export function lierPremieresOccurrencesGlossaire(contenu: string): string {
  const lignes = contenu.split("\n");
  const termesDejaLies = new Set<string>();

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i];
    if (/^##\s+FAQ\s*$/i.test(ligne)) break;
    if (/^#{1,6}\s/.test(ligne) || ligne.includes("](")) continue;

    for (const { id, regex } of MOTIFS) {
      if (termesDejaLies.has(id)) continue;
      const correspondance = regex.exec(ligne);
      if (!correspondance) continue;
      const texte = correspondance[0];
      lignes[i] =
        ligne.slice(0, correspondance.index) + `[${texte}](/glossaire#${id})` + ligne.slice(correspondance.index + texte.length);
      termesDejaLies.add(id);
      break;
    }
  }

  return lignes.join("\n");
}
