const devWarnProdError = process.env.NODE_ENV === 'production' ? 'error' : 'warn';
const devOffProdError = process.env.NODE_ENV === 'production' ? 'error' : 'off';

module.exports = {
  root: true,
  ignorePatterns: ['node_modules', 'src/types/types.ts', 'src/shims-tsx.d.ts'],
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended', 'prettier'],
  rules: {
    'comma-dangle': devWarnProdError,
    'no-console': devOffProdError,
    'no-debugger': devWarnProdError,
    'no-extra-semi': devWarnProdError,
    'no-multiple-empty-lines': devWarnProdError,
    'no-unused-vars': 'off', // using @typescript-eslint/no-unused-vars
    'object-curly-spacing': [devWarnProdError, 'always'],
    semi: [devWarnProdError, 'always'],
    'space-before-function-paren': [devWarnProdError, { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
    'space-in-parens': devWarnProdError,
    quotes: [devWarnProdError, 'single'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-unused-vars': [devWarnProdError, { args: 'all', argsIgnorePattern: '^_' }], // not using no-unused-vars
    'jest/expect-expect': 'error',
    'jest/no-commented-out-tests': 'warn',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'warn',
    'jest/no-identical-title': 'error',
    'jest/prefer-strict-equal': 'warn',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
