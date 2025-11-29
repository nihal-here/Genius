# Genius AI SaaS - Agent Instructions

## Project Overview
Genius is a comprehensive AI SaaS platform built with Next.js, allowing users to generate images, videos, music, code, and engage in conversations using various AI models. It features a subscription model using Stripe and authentication via Clerk.

## Technology Stack
- **Framework:** Next.js 13.4.19 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI, Lucide React
- **Authentication:** Clerk (`@clerk/nextjs`)
- **Database:** PostgreSQL (via Prisma ORM)
- **Payments:** Stripe
- **AI Integration:** OpenAI, Replicate
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod

## Architecture

### Directory Structure
- **`app/`**: Next.js App Router directory.
  - **`(auth)/`**: Authentication routes (Sign In, Sign Up).
  - **`(dashboard)/`**: Protected dashboard routes (Dashboard, Conversation, Image, etc.).
  - **`(landing)/`**: Public landing page.
  - **`api/`**: Backend API Route Handlers.
    - `code`, `conversation`, `image`, `music`, `video`: Feature-specific endpoints.
    - `stripe`: Stripe checkout session creation.
    - `webhook`: Stripe webhook handler.
- **`components/`**: Reusable UI components (likely shadcn/ui based).
- **`lib/`**: Utility functions and singletons.
  - `prismadb.ts`: Prisma client singleton.
  - `stripe.ts`: Stripe client instance.
  - `api-limit.ts`: Logic for tracking free tier usage.
  - `subscription.ts`: Logic for checking subscription status.
- **`prisma/`**: Database schema and migrations.
- **`hooks/`**: Custom React hooks (e.g., for modals).

### Data Model (`prisma/schema.prisma`)
- **`UserApiLimit`**: Tracks the number of free generations a user has used.
  - Fields: `id`, `userId` (Clerk ID), `count`, `createdAt`, `updatedAt`.
- **`UserSubscription`**: Stores Stripe subscription details.
  - Fields: `id`, `userId`, `stripeCustomerId`, `stripeSubscriptionId`, `stripePriceId`, `stripeCurrentPeriodEnd`.

### Key Workflows
1.  **Authentication**: Handled by Clerk. Middleware protects dashboard routes.
2.  **AI Generation**:
    - User submits prompt via frontend form.
    - Request sent to corresponding API route (e.g., `/api/conversation`).
    - API checks API limit (`lib/api-limit.ts`) or Subscription (`lib/subscription.ts`).
    - API calls external AI service (OpenAI/Replicate).
    - Response returned to frontend.
    - API limit incremented if user is on free tier.
3.  **Subscription**:
    - User clicks "Upgrade".
    - `/api/stripe` creates a Stripe Checkout Session.
    - User pays on Stripe.
    - Stripe sends webhook to `/api/webhook`.
    - Webhook updates `UserSubscription` in database.

## Development Setup
- **Environment Variables**: Required in `.env` (Database URL, Clerk Keys, Stripe Keys, OpenAI/Replicate Keys).
- **Database**: Run `npx prisma generate` and `npx prisma db push` to sync schema.
- **Dev Server**: `npm run dev`.

## Modernization Opportunities
- Upgrade to Next.js 15.
- Implement Server Actions for form submissions.
- Add comprehensive testing (Jest/Playwright).
- Enhance type safety.
- Update dependencies to latest versions.
