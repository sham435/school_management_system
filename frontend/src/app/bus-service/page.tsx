"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Map, Edit, Trash2, Bus as BusIcon, Plus, MapPin } from 'lucide-react';

export default function BusServicePage() {
  const [openBus, setOpenBus] = useState<string | null>('Another bus');

  const toggleBus = (bus: string) => {
    setOpenBus(openBus === bus ? null : bus);
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-200">
      <div className="mb-6 bg-[#eaeaea] p-4 pb-2 rounded-t-2xl shadow-sm border border-b-0 border-gray-200">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Bus service</h1>
          
          {/* Quick filter tabs */}
          <div className="flex gap-4 mt-6 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors">
              <BusIcon size={16} /> Bus Requests
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white text-green-600 text-[10px]">&check;</span>
              Accepted Requests
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#f4f6f8] rounded-xl">
            
            {/* Left Column: Bus Fleet List */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <BusIcon className="text-slate-600" />
                  <h2 className="text-xl font-bold text-slate-800">Buses</h2>
                </div>
                <button className="text-slate-400 font-bold p-1"><Plus size={20}/></button>
              </div>

              {/* Accordion list */}
              <div className="space-y-3">
                
                {/* Accordion Item 1 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => toggleBus('Bus 1')} className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50">
                    <span className="font-medium text-slate-600">Bus 1</span>
                    <ChevronDown size={20} className="text-slate-400" />
                  </button>
                </div>

                {/* Accordion Item 2 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => toggleBus('Bus 2')} className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50">
                    <span className="font-medium text-slate-600">Bus 2</span>
                    <ChevronDown size={20} className="text-slate-400" />
                  </button>
                </div>

                {/* Expanded Accordion Item */}
                <div className={`border rounded-lg overflow-hidden bg-white transition-all ${openBus === 'Another bus' ? 'border-blue-500 shadow-sm border-t-2' : 'border-slate-200'}`}>
                  <button onClick={() => toggleBus('Another bus')} className="w-full flex justify-between items-center p-4 text-left">
                    <span className={`font-medium ${openBus === 'Another bus' ? 'text-blue-600' : 'text-slate-600'}`}>Another bus</span>
                    {openBus === 'Another bus' ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>
                  
                  {openBus === 'Another bus' && (
                    <div className="p-4 pt-2 border-t border-slate-100 bg-white">
                      <div className="space-y-3 text-sm font-bold text-slate-700">
                        <p>Bus number - <span className="font-normal text-slate-500 ml-1">OOOOOOOO</span></p>
                        <p>DRIVER - <span className="font-normal text-slate-500 ml-1">Another driver</span></p>
                        <p className="ml-4 font-normal text-slate-500 pl-16 -mt-2">contact - 7897897898</p>
                        <p>HELPER - <span className="font-normal text-slate-500 ml-1">Another helper</span></p>
                        <p className="ml-4 font-normal text-slate-500 pl-16 -mt-2">contact - 7894568796</p>
                        <div className="pt-2 flex flex-col gap-2">
                          <p>ACTION -</p>
                          <div className="flex gap-4 items-center">
                            <button className="text-yellow-500 hover:text-yellow-600 p-1"><Map size={20}/></button>
                            <button className="text-green-500 hover:text-green-600 p-1"><Edit size={20}/></button>
                            <button className="text-red-500 bg-red-50 hover:bg-red-100 rounded-md p-1.5"><Trash2 size={18}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Right Column: Bus Route Visualizer */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 relative min-h-[500px]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="text-slate-600" />
                  <h2 className="text-xl font-bold text-slate-800">Bus Root</h2>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-1.5 rounded-md hover:bg-blue-100">VIEW</button>
                  <button className="text-blue-500 font-bold text-sm hover:text-blue-700">EDIT</button>
                </div>
              </div>

              {/* Route Map Timeline */}
              <div className="pl-[40%] mt-12 relative h-full pb-10">
                {/* The vertical tracking line */}
                <div className="vertical-line"></div>
                
                {/* Stop Nodes */}
                <div className="relative z-10 space-y-20">
                  
                  {/* Top + node */}
                  <div className="flex items-center gap-4 -ml-[5px]">
                    <div className="timeline-dot bg-white border-2 border-blue-500 text-blue-500 text-xl font-bold">
                       +
                    </div>
                  </div>

                  {/* Stop 1 */}
                  <div className="flex items-center gap-4 relative">
                    <div className="absolute right-full mr-6 text-right whitespace-nowrap top-0">
                      <p className="font-bold text-slate-800">Stop 1</p>
                      <div className="flex items-center justify-end gap-1 text-slate-500 text-xs font-semibold mt-1">
                        <span>06:50 AM</span>
                        <Edit size={12} className="text-green-500 cursor-pointer ml-1" />
                        <Trash2 size={12} className="text-red-500 cursor-pointer" />
                      </div>
                    </div>
                    <div className="timeline-dot bg-white border-[6px] border-emerald-500 ring-2 ring-emerald-500 ring-offset-2 ml-[-1px]">
                       <div className="w-5 h-5 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>

                  {/* Middle + node */}
                  <div className="flex items-center justify-center -ml-[5px] w-[36px]">
                    <div className="timeline-dot w-8 h-8 bg-white border-2 border-blue-500 text-blue-500 text-xl font-bold">
                       +
                    </div>
                  </div>

                  {/* Stop 2 */}
                  <div className="flex items-center gap-4 relative">
                    <div className="absolute left-full ml-6 text-left whitespace-nowrap top-0">
                      <p className="font-bold text-slate-800">Stop 2</p>
                      <div className="flex items-center text-slate-500 text-xs font-semibold mt-1 gap-1">
                        <span>07:00 AM</span>
                        <Edit size={12} className="text-green-500 cursor-pointer ml-1" />
                        <Trash2 size={12} className="text-red-500 cursor-pointer" />
                      </div>
                    </div>
                    <div className="timeline-dot bg-white border-[6px] border-emerald-500 ring-2 ring-emerald-500 ring-offset-2 ml-[-1px]">
                       <div className="w-5 h-5 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  
                  {/* Bottom + node */}
                  <div className="flex items-center justify-center -ml-[5px] w-[36px]">
                    <div className="timeline-dot w-8 h-8 bg-white border-2 border-blue-500 text-blue-500 text-xl font-bold">
                       +
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
      </div>
    </div>
  );
}
