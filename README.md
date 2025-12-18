# AgencyOS (Manager 2.0)

A modern talent management dashboard built with Next.js 15, Drizzle ORM, Better-Auth, and Shadcn/UI.

## Tech Stack

- **Next.js 15** (App Router, Server Components)
- **Drizzle ORM** with SQLite
- **Better-Auth** (session-based authentication)
- **Shadcn/UI** + Tailwind CSS

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Kanban-style workflow (Inbox → Shortlist → Archived → Trash)
- AI-powered applicant evaluation
- Decision state tracking with audit logs
- Board-based categorization (Main, New Faces, Men, Curve)
- Priority tagging (Gold, Silver, Bronze)

## Database

The project uses SQLite with Drizzle ORM. Database migrations are handled automatically.

## License

Private project.
