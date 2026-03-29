'use client';

import { useState } from 'react';
import { Search, Plus, BookOpen, Edit, Trash2, X } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
  class: string;
  teacher: string;
  credits: number;
}

const initialSubjects: Subject[] = [
  { id: 1, name: 'Mathematics', code: 'MATH', class: '10-A', teacher: 'Rajesh Kumar', credits: 4 },
  { id: 2, name: 'English', code: 'ENG', class: '10-A', teacher: 'Priya Sharma', credits: 4 },
  { id: 3, name: 'Tamil', code: 'TAM', class: '10-A', teacher: 'Smt. Lakshmi', credits: 4 },
  { id: 4, name: 'Science', code: 'SCI', class: '10-A', teacher: 'Ahmed Khan', credits: 4 },
  { id: 5, name: 'History', code: 'HIS', class: '10-A', teacher: 'John Peter', credits: 3 },
];

const classes = ['10-A', '10-B', '9-A', '11-A', '11-B', '12-A', '13-A'];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    class: '',
    teacher: '',
    credits: 4
  });

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...formData, id: editingSubject.id } : s));
    } else {
      setSubjects([...subjects, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData(subject);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setFormData({ name: '', code: '', class: '', teacher: '', credits: 4 });
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

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

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
                <button type="button" onClick={() => handleDelete(subject.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg text-slate-800">{subject.name}</h3>
            <p className="text-slate-500 text-sm">Code: {subject.code}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Class</span>
                <span className="font-medium">{subject.class}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Teacher</span>
                <span className="font-medium">{subject.teacher}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Credits</span>
                <span className="font-medium">{subject.credits}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
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
                  className="w-full px-3 py-2 border rounded-lg"
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
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., MATH"
                  />
                </div>
                <div>
                  <label htmlFor="credits" className="block text-sm font-medium text-slate-700 mb-1">Credits</label>
                  <input
                    id="credits"
                    type="number"
                    required
                    min="1"
                    max="10"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select
                    id="class"
                    required
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="teacher" className="block text-sm font-medium text-slate-700 mb-1">Teacher</label>
                  <input
                    id="teacher"
                    type="text"
                    required
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Teacher name"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  {editingSubject ? 'Update' : 'Add'} Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
