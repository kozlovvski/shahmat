module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ["**/*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": 0,
      },
    },
  ],
};
