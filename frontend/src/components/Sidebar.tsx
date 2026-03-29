import Link from 'next/link';
import { 
  LayoutDashboard, User, Users, BookOpen, UserCheck, 
  ClipboardList, Calendar, MapPin, FileText, FileBadge, Bus, Settings,
  Award, UsersRound, Library, Calculator, GraduationCap, BedDouble, MessageSquare,
  Briefcase, Clipboard, FileCheck, Clock, GraduationCap as Certificate
} from 'lucide-react';
import React from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: User, label: 'Teacher', href: '/teacher' },
  { icon: Briefcase, label: 'Employee', href: '/employee' },
  { icon: Users, label: 'Student', href: '/student' },
  { icon: UsersRound, label: 'Parents', href: '/parents' },
  { icon: BookOpen, label: 'Subjects', href: '/subjects' },
  { icon: UserCheck, label: 'Attendance', href: '/attendance' },
  { icon: ClipboardList, label: 'Notice Board', href: '/noticeboard' },
  { icon: Calendar, label: 'Time Table', href: '/timetable' },
  { icon: BookOpen, label: 'Syllabus', href: '/syllabus' },
  { icon: FileText, label: 'Notes', href: '/notes' },
  { icon: FileBadge, label: 'Marks', href: '/marks' },
  { icon: Library, label: 'Library', href: '/library' },
  { icon: Calculator, label: 'Accounts', href: '/accounts' },
  { icon: GraduationCap, label: 'Examination', href: '/examination' },
  { icon: BedDouble, label: 'Hostel', href: '/hostel' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Bus, label: 'Bus Service', href: '/bus-service' },
  { icon: Clipboard, label: 'Leaves', href: '/leaves' },
  { icon: FileCheck, label: 'Certificate', href: '/certificate' },
  { icon: Award, label: 'QA Evaluation', href: '/qa' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-slate-200 shadow-sm fixed top-0 left-0 z-10">
      <div className="p-4 flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          {/* Mock Logo */}
          <span className="text-white font-bold text-xs">🍊</span>
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-slate-800">ERP</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-green-600 group transition-colors"
          >
            <item.icon size={20} className="text-slate-500 group-hover:text-green-500 transition-colors" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Ticker / Stock Mockup at bottom as per screenshot */}
      <div className="border-t border-slate-100 p-4 text-xs font-semibold text-slate-600 flex flex-col pt-3 pb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-red-500"></span>
             <span>USD/INR</span>
          </div>
        </div>
        <span className="text-green-500 mb-1">+0.10%</span>
        <span className="text-slate-400 font-normal leading-tight">Finance headline<br/>Fed officials urg...</span>
      </div>
    </aside>
  );
}
