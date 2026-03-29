'use client';

import { useState } from 'react';
import { Search, Plus, Download, Eye, FileText, X, Calendar, User } from 'lucide-react';

interface Certificate {
  id: number;
  studentName: string;
  class: string;
  type: string;
  issueDate: string;
  status: 'issued' | 'pending' | 'expired';
}

const initialCertificates: Certificate[] = [
  { id: 1, studentName: 'Arun Kumar', class: '10-A', type: 'Transfer Certificate', issueDate: '2024-03-15', status: 'issued' },
  { id: 2, studentName: 'Divya Sharma', class: '10-A', type: 'Course Completion', issueDate: '2024-03-20', status: 'pending' },
  { id: 3, studentName: 'Karthik Raja', class: '11-A', type: 'Bonafide Certificate', issueDate: '2024-02-10', status: 'issued' },
  { id: 4, studentName: 'Meena Kumari', class: '9-A', type: 'Transfer Certificate', issueDate: '2024-01-05', status: 'expired' },
];

const certificateTypes = [
  'Transfer Certificate',
  'Course Completion',
  'Bonafide Certificate',
  'Character Certificate',
  'Marks Certificate',
  'Attendance Certificate',
  'Scholarship Certificate'
];

export default function CertificatePage() {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    studentName: '',
    class: '',
    type: '',
    issueDate: new Date().toISOString().split('T')[0]
  });

  const filteredCertificates = certificates.filter(c => {
    const matchSearch = c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType ? c.type === filterType : true;
    return matchSearch && matchType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert: Certificate = {
      ...formData,
      id: Date.now(),
      status: 'pending'
    };
    setCertificates([...certificates, newCert]);
    setShowModal(false);
    setFormData({ studentName: '', class: '', type: '', issueDate: new Date().toISOString().split('T')[0] });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'issued': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Issued</span>;
      case 'expired': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Expired</span>;
      default: return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Certificates</h1>
          <p className="text-slate-500">Manage student certificates</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Request Certificate
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">All Types</option>
          {certificateTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-3xl font-bold text-green-600">{certificates.filter(c => c.status === 'issued').length}</div>
          <div className="text-slate-500">Issued</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-3xl font-bold text-yellow-600">{certificates.filter(c => c.status === 'pending').length}</div>
          <div className="text-slate-500">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-3xl font-bold text-red-600">{certificates.filter(c => c.status === 'expired').length}</div>
          <div className="text-slate-500">Expired</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Student</th>
              <th className="text-left p-4 font-semibold text-slate-600">Class</th>
              <th className="text-left p-4 font-semibold text-slate-600">Certificate Type</th>
              <th className="text-left p-4 font-semibold text-slate-600">Issue Date</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.map((cert) => (
              <tr key={cert.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {cert.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{cert.studentName}</span>
                  </div>
                </td>
                <td className="p-4">{cert.class}</td>
                <td className="p-4">{cert.type}</td>
                <td className="p-4">{cert.issueDate}</td>
                <td className="p-4">{getStatusBadge(cert.status)}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button type="button" className="p-1.5 text-blue-500 hover:bg-blue-50 rounded" title="View">
                      <Eye size={18} />
                    </button>
                    {cert.status === 'issued' && (
                      <button type="button" className="p-1.5 text-green-500 hover:bg-green-50 rounded" title="Download">
                        <Download size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No certificates found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Request Certificate</h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
                <input
                  id="studentName"
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter student name"
                />
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
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="9-A">9-A</option>
                    <option value="11-A">11-A</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="issueDate" className="block text-sm font-medium text-slate-700 mb-1">Issue Date</label>
                  <input
                    id="issueDate"
                    type="date"
                    required
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Certificate Type</label>
                <select
                  id="type"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Certificate Type</option>
                  {certificateTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
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
    </div>
  );
}
