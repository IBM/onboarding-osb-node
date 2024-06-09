module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  passWithNoTests: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/src/config/'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/junit', outputName: 'js-test-results.xml' }]],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
