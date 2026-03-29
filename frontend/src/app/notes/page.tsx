'use client';

import { useState } from 'react';
import { Search, Plus, FileText, Download, Eye, Edit, Trash2, X, Clock, User } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  subject: string;
  class: string;
  uploadedBy: string;
  uploadDate: string;
  type: 'PDF' | 'DOC' | 'VIDEO' | 'LINK';
  downloads: number;
}

const initialNotes: Note[] = [
  { id: 1, title: 'Algebra Basics', subject: 'Mathematics', class: '10-A', uploadedBy: 'Rajesh Kumar', uploadDate: '2024-03-15', type: 'PDF', downloads: 45 },
  { id: 2, title: 'English Grammar Notes', subject: 'English', class: '10-A', uploadedBy: 'Priya Sharma', uploadDate: '2024-03-14', type: 'PDF', downloads: 32 },
  { id: 3, title: 'Tamil Essay Guide', subject: 'Tamil', class: '10-A', uploadedBy: 'Smt. Lakshmi', uploadDate: '2024-03-13', type: 'PDF', downloads: 28 },
  { id: 4, title: 'Physics Experiments', subject: 'Science', class: '10-A', uploadedBy: 'Ahmed Khan', uploadDate: '2024-03-12', type: 'VIDEO', downloads: 56 },
  { id: 5, title: 'History Timeline', subject: 'History', class: '10-A', uploadedBy: 'John Peter', uploadDate: '2024-03-10', type: 'LINK', downloads: 19 },
];

const subjects = ['Mathematics', 'English', 'Tamil', 'Science', 'History', 'Geography', 'Computer'];
const classes = ['10-A', '10-B', '9-A', '11-A', '11-B'];
const types = ['PDF', 'DOC', 'VIDEO', 'LINK'];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '10-A',
    type: 'PDF' as const,
    url: ''
  });

  const filteredNotes = notes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        n.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubject = filterSubject ? n.subject === filterSubject : true;
    return matchSearch && matchSubject;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      ...formData,
      id: Date.now(),
      uploadedBy: 'Current User',
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0
    };
    setNotes([...notes, newNote]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleDownload = (id: number) => {
    setNotes(notes.map(n => n.id === id ? { ...n, downloads: n.downloads + 1 } : n));
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setFormData({ title: note.title, subject: note.subject, class: note.class, type: note.type, url: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setFormData({ title: '', subject: '', class: '10-A', type: 'PDF', url: '' });
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'PDF': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">PDF</span>;
      case 'DOC': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">DOC</span>;
      case 'VIDEO': return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">VIDEO</span>;
      case 'LINK': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">LINK</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notes & Resources</h1>
          <p className="text-slate-500">Manage study materials and resources</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Upload Note
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <FileText className="text-gray-600" size={24} />
              </div>
              {getTypeBadge(note.type)}
            </div>
            <h3 className="font-semibold text-lg text-slate-800 mb-1">{note.title}</h3>
            <p className="text-slate-500 text-sm mb-4">{note.subject} - {note.class}</p>
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {note.uploadedBy}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {note.uploadDate}
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <Eye size={16} />
                  View
                </button>
                <button type="button" onClick={() => handleDownload(note.id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                  <Download size={16} />
                  {note.downloads}
                </button>
                <button type="button" onClick={() => openEditModal(note)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit size={16} />
                </button>
                <button type="button" onClick={() => handleDelete(note.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No notes found</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{editingNote ? 'Edit Note' : 'Upload Note'}</h2>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Note title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
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
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">File Type</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">File URL / Link</label>
                <input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border text-slate-700 rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  {editingNote ? 'Update' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
