
import factory
import random
from django.utils import timezone
from factory.django import DjangoModelFactory
from faker import Faker
from .models import Employee, Attendance, PerformanceReview

fake = Faker()

# Define departments and positions
DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Product', 'Operations']
POSITIONS = ['Intern', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Level']
GENDERS = ['Male', 'Female', 'Non-Binary']
ATTENDANCE_STATUSES = ['Present', 'Absent', 'Late', 'Remote', 'Half-Day', 'Sick-Leave', 'PTO']

class EmployeeFactory(DjangoModelFactory):
    class Meta:
        model = Employee
    
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.LazyAttribute(lambda o: f"{o.first_name.lower()}.{o.last_name.lower()}@example.com")
    gender = factory.LazyFunction(lambda: random.choice(GENDERS))
    age = factory.LazyFunction(lambda: random.randint(22, 65))
    department = factory.LazyFunction(lambda: random.choice(DEPARTMENTS))
    position = factory.LazyFunction(lambda: random.choice(POSITIONS))
    salary = factory.LazyFunction(lambda: random.randint(30000, 250000))
    hire_date = factory.LazyFunction(lambda: fake.date_between(start_date='-10y', end_date='today'))
    performance_score = factory.LazyFunction(lambda: round(random.uniform(1.0, 5.0), 1))

class AttendanceFactory(DjangoModelFactory):
    class Meta:
        model = Attendance
    
    employee = factory.SubFactory(EmployeeFactory)
    date = factory.LazyFunction(lambda: fake.date_between(start_date='-60d', end_date='today'))
    status = factory.LazyFunction(lambda: random.choice(ATTENDANCE_STATUSES))
    hours_worked = factory.LazyFunction(lambda: round(random.uniform(0.0, 9.0), 1) if random.choice(ATTENDANCE_STATUSES) != 'Absent' else 0.0)
    late_minutes = factory.LazyFunction(lambda: random.randint(0, 120) if random.choice(['On-Time', 'Late']) == 'Late' else 0)
    notes = factory.Maybe(
        'notes_needed',
        yes_declaration=factory.Faker('sentence'),
        no_declaration=None
    )
    notes_needed = factory.LazyFunction(lambda: random.random() < 0.3)  # 30% chance to have notes

class PerformanceReviewFactory(DjangoModelFactory):
    class Meta:
        model = PerformanceReview
    
    employee = factory.SubFactory(EmployeeFactory)
    review_date = factory.LazyFunction(lambda: fake.date_between(start_date='-1y', end_date='today'))
    reviewer = factory.SubFactory(EmployeeFactory)
    communication_score = factory.LazyFunction(lambda: round(random.uniform(1.0, 5.0), 1))
    teamwork_score = factory.LazyFunction(lambda: round(random.uniform(1.0, 5.0), 1))
    technical_score = factory.LazyFunction(lambda: round(random.uniform(1.0, 5.0), 1))
    leadership_score = factory.LazyFunction(lambda: round(random.uniform(1.0, 5.0), 1))
    
    @factory.lazy_attribute
    def overall_score(self):
        # Calculate overall score as average of all other scores
        scores = [
            self.communication_score,
            self.teamwork_score,
            self.technical_score,
            self.leadership_score
        ]
        return round(sum(scores) / len(scores), 1)
    
    comments = factory.Maybe(
        'comments_needed',
        yes_declaration=factory.Faker('paragraph'),
        no_declaration=None
    )
    comments_needed = factory.LazyFunction(lambda: random.random() < 0.7)  # 70% chance to have comments
