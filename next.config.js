/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yzyjttocciydqnybhqne.supabase.co",
      },
    ],
    // domains: ["yzyjttocciydqnybhqne.supabase.co"],
  },
};

module.exports = nextConfig
