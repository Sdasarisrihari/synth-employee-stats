
import React from 'react';
import { SalaryDistribution } from '@/lib/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalaryDistributionChartProps {
  salaryDistribution: SalaryDistribution[];
}

const SalaryDistributionChart: React.FC<SalaryDistributionChartProps> = ({ salaryDistribution }) => {
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
