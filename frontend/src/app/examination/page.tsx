'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, FileText, Calendar, Clock } from 'lucide-react';

const exams = [
  { id: 1, name: 'Unit Test 1', class: '10-A', subject: 'Maths', date: '2024-02-15', time: '09:00 AM', duration: '2 hrs', totalMarks: 50, status: 'Scheduled' },
  { id: 2, name: 'Unit Test 1', class: '10-A', subject: 'Physics', date: '2024-02-16', time: '09:00 AM', duration: '2 hrs', totalMarks: 50, status: 'Scheduled' },
  { id: 3, name: 'Half Yearly', class: '10-A', subject: 'Chemistry', date: '2024-03-01', time: '09:00 AM', duration: '3 hrs', totalMarks: 100, status: 'Scheduled' },
  { id: 4, name: 'Unit Test 1', class: '9-A', subject: 'English', date: '2024-02-15', time: '01:00 PM', duration: '2 hrs', totalMarks: 50, status: 'Completed' },
  { id: 5, name: 'Half Yearly', class: '11-A', subject: 'Maths', date: '2024-03-01', time: '09:00 AM', duration: '3 hrs', totalMarks: 100, status: 'Scheduled' },
];

const results = [
  { id: 1, exam: 'Unit Test 1', class: '10-A', subject: 'Maths', avgMarks: 42.5, highest: 50, lowest: 28, passRate: '92%' },
  { id: 2, exam: 'Unit Test 1', class: '10-A', subject: 'Physics', avgMarks: 38.2, highest: 48, lowest: 22, passRate: '85%' },
  { id: 3, exam: 'Unit Test 1', class: '9-A', subject: 'English', avgMarks: 45.0, highest: 50, lowest: 30, passRate: '95%' },
];

export default function ExaminationPage() {
  const [activeTab, setActiveTab] = useState('exams');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = exams.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Examination</h1>
          <p className="text-slate-500">Manage exams and results</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Create Exam
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'exams' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Exam List
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'results' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Results
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'schedule' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Exam Schedule
        </button>
      </div>

      {activeTab === 'exams' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search exams..."
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
                  <th className="text-left p-4 font-semibold text-slate-600">Exam Name</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Class</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Subject</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Date</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Time</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Duration</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Total Marks</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Status</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{exam.name}</td>
                    <td className="p-4 text-slate-600">{exam.class}</td>
                    <td className="p-4 text-slate-600">{exam.subject}</td>
                    <td className="p-4 text-slate-600">{exam.date}</td>
                    <td className="p-4 text-slate-600">{exam.time}</td>
                    <td className="p-4 text-slate-600">{exam.duration}</td>
                    <td className="p-4 text-slate-600">{exam.totalMarks}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${exam.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {exam.status}
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
        </>
      )}

      {activeTab === 'results' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">Exam</th>
                <th className="text-left p-4 font-semibold text-slate-600">Class</th>
                <th className="text-left p-4 font-semibold text-slate-600">Subject</th>
                <th className="text-left p-4 font-semibold text-slate-600">Avg Marks</th>
                <th className="text-left p-4 font-semibold text-slate-600">Highest</th>
                <th className="text-left p-4 font-semibold text-slate-600">Lowest</th>
                <th className="text-left p-4 font-semibold text-slate-600">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{result.exam}</td>
                  <td className="p-4 text-slate-600">{result.class}</td>
                  <td className="p-4 text-slate-600">{result.subject}</td>
                  <td className="p-4">{result.avgMarks}</td>
                  <td className="p-4 text-green-600">{result.highest}</td>
                  <td className="p-4 text-red-600">{result.lowest}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{result.passRate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Exam Schedule Calendar</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="p-2 text-center font-semibold text-slate-600">{day}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className={`p-2 border rounded ${i + 1 === 15 || i + 1 === 16 ? 'bg-blue-100' : 'bg-slate-50'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
