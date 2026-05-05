import { Resend } from "resend";
import { env } from "./env";

/**
 * Singleton instance of the Resend client.
 */
export const resend = new Resend(env.RESEND_API_KEY);
