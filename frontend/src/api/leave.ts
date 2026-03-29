import api from '@/lib/api';
import { LeaveRequest, ApiResponse, PaginatedResponse } from '@/types';

export const leaveApi = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; employeeId?: string }): Promise<PaginatedResponse<LeaveRequest>> => {
    const response = await api.get<PaginatedResponse<LeaveRequest>>('/leave', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<LeaveRequest> => {
    const response = await api.get<ApiResponse<LeaveRequest>>(`/leave/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<LeaveRequest>): Promise<LeaveRequest> => {
    const response = await api.post<ApiResponse<LeaveRequest>>('/leave', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<LeaveRequest>): Promise<LeaveRequest> => {
    const response = await api.put<ApiResponse<LeaveRequest>>(`/leave/${id}`, data);
    return response.data.data;
  },

  approve: async (id: string, remarks?: string): Promise<LeaveRequest> => {
    const response = await api.put<ApiResponse<LeaveRequest>>(`/leave/${id}/approve`, { remarks });
    return response.data.data;
  },

  reject: async (id: string, remarks?: string): Promise<LeaveRequest> => {
    const response = await api.put<ApiResponse<LeaveRequest>>(`/leave/${id}/reject`, { remarks });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/leave/${id}`);
  },
};
