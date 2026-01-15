// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // your popup entry (stays the same)
        popup: resolve(__dirname, 'popup.html'),
        // NEW: background entry (points to your TS file)
        background: resolve(__dirname, 'src/background.ts'),
      },
      output: {
        // control the filenames Vite writes into dist/
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') {
            // this will create dist/background.js
            return 'background.js';
          }
          if (chunkInfo.name === 'popup') {
            // optional: give popup a nice name, or use assets/[name].js
            return 'assets/popup.js';
          }
          return 'assets/[name].js';
        },
      },
    },
  },
});
