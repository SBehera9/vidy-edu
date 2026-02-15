/// <reference types="vite/client" />
import {
  JobNotification,
  NewsItem,
  SearchResult,
  AdmitCardResult,
  SyllabusItem
} from "../types";

// Cache for storing fetched data
interface CacheData<T> {
  data: T[];
  timestamp: number;
  category?: string;
}

class DataCache {
  private static instance: DataCache;
  private cache: Map<string, CacheData<any>> = new Map();
  private CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

  static getInstance(): DataCache {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }

  set<T>(key: string, data: T[], category?: string): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      category
    });
    console.log(`Cache updated for ${key} at ${new Date().toLocaleString()}`);
  }

  get<T>(key: string): T[] | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      console.log(`Cache expired for ${key}`);
      this.cache.delete(key);
      return null;
    }

    console.log(`Returning cached data for ${key} from ${new Date(item.timestamp).toLocaleString()}`);
    return item.data as T[];
  }

  clear(): void {
    this.cache.clear();
  }

  getLastUpdated(key: string): Date | null {
    const item = this.cache.get(key);
    return item ? new Date(item.timestamp) : null;
  }
}

const cache = DataCache.getInstance();

/* =======================
   🔍 SEARCH (FREE APIs)
   ======================= */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    if (wikiRes.ok) {
      const data = await wikiRes.json();
      return {
        text: `## ${data.title}\n\n${data.extract || 'No description available.'}\n\n---\n*Source: Wikipedia*`,
        sources: [{
          title: "Wikipedia - " + data.title,
          uri: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`
        }]
      };
    }

    const ddgRes = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
    );
    
    if (ddgRes.ok) {
      const data = await ddgRes.json();
      if (data.Abstract || data.Definition) {
        return {
          text: data.Abstract || data.Definition || data.Answer || "No information found.",
          sources: data.AbstractSource ? [{
            title: data.AbstractSource,
            uri: data.AbstractURL || "#"
          }] : []
        };
      }
    }

    return { 
      text: "No information found. Try a different search term.", 
      sources: [] 
    };
  } catch (error) {
    console.error("Search error:", error);
    return { 
      text: "Search service temporarily unavailable.", 
      sources: [] 
    };
  }
};

/* =======================
   🧾 JOBS - CATEGORY WISE WITH LATEST FIRST
   ======================= */

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Check if job is new (within last 7 days)
const isNew = (dateString: string): boolean => {
  const postedDate = new Date(dateString);
  const now = new Date();
  const diffDays = (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};

const getStaticJobs = (): JobNotification[] => {
  const now = new Date();
  const jobs: JobNotification[] = [
    // Schooling Jobs
    {
      id: generateId(),
      title: "KVS TGT Recruitment 2026",
      organization: "Kendriya Vidyalaya Sangathan",
      location: "All India",
      state: "All India",
      startDate: "2026-03-15",
      endDate: "2026-04-15",
      applyLink: "https://kvsangathan.nic.in",
      notificationLink: "https://kvsangathan.nic.in",
      examDetails: "Trained Graduate Teacher Recruitment",
      description: "Recruitment for TGT posts in Kendriya Vidyalayas across India",
      jobType: "Govt",
      category: "schooling",
      postedDate: "2026-03-01",
      lastDate: "2026-04-15",
      isNew: true
    },
    {
      id: generateId(),
      title: "NVS PGT Recruitment 2026",
      organization: "Navodaya Vidyalaya Samiti",
      location: "All India",
      state: "All India",
      startDate: "2026-03-10",
      endDate: "2026-04-10",
      applyLink: "https://navodaya.gov.in",
      notificationLink: "https://navodaya.gov.in",
      examDetails: "PGT Recruitment",
      description: "Post Graduate Teacher recruitment for JNVs",
      jobType: "Govt",
      category: "schooling",
      postedDate: "2026-02-28",
      lastDate: "2026-04-10",
      isNew: false
    },

    // Higher Education Jobs
    {
      id: generateId(),
      title: "DU Assistant Professor 2026",
      organization: "Delhi University",
      location: "Delhi",
      state: "Delhi",
      startDate: "2026-03-20",
      endDate: "2026-04-20",
      applyLink: "https://du.ac.in",
      notificationLink: "https://du.ac.in",
      examDetails: "Assistant Professor Recruitment",
      description: "Recruitment of Assistant Professors in various departments",
      jobType: "Govt",
      category: "higher-ed",
      postedDate: "2026-03-05",
      lastDate: "2026-04-20",
      isNew: true
    },
    {
      id: generateId(),
      title: "JNU Non-Teaching Recruitment",
      organization: "Jawaharlal Nehru University",
      location: "Delhi",
      state: "Delhi",
      startDate: "2026-03-01",
      endDate: "2026-03-31",
      applyLink: "https://jnu.ac.in",
      notificationLink: "https://jnu.ac.in",
      examDetails: "Non-Teaching Positions",
      description: "Various non-teaching positions in JNU",
      jobType: "Govt",
      category: "higher-ed",
      postedDate: "2026-02-25",
      lastDate: "2026-03-31",
      isNew: false
    },

    // Entrance Exams
    {
      id: generateId(),
      title: "SSC CGL 2026",
      organization: "Staff Selection Commission",
      location: "All India",
      state: "All India",
      startDate: "2026-03-01",
      endDate: "2026-04-10",
      applyLink: "https://ssc.nic.in",
      notificationLink: "https://ssc.nic.in",
      examDetails: "Graduate Level Examination",
      description: "Combined Graduate Level Examination for various government posts",
      jobType: "Govt",
      category: "entrance",
      postedDate: "2026-02-20",
      lastDate: "2026-04-10",
      isNew: true
    },
    {
      id: generateId(),
      title: "UPSC Civil Services 2026",
      organization: "Union Public Service Commission",
      location: "All India",
      state: "All India",
      startDate: "2026-02-15",
      endDate: "2026-03-20",
      applyLink: "https://upsc.gov.in",
      notificationLink: "https://upsc.gov.in",
      examDetails: "IAS, IPS, IFS Examination",
      description: "Civil Services Examination for prestigious administrative positions",
      jobType: "Govt",
      category: "entrance",
      postedDate: "2026-02-10",
      lastDate: "2026-03-20",
      isNew: true
    },

    // Skill Hub Jobs
    {
      id: generateId(),
      title: "NSDC Training Partner",
      organization: "National Skill Development Corporation",
      location: "All India",
      state: "All India",
      startDate: "2026-03-10",
      endDate: "2026-04-10",
      applyLink: "https://nsdcindia.org",
      notificationLink: "https://nsdcindia.org",
      examDetails: "Training Partner Recruitment",
      description: "Empanelment of training partners for skill development programs",
      jobType: "Govt",
      category: "skill-hub",
      postedDate: "2026-03-01",
      lastDate: "2026-04-10",
      isNew: true
    },
    {
      id: generateId(),
      title: "ITI Instructor Recruitment",
      organization: "Directorate General of Training",
      location: "All India",
      state: "All India",
      startDate: "2026-03-05",
      endDate: "2026-04-05",
      applyLink: "https://dgt.gov.in",
      notificationLink: "https://dgt.gov.in",
      examDetails: "ITI Instructor Posts",
      description: "Recruitment of instructors for ITIs across India",
      jobType: "Govt",
      category: "skill-hub",
      postedDate: "2026-02-28",
      lastDate: "2026-04-05",
      isNew: false
    }
  ];

  // Sort by posted date (latest first)
  return jobs.sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );
};

const fetchJobsFromRSS = async (): Promise<JobNotification[]> => {
  try {
    const rssFeeds = [
      'https://www.freejobalert.com/feed',
      'https://www.sarkariresult.com/feed',
      'https://www.indgovtjobs.in/feeds/posts/default',
      'https://www.governmentjobsaajtak.com/feed'
    ];

    const promises = rssFeeds.map(async (feed, index) => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`
        );
        
        if (!response.ok) return [];
        
        const data = await response.json();
        if (!data.items || !Array.isArray(data.items)) return [];
        
        return data.items.map((item: any) => {
          const title = item.title || '';
          const description = item.description || '';
          const content = item.content || '';
          
          let organization = "Government of India";
          const orgKeywords = ['SSC', 'UPSC', 'RRB', 'IBPS', 'CBSE', 'UGC', 'NTA', 'DRDO', 'ISRO', 'BPSC', 'MPSC', 'KVS', 'NVS', 'DU', 'JNU'];
          for (const org of orgKeywords) {
            if (title.includes(org) || description.includes(org)) {
              organization = org;
              break;
            }
          }
          
          let location = "All India";
          const stateKeywords = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune'];
          for (const state of stateKeywords) {
            if (title.includes(state) || description.includes(state)) {
              location = state;
              break;
            }
          }
          
          // Determine category
          let category: 'schooling' | 'higher-ed' | 'entrance' | 'skill-hub' = 'entrance';
          if (title.includes('KVS') || title.includes('NVS') || title.includes('TGT') || title.includes('PGT') || title.includes('Teacher')) {
            category = 'schooling';
          } else if (title.includes('Professor') || title.includes('University') || title.includes('College') || title.includes('DU') || title.includes('JNU')) {
            category = 'higher-ed';
          } else if (title.includes('Skill') || title.includes('Training') || title.includes('ITI') || title.includes('Vocational')) {
            category = 'skill-hub';
          }
          
          const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
          const postedDate = pubDate.toISOString().split('T')[0];
          
          const endDateObj = new Date(pubDate);
          endDateObj.setDate(endDateObj.getDate() + 30);
          const endDate = endDateObj.toISOString().split('T')[0];
          
          return {
            id: generateId(),
            title: title.substring(0, 200),
            organization,
            location,
            state: "All India",
            startDate: postedDate,
            endDate,
            applyLink: item.link || '#',
            notificationLink: item.link || '#',
            examDetails: description.replace(/<[^>]*>/g, '').substring(0, 300),
            description: description.replace(/<[^>]*>/g, '').substring(0, 500),
            jobType: "Govt",
            category,
            postedDate,
            lastDate: endDate,
            isNew: isNew(postedDate)
          };
        });
      } catch (error) {
        console.error(`Error fetching feed ${index}:`, error);
        return [];
      }
    });

    const results = await Promise.all(promises);
    const allJobs = results.flat();
    
    // Remove duplicates based on title
    const uniqueJobs = Array.from(
      new Map(allJobs.map(job => [job.title, job])).values()
    );
    
    // Sort by posted date (latest first)
    const sortedJobs = uniqueJobs.sort((a, b) => 
      new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
    
    return sortedJobs.length > 0 ? sortedJobs : getStaticJobs();
  } catch (error) {
    console.error("Error fetching RSS feeds:", error);
    return getStaticJobs();
  }
};

