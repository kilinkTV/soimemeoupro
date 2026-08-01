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
        <div className="relative space-y-4">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Calculateur gratuit
          </span>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Faites-le vous-même, ou appelez un pro !
          </h1>
          <p className="max-w-2xl text-slate-600">
            Chiffrez réellement le compromis avant de vous lancer dans vos travaux,
            l&apos;entretien de votre véhicule, de votre jardin, de votre électroménager ou
            de votre vélo : argent économisé, temps perdu, et risque de devoir tout refaire.
          </p>
          <Link
            href="/calculateur"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30"
          >
            Lancer le calculateur
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
