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
      {
        protocol: "http",
        hostname: "13.60.85.9",
        port: "8081", // No port needed
        pathname: "/**", // Allow any path under this hostname
      },
      {
        protocol: "https",
        hostname: "13.60.85.9",
        port: "8081", // No port needed
        pathname: "/**", // Allow any path under this hostname
      },
    ],
  },
};

export default nextConfig;
