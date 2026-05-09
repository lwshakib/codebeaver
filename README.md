<img src="./public/logo.png" alt="CodeBeaver Logo" width="120" height="120">

# CodeBeaver AI - Your AI Senior Software Engineer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Contributors](https://img.shields.io/badge/contributors-welcome-brightgreen.svg)](#contributing)

CodeBeaver is an intelligent, AI-powered pull request review system that automatically indexes your GitHub repositories and provides semantic, high-quality code reviews powered by Google's Gemini 3 LLM. It acts as a "Senior Software Engineer" reviewer, understanding complex code interactions and delivering precise, actionable feedback on every PR.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Features

- **🚀 Zero Configuration**: Install the GitHub App to your organization and start getting reviews instantly
- **⚡ Lazy Indexing**: Automatically indexes repositories only when the first PR arrives, optimizing resource usage
- **🧠 Semantic Analysis**: Deep understanding of your codebase using AI-powered vector embeddings (768-dimensional)
- **⭐ Elite Reviews**: High-quality, actionable feedback powered by Google Gemini 3 LLM
- **🔗 GitHub Integration**: Seamless integration via GitHub App with webhook-based PR monitoring
- **📊 Vector Search**: Leverages Pinecone for semantic code search and context retrieval
- **⚙️ Event-Driven Architecture**: Uses Inngest for reliable, scalable workflow orchestration
- **🔐 Enterprise-Ready**: OAuth 2.0 authentication with GitHub, secure credential management

## Tech Stack

### Frontend & Full-Stack

- **Framework**: Next.js 16.1.7 with Turbopack
- **Runtime**: React 19.2.4
- **Styling**: Tailwind CSS 4.2.1 + shadcn/ui components
- **State Management**: React hooks + Context API

### Backend & Infrastructure

- **Runtime**: Node.js
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Authentication**: Better Auth with GitHub OAuth
- **Task Queue**: Inngest for event-driven workflows
- **File Storage**: AWS S3 / Cloudflare R2

### AI & ML

- **LLM**: Google Generative AI (Gemini)
- **Embeddings**: Gemini 2 Embedding Model (768-dim vectors)
- **Vector Database**: Pinecone for semantic search
- **Language**: TypeScript 5.9 for type safety

### Development Tools

- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL** (or use Neon cloud database)

You'll also need accounts for:

