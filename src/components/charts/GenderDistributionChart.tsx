
import React from 'react';
import { GenderDistribution } from '@/lib/mockApi';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GenderDistributionChartProps {
  genderDistribution: GenderDistribution[];
}

const COLORS = ['#0ea5e9', '#f97316', '#6366f1'];

const GenderDistributionChart: React.FC<GenderDistributionChartProps> = ({ genderDistribution }) => {
  const total = genderDistribution.reduce((sum, item) => sum + item.count, 0);
  
  // Add percentage to data for tooltip
  const data = genderDistribution.map(item => ({
    ...item,
    percentage: ((item.count / total) * 100).toFixed(1)
  }));
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
          nameKey="gender"
          label={({ gender, percentage }) => `${gender}: ${percentage}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string, props: any) => {
            return [`${value} (${props.payload.percentage}%)`, name];
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderDistributionChart;
