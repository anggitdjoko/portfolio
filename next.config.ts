import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/portfolio',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    reactStrictMode: true,
    transpilePackages: ['three'],
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