- **GitHub** - For OAuth and GitHub App
- **Google Cloud** - For Gemini API
- **Pinecone** - For vector database
- **Neon** - For PostgreSQL (or your own PostgreSQL server)
- **Resend** - For transactional emails
- **AWS/Cloudflare R2** - For file storage

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/lwshakib/codebeaver.git
cd codebeaver
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Then, fill in the required credentials in `.env`. See [Environment Setup](#environment-setup) section below for detailed instructions on each variable.

### Step 4: Set Up Database

Run Prisma migrations to set up your database schema:

```bash
pnpm run db:migrate
```


### Step 5: Generate Prisma Client

```bash
pnpm run db:generate
```

## Environment Setup

### 1. **Database - PostgreSQL (Neon)**

```env
DATABASE_URL='postgresql://user:password@ep-xxxxx.neon.tech/neondb?sslmode=require&channel_binding=require'
```

- Sign up at [Neon](https://neon.tech/)
- Create a new project and copy the connection string
- Keep this credential secure and never commit to version control

### 2. **Authentication - Better Auth**

```env
BETTER_AUTH_SECRET=your_secret_key_here_min_32_chars
BETTER_AUTH_URL=http://localhost:3000
```

- Generate a secure secret: `openssl rand -base64 32`
- `BETTER_AUTH_URL` should match your application URL (localhost for dev, your domain for production)

### 3. **GitHub OAuth (User Sign-in)**

```env
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

Steps to get these:

1. Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
2. Fill in:
   - Application name: `CodeBeaver`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and generate a Client Secret
4. Add to `.env`

### 4. **GitHub App (PR Webhooks & Repository Access)**

```env
GITHUB_APP_ID=your_github_app_id
GITHUB_APP_CLIENT_ID=your_github_app_client_id
GITHUB_APP_CLIENT_SECRET=your_github_app_client_secret
GITHUB_APP_WEBHOOK_SECRET=your_webhook_secret
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
```

Steps to set up GitHub App:

1. Go to GitHub Settings → Developer settings → GitHub Apps → New GitHub App
2. Fill in:
   - GitHub App name: `CodeBeaver`
   - Homepage URL: `http://localhost:3000`
   - Webhook URL: `http://localhost:3000/api/webhooks/github`
   - Webhook secret: Generate a random secret with `openssl rand -hex 32`
3. Set permissions:
   - **Repository**: Pull requests (read), Contents (read), Webhooks (read)
   - **User**: Email (read)
4. Subscribe to events: `pull_request`
5. Download the private key and encode it: `cat key.pem | base64`
6. Add all values to `.env`

### 5. **Email Service - Resend**

```env
RESEND_API_KEY=re_your_api_key_here
```

- Sign up at [Resend](https://resend.com/)
- Create an API key from the dashboard
- Used for transactional emails (welcome, sign-in notifications)

### 6. **File Storage - AWS S3 / Cloudflare R2**

```env
AWS_REGION=auto
AWS_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=codebeaver-bucket
```

- Sign up at [Cloudflare R2](https://www.cloudflare.com/products/r2/) or use AWS S3
- Create a bucket for CodeBeaver
- Generate API credentials
- Add to `.env`

### 7. **AI/LLM - Google Generative AI (Gemini)**

```env
GOOGLE_API_KEY=your_google_api_key
```

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key
- Add to `.env`

### 8. **Vector Database - Pinecone**

```env
PINECONE_API_KEY=pcsk_your_api_key
PINECONE_INDEX=code-beaver
```

- Sign up at [Pinecone](https://www.pinecone.io/)
- Create a new index with:
  - Dimension: `768` (matches Gemini embeddings)
  - Metric: `cosine`
  - Environment: Choose your preferred region
- Copy your API key
- Add to `.env`

### 9. **Workflow Orchestration - Inngest**

```env
INNGEST_DEV=1
```

- `INNGEST_DEV=1` enables dev mode for local development
- Set to `0` for production

## Running the Project

### Development Server

Start the development server with hot reload:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

### Database Visualization

Open Prisma Studio to visualize and manage your database:

```bash
pnpm run db:studio
```

### Building for Production

Build the production bundle:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm run start
```

### Linting & Code Quality

Run ESLint to check for code quality issues:

```bash
pnpm run lint
```


## Project Structure

```
codebeaver/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...all]        # Better Auth endpoint
│   │   ├── github/              # GitHub App callbacks
│   │   ├── webhooks/github/     # PR webhook handler
│   │   ├── s3/                  # AWS S3 presigned URLs
│   │   └── inngest/             # Inngest webhook
│   ├── (auth)/                  # Auth pages (sign-in, sign-up)
│   ├── (main)/                  # Protected routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── repositories/        # Repository management
│   │   └── account/             # User account settings
│   ├── onboarding/              # GitHub App setup flow
│   └── layout.tsx               # Root layout
├── components/                  # React UI components
│   ├── ui/                      # shadcn/ui primitives
│   ├── emails/                  # Email templates
│   └── background/              # Background components
├── lib/                         # Utilities & configuration
│   ├── auth.ts                 # Better Auth setup
│   ├── auth-client.ts          # Client-side auth hooks
│   ├── prisma.ts               # Prisma client singleton
│   ├── s3.ts                   # AWS S3 helpers
│   ├── env.ts                  # Environment validation
│   └── utils.ts                # Common utilities
├── inngest/                    # Event-driven workflows
│   ├── client.ts               # Inngest client
│   ├── functions.ts            # Event handlers
│   └── helpers.ts              # GitHub & Pinecone operations
├── llm/                        # LLM operations
│   ├── client.ts               # Google GenAI client
│   ├── generateText.ts         # Text generation
│   ├── generateObject.ts       # Structured output
│   ├── embeddings.ts           # Vector embeddings
│   └── prompts.ts              # Prompt templates
├── prisma/                     # Database
│   ├── schema.prisma           # Data models
│   └── migrations/             # Migration files
├── public/                     # Static assets
├── .env.example                # Environment template
├── package.json                # Dependencies
└── README.md                   # This file
```

## How It Works

### System Architecture

```mermaid
graph TD
    User([GitHub User]) -->|Opens/Updates PR| GitHub[GitHub Webhook]
    GitHub -->|Event| API[Next.js API Route]
    API -->|Trigger| Inngest[Inngest Workflow Engine]
    
    subgraph Workflows [Inngest Background Workflows]
        Index[Repository Indexing]
        Review[PR Analysis & Review]
    end
    
    Inngest --> Index
    Inngest --> Review
    
    Index -->|Embeddings| Gemini[Google Gemini LLM]
    Gemini -->|Vectors| Pinecone[(Pinecone Vector DB)]
    
    Review -->|Fetch Context| Pinecone
    Review -->|Generate Review| Gemini
    Review -->|Post Comment/Review| GitHub
    
    Index -.->|Store Status| DB[(PostgreSQL Database)]
    Review -.->|Save Historical Reviews| DB
```

### 1. **Repository Indexing**

- When a user installs the GitHub App, CodeBeaver automatically triggers an indexing process
- All files in the repository are recursively fetched (binary files excluded)
- Code is split into chunks (8KB max) and converted to vector embeddings using Gemini 2
- Embeddings are stored in Pinecone for fast semantic search

### 2. **Pull Request Analysis**

- When a PR is opened/updated, GitHub webhooks notify CodeBeaver
- The PR diff is fetched and analyzed against the indexed codebase
- Vector search in Pinecone retrieves the most relevant code context
- Google Gemini 3 generates a detailed, semantic PR review
- The review is posted as a GitHub comment/review

### 3. **Continuous Learning**

- Each PR and review helps improve future analyses
- The indexing is lazy (only when needed) to save resources
- Re-indexing happens automatically when code changes significantly

## Contributing

We love contributions! Whether you're fixing bugs, adding features, or improving documentation, please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Clone your fork: `git clone https://github.com/lwshakib/codebeaver.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`
5. Set up `.env` file (copy `.env.example`)
6. Run dev server: `pnpm run dev`
7. Make your changes and commit: `git commit -am 'Add your feature'`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Create a Pull Request

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 **Documentation**: Check our docs at [docs.example.com](https://docs.example.com)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/lwshakib/codebeaver/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/lwshakib/codebeaver/discussions)
- 📧 **Email**: support@codebeaver.dev

## Acknowledgments

- Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/)
- AI powered by [Google Generative AI](https://ai.google.dev/)
- Vector search powered by [Pinecone](https://www.pinecone.io/)
- Email delivery by [Resend](https://resend.com/)
- Workflow orchestration by [Inngest](https://www.inngest.com/)
- Database by [Neon](https://neon.tech/) and [Prisma](https://www.prisma.io/)

---

**Made with ❤️ by the CodeBeaver team**
