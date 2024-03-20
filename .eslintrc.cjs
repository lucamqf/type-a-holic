module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh", "prettier"],
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/boolean-prop-naming": [
      "warn",
      {
        "rule": "^(is|has|should|can)[A-Z]([A-Za-z0-9]?)+"
      }
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        "callbacksLast": true,
        "shorthandFirst": true,
        "shorthandLast": false,
        "multiline": "last",
        "ignoreCase": true,
        "reservedFirst": true
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
  },
  settings: {
    react: {
      version: "detect",
    }
  }
};
