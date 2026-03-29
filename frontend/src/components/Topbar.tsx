import { Search, Bell, Menu, LayoutGrid } from 'lucide-react';
import React from 'react';

export default function TopBar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white ml-64 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-slate-700 md:hidden">
          <Menu size={24} />
        </button>
        
        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-slate-100 placeholder-slate-400 border-none rounded-full py-2 pl-4 pr-10 md:w-80 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
          <button className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-blue-600 text-white rounded-r-full hover:bg-blue-700">
             <Search size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Toggle Switch */}
        <div className="w-10 h-5 bg-blue-100 rounded-full flex items-center px-1 cursor-pointer">
          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
        </div>

        {/* Notifications */}
        <button className="relative text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors hidden md:block border-2 border-red-500">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
        </button>

        {/* Action Menu icon */}
        <button className="text-slate-400 hover:text-slate-600">
           <LayoutGrid size={22} className="rotate-90"/>
        </button>
      </div>
    </header>
  );
}
