# 🦫 CodeBeaver AI: Your Autonomous Senior PR Reviewer

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%203-orange?logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CodeBeaver is a state-of-the-art AI Senior Software Engineer designed to automate code reviews and provide elite-level feedback. By deeply indexing your codebase into a vector database, CodeBeaver understands the context and cross-file dependencies of every change, ensuring your Pull Requests are reviewed with surgical precision.

---

## 🚀 Key Features

- **⚡ Zero Configuration**: Connect your GitHub App once and CodeBeaver starts monitoring your entire organization immediately.
- **🧠 Context-Aware Reviews**: Uses RAG (Retrieval-Augmented Generation) to pull relevant code snippets from your entire repository to understand the impact of PR changes.
- **🕒 Lazy Indexing**: To optimize resources, repositories are only indexed when the first PR is opened, ensuring efficiency.
- **🤖 Powered by Gemini 3**: Leverages the latest LLM capabilities for high-reasoning code analysis, bug detection, and architectural suggestions.
- **🔄 Background Workflows**: Built on **Inngest**, ensuring reliable, retriable, and scalable background processing for indexing and reviews.
- **🛡️ Secure & Private**: Your code is processed securely, and indexing ensures only relevant context is sent to the LLM.

---

## 🛠️ How It Works

1.  **Installation**: You install the CodeBeaver GitHub App on your organization or specific repositories.
2.  **Webhook Trigger**: GitHub sends a webhook to CodeBeaver when a Pull Request is opened or updated.
3.  **Auto-Discovery**: CodeBeaver automatically detects the repository and user.
4.  **Semantic Indexing**: If not already indexed, CodeBeaver crawls the codebase, generates embeddings using Gemini, and stores them in **Pinecone**.
5.  **Context Retrieval**: For a given PR, CodeBeaver fetches the diff and queries Pinecone for related technical context.
6.  **AI Analysis**: Gemini 3 analyzes the diff + retrieved context to generate a high-level summary and specific inline feedback.
7.  **Automated Feedback**: CodeBeaver posts a review summary and inline comments directly back to the GitHub PR.

---

## 🏗️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend/Backend** | [Next.js 15](https://next.js) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Authentication** | [Better Auth](https://better-auth.com/) |
| **Database** | [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) |
| **Background Jobs** | [Inngest](https://www.inngest.com/) |
| **AI Model** | [Gemini 3](https://deepmind.google/technologies/gemini/) |
| **Vector DB** | [Pinecone](https://www.pinecone.io/) |
| **Emails** | [Resend](https://resend.com/) + [React Email](https://react.email/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/) |

---

## 🚦 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- PostgreSQL Database
- GitHub App (See [Setup Guide](./github-app-setup.md))
- Pinecone Account
- Google Gemini API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/lwshakib/codebeaver.git
    cd codebeaver
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file based on the project requirements (App ID, Client Secret, DB URL, etc.).

4.  **Initialize Database**:
    ```bash
    npm run db:migrate
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

## 📖 Documentation

- [GitHub App Setup Guide](./github-app-setup.md) - How to configure your GitHub App.
- [Architecture Overview](./README.md#how-it-works) - Detailed breakdown of the review flow.

---

## 🤝 Contributing

We welcome contributions! Please feel free to open issues or submit Pull Requests to improve CodeBeaver.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the CodeBeaver Team
</p>
