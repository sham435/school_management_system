import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/Topbar';

export const metadata: Metadata = {
  title: 'School Management ERP',
  description: 'Admin Panel for Enterprise Resource Planning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f4f6f8] text-[#111827]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
          <TopBar />
          <main className="ml-64 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
