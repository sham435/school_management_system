import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQAEvaluationDto, UpdateQAEvaluationDto, QAEvaluationQueryDto } from './qa.dto';
import { QAStatus, QAScoreLevel } from '@prisma/client';

const SCORE_LABELS_TA: Record<number, string> = {
  1: 'விரைவாக அபிவிருத்தி',
  2: 'அபிவிருத்தி தேவை',
  3: 'சாதாரணம்',
  4: 'நன்று',
  5: 'மிகவும் நன்று',
  6: 'அதிவிசேடம்',
};

const SCORE_LABELS_EN: Record<number, string> = {
  1: 'Urgent Development',
  2: 'Needs Development',
  3: 'Average',
  4: 'Good',
  5: 'Very Good',
  6: 'Outstanding',
};

@Injectable()
export class QAService {
  constructor(private prisma: PrismaService) {}

  private getScoreLabel(score: number, language: string = 'ta'): string {
    return language === 'en' ? SCORE_LABELS_EN[score] : SCORE_LABELS_TA[score];
  }

  private calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'D';
  }

  async create(dto: CreateQAEvaluationDto) {
    const { criteria, ...evalData } = dto;
    
    const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);
    const maxScore = criteria.length * 6;
    const percentage = (totalScore / maxScore) * 100;

    const evaluation = await this.prisma.qAEvaluation.create({
      data: {
        tenantId: evalData.tenantId,
        academicYearId: evalData.academicYearId,
        evaluatorId: evalData.evaluatorId,
        status: evalData.status || QAStatus.DRAFT,
        language: evalData.language || 'ta',
        totalScore,
        percentage,
        grade: this.calculateGrade(percentage),
        criteria: {
          create: criteria.map((c) => ({
            groupId: c.groupId,
            groupName: c.groupName,
            criteriaId: c.criteriaId,
            criteriaName: c.criteriaName,
            indicatorId: c.indicatorId,
            score: c.score,
            scoreLabel: this.getScoreLabel(c.score, evalData.language || 'ta'),
            discussion: c.discussion,
            evidence: c.evidence,
          })),
        },
      },
      include: {
        criteria: true,
        tenant: true,
      },
    });

    return evaluation;
  }

  async findAll(query: QAEvaluationQueryDto) {
    const { tenantId, academicYearId, status, language } = query;

    if (!tenantId || tenantId === 'default-tenant-id') {
      return [];
    }

    try {
      const evaluations = await this.prisma.qAEvaluation.findMany({
        where: {
          tenantId,
          academicYearId,
          status,
          language,
        },
        include: {
          criteria: true,
          tenant: true,
          academicYear: true,
          evaluator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return evaluations;
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      return [];
    }
  }

  async findOne(id: string) {
    const evaluation = await this.prisma.qAEvaluation.findUnique({
      where: { id },
      include: {
        criteria: {
          orderBy: [
            { groupId: 'asc' },
            { criteriaId: 'asc' },
          ],
        },
        tenant: true,
        academicYear: true,
        evaluator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!evaluation) {
      throw new NotFoundException(`QA Evaluation with ID ${id} not found`);
    }

    return evaluation;
  }

  async update(id: string, dto: UpdateQAEvaluationDto) {
    await this.findOne(id);

    const { criteria, ...evalData } = dto;

    let updateData: any = {
      ...evalData,
    };

    if (criteria) {
      const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);
      const maxScore = criteria.length * 6;
      const percentage = (totalScore / maxScore) * 100;

      updateData.totalScore = totalScore;
      updateData.percentage = percentage;
      updateData.grade = this.calculateGrade(percentage);

      await this.prisma.qACriteriaResponse.deleteMany({
        where: { evaluationId: id },
      });

      updateData.criteria = {
        create: criteria.map((c) => ({
          groupId: c.groupId,
          groupName: c.groupName,
          criteriaId: c.criteriaId,
          criteriaName: c.criteriaName,
          indicatorId: c.indicatorId,
          score: c.score,
          scoreLabel: this.getScoreLabel(c.score, dto.language || 'ta'),
          discussion: c.discussion,
          evidence: c.evidence,
        })),
      };
    }

    if (dto.status === QAStatus.SUBMITTED) {
      updateData.submittedAt = new Date();
    }

    const evaluation = await this.prisma.qAEvaluation.update({
      where: { id },
      data: updateData,
      include: {
        criteria: true,
        tenant: true,
      },
    });

    return evaluation;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.qAEvaluation.delete({
      where: { id },
    });

    return { message: 'QA Evaluation deleted successfully' };
  }

  async getGroupSummary(evaluationId: string) {
    const evaluation = await this.findOne(evaluationId);

    const groupSummary: Record<string, { total: number; count: number; average: number }> = {};

    for (const criteria of evaluation.criteria) {
      if (!groupSummary[criteria.groupId]) {
        groupSummary[criteria.groupId] = { total: 0, count: 0, average: 0 };
      }
      groupSummary[criteria.groupId].total += criteria.score;
      groupSummary[criteria.groupId].count += 1;
    }

    for (const groupId of Object.keys(groupSummary)) {
      const { total, count } = groupSummary[groupId];
      groupSummary[groupId].average = total / count;
    }

    return {
      evaluation,
      groupSummary,
      overallAverage: evaluation.percentage,
      grade: evaluation.grade,
    };
  }

  async getDashboardStats(tenantId: string) {
    if (!tenantId || tenantId === 'default-tenant-id') {
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        draft: 0,
        latestEvaluation: null,
      };
    }

    try {
      const [total, completed, inProgress, draft] = await Promise.all([
        this.prisma.qAEvaluation.count({ where: { tenantId } }),
        this.prisma.qAEvaluation.count({ where: { tenantId, status: QAStatus.SUBMITTED } }),
        this.prisma.qAEvaluation.count({ where: { tenantId, status: QAStatus.IN_PROGRESS } }),
        this.prisma.qAEvaluation.count({ where: { tenantId, status: QAStatus.DRAFT } }),
      ]);

      const latestEvaluation = await this.prisma.qAEvaluation.findFirst({
        where: { tenantId, status: QAStatus.SUBMITTED },
        orderBy: { submittedAt: 'desc' },
        include: {
          criteria: true,
        },
      });

      return {
        total,
        completed,
        inProgress,
        draft,
        latestEvaluation,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        draft: 0,
        latestEvaluation: null,
      };
    }
  }
}
