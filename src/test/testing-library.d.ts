
/// <reference types="@testing-library/jest-dom" />

// This file augments the DOM testing library with jest-dom matchers
import '@testing-library/jest-dom';

// Declare global Jest matchers from jest-dom
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toHaveFocus(): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveAttribute(attr: string, value?: any): R;
    toHaveClass(...classNames: string[]): R;
    toHaveStyle(css: Record<string, any>): R;
    toContainElement(element: HTMLElement | null): R;
    toContainHTML(html: string): R;
  }
}
