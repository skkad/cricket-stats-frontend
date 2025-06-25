import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public", // folder for generated service worker
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
};

export default withPWA(nextConfig);
