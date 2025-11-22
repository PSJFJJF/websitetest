import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the client
// The API key is available in process.env.API_KEY by default in this environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStrategyAdvice = async (
  userMessage: string, 
  history: ChatMessage[]
): Promise<{ text: string; groundingUrls: string[] }> => {
  
  try {
    // Convert internal history to Gemini format if needed, or just send current context
    // For this simple implementation, we will just send the user message with a system prompt context
    // In a real app, we would manage the full chat history with ai.chats.create

    const modelId = "gemini-2.5-flash"; 
    
    const systemInstruction = `
      You are the "Donut SMP Tycoon Master". Your goal is to help players make money on the Minecraft server "Donut SMP".
      
      Context about Donut SMP:
      - It is a Hardcore/Lifesteal style server or standard SMP depending on the season.
      - Economy is usually driven by Spawners (Iron Golem, Blaze), Farming (Cactus, Cane), and PVP.
      - "AFK"ing is a common strategy.
      
      Your style:
      - Concise, gamer-speak (use terms like "meta", "buffed", "nerfed", "AFK", "grind").
      - Helpful and numeric where possible.
      
      Tools:
      - Use Google Search to find the ABSOLUTE LATEST methods, as server economies change every season (wipes).
      - If a user asks about "glitches" or "dupes", warn them that it's bannable but explain legitimate high-yield alternatives.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }], // Enable search grounding to get latest server meta
      },
    });

    const text = response.text || "I couldn't find specific info on that right now. Try checking the /economy menu in-game.";
    
    // Extract grounding URLs if they exist
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const urls: string[] = [];
    
    groundingChunks.forEach((chunk) => {
      if (chunk.web?.uri) {
        urls.push(chunk.web.uri);
      }
    });

    return { text, groundingUrls: urls };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "Network connection error. Please ensure you are connected to the internet and try again.",
      groundingUrls: []
    };
  }
};
