import Image from "next/image";
import type { Categorie } from "@/lib/types";

// Photos libres de droits (Pexels, licence gratuite, aucune attribution requise) —
// mêmes conditions d'usage que les photos du carrousel d'accueil. Choisies pour
// montrer le geste plutôt qu'un décor : ça garde un lien visuel avec le "faire
// soi-même" du site plutôt qu'une simple photo d'ambiance.
const IMAGE_PAR_CATEGORIE: Record<Categorie, string> = {
  auto: "/images/categories/auto.jpg",
  maison: "/images/categories/maison.jpg",
  jardin: "/images/categories/jardin.jpg",
  electromenager: "/images/categories/electromenager.jpg",
  velo: "/images/categories/velo.jpg",
  piscine: "/images/categories/piscine.jpg",
  domotique: "/images/categories/domotique.jpg",
  ameublement: "/images/categories/ameublement.jpg",
  electricite: "/images/categories/electricite.jpg",
  plomberie: "/images/categories/plomberie.jpg",
  energie: "/images/categories/energie.jpg",
};

// Bandeau photo discret en tête de page catégorie : purement atmosphérique (le titre
// et sa description juste en dessous portent déjà l'information), d'où l'alt vide.
export default function BanniereCategorie({ categorie }: { categorie: Categorie }) {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800 sm:h-64">
      <Image
        src={IMAGE_PAR_CATEGORIE[categorie]}
        alt=""
        fill
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
