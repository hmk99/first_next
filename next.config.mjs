/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ["image.tmdb.org", "gnmc-dz.com"],
  },
  experimental: {
    optimizeCss: false
  }
};

export default nextConfig;