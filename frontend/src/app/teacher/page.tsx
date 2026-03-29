'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, Award, Calendar, Edit, Trash2, X } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  phone: string;
  email: string;
  experience: string;
  qualification: string;
}

const initialTeachers: Teacher[] = [
  { id: 1, name: 'Rajesh Kumar', subject: 'Mathematics', phone: '+91 98765 43210', email: 'rajesh@school.edu', experience: '8 years', qualification: 'M.Sc Math, B.Ed' },
  { id: 2, name: 'Priya Sharma', subject: 'English', phone: '+91 98765 43211', email: 'priya@school.edu', experience: '5 years', qualification: 'M.A English, B.Ed' },
  { id: 3, name: 'Ahmed Khan', subject: 'Science', phone: '+91 98765 43212', email: 'ahmed@school.edu', experience: '10 years', qualification: 'M.Sc Physics, B.Ed' },
  { id: 4, name: 'Smt. Lakshmi', subject: 'Tamil', phone: '+91 98765 43213', email: 'lakshmi@school.edu', experience: '12 years', qualification: 'M.A Tamil, B.Ed' },
  { id: 5, name: 'John Peter', subject: 'Computer', phone: '+91 98765 43214', email: 'john@school.edu', experience: '6 years', qualification: 'M.Tech, B.Ed' },
];

const subjects = ['Mathematics', 'English', 'Science', 'Tamil', 'Computer', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    phone: '',
    email: '',
    experience: '',
    qualification: ''
  });

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...formData, id: editingTeacher.id } : t));
    } else {
      setTeachers([...teachers, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
    setShowDeleteConfirm(null);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData(teacher);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTeacher(null);
    setFormData({ name: '', subject: '', phone: '', email: '', experience: '', qualification: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
          <p className="text-slate-500">Manage teaching staff</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex gap-1">
                <button 
                  type="button"
                  onClick={() => openEditModal(teacher)}
                  className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded"
                >
                  <Edit size={18} />
                </button>
                <button 
                  type="button"
                  onClick={() => setShowDeleteConfirm(teacher.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg text-slate-800">{teacher.name}</h3>
            <p className="text-green-600 font-medium">{teacher.subject}</p>
            <p className="text-slate-500 text-sm mt-1">{teacher.qualification}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                {teacher.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                {teacher.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Award size={16} className="text-slate-400" />
                {teacher.experience}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No teachers found</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter teacher name"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="teacher@school.edu"
                />
              </div>
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-slate-700 mb-1">Qualification</label>
                <input
                  id="qualification"
                  type="text"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="M.Sc, B.Ed"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                <input
                  id="experience"
                  type="text"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="5 years"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingTeacher ? 'Update' : 'Add'} Teacher
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
            <p className="text-slate-600 mb-4">Are you sure you want to delete this teacher? This action cannot be undone.</p>
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
