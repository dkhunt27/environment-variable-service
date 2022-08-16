module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: '.coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/index.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
