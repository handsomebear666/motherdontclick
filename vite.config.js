import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 这行代码告诉 Vite：遇到 '@' 就把它指向 'src' 目录
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
