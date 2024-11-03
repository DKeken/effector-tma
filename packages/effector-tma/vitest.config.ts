import { configDefaults, mergeConfig, defineConfig } from "vitest/config";
import { defineViteConfig } from 'smartbundle'

export default defineConfig(async () => {
  const viteConfig = await defineViteConfig();

  return mergeConfig(viteConfig, {
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
    },
  })
});
