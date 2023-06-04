/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
        {
          source: '/beeimg',
          destination: 'https://beeimg.com/api/upload/file/json/'
        },
      ],
      experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
