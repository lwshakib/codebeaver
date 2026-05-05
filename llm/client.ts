import { GoogleGenAI } from "@google/genai";
import { env } from "@/lib/env";

if (!env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}

export const genAI = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });
