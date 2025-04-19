
from django.db import models
from django.utils import timezone
import uuid

class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=20)
    age = models.IntegerField()
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.IntegerField()
    hire_date = models.DateField()
    performance_score = models.DecimalField(max_digits=3, decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Attendance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendance')
    date = models.DateField()
    status = models.CharField(max_length=50)  # present, absent, late, etc.
    hours_worked = models.DecimalField(max_digits=4, decimal_places=1)
    late_minutes = models.IntegerField(default=0)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['employee', 'date']

    def __str__(self):
        return f"{self.employee} - {self.date}"

class PerformanceReview(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='performance_reviews')
    review_date = models.DateField()
    reviewer = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='reviews_given')
    communication_score = models.DecimalField(max_digits=3, decimal_places=1)
    teamwork_score = models.DecimalField(max_digits=3, decimal_places=1)
    technical_score = models.DecimalField(max_digits=3, decimal_places=1)
    leadership_score = models.DecimalField(max_digits=3, decimal_places=1)
    overall_score = models.DecimalField(max_digits=3, decimal_places=1)
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['employee', 'review_date']

    def __str__(self):
        return f"Review for {self.employee} on {self.review_date}"
