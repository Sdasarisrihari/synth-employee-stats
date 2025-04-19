
import React, { useState, useEffect } from "react";
import { 
  Employee,
  MockApiService,
  DepartmentStats,
  SalaryDistribution,
  AgeDistribution,
  GenderDistribution,
  TenureDistribution
} from "@/lib/mockApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import EmployeeTable from "@/components/EmployeeTable";
import DepartmentChart from "@/components/charts/DepartmentChart";
import SalaryDistributionChart from "@/components/charts/SalaryDistributionChart";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import GenderDistributionChart from "@/components/charts/GenderDistributionChart";
import TenureDistributionChart from "@/components/charts/TenureDistributionChart";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/context/AuthContext";
import { Users, DollarSign, TrendingUp, Building, CalendarDays, Download } from "lucide-react";
import { 
  fetchEmployees,
  getDepartmentStats,
  getSalaryDistribution,
  getAgeDistribution,
  getGenderDistribution,
  getTenureDistribution,
  insertEmployees,
  exportEmployeesToCSV
} from "@/lib/employeeService";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Insertable } from "@/lib/supabase-types";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [employeeCount, setEmployeeCount] = useState<number>(100);
  const queryClient = useQueryClient();
  
  // Queries for fetching data
  const employeesQuery = useQuery({
    queryKey: ['employees'],
    queryFn: () => fetchEmployees(1, 1000), // Get all for analytics
    enabled: !!user
  });

  const departmentStatsQuery = useQuery({
    queryKey: ['departmentStats'],
    queryFn: getDepartmentStats,
    enabled: !!user
  });

  const salaryDistributionQuery = useQuery({
    queryKey: ['salaryDistribution'],
    queryFn: getSalaryDistribution,
    enabled: !!user
  });

  const ageDistributionQuery = useQuery({
    queryKey: ['ageDistribution'],
    queryFn: getAgeDistribution,
    enabled: !!user
  });

  const genderDistributionQuery = useQuery({
    queryKey: ['genderDistribution'],
    queryFn: getGenderDistribution,
    enabled: !!user
  });

  const tenureDistributionQuery = useQuery({
    queryKey: ['tenureDistribution'],
    queryFn: getTenureDistribution,
    enabled: !!user
  });

  // Mutation for adding employee data
  const generateDataMutation = useMutation({
    mutationFn: async () => {
      const employees = MockApiService.generateEmployees(employeeCount);
      
      // Convert the mock employees to our database schema format
      const supabaseEmployees: Insertable<"employees">[] = employees.map(emp => ({
        first_name: emp.firstName,
        last_name: emp.lastName,
        email: emp.email,
        gender: emp.gender,
        age: emp.age,
        department: emp.department,
        position: emp.position,
        salary: emp.salary,
        hire_date: emp.hireDate,
        performance_score: emp.performanceScore,
      }));
      
      return insertEmployees(supabaseEmployees);
    },
    onSuccess: () => {
      // Invalidate queries to refetch the data
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['departmentStats'] });
      queryClient.invalidateQueries({ queryKey: ['salaryDistribution'] });
      queryClient.invalidateQueries({ queryKey: ['ageDistribution'] });
      queryClient.invalidateQueries({ queryKey: ['genderDistribution'] });
      queryClient.invalidateQueries({ queryKey: ['tenureDistribution'] });
      toast.success("Data generated and saved to database!");
    }
  });
  
  // Use real data if available, otherwise fall back to empty arrays
  const employees = employeesQuery.data?.data || [];
  const departmentStats = departmentStatsQuery.data || [];
  const salaryDistribution = salaryDistributionQuery.data || [];
  const ageDistribution = ageDistributionQuery.data || [];
  const genderDistribution = genderDistributionQuery.data || [];
  const tenureDistribution = tenureDistributionQuery.data || [];
  
  // Map Supabase employees to the Employee interface expected by components
  const employeeList = employees.map(emp => ({
    id: emp.id,
    firstName: emp.first_name,
    lastName: emp.last_name,
    email: emp.email,
    gender: emp.gender,
    age: emp.age,
    department: emp.department,
    position: emp.position,
    salary: emp.salary,
    hireDate: emp.hire_date,
    performanceScore: emp.performance_score,
  })) as Employee[];
    
  // Calculate summary metrics from real data
  const averageSalary = employeeList.length > 0 
    ? Math.round(employeeList.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employeeList.length) 
    : 0;
    
  const averagePerformance = employeeList.length > 0 
    ? Number((employeeList.reduce((sum, emp) => sum + (emp.performanceScore || 0), 0) / employeeList.length).toFixed(2)) 
    : 0;
    
  const averageAge = employeeList.length > 0 
    ? Math.round(employeeList.reduce((sum, emp) => sum + (emp.age || 0), 0) / employeeList.length) 
    : 0;
  
  // Loading state for the entire dashboard
  if (employeesQuery.isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Employee Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Visualize and analyze employee data with interactive charts
        </p>
      </div>

      {/* Data Generation Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Data Generation</CardTitle>
          <CardDescription>Generate synthetic employee data and save to database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2">
              <Input 
                type="number" 
                min="10" 
                max="1000" 
                value={employeeCount} 
                onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 100)} 
                className="w-32" 
              />
              <span>employees</span>
            </div>
            <Button 
              onClick={() => generateDataMutation.mutate()} 
              disabled={generateDataMutation.isPending}
            >
              {generateDataMutation.isPending ? "Processing..." : "Generate & Save Data"}
            </Button>
            <Button 
              variant="outline" 
              onClick={exportEmployeesToCSV}
              disabled={employees.length === 0}
            >
              <Download className="mr-2 h-4 w-4" /> Export to CSV
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Data is stored in your Supabase PostgreSQL database
        </CardFooter>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees" 
          value={employees.length} 
          icon={<Users className="h-6 w-6 text-dashboard-blue" />}
          description="Across all departments"
          trend={0}
        />
        <StatCard 
          title="Average Salary" 
          value={`$${averageSalary.toLocaleString()}`} 
          icon={<DollarSign className="h-6 w-6 text-dashboard-green" />}
          description="Company-wide average"
          trend={2.5}
        />
        <StatCard 
          title="Performance Score" 
          value={averagePerformance} 
          icon={<TrendingUp className="h-6 w-6 text-dashboard-purple" />}
          description="Avg. rating (1-5)"
          trend={0.3}
        />
        <StatCard 
          title="Average Age" 
          value={averageAge} 
          icon={<CalendarDays className="h-6 w-6 text-dashboard-orange" />}
          description="Years"
          trend={-1.2}
        />
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="tenure">Tenure</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>
        
        {/* Departments Tab */}
        <TabsContent value="departments">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Department Statistics</CardTitle>
                <CardDescription>Employee count and metrics by department</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {departmentStatsQuery.isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <DepartmentChart departmentStats={departmentStats} />
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Average salary and performance scores</CardDescription>
              </CardHeader>
              <CardContent>
                {departmentStatsQuery.isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {departmentStats.map((dept) => (
                      <div key={dept.department} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{dept.department}</span>
                          </div>
                          <span className="text-sm">{dept.employeeCount} employees</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Avg. Salary: ${dept.averageSalary.toLocaleString()}</span>
                          <span className="text-muted-foreground">Perf. Score: {dept.averagePerformance}</span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Salary Tab */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Salary Distribution</CardTitle>
              <CardDescription>Employee count by salary range</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {salaryDistributionQuery.isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <SalaryDistributionChart salaryDistribution={salaryDistribution} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Demographics Tab */}
        <TabsContent value="demographics">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {ageDistributionQuery.isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <AgeDistributionChart ageDistribution={ageDistribution} />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {genderDistributionQuery.isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <GenderDistributionChart genderDistribution={genderDistribution} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Tenure Tab */}
        <TabsContent value="tenure">
          <Card>
            <CardHeader>
              <CardTitle>Employee Tenure</CardTitle>
              <CardDescription>Years of service distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {tenureDistributionQuery.isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <TenureDistributionChart tenureDistribution={tenureDistribution} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Raw Data Tab */}
        <TabsContent value="raw">
          <Card>
            <CardHeader>
              <CardTitle>Employee Records</CardTitle>
              <CardDescription>Raw employee data</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeTable employees={employeeList} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
