import '@testing-library/jest-dom';
import { expect, jest } from '@jest/globals';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
}));

// Mock SWR
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(() => ({ userId: 'test-user-id' })),
  useAuth: jest.fn(() => ({
    isLoaded: true,
    userId: 'test-user-id',
  })),
})); 