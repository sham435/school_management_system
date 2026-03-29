'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Book, User, Calendar } from 'lucide-react';

const books = [
  { id: 1, title: 'Mathematics Part I', author: 'NCERT', category: 'Textbook', quantity: 50, available: 45, rack: 'A1' },
  { id: 2, title: 'Physics', author: 'NCERT', category: 'Textbook', quantity: 30, available: 28, rack: 'A2' },
  { id: 3, title: 'Chemistry', author: 'NCERT', category: 'Textbook', quantity: 30, available: 25, rack: 'A3' },
  { id: 4, title: 'English Literature', author: 'Penguin', category: 'Novel', quantity: 20, available: 18, rack: 'B1' },
  { id: 5, title: 'Tamil Grammar', author: 'TN Board', category: 'Textbook', quantity: 40, available: 38, rack: 'C1' },
];

const issuedBooks = [
  { id: 1, book: 'Mathematics Part I', student: 'Arun Kumar', issueDate: '2024-01-15', returnDate: '2024-01-22', status: 'Returned' },
  { id: 2, book: 'Physics', student: 'Divya Sharma', issueDate: '2024-01-16', returnDate: '2024-01-23', status: 'Issued' },
  { id: 3, book: 'English Literature', student: 'Karthik Raja', issueDate: '2024-01-17', returnDate: '2024-01-24', status: 'Issued' },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('books');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Library</h1>
          <p className="text-slate-500">Manage books and issued records</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Add Book
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'books' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Book List
        </button>
        <button
          onClick={() => setActiveTab('issued')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'issued' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Issued Books
        </button>
      </div>

      {activeTab === 'books' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Book className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Books</p>
                  <p className="text-2xl font-bold text-slate-800">170</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Book className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Available</p>
                  <p className="text-2xl font-bold text-slate-800">154</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <User className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Issued</p>
                  <p className="text-2xl font-bold text-slate-800">16</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-600">Book Title</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Author</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Category</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Quantity</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Available</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Rack No</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{book.title}</td>
                    <td className="p-4 text-slate-600">{book.author}</td>
                    <td className="p-4 text-slate-600">{book.category}</td>
                    <td className="p-4">{book.quantity}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.available > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {book.available}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{book.rack}</td>
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

      {activeTab === 'issued' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">Book</th>
                <th className="text-left p-4 font-semibold text-slate-600">Student</th>
                <th className="text-left p-4 font-semibold text-slate-600">Issue Date</th>
                <th className="text-left p-4 font-semibold text-slate-600">Return Date</th>
                <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((issue) => (
                <tr key={issue.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{issue.book}</td>
                  <td className="p-4 text-slate-600">{issue.student}</td>
                  <td className="p-4 text-slate-600">{issue.issueDate}</td>
                  <td className="p-4 text-slate-600">{issue.returnDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${issue.status === 'Returned' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {issue.status}
                    </span>
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
