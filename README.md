# Job Board App

This is a full-stack job board web application built with **Next.js**, **TypeScript**, and **Prisma**. It allows users to create profiles, post jobs, and apply to them. Authentication is handled using **NextAuth.js**.

## Features

- 🔐 User authentication with NextAuth
- 📝 Profile creation and editing
- 📄 Job posting and listing
- ❤️ Like and interact with posts
- 📍 Location and skill input with dropdowns
- 📊 Trending posts sidebar

## Tech Stack

- **Frontend:** React, Next.js (App Router), Tailwind CSS
- **Backend:** Next.js API routes, Prisma, PostgreSQL (or your choice of database)
- **Auth:** NextAuth.js
- **Styles/UI:** Tailwind CSS, Shadcn UI
- **Build Tool:** Bun (with `bun.lockb`)
- **ORM:** Prisma

## Project Structure

```
├── actions/           # Server actions (e.g., like.ts)
├── app/               # Next.js app directory (pages, layout, routes)
├── components/        # Reusable UI and form components
├── lib/               # Database and utility functions
├── prisma/            # Prisma schema and seed scripts
├── public/            # Static files like SVGs and images
├── types/             # TypeScript type definitions
├── assets/            # Image or media assets
├── ui/                # UI components from shadcn
```

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Set up your environment variables (e.g., `.env.local`)

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run the development server:

```bash
bun dev
```

## License

This project is open-source and available under the MIT License.


