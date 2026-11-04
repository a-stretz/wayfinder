# Wayfinder Rebuild Handoff Package

This folder is a complete, domain-neutral breakdown of the Wayfinder prototype. Its job is to give a rebuilding session everything it needs to turn the prototype into a market-ready product.

**Scope rule for this package:** it describes what was built, how it works, where it falls short, and what a market-ready version needs. It deliberately leaves out the prototype's synthetic dataset, its industry-specific examples and vocabulary, and the per-company adaptation material. Where the prototype hardcodes domain content, this package describes the *shape* of that content and marks it as something to replace with tenant-configurable data.

## Reading order

| # | File | What it gives you |
|---|---|---|
| 01 | [01_PRODUCT_OVERVIEW.md](01_PRODUCT_OVERVIEW.md) | Thesis, positioning, users, goals, non-goals, vocabulary, success criteria |
| 02 | [02_DOMAIN_MODEL.md](02_DOMAIN_MODEL.md) | Every entity, enum, field and relationship, as built and as specified, plus a proposed target schema |
| 03 | [03_FEATURES_AND_SCREENS.md](03_FEATURES_AND_SCREENS.md) | Screen-by-screen breakdown of the shipped UI: layout, content, interactions, states |
| 04 | [04_LOGIC_AND_ALGORITHMS.md](04_LOGIC_AND_ALGORITHMS.md) | All application logic: state, derivations, intake heuristic, aggregation, lens behaviour, defaults |
| 05 | [05_DESIGN_SYSTEM.md](05_DESIGN_SYSTEM.md) | Colour, type, spacing, components, status treatments, responsive rules, tone |
| 06 | [06_GAP_ANALYSIS.md](06_GAP_ANALYSIS.md) | Spec-vs-built matrix, confirmed bugs, tech debt, documentation drift |
| 07 | [07_MARKET_READY_REQUIREMENTS.md](07_MARKET_READY_REQUIREMENTS.md) | Target architecture, functional and non-functional requirements, phased roadmap with acceptance criteria |
| 08 | [08_REBUILD_SESSION_PROMPT.md](08_REBUILD_SESSION_PROMPT.md) | A ready-to-paste prompt for kicking off the rebuild session |

## One-paragraph summary

Wayfinder is a decision-support tool for internal improvement work. It takes raw "signals" (requests, complaints, notes, ideas), shapes them into "initiatives", assesses each initiative qualitatively, compares possible solution paths using fit labels instead of numeric scores, recommends a concrete next action, lets the user test how different decision priorities ("lenses") would shift emphasis, maps candidate requirements, keeps a target state and future scope visible, and aggregates patterns across all initiatives. The prototype is a single-page React 19 + TypeScript + Vite app with no backend, no persistence, no auth, and no real AI. Its "intelligence" is either hand-authored seed data or a keyword heuristic. At the time of this analysis **the production build fails** on a type error (see 06).

## Prototype facts at a glance

| Item | Value |
|---|---|
| Stack | React 19.2, TypeScript ~6.0, Vite 8, ESLint 10 flat config |
| Runtime deps | `react`, `react-dom` only |
| Source size | `src/App.tsx` 1,381 lines (all components in one file), `src/App.css` 1,911 lines, `src/data/wayfinderData.ts` 882 lines (types + seed data) |
| Routing | None. One `activePage` state value plus a `selectedInitiativeId` |
| State | React `useState` in the root `App` component. Lost on refresh |
| Persistence / backend / auth | None |
| AI | None. Intake uses substring keyword matching |
| Tests | None (manual test plan only) |
| Build status | `npm run lint` passes. `npm run build` **fails**: `src/App.tsx(105,3): Type 'string' is not assignable to type 'SignalSource'` |
| Deployment config | None in repo (no `netlify.toml`, no CI workflow) |
| Leftovers | Default Vite favicon, unused Vite `public/icons.svg`, dead CSS classes, unused data export |

## Source files the rebuild session should still read

The handoff docs are self-contained, but these repo files are the primary sources:

- `Wayfinder Core Spec.md`: the canonical product spec. Its concepts are generic, but its examples (sections 19, 24, 25) and suggested department names are industry-flavoured; ignore those parts.
- `src/data/wayfinderData.ts`, lines 1–195: the type system and enums. Lines 197 onward are synthetic seed data and are out of scope.
- `src/App.tsx`: all UI and logic.
- `Wayfinder Deep Research Prompt.txt` and `Wayfinder Adaptation Prompt.txt`: prompts for adapting the product to one specific company. They are out of scope for a generic product, but they hint at a future "tenant onboarding / configuration" feature (see 07, section 4.9).
