
/// <reference types="@testing-library/jest-dom" />
/// <reference types="vitest" />

// This file augments the DOM testing library with jest-dom matchers
import '@testing-library/jest-dom';

// Declare global Jest matchers from jest-dom
declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeInTheDocument(): T;
      toBeVisible(): T;
      toHaveFocus(): T;
      toHaveTextContent(text: string | RegExp): T;
      toHaveAttribute(attr: string, value?: any): T;
      toHaveClass(...classNames: string[]): T;
      toHaveStyle(css: Record<string, any>): T;
      toContainElement(element: HTMLElement | null): T;
      toContainHTML(html: string): T;
    }
  }
}

// Export to ensure the module is treated as a module
export {};
