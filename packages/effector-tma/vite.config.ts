import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "effector-telegram-mini-app",
      fileName: "effector-telegram-mini-app",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["effector", "patronum"],
      output: {
        globals: {
          effector: "effector",
          patronum: "patronum",
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["ajv", "ajv-draft-04"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [
      ...configDefaults.exclude,
      "e2e/*",
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
