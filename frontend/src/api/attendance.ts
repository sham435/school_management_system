import api from '@/lib/api';
import { Attendance, ApiResponse, PaginatedResponse } from '@/types';

export const attendanceApi = {
  getAll: async (params?: { page?: number; limit?: number; classId?: string; date?: string; studentId?: string }): Promise<PaginatedResponse<Attendance>> => {
    const response = await api.get<PaginatedResponse<Attendance>>('/attendance', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Attendance> => {
    const response = await api.get<ApiResponse<Attendance>>(`/attendance/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Attendance>): Promise<Attendance> => {
    const response = await api.post<ApiResponse<Attendance>>('/attendance', data);
    return response.data.data;
  },

  bulkCreate: async (data: Partial<Attendance>[]): Promise<Attendance[]> => {
    const response = await api.post<ApiResponse<Attendance[]>>('/attendance/bulk', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Attendance>): Promise<Attendance> => {
    const response = await api.put<ApiResponse<Attendance>>(`/attendance/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/attendance/${id}`);
  },

  markBulk: async (classId: string, date: string, attendanceData: { studentId: string; status: string }[]): Promise<void> => {
    await api.post('/attendance/mark', { classId, date, attendance: attendanceData });
  },
};
