module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "json"
  ],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/interfaces/index.ts',
    '<rootDir>/src/services/index.ts',
    '<rootDir>/src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
};
