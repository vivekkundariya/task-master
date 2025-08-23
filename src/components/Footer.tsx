import React from 'react';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>Email: </span>
            <a 
              href="mailto:info@todomaster.com" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              info@todomaster.com
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>Phone: +123 456 7890</span>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-300">
          © 2024 Todo Master. All rights reserved.
        </div>
      </div>
    </footer>
  );
}