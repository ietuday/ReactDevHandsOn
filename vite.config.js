import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'vite.config.js', 'eslint.config.js'],
      // thresholds: {
      //   statements: 90,
      //   branches: 90,
      //   functions: 90,
      //   lines: 90,
      // },
    },
  },
});
