
from django.contrib import admin
from .models import Employee, Attendance, PerformanceReview

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'department', 'position', 'salary', 'hire_date')
    list_filter = ('department', 'position', 'gender')
    search_fields = ('first_name', 'last_name', 'email', 'department')
    date_hierarchy = 'hire_date'

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('employee', 'date', 'status', 'hours_worked', 'late_minutes')
    list_filter = ('status', 'date')
    date_hierarchy = 'date'

@admin.register(PerformanceReview)
class PerformanceReviewAdmin(admin.ModelAdmin):
    list_display = ('employee', 'review_date', 'overall_score')
    list_filter = ('review_date',)
    date_hierarchy = 'review_date'
