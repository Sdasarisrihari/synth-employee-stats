
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";

const Login = () => {
  const { user } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Employee Analytics</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>
        <AuthForm />
        
        <div className="mt-8 text-center max-w-md text-sm text-muted-foreground">
          <p>This is a demo application that integrates with a Supabase PostgreSQL database.</p>
          <p className="mt-2">Create an account to generate and visualize synthetic employee data.</p>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Employee Analytics Dashboard
      </footer>
    </div>
  );
};

export default Login;
