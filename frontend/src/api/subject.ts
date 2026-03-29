import api from '@/lib/api';
import { Subject, ApiResponse, PaginatedResponse } from '@/types';

export const subjectApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; classId?: string }): Promise<PaginatedResponse<Subject>> => {
    const response = await api.get<PaginatedResponse<Subject>>('/subject', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Subject> => {
    const response = await api.get<ApiResponse<Subject>>(`/subject/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Subject>): Promise<Subject> => {
    const response = await api.post<ApiResponse<Subject>>('/subject', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Subject>): Promise<Subject> => {
    const response = await api.put<ApiResponse<Subject>>(`/subject/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/subject/${id}`);
  },
};
