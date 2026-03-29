import api from '@/lib/api';
import { TimetablePeriod, ApiResponse, PaginatedResponse } from '@/types';

export const timetableApi = {
  getAll: async (params?: { page?: number; limit?: number; classId?: string; dayOfWeek?: number }): Promise<PaginatedResponse<TimetablePeriod>> => {
    const response = await api.get<PaginatedResponse<TimetablePeriod>>('/timetable', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<TimetablePeriod> => {
    const response = await api.get<ApiResponse<TimetablePeriod>>(`/timetable/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<TimetablePeriod>): Promise<TimetablePeriod> => {
    const response = await api.post<ApiResponse<TimetablePeriod>>('/timetable', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<TimetablePeriod>): Promise<TimetablePeriod> => {
    const response = await api.put<ApiResponse<TimetablePeriod>>(`/timetable/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/timetable/${id}`);
  },
};
