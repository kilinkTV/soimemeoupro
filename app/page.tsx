import Link from "next/link";
import CategoriesGrid from "@/components/CategoriesGrid";
import ProduitsPopulaires from "@/components/ProduitsPopulaires";
import CarrouselProjets, { type SlideCarrousel } from "@/components/CarrouselProjets";
import { getOutilsPopulaires, getProjetParId } from "@/lib/projets";

// Sélection basée sur un classement Google Trends (France) réalisé le 2026-07-31 —
// voir mémoire du projet pour la méthode (pas de vraies statistiques de vues du site).
const PROJETS_POPULAIRES_IDS = [
  "terrasse-deck",
  "plaquettes-de-frein",
  "filtre-air-habitacle",
  "gazon-synthetique",
  "changement-batterie-velo-electrique",
] as const;

const IMAGES_PROJETS_POPULAIRES: Record<(typeof PROJETS_POPULAIRES_IDS)[number], string> = {
  "terrasse-deck": "/images/carrousel/terrasse-deck.jpg",
  "plaquettes-de-frein": "/images/carrousel/plaquettes-de-frein.jpg",
  "filtre-air-habitacle": "/images/carrousel/filtre-air-habitacle.jpg",
  "gazon-synthetique": "/images/carrousel/gazon-synthetique.jpg",
  "changement-batterie-velo-electrique": "/images/carrousel/batterie-velo-electrique.jpg",
};

export default function HomePage() {
  const outilsPopulaires = getOutilsPopulaires();
  const slidesCarrousel: SlideCarrousel[] = PROJETS_POPULAIRES_IDS.flatMap((id) => {
    const projet = getProjetParId(id);
    if (!projet) return [];
    return [{ id, nom: projet.nom, href: `/projets/${id}`, image: IMAGES_PROJETS_POPULAIRES[id] }];
  });

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-orange-50 p-8 sm:p-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="relative space-y-5">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Comparateur gratuit · 170 projets chiffrés
          </span>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Faire soi-même ou appeler un pro : comparez avant de vous lancer
          </h1>
          <p className="max-w-2xl text-slate-600">
            SoiMemeOuPro.com chiffre le coût réel du DIY face à un professionnel, projet par
            projet : auto &amp; moto, maison, jardin, électroménager, vélo, piscine, domotique,
            ameublement, électricité, plomberie, énergie. Renseignez votre projet, on calcule
            l&apos;argent économisé, le temps que ça prend vraiment et le risque de devoir
            finalement payer un pro en rattrapage.
          </p>

          <ol className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                titre: "Choisissez votre projet",
                detail: "Parmi 170 fiches chiffrées, toutes catégories confondues.",
              },
              {
                titre: "Renseignez vos paramètres",
                detail: "Quantité, et si c'est sur votre temps libre ou vos heures de travail.",
              },
              {
                titre: "Comparez, chiffres à l'appui",
                detail: "Coût, temps et risque d'échec : DIY ou artisan.",
              },
            ].map((etape, index) => (
              <li key={etape.titre} className="flex gap-2.5 rounded-xl bg-white/60 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{etape.titre}</span>
                  <span className="text-xs text-slate-500">{etape.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <Link
            href="/comparateur"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30"
          >
            Lancer le comparateur
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Projets populaires</h2>
        <CarrouselProjets slides={slidesCarrousel} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Choisissez une catégorie</h2>
        <CategoriesGrid />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Outils les plus utiles</h2>
          <p className="mt-1 text-sm text-slate-500">
            Les outils qui reviennent le plus souvent dans nos guides — pratique si vous vous
            équipez pour plusieurs projets à la fois.
          </p>
        </div>
        <ProduitsPopulaires outils={outilsPopulaires} />
      </section>
    </div>
  );
}
