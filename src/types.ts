export interface JobNotification {
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
}

export interface AdmitCardResult {
  title: string;
  organization: string;
  date: string;
  link: string;
  type: 'admit-card' | 'result';
}

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  link: string;
  snippet: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: GroundingSource[];
}

export interface SyllabusSubject {
  name: string;
  description: string;
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