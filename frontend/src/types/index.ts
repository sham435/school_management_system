export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Teacher {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: string;
  salary?: number;
  joiningDate?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  photo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Employee {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  employeeId?: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  salary?: number;
  joiningDate?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  employeeType: 'teaching' | 'non-teaching';
  photo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: string;
  userId?: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email?: string;
  phone: string;
  address: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianRelation?: string;
  classId?: string;
  sectionId?: string;
  rollNumber?: string;
  admissionDate?: string;
  photo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Class {
  id: string;
  name: string;
  sectionId?: string;
  classTeacherId?: string;
  academicYearId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Section {
  id: string;
  name: string;
  classId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'theory' | 'practical';
  classId?: string;
  teacherId?: string;
  creditHours?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId?: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TimetablePeriod {
  id: string;
  classId: string;
  sectionId?: string;
  subjectId: string;
  teacherId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  roomNo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  classId?: string;
  subjectId?: string;
  fileUrl?: string;
  fileType?: string;
  uploadedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaveRequest {
  id: string;
  userId?: string;
  employeeId?: string;
  type: 'sick' | 'casual' | 'earned' | 'unpaid' | 'other';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certificate {
  id: string;
  studentId?: string;
  userId?: string;
  type: 'bonafide' | 'transfer' | 'character' | 'attendance' | 'other';
  requestDate: string;
  issueDate?: string;
  status: 'pending' | 'issued' | 'rejected';
  reason?: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  noticeType: 'general' | 'exam' | 'event' | 'holiday' | 'fee';
  publishDate: string;
  validUntil?: string;
  createdBy?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Exam {
  id: string;
  name: string;
  classId: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  subjectId: string;
  marks: number;
  grade?: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  classId?: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidAmount?: number;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'partial' | 'overdue';
  createdAt?: string;
  updatedAt?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  category?: string;
  quantity: number;
  available: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LibraryTransaction {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'academic' | 'cultural' | 'sports' | 'other';
  startDate: string;
  endDate: string;
  venue?: string;
  createdBy?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  classId?: string;
  studentId?: string;
  type: 'academic' | 'sports' | 'cultural' | 'club';
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances?: number;
  deductions?: number;
  netSalary: number;
  paymentDate?: string;
  status: 'pending' | 'paid';
  createdAt?: string;
  updatedAt?: string;
}

export interface Scholarship {
  id: string;
  studentId: string;
  name: string;
  amount: number;
  provider: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface FrontOfficeInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  inquiryType: 'admission' | 'fee' | 'general' | 'complaint';
  description: string;
  status: 'pending' | 'responded' | 'closed';
  respondedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  type: 'checkup' | 'vaccination' | 'illness' | 'injury';
  description: string;
  date: string;
  doctorName?: string;
  treatment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vehicle {
  id: string;
  vehicleNo: string;
  model: string;
  capacity: number;
  driverId?: string;
  route?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransportRoute {
  id: string;
  name: string;
  vehicleId: string;
  stops: string;
  fees?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelRoom {
  id: string;
  roomNo: string;
  block: string;
  floor: number;
  capacity: number;
  available: number;
  type: 'ac' | 'non-ac';
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelAllocation {
  id: string;
  studentId: string;
  roomId: string;
  bedNo: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'vacated';
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  title: string;
  content: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
