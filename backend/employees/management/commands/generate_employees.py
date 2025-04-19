
from django.core.management.base import BaseCommand
from employees.factories import EmployeeFactory, AttendanceFactory, PerformanceReviewFactory
from employees.models import Employee

class Command(BaseCommand):
    help = 'Generate synthetic employee data'

    def add_arguments(self, parser):
        parser.add_argument('--employees', type=int, default=10, help='Number of employees to generate')
        parser.add_argument('--attendance_per_employee', type=int, default=30, help='Number of attendance records per employee')
        parser.add_argument('--reviews_per_employee', type=int, default=2, help='Number of performance reviews per employee')
        parser.add_argument('--clean', action='store_true', help='Clean existing data before generating new data')

    def handle(self, *args, **options):
        if options['clean']:
            self.stdout.write('Cleaning existing data...')
            Employee.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Data cleaned successfully'))

        employee_count = options['employees']
        attendance_per_employee = options['attendance_per_employee']
        reviews_per_employee = options['reviews_per_employee']
        
        self.stdout.write(f'Generating {employee_count} employees...')
        
        # Generate employees in smaller batches to avoid memory issues
        batch_size = 100
        for i in range(0, employee_count, batch_size):
            batch_count = min(batch_size, employee_count - i)
            employees = EmployeeFactory.create_batch(batch_count)
            self.stdout.write(f'Generated batch of {batch_count} employees ({i+batch_count}/{employee_count})')
        
        if attendance_per_employee > 0:
            self.stdout.write(f'Generating attendance records ({attendance_per_employee} per employee)...')
            for employee in Employee.objects.all():
                for _ in range(attendance_per_employee):
                    AttendanceFactory.create(employee=employee)
            self.stdout.write(self.style.SUCCESS(f'Generated {employee_count * attendance_per_employee} attendance records'))
        
        if reviews_per_employee > 0:
            self.stdout.write(f'Generating performance reviews ({reviews_per_employee} per employee)...')
            employees_list = list(Employee.objects.all())
            for employee in employees_list:
                for _ in range(reviews_per_employee):
                    # Get a different employee as reviewer
                    reviewer = employee
                    while reviewer == employee:
                        reviewer = employees_list[0] if len(employees_list) == 1 else employees_list[employees_list.index(employee) - 1]
                    
                    PerformanceReviewFactory.create(employee=employee, reviewer=reviewer)
            self.stdout.write(self.style.SUCCESS(f'Generated {employee_count * reviews_per_employee} performance reviews'))
        
        self.stdout.write(self.style.SUCCESS('Successfully generated synthetic employee data'))
