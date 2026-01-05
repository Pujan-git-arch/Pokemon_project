# PokéDex Lite

A lightweight Next.js PokéDex demo that fetches data from the PokéAPI and demonstrates basic UI primitives, React Query for data fetching, and Tailwind styling.

---

## 🚀 Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📁 Project structure & file summary

Below is a concise tree and one-line summary for each important file or folder.

### Root
- `package.json` — Project scripts, dependencies (Next 16, React 19, React Query, axios, Tailwind, etc.). ✅
- `README.md` — This file (updated with structure & usage).
- `components.json` — shadcn/ui configuration + alias mappings.
- `next.config.ts` — Next.js configuration (image domains, strict mode).
- `tsconfig.json` — TypeScript compiler options and path aliases.
- `eslint.config.mjs` — ESLint config for Next + TypeScript.
- `postcss.config.mjs` — PostCSS/Tailwind plugin config.

### public/
- `pokeball.png` — Pokéball asset used on the homepage.
- `*.svg` — Misc. public assets (Next/Vercel icons, etc.).

### app/ (Next.js app directory)
- `layout.tsx` — Root layout wrapping pages with `QueryClientProvider`.
- `globals.css` — Tailwind imports, theme CSS variables and base styles.
- `page.tsx` — Home page with a rotating Pokéball, `SearchForm`, and `PokemonList`.
- `page.module.css` — Small CSS module for 3D rotation used in header.
- `pokemon/[name]/page.tsx` — Pokémon detail page; fetches and renders Pokémon detail.
- `test/page.tsx` — Test page that logs a list of Pokémon to the console.

### components/
- `components/common/SearchForm.tsx` — Search UI with `react-hook-form` + `zod`; navigates to `/pokemon/:name`.
- `components/pokemon/PokemonList.tsx` — Fetches and displays a grid of Pokémon cards (React Query).
- `components/pokemon/PokemonCard.tsx` — Card component for each Pokémon with temporary type color styling.
- `components/pokemon/PokemonTCGCard.tsx` — TCG-like card layout (image, HP, attacks, stats).
- `components/ui/button.tsx` — Button primitive (CVA-driven variants + `cn`).
- `components/ui/card.tsx` — Reusable card primitives (Card, CardHeader, etc.).
- `components/ui/input.tsx` — Styled input used by `SearchForm`.

### lib/
- `lib/axios.ts` — `axios` instance configured to `https://pokeapi.co/api/v2`.
- `lib/queryClient.ts` — React Query `QueryClient` with default options.
- `lib/utils.ts` — `cn()` helper (class concat + tailwind-merge).

### services/
- `services/pokemonService.ts` — API layer with types and functions `fetchPokemonList` and `fetchPokemonDetail`.

---

## 💡 Notes & tips

- Data fetching is centralized in `services/pokemonService.ts` and used via React Query.
- UI primitives are in `components/ui/`; feature components live in `components/pokemon/` and `components/common/`.
- Images from PokéAPI are allowed via `next.config.ts` domains.

> Tip: To add more fields to the detail page, extend `PokemonDetail` in `services/pokemonService.ts` and render the values in `app/pokemon/[name]/page.tsx`.

---

## ✅ Next steps I can help with

- Add a `STRUCTURE.md` or `CONTRIBUTING.md` with onboarding notes.
- Add tests or TypeScript refinements (e.g., stronger typings for sprites).
- Improve `PokemonCard` to include sprite images and type badges.

If you'd like, I can create one of the above files now — tell me which one to add.
