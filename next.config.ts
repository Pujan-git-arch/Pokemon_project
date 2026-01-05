/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"], // ✅ allow PokéAPI sprite host
  },
};

module.exports = nextConfig;
