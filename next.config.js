/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ["yzyjttocciydqnybhqne.supabase.co"],
  },
};

module.exports = nextConfig
