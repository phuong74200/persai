import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: false,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
      overlay: {
        initialIsOpen: false,
      },
    }),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
    }),
    sentryVitePlugin({
      org: "phuong-jd",
      project: "javascript-react",
    }),
    sentryVitePlugin({
      org: "phuong-jd",
      project: "javascript-react",
    }),
    sentryVitePlugin({
      org: "phuong-jd",
      project: "javascript-react",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    minify: true,
    sourcemap: true,
  },
});
