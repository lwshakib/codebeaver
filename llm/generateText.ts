import { genAI } from "./client";
import { CHAT_MODEL_ID } from "./constants";

export async function generateText({
  systemInstruction,
  messages,
  temperature = 1.0,
}: {
  systemInstruction?: string;
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
    const chat = genAI.chats.create({
      model: CHAT_MODEL_ID,
      history,
      config: {
        systemInstruction,
        temperature,
      },
    });

    const response = await chat.sendMessage({
      message: lastMessage.parts[0].text,
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    return {
      text,
      raw: response,
    };
  } catch (error: any) {
    console.error("[Gemini generateText Error]:", error);
    throw error;
  }
}
