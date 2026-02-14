/// <reference types="vite/client" />
import jobs from "../data/jobs.json";
import syllabus from "../data/syllabus.json";
import {
  JobNotification,
  NewsItem,
  SearchResult,
  AdmitCardResult
} from "../types";

/* =======================
   🔍 SEARCH (WIKIPEDIA)
======================= */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      return { text: "No information found.", sources: [] };
    }

    const data = await res.json();

    return {
      text: `## ${data.title}\n\n${data.extract}`,
      sources: [
        {
          title: "Wikipedia",
          uri: data.content_urls?.desktop?.page || "#"
        }
      ]
    };
  } catch {
    return { text: "Search service unavailable.", sources: [] };
  }
};

/* =======================
   🧾 JOBS (STATIC JSON)
======================= */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  return jobs as JobNotification[];
};

/* =======================
   📘 SYLLABUS (STATIC)
======================= */
export const fetchSyllabusByCategory = async (): Promise<AdmitCardResult[]> => {
  return syllabus.map((s: any) => ({
    title: s.title,
    organization: s.organization,
    date: "",
    link: s.link,
    type: "result"
  }));
};

/* =======================
   📰 NEWS (NEWSAPI)
======================= */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  const key = import.meta.env.VITE_NEWS_API_KEY;
  if (!key) return [];

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=education%20india&language=en&apiKey=${key}`
    );
    const data = await res.json();

    return (data.articles || []).slice(0, 5).map((n: any) => ({
      title: n.title,
      source: n.source.name,
      date: n.publishedAt,
      link: n.url,
      snippet: n.description
    }));
  } catch {
    return [];
  }
};

/* =======================
   🎓 EXAM UPDATES (STATIC)
======================= */
export const fetchExamUpdates = async (): Promise<AdmitCardResult[]> => {
  return [
    {
      title: "SSC CGL Admit Card",
      organization: "SSC",
      date: "2026-05-01",
      link: "https://ssc.nic.in",
      type: "admit-card"
    }
  ];
};
