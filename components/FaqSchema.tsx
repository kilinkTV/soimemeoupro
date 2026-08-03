import type { QuestionReponse } from "@/lib/faq";

// Données structurées FAQPage (schema.org) à partir des Q/R de la section FAQ d'un
// guide, pour les rich snippets Google. Même principe que le BreadcrumbList de
// FilAriane.tsx : un <script> JSON-LD, invisible, sans effet sur l'affichage.
export default function FaqSchema({ items }: { items: QuestionReponse[] }) {
  if (items.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.reponse },
          })),
        }),
      }}
    />
  );
}
