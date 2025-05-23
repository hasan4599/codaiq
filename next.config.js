/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keine experimental.appDir-Flag mehr nötig:
  // Der /app-Ordner wird ab Next.js 13.4+ automatisch erkannt.
  // Hier kannst du weitere Konfigurationen hinzufügen, z. B.:
  //
  // images: {
  //   domains: ['example.com'],
  // },
  // webpack(config) { … return config; },
};

module.exports = nextConfig;
