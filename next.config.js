/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivityPosition: "bottom-left"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**example.com', //TODO: update later
      },
    ],
  },
}

module.exports = nextConfig
