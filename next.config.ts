import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
    ];
  },
  trailingSlash: false,
  poweredByHeader: false,
  // Настройки для лучшей обработки гидратации
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  // Отключаем строгий режим для разработки
  reactStrictMode: false,
};

export default nextConfig;
