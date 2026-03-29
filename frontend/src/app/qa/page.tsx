'use client';

import { useState, useEffect } from 'react';
import { QA_GROUPS, SCORE_SCALE, type Language, type QAGroup } from '@/constants/qa';
import { 
  GraduationCap, BookOpen, FileText, Users, Heart, 
  Briefcase, Building, Landmark, ChevronRight, Save, 
  Send, ArrowLeft, BarChart3, CheckCircle2, Circle,
  Plus, Edit, Trash2, X, Upload, Download, Search,
  Menu, User, Book, Award, ClipboardList, Activity
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

type ViewType = 'home' | 'groups' | 'group-detail' | 'key-detail' | 'evaluation' | 'analysis';

interface Student {
  id: string;
  name: string;
  year: number;
  class: string;
  key: string;
  math: number;
  tamil: number;
  english: number;
  science: number;
  social: number;
  other?: number;
  reports: { id: string; url: string; year: number; type: string }[];
}

interface KeyData {
  id: string;
  name: string;
  ta: string;
  en: string;
  students: Student[];
}

const initialStudents: Student[] = [
  { id: '1', name: 'Arun Kumar', year: 2024, class: '10-A', key: 'G1', math: 35, tamil: 38, english: 32, science: 36, social: 34, reports: [] },
  { id: '2', name: 'Divya Sharma', year: 2024, class: '10-A', key: 'G1', math: 28, tamil: 32, english: 30, science: 25, social: 28, reports: [] },
  { id: '3', name: 'Karthik Raja', year: 2024, class: '10-B', key: 'G1', math: 40, tamil: 40, english: 38, science: 39, social: 37, reports: [] },
  { id: '4', name: 'Meena Kumari', year: 2023, class: '9-A', key: 'G2', math: 32, tamil: 35, english: 30, science: 33, social: 31, reports: [] },
  { id: '5', name: 'Vikram Singh', year: 2024, class: '11-A', key: 'G2', math: 25, tamil: 28, english: 22, science: 20, social: 24, reports: [] },
];

const KEYS_DATA: KeyData[] = [
  { id: 'G1', name: 'Key 1', ta: 'விசேட தகுதி 1', en: 'Special Qualification 1', students: [] },
  { id: 'G2', name: 'Key 2', ta: 'விசேட தகுதி 2', en: 'Special Qualification 2', students: [] },
  { id: 'G3', name: 'Key 3', ta: 'விசேட தகுதி 3', en: 'Special Qualification 3', students: [] },
  { id: 'G4', name: 'Key 4', ta: 'விசேட தகுதி 4', en: 'Special Qualification 4', students: [] },
];

interface ScoreState {
  [key: string]: number;
}

interface DiscussionState {
  [key: string]: string;
}

export default function QAPage() {
  const [language, setLanguage] = useState<Language>('ta');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedGroup, setSelectedGroup] = useState<QAGroup | null>(null);
  const [selectedKey, setSelectedKey] = useState<KeyData | null>(null);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [scores, setScores] = useState<ScoreState>({});
  const [discussions, setDiscussions] = useState<DiscussionState>({});
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<number>(2024);
  const [filterClass, setFilterClass] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    class: '',
    key: '',
    math: 0,
    tamil: 0,
    english: 0,
    science: 0,
    social: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = filterYear ? s.year === filterYear : true;
    const matchClass = filterClass ? s.class === filterClass : true;
    const matchKey = selectedKey ? s.key === selectedKey.id : true;
    return matchSearch && matchYear && matchClass && matchKey;
  });

  const getScoreLabel = (score: number) => {
    const scale = SCORE_SCALE.find(s => s.v === score);
    return scale ? (language === 'ta' ? scale.ta : scale.en) : '';
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
    return maxScore > 0 ? ((currentScore / maxScore) * 100).toFixed(1) : '0';
  };

  const getGrade = () => {
    const percentage = parseFloat(calculatePercentage());
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'D';
  };

  const calculateStudentGrade = (student: Student) => {
    const subjects = [student.math, student.tamil, student.english, student.science, student.social];
    const cCount = subjects.filter(s => s <= 20).length;
    const sCount = subjects.filter(s => s > 20 && s <= 30).length;
    const hasMath = student.math > 0;
    const hasTamil = student.tamil > 0;
    if (!hasMath || !hasTamil || cCount >= 3 || (cCount >= 2 && sCount < 2)) {
      return { grade: 'C', c: cCount, s: sCount };
    }
    return { grade: cCount > 0 ? 'C' : 'S', c: cCount, s: sCount };
  };

  const calculateStudentPercentage = (student: Student) => {
    const subjects = [student.math, student.tamil, student.english, student.science, student.social];
    const total = subjects.reduce((a, b) => a + b, 0);
    return ((total / 200) * 100).toFixed(1);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      year: new Date().getFullYear(),
      class: '',
      key: selectedKey?.id || 'G1',
      math: 0,
      tamil: 0,
      english: 0,
      science: 0,
      social: 0,
    });
    setShowStudentModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      year: student.year,
      class: student.class,
      key: student.key,
      math: student.math,
      tamil: student.tamil,
      english: student.english,
      science: student.science,
      social: student.social,
    });
    setShowStudentModal(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm(language === 'ta' ? 'மாணவரை நீக்க விரும்புகிறீர்களா?' : 'Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formData, id: s.id } : s));
    } else {
      setStudents([...students, { ...formData, id: Date.now().toString(), reports: [] }]);
    }
    setShowStudentModal(false);
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
              currentScore === scale.v ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
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

  const renderHomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-14 h-14 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Sri Lanka School</h1>
              <p className="text-slate-300 text-lg">{language === 'ta' ? 'உள்ளக மதிப்பீடு முகாமைத்துவ மையம்' : 'Internal Evaluation Management Center'}</p>
              <p className="text-slate-400">{language === 'ta' ? '2014/31 சுற்றறிக்கை' : 'Circular 2014/31'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-blue-400">8</div>
              <div className="text-slate-300">{language === 'ta' ? 'குழுக்கள்' : 'Groups'}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-green-400">34</div>
              <div className="text-slate-300">{language === 'ta' ? 'விசேட தகுதிகள்' : 'Key Areas'}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{students.length}</div>
              <div className="text-slate-300">{language === 'ta' ? 'மாணவர்கள்' : 'Students'}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-yellow-400">2024</div>
              <div className="text-slate-300">{language === 'ta' ? 'ஆண்டு' : 'Year'}</div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => setCurrentView('groups')}
              className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              <Menu className="w-5 h-5" />
              {language === 'ta' ? 'குழுக்களை பார்' : 'View Groups'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('evaluation')}
              className="flex-1 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <ClipboardList className="w-5 h-5" />
              {language === 'ta' ? 'மதிப்பீடு செய்' : 'Do Evaluation'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QA_GROUPS.map((group) => {
            const Icon = iconMap[group.icon] || GraduationCap;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  setSelectedGroup(group);
                  setCurrentView('group-detail');
                }}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: group.color + '30' }}>
                  <Icon className="w-6 h-6" style={{ color: group.color }} />
                </div>
                <h3 className="font-semibold text-white">{language === 'ta' ? group.ta : group.en}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {group.criteria.length} {language === 'ta' ? 'மதிப்பீடுகள்' : 'Criteria'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGroupsPage = () => (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <button type="button" onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{language === 'ta' ? 'குழுக்கள்' : 'Groups'}</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QA_GROUPS.map((group) => {
          const Icon = iconMap[group.icon] || GraduationCap;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => {
                setSelectedGroup(group);
                setCurrentView('group-detail');
              }}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: group.color + '20' }}>
                  <Icon className="w-7 h-7" style={{ color: group.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{language === 'ta' ? group.ta : group.en}</h3>
                  <p className="text-sm text-gray-500">Group {group.id}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'ta' ? `${group.criteria.length} மதிப்பீடு கூறுகள்` : `${group.criteria.length} evaluation criteria`}
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: group.color }}>
                <span>{language === 'ta' ? 'மேலும் பார்க்க' : 'View Details'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderGroupDetail = () => (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <button type="button" onClick={() => setCurrentView('groups')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{selectedGroup ? (language === 'ta' ? selectedGroup.ta : selectedGroup.en) : ''}</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">{language === 'ta' ? 'குழுவின் இலக்கு' : 'Group Goal'}</h2>
          <p className="text-gray-600">
            {language === 'ta' 
              ? 'இந்த குழு பாடசாலையின் ஒட்டுமொத்த மேம்பாட்டிற்காக உள்ளக மதிப்பீடு செய்கிறது. மாணவர்களின் கல்வி முடிவுகள், ஆசிரியர்களின் செயற்பாடுகள், வள முகாமை ஆகியவற்றை மதிப்பீடு செய்கிறது.'
              : 'This group conducts internal evaluation for the overall development of the school. It evaluates student academic results, teacher activities, and resource management.'}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedGroup?.criteria.length || 0}</div>
              <div className="text-sm text-gray-600">{language === 'ta' ? 'மதிப்பீடுகள்' : 'Criteria'}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{selectedGroup?.criteria.reduce((s, c) => s + (c.indicators?.length || 0), 0) || 0}</div>
              <div className="text-sm text-gray-600">{language === 'ta' ? 'சுட்டிகள்' : 'Indicators'}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">{language === 'ta' ? 'புள்ளி அளவு' : 'Score Scale'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">{language === 'ta' ? 'விசேட தகுதிகள் (Keys)' : 'Special Qualifications (Keys)'}</h2>
          <div className="space-y-3">
            {KEYS_DATA.map((key) => (
              <button
                key={key.id}
                type="button"
                onClick={() => {
                  setSelectedKey(key);
                  setCurrentView('key-detail');
                }}
                className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left flex items-center justify-between"
              >
                <span className="font-medium">{key.id}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">{language === 'ta' ? 'மதிப்பீடு கூறுகள்' : 'Evaluation Criteria'}</h2>
        <div className="space-y-4">
          {selectedGroup?.criteria.map((criteria) => (
            <div key={criteria.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{language === 'ta' ? criteria.ta : criteria.en}</h3>
              {criteria.indicators && (
                <ul className="mt-2 space-y-1">
                  {criteria.indicators.map((indicator) => (
                    <li key={indicator.id} className="text-sm text-gray-600 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {language === 'ta' ? indicator.ta : indicator.en}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderKeyDetail = () => (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <button type="button" onClick={() => setCurrentView('group-detail')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{selectedKey?.id} - {language === 'ta' ? selectedKey?.ta : selectedKey?.en}</h1>
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

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{language === 'ta' ? 'மாணவர் பதிவு' : 'Student Records'}</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddStudent}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              {language === 'ta' ? 'மாணவர் சேர்' : 'Add Student'}
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'ta' ? 'தேடல்...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
          </select>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">{language === 'ta' ? 'அனைத்தும்' : 'All Classes'}</option>
            <option value="10-A">10-A</option>
            <option value="10-B">10-B</option>
            <option value="9-A">9-A</option>
            <option value="11-A">11-A</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-600">#</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'பெயர்' : 'Name'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'வகுப்பு' : 'Class'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'கணிதம்' : 'Math'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'தமிழ்' : 'Tamil'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'ஆங்கிலம்' : 'English'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'விஞ்ஞானம்' : 'Science'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'சமூகம்' : 'Social'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">%</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'தரம்' : 'Grade'}</th>
                <th className="text-left p-3 font-semibold text-gray-600">{language === 'ta' ? 'செயல்கள்' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => {
                const { grade, c, s } = calculateStudentGrade(student);
                const percentage = calculateStudentPercentage(student);
                return (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className="p-3">{student.class}</td>
                    <td className="p-3">{student.math}/40</td>
                    <td className="p-3">{student.tamil}/40</td>
                    <td className="p-3">{student.english}/40</td>
                    <td className="p-3">{student.science}/40</td>
                    <td className="p-3">{student.social}/40</td>
                    <td className="p-3 font-medium">{percentage}%</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        grade === 'S' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {grade} ({c}C/{s}S)
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => handleEditStudent(student)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button type="button" onClick={() => handleDeleteStudent(student.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <p className="text-center py-8 text-gray-500">{language === 'ta' ? 'மாணவர்கள் இல்லை' : 'No students found'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderEvaluation = () => (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{language === 'ta' ? 'QA மதிப்பீடு படிவம்' : 'QA Evaluation Form'}</h1>
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
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Save className="w-4 h-4" />
              {language === 'ta' ? 'சேமி' : 'Save'}
            </button>
            <button
              type="button"
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
                <div className="p-4 flex items-center gap-3" style={{ backgroundColor: group.color + '10' }}>
                  <Icon className="w-5 h-5" style={{ color: group.color }} />
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
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && renderHomePage()}
      {currentView === 'groups' && renderGroupsPage()}
      {currentView === 'group-detail' && renderGroupDetail()}
      {currentView === 'key-detail' && renderKeyDetail()}
      {currentView === 'evaluation' && renderEvaluation()}

      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {editingStudent ? (language === 'ta' ? 'மாணவர் திருத்து' : 'Edit Student') : (language === 'ta' ? 'புதிய மாணவர்' : 'New Student')}
              </h2>
              <button type="button" onClick={() => setShowStudentModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'பெயர்' : 'Name'}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'வகுப்பு' : 'Class'}</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="9-A">9-A</option>
                    <option value="11-A">11-A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'ஆண்டு' : 'Year'}</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'கணிதம்' : 'Math'}</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.math}
                    onChange={(e) => setFormData({ ...formData, math: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'தமிழ்' : 'Tamil'}</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.tamil}
                    onChange={(e) => setFormData({ ...formData, tamil: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'ஆங்கி' : 'English'}</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.english}
                    onChange={(e) => setFormData({ ...formData, english: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'விஞ்ஞானம்' : 'Science'}</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.science}
                    onChange={(e) => setFormData({ ...formData, science: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ta' ? 'சமூகம்' : 'Social'}</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.social}
                    onChange={(e) => setFormData({ ...formData, social: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="flex-1 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {language === 'ta' ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveStudent}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {language === 'ta' ? 'சேமி' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
