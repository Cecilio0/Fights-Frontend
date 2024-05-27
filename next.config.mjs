/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "perronegro.blob.core.windows.net" }],
  },
};

export default nextConfig;
