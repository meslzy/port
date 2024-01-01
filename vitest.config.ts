import {defineConfig} from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: [
        "source/**/*.ts",
      ],
      reporter: [
        "html",
      ],
    },
  },
});