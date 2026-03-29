'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, BookOpen, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { subjectApi } from '@/api';
import { Subject } from '@/types';

const classes = ['10-A', '10-B', '9-A', '11-A', '11-B', '12-A', '13-A'];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    classId: '',
    teacherId: '',
    creditHours: 4,
    type: 'theory' as 'theory' | 'practical'
  });

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoading(true);
        const response = await subjectApi.getAll();
        setSubjects(response.data || []);
      } catch (err: any) {
        console.error('Error fetching subjects:', err);
        setError('Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };
    loadSubjects();
  }, []);

  const filteredSubjects = subjects.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingSubject) {
        const updated = await subjectApi.update(editingSubject.id, formData);
        setSubjects(subjects.map(s => s.id === editingSubject.id ? updated : s));
      } else {
        const created = await subjectApi.create(formData);
        setSubjects([...subjects, created]);
      }
      closeModal();
    } catch (err: any) {
      console.error('Error saving subject:', err);
      setError('Failed to save subject');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await subjectApi.delete(id);
      setSubjects(subjects.filter(s => s.id !== id));
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error('Error deleting subject:', err);
      setError('Failed to delete subject');
    }
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name || '',
      code: subject.code || '',
      classId: subject.classId || '',
      teacherId: subject.teacherId || '',
      creditHours: subject.creditHours || 4,
      type: subject.type || 'theory'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setFormData({ name: '', code: '', classId: '', teacherId: '', creditHours: 4, type: 'theory' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Subjects</h1>
          <p className="text-slate-500">Manage subjects and courses</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => openEditModal(subject)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <button type="button" onClick={() => setShowDeleteConfirm(subject.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-slate-800">{subject.name}</h3>
              <p className="text-slate-500 text-sm">Code: {subject.code}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium capitalize">{subject.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Credits</span>
                  <span className="font-medium">{subject.creditHours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredSubjects.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-slate-500">No subjects found</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{editingSubject ? 'Edit Subject' : 'Add New Subject'}</h2>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-1">Subject Code</label>
                  <input
                    id="code"
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., MATH"
                  />
                </div>
                <div>
                  <label htmlFor="creditHours" className="block text-sm font-medium text-slate-700 mb-1">Credits</label>
                  <input
                    id="creditHours"
                    type="number"
                    required
                    min="1"
                    max="10"
                    value={formData.creditHours}
                    onChange={(e) => setFormData({ ...formData, creditHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    id="type"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'theory' | 'practical' })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="theory">Theory</option>
                    <option value="practical">Practical</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="classId" className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select
                    id="classId"
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} disabled={submitting} className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {editingSubject ? 'Update' : 'Add'} Subject
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
            <p className="text-slate-600 mb-4">Are you sure you want to delete this subject? This action cannot be undone.</p>
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
