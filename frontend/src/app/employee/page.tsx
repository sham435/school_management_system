'use client';

import { useState } from 'react';
import { Search, Plus, Mail, Phone, Calendar, Edit, Trash2, X, Briefcase, User } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  joinDate: string;
  salary: string;
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'Rajesh Kumar', designation: 'Principal', department: 'Administration', phone: '+91 98765 43210', email: 'rajesh@school.edu', joinDate: '2015-06-01', salary: '₹80,000' },
  { id: 2, name: 'Priya Sharma', designation: 'Vice Principal', department: 'Administration', phone: '+91 98765 43211', email: 'priya@school.edu', joinDate: '2018-01-15', salary: '₹65,000' },
  { id: 3, name: 'Ahmed Khan', designation: 'Head Master', department: 'Academic', phone: '+91 98765 43212', email: 'ahmed@school.edu', joinDate: '2016-07-01', salary: '₹55,000' },
  { id: 4, name: 'Smt. Lakshmi', designation: 'Senior Teacher', department: 'Tamil', phone: '+91 98765 43213', email: 'lakshmi@school.edu', joinDate: '2012-03-01', salary: '₹45,000' },
  { id: 5, name: 'John Peter', designation: 'Administrator', department: 'Office', phone: '+91 98765 43214', email: 'john@school.edu', joinDate: '2020-09-01', salary: '₹35,000' },
];

const designations = ['Principal', 'Vice Principal', 'Head Master', 'Senior Teacher', 'Teacher', 'Administrator', 'Accountant', 'Clerk', 'Librarian'];
const departments = ['Administration', 'Academic', 'Tamil', 'English', 'Math', 'Science', 'Office', 'Library', 'Accounts'];

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    phone: '',
    email: '',
    joinDate: '',
    salary: ''
  });

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === editingEmployee.id ? { ...formData, id: editingEmployee.id } : e));
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
    setShowDeleteConfirm(null);
  };

  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({ name: '', designation: '', department: '', phone: '', email: '', joinDate: '', salary: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
          <p className="text-slate-500">Manage staff and personnel</p>
        </div>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search employees..."
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
              <th className="text-left p-4 font-semibold text-slate-600">Name</th>
              <th className="text-left p-4 font-semibold text-slate-600">Designation</th>
              <th className="text-left p-4 font-semibold text-slate-600">Department</th>
              <th className="text-left p-4 font-semibold text-slate-600">Phone</th>
              <th className="text-left p-4 font-semibold text-slate-600">Join Date</th>
              <th className="text-left p-4 font-semibold text-slate-600">Salary</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-slate-500">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {employee.designation}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{employee.department}</td>
                <td className="p-4 text-slate-600">{employee.phone}</td>
                <td className="p-4 text-slate-600">{employee.joinDate}</td>
                <td className="p-4 font-medium">{employee.salary}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button 
                      type="button"
                      onClick={() => openEditModal(employee)}
                      className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowDeleteConfirm(employee.id)}
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
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No employees found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
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
                  placeholder="Enter employee name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                  <select
                    id="designation"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select</option>
                    {designations.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select
                    id="department"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
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
                  placeholder="employee@school.edu"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="joinDate" className="block text-sm font-medium text-slate-700 mb-1">Join Date</label>
                  <input
                    id="joinDate"
                    type="date"
                    required
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
                  <input
                    id="salary"
                    type="text"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="₹45,000"
                  />
                </div>
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
                  {editingEmployee ? 'Update' : 'Add'} Employee
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
            <p className="text-slate-600 mb-4">Are you sure you want to delete this employee? This action cannot be undone.</p>
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
