import { User, Users, BookOpen, Bookmark, FileText, Trash2, Info, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header section matches image structure */}
      <div className="mb-6 bg-[#eaeaea] p-4 pb-2 rounded-t-2xl shadow-sm border border-b-0 border-gray-200">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1 pb-4">Analytics</p>
          
          <div className="bg-[#f4f6f8] p-4 rounded-xl">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 relative overflow-hidden group">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-slate-800">1</h3>
                  <p className="text-slate-500 font-medium">Teachers</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 relative overflow-hidden group">
                <div className="w-16 h-16 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-500 shrink-0">
                  <Users size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-slate-800">1</h3>
                  <p className="text-slate-500 font-medium">Students</p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 relative overflow-hidden group">
                <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center text-green-500 shrink-0">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-slate-800">1</h3>
                  <p className="text-slate-500 font-medium text-sm">Home work and<br/>Notes</p>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 relative overflow-hidden group">
                <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center text-red-400 shrink-0">
                  <Bookmark size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-slate-800">3</h3>
                  <p className="text-slate-500 font-medium">Notices</p>
                </div>
              </div>
            </div>

            {/* Bottom 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Latest Notices */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="text-slate-500" />
                    <h2 className="text-xl font-bold text-slate-800">Latest Notices</h2>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <button><Menu size={20}/></button>
                    <button><Users size={20}/></button>
                  </div>
                </div>

                <div className="grid grid-cols-3 text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                  <div>Title</div>
                  <div>Date</div>
                  <div>Sender</div>
                </div>

                <div className="space-y-4">
                  {[
                    { color: 'bg-green-500', title: 'Holiday notice', date: '19 Jun, 2024', sender: 'You' },
                    { color: 'bg-red-500', title: 'Title 2', date: '19 Jun, 2024', sender: 'You' },
                    { color: 'bg-yellow-400', title: 'Notice title', date: '19 Jun, 2024', sender: 'You' },
                  ].map((notice, i) => (
                    <div key={i} className="grid grid-cols-3 text-sm text-slate-600 items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${notice.color}`}></div>
                        <span className="font-medium text-slate-700">{notice.title}</span>
                      </div>
                      <div>{notice.date}</div>
                      <div>{notice.sender}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reminders */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="text-slate-500" />
                    <h2 className="text-xl font-bold text-slate-800">Remiders</h2>
                  </div>
                  <button className="text-slate-400 font-bold">+</button>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between border-l-4 border-l-yellow-400">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center font-bold text-xs">i</div>
                      <span className="text-sm font-medium text-slate-600">Reminder for myself : have a good day</span>
                    </div>
                    <button className="text-red-500 bg-red-50 p-1.5 rounded-md hover:bg-red-100"><Trash2 size={16}/></button>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={24} className="text-blue-500"/>
                      <span className="text-sm font-medium text-slate-600">Best of luck</span>
                    </div>
                    <button className="text-red-500 bg-red-50 p-1.5 rounded-md hover:bg-red-100"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </div>
    </div>
  );
}
