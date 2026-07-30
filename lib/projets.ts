import projetsData from "@/data/projets.json";
import type { Projet } from "./types";

const projets = projetsData as Projet[];

export function getTousLesProjets(): Projet[] {
  return projets;
}

export function getProjetParId(id: string): Projet | undefined {
  return projets.find((p) => p.id === id);
}
