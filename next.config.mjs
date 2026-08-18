/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100% statique : le site n'a aucune route API ni contenu dépendant
  // de la requête, ce qui permet un hébergement gratuit sans restriction
  // d'usage commercial (Cloudflare Pages, GitHub Pages...), contrairement au
  // plan Hobby de Vercel qui interdit l'affiliation/la pub.
  output: "export",
  images: {
    // L'optimisation d'image de Next.js nécessite un serveur ; indisponible
    // en export statique, donc images servies telles quelles.
    unoptimized: true,
  },
};

export default nextConfig;
