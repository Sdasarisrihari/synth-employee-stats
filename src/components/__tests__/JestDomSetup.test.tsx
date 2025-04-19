
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Jest DOM Matchers', () => {
  it('should demonstrate Jest DOM matcher functionality', () => {
    render(<div data-testid="test-element">Hello World</div>);
    
    const element = screen.getByTestId('test-element');
    
    // Test various Jest DOM matchers
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');
    expect(element).toBeVisible();
  });
});
