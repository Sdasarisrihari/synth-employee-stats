
import React from "react";
import { Employee } from "@/lib/mockApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const department = employee.department.toLowerCase();
    const position = employee.position.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      fullName.includes(search) ||
      department.includes(search) ||
      position.includes(search)
    );
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Salary</TableHead>
              <TableHead className="text-right">Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell className="text-right">
                    ${employee.salary.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {employee.performanceScore}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredEmployees.length > itemsPerPage && (
        <div className="flex justify-center gap-1 mt-4">
          {Array.from(
            { length: Math.ceil(filteredEmployees.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
