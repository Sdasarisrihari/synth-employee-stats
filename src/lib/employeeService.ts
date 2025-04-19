
import { supabase } from "./supabase";
import { toast } from "sonner";
import { Insertable, Tables } from "./supabase-types";
import { 
  DepartmentStats, 
  SalaryDistribution, 
  AgeDistribution, 
  GenderDistribution, 
  TenureDistribution 
} from "./mockApi";

// Rate limiting implementation - simple frontend rate limiting
// For a real app, you'd implement this on the server
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
    let query = supabase
      .from("employees")
      .select("*", { count: "exact" });

    if (searchTerm) {
      query = query.or(
        `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,position.ilike.%${searchTerm}%,department.ilike.%${searchTerm}%`
      );
    }

    const { data, error, count } = await query
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, count: count || 0 };
  } catch (error: any) {
    toast.error("Failed to fetch employees: " + error.message);
    return { data: [], count: 0 };
  }
};

// Get department statistics
export const getDepartmentStats = async (): Promise<DepartmentStats[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.rpc('get_department_stats');
    
    if (error) throw error;
    
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
    
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch salary distribution: " + error.message);
    return [];
  }
};

// Get age distribution
export const getAgeDistribution = async (): Promise<AgeDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.rpc('get_age_distribution');
    
    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch age distribution: " + error.message);
    return [];
  }
};

// Get gender distribution
export const getGenderDistribution = async (): Promise<GenderDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const { data, error } = await supabase.from('employees')
      .select('gender')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const genderCounts: Record<string, number> = {};
        data.forEach(employee => {
          const gender = employee.gender;
          genderCounts[gender] = (genderCounts[gender] || 0) + 1;
        });
        
        return {
          data: Object.entries(genderCounts).map(([gender, count]) => ({
            gender,
            count
          })),
          error: null
        };
      });
    
    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast.error("Failed to fetch gender distribution: " + error.message);
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
    return [];
  }
};

// Insert a batch of employees
export const insertEmployees = async (employees: Insertable<"employees">[]) => {
  if (!checkRateLimit()) return { success: false };

  try {
    const { error } = await supabase
      .from("employees")
      .insert(employees);
    
    if (error) throw error;
    
    toast.success("Employees added successfully!");
    return { success: true };
  } catch (error: any) {
    toast.error("Failed to add employees: " + error.message);
    return { success: false };
  }
};

// Export employees to CSV
export const exportEmployeesToCSV = async () => {
  if (!checkRateLimit()) return;

  try {
    const { data, error } = await supabase
      .from("employees")
      .select("*");
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    // Convert data to CSV format
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
      ).join(",")
    );
    const csv = [headers, ...rows].join("\n");
    
    // Create a blob and download it
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("CSV exported successfully!");
  } catch (error: any) {
    toast.error("Failed to export data: " + error.message);
  }
};
