# AgencyOS

**Applicant management for model agencies.** Incoming applications land in an inbox, get reviewed on category boards, and move through a clear decision flow, with every decision logged.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F)
![Better Auth](https://img.shields.io/badge/Better--Auth-sessions-111)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Tailwind-06B6D4?logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe&logoColor=white)

## Features

- **Kanban-style review flow** — Inbox → Shortlist → Archived → Trash
- **Boards per division** — Main, New Faces, Men, Curve
- **Priority tagging** — Gold / Silver / Bronze
- **Decision audit log** — every status change is recorded (`decision_audit` table)
- **Organisations & members** — multi-user agencies on top of Better-Auth sessions
- **Intake API** — `POST /api/ingest` (bearer-token protected) for pushing applications in from forms or email parsers
- **Marketing site + onboarding + Stripe Checkout** in the same app (route groups `(marketing)` and `(app)`)
- **Scheduled cleanup** via a cron endpoint

## Stack

Next.js 15 (App Router, Server Components, Server Actions) · Drizzle ORM + SQLite · Better-Auth · shadcn/ui + Tailwind · Framer Motion · Stripe

## Run locally

```bash
npm install
node seed.js        # optional demo data
npm run dev         # http://localhost:3000
```

## Status

Prototype. The AI pre-screening step called from the intake API is not implemented yet.

---

Built by [Miguel](https://github.com/supitsmono) with an AI-assisted workflow: I own the product, architecture and decisions; AI coding tools write most of the code.
