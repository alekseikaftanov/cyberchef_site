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
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
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
  // Внешние пакеты для серверных компонентов
  serverExternalPackages: [],
  // Отключаем строгий режим для разработки
  reactStrictMode: false,
  // Настройки для стабильности гидратации
  compiler: {
    // Отключаем некоторые оптимизации, которые могут вызывать проблемы
    removeConsole: false,
  },
  // Настройки для работы с видео
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    return config;
  },
};

export default nextConfig;
