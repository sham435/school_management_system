import axios from 'axios';
import {
  QAEvaluation,
  QADashboardStats,
  QAEvaluationSummary,
  CreateQAEvaluationDto,
  UpdateQAEvaluationDto,
} from '@/types/qa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const qaApi = {
  create: async (data: CreateQAEvaluationDto): Promise<QAEvaluation> => {
    const response = await api.post<QAEvaluation>('/qa', data);
    return response.data;
  },

  getAll: async (params?: {
    tenantId?: string;
    academicYearId?: string;
    status?: string;
    language?: string;
  }): Promise<QAEvaluation[]> => {
    const response = await api.get<QAEvaluation[]>('/qa', { params });
    return response.data;
  },

  getOne: async (id: string): Promise<QAEvaluation> => {
    const response = await api.get<QAEvaluation>(`/qa/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateQAEvaluationDto): Promise<QAEvaluation> => {
    const response = await api.put<QAEvaluation>(`/qa/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/qa/${id}`);
    return response.data;
  },

  getDashboardStats: async (tenantId: string): Promise<QADashboardStats> => {
    const response = await api.get<QADashboardStats>('/qa/dashboard', {
      params: { tenantId },
    });
    return response.data;
  },

  getGroupSummary: async (id: string): Promise<QAEvaluationSummary> => {
    const response = await api.get<QAEvaluationSummary>(`/qa/${id}/summary`);
    return response.data;
  },
};

export default api;
