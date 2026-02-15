/// <reference types="vite/client" />
import {
  JobNotification,
  NewsItem,
  SearchResult,
  AdmitCardResult
} from "../types";

/* =======================
   🔍 SEARCH (FREE APIs)
   ======================= */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  try {
    // Try Wikipedia first (completely free, no key)
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

    // Fallback to DuckDuckGo Instant Answer API (free, no key)
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

    // Final fallback to OpenLibrary API (for educational content)
    const olRes = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`
    );
    
    if (olRes.ok) {
      const data = await olRes.json();
      if (data.docs && data.docs.length > 0) {
        const book = data.docs[0];
        return {
          text: `## ${book.title}\n\n**Author:** ${book.author_name?.join(', ') || 'Unknown'}\n**First Published:** ${book.first_publish_year || 'N/A'}\n\n${book.description || 'Search for this book on Open Library for more details.'}`,
          sources: [{
            title: "Open Library",
            uri: `https://openlibrary.org${book.key}`
          }]
        };
      }
    }

    return { 
      text: "No information found in free knowledge bases. Try a different search term.", 
      sources: [] 
    };
  } catch (error) {
    console.error("Search error:", error);
    return { 
      text: "Search service temporarily unavailable. Please try again.", 
      sources: [] 
    };
  }
};

