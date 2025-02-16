module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}', '!**/src/app.tsx'],
  collectCoverage: true,
  clearMocks: true,
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testEnvironment: 'jest-fixed-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e'],
  setupFilesAfterEnv: [
    '<rootDir>/jest-preset/jest.setup.js',
    '<rootDir>/jest-preset/lottiefiles-mock.tsx',
  ],
};
