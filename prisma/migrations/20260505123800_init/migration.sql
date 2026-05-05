-- AlterTable
ALTER TABLE "user" ADD COLUMN     "githubInstallationId" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;
