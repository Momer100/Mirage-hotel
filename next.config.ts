import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Some Sanity packages ship untranspiled TS; let Next compile them.
  transpilePackages: ["sanity", "@sanity/sdk-react", "@sanity/workbench"],
};

export default nextConfig;
