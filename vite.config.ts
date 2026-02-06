import { readdirSync } from "fs";
import path, { resolve } from "path";

import { defineConfig } from "vite";
import { createMpaPlugin, Page } from "vite-plugin-virtual-mpa";
import topLevelAwait from "vite-plugin-top-level-await";
import react from '@vitejs/plugin-react';

const pages = readdirSync(resolve(__dirname, "src/pages"));
const examples = readdirSync(resolve(__dirname, "src/example/pages"));

export default defineConfig({
  define: {
    PAGES: pages
      .filter(i => i !== "index"),
    EXAMPLES: examples,
  },
  plugins: [
    react(),
    topLevelAwait(),
    createMpaPlugin({
      template: "template.html",
      pages: [
        ...pages.map((page) => {
          return {
            name: page,
            filename: `${page}.html`,
            entry: `/src/pages/${page}/main.ts`,
            data: {
              title: page,
            },
          } as Page;
        }),
        ...examples.map((page) => {
          return {
            name: `examples-${page}`,
            filename: `examples/${page}.html`,
            entry: `/src/example/pages/${page}/main.ts`,
            data: {
              title: page,
            },
          } as Page;
        }),
      ],
      rewrites: [
        {
          from: /^\/$/,
          to: "/index.html",
        },
      ],
    }),
  ]
});
