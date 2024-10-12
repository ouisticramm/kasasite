import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Assurez-vous de remplacer 'nom-de-votre-repo' par le nom réel de votre dépôt GitHub
const repoName = "kasasite";

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // Ajout de la base pour GitHub Pages
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
  },
  esbuild: {
    sourcemap: true,
  },
});
