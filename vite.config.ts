import { readdirSync } from "fs";
import path, { resolve } from "path";

import { defineConfig } from "vite";
import { createMpaPlugin, Page } from "vite-plugin-virtual-mpa";
import react from '@vitejs/plugin-react';

const pages = readdirSync(resolve(__dirname, "src/pages"));

export default defineConfig({
  define: {
    PAGES: pages
      .filter(i => i !== "index")
      .sort((a, b) =>
        Number(a.split("_")[0]) - Number(b.split("_")[0]),
      ),
  },
  plugins: [
    react(),
    createMpaPlugin({
      template: "template.html",
      pages: pages.map((page) => {
        return {
          name: page,
          filename: `${page}.html`,
          entry: `/src/pages/${page}/main.ts`,
          data: {
            title: page,
          },
        } as Page;
      }),
      rewrites: [
        {
          from: /^\/$/,
          to: "/index.html",
        },
      ],
    }),
  ]
});
