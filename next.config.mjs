/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "", // No port needed
        pathname: "/**", // Allow any path under this hostname
      },
    ],
  },
};

export default nextConfig;
