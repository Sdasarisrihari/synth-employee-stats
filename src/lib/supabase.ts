
import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-types';

const supabaseUrl = "https://dvqtxzigrpeoopgeamqw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cXR4emlncnBlb29wZ2VhbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzQxMzQsImV4cCI6MjA2MDYxMDEzNH0.BzHHFI-bmd7W1Pc9rx5tr6PhpmxEDMdtNlkGF7ArySU";

// Create Supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
