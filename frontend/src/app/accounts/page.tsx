'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, DollarSign, Receipt, CreditCard } from 'lucide-react';

const feeRecords = [
  { id: 1, student: 'Arun Kumar', class: '10-A', feeType: 'Tuition Fee', amount: 15000, paid: 15000, due: 0, status: 'Paid', date: '2024-01-10' },
  { id: 2, student: 'Divya Sharma', class: '10-A', feeType: 'Tuition Fee', amount: 15000, paid: 10000, due: 5000, status: 'Partial', date: '2024-01-12' },
  { id: 3, student: 'Karthik Raja', class: '10-B', feeType: 'Transport Fee', amount: 6000, paid: 0, due: 6000, status: 'Unpaid', date: '-' },
  { id: 4, student: 'Meena Kumari', class: '9-A', feeType: 'Tuition Fee', amount: 12000, paid: 12000, due: 0, status: 'Paid', date: '2024-01-08' },
  { id: 5, student: 'Vikram Singh', class: '11-A', feeType: 'Annual Fee', amount: 20000, paid: 20000, due: 0, status: 'Paid', date: '2024-01-05' },
];

const feeTypes = [
  { id: 1, name: 'Tuition Fee', amount: 15000, class: '10-A' },
  { id: 2, name: 'Transport Fee', amount: 6000, class: 'All' },
  { id: 3, name: 'Annual Fee', amount: 20000, class: 'All' },
  { id: 4, name: 'Exam Fee', amount: 2500, class: '10-A, 11-A, 12-A' },
];

export default function FeePage() {
  const [activeTab, setActiveTab] = useState('collections');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = feeRecords.filter(f => 
    f.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fees Collection / Accounts</h1>
          <p className="text-slate-500">Manage fee collections and accounts</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Collect Fee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Collection</p>
              <p className="text-2xl font-bold text-slate-800">₹ 52,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-slate-800">₹ 11,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">This Month</p>
              <p className="text-2xl font-bold text-slate-800">₹ 2,50,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-slate-800">450</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('collections')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'collections' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Fee Collections
        </button>
        <button
          onClick={() => setActiveTab('types')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'types' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Fee Types
        </button>
      </div>

      {activeTab === 'collections' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search fee records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-600">Student</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Class</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Fee Type</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Amount</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Paid</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Due</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Status</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Date</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{record.student}</td>
                    <td className="p-4 text-slate-600">{record.class}</td>
                    <td className="p-4 text-slate-600">{record.feeType}</td>
                    <td className="p-4">₹ {record.amount.toLocaleString()}</td>
                    <td className="p-4 text-green-600">₹ {record.paid.toLocaleString()}</td>
                    <td className="p-4 text-orange-600">₹ {record.due.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'Paid' ? 'bg-green-100 text-green-700' : record.status === 'Partial' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{record.date}</td>
                    <td className="p-4">
                      <button type="button" className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'types' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">Fee Type</th>
                <th className="text-left p-4 font-semibold text-slate-600">Amount</th>
                <th className="text-left p-4 font-semibold text-slate-600">Class</th>
                <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeTypes.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{fee.name}</td>
                  <td className="p-4">₹ {fee.amount.toLocaleString()}</td>
                  <td className="p-4 text-slate-600">{fee.class}</td>
                  <td className="p-4">
                    <button type="button" className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
