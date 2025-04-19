
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBUG=False

# Expose port
EXPOSE 8000

# Create entrypoint script
RUN echo '#!/bin/sh\n\
python manage.py migrate --noinput\n\
python manage.py collectstatic --noinput\n\
python manage.py generate_employees --employees 20 --attendance_per_employee 30 --reviews_per_employee 2\n\
gunicorn employee_analytics.wsgi:application --bind 0.0.0.0:8000 --workers 2\n\
' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Run entrypoint script
CMD ["/app/entrypoint.sh"]
