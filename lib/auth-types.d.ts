import "better-auth";

declare module "better-auth" {
  interface User {
    email: string;
    name: string;
    image?: string | null;
    onboardingCompleted: boolean;
    githubInstallationId?: string | null;
  }
}
