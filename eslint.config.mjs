import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import boundariesPlugin from "eslint-plugin-boundaries";
import checkFile from "eslint-plugin-check-file";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
});

const tsProjects = ["./apps/web/tsconfig.json", "./apps/mobile/tsconfig.json", "./packages/shared/tsconfig.json"];

const sourceFiles = ["apps/**/*.{ts,tsx}", "packages/shared/src/**/*.ts"];
const testFiles = ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "**/testing/**/*.ts", "**/testing/**/*.tsx"];
const runtimeEntryFiles = [
  "**/index.ts",
  "**/index.tsx",
  "apps/web/src/app/**/*.{ts,tsx}",
  "apps/mobile/index.ts",
  "apps/*/src/shared/**/*.{ts,tsx}",
  "packages/shared/src/**/*.{ts,tsx}",
];

const sharedRules = {
  "check-file/filename-naming-convention": ["error", { "**/*.{ts,tsx}": "KEBAB_CASE" }, { ignoreMiddleExtensions: true }],

  eqeqeq: ["error", "always", { null: "ignore" }],
  "no-var": "error",
  "prefer-const": "error",
  "prefer-template": "error",
  "no-eval": "error",
  "no-implied-eval": "error",
  "no-new-func": "error",
  "no-throw-literal": "error",
  "no-return-await": "error",
  "no-await-in-loop": "error",
  "default-case": ["error", { commentPattern: "^no default$" }],
  "no-constructor-return": "error",
  "no-promise-executor-return": "error",
  "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
  "object-shorthand": ["error", "always"],
  "no-useless-rename": "error",
  "no-console": "warn",
  curly: ["error", "multi-line"],
  quotes: ["error", "double", { avoidEscape: true }],
  "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
  "newline-before-return": "warn",
  "no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
  "no-param-reassign": "off",
  "no-plusplus": "off",
  "no-nested-ternary": "off",
  "no-else-return": "off",
  "no-restricted-syntax": "off",
  "consistent-return": "off",
  radix: "off",
  "no-underscore-dangle": "off",
  "no-use-before-define": "off",
  "no-shadow": "off",
  "no-useless-constructor": "off",
  "prefer-destructuring": "warn",

  "import/order": [
    "error",
    {
      groups: ["type", "external", "builtin", "internal", "parent", "sibling", "index", "unknown"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],
  "import/first": "error",
  "import/newline-after-import": "error",
  "import/export": "error",
  "import/no-mutable-exports": "error",
  "import/extensions": [
    "error",
    "never",
    { gif: "always", ico: "always", jpeg: "always", jpg: "always", png: "always", svg: "always", webp: "always", json: "always" },
  ],
  "no-duplicate-imports": "error",
  "import/no-cycle": "warn",
  "import/no-unresolved": "error",
  "import/named": "off",
  "import/prefer-default-export": "off",
  "import/no-extraneous-dependencies": "off",
  "import/no-import-module-exports": "off",
  "import/no-internal-modules": [
    "error",
    {
      forbid: ["@app/*/**", "@widgets/*/**", "@features/*/**", "@entities/*/**", "@shared/*/*/**"],
    },
  ],

  "boundaries/element-types": ["off"],
  "boundaries/dependencies": [
    "error",
    {
      default: "disallow",
      rules: [
        {
          from: { type: "app" },
          allow: { to: { type: ["app", "pages", "widgets", "features", "entities", "shared"] } },
        },
        {
          from: { type: "pages" },
          allow: { to: { type: ["widgets", "features", "entities", "shared"] } },
        },
        {
          from: { type: "widgets" },
          allow: { to: { type: ["features", "entities", "shared"] } },
        },
        {
          from: { type: "features" },
          allow: { to: { type: ["entities", "shared"] } },
        },
        {
          from: { type: "entities" },
          allow: { to: { type: "shared" } },
        },
        {
          from: { type: "shared" },
          allow: { to: { type: "shared" } },
        },
      ],
    },
  ],
  "boundaries/no-private": "off",
  "unused-imports/no-unused-imports": "error",
  "@next/next/no-html-link-for-pages": "off",

  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_",
    },
  ],
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "variable",
      format: ["camelCase", "UPPER_CASE"],
    },
    {
      selector: "variable",
      types: ["function"],
      format: ["camelCase", "PascalCase"],
    },
    {
      selector: "function",
      format: ["camelCase", "PascalCase"],
    },
    {
      selector: "variable",
      types: ["boolean", "number", "string"],
      format: ["UPPER_CASE", "strictCamelCase"],
    },
    {
      selector: "variable",
      types: ["boolean"],
      format: ["StrictPascalCase"],
      prefix: ["is", "should", "has", "can", "did", "will"],
    },
    {
      selector: "classProperty",
      format: ["PascalCase", "camelCase"],
      leadingUnderscore: "forbid",
    },
    {
      selector: "classProperty",
      types: ["boolean"],
      format: ["StrictPascalCase"],
      prefix: ["is", "should", "has", "can", "did", "will"],
    },
    {
      selector: "classProperty",
      types: ["boolean"],
      modifiers: ["private"],
      format: ["StrictPascalCase"],
      prefix: ["_is", "_should", "_has", "_can", "_did", "_will"],
    },
    {
      selector: ["classProperty", "classMethod"],
      modifiers: ["private"],
      format: ["StrictPascalCase", "strictCamelCase"],
      leadingUnderscore: "require",
    },
    {
      selector: "parameter",
      format: ["camelCase"],
      leadingUnderscore: "allow",
    },
    {
      selector: "property",
      format: ["UPPER_CASE", "PascalCase", "camelCase"],
      leadingUnderscore: "allow",
    },
    {
      selector: "parameterProperty",
      modifiers: ["private"],
      format: ["strictCamelCase"],
      leadingUnderscore: "allow",
    },
    {
      selector: "objectLiteralProperty",
      format: null,
      modifiers: ["requiresQuotes"],
    },
    {
      selector: "typeProperty",
      format: null,
      filter: { regex: "^[a-z][a-z0-9]*(_[a-z0-9]+)+$", match: true },
    },
    {
      selector: "typeProperty",
      format: null,
      filter: { regex: "^(data|aria)-", match: true },
    },
    {
      selector: "enumMember",
      format: null,
    },
    {
      selector: "typeLike",
      format: ["PascalCase"],
    },
    {
      selector: "typeAlias",
      format: ["PascalCase"],
      custom: {
        regex: "^T[A-Z]",
        match: true,
      },
    },
    {
      selector: "interface",
      format: ["PascalCase"],
      custom: {
        regex: "^I[A-Z]",
        match: true,
      },
    },
    {
      selector: "import",
      format: null,
    },
  ],
  "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
  "@typescript-eslint/no-dupe-class-members": "error",
  "@typescript-eslint/no-invalid-this": "error",
  "@typescript-eslint/no-loop-func": "error",
  "@typescript-eslint/no-shadow": "error",
  "@typescript-eslint/no-use-before-define": "error",
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/explicit-module-boundary-types": "warn",
  "@typescript-eslint/explicit-member-accessibility": ["warn", { overrides: { constructors: "no-public" } }],
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unsafe-member-access": "warn",
  "@typescript-eslint/no-unsafe-assignment": "warn",
  "@typescript-eslint/no-unsafe-argument": "warn",
  "@typescript-eslint/no-unsafe-call": "warn",
  "@typescript-eslint/no-unsafe-return": "warn",
  "@typescript-eslint/unbound-method": "warn",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-misused-promises": "warn",
  "@typescript-eslint/restrict-template-expressions": "warn",
  "@typescript-eslint/restrict-plus-operands": "warn",
  "@typescript-eslint/no-unnecessary-type-assertion": "warn",
  "@typescript-eslint/no-useless-constructor": "warn",

  "react-hooks/set-state-in-effect": "error",
  "react-hooks/set-state-in-render": "error",
};

