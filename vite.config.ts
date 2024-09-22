import MillionLint from "@million/lint";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, PluginOption } from "vite";
import svgr from "vite-plugin-svgr";

const _plugins = [
  react(),
  svgr({
    svgrOptions: {
      exportType: "named",
      svgo: false,
      titleProp: true,
    },
    include: "**/*.svg",
  }),
];
_plugins.unshift(MillionLint.vite() as PluginOption[]);
export default defineConfig({
  plugins: _plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
