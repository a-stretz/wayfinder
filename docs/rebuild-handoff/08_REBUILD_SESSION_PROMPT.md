# 08: Rebuild Session Prompt

Copy everything inside the fence below into the new session. Attach this whole `docs/rebuild-handoff/` folder, or point the session at the repo and branch that contains it.

```text
You are rebuilding "Wayfinder" from a working prototype into a market-ready, domain-agnostic, multi-tenant SaaS product.

CONTEXT
- The handoff package in docs/rebuild-handoff/ is your source of truth. Read it in order:
  00_README → 01_PRODUCT_OVERVIEW → 02_DOMAIN_MODEL → 03_FEATURES_AND_SCREENS →
  04_LOGIC_AND_ALGORITHMS → 05_DESIGN_SYSTEM → 06_GAP_ANALYSIS → 07_MARKET_READY_REQUIREMENTS.
- The prototype (React 19 + TS + Vite, single App.tsx, no backend) exists for reference only.
  Reuse its concepts, enums, copy and generic template defaults where useful. Do NOT reuse its
  seed dataset, industry examples, department list, or company-adaptation material.

WHAT WAYFINDER IS
An initiative-intelligence tool. It turns raw internal signals (requests, complaints, notes, files,
ideas) into structured initiatives with: qualitative scoping, a readiness state, a single recommended
next action (the "Waypoint") with its rationale, only-relevant solution paths with fit labels
(Strong/Good/Possible/Later/Poor), decision lenses that may or may not change the recommendation,
medium-depth candidate requirements, target state and future scope, and cross-initiative pattern learning.
No numeric scores in the UI. Human-in-the-loop: AI proposes, users accept or override, everything is versioned and attributed.

NON-NEGOTIABLES
1. Domain-neutral: every taxonomy (functional areas, workflow areas, systems, source types, custom lenses)
   is tenant data. No industry-specific names, examples or data in code, seeds, prompts or UI copy.
2. Product principles in 07 §1.
3. Signals are first-class and many-to-many with initiatives.
4. All LLM outputs are schema-validated JSON with a deterministic fallback; signal content is untrusted input.
5. WCAG 2.2 AA, tenant isolation, audit log.

HOW TO WORK
- Start with Phase 0 in 07 §8, then Phase 1. Before coding, propose:
  (a) the final stack and repo layout, (b) the DB schema and migrations derived from 02 §C,
  (c) the API surface, (d) the LLM task schemas and prompt outline for each task in 07 §4.3,
  (e) the neutral demo dataset outline (8–12 initiatives, cross-industry wording, covering every
      next action, path, fit label and readiness state).
  Wait for my confirmation on (a)–(e), then implement.
- Keep a running DECISIONS.md and update the handoff docs whenever you change a concept.
- Each phase ends with lint, type-check, tests, an E2E happy path and a deployed preview.
- Default AI provider: current Claude models behind a provider-agnostic gateway; support BYO key.

FIRST DELIVERABLE
A short plan covering (a)–(e), plus a list of open questions where the handoff docs leave a real product decision open.
```

## Open product decisions to settle early

These are deliberately left open in the handoff. The rebuild session should raise them rather than guess:

1. **Terminology:** "Waypoint" versus "Recommended next action" in the UI; "Decision Lens" versus "Prioritization Lens".
2. **Detail-page order:** the spec's order (context → signals → scoping → Waypoint) versus the prototype's recommendation-early order.
3. **Status versus readiness:** whether to keep both axes or merge them.
4. **Custom solution paths:** whether tenants may add them or only rename the built-in eight.
5. **Re-analysis trigger:** automatic on every new signal, batched, or manual only.
6. **Hosting and stack:** Next.js full-stack or a separate SPA plus API; region and data-residency needs.
7. **Pricing model:** seats, usage, or a hybrid.
8. **Target buyer for go-to-market:** product-ops leaders, operations/transformation offices, or internal-AI/automation programme owners.
