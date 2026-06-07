const path = require("node:path");

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/index.ts", // Barrel files only re-export public APIs.
    "!src/**/*.test.{ts,tsx}", // Test files verify production code and must not inflate coverage.
    "!src/entities/phrase/model/types.ts", // Phrase model contracts are type-only.
  ],
  coverageDirectory: "../../coverage/mobile",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["text", "html", "lcov"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@polite/data/(.*)$": "<rootDir>/../../packages/data/$1",
    "^@polite/shared/lib$": "<rootDir>/../../packages/shared/src/lib/index.ts",
    "^@polite/shared/types$": "<rootDir>/../../packages/shared/src/types/index.ts",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
  },
  preset: "jest-expo",
  rootDir: path.resolve(__dirname),
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
};
