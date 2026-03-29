'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, Award, Calendar, BookOpen } from 'lucide-react';

const students = [
  { id: 1, name: 'Arun Kumar', class: '10-A', rollNo: 101, phone: '+91 98765 43210', email: 'arun@school.edu', attendance: '95%' },
  { id: 2, name: 'Divya Sharma', class: '10-A', rollNo: 102, phone: '+91 98765 43211', email: 'divya@school.edu', attendance: '98%' },
  { id: 3, name: 'Karthik Raja', class: '10-B', rollNo: 201, phone: '+91 98765 43212', email: 'karthik@school.edu', attendance: '92%' },
  { id: 4, name: 'Meena Kumari', class: '9-A', rollNo: 301, phone: '+91 98765 43213', email: 'meena@school.edu', attendance: '97%' },
  { id: 5, name: 'Vikram Singh', class: '11-A', rollNo: 401, phone: '+91 98765 43214', email: 'vikram@school.edu', attendance: '88%' },
];

export default function StudentPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>
          <p className="text-slate-500">Manage student records</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Roll No</th>
              <th className="text-left p-4 font-semibold text-slate-600">Name</th>
              <th className="text-left p-4 font-semibold text-slate-600">Class</th>
              <th className="text-left p-4 font-semibold text-slate-600">Phone</th>
              <th className="text-left p-4 font-semibold text-slate-600">Attendance</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{student.rollNo}</td>
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4">{student.class}</td>
                <td className="p-4 text-slate-600">{student.phone}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.attendance.startsWith('9') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {student.attendance}
                  </span>
                </td>
                <td className="p-4">
                  <button type="button" className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
