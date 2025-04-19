
import React from 'react';
import { DepartmentStats } from '@/lib/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DepartmentChartProps {
  departmentStats: DepartmentStats[];
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({ departmentStats }) => {
  // Sort departments by employee count (descending)
  const sortedStats = [...departmentStats].sort((a, b) => b.employeeCount - a.employeeCount);
  
  return (
    <ResponsiveContainer width="100%" height={350} minHeight={300}>
      <BarChart
        data={sortedStats}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 70,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="department" 
          angle={-45} 
          textAnchor="end"
          height={70} 
        />
        <YAxis />
        <Tooltip formatter={(value: number, name: string) => {
          if (name === 'employeeCount') return [value, 'Employees'];
          return [value, name];
        }} />
        <Legend />
        <Bar dataKey="employeeCount" fill="#0ea5e9" name="Employees" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentChart;
