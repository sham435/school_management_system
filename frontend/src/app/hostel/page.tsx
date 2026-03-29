'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Calendar, MapPin, Bed, User } from 'lucide-react';

const hostelBlocks = [
  { id: 1, name: 'Boys Hostel A', type: 'Boys', capacity: 100, occupied: 85, vacant: 15, warden: 'Mr. Ramesh' },
  { id: 2, name: 'Girls Hostel B', type: 'Girls', capacity: 80, occupied: 72, vacant: 8, warden: 'Ms. Lakshmi' },
  { id: 3, name: 'Boys Hostel B', type: 'Boys', capacity: 120, occupied: 95, vacant: 25, warden: 'Mr. Suresh' },
];

const students = [
  { id: 1, name: 'Arun Kumar', room: 'A-101', bed: 'Lower', joinDate: '2024-01-01', parentPhone: '+91 98765 43210' },
  { id: 2, name: 'Karthik Raja', room: 'A-102', bed: 'Upper', joinDate: '2024-01-01', parentPhone: '+91 98765 43211' },
  { id: 3, name: 'Ravi Kumar', room: 'B-201', bed: 'Lower', joinDate: '2024-01-05', parentPhone: '+91 98765 43212' },
];

export default function HostelPage() {
  const [activeTab, setActiveTab] = useState('blocks');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hostel</h1>
          <p className="text-slate-500">Manage hostel blocks and students</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bed className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Beds</p>
              <p className="text-2xl font-bold text-slate-800">300</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Occupied</p>
              <p className="text-2xl font-bold text-slate-800">252</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Vacant</p>
              <p className="text-2xl font-bold text-slate-800">48</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Blocks</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('blocks')}
          type="button"
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'blocks' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Hostel Blocks
        </button>
        <button
          onClick={() => setActiveTab('students')}
          type="button"
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'students' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Hostel Students
        </button>
      </div>

      {activeTab === 'blocks' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">Block Name</th>
                <th className="text-left p-4 font-semibold text-slate-600">Type</th>
                <th className="text-left p-4 font-semibold text-slate-600">Capacity</th>
                <th className="text-left p-4 font-semibold text-slate-600">Occupied</th>
                <th className="text-left p-4 font-semibold text-slate-600">Vacant</th>
                <th className="text-left p-4 font-semibold text-slate-600">Warden</th>
                <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostelBlocks.map((block) => (
                <tr key={block.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{block.name}</td>
                  <td className="p-4 text-slate-600">{block.type}</td>
                  <td className="p-4">{block.capacity}</td>
                  <td className="p-4 text-green-600">{block.occupied}</td>
                  <td className="p-4 text-orange-600">{block.vacant}</td>
                  <td className="p-4 text-slate-600">{block.warden}</td>
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
      )}

      {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">Student Name</th>
                <th className="text-left p-4 font-semibold text-slate-600">Room No</th>
                <th className="text-left p-4 font-semibold text-slate-600">Bed</th>
                <th className="text-left p-4 font-semibold text-slate-600">Join Date</th>
                <th className="text-left p-4 font-semibold text-slate-600">Parent Phone</th>
                <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-slate-600">{student.room}</td>
                  <td className="p-4 text-slate-600">{student.bed}</td>
                  <td className="p-4 text-slate-600">{student.joinDate}</td>
                  <td className="p-4 text-slate-600">{student.parentPhone}</td>
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
      )}
    </div>
  );
}
