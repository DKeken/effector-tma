import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
  base: process.env.VITE_BASE_URL || "/effector-tma/",
  plugins: [mkcert()],
});
