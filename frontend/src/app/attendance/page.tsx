'use client';

import { useState } from 'react';
import { Search, Calendar, CheckCircle, XCircle, Clock, User, Filter } from 'lucide-react';

interface AttendanceRecord {
  id: number;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

const initialAttendance: AttendanceRecord[] = [
  { id: 1, studentName: 'Arun Kumar', class: '10-A', date: '2024-03-20', status: 'present' },
  { id: 2, studentName: 'Divya Sharma', class: '10-A', date: '2024-03-20', status: 'present' },
  { id: 3, studentName: 'Karthik Raja', class: '10-A', date: '2024-03-20', status: 'absent' },
  { id: 4, studentName: 'Meena Kumari', class: '10-A', date: '2024-03-20', status: 'late' },
  { id: 5, studentName: 'Vikram Singh', class: '10-A', date: '2024-03-20', status: 'present' },
  { id: 6, studentName: 'Arun Kumar', class: '10-A', date: '2024-03-19', status: 'present' },
  { id: 7, studentName: 'Divya Sharma', class: '10-A', date: '2024-03-19', status: 'excused' },
];

const studentsList = ['Arun Kumar', 'Divya Sharma', 'Karthik Raja', 'Meena Kumari', 'Vikram Singh'];
const classes = ['10-A', '10-B', '9-A', '11-A', '11-B'];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('10-A');
  const [filterDate, setFilterDate] = useState('2024-03-20');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [selectedClass, setSelectedClass] = useState('10-A');
  
  const [dailyAttendance, setDailyAttendance] = useState<Record<string, 'present' | 'absent' | 'late' | 'excused'>>({
    'Arun Kumar': 'present',
    'Divya Sharma': 'present',
    'Karthik Raja': 'present',
    'Meena Kumari': 'present',
    'Vikram Singh': 'present',
  });

  const filteredAttendance = attendance.filter(a => {
    const matchSearch = a.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = filterClass ? a.class === filterClass : true;
    const matchDate = filterDate ? a.date === filterDate : true;
    return matchSearch && matchClass && matchDate;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present': return <CheckCircle className="text-green-500" size={18} />;
      case 'absent': return <XCircle className="text-red-500" size={18} />;
      case 'late': return <Clock className="text-yellow-500" size={18} />;
      case 'excused': return <span className="text-blue-500 text-xs">EXC</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Present</span>;
      case 'absent': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Absent</span>;
      case 'late': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Late</span>;
      case 'excused': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Excused</span>;
    }
  };

  const handleStatusChange = (student: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setDailyAttendance(prev => ({ ...prev, [student]: status }));
  };

  const handleSaveAttendance = () => {
    const newRecords: AttendanceRecord[] = studentsList.map((student, idx) => ({
      id: Date.now() + idx,
      studentName: student,
      class: selectedClass,
      date: selectedDate,
      status: dailyAttendance[student]
    }));
    setAttendance([...attendance.filter(a => a.date !== selectedDate || a.class !== selectedClass), ...newRecords]);
    setShowModal(false);
  };

  const presentCount = filteredAttendance.filter(a => a.status === 'present').length;
  const absentCount = filteredAttendance.filter(a => a.status === 'absent').length;
  const lateCount = filteredAttendance.filter(a => a.status === 'late').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
          <p className="text-slate-500">Track student attendance</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Calendar size={20} />
          Mark Attendance
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{presentCount}</div>
              <div className="text-slate-500 text-sm">Present</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{absentCount}</div>
              <div className="text-slate-500 text-sm">Absent</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{lateCount}</div>
              <div className="text-slate-500 text-sm">Late</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{filteredAttendance.length}</div>
              <div className="text-slate-500 text-sm">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
          />
        </div>
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Student</th>
              <th className="text-left p-4 font-semibold text-slate-600">Class</th>
              <th className="text-left p-4 font-semibold text-slate-600">Date</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((record) => (
              <tr key={record.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {record.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{record.studentName}</span>
                  </div>
                </td>
                <td className="p-4">{record.class}</td>
                <td className="p-4">{record.date}</td>
                <td className="p-4">{getStatusBadge(record.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAttendance.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No attendance records found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Mark Attendance</h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-slate-700">Students</h3>
                {studentsList.map((student) => (
                  <div key={student} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{student}</span>
                    <div className="flex gap-1">
                      {(['present', 'absent', 'late', 'excused'] as const).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(student, status)}
                          className={`px-2 py-1 text-xs rounded ${
                            dailyAttendance[student] === status
                              ? status === 'present' ? 'bg-green-500 text-white' :
                                status === 'absent' ? 'bg-red-500 text-white' :
                                status === 'late' ? 'bg-yellow-500 text-white' :
                                'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAttendance}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
