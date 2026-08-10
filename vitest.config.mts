import { defineConfig } from "vitest/config";

// Tests unitaires purs (pas de composants React à monter pour l'instant) : pas besoin
// d'environnement DOM, "node" suffit et reste plus rapide.
export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
