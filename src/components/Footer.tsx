
import React from 'react';
import { Github, Code, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-16 py-6">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-muted-foreground">
            Employee Data Generation & Visualization
          </div>
          <div className="text-xs text-muted-foreground/60">
            Django/Flask/REST API Challenge Project
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Code className="h-4 w-4" />
            <span>API Docs</span>
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentation</span>
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
