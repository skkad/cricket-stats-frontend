import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public", // folder for generated service worker
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // output: "export", // using this option will generate a static export of your Next.js app , you will be able to use routing of next.js
};

export default withPWA(nextConfig);
