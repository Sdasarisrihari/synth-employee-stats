
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import psycopg2
import os

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint to verify that the API is up and running"""
    
    # Check database connection
    try:
        conn = psycopg2.connect(
            dbname=os.getenv('DB_NAME', 'employee_analytics'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', 'postgres'),
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432')
        )
        conn.close()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    data = {
        "status": "healthy",
        "database": db_status,
        "version": "1.0.0"
    }
    
    return Response(data)
