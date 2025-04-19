
import { toast } from "sonner";
import { 
  DepartmentStats, 
  SalaryDistribution, 
  AgeDistribution, 
  GenderDistribution, 
  TenureDistribution 
} from "./mockApi";
import { Tables, Insertable } from "./supabase-types";
import { supabase } from "./supabase";

// Rate limiting implementation - simple frontend rate limiting
let lastRequestTime = 0;
const minRequestInterval = 1000; // 1 second between requests

const checkRateLimit = (): boolean => {
  const now = Date.now();
  if (now - lastRequestTime < minRequestInterval) {
    toast.error("Too many requests. Please try again in a moment.");
    return false;
  }
  lastRequestTime = now;
  return true;
};

// Fetch employees with pagination and filtering
export const fetchEmployees = async (
  page = 1,
  pageSize = 10,
  searchTerm = ""
) => {
  if (!checkRateLimit()) return { data: [], count: 0 };

  try {
    let query = supabase.from('employees').select('*', { count: 'exact' });
    
    // Add search if provided
    if (searchTerm) {
      query = query.or(
        `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,department.ilike.%${searchTerm}%,position.ilike.%${searchTerm}%`
      );
    }
    
    // Add pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
      
    if (error) throw error;
    
    return { 
      data: data || [], 
      count: count || 0 
    };
  } catch (error: any) {
    toast.error("Failed to fetch employees: " + error.message);
    console.error("Error fetching employees:", error);
    return { data: [], count: 0 };
  }
};

// Get department statistics
export const getDepartmentStats = async (): Promise<DepartmentStats[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.rpc('get_department_stats');
    
    if (error) throw error;
    console.log("Department stats data:", data);
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch department stats: " + error.message);
    console.error("Error fetching department stats:", error);
    return [];
  }
};

// Get salary distribution
export const getSalaryDistribution = async (): Promise<SalaryDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.rpc('get_salary_distribution');
    
    if (error) throw error;
    console.log("Salary distribution data:", data);
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch salary distribution: " + error.message);
    console.error("Error fetching salary distribution:", error);
    return [];
  }
};

// Get age distribution
export const getAgeDistribution = async (): Promise<AgeDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.rpc('get_age_distribution');
    
    if (error) {
      console.error("Error in RPC get_age_distribution:", error);
      throw error;
    }
    
    console.log("Age distribution data:", data);
    
    if (!data || data.length === 0) {
      // If no data from RPC, fallback to manual calculation
      console.log("No age distribution from RPC, calculating manually...");
      return calculateAgeDistribution();
    }
    
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch age distribution: " + error.message);
    console.error("Error fetching age distribution:", error);
    // Fallback to manual calculation
    return calculateAgeDistribution();
  }
};

// Manual calculation of age distribution as fallback
const calculateAgeDistribution = async (): Promise<AgeDistribution[]> => {
  try {
    // Query directly from employees table
    const { data, error } = await supabase
      .from('employees')
      .select('age');
      
    if (error) throw error;
    
    if (!data || data.length === 0) return [];
    
    // Create age ranges
    const ageRanges: {[key: string]: number} = {
      'Under 25': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55+': 0
    };
    
    // Count employees in each range
    data.forEach(employee => {
      const age = employee.age;
      if (age < 25) ageRanges['Under 25']++;
      else if (age >= 25 && age <= 34) ageRanges['25-34']++;
      else if (age >= 35 && age <= 44) ageRanges['35-44']++;
      else if (age >= 45 && age <= 54) ageRanges['45-54']++;
      else ageRanges['55+']++;
    });
    
    // Convert to expected format
    const result: AgeDistribution[] = Object.entries(ageRanges).map(([range, count]) => ({
      range,
      count
    }));
    
    console.log("Manually calculated age distribution:", result);
    return result;
  } catch (error: any) {
    console.error("Error in manual age distribution calculation:", error);
    return [];
  }
};

// Get gender distribution
export const getGenderDistribution = async (): Promise<GenderDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    // Query directly from employees table and aggregate gender data
    const { data, error } = await supabase
      .from('employees')
      .select('gender');
      
    if (error) throw error;
    
    if (!data || data.length === 0) return [];
    
    // Manually count gender distribution
    const genderCounts: Record<string, number> = {};
    data.forEach(employee => {
      const gender = employee.gender || 'Unknown';
      genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    });
    
    // Convert to expected format
    const result = Object.entries(genderCounts).map(([gender, count]) => ({
      gender,
      count
    }));
    
    console.log("Gender distribution data:", result);
    return result;
  } catch (error: any) {
    toast.error("Failed to fetch gender distribution: " + error.message);
    console.error("Error fetching gender distribution:", error);
    return [];
  }
};

// Get tenure distribution
export const getTenureDistribution = async (): Promise<TenureDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.rpc('get_tenure_distribution');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch tenure distribution: " + error.message);
    console.error("Error fetching tenure distribution:", error);
    return [];
  }
};

// Insert a batch of employees
export const insertEmployees = async (employees: Insertable<"employees">[]) => {
  if (!checkRateLimit()) return { success: false };

  try {
    const { error } = await supabase
      .from('employees')
      .insert(employees);
      
    if (error) throw error;
    
    toast.success("Employees added successfully!");
    return { success: true };
  } catch (error: any) {
    toast.error("Failed to add employees: " + error.message);
    console.error("Error adding employees:", error);
    return { success: false };
  }
};

// Export employees to CSV
export const exportEmployeesToCSV = async () => {
  if (!checkRateLimit()) return;

  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*');
      
    if (error) throw error;
    if (!data || data.length === 0) {
      toast.warning("No data to export");
      return;
    }
    
    // Convert data to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','), // CSV header row
      ...data.map(row => headers.map(key => {
        // Handle values that might contain commas or quotes
        const value = String(row[key as keyof typeof row] ?? '');
        return value.includes(',') || value.includes('"') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("CSV exported successfully!");
  } catch (error: any) {
    toast.error("Failed to export data: " + error.message);
    console.error("Error exporting data:", error);
  }
};
