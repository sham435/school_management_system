'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Calendar, Clock, BookOpen, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { timetableApi } from '@/api';
import { TimetablePeriod } from '@/types';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const classes = ['10-A', '10-B', '9-A', '11-A', '11-B'];
const subjects = ['Mathematics', 'English', 'Tamil', 'Science', 'History', 'Geography', 'Computer'];

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<TimetablePeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState<number>(1);
  const [filterClass, setFilterClass] = useState('10-A');
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetablePeriod | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    dayOfWeek: 1,
    startTime: '08:00',
    endTime: '08:40',
    subjectId: '',
    classId: '10-A',
    roomNo: ''
  });

  useEffect(() => {
    const loadTimetable = async () => {
      try {
        setLoading(true);
        const response = await timetableApi.getAll({ classId: filterClass, dayOfWeek: filterDay });
        setTimetable(response.data || []);
      } catch (err: any) {
        console.error('Error fetching timetable:', err);
        setError('Failed to load timetable');
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
  }, [filterClass, filterDay]);

  const filteredTimetable = timetable.filter(t => 
    t.startTime?.includes(searchTerm.toLowerCase()) ||
    t.endTime?.includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingSlot) {
        const updated = await timetableApi.update(editingSlot.id, formData);
        setTimetable(timetable.map(t => t.id === editingSlot.id ? updated : t));
      } else {
        const created = await timetableApi.create(formData);
        setTimetable([...timetable, created]);
      }
      closeModal();
    } catch (err: any) {
      console.error('Error saving timetable:', err);
      setError('Failed to save timetable');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await timetableApi.delete(id);
      setTimetable(timetable.filter(t => t.id !== id));
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error('Error deleting timetable:', err);
      setError('Failed to delete timetable');
    }
  };

  const openEditModal = (slot: TimetablePeriod) => {
    setEditingSlot(slot);
    setFormData({
      dayOfWeek: slot.dayOfWeek || 1,
      startTime: slot.startTime || '08:00',
      endTime: slot.endTime || '08:40',
      subjectId: slot.subjectId || '',
      classId: slot.classId || '10-A',
      roomNo: slot.roomNo || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlot(null);
    setFormData({ dayOfWeek: 1, startTime: '08:00', endTime: '08:40', subjectId: '', classId: '10-A', roomNo: '' });
  };

  const getDayName = (day: number) => days[day - 1] || '';

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Timetable</h1>
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

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Day</label>
            <select
              value={filterDay}
              onChange={(e) => setFilterDay(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {days.map((d, i) => <option key={i} value={i + 1}>{d}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by time..."
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
                <th className="text-left p-4 font-semibold text-slate-600">Period</th>
                <th className="text-left p-4 font-semibold text-slate-600">Time</th>
                <th className="text-left p-4 font-semibold text-slate-600">Subject</th>
                <th className="text-left p-4 font-semibold text-slate-600">Room</th>
                <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimetable.map((slot, idx) => (
                <tr key={slot.id || idx} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{idx + 1}</td>
                  <td className="p-4">{slot.startTime} - {slot.endTime}</td>
                  <td className="p-4">{slot.subjectId}</td>
                  <td className="p-4">{slot.roomNo || '-'}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button 
                        type="button"
                        onClick={() => openEditModal(slot)}
                        className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowDeleteConfirm(slot.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
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
              <p className="text-slate-500">No timetable slots found</p>
            </div>
          )}
        </div>
      )}

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
              <div>
                <label htmlFor="dayOfWeek" className="block text-sm font-medium text-slate-700 mb-1">Day</label>
                <select
                  id="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {days.map((d, i) => <option key={i} value={i + 1}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                  <input
                    id="startTime"
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                  <input
                    id="endTime"
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subjectId" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select
                  id="subjectId"
                  required
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="classId" className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select
                    id="classId"
                    required
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="roomNo" className="block text-sm font-medium text-slate-700 mb-1">Room No</label>
                  <input
                    id="roomNo"
                    type="text"
                    value={formData.roomNo}
                    onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Room 101"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {editingSlot ? 'Update' : 'Add'} Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-slate-600 mb-4">Are you sure you want to delete this period?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
