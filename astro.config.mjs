import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import indexnow from 'astro-indexnow';

// https://astro.build/config
export default defineConfig({
  site: 'https://milamassage.com',
  output: 'static',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },

  image: {
    // Permitir imágenes remotas de Sanity CDN
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Deshabilitar optimización automática para evitar problemas de memoria
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },

  vite: {
    build: {
      // Reducir el límite de chunk para evitar problemas de memoria
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },

  integrations: [
    sitemap(),
    indexnow({
      hostname: 'milamassage.com',
      apiKey: process.env.INDEXNOW_KEY,
    }),
  ],
});
