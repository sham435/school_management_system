'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, CheckCircle, XCircle, Clock, User, Filter, Loader2, Save } from 'lucide-react';
import { attendanceApi, studentApi } from '@/api';
import { Attendance, Student } from '@/types';

const classes = ['10-A', '10-B', '9-A', '11-A', '11-B'];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('10-A');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [saving, setSaving] = useState(false);
  
  const [dailyAttendance, setDailyAttendance] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [attendanceRes, studentsRes] = await Promise.all([
          attendanceApi.getAll({ classId: filterClass, date: filterDate }),
          studentApi.getAll({ classId: filterClass })
        ]);
        setAttendance(attendanceRes.data || []);
        setStudents(studentsRes.data || []);
        
        const attendanceMap: Record<string, string> = {};
        studentsRes.data?.forEach((s: Student) => {
          const record = attendanceRes.data?.find((a: Attendance) => a.studentId === s.id);
          attendanceMap[s.id] = record?.status || 'present';
        });
        setDailyAttendance(attendanceMap);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filterClass, filterDate]);

  const filteredAttendance = attendance.filter(a => {
    const student = students.find(s => s.id === a.studentId);
    const studentName = student ? `${student.firstName} ${student.lastName}` : '';
    const matchSearch = studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
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

  const handleStatusChange = (studentId: string, status: string) => {
    setDailyAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);
      const attendanceData = Object.entries(dailyAttendance).map(([studentId, status]) => ({
        studentId,
        classId: selectedClass,
        date: selectedDate,
        status: status as 'present' | 'absent' | 'late' | 'excused'
      }));
      
      await attendanceApi.markBulk(selectedClass, selectedDate, attendanceData);
      setShowModal(false);
      
      const attendanceRes = await attendanceApi.getAll({ classId: selectedClass, date: selectedDate });
      setAttendance(attendanceRes.data || []);
    } catch (err: any) {
      console.error('Error saving attendance:', err);
      setError('Failed to save attendance');
    } finally {
      setSaving(false);
    }
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

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{presentCount}</p>
              <p className="text-sm text-slate-500">Present</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{absentCount}</p>
              <p className="text-sm text-slate-500">Absent</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{lateCount}</p>
              <p className="text-sm text-slate-500">Late</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{students.length}</p>
              <p className="text-sm text-slate-500">Total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-slate-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
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
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
      ) : (
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
              {filteredAttendance.map((record) => {
                const student = students.find(s => s.id === record.studentId);
                return (
                  <tr key={record.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{student ? `${student.firstName} ${student.lastName}` : record.studentId}</td>
                    <td className="p-4">{record.classId}</td>
                    <td className="p-4">{record.date}</td>
                    <td className="p-4">{getStatusBadge(record.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredAttendance.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No attendance records found</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-slate-700">Students</p>
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{student.firstName} {student.lastName}</span>
                    <div className="flex gap-1">
                      {(['present', 'absent', 'late', 'excused'] as const).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(student.id, status)}
                          className={`px-3 py-1 rounded text-sm ${
                            dailyAttendance[student.id] === status
                              ? status === 'present' ? 'bg-green-600 text-white' 
                              : status === 'absent' ? 'bg-red-600 text-white'
                              : status === 'late' ? 'bg-yellow-500 text-white'
                              : 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
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
                  disabled={saving}
                  className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAttendance}
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
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
