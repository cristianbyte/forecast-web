# AGENTS.md

## Project Shape
- This repo is only the React frontend (`forecast-web`) for Forecast; the README describes a sibling Spring Boot backend (`forecast-api`) outside this repo.
- Runtime entrypoint is `src/main.jsx`, which mounts `src/App.jsx` into `#root` from `index.html`.
- Source is plain JavaScript/JSX, not TypeScript; there is no typecheck script or TS config.

## Commands
- Use `pnpm`; the repo has `pnpm-lock.yaml` and no npm/yarn lockfiles.
- `pnpm dev` starts the Vite dev server.
- `pnpm build` runs the production Vite build and writes `dist/`.
- `pnpm lint` runs ESLint over the whole repo.
- `pnpm preview` serves the built Vite output.
- There is no test script, formatter script, or codegen step in this repo.

## Tooling Notes
- Tailwind is v4 via `@tailwindcss/vite` in `vite.config.js`; styles enter through `@import "tailwindcss"` in `src/index.css`, with no `tailwind.config.*` file.
- ESLint uses flat config in `eslint.config.js`, applies to `**/*.{js,jsx}`, and only ignores `dist/`.
- `src/index.css` defines the app design tokens as CSS custom properties; preserve them when adding UI styles.

## Design Notes
- Follow `DESING.md` for UI decisions.
- Use `lucide-react` for icons. Do not create inline SVG icons.
