'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, FileText, Download, Eye } from 'lucide-react';

const studyMaterials = [
  { id: 1, title: 'Mathematics Chapter 1', class: '10-A', subject: 'Maths', type: 'PDF', size: '2.5 MB', date: '2024-01-15', uploadedBy: 'Mr. Ramesh' },
  { id: 2, title: 'Physics Notes', class: '10-A', subject: 'Physics', type: 'PDF', size: '1.8 MB', date: '2024-01-14', uploadedBy: 'Mr. Suresh' },
  { id: 3, title: 'Chemistry Formula Sheet', class: '11-A', subject: 'Chemistry', type: 'PDF', size: '500 KB', date: '2024-01-13', uploadedBy: 'Ms. Lakshmi' },
  { id: 4, title: 'English Grammar', class: '9-A', subject: 'English', type: 'DOC', size: '1.2 MB', date: '2024-01-12', uploadedBy: 'Ms. Radhika' },
  { id: 5, title: 'Tamil Sums', class: '10-B', subject: 'Tamil', type: 'PDF', size: '800 KB', date: '2024-01-11', uploadedBy: 'Mr. Kumar' },
];

export default function SyllabusPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = studyMaterials.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Study Materials / Downloads</h1>
          <p className="text-slate-500">Upload and manage study materials</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Upload Material
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search materials..."
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
              <th className="text-left p-4 font-semibold text-slate-600">Title</th>
              <th className="text-left p-4 font-semibold text-slate-600">Class</th>
              <th className="text-left p-4 font-semibold text-slate-600">Subject</th>
              <th className="text-left p-4 font-semibold text-slate-600">Type</th>
              <th className="text-left p-4 font-semibold text-slate-600">Size</th>
              <th className="text-left p-4 font-semibold text-slate-600">Uploaded By</th>
              <th className="text-left p-4 font-semibold text-slate-600">Date</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material) => (
              <tr key={material.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{material.title}</td>
                <td className="p-4 text-slate-600">{material.class}</td>
                <td className="p-4 text-slate-600">{material.subject}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{material.type}</span>
                </td>
                <td className="p-4 text-slate-600">{material.size}</td>
                <td className="p-4 text-slate-600">{material.uploadedBy}</td>
                <td className="p-4 text-slate-600">{material.date}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button type="button" className="text-slate-400 hover:text-green-600">
                      <Eye size={18} />
                    </button>
                    <button type="button" className="text-slate-400 hover:text-green-600">
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
