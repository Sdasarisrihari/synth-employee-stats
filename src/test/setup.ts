
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// This is necessary to fix the TypeScript error for jest-dom extensions
declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeInTheDocument(): T;
      toBeVisible(): T;
      toHaveFocus(): T;
      toHaveTextContent(text: string): T;
    }
  }
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock the ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
