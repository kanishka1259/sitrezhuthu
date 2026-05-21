// jest.config.ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/__tests__/unit/**/*.test.{ts,tsx}'],
      setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
    },
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/api/**/*.test.ts'],
      setupFilesAfterEnv: ['<rootDir>/__tests__/setup/api.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.ts$': ['ts-jest', {}],
      },
    },
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'store/**/*.ts',
    'app/api/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);
