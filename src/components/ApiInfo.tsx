
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiInfo: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>REST API Documentation</CardTitle>
        <CardDescription>
          This section showcases the API endpoints that would be available in a full implementation 
          with Django/Flask backend.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="employees">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="generate">Data Generation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="employees">
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold">GET /api/employees/</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieves a list of all employees with optional filtering parameters
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-auto">
{`# Example Response
{
  "count": 100,
  "next": "http://api.example.com/api/employees/?page=2",
  "previous": null,
  "results": [
    {
      "id": "7f9c24e8-5e6a-4b7c-8d9e-1f2g3h4i5j6k",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "department": "Engineering",
      "position": "Senior Developer",
      "salary": 95000,
      ...
    },
    ...
  ]
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold">GET /api/employees/{'{id}/'}</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieves a specific employee by ID
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold">GET /api/stats/departments/</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieves department statistics including employee count, average salary, etc.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">GET /api/stats/salary/</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieves salary distribution information
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">GET /api/stats/demographics/</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieves demographic information including age and gender distribution
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">GET /api/stats/tenure/</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieves employee tenure information
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="generate">
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold">POST /api/generate/</h3>
                <p className="text-sm text-muted-foreground">
                  Generates synthetic employee data and stores it in the database
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-auto">
{`# Example Request
{
  "count": 100,
  "departments": ["Engineering", "Marketing", "Sales", "HR", "Finance"],
  "seed": 12345  // Optional: for reproducible results
}

# Example Response
{
  "success": true,
  "message": "Generated 100 employee records",
  "timestamp": "2023-08-15T14:22:33Z"
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold">DELETE /api/generate/reset/</h3>
                <p className="text-sm text-muted-foreground">
                  Clears all generated data from the database
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Note: This is a frontend-only demonstration. In a real implementation, these endpoints would be provided by a Django or Flask backend.
      </CardFooter>
    </Card>
  );
};

export default ApiInfo;
