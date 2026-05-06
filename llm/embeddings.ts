import { genAI } from './client';
import { EMBEDDING_MODEL_ID } from './constants';

/**
 * Internal helper to call the Gemini Embedding API.
 * Applies task-specific prefixing as required by the Embeddings 2 model.
 */
async function embed(text: string, type: "query" | "document"): Promise<number[]> {
  try {
    // gemini-embedding-2 requires task-specific prefixes for optimal performance
    const formattedText = type === "query"
      ? `task: search result | query: ${text}`
      : `title: none | text: ${text}`;

    const response = await genAI.models.embedContent({
      model: EMBEDDING_MODEL_ID,
      contents: formattedText,
    });

    if (!response.embeddings || response.embeddings.length === 0 || !response.embeddings[0].values) {
      throw new Error('No embeddings returned from Gemini API');
    }

    // Gemini Embedding 2 returns a single aggregated embedding for the input
    return response.embeddings[0].values;
  } catch (error) {
    console.error(`[Gemini Embedding Error] for ${type}:`, error);
    throw error;
  }
}

/**
 * Generates an embedding for a string (query or document).
 * Uses the appropriate prefix as recommended for asymmetric retrieval.
 *
 * @param text - The string to embed.
 * @param type - The type of embedding (query or document).
 * @returns A promise resolving to the coordinate array.
 */
export const generateEmbeddings = async (text: string, type: "query" | "document" = "query"): Promise<number[]> => {
  return await embed(text, type);
};
