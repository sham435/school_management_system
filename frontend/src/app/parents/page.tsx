'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Phone, Mail, User } from 'lucide-react';

const parents = [
  { id: 1, name: 'Ramasamy', student: 'Arun Kumar', class: '10-A', phone: '+91 98765 43210', email: 'ramasamy@email.com', occupation: 'Business' },
  { id: 2, name: 'Lakshmi', student: 'Divya Sharma', class: '10-A', phone: '+91 98765 43211', email: 'lakshmi@email.com', occupation: 'Housewife' },
  { id: 3, name: 'Rajendran', student: 'Karthik Raja', class: '10-B', phone: '+91 98765 43212', email: 'rajendran@email.com', occupation: 'Engineer' },
  { id: 4, name: 'Kamala', student: 'Meena Kumari', class: '9-A', phone: '+91 98765 43213', email: 'kamala@email.com', occupation: 'Teacher' },
  { id: 5, name: 'Singh', student: 'Vikram Singh', class: '11-A', phone: '+91 98765 43214', email: 'singh@email.com', occupation: 'Doctor' },
];

export default function ParentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParents = parents.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Parents</h1>
          <p className="text-slate-500">Manage parent records</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Add Parent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search parents..."
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
              <th className="text-left p-4 font-semibold text-slate-600">Parent Name</th>
              <th className="text-left p-4 font-semibold text-slate-600">Student</th>
              <th className="text-left p-4 font-semibold text-slate-600">Class</th>
              <th className="text-left p-4 font-semibold text-slate-600">Phone</th>
              <th className="text-left p-4 font-semibold text-slate-600">Occupation</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParents.map((parent) => (
              <tr key={parent.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{parent.name}</td>
                <td className="p-4">{parent.student}</td>
                <td className="p-4">{parent.class}</td>
                <td className="p-4 text-slate-600">{parent.phone}</td>
                <td className="p-4 text-slate-600">{parent.occupation}</td>
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
