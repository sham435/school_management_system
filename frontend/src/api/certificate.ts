import api from '@/lib/api';
import { Certificate, ApiResponse, PaginatedResponse } from '@/types';

export const certificateApi = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; studentId?: string }): Promise<PaginatedResponse<Certificate>> => {
    const response = await api.get<PaginatedResponse<Certificate>>('/certificate', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Certificate> => {
    const response = await api.get<ApiResponse<Certificate>>(`/certificate/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Certificate>): Promise<Certificate> => {
    const response = await api.post<ApiResponse<Certificate>>('/certificate', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Certificate>): Promise<Certificate> => {
    const response = await api.put<ApiResponse<Certificate>>(`/certificate/${id}`, data);
    return response.data.data;
  },

  issue: async (id: string, data?: { issueDate?: string; remarks?: string }): Promise<Certificate> => {
    const response = await api.put<ApiResponse<Certificate>>(`/certificate/${id}/issue`, data);
    return response.data.data;
  },

  reject: async (id: string, remarks?: string): Promise<Certificate> => {
    const response = await api.put<ApiResponse<Certificate>>(`/certificate/${id}/reject`, { remarks });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/certificate/${id}`);
  },
};
