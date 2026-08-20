// Prévient Bing/Yandex/Seznam (protocole IndexNow — Google ne le supporte pas) que
// le site a été redéployé, en soumettant toutes les URLs du sitemap fraîchement
// généré. Appelé uniquement par le deploy_command de Cloudflare Workers Builds
// (après `wrangler deploy`), jamais par `npm run build` en local : on ne veut pas
// notifier IndexNow à chaque build de vérification pendant le développement.
//
// La clé doit correspondre au nom du fichier public/<clé>.txt (preuve de propriété
// du domaine exigée par le protocole) : si l'un change, l'autre doit suivre.
const CLE = "daf46cf1400fbc3f033a566cdf70a3bd";
const HOTE = "soimemeoupro.fr";

async function main() {
  const fs = await import("node:fs/promises");
  let sitemap;
  try {
    sitemap = await fs.readFile("out/sitemap.xml", "utf8");
  } catch (erreur) {
    console.warn("IndexNow : sitemap introuvable (out/sitemap.xml), rien à soumettre.", erreur.message);
    return;
  }

  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((correspondance) => correspondance[1]);
  if (urls.length === 0) {
    console.warn("IndexNow : aucune URL trouvée dans le sitemap.");
    return;
  }

  try {
    const reponse = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOTE,
        key: CLE,
        keyLocation: `https://${HOTE}/${CLE}.txt`,
        urlList: urls,
      }),
    });
    console.log(`IndexNow : ${urls.length} URLs soumises, statut ${reponse.status}`);
  } catch (erreur) {
    // Best-effort : IndexNow n'est qu'un signal secondaire (Google ne l'utilise pas),
    // une panne de leur API ne doit jamais faire échouer le déploiement.
    console.warn("IndexNow : échec de la notification (ignoré) —", erreur.message);
  }
}

main();
