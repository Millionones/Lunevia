import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Silence the multi-lockfile workspace-root warning by pinning the root here.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Serve modern formats; Next negotiates AVIF -> WebP -> original.
    formats: ["image/avif", "image/webp"],
    // Allow the crisper hero banner (quality 90) alongside the default 75.
    qualities: [75, 90],
    // Cache optimized derivatives aggressively.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "djwonpcpwhtovzdkcdbt.supabase.co" },
      { protocol: "https", hostname: "api-lunevia.onrender.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // Tree-shake large libraries so only the used components ship.
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/lab",
      "@mui/x-date-pickers",
      "lucide-react",
      "lightgallery",
    ],
  },
};

export default nextConfig;
