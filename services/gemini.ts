import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGhostStory = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Schrijf een heel kort, angstaanjagend verhaal (maximaal 100 woorden) over een vervloekte treinwagon in het Nederlands. Focus op sfeer en duisternis.",
      config: {
        temperature: 1.2, // High creativity for horror
        topP: 0.95,
      }
    });
    return response.text || "De geesten zwijgen vandaag...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Er is een storing in de spirituele verbinding... probeer het later opnieuw.";
  }
};