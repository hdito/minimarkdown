import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    viteStaticCopy({
      targets: [
        { src: 'locales', dest: './' },
        { src: 'fonts', dest: './' },
      ],
    }),
    react(),
  ],
  base: './',
});
