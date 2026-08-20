import type { MetadataRoute } from "next";

// Requis par l'export statique (output: "export") : ce fichier ne dépend
// d'aucune donnée de requête, donc génération statique explicite.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Soi-même ou Pro",
    short_name: "SoiMêmeOuPro",
    description: "Comparateur du coût réel du DIY face à un professionnel, projet par projet.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#f8fafc",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
