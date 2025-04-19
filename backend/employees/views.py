
from django.db.models import Count, Avg, F, Case, When, Value, IntegerField, Q
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Employee, Attendance, PerformanceReview
from .serializers import (
    EmployeeSerializer, 
    AttendanceSerializer, 
    PerformanceReviewSerializer,
    DepartmentStatSerializer,
    SalaryDistributionSerializer,
    AgeDistributionSerializer,
    GenderDistributionSerializer,
    TenureDistributionSerializer
)

# Custom throttle classes
class StandardRateThrottle(UserRateThrottle):
    rate = '10/minute'

# Employee ViewSet with pagination and filtering
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by('-created_at')
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [StandardRateThrottle]
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['department', 'position', 'gender']
    search_fields = ['first_name', 'last_name', 'email', 'department', 'position']

    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(first_name__icontains=search_term) |
                Q(last_name__icontains=search_term) |
                Q(position__icontains=search_term) |
                Q(department__icontains=search_term)
            )
        return queryset

# Attendance ViewSet
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['employee', 'date', 'status']

# Performance Review ViewSet
class PerformanceReviewViewSet(viewsets.ModelViewSet):
    queryset = PerformanceReview.objects.all()
    serializer_class = PerformanceReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['employee', 'review_date']

# Analytics views
class DepartmentStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [StandardRateThrottle]
    
    def get(self, request):
        stats = Employee.objects.values('department') \
            .annotate(
                employeeCount=Count('id'),
                averageSalary=Avg('salary'),
                averagePerformance=Avg('performance_score')
            ) \
            .order_by('department')
        
        serializer = DepartmentStatSerializer(stats, many=True)
        return Response(serializer.data)

class SalaryDistributionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [StandardRateThrottle]
    
    def get(self, request):
        # Define salary ranges
        ranges = [
            {'min': 0, 'max': 50000, 'label': '$0-$50K'},
            {'min': 50001, 'max': 75000, 'label': '$50K-$75K'},
            {'min': 75001, 'max': 100000, 'label': '$75K-$100K'},
            {'min': 100001, 'max': 150000, 'label': '$100K-$150K'},
            {'min': 150001, 'max': 1000000, 'label': '$150K+'}
        ]
        
        # Calculate distributions using Django ORM
        distribution = []
        for range_info in ranges:
            count = Employee.objects.filter(
                salary__gte=range_info['min'],
                salary__lte=range_info['max']
            ).count()
            
            distribution.append({
                'range': range_info['label'],
                'count': count
            })
        
        serializer = SalaryDistributionSerializer(distribution, many=True)
        return Response(serializer.data)

class AgeDistributionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [StandardRateThrottle]
    
    def get(self, request):
        # Define age ranges
        ranges = [
            {'min': 20, 'max': 29, 'label': '20-29'},
            {'min': 30, 'max': 39, 'label': '30-39'},
            {'min': 40, 'max': 49, 'label': '40-49'},
            {'min': 50, 'max': 59, 'label': '50-59'},
            {'min': 60, 'max': 100, 'label': '60+'}
        ]
        
        # Calculate distributions
        distribution = []
        for range_info in ranges:
            count = Employee.objects.filter(
                age__gte=range_info['min'],
                age__lte=range_info['max']
            ).count()
            
            distribution.append({
                'range': range_info['label'],
                'count': count
            })
        
        serializer = AgeDistributionSerializer(distribution, many=True)
        return Response(serializer.data)

class GenderDistributionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [StandardRateThrottle]
    
    def get(self, request):
        distribution = Employee.objects.values('gender') \
            .annotate(count=Count('id')) \
            .order_by('gender')
        
        serializer = GenderDistributionSerializer(distribution, many=True)
        return Response(serializer.data)

class TenureDistributionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [StandardRateThrottle]
    
    def get(self, request):
        today = timezone.now().date()
        
        # Define tenure ranges (in years)
        ranges = [
            {'min': 0, 'max': 1, 'label': '<1 Year'},
            {'min': 1, 'max': 2, 'label': '1-2 Years'},
            {'min': 2, 'max': 5, 'label': '2-5 Years'},
            {'min': 5, 'max': 10, 'label': '5-10 Years'},
            {'min': 10, 'max': 100, 'label': '10+ Years'}
        ]
        
        # Calculate distributions
        distribution = []
        for range_info in ranges:
            min_date = today.replace(year=today.year - range_info['max'])
            max_date = today.replace(year=today.year - range_info['min'])
            
            count = Employee.objects.filter(
                hire_date__gt=min_date,
                hire_date__lte=max_date
            ).count()
            
            distribution.append({
                'range': range_info['label'],
                'count': count
            })
        
        serializer = TenureDistributionSerializer(distribution, many=True)
        return Response(serializer.data)

# Export CSV view
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@throttle_classes([StandardRateThrottle])
def export_employees_csv(request):
    import csv
    from django.http import HttpResponse
    
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="employees.csv"'
    
    writer = csv.writer(response)
    # Write header
    writer.writerow([
        'ID', 'First Name', 'Last Name', 'Email', 'Gender', 'Age',
        'Department', 'Position', 'Salary', 'Hire Date', 'Performance Score'
    ])
    
    # Write data
    employees = Employee.objects.all()
    for employee in employees:
        writer.writerow([
            employee.id, employee.first_name, employee.last_name,
            employee.email, employee.gender, employee.age,
            employee.department, employee.position, employee.salary,
            employee.hire_date, employee.performance_score
        ])
    
    return response
