/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
