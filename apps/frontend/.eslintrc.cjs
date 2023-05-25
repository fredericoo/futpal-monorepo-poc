module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["import", "unused-imports", "simple-import-sort"],
  rules: {
    /** No absolute imports */
    "import/no-absolute-path": "error",

    /** Ensures all imports appear before other statements */
    "import/first": ["error"],

    /** Ensures there’s an empty line between imports and other statements */
    "import/newline-after-import": ["warn", { count: 1 }],

    /** Sorts imports automatically */
    "simple-import-sort/imports": "warn",

    /** Ensures no unused imports are present, and only _ prefixed variables can be unused */
    "no-unused-vars": "off",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-router-dom",
            importNames: ["useLoaderData"],
            message:
              "Please import useLoaderData from '@/lib/router-utils' instead.",
          },
          {
            name: "react-router-dom",
            importNames: ["useActionData"],
            message:
              "Please import useActionData from '@/lib/router-utils' instead.",
          },
        ],
      },
    ],
  },

  /** Typescript files */
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
      ],
      rules: {
        "no-restricted-syntax": [
          "warn",
          {
            selector: "TSEnumDeclaration",
            message:
              "Don’t declare enums! Use string literal unions instead, they’re safer and more ergonomic.",
          },
        ],

        "@typescript-eslint/no-unnecessary-condition": "warn",
        "@typescript-eslint/no-unnecessary-type-arguments": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",

        /** Prefer types over interfaces */
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

        "@typescript-eslint/no-confusing-non-null-assertion": "error",

        /** Standardises arrays. Simple arrays use brackets, complex arrays uses generic syntax
         * @example - ❌ `const foo: Array<string> = [];`
         * @example - ✅ `const foo: string[] = [];`
         * @example - ❌ `const foo: ReturnType<typeof bar>[] = [];`
         * @example - ✅ `const foo: Array<ReturnType<typeof bar>> = [];`
         */
        "@typescript-eslint/array-type": ["warn"],

        /** Enforces generics on the cunstructor, not as type annotation.
         * @example - ❌ `const foo: Foo<string> = new Foo();`
         * @example - ✅ `const foo = new Foo<string>();`
         */
        "@typescript-eslint/consistent-generic-constructors": [
          "warn",
          "constructor",
        ],

        /** Prefer Record<X,Y> over {[key: X]: Y} syntax */
        "@typescript-eslint/consistent-indexed-object-style": [
          "warn",
          "record",
        ],

        /** Already handled by unused-imports */
        "@typescript-eslint/no-unused-vars": "off",

        /** React uses that a lot */
        "@typescript-eslint/unbound-method": "off",

        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": true,
            "ts-check": false,
            minimumDescriptionLength: 5,
          },
        ],
      },
    },
  ],
};