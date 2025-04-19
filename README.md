
# Employee Analytics Dashboard

## Project Overview

A comprehensive web application for employee data management and analytics, combining a React frontend with a Supabase backend and advanced data visualization capabilities.

## Technologies

- **Frontend**: 
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI
  - Recharts (Data Visualization)

- **Backend**: 
  - Supabase
  - PostgreSQL
  - Row Level Security (RLS)

## Key Features

### Data Management
- Synthetic data generation
- Comprehensive employee record management
- Real-time data updates

### Analytics Dashboard
- Department-level statistics
- Salary distribution analysis
- Age demographics visualization
- Gender breakdown
- Employee tenure tracking

## Dashboard Sections

### 1. Overview
- Total employee count
- Average salary
- Overall performance metrics
- Workforce demographics

### 2. Department Statistics
- Employee count per department
- Department-wise salary ranges
- Performance metrics by department

### 3. Salary Insights
- Salary range distribution
- Comprehensive salary breakdown
- Interactive visualization of salary brackets

### 4. Demographics
- Age group distribution
  - Breakdown by age ranges (Under 25, 25-34, 35-44, 45-54, 55+)
  - Interactive bar chart visualization
- Gender composition
  - Detailed gender distribution
  - Pie chart representation of workforce diversity

### 5. Tenure Analysis
- Years of service breakdown
- Employee retention insights
- Experience level distribution

## Data Visualization Features

- Interactive charts powered by Recharts
- Responsive design
- Tooltips for detailed information
- Real-time data updates
- Frontend rate limiting to prevent API abuse

## Important Usage Notes

### Generating Data
Before you can view any charts or statistics, you **must first generate sample data**:
1. Locate the "Data Generation" section at the top of the dashboard
2. Set the desired number of employees (default: 100)
3. Click the "Generate & Save Data" button
4. Wait for the data to be processed and saved

All charts and statistics will automatically update once data is available. If you see a message saying "No data available", this means you need to generate data first.

## Local Development Setup

### Prerequisites
- Node.js 20+
- npm
- Supabase account

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>

# Frontend setup
cd frontend
npm install
npm run dev

# Generate synthetic data
# Uses the "Generate & Save Data" button in the Dashboard
```

## Data Generation

### Synthetic Data Creation
- Generates employee records with:
  - Realistic personal and professional details
  - Diverse demographic information
  - Comprehensive performance data

### Data Attributes
- Departments
- Salaries
- Ages
- Genders
- Hire dates
- Performance scores

## Deployment

Supports deployment through:
- Vercel (Frontend)
- Supabase (Backend & Database)
- Docker containers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request


## login credentials
Email : srihari9dasari@gmail.com
pass: Srisai@1269
