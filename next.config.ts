import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse (via pdfjs-dist) tente de charger un worker par un chemin
  // relatif à son propre module ; le bundler Next le déplace et casse ce
  // chemin. En le laissant "externe", il est chargé tel quel depuis
  // node_modules au runtime, sans être bundlé — voir app/api/diagnostic.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
};

export default nextConfig;
