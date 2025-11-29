# Genius AI - SaaS Platform

![Genius AI Banner](/public/logo.png)

**Genius** is a modern, all-in-one AI SaaS platform that allows users to generate content using the power of OpenAI and Replicate. It features a stunning, glassmorphism-inspired UI, robust authentication, subscription management, and a suite of 5 powerful AI tools.

## 🚀 Features

-   **5 AI Tools**:
    -   💬 **Conversation**: Chat with a smart AI (powered by OpenAI GPT).
    -   🎨 **Image Generation**: Create stunning images from text prompts (powered by OpenAI DALL-E).
    -   📹 **Video Generation**: Turn text into video (powered by Replicate).
    -   🎵 **Music Generation**: Turn text into music (powered by Replicate).
    -   💻 **Code Generation**: Generate code snippets and explanations (powered by OpenAI GPT).
-   **Modern UI/UX**:
    -   Dark Mode First design with Glassmorphism.
    -   "Neural Pulse" loading animations.
    -   Responsive Bento Grid dashboard.
    -   Theme Toggle (Light/Dark/System).
-   **Prompt Library**: "Get Inspired" section with pre-made prompts for every tool.
-   **Export & Share**: Copy text/code and download media directly.
-   **SaaS Features**:
    -   **Authentication**: Secure login via Clerk (Google, GitHub, Email).
    -   **Free Tier**: 5 free generations per user (tracked via Prisma/PostgreSQL).
    -   **Pro Subscription**: Unlimited generations via Stripe integration.
    -   **Landing Page**: High-conversion landing page with crisp animations.

## 🛠️ Tech Stack

-   **Framework**: Next.js 14 (App Router, Server Actions)
-   **Styling**: Tailwind CSS, Shadcn UI, Lucide React
-   **Database**: PostgreSQL (via Prisma ORM)
-   **Auth**: Clerk
-   **Payments**: Stripe
-   **AI Models**: OpenAI API (GPT-3.5/4, DALL-E), Replicate API

## 📦 Getting Started

### Prerequisites

-   Node.js 18+
-   PostgreSQL Database (e.g., Neon, Supabase, or local)
-   Clerk Account
-   Stripe Account
-   OpenAI & Replicate API Keys

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/genius-ai.git
    cd genius-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root and add:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

    OPENAI_API_KEY=sk-...
    REPLICATE_API_TOKEN=r8_...

    DATABASE_URL="postgresql://..."

    STRIPE_API_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Setup Database**:
    ```bash
    npx prisma db push
    npx prisma generate
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🚀 Deployment

The easiest way to deploy is via **Vercel**:

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add your Environment Variables in the Vercel Dashboard.
4.  Deploy!

For a detailed guide, see [Deploy to Vercel](.agent/workflows/deploy-vercel.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
