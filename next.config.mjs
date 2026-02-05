/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
   
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vegrootcom-backend.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;