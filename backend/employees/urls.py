
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet)
router.register(r'attendance', views.AttendanceViewSet)
router.register(r'performance-reviews', views.PerformanceReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/departments/', views.DepartmentStatsView.as_view(), name='department-stats'),
    path('analytics/salary-distribution/', views.SalaryDistributionView.as_view(), name='salary-distribution'),
    path('analytics/age-distribution/', views.AgeDistributionView.as_view(), name='age-distribution'),
    path('analytics/gender-distribution/', views.GenderDistributionView.as_view(), name='gender-distribution'),
    path('analytics/tenure-distribution/', views.TenureDistributionView.as_view(), name='tenure-distribution'),
    path('export/employees/', views.export_employees_csv, name='export-employees'),
]
