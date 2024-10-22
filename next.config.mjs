/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { hostname: "127.0.0.1", port: "8000", protocol: "http" },
        ],
    },
};

export default nextConfig;
