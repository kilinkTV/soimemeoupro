export const metadata = {
  title: "Déclaration d'accessibilité — Soi-même ou Pro",
};

export default function AccessibilitePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Déclaration d&apos;accessibilité
        </h1>
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Établie selon le modèle de déclaration recommandé par le RGAA (Référentiel Général d&apos;Amélioration de
          l&apos;Accessibilité).
        </p>
      </div>

      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100">
        Page à compléter avant mise en ligne : les champs entre crochets [ ] doivent être remplacés par vos
        informations réelles, notamment après réalisation d&apos;un audit RGAA.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Champ d&apos;application</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          L&apos;obligation légale de publier une déclaration d&apos;accessibilité (article 47 de la loi n° 2005-102
          du 11 février 2005, décret n° 2019-768) s&apos;applique en France aux organismes publics ainsi qu&apos;aux
          entreprises privées dont le chiffre d&apos;affaires dépasse 250 millions d&apos;euros. [Vérifier si cette
          obligation s&apos;applique à votre situation.] Cette page est publiée par souci de transparence, que
          l&apos;obligation légale s&apos;applique ou non.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">État de conformité</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Aucun audit RGAA n&apos;a été réalisé à ce jour sur ce site. En l&apos;absence d&apos;audit, l&apos;état de
          conformité ne peut être déclaré que comme suit : <strong>non conforme</strong>. Cette page sera mise à jour
          avec le taux de conformité réel dès qu&apos;un audit aura été effectué.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Résultats des tests</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Non applicable : aucun audit RGAA (échantillon de pages, grille de 106 critères) n&apos;a encore été mené.
          [Ajouter ici la date de l&apos;audit et le lien vers son rapport détaillé une fois réalisé.]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Efforts déjà engagés et limites connues
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Sans audit formel, nous ne pouvons pas garantir une liste exhaustive des contenus non accessibles. Le site
          a toutefois été construit avec les intentions suivantes, non vérifiées par un audit indépendant :
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
          <li>Structure HTML sémantique (titres hiérarchisés, listes, régions de page) plutôt que des divs génériques.</li>
          <li>Mode sombre et contrastes de texte revus pour rester lisibles dans les deux thèmes.</li>
          <li>
            Fenêtres modales (ex. consentement aux cookies) navigables au clavier : ouverture avec focus posé
            automatiquement, touche Échap, et focus contenu à l&apos;intérieur de la fenêtre tant qu&apos;elle est
            ouverte.
          </li>
          <li>Vidéos intégrées avec un intitulé descriptif ; images décoratives masquées aux lecteurs d&apos;écran.</li>
        </ul>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          [Compléter cette liste, et lister ici les points connus comme non accessibles, après un audit RGAA ou des
          retours d&apos;utilisateurs.]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Établissement de cette déclaration
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Cette déclaration a été établie le [date]. [Préciser la méthode d&apos;évaluation utilisée dès qu&apos;un
          audit RGAA aura été réalisé.]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Retour d&apos;information et contact
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Si vous rencontrez un problème d&apos;accessibilité vous empêchant d&apos;accéder à un contenu ou à un
          service du site, vous pouvez nous en informer à l&apos;adresse [adresse e-mail de contact du site].
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Voies de recours</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Si vous constatez un défaut d&apos;accessibilité vous empêchant d&apos;accéder à un contenu ou une des
          prestations du site et que vous nous en faites part, et que vous ne parvenez pas à obtenir de réponse de
          notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au{" "}
          <a
            href="https://www.defenseurdesdroits.fr/saisir/formulaire"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
          >
            Défenseur des droits
          </a>
          .
        </p>
      </section>
    </div>
  );
}