export const fetchJobNotifications = async (category?: string): Promise<JobNotification[]> => {
  const cacheKey = category ? `jobs_${category}` : 'jobs_all';
  
  // Check cache first
  const cached = cache.get<JobNotification>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    console.log("Fetching fresh jobs data...");
    const allJobs = await fetchJobsFromRSS();
    
    // Filter by category if specified
    const filteredJobs = category 
      ? allJobs.filter(job => job.category === category)
      : allJobs;
    
    // Update cache
    cache.set(cacheKey, filteredJobs, category);
    
    return filteredJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    const staticJobs = getStaticJobs();
    const filteredStatic = category
      ? staticJobs.filter(job => job.category === category)
      : staticJobs;
    return filteredStatic;
  }
};

/* =======================
   🎓 EXAM UPDATES (ADMIT CARDS & RESULTS)
   ======================= */

const getStaticExamUpdates = (type?: string, category?: string): AdmitCardResult[] => {
  const now = new Date();
  const updates: AdmitCardResult[] = [
    // Schooling
    {
      id: generateId(),
      title: "CBSE Class 10 Admit Card 2026",
      organization: "CBSE",
      date: "Mar 2026",
      link: "https://cbse.gov.in",
      type: "admit-card",
      examType: "schooling",
      postedDate: "2026-02-25",
      isNew: true
    },
    {
      id: generateId(),
      title: "CBSE Class 12 Result 2026",
      organization: "CBSE",
      date: "May 2026",
      link: "https://cbse.gov.in",
      type: "result",
      examType: "schooling",
      postedDate: "2026-05-20",
      isNew: false
    },
    
    // Higher Education
    {
      id: generateId(),
      title: "DU Admission Result 2026",
      organization: "Delhi University",
      date: "Jun 2026",
      link: "https://du.ac.in",
      type: "result",
      examType: "higher-ed",
      postedDate: "2026-06-10",
      isNew: false
    },
    
    // Entrance
    {
      id: generateId(),
      title: "SSC CGL Admit Card 2026",
      organization: "SSC",
      date: "Apr 2026",
      link: "https://ssc.nic.in",
      type: "admit-card",
      examType: "entrance",
      postedDate: "2026-04-01",
      isNew: true
    },
    {
      id: generateId(),
      title: "UPSC Prelims Result 2026",
      organization: "UPSC",
      date: "Jul 2026",
      link: "https://upsc.gov.in",
      type: "result",
      examType: "entrance",
      postedDate: "2026-07-15",
      isNew: false
    },
    
    // Skill Hub
    {
      id: generateId(),
      title: "ITI Admission Result 2026",
      organization: "DGT",
      date: "Aug 2026",
      link: "https://dgt.gov.in",
      type: "result",
      examType: "skill-hub",
      postedDate: "2026-08-01",
      isNew: false
    }
  ];

  // Filter by type and category
  let filtered = updates;
  if (type) {
    filtered = filtered.filter(u => u.type === (type.includes('admit') ? 'admit-card' : 'result'));
  }
  if (category) {
    filtered = filtered.filter(u => u.examType === category);
  }
  
  // Sort by posted date (latest first)
  return filtered.sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );
};