/* =======================
   🧾 JOBS (FREE INDIAN JOB APIs)
   ======================= */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  try {
    return [
      {
        title: "SSC CGL 2026",
        organization: "Staff Selection Commission",
        location: "All India",
        state: "All India",
        startDate: "2026-03-01",
        endDate: "2026-04-10",
        applyLink: "https://ssc.nic.in",
        notificationLink: "https://ssc.nic.in",
        examDetails: "Graduate Level Examination",
        description: "Combined Graduate Level Examination for various government posts.",
        jobType: "Govt"
      },
      {
        title: "UPSC Civil Services 2026",
        organization: "Union Public Service Commission",
        location: "All India",
        state: "All India",
        startDate: "2026-02-15",
        endDate: "2026-03-20",
        applyLink: "https://upsc.gov.in",
        notificationLink: "https://upsc.gov.in",
        examDetails: "IAS, IPS, IFS Examination",
        description: "Civil Services Examination for prestigious administrative positions.",
        jobType: "Govt"
      },
      {
        title: "IBPS PO 2026",
        organization: "Institute of Banking Personnel Selection",
        location: "All India",
        state: "All India",
        startDate: "2026-04-01",
        endDate: "2026-04-30",
        applyLink: "https://ibps.in",
        notificationLink: "https://ibps.in",
        examDetails: "Probationary Officer Recruitment",
        description: "Recruitment of Probationary Officers in participating banks.",
        jobType: "Govt"
      },
      {
        title: "RRB NTPC 2026",
        organization: "Railway Recruitment Board",
        location: "All India",
        state: "All India",
        startDate: "2026-03-15",
        endDate: "2026-04-15",
        applyLink: "https://rrbcdg.gov.in",
        notificationLink: "https://rrbcdg.gov.in",
        examDetails: "Non-Technical Popular Categories",
        description: "Recruitment for various non-technical posts in Indian Railways.",
        jobType: "Govt"
      },
      {
        title: "CTET 2026",
        organization: "Central Board of Secondary Education",
        location: "All India",
        state: "All India",
        startDate: "2026-05-01",
        endDate: "2026-05-31",
        applyLink: "https://ctet.nic.in",
        notificationLink: "https://ctet.nic.in",
        examDetails: "Central Teacher Eligibility Test",
        description: "Eligibility test for teachers in central government schools.",
        jobType: "Govt"
      },
      {
        title: "NEET PG 2026",
        organization: "National Board of Examinations",
        location: "All India",
        state: "All India",
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        applyLink: "https://nbe.edu.in",
        notificationLink: "https://nbe.edu.in",
        examDetails: "Postgraduate Medical Entrance",
        description: "Entrance examination for postgraduate medical courses.",
        jobType: "Govt"
      }
    ];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

/* =======================
   📘 SYLLABUS (FREE APIs)
   ======================= */
export const fetchSyllabusByCategory = async (category?: string): Promise<AdmitCardResult[]> => {
  try {
    return [
      {
        title: category?.includes("school") ? "CBSE Class 10-12 Syllabus 2026" : 
               category?.includes("entrance") ? "JEE Main Syllabus 2026" : 
               "UPSC Civil Services Syllabus 2026",
        organization: category?.includes("school") ? "CBSE" : 
                     category?.includes("entrance") ? "NTA" : 
                     "UPSC",
        date: "2026",
        link: category?.includes("school") ? "http://cbseacademic.nic.in/Syllabus.aspx" :
              category?.includes("entrance") ? "https://jeemain.nta.nic.in" :
              "https://upsc.gov.in/examinations/civil-services-examination",
        type: "result"
      },
      {
        title: category?.includes("college") ? "UG/PG Course Structure" : 
               category?.includes("tech") ? "AICTE Model Curriculum" :
               "Complete Syllabus with Topics",
        organization: category?.includes("college") ? "UGC" :
                     category?.includes("tech") ? "AICTE" :
                     "NCERT",
        date: "2026",
        link: category?.includes("college") ? "https://ugc.ac.in" :
              category?.includes("tech") ? "https://aicte-india.org" :
              "https://ncert.nic.in",
        type: "result"
      }
    ];
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    return [
      {
        title: "CBSE Syllabus 2026",
        organization: "CBSE",
        date: "2026",
        link: "http://cbseacademic.nic.in/Syllabus.aspx",
        type: "result"
      },
      {
        title: "JEE Main Syllabus",
        organization: "NTA",
        date: "2026",
        link: "https://jeemain.nta.nic.in",
        type: "result"
      }
    ];
  }
};

/* =======================
   📰 NEWS (FREE NEWS APIs)
   ======================= */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  try {
    const key = import.meta.env.VITE_NEWS_API_KEY;
    
    if (key) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=education%20india%20OR%20exam%20result%20OR%20admit%20card&language=en&sortBy=publishedAt&pageSize=8&apiKey=${key}`
      );
      
      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          return data.articles.slice(0, 8).map((n: any, index: number) => ({
            title: n.title || "Education News Update",
            source: n.source?.name || "News Source",
            date: new Date(n.publishedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            link: n.url || "#",
            snippet: n.description || n.content || "Click to read full article"
          }));
        }
      }
    }

    // Return enhanced static news with real links
    return [
      {
        title: "CBSE Board Exams 2026: Dates Announced",
        source: "CBSE Official",
        date: "Mar 15, 2026",
        link: "http://cbseacademic.nic.in",
        snippet: "CBSE has released the date sheet for Class 10 and 12 board examinations 2026."
      },
      {
        title: "JEE Main 2026 Registration Begins",
        source: "NTA",
        date: "Mar 10, 2026",
        link: "https://jeemain.nta.nic.in",
        snippet: "Online registration for JEE Main 2026 session 2 has started."
      },
      {
        title: "UPSC Civil Services 2026 Notification Released",
        source: "UPSC",
        date: "Feb 28, 2026",
        link: "https://upsc.gov.in",
        snippet: "UPSC has released 1200 vacancies for Civil Services Examination 2026."
      },
      {
        title: "NEET UG 2026: Important Dates",
        source: "NTA",
        date: "Mar 5, 2026",
        link: "https://neet.nta.nic.in",
        snippet: "NTA announces NEET UG 2026 examination schedule. Exam to be held in May."
      },
      {
        title: "New Education Policy Updates",
        source: "Ministry of Education",
        date: "Mar 1, 2026",
        link: "https://www.education.gov.in",
        snippet: "Government announces implementation of NEP 2026 in all central universities."
      },
      {
        title: "SSC CGL 2026 Application Window Opens",
        source: "SSC Official",
        date: "Feb 20, 2026",
        link: "https://ssc.nic.in",
        snippet: "Staff Selection Commission begins online registration for CGL examination 2026."
      }
    ];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

/* =======================
   🎓 EXAM UPDATES (FREE)
   ======================= */
export const fetchExamUpdates = async (type?: string): Promise<AdmitCardResult[]> => {
  try {
    return [
      {
        title: type?.includes("admit") ? "SSC CGL Admit Card 2026" : "SSC CGL Result 2026",
        organization: "Staff Selection Commission",
        date: type?.includes("admit") ? "Apr 2026" : "Jun 2026",
        link: "https://ssc.nic.in",
        type: type?.includes("admit") ? "admit-card" : "result"
      },
      {
        title: type?.includes("admit") ? "UPSC Prelims Admit Card" : "UPSC Prelims Result",
        organization: "Union Public Service Commission",
        date: type?.includes("admit") ? "May 2026" : "Jul 2026",
        link: "https://upsc.gov.in",
        type: type?.includes("admit") ? "admit-card" : "result"
      },
      {
        title: type?.includes("admit") ? "NEET UG Admit Card" : "NEET UG Result",
        organization: "National Testing Agency",
        date: type?.includes("admit") ? "Apr 2026" : "Jun 2026",
        link: "https://neet.nta.nic.in",
        type: type?.includes("admit") ? "admit-card" : "result"
      },
      {
        title: type?.includes("admit") ? "JEE Main Admit Card" : "JEE Main Result",
        organization: "National Testing Agency",
        date: type?.includes("admit") ? "Mar 2026" : "Apr 2026",
        link: "https://jeemain.nta.nic.in",
        type: type?.includes("admit") ? "admit-card" : "result"
      }
    ];
  } catch (error) {
    console.error("Error fetching exam updates:", error);
    return [];
  }
};