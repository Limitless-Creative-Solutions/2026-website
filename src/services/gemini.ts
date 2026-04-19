import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateWebsiteIdea(industry: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a futuristic, high-converting website concept for a creative agency client in the ${industry} industry. 
      Include:
      1. A catchy 2026-style tagline.
      2. 3 core unique features.
      3. A technical stack recommendation.
      Format the output nicely.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating idea. Please try again.";
  }
}

export async function generateBrandName(keywords: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 futuristic, short, and punchy brand names for a startup based on these keywords: ${keywords}. 
      Return only the names separated by commas.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Limitless, Future, Nexus, Core, Prime";
  }
}