export default defineConfig([
  globalIgnores([
    ".ai/**",
    ".next/**",
    ".turbo/**",
    "apps/*/.expo/**",
    "apps/*/.next/**",
    "apps/*/.turbo/**",
    "apps/*/node_modules/**",
    "build/**",
    "coverage/**",
    "node_modules/**",
    "out/**",
    "next-env.d.ts",
    "apps/web/next-env.d.ts",
    "**/*.config.js",
    "**/*.config.mjs",
    "**/eslint.config.mjs",
  ]),
  ...compat.config({
    plugins: ["import"],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: tsProjects,
        },
      },
    },
  }),
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...fixupConfigRules(compat.extends("prettier")),
  {
    files: sourceFiles,
    plugins: {
      boundaries: fixupPluginRules(boundariesPlugin),
      "check-file": checkFile,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: tsProjects,
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: tsProjects,
        },
      },
      react: {
        version: "detect",
      },
      "boundaries/elements": [
        { type: "app", pattern: "apps/*/src/app/*" },
        { type: "app", pattern: "apps/*/index.ts" },
        { type: "pages", pattern: "apps/*/src/pages/*" },
        { type: "widgets", pattern: "apps/*/src/widgets/*" },
        { type: "features", pattern: "apps/*/src/features/*" },
        { type: "entities", pattern: "apps/*/src/entities/*" },
        { type: "shared", pattern: "apps/*/src/shared/*" },
        { type: "shared", pattern: "packages/shared/src/*" },
      ],
      "boundaries/ignore": testFiles,
    },
    rules: sharedRules,
  },
  {
    files: runtimeEntryFiles,
    rules: {
      "import/no-unused-modules": "off",
    },
  },
  {
    files: testFiles,
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/unbound-method": "off",
      "boundaries/dependencies": "off",
      "boundaries/no-private": "off",
      "import/no-unused-modules": "off",
    },
  },
]);
