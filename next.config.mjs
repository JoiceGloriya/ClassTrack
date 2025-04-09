/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // protocol: 'https',
                hostname: 'images.pexels.com',
                // port: '',
                // pathname: '/**',
            },
        ],
        domains: ['res.cloudinary.com'],
    }
};


export default nextConfig;
