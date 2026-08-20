import Link from "next/link";
import FilAriane from "@/components/FilAriane";

export const metadata = {
  title: "Méthodologie et sources — Soi-même ou Pro",
  description:
    "D'où viennent les chiffres du comparateur : taux horaires moyens des artisans en France, sources consultées, et limites de la méthode.",
  alternates: { canonical: "/methodologie" },
};

interface Benchmark {
  categorie: string;
  taux: string;
  precision?: string;
  sources: { nom: string; href: string }[];
}

const BENCHMARKS: Benchmark[] = [
  {
    categorie: "Auto & Moto",
    taux: "50 – 90 €/h",
    precision: "garage indépendant ou centre auto (65 à 95 €/h en moyenne nationale ; jusqu'à 130 €/h en concession)",
    sources: [
      { nom: "WikiAuto — Taux horaire mécanique auto", href: "https://www.wikiauto.fr/blog/taux-horaire-mecanique-auto/" },
      { nom: "Garage LGB — Tarif moyen garagiste", href: "https://www.garagelgb.fr/entretien/tarif-moyen-garagiste/" },
      { nom: "Puissance Garage — Tarif moyen garagiste 2026", href: "https://www.puissancedgarage.fr/tarif-moyen-garagiste-2026" },
    ],
  },
  {
    categorie: "Maison",
    taux: "35 – 75 €/h",
    precision: "tous corps de métier du bâtiment confondus (peinture, plomberie, électricité, carrelage…)",
    sources: [
      { nom: "Obat — Tarif horaire artisan BTP", href: "https://www.obat.fr/blog/tarifs-btp/" },
      { nom: "Ootravaux — Tarif horaire maçon", href: "https://www.ootravaux.fr/construction-renovation/maconnerie-fondations/maconnerie/tarif-horaire-macon.html" },
      { nom: "HabitatPresto — Prix horaire artisan par métier", href: "https://www.habitatpresto.com/mag/renovation/prix-horaire-artisan" },
    ],
  },
  {
    categorie: "Jardin",
    taux: "25 – 45 €/h",
    precision: "jardinier auto-entrepreneur (25 à 45 €/h) à entreprise paysagiste structurée (35 à 65 €/h HT)",
    sources: [
      { nom: "Entretien de Jardin — Tarif jardinier", href: "https://www.entretiendejardin.com/tarifs/tarif-jardinier/" },
      { nom: "Allo Jardin — Tarif jardinier 2026", href: "https://www.allojardin.com/tarif-jardinier-entretien-jardin/" },
      { nom: "Obat — Tarif horaire paysagiste", href: "https://travaux.obat.fr/guides/tarif-paysagiste/" },
    ],
  },
  {
    categorie: "Électroménager",
    taux: "40 – 80 €/h",
    precision: "+ un forfait déplacement et diagnostic de 60 à 110 € TTC, hors pièces, quasi systématique",
    sources: [
      { nom: "Travaux.com — Prix réparation électroménager", href: "https://www.travaux.com/cuisine/guide-des-prix/prix-de-reparation-dun-appareil-electromenager" },
      { nom: "MesDépanneurs.fr — Tarifs dépannage électroménager", href: "https://www.mesdepanneurs.fr/blog/prix-depannage-electromenager" },
      { nom: "Top Ménager — Tarifs dépannage électroménager", href: "https://top-menager.fr/tarifs-depannage-electromenager-pour-petit-gros-appareils/" },
    ],
  },
  {
    categorie: "Vélo",
    taux: "70 – 75 €/h TTC",
    precision: "tarif de main d'œuvre pratiqué en atelier",
    sources: [
      { nom: "Cycle Service — Tarifs atelier", href: "https://cycleservice.fr/tarifs" },
      { nom: "L'atelier qui roule — Services et tarifs", href: "https://latelierquiroule.fr/tarif/" },
      { nom: "Rêve de Vélo — Tarifs atelier", href: "https://www.revedevelo.com/nos-tarifs-ateliers-27.html" },
    ],
  },
  {
    categorie: "Piscine",
    taux: "50 – 90 €/h",
    precision: "moyenne autour de 65 € HT, + déplacement de 20 à 46 €",
    sources: [
      { nom: "Docteur Piscine — Tarif entretien piscine", href: "https://docteur-piscine.com/entretien/tarif-entretien-piscine/" },
      { nom: "Obat — Tarif pisciniste", href: "https://travaux.obat.fr/guides/tarif-pisciniste/" },
      { nom: "Travaux.com — Prix entretien piscine", href: "https://www.travaux.com/jardin-et-exterieur/guide-des-prix/prix-de-lentretien-dune-piscine" },
    ],
  },
  {
    categorie: "Domotique",
    taux: "50 – 70 €/h",
    precision: "électricien spécialisé domotique/IRVE (généralement 10 à 30 % au-dessus d'un électricien généraliste), jusqu'à 85 €/h en Île-de-France",
    sources: [
      { nom: "Travaux.com — Prix installation domotique", href: "https://www.travaux.com/electricite/guide-des-prix/prix-dune-installation-dune-reparation-domotique" },
      { nom: "Mon Club Elec — Tarif horaire électricien", href: "https://www.mon-club-elec.fr/tarif-electricien-2025/" },
      { nom: "Solodevis — Tarif horaire électricien 2026", href: "https://www.solodevis.fr/tarif-horaire-electricien/" },
    ],
  },
  {
    categorie: "Ameublement",
    taux: "35 – 90 €/h",
    precision: "tapissier/rembourreur (moyenne autour de 60 €/h) à menuisier/ébéniste (40 à 80 €/h)",
    sources: [
      { nom: "Obat — Tarif tapissier", href: "https://travaux.obat.fr/guides/tarif-tapissier/" },
      { nom: "Galerie Création — Tarif tapissier d'ameublement", href: "https://tarif.galerie-creation.com/_s/tarif-main-d-oeuvre-tapissier-d-ameublement/1360357/" },
      { nom: "Travaux.com — Tarif horaire menuisier", href: "https://www.travaux.com/fenetre-porte/guide-des-prix/tarif-horaire-menuisier" },
    ],
  },
  {
    categorie: "Électricité",
    taux: "35 – 95 €/h",
    precision: "moyenne nationale autour de 65 €/h ; débutant ~40 €/h, jusqu'à 70-100 €/h en Île-de-France ; + déplacement de 20 à 50 €",
    sources: [
      { nom: "Travaux.com — Prix d'un électricien", href: "https://www.travaux.com/electricite/guide-des-prix/prix-dun-electricien" },
      { nom: "Mon Club Elec — Tarif horaire électricien 2026", href: "https://www.mon-club-elec.fr/tarif-electricien-2025/" },
      { nom: "Solodevis — Tarif horaire électricien 2026", href: "https://www.solodevis.fr/tarif-horaire-electricien/" },
    ],
  },
  {
    categorie: "Plomberie",
    taux: "45 – 75 €/h HT",
    precision: "auto-entrepreneur 35-50 €/h à Qualibat/RGE 55-80 €/h ; forfait dépannage simple (fuite, mitigeur, débouchage) 80-250 € TTC tout compris",
    sources: [
      { nom: "Travaux.com — Prix d'un plombier", href: "https://www.travaux.com/plomberie/guide-des-prix/prix-dun-plombier" },
      { nom: "NeedHelp — Prix plombier 2026", href: "https://www.needhelp.com/content/article/prix-plombier-2026" },
      { nom: "TarifArtisan — Tarif plombier 2026", href: "https://www.tarifartisan.fr/tarif-plombier/" },
    ],
  },
  {
    categorie: "Énergie",
    taux: "40 – 80 €/h",
    precision: "chauffagiste généraliste (jusqu'à 70-140 €/h en Île-de-France) ; installateur solaire RGE 50-75 €/h",
    sources: [
      { nom: "MesDépanneurs.fr — Tarifs moyens chauffagiste", href: "https://www.mesdepanneurs.fr/blog/tarifs-moyens-chauffagiste" },
      { nom: "Travaux.com — Tarif chauffagiste", href: "https://www.travaux.com/chauffage/guide-des-prix/tarif-chauffagiste" },
      { nom: "Potentiel Solaire — Prix main d'œuvre solaire", href: "https://www.potentielsolaire.com/prix-main-oeuvre-solaire" },
    ],
  },
];

