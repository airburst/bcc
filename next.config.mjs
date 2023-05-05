// import { env } from "./src/env/server.mjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import bundleAnalyzer from "@next/bundle-analyzer";
import pwa from "next-pwa";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = pwa({
  dest: "public",
});

const appConfig = withBundleAnalyzer(
  defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    experimental: {
      appDir: true,
    },
  })
);

// Export PWA in production only
export default process.env.NODE_ENV === "production"
  ? withPWA(appConfig)
  : appConfig;
