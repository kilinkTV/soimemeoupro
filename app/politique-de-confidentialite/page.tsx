export const metadata = {
  title: "Politique de confidentialité — Soi-même ou Pro",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Politique de confidentialité</h1>
        <p className="text-slate-600 mt-1">
          Ce que ce site fait et ne fait pas de vos données, conformément au RGPD.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Page à compléter avant mise en ligne : le champ [adresse e-mail de contact] doit être renseigné avec vos
        coordonnées réelles.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Responsable du traitement</h2>
        <p className="text-sm text-slate-600">
          Voir les{" "}
          <a href="/mentions-legales" className="text-brand-600 underline hover:text-brand-800">
            mentions légales
          </a>{" "}
          pour l&apos;identité de l&apos;éditeur du site, responsable du traitement des données décrites ci-dessous.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Ce que ce site ne fait pas</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Pas de création de compte, pas de mot de passe, pas de formulaire d&apos;inscription.</li>
          <li>Pas de collecte ni de stockage de votre position géographique par nos serveurs.</li>
          <li>Pas de revente de données personnelles à des tiers.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Géolocalisation (bouton &laquo; Trouver un artisan &raquo;)</h2>
        <p className="text-sm text-slate-600">
          Sur les pages projet, un bouton permet d&apos;ouvrir une recherche Google Maps de professionnels près de chez
          vous. Si vous autorisez la géolocalisation de votre navigateur, votre position n&apos;est utilisée
          qu&apos;une seule fois, côté navigateur, pour construire ce lien vers Google Maps : elle n&apos;est ni envoyée
          à nos serveurs, ni stockée, ni conservée d&apos;une visite à l&apos;autre. Vous pouvez refuser la demande de
          localisation de votre navigateur : le bouton ouvrira alors une recherche générique.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Cookies</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-medium">Cookie</th>
                <th className="px-4 py-3 font-medium">Finalité</th>
                <th className="px-4 py-3 font-medium">Soumis à consentement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">consentement_cookies</td>
                <td className="px-4 py-3 text-slate-600">
                  Mémorise votre choix (accepté/refusé) pour ne pas réafficher le bandeau à chaque visite.
                </td>
                <td className="px-4 py-3 text-slate-600">
                  Non — cookie strictement nécessaire au fonctionnement du consentement lui-même.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Cookies Google AdSense</td>
                <td className="px-4 py-3 text-slate-600">
                  Publicité personnalisée, une fois le programme activé sur ce site.
                </td>
                <td className="px-4 py-3 text-slate-600">Oui — chargés uniquement si vous cliquez sur &laquo; Accepter &raquo;.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600">
          Les liens vers Amazon et ManoMano sont des liens affiliés classiques (identifiant dans l&apos;URL) : ils ne
          déposent pas de cookie de suivi sur ce site avant que vous ne cliquiez dessus et ne quittiez le site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Vos droits</h2>
        <p className="text-sm text-slate-600">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit
          d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur les données vous concernant. Pour
          exercer ces droits, contactez [adresse e-mail de contact]. Vous pouvez également introduire une
          réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline hover:text-brand-800"
          >
            CNIL
          </a>
          .
        </p>
      </section>
    </div>
  );
}
