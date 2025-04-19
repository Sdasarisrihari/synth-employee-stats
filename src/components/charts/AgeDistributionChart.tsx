
import React from 'react';
import { AgeDistribution } from '@/lib/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AgeDistributionChartProps {
  ageDistribution: AgeDistribution[];
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ ageDistribution }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={ageDistribution}
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
        <Bar dataKey="count" fill="#a855f7" name="Employees" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeDistributionChart;
