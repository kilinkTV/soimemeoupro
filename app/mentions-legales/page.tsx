export const metadata = {
  title: "Mentions légales — Soi-même ou Pro",
};

export default function MentionsLegalesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Mentions légales</h1>
      </div>

      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100">
        Page à compléter avant mise en ligne : les champs entre crochets [ ] doivent être remplacés par vos
        informations réelles (obligation légale française, articles 6-III de la LCEN).
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Éditeur du site</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          [Nom et prénom, ou raison sociale si vous exercez en société]
          <br />
          Statut : [particulier / auto-entrepreneur / société — SIRET si applicable]
          <br />
          Adresse : [adresse postale, ou adresse du siège social si société]
          <br />
          Contact : [adresse e-mail de contact du site]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Directeur de la publication</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">[Nom et prénom]</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Hébergement</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          [Nom de l&apos;hébergeur]
          <br />
          [Adresse de l&apos;hébergeur]
          <br />
          [Contact / téléphone de l&apos;hébergeur]
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Propriété intellectuelle</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          L&apos;ensemble des contenus de ce site (textes, guides, mise en page) est protégé par le droit d&apos;auteur,
          sauf mention contraire. Les marques citées (Amazon, ManoMano, Leroy Merlin, Castorama, Decathlon,
          etc.) appartiennent à leurs propriétaires respectifs et sont mentionnées à titre informatif, sans lien
          de partenariat autre que les programmes d&apos;affiliation explicitement signalés.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Liens affiliés et publicité</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Ce site utilise des liens affiliés (dont le programme Amazon Partenaires) et, une fois activé, un
          programme publicitaire (Google AdSense). Voir la{" "}
          <a href="/politique-de-confidentialite" className="text-brand-600 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            politique de confidentialité
          </a>{" "}
          pour le détail des cookies et données concernés.
        </p>
      </section>
    </div>
  );
}
