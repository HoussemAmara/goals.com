/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8000',
            pathname: '/media/**',
          },
          {
            protocol: 'https',
            hostname: 'secure.gravatar.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
