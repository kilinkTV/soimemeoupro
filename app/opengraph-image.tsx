import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Soi-même ou Pro — comparateur DIY vs artisan, 170 projets chiffrés";

// Image de partage par défaut (Open Graph / Twitter Card), générée dynamiquement
// plutôt que comme fichier statique : évite de maintenir un asset séparé, et reste
// cohérente avec les couleurs de marque (tailwind.config.ts) si elles changent.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "linear-gradient(135deg, #c2410c 0%, #ea580c 55%, #f97316 100%)",
          color: "#fff9f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>
          soimemeoupro.com
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "#ffe4cc" }}>
          FAITES-LE VOUS-MÊME OU FAITES APPEL À UN PRO
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#ffedd5" }}>
          Comparateur gratuit · 170 projets chiffrés
        </div>
      </div>
    ),
    { ...size }
  );
}
