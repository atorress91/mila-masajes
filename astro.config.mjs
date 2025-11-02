import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
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
});
