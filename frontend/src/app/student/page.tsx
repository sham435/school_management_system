'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { studentApi } from '@/api';
import { Student } from '@/types';

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    admissionNo: ''
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const response = await studentApi.getAll();
        setStudents(response.data || []);
      } catch (err: any) {
        console.error('Error fetching students:', err);
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`
      };
      if (editingStudent) {
        const updated = await studentApi.update(editingStudent.id, data);
        setStudents(students.map(s => s.id === editingStudent.id ? updated : s));
      } else {
        const created = await studentApi.create(data);
        setStudents([...students, created]);
      }
      closeModal();
    } catch (err: any) {
      console.error('Error saving student:', err);
      setError('Failed to save student');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await studentApi.delete(id);
      setStudents(students.filter(s => s.id !== id));
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student');
    }
  };

  const openEditModal = (student: Student) => {
    const nameParts = (student.firstName || student.name || '').split(' ');
    setEditingStudent(student);
    setFormData({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      gender: student.gender || '',
      dateOfBirth: student.dateOfBirth || '',
      email: student.email || '',
      phone: student.phone || '',
      address: student.address || '',
      guardianName: student.guardianName || '',
      guardianPhone: student.guardianPhone || '',
      admissionNo: student.admissionNo || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormData({ firstName: '', lastName: '', gender: '', dateOfBirth: '', email: '', phone: '', address: '', guardianName: '', guardianPhone: '', admissionNo: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>
          <p className="text-slate-500">Manage student records</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add Student
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
            placeholder="Search students..."
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
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">Adm No</th>
                <th className="text-left p-4 font-semibold text-slate-600">Name</th>
                <th className="text-left p-4 font-semibold text-slate-600">Gender</th>
                <th className="text-left p-4 font-semibold text-slate-600">Phone</th>
                <th className="text-left p-4 font-semibold text-slate-600">DOB</th>
                <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">{student.admissionNo}</td>
                  <td className="p-4 font-medium">{student.firstName} {student.lastName}</td>
                  <td className="p-4 capitalize">{student.gender}</td>
                  <td className="p-4 text-slate-600">{student.phone}</td>
                  <td className="p-4 text-slate-600">{student.dateOfBirth}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button 
                        type="button"
                        onClick={() => openEditModal(student)}
                        className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowDeleteConfirm(student.id)}
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
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No students found</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admissionNo" className="block text-sm font-medium text-slate-700 mb-1">Admission No</label>
                  <input
                    id="admissionNo"
                    type="text"
                    required
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    id="gender"
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <textarea
                  id="address"
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guardianName" className="block text-sm font-medium text-slate-700 mb-1">Guardian Name</label>
                  <input
                    id="guardianName"
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="guardianPhone" className="block text-sm font-medium text-slate-700 mb-1">Guardian Phone</label>
                  <input
                    id="guardianPhone"
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  {editingStudent ? 'Update' : 'Add'} Student
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
            <p className="text-slate-600 mb-4">Are you sure you want to delete this student? This action cannot be undone.</p>
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
