import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueGodRays",
      fileName: (format) => `vue-godrays.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "three"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          three: "THREE",
        },
      },
    },
  },
});
