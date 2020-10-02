module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    "indent": ["warn", 2, {"ignoredNodes": ["TemplateLiteral"]}],
    "no-template-curly-in-string": "off",
    "no-useless-concat": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "global-require": 0,
    "import/no-unresolved": [2, { caseSensitive: false }],
    'max-len': ["error", { "code": 150 }],
  },
};
