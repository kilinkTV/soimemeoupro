import type { Etape } from "@/lib/howTo";

// Données structurées HowTo (schema.org) à partir des étapes clés d'un guide projet,
// pour les rich snippets Google (liste d'étapes affichée directement dans les
// résultats de recherche). Même principe que FaqSchema.tsx : un <script> JSON-LD,
// invisible, sans effet sur l'affichage.
export default function HowToSchema({ nom, description, etapes }: { nom: string; description: string; etapes: Etape[] }) {
  if (etapes.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: nom,
          description,
          step: etapes.map((etape) => ({
            "@type": "HowToStep",
            name: etape.nom,
            text: etape.texte,
          })),
        }),
      }}
    />
  );
}
