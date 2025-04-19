
import React, { useEffect } from 'react';
import { GenderDistribution } from '@/lib/mockApi';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GenderDistributionChartProps {
  genderDistribution: GenderDistribution[];
}

const COLORS = ['#0ea5e9', '#f97316', '#6366f1'];

const GenderDistributionChart: React.FC<GenderDistributionChartProps> = ({ genderDistribution }) => {
  // Add console logging to help debug
  useEffect(() => {
    console.log("Gender Distribution Data:", genderDistribution);
  }, [genderDistribution]);
  
  // If no data or empty array, show a message with guidance
  if (!genderDistribution || genderDistribution.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No gender distribution data available.</p>
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">Use the "Generate & Save Data" button in the Data Generation section.</p>
        </div>
      </div>
    );
  }
  
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
