
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
 * UTILITY: Extract JSON from a string that might contain markdown, text, or citations.
 * This is crucial when using Google Search grounding as response.text is conversational.
 */
const extractJson = (text: string) => {
  if (!text) return [];
  try {
    // 1. Try to find content between ```json and ```
    const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      return JSON.parse(codeBlockMatch[1].trim());
    }

    // 2. Try to find content between any ``` and ```
    const genericBlockMatch = text.match(/```\s*([\s\S]*?)\s*```/);
    if (genericBlockMatch && genericBlockMatch[1]) {
      // Basic check if it looks like JSON
      const content = genericBlockMatch[1].trim();
      if (content.startsWith('[') || content.startsWith('{')) {
        return JSON.parse(content);
      }
    }

    // 3. Last resort: find the first '[' and last ']' and parse that slice
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(text.substring(start, end + 1));
    }

    // 4. Try parsing the whole thing if it's clean
    return JSON.parse(text);
  } catch (e) {
    console.warn("JSON Extraction from text failed. Raw text:", text);
    return [];
  }
};

/**
 * RESEARCH LAB: Omni-Search (Live Web)
 */
export const academicSearch = async (query: string): Promise<SearchResult> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Perform a detailed internet search for: "${query}". 
      Focus on academic accuracy and provide a professional report for an Indian student.`,
      config: { tools: [{ googleSearch: {} }] }
    });

    const text = response.text || "No results found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || '#'
      }))
      .filter((s: any) => s.uri !== '#') || [];

    return { text, sources };
  } catch (err) {
    return { text: "Web sync failed. Please check your connection and try again.", sources: [] };
  }
};

/**
 * JOB BOARD: Automatic Vacancy Fetcher (Live Web)
 */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  const ai = getAI();
  const today = new Date().toLocaleDateString('en-IN');
  try {
    // Note: Removed responseMimeType to avoid conflict with Search Grounding
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search the live web for official government job vacancies in India active on ${today}. 
      Target UPSC, SSC, Railway, and State PSCs. 
      Return the results ONLY as a JSON array of objects with these keys: 
      title, organization, location, state, startDate, endDate, applyLink (official .gov.in or .nic.in link), description.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return extractJson(response.text);
  } catch (err) {
    console.error("Job fetch error:", err);
    return [];
  }
};

/**
 * SYLLABUS: Precise Category Fetcher (Live Web)
 */
export const fetchSyllabusByCategory = async (category: string): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for the latest OFFICIAL curriculum PDF links for: "${category}" in India. 
      Target CBSE, ICSE, NCERT or verified University portals. 
      Return the results ONLY as a JSON array of objects: title, organization, date, link.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return extractJson(response.text);
  } catch (err) {
    console.error("Syllabus fetch error:", err);
    return [];
  }
};

/**
 * EXAM UPDATES: Admit Cards & Results (Live Web)
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
      contents: query + " Return the data ONLY as a JSON array of objects: title, organization, date, link.",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return extractJson(response.text);
  } catch (err) {
    return [];
  }
};

/**
 * NEWS: Real-Time Academic Feed (Live Web)
 */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for today's top educational news, scholarship alerts, and exam policy changes in India. 
      Return ONLY a JSON array of objects: title, source, date, link, snippet.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return extractJson(response.text);
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
      contents: `Provide a standard list of 8 subjects for ${course} (${branch}) - Year ${year}. Return as JSON array: [{name, description}].`,
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
    return extractJson(response.text);
  } catch (err) { return []; }
};
