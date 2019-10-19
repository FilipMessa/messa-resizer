
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: "babel-eslint",
  extends: ["wesbos"],
  plugins: [
    "flowtype",
    "eslint-plugin-flowtype"
  ],
  rules: {
    // extra prettier rules
    ...require('eslint-config-prettier/flowtype').rules,
    "import/no-extraneous-dependencies": [
      ERROR,
      {
        devDependencies: ["src/*.stories.js", "webpack.config.js", "**/*.test.js"],
      },
    ],
     // flowtype (https://github.com/gajus/eslint-plugin-flowtype)
    "flowtype/array-style-complex-type": OFF,
    "flowtype/array-style-simple-type": OFF,
    "flowtype/arrow-parens": OFF,
    "flowtype/define-flow-type": WARN,
    "flowtype/newline-after-flow-annotation": [ERROR, "always"],
    "flowtype/no-dupe-keys": ERROR,
    "flowtype/no-existential-type": ERROR, // https://github.com/facebook/flow/issues/6308
    "flowtype/no-flow-fix-me-comments": OFF,
    "flowtype/no-mixed": OFF,
    "flowtype/no-mutable-array": OFF,
    "flowtype/no-primitive-constructor-types": WARN,
    "flowtype/no-types-missing-file-annotation": ERROR,
    "flowtype/no-unused-expressions": [ERROR, { allowTaggedTemplates: true }],
    "flowtype/no-weak-types": OFF,
    "flowtype/require-compound-type-alias": OFF,
    "flowtype/require-exact-type": OFF,
    "flowtype/require-indexer-name": OFF,
    "flowtype/require-inexact-type": ERROR,
    "flowtype/require-parameter-type": OFF,
    "flowtype/require-readonly-react-props": OFF,
    "flowtype/require-return-type": OFF,
    "flowtype/require-types-at-top": OFF,
    "flowtype/require-valid-file-annotation": [ERROR, "always"],
    "flowtype/require-variable-type": OFF,
    "flowtype/sort-keys": OFF,
    "flowtype/spread-exact-type": OFF,
    "flowtype/type-id-match": OFF,
    "flowtype/type-import-style": OFF,
    "flowtype/use-flow-type": WARN,
    "flowtype/valid-syntax": OFF,
  },
}