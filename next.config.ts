import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bjalogistic.id",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "wgvzgvpqqoluavrwnufi.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
