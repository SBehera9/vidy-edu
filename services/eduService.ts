
import { JobNotification, NewsItem, SearchResult, AdmitCardResult, SyllabusSubject } from "../types";
import { GoogleGenAI, Type } from "@google/genai";

const FLASH_MODEL = 'gemini-3-flash-preview';

/**
 * PRO-TIP: We initialize a new instance for every call to ensure 
 * Vercel's latest environment variables are picked up correctly.
 */
const getAI = () => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("Vidy Diagnostic: API_KEY environment variable is missing!");
  }
  return new GoogleGenAI({ apiKey: key || '' });
};

/**
 * ULTRA-RESILIENT JSON EXTRACTOR
 * This function hunts for the FIRST array '[' and LAST array ']' in the AI's response.
 * This effectively ignores "Based on my search..." text and citations at the bottom.
 */
const extractDataArray = (response: any) => {
  try {
    const text = response.text || "";
    if (!text) return [];

    // Find the bounds of the JSON array
    const startIdx = text.indexOf('[');
    const endIdx = text.lastIndexOf(']');

    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const jsonString = text.substring(startIdx, endIdx + 1);
      return JSON.parse(jsonString);
    }
    
    // Fallback: Try a direct parse
    return JSON.parse(text);
  } catch (e) {
    console.warn("Vidy Data Sync: Parsing conversational response failed. Returning empty list.");
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
      contents: `Search for professional academic info regarding: "${query}" in India. 
      Provide a deep-dive report in Markdown. Mention official websites and verified facts.`,
      config: { 
        tools: [{ googleSearch: {} }] 
      }
    });

    const text = response.text || "No specific data retrieved from national databases.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Verified Reference',
        uri: chunk.web?.uri || '#'
      }))
      .filter((s: any) => s.uri !== '#') || [];

    return { text, sources };
  } catch (err) {
    console.error("Vidy Research Error:", err);
    return { text: "Connection to Vidy Research Hub timed out. Please verify your API Key and internet connection.", sources: [] };
  }
};

/**
 * JOB BOARD: Vacancy Sync (Live Web)
 */
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  const ai = getAI();
  const today = new Date().toLocaleDateString('en-IN');
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search the web for LATEST official government job openings in India active today (${today}). 
      Target UPSC, SSC, Banking, Railways, and State PSCs. 
      Return ONLY a JSON array of objects with keys: title, organization, location, state, startDate, endDate, applyLink, description.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const data = extractDataArray(response);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Job Sync Failed:", err);
    return [];
  }
};

/**
 * SYLLABUS: Registry Fetcher (Live Web)
 */
export const fetchSyllabusByCategory = async (category: string): Promise<AdmitCardResult[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for official curriculum or syllabus links for: "${category}" in India. 
      Target CBSE, NCERT, or major Universities. 
      Return ONLY a JSON array of objects: title, organization, date, link.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const data = extractDataArray(response);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Syllabus Sync Failed:", err);
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
      ? `Find recently released official Admit Cards for Indian Govt Exams as of ${today}.`
      : `Find official Exam Results declared in India as of ${today}.`;

    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: query + " Return ONLY a JSON array of objects: title, organization, date, link.",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const data = extractDataArray(response);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
};

/**
 * NEWS: Academic Gazette (Live Web)
 */
export const fetchEducationalNews = async (): Promise<NewsItem[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Search for today's top educational news, scholarship alerts, and exam changes in India. 
      Return ONLY a JSON array of objects: title, source, date, link, snippet.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const data = extractDataArray(response);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
};

/**
 * SYLLABUS BUILDER: Structure Generator
 */
export const fetchSyllabusSubjects = async (course: string, branch: string, year: string): Promise<SyllabusSubject[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: `Provide 8 subjects for ${course} (${branch}) - Year ${year}. Return ONLY JSON array: [{name, description}].`,
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
    return extractDataArray(response);
  } catch (err) { return []; }
};
