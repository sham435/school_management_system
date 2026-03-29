import api from '@/lib/api';
import { Notice, ApiResponse, PaginatedResponse } from '@/types';

export const noticeApi = {
  getAll: async (params?: { page?: number; limit?: number; noticeType?: string; isActive?: boolean }): Promise<PaginatedResponse<Notice>> => {
    const response = await api.get<PaginatedResponse<Notice>>('/notice', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Notice> => {
    const response = await api.get<ApiResponse<Notice>>(`/notice/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Notice>): Promise<Notice> => {
    const response = await api.post<ApiResponse<Notice>>('/notice', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Notice>): Promise<Notice> => {
    const response = await api.put<ApiResponse<Notice>>(`/notice/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/notice/${id}`);
  },
};
