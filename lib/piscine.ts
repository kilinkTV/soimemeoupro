// Les projets "piscine enterrée" se distinguent par un suffixe d'id dédié plutôt que
// par un champ séparé sur Projet (générique à toutes les catégories) : ce suffixe
// suffit à distinguer les deux espaces de la catégorie piscine (page catégorie,
// projets similaires...), sans toucher au schéma partagé.
export function estPiscineEnterree(id: string): boolean {
  return id.endsWith("-piscine-enterree");
}
