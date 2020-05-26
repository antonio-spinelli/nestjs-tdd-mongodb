module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
}
