
import { faker } from '@faker-js/faker';

// Define types
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  performanceScore: number;
  age: number;
  gender: string;
  location: string;
}

export interface DepartmentStats {
  department: string;
  employeeCount: number;
  averageSalary: number;
  averagePerformance: number;
}

export interface SalaryDistribution {
  range: string;
  count: number;
}

export interface AgeDistribution {
  range: string;
  count: number;
}

export interface GenderDistribution {
  gender: string;
  count: number;
}

export interface TenureDistribution {
  range: string;
  count: number;
}

// Mock API service
export const MockApiService = {
  // Generate synthetic employee data
  generateEmployees: (count: number = 100): Employee[] => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Product', 'Operations'];
    const positions = ['Intern', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Level'];
    const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Singapore'];
    const genders = ['Male', 'Female', 'Non-Binary'];
    
    return Array.from({ length: count }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const gender = faker.helpers.arrayElement(genders);
      const department = faker.helpers.arrayElement(departments);
      const position = faker.helpers.arrayElement(positions);
      
      return {
        id: faker.string.uuid(),
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        department,
        position,
        salary: faker.number.int({ min: 30000, max: 250000 }),
        hireDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        performanceScore: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
        age: faker.number.int({ min: 22, max: 65 }),
        gender,
        location: faker.helpers.arrayElement(locations),
      };
    });
  },

  // Get department statistics
  getDepartmentStats: (employees: Employee[]): DepartmentStats[] => {
    const departments: Record<string, { count: number, totalSalary: number, totalPerformance: number }> = {};
    
    // Calculate totals
    employees.forEach(employee => {
      if (!departments[employee.department]) {
        departments[employee.department] = { count: 0, totalSalary: 0, totalPerformance: 0 };
      }
      departments[employee.department].count += 1;
      departments[employee.department].totalSalary += employee.salary;
      departments[employee.department].totalPerformance += employee.performanceScore;
    });
    
    // Convert to stats array
    return Object.entries(departments).map(([department, stats]) => ({
      department,
      employeeCount: stats.count,
      averageSalary: Math.round(stats.totalSalary / stats.count),
      averagePerformance: Number((stats.totalPerformance / stats.count).toFixed(2)),
    }));
  },
  
  // Get salary distribution
  getSalaryDistribution: (employees: Employee[]): SalaryDistribution[] => {
    const ranges = [
      { min: 0, max: 50000, label: '$0-$50K' },
      { min: 50001, max: 75000, label: '$50K-$75K' },
      { min: 75001, max: 100000, label: '$75K-$100K' },
      { min: 100001, max: 150000, label: '$100K-$150K' },
      { min: 150001, max: Infinity, label: '$150K+' }
    ];
    
    const distribution = ranges.map(range => ({ 
      range: range.label, 
      count: employees.filter(emp => emp.salary >= range.min && emp.salary <= range.max).length 
    }));
    
    return distribution;
  },
  
  // Get age distribution
  getAgeDistribution: (employees: Employee[]): AgeDistribution[] => {
    const ranges = [
      { min: 20, max: 29, label: '20-29' },
      { min: 30, max: 39, label: '30-39' },
      { min: 40, max: 49, label: '40-49' },
      { min: 50, max: 59, label: '50-59' },
      { min: 60, max: 69, label: '60+' }
    ];
    
    const distribution = ranges.map(range => ({ 
      range: range.label, 
      count: employees.filter(emp => emp.age >= range.min && emp.age <= range.max).length 
    }));
    
    return distribution;
  },
  
  // Get gender distribution
  getGenderDistribution: (employees: Employee[]): GenderDistribution[] => {
    const genders = [...new Set(employees.map(emp => emp.gender))];
    
    const distribution = genders.map(gender => ({
      gender,
      count: employees.filter(emp => emp.gender === gender).length
    }));
    
    return distribution;
  },
  
  // Get tenure distribution
  getTenureDistribution: (employees: Employee[]): TenureDistribution[] => {
    const currentDate = new Date();
    const ranges = [
      { min: 0, max: 1, label: '<1 Year' },
      { min: 1, max: 2, label: '1-2 Years' },
      { min: 2, max: 5, label: '2-5 Years' },
      { min: 5, max: 10, label: '5-10 Years' },
      { min: 10, max: 100, label: '10+ Years' }
    ];
    
    const distribution = ranges.map(range => ({ 
      range: range.label, 
      count: employees.filter(emp => {
        const hireDate = new Date(emp.hireDate);
        const tenureYears = (currentDate.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        return tenureYears >= range.min && tenureYears < range.max;
      }).length 
    }));
    
    return distribution;
  },
  
  // Get top performers
  getTopPerformers: (employees: Employee[], count: number = 5): Employee[] => {
    return [...employees]
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, count);
  }
};
