import type { Categorie } from "@/lib/types";
import { srcSetResponsive } from "@/lib/images";

// Photos libres de droits (Pexels, licence gratuite, aucune attribution requise) —
// mêmes conditions d'usage que les photos du carrousel d'accueil. Choisies pour
// montrer le geste plutôt qu'un décor : ça garde un lien visuel avec le "faire
// soi-même" du site plutôt qu'une simple photo d'ambiance.
// Largeur des JPEG sources (public/images/categories/) : nécessaire pour construire
// le srcset responsive (lib/images.ts), next/image ne pouvant pas le générer lui-même
// en export statique (unoptimized: true).
const IMAGE_PAR_CATEGORIE: Record<Categorie, { chemin: string; largeur: number }> = {
  auto: { chemin: "/images/categories/auto.jpg", largeur: 1600 },
  maison: { chemin: "/images/categories/maison.jpg", largeur: 1600 },
  jardin: { chemin: "/images/categories/jardin.jpg", largeur: 1600 },
  electromenager: { chemin: "/images/categories/electromenager.jpg", largeur: 1600 },
  velo: { chemin: "/images/categories/velo.jpg", largeur: 1600 },
  piscine: { chemin: "/images/categories/piscine.jpg", largeur: 1600 },
  domotique: { chemin: "/images/categories/domotique.jpg", largeur: 1600 },
  ameublement: { chemin: "/images/categories/ameublement.jpg", largeur: 1600 },
  electricite: { chemin: "/images/categories/electricite.jpg", largeur: 1600 },
  plomberie: { chemin: "/images/categories/plomberie.jpg", largeur: 1600 },
  energie: { chemin: "/images/categories/energie.jpg", largeur: 1600 },
};

// Bandeau photo discret en tête de page catégorie : purement atmosphérique (le titre
// et sa description juste en dessous portent déjà l'information), d'où l'alt vide.
// <img> natif plutôt que next/image : `unoptimized: true` (export statique) empêche
// next/image de générer un srcset, donc on le construit nous-mêmes.
export default function BanniereCategorie({ categorie }: { categorie: Categorie }) {
  const { chemin, largeur } = IMAGE_PAR_CATEGORIE[categorie];
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800 sm:h-64">
      <img
        src={chemin}
        srcSet={srcSetResponsive(chemin, largeur)}
        sizes="(min-width: 1024px) 896px, 100vw"
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
