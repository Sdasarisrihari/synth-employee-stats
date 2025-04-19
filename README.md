
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
- Workforce age distribution

### 2. Department Statistics
- Employee count per department
- Department-wise salary ranges
- Performance metrics by department

### 3. Salary Insights
- Salary range distribution
- Comparative salary analysis
- Salary brackets visualization

### 4. Demographics
- Age group distribution
- Gender composition
- Workforce diversity metrics

### 5. Tenure Analysis
- Years of service breakdown
- Employee retention insights
- Experience level distribution

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
cd ../backend
python manage.py generate_employees --employees 200
```

## Data Generation

### Synthetic Data Creation
- Generates 200 employee records
- Creates realistic employee profiles
- Populates dashboard with meaningful data

### Data Attributes
- Departments
- Salaries
- Ages
- Genders
- Hire dates
- Performance scores

## Testing

```bash
# Frontend tests
npm run test

# Backend tests
python manage.py test
```

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

## License

Distributed under the MIT License.
