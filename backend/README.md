
# Employee Analytics Backend

This is the Django backend for the Employee Analytics application. It provides a REST API for managing employee data and analytics.

## Features

- Employee data management
- Attendance tracking
- Performance reviews
- Data visualization endpoints
- CSV export functionality
- Authentication and authorization
- Rate limiting
- Swagger/OpenAPI documentation

## Setup Instructions

### Prerequisites

- Python 3.10 or higher
- PostgreSQL
- Docker (optional)

### Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy the environment file and adjust as needed:
```bash
cp .env.example .env
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Generate synthetic data:
```bash
python manage.py generate_employees --employees 20 --attendance_per_employee 30 --reviews_per_employee 2
```

7. Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

8. Start the development server:
```bash
python manage.py runserver
```

### Docker Setup

1. Make sure Docker and Docker Compose are installed.

2. Start the services:
```bash
docker-compose up -d
```

3. The API will be available at http://localhost:8000

## API Documentation

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## API Endpoints

### Authentication
- `POST /api/auth/token/`: Obtain JWT token
- `POST /api/auth/token/refresh/`: Refresh JWT token

### Employees
- `GET /api/employees/`: List all employees
- `POST /api/employees/`: Create a new employee
- `GET /api/employees/{id}/`: Retrieve an employee
- `PUT /api/employees/{id}/`: Update an employee
- `DELETE /api/employees/{id}/`: Delete an employee

### Analytics
- `GET /api/analytics/departments/`: Department statistics
- `GET /api/analytics/salary-distribution/`: Salary distribution
- `GET /api/analytics/age-distribution/`: Age distribution
- `GET /api/analytics/gender-distribution/`: Gender distribution
- `GET /api/analytics/tenure-distribution/`: Tenure distribution

### Export
- `GET /api/export/employees/`: Export employees to CSV

### Health Check
- `GET /health/`: API health check
