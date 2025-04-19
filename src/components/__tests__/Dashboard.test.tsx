
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';

// Mock the useAuth hook
vi.mock('@/context/AuthContext', async () => {
  const actual = await vi.importActual('@/context/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: { email: 'test@example.com' },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    }),
  };
});

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {component}
      </AuthProvider>
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
  
  it('renders demographics section', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Age Distribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender Distribution/i)).toBeInTheDocument();
  });
});
