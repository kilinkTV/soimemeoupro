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
    <div className="space-y-10">
      <section className="space-y-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
        <h1 className="text-3xl font-bold text-slate-900">Faire vous-même ou appeler un pro ?</h1>
        <p className="text-slate-600">
          Chiffrez réellement le compromis avant de vous lancer dans vos travaux,
          l&apos;entretien de votre véhicule, de votre jardin, de votre électroménager ou
          de votre vélo : argent économisé, temps perdu, et risque de devoir tout refaire.
        </p>
        <Link
          href="/calculateur"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700"
        >
          Lancer le calculateur
        </Link>
      </section>

      <section>
        <CarrouselProjets slides={slidesCarrousel} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Choisissez une catégorie</h2>
        <CategoriesGrid />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Matériel le plus utile</h2>
        <p className="text-sm text-slate-500">
          Le matériel qui revient le plus souvent dans nos guides — pratique si vous vous
          équipez pour plusieurs projets à la fois.
        </p>
        <ProduitsPopulaires outils={outilsPopulaires} />
      </section>
    </div>
  );
}