export const fetchExamUpdates = async (type?: string, category?: string): Promise<AdmitCardResult[]> => {
  const cacheKey = `exams_${type || 'all'}_${category || 'all'}`;
  
  const cached = cache.get<AdmitCardResult>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    // In a real implementation, fetch from RSS feeds
    // For now, return static data
    const updates = getStaticExamUpdates(type, category);
    cache.set(cacheKey, updates);
    return updates;
  } catch (error) {
    return getStaticExamUpdates(type, category);
  }
};

/* =======================
   📘 SYLLABUS - CATEGORY WISE WITH LATEST
   ======================= */

const getStaticSyllabus = (category?: string): SyllabusItem[] => {
  const syllabus: SyllabusItem[] = [
    // Schooling
    {
      id: generateId(),
      title: "CBSE Class 10 Complete Syllabus 2026",
      organization: "CBSE",
      category: "schooling",
      description: "Complete syllabus for all subjects - Mathematics, Science, Social Science, English, Hindi",
      downloadLink: "http://cbseacademic.nic.in/curriculum_2026.html",
      officialLink: "http://cbseacademic.nic.in/curriculum_2026.html",
      postedDate: "2026-03-01",
      examDate: "Mar 2027",
      isNew: true,
      subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"],
      level: "Class 10"
    },
    {
      id: generateId(),
      title: "CBSE Class 12 Syllabus 2026",
      organization: "CBSE",
      category: "schooling",
      description: "Complete syllabus for Science, Commerce, and Arts streams",
      downloadLink: "http://cbseacademic.nic.in/curriculum_2026.html",
      officialLink: "http://cbseacademic.nic.in/curriculum_2026.html",
      postedDate: "2026-02-28",
      examDate: "Feb 2027",
      isNew: true,
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Commerce", "Economics"],
      level: "Class 12"
    },
    {
      id: generateId(),
      title: "ICSE Class 10 Syllabus 2026",
      organization: "CISCE",
      category: "schooling",
      description: "ICSE Class 10 complete syllabus with exam pattern",
      downloadLink: "https://cisce.org/icse-syllabus/",
      officialLink: "https://cisce.org/icse-syllabus/",
      postedDate: "2026-02-15",
      examDate: "Mar 2027",
      isNew: false,
      level: "Class 10"
    },

    // Higher Education
    {
      id: generateId(),
      title: "DU BA Program Syllabus 2026",
      organization: "Delhi University",
      category: "higher-ed",
      description: "Complete syllabus for BA Program under CBCS",
      downloadLink: "https://du.ac.in",
      officialLink: "https://du.ac.in",
      postedDate: "2026-03-05",
      isNew: true,
      level: "Undergraduate"
    },
    {
      id: generateId(),
      title: "JNU MA Syllabus 2026",
      organization: "JNU",
      category: "higher-ed",
      description: "MA in various disciplines syllabus",
      downloadLink: "https://jnu.ac.in",
      officialLink: "https://jnu.ac.in",
      postedDate: "2026-02-20",
      isNew: false,
      level: "Postgraduate"
    },
    {
      id: generateId(),
      title: "UGC NET Syllabus 2026",
      organization: "UGC",
      category: "higher-ed",
      description: "National Eligibility Test syllabus for all subjects",
      downloadLink: "https://ugcnet.nta.nic.in",
      officialLink: "https://ugcnet.nta.nic.in",
      postedDate: "2026-03-10",
      isNew: true,
      level: "PG Level"
    },

    // Entrance
    {
      id: generateId(),
      title: "JEE Main 2026 Complete Syllabus",
      organization: "NTA",
      category: "entrance",
      description: "Physics, Chemistry, Mathematics complete syllabus with weightage",
      downloadLink: "https://jeemain.nta.nic.in",
      officialLink: "https://jeemain.nta.nic.in",
      postedDate: "2026-03-01",
      examDate: "Apr 2026",
      isNew: true,
      subjects: ["Physics", "Chemistry", "Mathematics"]
    },
    {
      id: generateId(),
      title: "NEET UG 2026 Syllabus",
      organization: "NTA",
      category: "entrance",
      description: "Physics, Chemistry, Biology complete syllabus",
      downloadLink: "https://neet.nta.nic.in",
      officialLink: "https://neet.nta.nic.in",
      postedDate: "2026-02-25",
      examDate: "May 2026",
      isNew: true,
      subjects: ["Physics", "Chemistry", "Biology"]
    },
    {
      id: generateId(),
      title: "UPSC Civil Services Syllabus 2026",
      organization: "UPSC",
      category: "entrance",
      description: "Prelims and Mains complete syllabus",
      downloadLink: "https://upsc.gov.in",
      officialLink: "https://upsc.gov.in",
      postedDate: "2026-02-01",
      examDate: "Jun 2026",
      isNew: false
    },

    // Skill Hub
    {
      id: generateId(),
      title: "ITI Trades Syllabus 2026",
      organization: "DGT",
      category: "skill-hub",
      description: "Complete syllabus for all ITI trades",
      downloadLink: "https://dgt.gov.in",
      officialLink: "https://dgt.gov.in",
      postedDate: "2026-03-08",
      isNew: true,
      level: "Vocational"
    },
    {
      id: generateId(),
      title: "NSDC Certification Courses",
      organization: "NSDC",
      category: "skill-hub",
      description: "Skill development courses syllabus",
      downloadLink: "https://nsdcindia.org",
      officialLink: "https://nsdcindia.org",
      postedDate: "2026-02-28",
      isNew: false
    }
  ];

  // Filter by category
  const filtered = category 
    ? syllabus.filter(s => s.category === category)
    : syllabus;
  
  // Sort by posted date (latest first)
  return filtered.sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );
};

