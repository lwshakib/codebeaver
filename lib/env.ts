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
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  console.error("❌ Invalid environment variables:", envResult.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = envResult.data;
