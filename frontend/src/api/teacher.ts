import api from '@/lib/api';
import { Teacher, ApiResponse, PaginatedResponse } from '@/types';

export const teacherApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Teacher>> => {
    const response = await api.get<PaginatedResponse<Teacher>>('/teacher', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Teacher> => {
    const response = await api.get<ApiResponse<Teacher>>(`/teacher/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Teacher>): Promise<Teacher> => {
    const response = await api.post<ApiResponse<Teacher>>('/teacher', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Teacher>): Promise<Teacher> => {
    const response = await api.put<ApiResponse<Teacher>>(`/teacher/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/teacher/${id}`);
  },
};
