import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },

  test: {
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "html", "json-summary", "json"],
    },

    projects: [
      {
        extends: true,

        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./tests/setup.ts"],
        },
      },

      {
        extends: true,

        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],

        test: {
          name: "storybook",

          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",

            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
