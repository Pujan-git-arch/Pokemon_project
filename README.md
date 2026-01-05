# PokéDex Lite

A lightweight, educational Next.js app that demonstrates fetching Pokémon data from the PokéAPI, building small reusable UI primitives, and using React Query for data management.

---

## 🚀 Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm run start
```

Lint (ESLint):

```bash
npm run lint
```

---

## 📁 Current project structure

Summary of the most important files and what they do.

### Root
- `package.json` — scripts (dev/build/start/lint) and dependencies (Next, React, React Query, axios, Tailwind, etc.).
- `next.config.ts` — Next config (image domains allowlist, reactStrictMode).
- `tsconfig.json` — TypeScript settings and path aliases ( `@/*` → `./*`).
- `components.json` — shadcn UI config & alias mappings used for generating components.
- `postcss.config.mjs` / `eslint.config.mjs` — build and lint configuration.

### public/
- `pokeball.png` & icons — static assets used by the app.

### app/ (Next.js app folder)
- `layout.tsx` — wraps the app in `QueryClientProvider` (React Query root).
- `globals.css` — Tailwind imports, theme variables and base styles.
- `page.tsx` — Home page with a rotating Pokéball header, `SearchForm`, and `PokemonList`.
- `page.module.css` — small module providing the Pokéball rotation styles.
- `pokemon/[name]/page.tsx` — Pokémon detail page that fetches detail by name and presents a styled card.
- `test/page.tsx` — quick test page (makes an API call and logs results).

### components/
- `components/common/SearchForm.tsx` — uses `react-hook-form` + `zod` for validation and navigates to `/pokemon/:name` on submit.
- `components/pokemon/PokemonList.tsx` — fetches a list of Pokémon and renders a responsive grid of `PokemonCard` components.
- `components/pokemon/PokemonCard.tsx` — simple card linking to the Pokémon detail page; currently uses placeholder type colors.
- `components/pokemon/PokemonTCGCard.tsx` — a stylized trading-card-like component (image, HP, attacks, stats) used for exploration.
- `components/ui/` — primitives: `button.tsx`, `card.tsx`, `input.tsx` (use `cn()` to compose Tailwind classes).

### lib/
- `lib/axios.ts` — axios instance `api` configured to `https://pokeapi.co/api/v2`.
- `lib/queryClient.ts` — React Query client with reasonable defaults (no refetch on window focus, retry=1).
- `lib/utils.ts` — `cn()` helper that merges `clsx` + `tailwind-merge`.

### services/
- `services/pokemonService.ts` — typed API functions and interfaces (`PokemonListItem`, `PokemonListResponse`, `PokemonDetail`) and `fetchPokemonList` / `fetchPokemonDetail` functions.

---

## ⚙️ Implementation notes & tips

- Data fetching is centralized in `services/pokemonService.ts`. React Query is configured in `lib/queryClient.ts` and provided in `app/layout.tsx`.
- `PokemonCard` currently does not show sprites — adding a sprite fetch or passing sprite data from the list API is a straightforward improvement.
- `pokemon/[name]/page.tsx` derives the main type to pick color gradients; extend `PokemonDetail` types in `services/pokemonService.ts` if you need more fields.
- Image domains are allowed for `raw.githubusercontent.com` in `next.config.ts` to support sprites.

---

## ✅ Suggested next improvements (pick one)
- Add sprite thumbnails to `PokemonList` and show types on each card.
- Improve typings for sprites and artwork in `PokemonDetail`.
- Add unit / integration tests (Jest + React Testing Library).
- Add a sitemap and deploy config for Vercel.

---

## 🙋 Need help?

Tell me which file you'd like me to add or update next: `STRUCTURE.md`, `CONTRIBUTING.md`, tests, or changes to components (for example, show sprites in `PokemonCard`).
