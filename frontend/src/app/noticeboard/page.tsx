import { FileText, Eye, Download, Edit, Trash2 } from 'lucide-react';
import React from 'react';

const notices = [
  { id: 1, title: 'Holiday notice', date: '19 Jun, 2024', body: 'Enjoy your holidays', dot: 'bg-green-400', file: '91KB (png)' },
  { id: 2, title: 'Title 2', date: '19 Jun, 2024', body: 'Body 2', dot: 'bg-red-400', file: '7KB (png)' },
  { id: 3, title: 'Notice title', date: '19 Jun, 2024', body: 'Body', dot: 'bg-yellow-400', file: '474KB (png)' },
];

export default function NoticeBoard() {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-200">
      <div className="mb-6 bg-[#eaeaea] p-4 pb-2 rounded-t-2xl shadow-sm border border-b-0 border-gray-200">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Notice Board</h1>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm mt-6 min-h-[500px]">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              <button className="px-6 py-3 font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                Create Notice
              </button>
              <button className="px-6 py-3 font-semibold text-green-600 border-b-2 border-green-500 relative bg-white -mb-[1px]">
                Notice Board
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <FileText className="text-slate-700" />
                <h2 className="text-xl font-bold text-slate-800">Notice Board</h2>
              </div>
              <button className="text-blue-500 hover:text-blue-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>

            {/* Grid of Notices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-[#f0f2f5] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[10px] rounded-bl-[10px] p-6 relative flex flex-col justify-between shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full ${notice.dot} shadow-sm border border-white/50`}></div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1 pr-8">{notice.title}</h3>
                    <p className="text-slate-400 text-sm mb-6">{notice.date}</p>
                    <p className="text-green-600 font-medium text-sm mb-8">{notice.body}</p>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-slate-200/60 pt-4 mt-4">
                     <div className="flex items-center gap-2 text-blue-500 text-sm font-semibold">
                       <button className="hover:bg-blue-100 p-1.5 rounded-full transition-colors"><Eye size={18} /></button>
                       <button className="hover:bg-blue-100 p-1.5 rounded-full flex items-center gap-1 transition-colors">
                         <Download size={18} />
                         {notice.file}
                       </button>
                     </div>

                     <div className="flex items-center gap-2">
                       <button className="text-green-600 hover:bg-green-100 p-1.5 rounded-md transition-colors"><Edit size={18} /></button>
                       <button className="text-red-500 hover:bg-red-100 p-1.5 rounded-md transition-colors bg-red-50"><Trash2 size={18} /></button>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Mock */}
            <div className="flex justify-end mt-12 mb-4 gap-2">
              <button className="px-3 py-1 bg-slate-100 text-slate-400 rounded-md text-sm font-semibold">prev</button>
              <button className="px-3 py-1 bg-slate-400 text-white rounded-md text-sm font-semibold">1</button>
              <button className="px-3 py-1 bg-slate-100 text-slate-400 rounded-md text-sm font-semibold">next</button>
            </div>
          </div>
      </div>
    </div>
  );
}
