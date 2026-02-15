export interface JobNotification {
  id: string;
  title: string;
  organization: string;
  location: string;
  state: string;
  startDate: string;
  endDate: string;
  applyLink: string;
  notificationLink: string;
  examDetails: string;
  description: string;
  jobType?: 'Govt' | 'Other';
  category?: string; // 'schooling' | 'higher-ed' | 'entrance' | 'skill-hub'
  postedDate: string;
  lastDate: string;
  isNew?: boolean;
}

export interface AdmitCardResult {
  id: string;
  title: string;
  organization: string;
  date: string;
  link: string;
  type: 'admit-card' | 'result';
  examType?: string; // 'schooling' | 'higher-ed' | 'entrance' | 'skill-hub'
  postedDate: string;
  isNew?: boolean;
}

export interface SyllabusItem {
  id: string;
  title: string;
  organization: string;
  category: 'schooling' | 'higher-ed' | 'entrance' | 'skill-hub';
  description: string;
  downloadLink: string;
  officialLink: string;
  postedDate: string;
  examDate?: string;
  isNew?: boolean;
  subjects?: string[];
  level?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  link: string;
  snippet: string;
  category?: 'schooling' | 'higher-ed' | 'entrance' | 'skill-hub' | 'general';
  postedDate: string;
  isNew?: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: GroundingSource[];
}

export enum Section {
  HOME = 'home',
  JOBS = 'jobs',
  SYLLABUS = 'syllabus',
  SEARCH = 'search',
  NEWS = 'news',
  ABOUT = 'about',
  TERMS = 'terms',
  PRIVACY = 'privacy',
  DISCLAIMER = 'disclaimer',
  FAQ = 'faq',
  CONTACT_PAGE = 'contact_page'
}

export type Language = 'en' | 'hi' | 'or';