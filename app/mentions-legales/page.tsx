export const metadata = {
  title: "Mentions légales & CGU — Soi-même ou Pro",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Mentions légales &amp; conditions générales d&apos;utilisation
        </h1>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Éditeur du site</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Statut : particulier, site édité à titre non professionnel (aucune activité commerciale à ce jour).
          <br />
          Conformément à l&apos;article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique (LCEN), l&apos;éditeur d&apos;un site non professionnel peut préserver son
          anonymat vis-à-vis du public : son identité complète a été communiquée à l&apos;hébergeur ci-dessous, qui
          la conserve de façon confidentielle et ne peut la communiquer qu&apos;à l&apos;autorité judiciaire, sur
          réquisition.
          <br />
          Contact : benjmug@gmail.com
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Directeur de la publication</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          L&apos;éditeur du site (voir ci-dessus), à titre non professionnel.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Hébergement</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Vercel Inc.
          <br />
          440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis
          <br />
          privacy@vercel.com
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
          <a href="/politique-de-confidentialite" className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            politique de confidentialité
          </a>{" "}
          pour le détail des cookies et données concernés.
        </p>
      </section>

      <hr className="border-slate-200 dark:border-slate-800" />

      <div>
        <h2 id="cgu" className="scroll-mt-24 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Conditions générales d&apos;utilisation (CGU)
        </h2>
      </div>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Objet</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Les présentes conditions générales d&apos;utilisation encadrent l&apos;accès et l&apos;usage du site
          soimemeoupro, outil gratuit de comparaison indicative entre réaliser un projet soi-même (DIY) et faire
          appel à un professionnel (entretien et travaux : maison, auto &amp; moto, jardin, électroménager, vélo,
          piscine, domotique, ameublement, électricité, plomberie, énergie). En accédant au site, vous acceptez sans
          réserve les présentes CGU.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Nature du service, absence de conseil professionnel
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Les estimations de coût, de temps et de risque fournies par le comparateur sont indicatives ; voir notre
          page{" "}
          <a href="/methodologie" className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            Méthodologie et sources
          </a>{" "}
          pour le détail de leur construction. Elles ne constituent ni un devis, ni un conseil technique, juridique
          ou professionnel personnalisé. Avant d&apos;entreprendre des travaux, en particulier ceux touchant à
          l&apos;électricité, au gaz, à la structure du bâtiment ou à la sécurité, il est recommandé de consulter un
          professionnel qualifié et de vérifier la réglementation en vigueur.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Comptes et données utilisateur</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Le site ne propose ni création de compte ni identifiant : les fonctionnalités &laquo; Mes projets &raquo;
          et &laquo; Favoris &raquo; enregistrent vos choix uniquement dans le stockage local de votre navigateur
          (localStorage), sans transmission ni conservation sur nos serveurs. Voir la{" "}
          <a href="/politique-de-confidentialite" className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            politique de confidentialité
          </a>{" "}
          pour le détail.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Responsabilité</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          L&apos;éditeur du site (voir « Éditeur du site » ci-dessus) ne peut être tenu responsable des dommages directs
          ou indirects résultant de l&apos;utilisation des informations du site, notamment d&apos;une décision de
          réaliser soi-même des travaux sur la base des estimations fournies. Le site s&apos;efforce d&apos;assurer
          l&apos;exactitude des informations publiées mais ne garantit pas leur exhaustivité ni leur mise à jour
          permanente.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Disponibilité du site</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          L&apos;accès au site peut être interrompu, notamment pour des raisons de maintenance, sans obligation de
          préavis ni d&apos;indemnisation.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Liens hypertextes et sites tiers</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Le site contient des liens vers des sites tiers (enseignes marchandes, administrations, sources citées).
          L&apos;éditeur du site n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur
          contenu.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Modification des CGU</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Les présentes CGU peuvent être modifiées à tout moment ; la version applicable est celle en vigueur au
          moment de la consultation du site.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Droit applicable et litiges</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Les présentes CGU sont soumises au droit français. En cas de litige et à défaut de résolution amiable, les
          tribunaux français compétents seront saisis, conformément aux règles de compétence territoriale de droit
          commun.
        </p>
      </section>
    </div>
  );
}
