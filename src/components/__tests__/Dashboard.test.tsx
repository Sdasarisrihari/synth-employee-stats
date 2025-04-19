
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('Dashboard', () => {
  it('renders department stats section', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Department Statistics/i)).toBeInTheDocument();
  });

  it('renders salary distribution section', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Salary Distribution/i)).toBeInTheDocument();
  });
});
