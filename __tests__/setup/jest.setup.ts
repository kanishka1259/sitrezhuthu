// __tests__/setup/jest.setup.ts
import '@testing-library/jest-dom';

// Suppress framer-motion warnings in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const React = require('react');
      return React.createElement('div', props, children);
    },
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Firebase auth context
jest.mock('@/lib/firebase-auth-context', () => ({
  useFirebaseAuth: () => ({
    user: null,
    loading: false,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    signInGoogle: jest.fn(),
    getIdToken: jest.fn().mockResolvedValue('mock-token-123'),
  }),
}));

// Silence console.error for expected errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return;
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
