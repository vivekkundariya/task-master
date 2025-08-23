import React from 'react';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Menu className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Todo Master</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}