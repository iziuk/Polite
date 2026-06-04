import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currentFileName = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFileName);
const compat = new FlatCompat({
  baseDirectory: currentDirectory,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
