import { VISUEL_PAR_CATEGORIE } from "@/components/icones/IconesCategories";
import type { Categorie } from "@/lib/types";

export default function TitreCategorie({
  categorie,
  texte,
  niveau: Titre = "h2",
  className = "text-xl font-semibold",
}: {
  categorie: Categorie;
  texte: string;
  niveau?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const visuel = VISUEL_PAR_CATEGORIE[categorie];
  const Icone = visuel.icone;
  return (
    <Titre className={`flex items-center gap-2.5 ${className}`}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${visuel.classesFond}`}>
        <Icone className={`h-4 w-4 ${visuel.classesIcone}`} />
      </span>
      {texte}
    </Titre>
  );
}
