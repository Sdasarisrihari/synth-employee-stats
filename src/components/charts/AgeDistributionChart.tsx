
import React, { useEffect } from 'react';
import { AgeDistribution } from '@/lib/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

interface AgeDistributionChartProps {
  ageDistribution: AgeDistribution[];
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ ageDistribution }) => {
  // Add console logging to help debug
  useEffect(() => {
    console.log("Age Distribution Data:", ageDistribution);
  }, [ageDistribution]);
  
  // If no data or empty array, show a message with guidance
  if (!ageDistribution || ageDistribution.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No age distribution data available.</p>
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
