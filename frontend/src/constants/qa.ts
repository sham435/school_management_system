import { type Language } from '@/types/qa';

export type { Language };

export const SCORE_SCALE = [
  { v: 1, ta: 'விரைவாக அபிவிருத்தி', en: 'Urgent Development', color: '#dc2626' },
  { v: 2, ta: 'அபிவிருத்தி தேவை', en: 'Needs Development', color: '#ea580c' },
  { v: 3, ta: 'சாதாரணம்', en: 'Average', color: '#ca8a04' },
  { v: 4, ta: 'நன்று', en: 'Good', color: '#16a34a' },
  { v: 5, ta: 'மிகவும் நன்று', en: 'Very Good', color: '#0891b2' },
  { v: 6, ta: 'அதிவிசேடம்', en: 'Outstanding', color: '#7c3aed' },
];

export interface QAIndicator {
  id: string;
  ta: string;
  en: string;
}

export interface QACriteria {
  id: string;
  ta: string;
  en: string;
  indicators?: QAIndicator[];
}

export interface QAGroup {
  id: string;
  ta: string;
  en: string;
  icon: string;
  color: string;
  criteria: QACriteria[];
}

export const QA_GROUPS: QAGroup[] = [
  {
    id: '1',
    ta: 'வள முகாமை',
    en: 'Resource Management',
    icon: 'GraduationCap',
    color: '#3b82f6',
    criteria: [
      { id: '1.1', ta: 'மனித வளம்', en: 'Human Resources', indicators: [
        { id: '1.1.1', ta: 'தகுதியான ஆசிரியர்களின் எண்ணிக்கை', en: 'Adequate number of qualified teachers' },
        { id: '1.1.2', ta: 'ஆசிரியர்களின் தொழில் வாழ்க்கை மேம்பாடு', en: 'Teachers\' professional development' },
      ]},
      { id: '1.2', ta: 'இயல் வளங்கள்', en: 'Physical Resources', indicators: [
        { id: '1.2.1', ta: 'கல்வி வசதிகள்', en: 'Educational facilities' },
        { id: '1.2.2', ta: 'நூலக வசதிகள்', en: 'Library facilities' },
      ]},
      { id: '1.3', ta: 'நிதி முகாமை', en: 'Financial Management', indicators: [
        { id: '1.3.1', ta: 'வரவு செலவு திட்டம்', en: 'Budget planning and utilization' },
      ]},
    ],
  },
  {
    id: '2',
    ta: 'கலந்துரையாடல் & கற்பித்தல்',
    en: 'Curriculum & Teaching',
    icon: 'BookOpen',
    color: '#8b5cf6',
    criteria: [
      { id: '2.1', ta: 'பாட திட்டம்', en: 'Curriculum Implementation', indicators: [
        { id: '2.1.1', ta: 'தரமான பாட நிரல்', en: 'Quality curriculum delivery' },
      ]},
      { id: '2.2', ta: 'கற்பித்தல் முறைகள்', en: 'Teaching Methods', indicators: [
        { id: '2.2.1', ta: 'மாணவர்களின் பங்கேற்பு', en: 'Student participation' },
        { id: '2.2.2', ta: 'புதுமையான கற்பித்தல்', en: 'Innovative teaching methods' },
      ]},
      { id: '2.3', ta: 'மதிப்பீடு', en: 'Assessment', indicators: [
        { id: '2.3.1', ta: 'தரமான மதிப்பீடு', en: 'Comprehensive assessment' },
      ]},
    ],
  },
  {
    id: '3',
    ta: 'கல்வி சூழல்',
    en: 'Learning Environment',
    icon: 'FileText',
    color: '#ec4899',
    criteria: [
      { id: '3.1', ta: 'பாதுகாப்பு', en: 'Safety', indicators: [
        { id: '3.1.1', ta: 'உடல் பாதுகாப்பு', en: 'Physical safety' },
        { id: '3.1.2', ta: 'மனவுப் பாதுகாப்பு', en: 'Psychological safety' },
      ]},
      { id: '3.2', ta: 'ஒழுங்கு', en: 'Discipline', indicators: [
        { id: '3.2.1', ta: 'கல்வி ஒழுங்கு', en: 'Academic discipline' },
      ]},
      { id: '3.3', ta: 'சமூக உறவுகள்', en: 'Social Relationships', indicators: [
        { id: '3.3.1', ta: 'மாணவர்-ஆசிரியர் உறவு', en: 'Student-teacher relationships' },
      ]},
    ],
  },
  {
    id: '4',
    ta: 'மாணவர் மேம்பாடு',
    en: 'Student Development',
    icon: 'Users',
    color: '#f59e0b',
    criteria: [
      { id: '4.1', ta: 'கல்வி முடிவுகள்', en: 'Academic Achievement', indicators: [
        { id: '4.1.1', ta: 'புள்ளி விபரங்கள்', en: 'Examination results' },
        { id: '4.1.2', ta: 'கல்வி முன்னேற்றம்', en: 'Academic progress' },
      ]},
      { id: '4.2', ta: 'சமூக மேம்பாடு', en: 'Social Development', indicators: [
        { id: '4.2.1', ta: 'தலைமைத்துவ திறன்கள்', en: 'Leadership skills' },
      ]},
      { id: '4.3', ta: 'ஆளுமை மேம்பாடு', en: 'Character Development', indicators: [
        { id: '4.3.1', ta: 'நெறிமுறைகள்', en: 'Moral values' },
      ]},
    ],
  },
  {
    id: '5',
    ta: 'ஆரோக்கியமும் மீள்திறனும்',
    en: 'Health and Well-being',
    icon: 'Heart',
    color: '#ef4444',
    criteria: [
      { id: '5.1', ta: 'உடல் ஆரோக்கியம்', en: 'Physical Health', indicators: [
        { id: '5.1.1', ta: 'சுகாதார வசதிகள்', en: 'Health facilities' },
      ]},
      { id: '5.2', ta: 'மன ஆரோக்கியம்', en: 'Mental Health', indicators: [
        { id: '5.2.1', ta: 'உளவியல் ஆதரவு', en: 'Psychological support' },
      ]},
      { id: '5.3', ta: 'விளையாட்டு', en: 'Sports', indicators: [
        { id: '5.3.1', ta: 'விளையாட்டு நடவடிக்கைகள்', en: 'Sports activities' },
      ]},
    ],
  },
  {
    id: '6',
    ta: 'ஊடகமும் தகவல் தொடர்பும்',
    en: 'Media and Communication',
    icon: 'Briefcase',
    color: '#14b8a6',
    criteria: [
      { id: '6.1', ta: 'பெற்றோர் தகவல் தொடர்பு', en: 'Parent Communication', indicators: [
        { id: '6.1.1', ta: 'வழக்கமான தகவல்', en: 'Regular communication' },
      ]},
      { id: '6.2', ta: 'சமூக ஊடகங்கள்', en: 'Social Media', indicators: [
        { id: '6.2.1', ta: 'இணையதளம்', en: 'Website and online presence' },
      ]},
      { id: '6.3', ta: 'சமூக ஈடுபாடு', en: 'Community Involvement', indicators: [
        { id: '6.3.1', ta: 'பெற்றோர் ஈடுபாடு', en: 'Parent involvement' },
      ]},
    ],
  },
  {
    id: '7',
    ta: 'தலைமையகமும் ஆளுகையும்',
    en: 'Leadership and Management',
    icon: 'Building',
    color: '#6366f1',
    criteria: [
      { id: '7.1', ta: 'தலைமை', en: 'Leadership', indicators: [
        { id: '7.1.1', ta: 'தலைமைத் திறன்', en: 'Leadership capabilities' },
      ]},
      { id: '7.2', ta: 'ஆளுகை', en: 'Administration', indicators: [
        { id: '7.2.1', ta: 'சுற்றுமுறை', en: 'Procedures and policies' },
      ]},
      { id: '7.3', ta: 'தர முகாமை', en: 'Quality Assurance', indicators: [
        { id: '7.3.1', ta: 'தர கட்டுப்பாடு', en: 'Quality control' },
      ]},
    ],
  },
  {
    id: '8',
    ta: 'சமூக பொறுப்பு',
    en: 'Social Responsibility',
    icon: 'Landmark',
    color: '#10b981',
    criteria: [
      { id: '8.1', ta: 'சமூக சேவை', en: 'Community Service', indicators: [
        { id: '8.1.1', ta: 'தொண்டு நடவடிக்கைகள்', en: 'Charity activities' },
      ]},
      { id: '8.2', ta: 'சுற்றுச்சூழல் விழிப்புணர்வு', en: 'Environmental Awareness', indicators: [
        { id: '8.2.1', ta: 'பசுமைத் திட்டங்கள்', en: 'Green initiatives' },
      ]},
      { id: '8.3', ta: 'கலாசார பாதுகாப்பு', en: 'Cultural Preservation', indicators: [
        { id: '8.3.1', ta: 'மரபு வழக்குகள்', en: 'Traditional practices' },
      ]},
    ],
  },
];

export const getGroupName = (groupId: string, language: Language): string => {
  const group = QA_GROUPS.find(g => g.id === groupId);
  return group ? (language === 'ta' ? group.ta : group.en) : '';
};

export const getCriteriaName = (groupId: string, criteriaId: string, language: Language): string => {
  const group = QA_GROUPS.find(g => g.id === groupId);
  const criteria = group?.criteria.find(c => c.id === criteriaId);
  return criteria ? (language === 'ta' ? criteria.ta : criteria.en) : '';
};
