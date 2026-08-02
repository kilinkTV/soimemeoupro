import type { Categorie } from "./types";

export interface CategorieInfo {
  id: Categorie;
  href: string;
  label: string;
}

export const CATEGORIES: CategorieInfo[] = [
  { id: "auto", href: "/auto", label: "Auto & Moto" },
  { id: "maison", href: "/maison", label: "Maison" },
  { id: "jardin", href: "/jardin", label: "Jardin" },
  { id: "electromenager", href: "/electromenager", label: "Électroménager" },
  { id: "velo", href: "/velo", label: "Vélo" },
  { id: "piscine", href: "/piscine", label: "Piscine" },
  { id: "domotique", href: "/domotique", label: "Domotique" },
  { id: "ameublement", href: "/ameublement", label: "Ameublement" },
  { id: "electricite", href: "/electricite", label: "Électricité" },
  { id: "plomberie", href: "/plomberie", label: "Plomberie" },
  { id: "energie", href: "/energie", label: "Énergie" },
];

export const LABEL_PAR_CATEGORIE = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<Categorie, string>;
