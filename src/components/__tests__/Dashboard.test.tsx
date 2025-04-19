
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

// Mock the employee service functions
vi.mock('@/lib/employeeService', () => ({
  fetchEmployees: vi.fn(() => Promise.resolve({ data: [], count: 0 })),
  getDepartmentStats: vi.fn(() => Promise.resolve([])),
  getSalaryDistribution: vi.fn(() => Promise.resolve([])),
  getAgeDistribution: vi.fn(() => Promise.resolve([])),
  getGenderDistribution: vi.fn(() => Promise.resolve([])),
  getTenureDistribution: vi.fn(() => Promise.resolve([])),
  insertEmployees: vi.fn(() => Promise.resolve({ success: true })),
  exportEmployeesToCSV: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
