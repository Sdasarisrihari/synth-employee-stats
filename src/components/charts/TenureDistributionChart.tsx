
import React from 'react';
import { TenureDistribution } from '@/lib/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TenureDistributionChartProps {
  tenureDistribution: TenureDistribution[];
}

const TenureDistributionChart: React.FC<TenureDistributionChartProps> = ({ tenureDistribution }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={tenureDistribution}
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
        <Bar dataKey="count" fill="#14b8a6" name="Employees" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TenureDistributionChart;
