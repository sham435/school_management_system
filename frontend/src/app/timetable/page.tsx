'use client';

import { useState } from 'react';
import { Search, Plus, Calendar, Clock, BookOpen, Edit, Trash2, X } from 'lucide-react';

interface TimeSlot {
  id: number;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  class: string;
  day: string;
  teacher: string;
}

const initialTimetable: TimeSlot[] = [
  { id: 1, period: 1, startTime: '08:00', endTime: '08:40', subject: 'Mathematics', class: '10-A', day: 'Monday', teacher: 'Rajesh Kumar' },
  { id: 2, period: 2, startTime: '08:40', endTime: '09:20', subject: 'English', class: '10-A', day: 'Monday', teacher: 'Priya Sharma' },
  { id: 3, period: 3, startTime: '09:20', endTime: '10:00', subject: 'Tamil', class: '10-A', day: 'Monday', teacher: 'Smt. Lakshmi' },
  { id: 4, period: 4, startTime: '10:00', endTime: '10:40', subject: 'Science', class: '10-A', day: 'Monday', teacher: 'Ahmed Khan' },
  { id: 5, period: 5, startTime: '11:00', endTime: '11:40', subject: 'History', class: '10-A', day: 'Monday', teacher: 'John Peter' },
  { id: 6, period: 1, startTime: '08:00', endTime: '08:40', subject: 'Tamil', class: '10-A', day: 'Tuesday', teacher: 'Smt. Lakshmi' },
  { id: 7, period: 2, startTime: '08:40', endTime: '09:20', subject: 'Mathematics', class: '10-A', day: 'Tuesday', teacher: 'Rajesh Kumar' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const classes = ['10-A', '10-B', '9-A', '11-A', '11-B'];
const subjects = ['Mathematics', 'English', 'Tamil', 'Science', 'History', 'Geography', 'Computer'];
const teachers = ['Rajesh Kumar', 'Priya Sharma', 'Ahmed Khan', 'Smt. Lakshmi', 'John Peter'];

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<TimeSlot[]>(initialTimetable);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [filterClass, setFilterClass] = useState('10-A');
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  
  const [formData, setFormData] = useState({
    day: 'Monday',
    period: 1,
    startTime: '08:00',
    endTime: '08:40',
    subject: '',
    class: '10-A',
    teacher: ''
  });

  const filteredTimetable = timetable.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDay = filterDay ? t.day === filterDay : true;
    const matchClass = t.class === filterClass;
    return matchSearch && matchDay && matchClass;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlot) {
      setTimetable(timetable.map(t => t.id === editingSlot.id ? { ...formData, id: editingSlot.id } : t));
    } else {
      setTimetable([...timetable, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setTimetable(timetable.filter(t => t.id !== id));
  };

  const openEditModal = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setFormData(slot);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlot(null);
    setFormData({ day: 'Monday', period: 1, startTime: '08:00', endTime: '08:40', subject: '', class: '10-A', teacher: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Time Table</h1>
          <p className="text-slate-500">Manage class schedules</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add Period
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search timetable..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
          />
        </div>
        <select
          value={filterDay}
          onChange={(e) => setFilterDay(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">All Days</option>
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Day</th>
              <th className="text-left p-4 font-semibold text-slate-600">Period</th>
              <th className="text-left p-4 font-semibold text-slate-600">Time</th>
              <th className="text-left p-4 font-semibold text-slate-600">Subject</th>
              <th className="text-left p-4 font-semibold text-slate-600">Class</th>
              <th className="text-left p-4 font-semibold text-slate-600">Teacher</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimetable.map((slot) => (
              <tr key={slot.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{slot.day}</td>
                <td className="p-4">{slot.period}</td>
                <td className="p-4 text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock size={14} />
                    {slot.startTime} - {slot.endTime}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-500" />
                    {slot.subject}
                  </div>
                </td>
                <td className="p-4">{slot.class}</td>
                <td className="p-4 text-slate-600">{slot.teacher}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => openEditModal(slot)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={18} />
                    </button>
                    <button type="button" onClick={() => handleDelete(slot.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTimetable.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No timetable entries found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{editingSlot ? 'Edit Period' : 'Add Period'}</h2>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="day" className="block text-sm font-medium text-slate-700 mb-1">Day</label>
                  <select
                    id="day"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="period" className="block text-sm font-medium text-slate-700 mb-1">Period</label>
                  <input
                    id="period"
                    type="number"
                    min="1"
                    max="8"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                  <input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                  <input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="teacher" className="block text-sm font-medium text-slate-700 mb-1">Teacher</label>
                  <select
                    id="teacher"
                    required
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  {editingSlot ? 'Update' : 'Add'} Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
