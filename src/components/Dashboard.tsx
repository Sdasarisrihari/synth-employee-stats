
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
// Data generation is handled within this component
import EmployeeTable from "@/components/EmployeeTable";
import DepartmentChart from "@/components/charts/DepartmentChart";
import SalaryDistributionChart from "@/components/charts/SalaryDistributionChart";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import GenderDistributionChart from "@/components/charts/GenderDistributionChart";
import TenureDistributionChart from "@/components/charts/TenureDistributionChart";
import StatCard from "@/components/StatCard";
import { Users, DollarSign, TrendingUp, Building, CalendarDays } from "lucide-react";

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [salaryDistribution, setSalaryDistribution] = useState<SalaryDistribution[]>([]);
  const [ageDistribution, setAgeDistribution] = useState<AgeDistribution[]>([]);
  const [genderDistribution, setGenderDistribution] = useState<GenderDistribution[]>([]);
  const [tenureDistribution, setTenureDistribution] = useState<TenureDistribution[]>([]);
  const [employeeCount, setEmployeeCount] = useState<number>(100);
  
  // Generate data
  const generateData = () => {
    const newEmployees = MockApiService.generateEmployees(employeeCount);
    setEmployees(newEmployees);
    
    // Generate analytics
    setDepartmentStats(MockApiService.getDepartmentStats(newEmployees));
    setSalaryDistribution(MockApiService.getSalaryDistribution(newEmployees));
    setAgeDistribution(MockApiService.getAgeDistribution(newEmployees));
    setGenderDistribution(MockApiService.getGenderDistribution(newEmployees));
    setTenureDistribution(MockApiService.getTenureDistribution(newEmployees));
  };
  
  // Initialize data on first load
  useEffect(() => {
    generateData();
  }, []);
  
  // Calculate summary metrics
  const averageSalary = employees.length > 0 
    ? Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length) 
    : 0;
    
  const averagePerformance = employees.length > 0 
    ? Number((employees.reduce((sum, emp) => sum + emp.performanceScore, 0) / employees.length).toFixed(2)) 
    : 0;
    
  const averageAge = employees.length > 0 
    ? Math.round(employees.reduce((sum, emp) => sum + emp.age, 0) / employees.length) 
    : 0;
    
  const topPerformers = MockApiService.getTopPerformers(employees, 5);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Employee Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Visualize and analyze synthetic employee data with interactive charts
        </p>
      </div>

      {/* Data Generation Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Data Generation</CardTitle>
          <CardDescription>Generate synthetic employee data for analysis</CardDescription>
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
            <Button onClick={generateData}>Generate Data</Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Data is generated locally and not stored on any server
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
                <DepartmentChart departmentStats={departmentStats} />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Average salary and performance scores</CardDescription>
              </CardHeader>
              <CardContent>
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
              <SalaryDistributionChart salaryDistribution={salaryDistribution} />
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
                <AgeDistributionChart ageDistribution={ageDistribution} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <GenderDistributionChart genderDistribution={genderDistribution} />
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
              <TenureDistributionChart tenureDistribution={tenureDistribution} />
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
              <EmployeeTable employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
