import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit, BookOpen, Search, PlusCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors ${
      isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
    }`;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
    
      <header className="bg-white shadow-sm z-10 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">FlashMind</h1>
          </div>
        </div>
      </header>

    
      <main className="flex-1 overflow-y-auto p-4 pb-24 max-w-5xl mx-auto w-full">
        {children}
      </main>

      
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full z-20 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-5xl mx-auto">
          <NavLink to="/" className={navLinkClass}>
            <BookOpen className="w-6 h-6" />
            <span>My Decks</span>
          </NavLink>
          <NavLink to="/create" className={navLinkClass}>
            <PlusCircle className="w-6 h-6" />
            <span>Create</span>
          </NavLink>
          <NavLink to="/community" className={navLinkClass}>
            <Search className="w-6 h-6" />
            <span>Explore</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
