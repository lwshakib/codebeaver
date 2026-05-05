import { z } from "zod";

/**
 * Environment variables schema for type-safety.
 */
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  
  // Auth
  BETTER_AUTH_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  
  // Email
  RESEND_API_KEY: z.string().min(1),

  // Pinecone
  PINECONE_API_KEY: z.string().min(1).optional(),
  PINECONE_INDEX: z.string().min(1).optional(),
  
  // AI (Cloudflare Workers)
  GLM_WORKER_URL: z.string().url().optional(),
  CLOUDFLARE_API_KEY: z.string().min(1).optional(),
  GOOGLE_API_KEY: z.string().min(1).optional(),

  // GitHub App
  GITHUB_APP_ID: z.string().min(1).optional(),
  GITHUB_APP_PRIVATE_KEY: z.string().min(1).optional(),
  GITHUB_APP_WEBHOOK_SECRET: z.string().min(1).optional(),
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  console.error("❌ Invalid environment variables:", envResult.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = envResult.data;