export const fetchSyllabusByCategory = async (category?: string): Promise<SyllabusItem[]> => {
  const cacheKey = category ? `syllabus_${category}` : 'syllabus_all';
  
  const cached = cache.get<SyllabusItem>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    const syllabus = getStaticSyllabus(category);
    cache.set(cacheKey, syllabus);
    return syllabus;
  } catch (error) {
    return getStaticSyllabus(category);
  }
};

/* =======================
   📰 NEWS - CATEGORY WISE WITH LATEST
   ======================= */

const getStaticNews = (): NewsItem[] => {
  const news: NewsItem[] = [
    // Schooling
    {
      id: generateId(),
      title: "CBSE Board Exams 2026: Date Sheet Released",
      source: "CBSE Official",
      date: "Mar 15, 2026",
      link: "http://cbseacademic.nic.in",
      snippet: "CBSE has released the date sheet for Class 10 and 12 board examinations 2026. Exams to start from May 1.",
      category: "schooling",
      postedDate: "2026-03-15",
      isNew: true
    },
    {
      id: generateId(),
      title: "ICSE Class 10, 12 Exams 2026 Schedule Announced",
      source: "CISCE",
      date: "Mar 12, 2026",
      link: "https://cisce.org",
      snippet: "CISCE announces exam schedule for ICSE and ISC examinations 2026.",
      category: "schooling",
      postedDate: "2026-03-12",
      isNew: true
    },

    // Higher Education
    {
      id: generateId(),
      title: "DU Admission 2026: Registration Begins",
      source: "Delhi University",
      date: "Mar 10, 2026",
      link: "https://du.ac.in",
      snippet: "Delhi University starts online registration for UG and PG courses 2026.",
      category: "higher-ed",
      postedDate: "2026-03-10",
      isNew: true
    },
    {
      id: generateId(),
      title: "UGC NET 2026: Application Window Opens",
      source: "NTA",
      date: "Mar 08, 2026",
      link: "https://ugcnet.nta.nic.in",
      snippet: "NTA begins online application for UGC NET June 2026 session.",
      category: "higher-ed",
      postedDate: "2026-03-08",
      isNew: true
    },

    // Entrance
    {
      id: generateId(),
      title: "JEE Main 2026 Session 2 Registration Started",
      source: "NTA",
      date: "Mar 05, 2026",
      link: "https://jeemain.nta.nic.in",
      snippet: "Online registration for JEE Main 2026 session 2 has started. Last date to apply is March 30.",
      category: "entrance",
      postedDate: "2026-03-05",
      isNew: true
    },
    {
      id: generateId(),
      title: "UPSC Civil Services 2026 Notification Released",
      source: "UPSC",
      date: "Feb 28, 2026",
      link: "https://upsc.gov.in",
      snippet: "UPSC has released 1200 vacancies for Civil Services Examination 2026.",
      category: "entrance",
      postedDate: "2026-02-28",
      isNew: false
    },
    {
      id: generateId(),
      title: "NEET UG 2026: Important Dates Announced",
      source: "NTA",
      date: "Feb 25, 2026",
      link: "https://neet.nta.nic.in",
      snippet: "NTA announces NEET UG 2026 examination schedule. Exam to be held on May 5.",
      category: "entrance",
      postedDate: "2026-02-25",
      isNew: false
    },

    // Skill Hub
    {
      id: generateId(),
      title: "ITI Admissions 2026: State-wise Schedule",
      source: "DGT",
      date: "Mar 01, 2026",
      link: "https://dgt.gov.in",
      snippet: "State-wise ITI admission schedule for 2026 session released.",
      category: "skill-hub",
      postedDate: "2026-03-01",
      isNew: true
    },
    {
      id: generateId(),
      title: "NSDC Launches New Skill Development Courses",
      source: "NSDC",
      date: "Feb 20, 2026",
      link: "https://nsdcindia.org",
      snippet: "NSDC introduces 50 new skill development courses in partnership with industries.",
      category: "skill-hub",
      postedDate: "2026-02-20",
      isNew: false
    },

    // General
    {
      id: generateId(),
      title: "New Education Policy 2026: Implementation Guidelines",
      source: "Ministry of Education",
      date: "Mar 02, 2026",
      link: "https://www.education.gov.in",
      snippet: "Government issues guidelines for NEP 2026 implementation in all educational institutions.",
      category: "general",
      postedDate: "2026-03-02",
      isNew: true
    }
  ];

  // Sort by posted date (latest first)
  return news.sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );
};

export const fetchEducationalNews = async (category?: string): Promise<NewsItem[]> => {
  const cacheKey = category ? `news_${category}` : 'news_all';
  
  const cached = cache.get<NewsItem>(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    const allNews = getStaticNews();
    
    // Filter by category if specified
    const filteredNews = category
      ? allNews.filter(news => news.category === category)
      : allNews;
    
    cache.set(cacheKey, filteredNews);
    return filteredNews;
  } catch (error) {
    const allNews = getStaticNews();
    return category
      ? allNews.filter(news => news.category === category)
      : allNews;
  }
};

// Get last updated time for a specific data type
export const getLastUpdated = (key: string): Date | null => {
  return cache.getLastUpdated(key);
};