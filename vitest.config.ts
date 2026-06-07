import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      exclude: [
        "**/*.d.ts", // TypeScript declarations are type-only and have no runtime behavior.
        "**/*.test.{ts,tsx}", // Test files verify production code and must not inflate coverage.
        "**/index.ts", // Barrel files only re-export public APIs.
        "apps/web/next-env.d.ts", // Next.js generated declaration artifact.
        "apps/web/src/entities/phrase/model/types.ts", // Phrase model contracts are type-only.
        "packages/shared/src/types/**", // Shared package type contracts are type-only.
      ],
      include: ["apps/web/src/**/*.{ts,tsx}", "packages/shared/src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage/web",
      thresholds: {
        100: true,
        perFile: true,
      },
    },
    environment: "jsdom",
    include: ["apps/web/src/**/*.test.{ts,tsx}", "packages/shared/src/**/*.test.ts"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
