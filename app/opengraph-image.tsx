import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTousLesProjets } from "@/lib/projets";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Requis par l'export statique (output: "export") : cette image ne dépend
// d'aucune donnée de requête, donc génération statique explicite.
export const dynamic = "force-static";

const NOMBRE_PROJETS = getTousLesProjets().length;

export const alt = `Soi-même ou Pro — comparateur DIY vs artisan, ${NOMBRE_PROJETS} projets chiffrés`;

// Photo de fond (outils sur bois, Louis Hansel — licence Unsplash, usage commercial
// libre : https://unsplash.com/photos/Rf9eElW3Qxo). Encodée en base64 car Satori
// (moteur de rendu de next/og) ne peut pas charger un fichier local via un simple src.
const photoFond = readFileSync(join(process.cwd(), "public/images/og/carpentry-tools.jpg")).toString(
  "base64"
);

// Image de partage par défaut (Open Graph / Twitter Card), générée dynamiquement
// plutôt que comme fichier statique : évite de maintenir un asset séparé, et reste
// cohérente avec les couleurs de marque (tailwind.config.ts) si elles changent.
export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
        <img
          src={`data:image/jpeg;base64,${photoFond}`}
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, objectFit: "cover" }}
        />
        {/* Dégradé en couleur de marque (brand-900) : assure la lisibilité du texte
            quelle que soit la luminosité de la photo à cet endroit.
            `top/left/right/bottom` explicites : Satori ne supporte pas le raccourci `inset`,
            qui laissait ce calque replié sur la hauteur de son contenu (texte plaqué en haut). */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 56,
            background:
              "linear-gradient(0deg, rgba(124,45,18,0.92) 0%, rgba(124,45,18,0.6) 45%, rgba(124,45,18,0) 78%)",
          }}
        >
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: "#fff9f2", letterSpacing: -1 }}>
            soimemeoupro.fr
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#ffe4cc", marginTop: 10 }}>
            FAITES-LE VOUS-MÊME OU FAITES APPEL À UN PRO
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#ffedd5", marginTop: 8 }}>
            Comparateur gratuit · {NOMBRE_PROJETS} projets chiffrés
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
