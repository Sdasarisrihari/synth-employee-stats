
from rest_framework import serializers
from .models import Employee, Attendance, PerformanceReview

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class PerformanceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceReview
        fields = '__all__'

# Serializers for analytical data
class DepartmentStatSerializer(serializers.Serializer):
    department = serializers.CharField()
    employeeCount = serializers.IntegerField()
    averageSalary = serializers.DecimalField(max_digits=10, decimal_places=2)
    averagePerformance = serializers.DecimalField(max_digits=3, decimal_places=2)

class SalaryDistributionSerializer(serializers.Serializer):
    range = serializers.CharField()
    count = serializers.IntegerField()

class AgeDistributionSerializer(serializers.Serializer):
    range = serializers.CharField()
    count = serializers.IntegerField()

class GenderDistributionSerializer(serializers.Serializer):
    gender = serializers.CharField()
    count = serializers.IntegerField()

class TenureDistributionSerializer(serializers.Serializer):
    range = serializers.CharField()
    count = serializers.IntegerField()
