/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@botfic/shared'],
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
