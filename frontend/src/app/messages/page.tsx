'use client';

import { useState } from 'react';
import { Search, Send, MoreVertical, User, Clock, Paperclip, Image } from 'lucide-react';

const conversations = [
  { id: 1, name: 'Principal Office', avatar: 'PO', lastMessage: 'Please submit the report', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Mathematics Dept', avatar: 'MD', lastMessage: 'Unit test scheduled', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Parents Association', avatar: 'PA', lastMessage: 'Thank you for the meeting', time: 'Yesterday', unread: 5 },
  { id: 4, name: 'Admin Office', avatar: 'AO', lastMessage: 'Fee collection update', time: 'Monday', unread: 0 },
];

const messages = [
  { id: 1, sender: 'them', text: 'Hello, I wanted to discuss the upcoming exam schedule.', time: '10:00 AM' },
  { id: 2, sender: 'me', text: 'Sure, what specific concerns do you have?', time: '10:05 AM' },
  { id: 3, sender: 'them', text: 'Can we postpone the mathematics exam by a few days?', time: '10:10 AM' },
  { id: 4, sender: 'me', text: 'Let me check with the principal and get back to you.', time: '10:15 AM' },
  { id: 5, sender: 'them', text: 'Please submit the report by tomorrow.', time: '10:30 AM' },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="p-6 h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
          <p className="text-slate-500">Communicate with staff and parents</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex h-full">
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-72px)]">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${selectedChat.id === chat.id ? 'bg-green-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{chat.name}</span>
                      <span className="text-xs text-slate-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                {selectedChat.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{selectedChat.name}</h3>
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
            <button type="button" className="text-slate-400 hover:text-slate-600">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'me' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-100' : 'text-slate-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <button type="button" className="text-slate-400 hover:text-slate-600">
                <Paperclip size={20} />
              </button>
              <button type="button" className="text-slate-400 hover:text-slate-600">
                <Image size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button type="button" className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
