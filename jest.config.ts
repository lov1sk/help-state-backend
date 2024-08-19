export default {
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  // to be used with swc
  // transform: {
  //   '^.+\\.(t|j)s?$': ['@swc/jest'],
  // },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/$1',
  },
};
