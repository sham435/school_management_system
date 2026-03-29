import api from '@/lib/api';
import { Employee, ApiResponse, PaginatedResponse } from '@/types';

export const employeeApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; department?: string; employeeType?: string }): Promise<PaginatedResponse<Employee>> => {
    const response = await api.get<PaginatedResponse<Employee>>('/employee', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<Employee> => {
    const response = await api.get<ApiResponse<Employee>>(`/employee/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<Employee>): Promise<Employee> => {
    const response = await api.post<ApiResponse<Employee>>('/employee', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Employee>): Promise<Employee> => {
    const response = await api.put<ApiResponse<Employee>>(`/employee/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/employee/${id}`);
  },
};
