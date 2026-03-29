import { IsString, IsNumber, IsOptional, IsEnum, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { QAStatus } from '@prisma/client';

export class QACriteriaDto {
  @IsString()
  groupId: string;

  @IsString()
  groupName: string;

  @IsString()
  criteriaId: string;

  @IsString()
  criteriaName: string;

  @IsOptional()
  @IsString()
  indicatorId?: string;

  @IsNumber()
  @Min(1)
  @Max(6)
  score: number;

  @IsString()
  scoreLabel: string;

  @IsOptional()
  @IsString()
  discussion?: string;

  @IsOptional()
  @IsString()
  evidence?: string;
}

export class CreateQAEvaluationDto {
  @IsString()
  tenantId: string;

  @IsOptional()
  @IsString()
  academicYearId?: string;

  @IsOptional()
  @IsString()
  evaluatorId?: string;

  @IsOptional()
  @IsEnum(QAStatus)
  status?: QAStatus;

  @IsOptional()
  @IsString()
  language?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QACriteriaDto)
  criteria: QACriteriaDto[];
}

export class UpdateQAEvaluationDto {
  @IsOptional()
  @IsEnum(QAStatus)
  status?: QAStatus;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QACriteriaDto)
  criteria?: QACriteriaDto[];

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  recommendations?: string;
}

export class QAEvaluationQueryDto {
  @IsOptional()
  @IsString()
  tenantId?: string;

  @IsOptional()
  @IsString()
  academicYearId?: string;

  @IsOptional()
  @IsEnum(QAStatus)
  status?: QAStatus;

  @IsOptional()
  @IsString()
  language?: string;
}
