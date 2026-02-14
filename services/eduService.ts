/// <reference types="vite/client" />
import {
  JobNotification,
  NewsItem,
  SearchResult,
  AdmitCardResult
} from "../types";
import { GoogleGenAI, Type } from "@google/genai";

const FLASH_MODEL = "gemini-3-flash-preview";

/**
 * ✅ VITE + VERCEL SAFE AI INITIALIZER
 */
const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    console.error("❌ Gemini API key missing or invalid");
    return null;
  }

  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error("❌ Gemini init failed:", err);
    return null;
  }
};

/**
 * 🔍 ACADEMIC SEARCH
 */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  const ai = getAI();
  if (!ai) {
    return {
      text: "### Configuration Error\nAI service not configured.",
      sources: []
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Provide a detailed academic explanation for "${query}" using official Indian sources.`,
      config: { tools: [{ googleSearch: {} }] }
    });

    const text = response.text || "No result generated.";
    const sources =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => ({
          title: chunk.web?.title || "Official Source",
          uri: chunk.web?.uri || "#"
        }))
        .filter((s: any) => s.uri !== "#") || [];

    return { text, sources };
  } catch (err) {
    console.error("Search error:", err);
    return {
      text: "### Error\nSearch service unavailable.",
      sources: []
    };
  }
};

/**
 * 📘 SYLLABUS FETCH
 */
export const fetchSyllabusByCategory = async (
  category: string
): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Official syllabus links for "${category}" exams in India.`,
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

    return JSON.parse(response.text || "[]");
  } catch (err) {
    console.error("Syllabus error:", err);
    return [];
  }
};

/**
 * 🧾 JOB NOTIFICATIONS
 */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: "Active official government job vacancies in India.",
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

    return JSON.parse(response.text || "[]");
  } catch (err) {
    console.error("Job fetch error:", err);
    return [];
  }
};

/**
 * 📰 EDUCATION NEWS
 */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  const ai = getAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: "Top educational news in India today.",
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

    return JSON.parse(response.text || "[]");
  } catch (err) {
    console.error("News error:", err);
    return [];
  }
};

/**
 * 🎓 EXAM UPDATES (FIXES YOUR CRASH)
 */
export const fetchExamUpdates = async (
  type: "admit-card" | "result"
): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  if (!ai) return [];

  const query =
    type === "admit-card"
      ? "Recently released admit cards for Indian exams."
      : "Recently declared exam results in India.";

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

    return JSON.parse(response.text || "[]");
  } catch (err) {
    console.error("Exam update error:", err);
    return [];
  }
};
