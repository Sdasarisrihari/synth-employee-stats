
# Employee Analytics Dashboard

## Project Overview

A comprehensive web application for employee data management and analytics, combining a React frontend with a Django backend and Supabase integration.

## Technologies

- **Frontend**: 
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI

- **Backend**: 
  - Django
  - PostgreSQL
  - Django REST Framework

- **Additional Tools**:
  - Supabase (Authentication)
  - Docker
  - Vitest (Testing)

## API Endpoints

### Employee Management
- `GET /api/employees/`: List all employees
  - Supports pagination
  - Allows filtering and searching
  - Returns employee details

- `GET /api/employees/{id}/`: Retrieve specific employee details
  - Returns comprehensive information for a single employee

### Analytics
- `GET /api/analytics/departments/`: Department-level statistics
  - Employee count per department
  - Average salary
  - Performance metrics

- `GET /api/analytics/salary-distribution/`: Salary range distribution
- `GET /api/analytics/age-distribution/`: Employee age demographics
- `GET /api/analytics/gender-distribution/`: Gender breakdown
- `GET /api/analytics/tenure-distribution/`: Employee tenure analysis

### Data Export
- `GET /api/export/employees/`: Export employee data to CSV
  - Generates a downloadable CSV file with comprehensive employee information

### System
- `GET /health/`: Health check endpoint
  - Verifies system and database connectivity
  - Provides basic system status information

## Local Development Setup

### Prerequisites
- Node.js 20+
- npm
- Python 3.10+
- Docker (optional)

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

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
- Heroku or similar platforms (Backend)
- Docker containers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## License

Distributed under the MIT License.
