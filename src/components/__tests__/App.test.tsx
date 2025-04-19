
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the auth context
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App Component', () => {
  it('should redirect to login when user is not authenticated', () => {
    const queryClient = new QueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // Since user is null (not authenticated), we should see the login page
    expect(screen.getByText(/Sign in to access your dashboard/i)).toBeInTheDocument();
  });
});

