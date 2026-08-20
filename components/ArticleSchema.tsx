import { SITE_URL } from "@/lib/site";

// Données structurées Article (schema.org) sur les pages guides, pour le signal de
// fraîcheur (dateModified) que cherchent les moteurs IA — même principe que
// FaqSchema.tsx : un <script> JSON-LD, invisible, sans effet sur l'affichage.
// Pas de datePublished : aucune date de publication réelle n'est suivie par article
// (seule la date de build/déploiement l'est, via dateMajISO), donc en inventer une
// serait trompeur plutôt qu'informatif.
// author = l'Organization (pas de Person) : le site est édité par un particulier qui
// préserve son anonymat (voir mentions-legales), cohérent avec le "Par l'équipe
// Soi-même ou Pro" déjà affiché à côté de ce schema sur la page.
export default function ArticleSchema({
  titre,
  description,
  url,
  dateModifiee,
}: {
  titre: string;
  description: string;
  url: string;
  dateModifiee: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: titre,
          description,
          url: `${SITE_URL}${url}`,
          dateModified: dateModifiee,
          author: { "@id": `${SITE_URL}#organization` },
          publisher: { "@id": `${SITE_URL}#organization` },
        }),
      }}
    />
  );
}
