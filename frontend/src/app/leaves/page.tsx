'use client';

import { useState } from 'react';
import { Search, Plus, Calendar, Clock, CheckCircle, XCircle, Edit, Trash2, X, User } from 'lucide-react';

interface Leave {
  id: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

const initialLeaves: Leave[] = [
  { id: 1, employeeName: 'Rajesh Kumar', type: 'Sick Leave', startDate: '2024-03-20', endDate: '2024-03-22', days: 3, reason: 'Medical treatment', status: 'approved', appliedDate: '2024-03-19' },
  { id: 2, employeeName: 'Priya Sharma', type: 'Casual Leave', startDate: '2024-03-25', endDate: '2024-03-26', days: 2, reason: 'Personal work', status: 'pending', appliedDate: '2024-03-20' },
  { id: 3, employeeName: 'Ahmed Khan', type: 'Annual Leave', startDate: '2024-04-01', endDate: '2024-04-10', days: 10, reason: 'Family vacation', status: 'pending', appliedDate: '2024-03-18' },
  { id: 4, employeeName: 'Smt. Lakshmi', type: 'Sick Leave', startDate: '2024-03-15', endDate: '2024-03-15', days: 1, reason: 'Doctor appointment', status: 'approved', appliedDate: '2024-03-14' },
];

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Annual Leave', 'Maternity Leave', 'Paternity Leave', 'Unpaid Leave'];

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>(initialLeaves);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    employeeName: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const filteredLeaves = leaves.filter(l => {
    const matchSearch = l.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus ? l.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const days = calculateDays(formData.startDate, formData.endDate);
    const newLeave: Leave = {
      ...formData,
      id: Date.now(),
      days,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaves([...leaves, newLeave]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    setLeaves(leaves.filter(l => l.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleStatusChange = (id: number, status: 'approved' | 'rejected') => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLeave(null);
    setFormData({ employeeName: '', type: '', startDate: '', endDate: '', reason: '' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved': return <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"><CheckCircle size={12}/> Approved</span>;
      case 'rejected': return <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs"><XCircle size={12}/> Rejected</span>;
      default: return <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs"><Clock size={12}/> Pending</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
          <p className="text-slate-500">Manage employee leave applications</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Apply Leave
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search leaves..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-3xl font-bold text-yellow-600">{leaves.filter(l => l.status === 'pending').length}</div>
          <div className="text-slate-500">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-3xl font-bold text-green-600">{leaves.filter(l => l.status === 'approved').length}</div>
          <div className="text-slate-500">Approved</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-3xl font-bold text-red-600">{leaves.filter(l => l.status === 'rejected').length}</div>
          <div className="text-slate-500">Rejected</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Employee</th>
              <th className="text-left p-4 font-semibold text-slate-600">Type</th>
              <th className="text-left p-4 font-semibold text-slate-600">Duration</th>
              <th className="text-left p-4 font-semibold text-slate-600">Days</th>
              <th className="text-left p-4 font-semibold text-slate-600">Reason</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {leave.employeeName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{leave.employeeName}</span>
                  </div>
                </td>
                <td className="p-4">{leave.type}</td>
                <td className="p-4 text-sm">
                  <div>{leave.startDate} to {leave.endDate}</div>
                  <div className="text-slate-500">Applied: {leave.appliedDate}</div>
                </td>
                <td className="p-4 font-medium">{leave.days}</td>
                <td className="p-4 text-slate-600 max-w-xs truncate">{leave.reason}</td>
                <td className="p-4">{getStatusBadge(leave.status)}</td>
                <td className="p-4">
                  {leave.status === 'pending' && (
                    <div className="flex gap-1">
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(leave.id, 'approved')}
                        className="p-1.5 text-green-500 hover:bg-green-50 rounded"
                        title="Approve"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(leave.id, 'rejected')}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowDeleteConfirm(leave.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                  {leave.status !== 'pending' && (
                    <button 
                      type="button"
                      onClick={() => setShowDeleteConfirm(leave.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeaves.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No leave applications found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Apply for Leave</h2>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="employeeName" className="block text-sm font-medium text-slate-700 mb-1">Employee Name</label>
                <input
                  id="employeeName"
                  type="text"
                  required
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                <select
                  id="type"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input
                    id="endDate"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <textarea
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Enter reason for leave"
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
                  Submit
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
            <p className="text-slate-600 mb-4">Are you sure you want to delete this leave application?</p>
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
