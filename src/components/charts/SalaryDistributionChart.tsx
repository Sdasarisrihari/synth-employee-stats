
import React, { useEffect } from 'react';
import { SalaryDistribution } from '@/lib/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalaryDistributionChartProps {
  salaryDistribution: SalaryDistribution[];
}

const SalaryDistributionChart: React.FC<SalaryDistributionChartProps> = ({ salaryDistribution }) => {
  // Add console logging to help debug
  useEffect(() => {
    console.log("Salary Distribution Data:", salaryDistribution);
  }, [salaryDistribution]);
  
  // If no data or empty array, show a message with guidance
  if (!salaryDistribution || salaryDistribution.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No salary distribution data available.</p>
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">Use the "Generate & Save Data" button in the Data Generation section.</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350} minHeight={300}>
      <BarChart
        data={salaryDistribution}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`${value} employees`, 'Count']} />
        <Legend />
        <Bar dataKey="count" fill="#22c55e" name="Employees" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalaryDistributionChart;
