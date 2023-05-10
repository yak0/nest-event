module.exports = {
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
