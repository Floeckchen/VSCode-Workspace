import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

console.log(tseslint.config.recommended);

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: { globals: globals.node },
    ignores: ["**/template/**/*"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
