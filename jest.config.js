module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  globalSetup: './test/setup.js',
  globalTeardown: './test/teardown.js',
  testEnvironment: './test/mongo-environment.js',
}
