/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.datocms-assets.com',
      },
    ],
  },
};

module.exports = nextConfig;
