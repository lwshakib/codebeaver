import { betterAuth, type User, type Session } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { resend } from "./resend";
import { AuthEmailTemplate } from "@/components/emails/auth-email-template";

import { env } from "./env";

/**
 * Server-side Better Auth configuration.
 * Configured for GitHub social authentication and sign-in notifications via Resend.
 */
export const auth = betterAuth({
  /**
   * Database adapter for Prisma.
   */
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  /**
   * Social Authentication Providers.
   */
  socialProviders: {
    github: {
      enabled: true,
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },


  /**
   * Automated email triggers using Better Auth events.
   */
  events: {
    /**
     * Send a welcome email when a new user is created via social login.
     */
    user: {
      created: async ({ user }: { user: User }) => {
        if (user.email) {
          try {
            await resend.emails.send({
              from: "PulseGrid <welcome@lwshakib.site>",
              to: user.email,
              subject: "Welcome to PulseGrid!",
              react: AuthEmailTemplate({
                type: "welcome",
                name: user.name || undefined,
              }),
            });
          } catch (err) {
            console.error("Failed to send welcome email:", err);
          }
        }
      },
    },
    /**
     * Send a sign-in notification email when a user logs in.
     */
    session: {
      created: async ({ user, session }: { user: User; session: Session }) => {
        if (user.email) {
          try {
            await resend.emails.send({
              from: "PulseGrid Security <security@lwshakib.site>",
              to: user.email,
              subject: "New sign-in to PulseGrid",
              react: AuthEmailTemplate({
                type: "sign-in-notification",
                name: user.name || undefined,
                device: session.userAgent || "Unknown Device",
                ip: session.ipAddress || "Unknown IP",
              }),
            });
          } catch (err) {
            console.error("Failed to send sign-in notification:", err);
          }
        }
      },
    },
  },
});
