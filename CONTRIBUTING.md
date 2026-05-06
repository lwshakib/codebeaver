# Contributing to CodeBeaver

First off, thank you for considering contributing to CodeBeaver! 🎉 It's people like you that make CodeBeaver such a great tool.

We welcome contributions from everyone. This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Fork the Repository](#fork-the-repository)
  - [Clone Your Fork](#clone-your-fork)
  - [Set Up Your Development Environment](#set-up-your-development-environment)
  - [Create a Branch](#create-a-branch)
- [Making Changes](#making-changes)
- [Running Tests & Quality Checks](#running-tests--quality-checks)
- [Committing Your Changes](#committing-your-changes)
- [Pushing Your Changes](#pushing-your-changes)
- [Creating a Pull Request](#creating-a-pull-request)
- [Code Style Guidelines](#code-style-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Questions & Discussions](#questions--discussions)

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Fork the Repository

1. Go to the [CodeBeaver repository](https://github.com/lwshakib/codebeaver)
2. Click the **Fork** button in the top-right corner
3. This creates a personal copy of the repository under your GitHub account

### Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/codebeaver.git

# Navigate to the project directory
cd codebeaver

# Add the original repository as an upstream remote
git remote add upstream https://github.com/lwshakib/codebeaver.git

# Verify the remotes
git remote -v
# Output should show:
# origin    https://github.com/YOUR_USERNAME/codebeaver.git (fetch)
# origin    https://github.com/YOUR_USERNAME/codebeaver.git (push)
# upstream  https://github.com/lwshakib/codebeaver.git (fetch)
# upstream  https://github.com/lwshakib/codebeaver.git (push)
```

### Set Up Your Development Environment

#### 1. Install Dependencies

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install project dependencies
pnpm install
```

#### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and fill in your credentials
# See README.md for detailed environment setup instructions
nano .env  # or use your preferred editor
```

**Key environment variables needed for development:**

- `DATABASE_URL` - PostgreSQL connection string (use a local dev database or Neon)
- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - Create a GitHub OAuth App
- `GITHUB_APP_*` - Create a GitHub App (see README for details)
- `GOOGLE_API_KEY` - From Google AI Studio
- `PINECONE_API_KEY` & `PINECONE_INDEX` - From Pinecone dashboard
- `RESEND_API_KEY` - From Resend dashboard
- `AWS_*` - From AWS S3 or Cloudflare R2

#### 3. Set Up Database

```bash
# Run Prisma migrations
pnpm run db:migrate

# (Optional) Seed the database with test data
pnpm run db:seed

# View database in Prisma Studio
pnpm run db:studio
```

#### 4. Start Development Server

```bash
# Start the Next.js dev server
pnpm run dev

# The app will be available at http://localhost:3000
```

### Create a Branch

Always create a feature branch for your changes. Do not work directly on `main` or `develop`.

```bash
# Update your local main branch
git fetch upstream
git rebase upstream/main

# Create a feature branch from main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/your-bug-description

# Or for documentation
git checkout -b docs/your-documentation-change

# Or for improvements
git checkout -b improve/your-improvement-description
```

**Branch naming conventions:**

- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `docs/*` - Documentation updates
- `improve/*` - Performance or code quality improvements
- `refactor/*` - Code refactoring
- `chore/*` - Maintenance tasks

## Making Changes

### Code Organization

- **Frontend Components**: Modify files in `components/` and `app/`
- **Backend Logic**: Modify files in `lib/`, `inngest/`, or `app/api/`
- **LLM Integration**: Modify files in `llm/`
- **Database**: Modify `prisma/schema.prisma` for schema changes

### Important Files to Know

- `package.json` - Dependencies and scripts
- `prisma/schema.prisma` - Database schema
- `lib/env.ts` - Environment variable validation
- `app/api/` - All API routes
- `inngest/functions.ts` - Event handlers
- `llm/prompts.ts` - LLM prompt templates

### Development Tips

1. **Use TypeScript** - Maintain type safety throughout
2. **Check the database schema** - Understand data models before making changes
3. **Follow the existing patterns** - Look at similar files for style/structure
4. **Test your changes locally** - Always run the dev server and test manually
5. **Read related code** - Understand the context of what you're changing

## Running Tests & Quality Checks

### ESLint (Code Quality)

```bash
# Run ESLint to check for issues
pnpm run lint

# Automatically fix fixable issues
pnpm run lint:fix
```

### Manual Testing

```bash
# Start dev server
pnpm run dev

# Open http://localhost:3000 in your browser
# Test your changes thoroughly

# For API routes, use tools like:
# - curl
# - Postman
# - REST Client extension in VS Code
# - Thunder Client
```

### Database Testing

```bash
# View your database changes
pnpm run db:studio

# Reset database if needed (WARNING: destroys all data)
pnpm run db:reset
```

## Committing Your Changes

### Commit Message Guidelines

Write clear, descriptive commit messages. Follow these conventions:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring without feature changes
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, tooling

**Examples:**

```bash
# Feature
git commit -m "feat(auth): add GitHub OAuth integration"

# Bug fix
git commit -m "fix(api): handle null values in PR review endpoint"

# Documentation
git commit -m "docs(readme): add environment setup instructions"

# With body and footer
git commit -m "refactor(llm): improve embedding generation

- Optimize vector dimensions
- Add caching for embeddings
- Reduce API calls by 30%

Fixes #123"
```

### Make Atomic Commits

- One logical change per commit
- Smaller commits are easier to review
- Easier to revert if needed

```bash
# Stage changes selectively
git add path/to/specific/file.ts

# Or use interactive staging
git add -p
```

## Pushing Your Changes

```bash
# Push your feature branch to your fork
git push origin feature/your-feature-name

# If you need to update your branch with upstream changes
git fetch upstream
git rebase upstream/main
git push origin feature/your-feature-name --force-with-lease
```

**Note:** Always use `--force-with-lease` instead of `--force` to prevent accidentally overwriting others' work.

## Creating a Pull Request

### Before Submitting

1. **Sync with upstream** to ensure you have the latest changes

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run quality checks**

   ```bash
   pnpm run lint
   pnpm run lint:fix
   ```

3. **Test thoroughly** - Run the dev server and manually test your changes

4. **Check for conflicts** - Ensure your changes don't conflict with main

### Submitting Your PR

1. Go to your fork on GitHub
2. Click **"New Pull Request"** button
3. Set:
   - **Base repository**: `lwshakib/codebeaver`
   - **Base branch**: `main`
   - **Head repository**: `YOUR_USERNAME/codebeaver`
   - **Head branch**: `feature/your-feature-name`
4. Fill in the PR template:

```markdown
## Description

Brief description of your changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Related Issues

Fixes #123
Related to #456

## Changes Made

- Detailed change 1
- Detailed change 2
- Detailed change 3

## Testing Done

Describe how you tested these changes

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] My code follows the style guidelines
- [ ] I have self-reviewed my code
- [ ] I have commented my code, particularly in complex areas
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes locally
- [ ] I have updated CHANGELOG.md if applicable
```

### PR Review Process

1. A maintainer will review your PR
2. Changes may be requested - respond constructively
3. Once approved, your PR will be merged
4. Your feature branch will be deleted

## Code Style Guidelines

### TypeScript

- Use **strict mode** in `tsconfig.json`
- Prefer **explicit types** over `any`
- Use **interfaces** for object types
- Add **JSDoc comments** for public functions

```typescript
/**
 * Generates an AI-powered PR review
 * @param prDiff - The PR diff content
 * @param codeContext - Related code context from vector search
 * @returns Promise resolving to the review text
 */
export async function generateReview(
  prDiff: string,
  codeContext: string
): Promise<string> {
  // Implementation
}
```

### Naming Conventions

- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase`
- **Types/Interfaces**: `PascalCase`
- **Files/Folders**: `kebab-case` (for directories) or `camelCase` (for components)
- **React Components**: `PascalCase` file names

### File Organization

```typescript
// 1. Imports
import { useState } from 'react';
import { api } from '@/lib/api';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component/Function
export function MyComponent({ title }: ComponentProps) {
  // Implementation
}

// 4. Exports
export default MyComponent;
```

### API Routes

```typescript
// pages/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    // Processing
    // Response

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Components

```typescript
// components/my-component.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * MyComponent description
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('base-class', className)}>
      {children}
    </div>
  );
};
```

## Reporting Bugs

Found a bug? Please report it! Here's how:

### Before Reporting

1. **Search existing issues** - The bug might already be reported
2. **Check documentation** - It might be expected behavior

### Reporting Steps

1. Go to [Issues](https://github.com/lwshakib/codebeaver/issues)
2. Click **"New Issue"** → **"Bug Report"**
3. Fill in the template:

```markdown
## Description

Brief description of the bug

## Steps to Reproduce

1. Step 1
2. Step 2
3. Step 3

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g., Windows 10, macOS, Linux]
- Node.js version: [e.g., 18.0.0]
- Browser: [e.g., Chrome 120]

## Screenshots

If applicable, add screenshots

## Additional Context

Any other context about the problem
```

## Feature Requests

Have a great idea? We'd love to hear it!

### Submitting a Feature Request

1. Go to [Issues](https://github.com/lwshakib/codebeaver/issues)
2. Click **"New Issue"** → **"Feature Request"**
3. Describe your idea:

```markdown
## Description

Clear description of the feature

## Use Case

Why do you need this feature?

## Proposed Solution

How should it work?

## Alternatives

Other possible approaches

## Additional Context

Any other information
```

## Questions & Discussions

- **Questions**: Use [GitHub Discussions](https://github.com/lwshakib/codebeaver/discussions)
- **Chat**: Join our Discord server (if available)
- **Email**: support@codebeaver.dev

## Developer Resources

### Useful Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run linter
pnpm run lint
pnpm run lint:fix

# Database commands
pnpm run db:migrate      # Run migrations
pnpm run db:studio       # Open Prisma Studio
pnpm run db:seed         # Seed database
pnpm run db:reset        # Reset database (WARNING: destructive)
pnpm run db:generate     # Generate Prisma client

# Build for production
pnpm run build
pnpm run start

# Type checking
pnpm run type-check
```

### Key Project Structure

```
codebeaver/
├── app/                 # Next.js routes and pages
├── components/          # React components
├── lib/                 # Utilities and helpers
├── inngest/             # Event workflows
├── llm/                 # AI/LLM integrations
├── prisma/              # Database schema
└── public/              # Static files
```

### Documentation to Read

- [README.md](README.md) - Project overview and setup
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community guidelines
- [Prisma Docs](https://www.prisma.io/docs/) - ORM documentation
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [TypeScript Docs](https://www.typescriptlang.org/docs/) - Language reference

## Getting Help

Stuck? Here's where to find help:

1. **Search GitHub Issues** - Check if someone had the same problem
2. **Read Documentation** - Check project and library docs
3. **Ask in Discussions** - Use GitHub Discussions for questions
4. **Comment on Issues** - Ask maintainers directly on related issues

## Recognition

Contributors will be recognized in:

- Git history
- GitHub contributors page
- CHANGELOG.md (for significant contributions)
- Project README (for major contributors)

## License

By contributing to CodeBeaver, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Thank you for contributing to CodeBeaver! We appreciate your time and effort.** 🙏

Questions? Feel free to open an issue or start a discussion!
