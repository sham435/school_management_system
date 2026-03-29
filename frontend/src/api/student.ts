import api from '@/lib/api';
import { Student, ApiResponse, PaginatedResponse } from '@/types';

export const studentApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; classId?: string }): Promise<PaginatedResponse<Student>> => {
    const response = await api.get<PaginatedResponse<Student>>('/student', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Student> => {
    const response = await api.get<ApiResponse<Student>>(`/student/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Student>): Promise<Student> => {
    const response = await api.post<ApiResponse<Student>>('/student', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Student>): Promise<Student> => {
    const response = await api.put<ApiResponse<Student>>(`/student/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/student/${id}`);
  },
};
