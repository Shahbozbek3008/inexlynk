# iNexLynk

Multi-language B2B platform connecting companies, investment opportunities and a marketplace — built with the Next.js App Router.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)

## Overview

iNexLynk lets businesses publish and discover investment offers and marketplace listings, maintain a verified company profile, and talk to each other in-app. Every route is locale-aware and server-rendered, with a full account and security area behind authentication.

## Features

- **Marketplace** — listings, detail pages, posting and editing flow
- **Investment** — offers, detail pages, posting and editing flow
- **Companies** directory
- **Authentication** — sign-in, sign-up, verification codes, password recovery, OAuth
- **Account & security** — business and identity profiles, two-step verification
- **In-app chat** between users
- **Filtering and search** with URL-synced state
- **3D and motion** sections built with React Three Fiber and Framer Motion
- **Full i18n** with locale-prefixed routing, sitemap, robots and PWA manifest

## Tech Stack

| Layer | Choice |
| :--- | :--- |
| Framework | Next.js (App Router, RSC) |
| Language | TypeScript |
| Data | TanStack Query, TanStack Table |
| State | Zustand |
| Forms | React Hook Form + resolvers |
| UI | Tailwind CSS, Radix UI / shadcn, Embla, dnd-kit |
| Motion / 3D | Framer Motion, React Three Fiber, drei |
| i18n | next-intl |
| Runtime | Bun |

## Project Structure

```
src/
  app/[locale]/
    (auth)/                sign-in, sign-up, verification, recovery
    (main)/
      marketplace/         list, detail, post
      investment/          list, detail, post
      companies/           company directory
      chat/                messaging
      (profile-settings)/  account, business, identity, security
  components/              common, form, filter, ui, semantic, motion
  hooks/                   react-query hooks, store hooks, UI hooks
  i18n/                    navigation and locale configuration
```

## Getting Started

```bash
bun install
cp .env.example .env
bun dev
```

## Conventions

- Files and folders use **kebab-case**
- Responsive sizing via `tailwind-clamp`
- `rem` for font sizes and spacing, `px` for borders and shadows
- Import navigation from `src/i18n/navigation`, and build links with `getHref`
- Apply `setLocale` in layouts and pages for SEO and load performance
- Use `ClientImage` / `ServerImage` for remote images
- Use `ClientTranslate` / `ServerTranslate` instead of repeating translation setup
- Translation keys live at the root level of each JSON file
