'use client';

import { useState, useEffect } from 'react';
import { QA_GROUPS, SCORE_SCALE, type Language, type QAGroup } from '@/constants/qa';
import { qaApi } from '@/api/qa';
import { QAEvaluation, QADashboardStats, QACriteriaInput, CreateQAEvaluationDto } from '@/types/qa';
import { 
  GraduationCap, BookOpen, FileText, Users, Heart, 
  Briefcase, Building, Landmark, ChevronRight, Save, 
  Send, ArrowLeft, BarChart3, CheckCircle2, Circle
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  BookOpen,
  FileText,
  Users,
  Heart,
  Briefcase,
  Building,
  Landmark,
};

interface ScoreState {
  [key: string]: number;
}

interface DiscussionState {
  [key: string]: string;
}

export default function QAPage() {
  const [language, setLanguage] = useState<Language>('ta');
  const [currentView, setCurrentView] = useState<'dashboard' | 'form' | 'summary'>('dashboard');
  const [selectedGroup, setSelectedGroup] = useState<QAGroup | null>(null);
  const [evaluations, setEvaluations] = useState<QAEvaluation[]>([]);
  const [stats, setStats] = useState<QADashboardStats | null>(null);
  const [scores, setScores] = useState<ScoreState>({});
  const [discussions, setDiscussions] = useState<DiscussionState>({});
  const [currentEvaluation, setCurrentEvaluation] = useState<QAEvaluation | null>(null);
  const [tenantId] = useState('default-tenant-id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadDashboardData();
  }, [tenantId]);

  const loadDashboardData = async () => {
    try {
      const [statsData, evaluationsData] = await Promise.all([
        qaApi.getDashboardStats(tenantId),
        qaApi.getAll({ tenantId }),
      ]);
      setStats(statsData);
      setEvaluations(evaluationsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const getScoreLabel = (score: number) => {
    const scale = SCORE_SCALE.find(s => s.v === score);
    return scale ? (language === 'ta' ? scale.ta : scale.en) : '';
  };

  const getScoreColor = (score: number) => {
    const scale = SCORE_SCALE.find(s => s.v === score);
    return scale ? scale.color : '#888';
  };

  const handleScoreChange = (criteriaId: string, score: number) => {
    setScores(prev => ({ ...prev, [criteriaId]: score }));
  };

  const handleDiscussionChange = (criteriaId: string, value: string) => {
    setDiscussions(prev => ({ ...prev, [criteriaId]: value }));
  };

  const calculateTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);
  };

  const calculatePercentage = () => {
    const totalCriteria = QA_GROUPS.reduce((sum, group) => sum + group.criteria.length, 0);
    const maxScore = totalCriteria * 6;
    const currentScore = calculateTotalScore();
    return maxScore > 0 ? ((currentScore / maxScore) * 100).toFixed(1) : 0;
  };

  const getGrade = () => {
    const percentage = parseFloat(String(calculatePercentage()));
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'D';
  };

  const buildCriteriaList = (): QACriteriaInput[] => {
    const criteria: QACriteriaInput[] = [];
    QA_GROUPS.forEach(group => {
      group.criteria.forEach(c => {
        const key = `${group.id}-${c.id}`;
        criteria.push({
          groupId: group.id,
          groupName: language === 'ta' ? group.ta : group.en,
          criteriaId: c.id,
          criteriaName: language === 'ta' ? c.ta : c.en,
          score: scores[key] || 0,
          scoreLabel: scores[key] ? getScoreLabel(scores[key]) : '',
          discussion: discussions[key] || '',
        });
      });
    });
    return criteria;
  };

  const handleSaveEvaluation = async (status: 'DRAFT' | 'IN_PROGRESS' | 'SUBMITTED' = 'DRAFT') => {
    try {
      const dto: CreateQAEvaluationDto = {
        tenantId,
        language,
        status,
        criteria: buildCriteriaList(),
      };

      if (currentEvaluation) {
        await qaApi.update(currentEvaluation.id, { ...dto, status });
      } else {
        const newEvaluation = await qaApi.create(dto);
        setCurrentEvaluation(newEvaluation);
      }
      await loadDashboardData();
      alert(language === 'ta' ? 'மதிப்பீடு சேமிக்கப்பட்டது!' : 'Evaluation saved!');
    } catch (error) {
      console.error('Failed to save evaluation:', error);
      alert(language === 'ta' ? 'சேமிப்பதில் பிழை!' : 'Error saving!');
    }
  };

  const handleSubmitEvaluation = async () => {
    await handleSaveEvaluation('SUBMITTED');
    setCurrentView('dashboard');
  };

  const startNewEvaluation = () => {
    setSelectedGroup(null);
    setScores({});
    setDiscussions({});
    setCurrentEvaluation(null);
    setCurrentView('form');
  };

  const renderScoreButtons = (criteriaId: string) => {
    const currentScore = scores[criteriaId] || 0;
    return (
      <div className="flex gap-2 mt-3">
        {SCORE_SCALE.map((scale) => (
          <button
            key={scale.v}
            type="button"
            onClick={() => handleScoreChange(criteriaId, scale.v)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              currentScore === scale.v
                ? 'ring-2 ring-offset-2'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: currentScore === scale.v ? scale.color : '#f3f4f6',
              color: currentScore === scale.v ? 'white' : '#374151',
              outlineColor: currentScore === scale.v ? scale.color : undefined,
            }}
          >
            <span className="block text-xs opacity-80">{scale.v}</span>
            <span className="block text-xs">{language === 'ta' ? scale.ta : scale.en}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ta' ? 'QA மதிப்பீடு' : 'QA Evaluation'}
          </h1>
          <p className="text-gray-600">
            {language === 'ta' 
              ? 'பள்ளி மதிப்பீடு & மேலாண்மை அமைப்பு'
              : 'School Evaluation & Management System'}
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="ta">தமிழ்</option>
            <option value="en">English</option>
          </select>
          <button
            type="button"
            onClick={startNewEvaluation}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {language === 'ta' ? 'புதிய மதிப்பீடு' : 'New Evaluation'}
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600">{language === 'ta' ? 'மொத்தம்' : 'Total'}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-gray-600">{language === 'ta' ? 'முடிந்தது' : 'Completed'}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-yellow-600">{stats.inProgress}</div>
            <div className="text-gray-600">{language === 'ta' ? 'நடந்து கொண்டிருக்கிறது' : 'In Progress'}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-gray-600">{stats.draft}</div>
            <div className="text-gray-600">{language === 'ta' ? 'வரைவு' : 'Draft'}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {QA_GROUPS.map((group) => {
          const Icon = iconMap[group.icon] || GraduationCap;
          return (
            <button
              type="button"
              key={group.id}
              onClick={() => {
                setSelectedGroup(group);
                setCurrentView('form');
              }}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all text-left"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: group.color + '20' }}
              >
                <span style={{ color: group.color }}>
                  <Icon className="w-6 h-6" />
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">
                {language === 'ta' ? group.ta : group.en}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {group.criteria.length} {language === 'ta' ? 'மதிப்பீடுகள்' : 'Criteria'}
              </p>
            </button>
          );
        })}
      </div>

      {evaluations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">
            {language === 'ta' ? 'முந்தைய மதிப்பீடுகள்' : 'Previous Evaluations'}
          </h2>
          <div className="space-y-3">
            {evaluations.slice(0, 5).map((eval_) => (
              <div
                key={eval_.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {eval_.status === 'SUBMITTED' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-yellow-600" />
                  )}
                  <div>
                    <div className="font-medium">
                      {mounted && eval_.createdAt ? new Date(eval_.createdAt).toISOString().split('T')[0] : '-'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {eval_.grade} - {eval_.percentage?.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {eval_.language === 'ta' ? 'தமிழ்' : 'English'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setCurrentView('dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'ta' ? 'QA மதிப்பீடு படிவம்' : 'QA Evaluation Form'}
        </h1>
        <div className="ml-auto flex gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="ta">தமிழ்</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">
              {language === 'ta' ? 'மதிப்பெண்' : 'Score'}: {calculateTotalScore()} / {QA_GROUPS.reduce((s, g) => s + g.criteria.length, 0) * 6}
            </h2>
            <p className="text-gray-600">
              {calculatePercentage()}% - Grade: {getGrade()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSaveEvaluation('DRAFT')}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Save className="w-4 h-4" />
              {language === 'ta' ? 'சேமி' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleSubmitEvaluation}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
              {language === 'ta' ? 'சமர்ப்பி' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {QA_GROUPS.map((group) => {
            const Icon = iconMap[group.icon] || GraduationCap;
            return (
              <div key={group.id} className="border rounded-xl overflow-hidden">
                <div
                  className="p-4 flex items-center gap-3"
                  style={{ backgroundColor: group.color + '10' }}
                >
                  <span style={{ color: group.color }}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-semibold" style={{ color: group.color }}>
                    {language === 'ta' ? group.ta : group.en}
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  {group.criteria.map((criteria) => {
                    const criteriaKey = `${group.id}-${criteria.id}`;
                    return (
                      <div key={criteria.id} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900">
                          {language === 'ta' ? criteria.ta : criteria.en}
                        </h4>
                        {criteria.indicators && (
                          <ul className="mt-2 space-y-1">
                            {criteria.indicators.map((indicator) => (
                              <li key={indicator.id} className="text-sm text-gray-600 flex items-center gap-2">
                                <ChevronRight className="w-4 h-4" />
                                {language === 'ta' ? indicator.ta : indicator.en}
                              </li>
                            ))}
                          </ul>
                        )}
                        {renderScoreButtons(criteriaKey)}
                        <textarea
                          placeholder={language === 'ta' ? 'கலந்துரையாடல்...' : 'Discussion...'}
                          value={discussions[criteriaKey] || ''}
                          onChange={(e) => handleDiscussionChange(criteriaKey, e.target.value)}
                          className="w-full mt-3 p-3 border rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'form' && renderForm()}
    </div>
  );
}
