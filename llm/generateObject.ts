import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { genAI } from "./client";
import { CHAT_MODEL_ID } from "./constants";

export async function generateObject<T>({
  systemInstruction,
  outputSchema,
  rawSchema,
  messages,
  temperature = 1.0,
}: {
  systemInstruction?: string;
  outputSchema?: z.Schema<T>;
  rawSchema?: any;
  messages: { role: "user" | "model"; parts: { text: string }[] }[];
  temperature?: number;
}) {
  if (messages.length === 0) {
    throw new Error("No messages provided.");
  }

  // The last message is the one we "send", everything before is history
  const lastMessage = messages[messages.length - 1];
  const history = messages.slice(0, -1);

  try {
    const model = genAI.getGenerativeModel({
      model: CHAT_MODEL_ID,
      systemInstruction,
    });

    const generationConfig = {
      temperature,
      responseMimeType: "application/json",
      responseJsonSchema: rawSchema || (outputSchema ? zodToJsonSchema(outputSchema as any) : undefined),
    };

    const result = await model.generateContent({
      contents: messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: m.parts,
      })),
      generationConfig,
    });

    const response = result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    try {
      const parsedObject = JSON.parse(text) as T;
      return {
        object: parsedObject,
        raw: response,
      };
    } catch (parseError) {
      console.error("[JSON Parse Error] Raw text:", text);
      throw parseError;
    }
  } catch (error: any) {
    console.error("[Gemini generateObject Error]:", error);
    throw error;
  }
}