export default function MethodologiePage() {
  return (
    <div className="space-y-8">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "Méthodologie et sources" }]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Méthodologie et sources</h1>
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          D&apos;où viennent les chiffres du comparateur, et ce qu&apos;ils ne sont pas.
        </p>
      </div>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Ce que représente le prix &laquo; artisan &raquo;</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Pour chaque projet, le prix affiché côté &laquo; Faire appel à un artisan &raquo; est une estimation tout
          compris (matériel + main d&apos;œuvre), calibrée puis recoupée avec les taux horaires moyens réellement
          constatés en France par métier (tableau ci-dessous, sources à l&apos;appui). Elle n&apos;est pas tirée d&apos;un devis
          réel ni d&apos;une base de données officielle : aucune ne recense de prix par micro-tâche (par ex. &laquo; changer
          une résistance de four &raquo;) à l&apos;échelle nationale.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Point important qui explique pourquoi une intervention de 10 minutes coûte rarement 10 minutes × taux
          horaire : la quasi-totalité des artisans facturent un <strong>forfait minimum de déplacement et
          d&apos;intervention</strong> (généralement 20 à 110 € selon le métier, cf. sources), qui domine le prix des
          tâches courtes bien plus que le taux horaire pur.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Pour les projets facturés à la quantité (m², mètre linéaire...), ce plancher est directement appliqué
          dans le calcul : repeindre 1 m² n&apos;affiche donc pas un prix artisan dérisoire proportionnel au m², mais
          le forfait minimum réel en dessous duquel aucun artisan ne se déplace (environ 400 € pour un chantier
          peinture/sol, 90 € pour une intervention électrique simple, selon les métiers &mdash; voir les guides des
          projets concernés). Au-delà de ce plancher, le prix reste proportionnel à la quantité : c&apos;est une
          approximation raisonnable, les vraies grilles pro étant aussi dégressives sur les très grandes surfaces
          (ce que ce calculateur ne modélise pas, faute de devis réels par projet pour caler cette dégressivité).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Taux horaires moyens par catégorie</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Taux horaire moyen</th>
                <th className="px-4 py-3 font-medium">Précision</th>
                <th className="px-4 py-3 font-medium">Sources</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((b) => (
                <tr key={b.categorie} className="border-b border-slate-100 last:border-0 align-top dark:border-slate-800">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{b.categorie}</td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap dark:text-slate-300">{b.taux}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{b.precision}</td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {b.sources.map((s) => (
                        <li key={s.href}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
                          >
                            {s.nom}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Sources consultées en août 2026. Les tarifs réels varient fortement selon la région (Île-de-France et
          grandes métropoles généralement 15 à 25 % au-dessus de la moyenne nationale), l&apos;urgence de
          l&apos;intervention et le professionnel choisi — demandez toujours plusieurs devis avant de vous engager.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Le reste du calcul</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Le temps DIY est estimé à partir du temps professionnel multiplié par un facteur selon votre niveau
          déclaré. Le risque d&apos;échec (probabilité de devoir finalement payer un pro en rattrapage) et son coût
          associé sont également estimés par projet, pas mesurés. Voir le détail du calcul dans{" "}
          <Link href="/comparateur" className="text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
            le comparateur
          </Link>
          , où chaque composante du coût est désormais affichée séparément.
        </p>
      </section>
    </div>
  );
}

