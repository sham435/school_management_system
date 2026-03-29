"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, FileText, X } from 'lucide-react';

export default function MarksPage() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="max-w-7xl mx-auto flex gap-6 relative animate-in fade-in zoom-in-95 duration-200">
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all ${showModal ? 'pr-[400px]' : ''}`}>
        <div className="mb-6 bg-[#eaeaea] p-4 rounded-t-2xl shadow-sm border border-b-0 border-gray-200">
            
            {/* Find Search bar */}
            <div className="flex gap-4 mb-8 pt-4">
              <div className="relative flex-1 max-w-sm">
                <input type="text" placeholder="Search..." className="w-full bg-slate-200/60 rounded-md py-2 px-4 shadow-inner text-sm"/>
                <div className="absolute right-0 top-0 h-full w-10 bg-blue-600 flex items-center justify-center rounded-r-md text-white">
                  <Search size={16}/>
                </div>
              </div>
            </div>

            {/* Session selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-500 font-medium">Session</span>
              <div className="relative">
                <select className="appearance-none bg-slate-200/50 border border-slate-300 rounded-md py-1.5 pl-3 pr-8 text-slate-700 focus:outline-none text-sm font-medium w-32">
                  <option>2024-25</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-2.5 text-slate-500 pointer-events-none"/>
              </div>
            </div>
            
            <button className="bg-[#185c96] text-white px-6 py-1.5 rounded-md font-medium text-sm flex items-center gap-2 mb-10 hover:bg-blue-800">
              <Search size={14}/> Find
            </button>

            <hr className="border-slate-300 mb-6"/>

            {/* Exams Header */}
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-slate-600" />
              <h2 className="text-xl font-bold text-slate-800">Exams</h2>
            </div>
            
            <hr className="border-slate-300 mb-6"/>

            {/* Past Exams list */}
            <div className="space-y-6 mb-10">
              <p className="text-orange-500 font-bold text-sm tracking-wide">Sidfj <span className="font-medium opacity-70">(Data - 19/06/2024)</span></p>
              <p className="text-orange-500 font-bold text-sm tracking-wide bg-inherit group hover:bg-white p-2 -ml-2 rounded-md cursor-pointer transition-colors" onClick={() => setShowModal(true)}>
                Hindi exam result <span className="font-medium opacity-70">(Data - 19/06/2024)</span>
              </p>
              <p className="text-orange-500 font-bold text-sm tracking-wide">Monthly test <span className="font-medium opacity-70">(Data - 19/06/2024)</span></p>
            </div>

            {/* Overview Cards */}
            <p className="text-slate-500 text-sm font-bold mb-4">Consolidated Subject-Wise Results Overview -</p>
            <div className="flex gap-4">
              <div className="bg-[#cba012] text-slate-900 font-bold py-3 px-8 rounded-lg shadow min-w-[200px] text-center">Commerce</div>
              <div className="bg-[#cba012] text-slate-900 font-bold py-3 px-8 rounded-lg shadow min-w-[200px] text-center">English</div>
            </div>

        </div>
      </div>

      {/* Slide-out Modal / Drawer */}
      {showModal && (
        <div className="w-[400px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] h-[calc(100vh-80px)] fixed right-0 top-16 border-l border-slate-200 z-20 flex flex-col animate-in slide-in-from-right">
          
          <div className="flex justify-between items-center p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="text-slate-600" size={20}/>
              <h3 className="font-bold text-slate-800">Students Result List</h3>
            </div>
            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-800">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-[1.5px] border-emerald-600/30 text-slate-700 bg-white">
                  <th className="p-3 font-bold border-r-[1.5px] border-emerald-600/30">#</th>
                  <th className="p-3 font-bold border-r-[1.5px] border-emerald-600/30">Roll No.</th>
                  <th className="p-3 font-bold border-r-[1.5px] border-emerald-600/30">Name</th>
                  <th className="p-3 font-bold">Obtained</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-[1.5px] border-emerald-600/60 bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold border-r-[1.5px] border-emerald-600/30">1</td>
                  <td className="p-3 text-slate-500 border-r-[1.5px] border-emerald-600/30">S1718791292</td>
                  <td className="p-3 text-slate-500 border-r-[1.5px] border-emerald-600/30">Student kumar</td>
                  <td className="p-3 text-green-600 font-bold">62 / 100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
