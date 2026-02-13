
import { JobNotification, NewsItem, SearchResult, AdmitCardResult, SyllabusSubject } from "../types";
import { GoogleGenAI, Type } from "@google/genai";

const FLASH_MODEL = 'gemini-3-flash-preview';

/**
 * Robust AI client initialization.
 */
const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * RESEARCH LAB: Omni-Search
 */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Perform a detailed internet search for: "${query}". 
      Focus on academic accuracy and provide a professional report.`,
      config: { tools: [{ googleSearch: {} }] }
    });

    const text = response.text || "No results found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Ref',
        uri: chunk.web?.uri || '#'
      }))
      .filter((s: any) => s.uri !== '#') || [];

    return { text, sources };
  } catch (err) {
    return { text: "Web sync failed. Please try again.", sources: [] };
  }
};

/**
 * JOB BOARD: Automatic Vacancy Fetcher
 */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  const ai = getAI();
  const today = new Date().toLocaleDateString('en-IN');
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for official government job vacancies in India released near ${today}. 
      Prioritize links from .gov.in and .nic.in domains. Return a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              organization: { type: Type.STRING },
              location: { type: Type.STRING },
              state: { type: Type.STRING },
              startDate: { type: Type.STRING },
              endDate: { type: Type.STRING },
              applyLink: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "organization", "state", "applyLink"]
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (err) {
    console.error("Job fetch failed:", err);
    return [];
  }
};

/**
 * SYLLABUS: Precise Category Fetcher focus on Official links
 */
export const fetchSyllabusByCategory = async (category: string): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Find OFFICIAL curriculum PDF links for: "${category}" in India. 
      ONLY include official boards (CBSE, ICSE, NCERT) or University portals (.edu.in, .ac.in, .gov.in).
      Return a JSON array of objects with title, organization, date, and link.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              organization: { type: Type.STRING },
              date: { type: Type.STRING },
              link: { type: Type.STRING }
            },
            required: ["title", "organization", "link"]
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (err) {
    console.error("Syllabus fetch failed:", err);
    return [];
  }
};

/**
 * EXAM UPDATES: Admit Cards & Results
 */
export const fetchExamUpdates = async (type: 'admit-card' | 'result'): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  const today = new Date().toLocaleDateString('en-IN');
  try {
    const query = type === 'admit-card' 
      ? `Search for recently released official Admit Cards for Govt Exams in India as of ${today}.`
      : `Search for recently declared official Exam Results in India as of ${today}.`;

    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: query + " Return JSON array: title, organization, date, link.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              organization: { type: Type.STRING },
              date: { type: Type.STRING },
              link: { type: Type.STRING }
            }
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (err) {
    return [];
  }
};

/**
 * NEWS: Real-Time Academic Feed
 */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for top educational headlines and scholarship alerts in India today. Return a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              source: { type: Type.STRING },
              date: { type: Type.STRING },
              link: { type: Type.STRING },
              snippet: { type: Type.STRING }
            }
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (err) {
    return [];
  }
};

/**
 * Dynamic Curriculum Builder
 */
export const fetchSyllabusSubjects = async (course: string, branch: string, year: string): Promise<SyllabusSubject[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Provide a standard list of 8 subjects for ${course} (${branch}) - Year ${year}. Return JSON [{name, description}].`,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (err) { return []; }
};
