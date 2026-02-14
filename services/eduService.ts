
import { JobNotification, NewsItem, SearchResult, AdmitCardResult, SyllabusSubject } from "../types";
import { GoogleGenAI, Type } from "@google/genai";

const FLASH_MODEL = 'gemini-3-flash-preview';

/**
 * Robust AI Initializer
 * Specifically designed to detect if Vercel has injected the API_KEY correctly.
 */
const getAI = () => {
  // Access the key. 
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    console.error("CRITICAL: API_KEY is missing or invalid in the current environment.");
    return null;
  }
  
  try {
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
    return null;
  }
};

/**
 * RESEARCH LAB: Omni-Search
 */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  const ai = getAI();
  if (!ai) return { text: "### Connection Error\nYour API_KEY is not configured in Vercel. Please add it to Environment Variables and redeploy.", sources: [] };

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Provide a detailed academic report for: "${query}". Focus on official Indian sources. Use Markdown.`,
      config: { tools: [{ googleSearch: {} }] }
    });

    const text = response.text || "No response from research server.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Verified Source',
        uri: chunk.web?.uri || '#'
      }))
      .filter((s: any) => s.uri !== '#') || [];

    return { text, sources };
  } catch (err: any) {
    return { text: `### Error\n${err.message || 'The search service is currently unavailable.'}`, sources: [] };
  }
};

/**
 * SYLLABUS: Registry Fetcher
 */
export const fetchSyllabusByCategory = async (category: string): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `List 8 official syllabus links for "${category}" in India.`,
      config: {
        tools: [{ googleSearch: {} }],
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
            required: ["title", "link"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (err) {
    console.error("Syllabus Error:", err);
    return [];
  }
};

/**
 * JOB BOARD: Vacancy Sync
 */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  const ai = getAI();
  if (!ai) return [];

  const today = new Date().toLocaleDateString('en-IN');
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for active official government job vacancies in India as of ${today}.`,
      config: {
        tools: [{ googleSearch: {} }],
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
            required: ["title", "organization", "applyLink"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (err) {
    console.error("Job Sync Error:", err);
    return [];
  }
};

/**
 * EXAM UPDATES: Admit Cards & Results
 */
export const fetchExamUpdates = async (type: 'admit-card' | 'result'): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  if (!ai) return [];

  const query = type === 'admit-card' 
    ? "Search for recently released official Admit Cards for Indian National Exams."
    : "Search for official Exam Results declared recently in India.";

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
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
            required: ["title", "link"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (err) {
    return [];
  }
};

/**
 * NEWS: Academic Feed
 */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: "Top 5 educational news headlines in India for today.",
      config: {
        tools: [{ googleSearch: {} }],
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
            },
            required: ["title", "link"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (err) {
    return [];
  }
};
