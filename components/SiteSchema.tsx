import { SITE_URL } from "@/lib/site";

// Données structurées Organization + WebSite (schema.org) sur le layout racine, pour
// l'identité du site dans les résultats de recherche (logo, nom). Même principe que
// FaqSchema.tsx / HowToSchema.tsx : un <script> JSON-LD, invisible, sans effet sur
// l'affichage. Pas de SearchAction : la recherche du site est un composant client
// sans page dédiée avec paramètre d'URL, donc rien à cibler pour l'instant.
export default function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}#organization`,
              name: "Soi-même ou Pro",
              url: SITE_URL,
              logo: `${SITE_URL}/logo-icon.png`,
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              url: SITE_URL,
              name: "Soi-même ou Pro",
              inLanguage: "fr-FR",
              publisher: { "@id": `${SITE_URL}#organization` },
            },
          ],
        }),
      }}
    />
  );
}
