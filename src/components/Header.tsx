
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Database, BarChart, Server, Code, RefreshCw } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Header: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Employee Data Generation & Visualization</h1>
          <p className="text-muted-foreground">
            Django/Flask REST API Challenge Project
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-muted/40 p-2 rounded-md text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Data refreshes locally, nothing is stored on servers</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-4 mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-1 text-sm">
              <p>
                This project demonstrates a Python backend (Django/Flask) application that generates synthetic employee data, 
                stores it in a PostgreSQL database, provides REST API endpoints for retrieval, and visualizes the data through interactive charts.
              </p>
            </TabsContent>
            <TabsContent value="frontend" className="p-1 text-sm">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-dashboard-blue" />
                <p>
                  The frontend visualizes employee data through interactive charts built with Recharts. 
                  It consumes REST API endpoints for data retrieval and visualization.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="backend" className="p-1 text-sm">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-dashboard-green" />
                <p>
                  The backend consists of a Python web framework (Django/Flask) that provides REST API endpoints for generating, 
                  retrieving, and analyzing employee data, with comprehensive documentation through Swagger UI.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="database" className="p-1 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-dashboard-indigo" />
                <p>
                  Data is stored in a PostgreSQL database with tables for employees, departments, and related entities,
                  with efficient indexing and relationship management.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
