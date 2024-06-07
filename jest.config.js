module.exports = {
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    passWithNoTests: true
  };
  