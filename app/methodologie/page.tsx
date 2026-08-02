import Link from "next/link";

export const metadata = {
  title: "Méthodologie et sources — Soi-même ou Pro",
  description:
    "D'où viennent les chiffres du comparateur : taux horaires moyens des artisans en France, sources consultées, et limites de la méthode.",
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
    precision: "garage indépendant ou centre auto (jusqu'à 130 €/h en concession)",
    sources: [
      { nom: "WikiAuto — Taux horaire mécanique auto", href: "https://www.wikiauto.fr/blog/taux-horaire-mecanique-auto/" },
      { nom: "Garage LGB — Tarif moyen garagiste", href: "https://www.garagelgb.fr/entretien/tarif-moyen-garagiste/" },
    ],
  },
  {
    categorie: "Maison",
    taux: "35 – 75 €/h",
    precision: "tous corps de métier du bâtiment confondus (peinture, plomberie, électricité, carrelage…)",
    sources: [
      { nom: "Obat — Tarif horaire artisan BTP", href: "https://www.obat.fr/blog/tarifs-btp/" },
      { nom: "Ootravaux — Tarif horaire maçon", href: "https://www.ootravaux.fr/construction-renovation/maconnerie-fondations/maconnerie/tarif-horaire-macon.html" },
    ],
  },
  {
    categorie: "Jardin",
    taux: "25 – 45 €/h",
    precision: "jardinier auto-entrepreneur à entreprise paysagiste",
    sources: [
      { nom: "Entretien de Jardin — Tarif jardinier", href: "https://www.entretiendejardin.com/tarifs/tarif-jardinier/" },
      { nom: "Allo Jardin — Tarif jardinier 2026", href: "https://www.allojardin.com/tarif-jardinier-entretien-jardin/" },
    ],
  },
  {
    categorie: "Électroménager",
    taux: "40 – 80 €/h",
    precision: "+ un forfait déplacement et diagnostic de 60 à 110 € TTC, hors pièces, quasi systématique",
    sources: [
      { nom: "Travaux.com — Prix réparation électroménager", href: "https://www.travaux.com/cuisine/guide-des-prix/prix-de-reparation-dun-appareil-electromenager" },
      { nom: "MesDépanneurs.fr — Tarifs dépannage électroménager", href: "https://www.mesdepanneurs.fr/blog/prix-depannage-electromenager" },
    ],
  },
  {
    categorie: "Vélo",
    taux: "70 – 75 €/h TTC",
    precision: "tarif de main d'œuvre pratiqué en atelier",
    sources: [
      { nom: "Cycle Service — Tarifs atelier", href: "https://cycleservice.fr/tarifs" },
      { nom: "L'atelier qui roule — Services et tarifs", href: "https://latelierquiroule.fr/tarif/" },
    ],
  },
  {
    categorie: "Piscine",
    taux: "50 – 90 €/h",
    precision: "moyenne autour de 65 € HT, + déplacement de 20 à 40 €",
    sources: [
      { nom: "Docteur Piscine — Tarif entretien piscine", href: "https://docteur-piscine.com/entretien/tarif-entretien-piscine/" },
      { nom: "Obat — Tarif pisciniste", href: "https://travaux.obat.fr/guides/tarif-pisciniste/" },
    ],
  },
  {
    categorie: "Domotique",
    taux: "50 – 70 €/h",
    precision: "électricien spécialisé, jusqu'à 80 €/h en Île-de-France",
    sources: [
      { nom: "Travaux.com — Prix installation domotique", href: "https://www.travaux.com/electricite/guide-des-prix/prix-dune-installation-dune-reparation-domotique" },
      { nom: "Mon Club Elec — Tarif horaire électricien", href: "https://www.mon-club-elec.fr/tarif-electricien-2025/" },
    ],
  },
  {
    categorie: "Ameublement",
    taux: "35 – 90 €/h",
    precision: "tapissier/rembourreur, moyenne autour de 60 €/h",
    sources: [
      { nom: "Obat — Tarif tapissier", href: "https://travaux.obat.fr/guides/tarif-tapissier/" },
      { nom: "Galerie Création — Tarif tapissier d'ameublement", href: "https://tarif.galerie-creation.com/_s/tarif-main-d-oeuvre-tapissier-d-ameublement/1360357/" },
    ],
  },
];

export default function MethodologiePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Méthodologie et sources</h1>
        <p className="text-slate-600 mt-1">
          D&apos;où viennent les chiffres du comparateur, et ce qu&apos;ils ne sont pas.
        </p>
      </div>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Ce que représente le prix &laquo; artisan &raquo;</h2>
        <p className="text-sm text-slate-600">
          Pour chaque projet, le prix affiché côté &laquo; Faire appel à un artisan &raquo; est une estimation tout
          compris (matériel + main d&apos;œuvre), calibrée puis recoupée avec les taux horaires moyens réellement
          constatés en France par métier (tableau ci-dessous, sources à l&apos;appui). Elle n&apos;est pas tirée d&apos;un devis
          réel ni d&apos;une base de données officielle : aucune ne recense de prix par micro-tâche (par ex. &laquo; changer
          une résistance de four &raquo;) à l&apos;échelle nationale.
        </p>
        <p className="text-sm text-slate-600">
          Point important qui explique pourquoi une intervention de 10 minutes coûte rarement 10 minutes × taux
          horaire : la quasi-totalité des artisans facturent un <strong>forfait minimum de déplacement et
          d&apos;intervention</strong> (généralement 20 à 110 € selon le métier, cf. sources), qui domine le prix des
          tâches courtes bien plus que le taux horaire pur.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Taux horaires moyens par catégorie</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Taux horaire moyen</th>
                <th className="px-4 py-3 font-medium">Précision</th>
                <th className="px-4 py-3 font-medium">Sources</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((b) => (
                <tr key={b.categorie} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="px-4 py-3 font-medium text-slate-900">{b.categorie}</td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{b.taux}</td>
                  <td className="px-4 py-3 text-slate-500">{b.precision}</td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {b.sources.map((s) => (
                        <li key={s.href}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 underline hover:text-brand-800"
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
        <p className="text-xs text-slate-400">
          Sources consultées en août 2026. Les tarifs réels varient fortement selon la région (Île-de-France et
          grandes métropoles généralement 15 à 25 % au-dessus de la moyenne nationale), l&apos;urgence de
          l&apos;intervention et le professionnel choisi — demandez toujours plusieurs devis avant de vous engager.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Le reste du calcul</h2>
        <p className="text-sm text-slate-600">
          Le temps DIY est estimé à partir du temps professionnel multiplié par un facteur selon votre niveau
          déclaré. Le risque d&apos;échec (probabilité de devoir finalement payer un pro en rattrapage) et son coût
          associé sont également estimés par projet, pas mesurés. Voir le détail du calcul dans{" "}
          <Link href="/comparateur" className="text-brand-600 underline hover:text-brand-800">
            le comparateur
          </Link>
          , où chaque composante du coût est désormais affichée séparément.
        </p>
      </section>
    </div>
  );
}
