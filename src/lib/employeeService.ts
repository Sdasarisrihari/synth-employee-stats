
import { toast } from "sonner";
import { 
  DepartmentStats, 
  SalaryDistribution, 
  AgeDistribution, 
  GenderDistribution, 
  TenureDistribution 
} from "./mockApi";
import { Tables, Insertable } from "./supabase-types";

// API base URL - this should point to the Django backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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

// Helper function to get auth headers for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Fetch employees with pagination and filtering
export const fetchEmployees = async (
  page = 1,
  pageSize = 10,
  searchTerm = ""
) => {
  if (!checkRateLimit()) return { data: [], count: 0 };

  try {
    let url = `${API_URL}/employees/?page=${page}&page_size=${pageSize}`;
    
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    
    return { 
      data: result.results, 
      count: result.count 
    };
  } catch (error: any) {
    toast.error("Failed to fetch employees: " + error.message);
    return { data: [], count: 0 };
  }
};

// Get department statistics
export const getDepartmentStats = async (): Promise<DepartmentStats[]> => {
  if (!checkRateLimit()) return [];

  try {
    const response = await fetch(`${API_URL}/analytics/departments/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
    const response = await fetch(`${API_URL}/analytics/salary-distribution/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error("Failed to fetch salary distribution: " + error.message);
    return [];
  }
};

// Get age distribution
export const getAgeDistribution = async (): Promise<AgeDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const response = await fetch(`${API_URL}/analytics/age-distribution/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error("Failed to fetch age distribution: " + error.message);
    return [];
  }
};

// Get gender distribution
export const getGenderDistribution = async (): Promise<GenderDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const response = await fetch(`${API_URL}/analytics/gender-distribution/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error("Failed to fetch gender distribution: " + error.message);
    return [];
  }
};

// Get tenure distribution
export const getTenureDistribution = async (): Promise<TenureDistribution[]> => {
  if (!checkRateLimit()) return [];

  try {
    const response = await fetch(`${API_URL}/analytics/tenure-distribution/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error("Failed to fetch tenure distribution: " + error.message);
    return [];
  }
};

// Insert a batch of employees
export const insertEmployees = async (employees: Insertable<"employees">[]) => {
  if (!checkRateLimit()) return { success: false };

  try {
    const response = await fetch(`${API_URL}/employees/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(employees)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
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
    const response = await fetch(`${API_URL}/export/employees/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Get the CSV content
    const blob = await response.blob();
    
    // Create a download link and trigger it
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
