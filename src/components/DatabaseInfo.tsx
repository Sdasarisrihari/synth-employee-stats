
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Table, Server, Code } from "lucide-react";

const DatabaseInfo: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-dashboard-indigo" />
          <CardTitle>Database Schema</CardTitle>
        </div>
        <CardDescription>
          PostgreSQL database design for the employee data application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Table className="h-4 w-4 text-dashboard-blue" />
              <h3 className="font-semibold text-base">Employee Table</h3>
            </div>
            <pre className="p-4 bg-muted rounded-md text-xs overflow-auto">
{`CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id),
    position VARCHAR(100) NOT NULL,
    salary INTEGER NOT NULL,
    hire_date DATE NOT NULL,
    performance_score DECIMAL(3,1),
    age INTEGER CHECK (age >= 18),
    gender VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
            </pre>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Table className="h-4 w-4 text-dashboard-blue" />
              <h3 className="font-semibold text-base">Department Table</h3>
            </div>
            <pre className="p-4 bg-muted rounded-md text-xs overflow-auto">
{`CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
            </pre>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Server className="h-4 w-4 text-dashboard-green" />
              <h3 className="font-semibold text-base">Backend Implementation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-dashboard-purple" />
                  <h4 className="font-medium">Django Models</h4>
                </div>
                <pre className="text-xs overflow-auto">
{`class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, related_name="employees"
    )
    # ...more fields
`}
                </pre>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-dashboard-purple" />
                  <h4 className="font-medium">Flask Models (SQLAlchemy)</h4>
                </div>
                <pre className="text-xs overflow-auto">
{`class Department(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    employees = db.relationship('Employee', back_populates='department')

class Employee(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    department_id = db.Column(UUID(as_uuid=True), db.ForeignKey('department.id'))
    # ...more fields
`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseInfo;
