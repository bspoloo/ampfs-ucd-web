import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // distDir: 'build',
  output: 'standalone',
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL
  },
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }]
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/',
      },
      // Auth
      {
        source: '/login',
        destination: '/pages/auth/login',
      },
      {
        source: '/register',
        destination: '/pages/auth/register',
      },
      // Dashboard
      {
        source: '/dashboard',
        destination: '/pages/dashboard',
      },
      {
        source: '/dashboard/championships',
        destination: '/pages/dashboard/championships',
      },
      {
        source: '/dashboard/matches',
        destination: '/pages/dashboard/matches',
      },
      {
        source: '/dashboard/requests',
        destination: '/pages/dashboard/requests',
      },
      {
        source: '/dashboard/championships/:path*',
        destination: '/pages/dashboard/championships/:path*',
      },
      // Other roles pages
      {
        source: '/player',
        destination: '/pages/player',
      },
      {
        source: '/referee',
        destination: '/pages/referee',
      },
      {
        source: '/unauthorized',
        destination: '/pages/unauthorized',
      },
      {
        source: '/auth/error',
        destination: '/pages/auth/error',
      },

      //always add in the final
      // {
      //   source: '/:path*',
      //   destination: '/'
      // }
    ]
  }
};

export default nextConfig;
