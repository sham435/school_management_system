export type Language = 'ta' | 'en';

export interface QACriteriaInput {
  groupId: string;
  groupName: string;
  criteriaId: string;
  criteriaName: string;
  indicatorId?: string;
  score: number;
  scoreLabel: string;
  discussion?: string;
  evidence?: string;
}

export interface QAEvaluation {
  id: string;
  tenantId: string;
  academicYearId?: string;
  evaluatorId?: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'SUBMITTED';
  totalScore?: number;
  percentage?: number;
  grade?: string;
  language: string;
  observations?: Record<string, unknown>;
  recommendations?: Record<string, unknown>;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  criteria?: QACriteriaResponse[];
  tenant?: Record<string, unknown>;
  academicYear?: Record<string, unknown>;
  evaluator?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface QACriteriaResponse {
  id: string;
  evaluationId: string;
  groupId: string;
  groupName: string;
  criteriaId: string;
  criteriaName: string;
  indicatorId?: string;
  score: number;
  scoreLabel: string;
  discussion?: string;
  evidence?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QADashboardStats {
  total: number;
  completed: number;
  inProgress: number;
  draft: number;
  latestEvaluation: QAEvaluation | null;
}

export interface QAEvaluationSummary {
  evaluation: QAEvaluation;
  groupSummary: Record<string, { total: number; count: number; average: number }>;
  overallAverage: number;
  grade: string;
}

export interface CreateQAEvaluationDto {
  tenantId: string;
  academicYearId?: string;
  evaluatorId?: string;
  status?: 'DRAFT' | 'IN_PROGRESS' | 'SUBMITTED';
  language?: string;
  criteria: QACriteriaInput[];
}

export interface UpdateQAEvaluationDto {
  academicYearId?: string;
  evaluatorId?: string;
  status?: 'DRAFT' | 'IN_PROGRESS' | 'SUBMITTED';
  language?: string;
  criteria?: QACriteriaInput[];
}
