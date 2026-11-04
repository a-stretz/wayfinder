# 07: Market-Ready Requirements

This document defines what "market ready" means for Wayfinder as a **domain-agnostic, multi-tenant SaaS product**. Requirements use **MUST / SHOULD / MAY**. Phases at the end give an order of delivery with acceptance criteria.

---

## 1. Product principles (non-negotiable carry-overs)

1. Initiative-centred. The initiative is a full workspace, never a modal.
2. Qualitative judgement. Fit labels, readiness states and qualitative scoping values only; no numeric scores in the UI.
3. Recommendation clarity. There is always a single current Waypoint (next action), with why, what it produces, what decision it enables, and what would change it.
4. Show only relevant solution paths. It is acceptable to say "no good path yet".
5. Lenses may leave the recommendation unchanged, and the UI says so explicitly.
6. Requirements are decision tools at medium depth.
7. Target state and future scope stay visible but secondary.
8. Patterns compound: every initiative and outcome makes future recommendations better.
9. Domain-neutral core. All taxonomy is tenant configuration. Nothing industry-specific lives in code.
10. Human in the loop. AI proposes, people accept or override, and every generated artifact is attributed and versioned.

---

## 2. Target architecture

### 2.1 Recommended stack (a default, not a mandate)

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | React + TypeScript, Vite or Next.js (App Router), TanStack Query, React Router or file routes, Zod | Continuity with the prototype; typed contracts |
| UI kit | Radix or React Aria primitives (or shadcn/ui) themed with Wayfinder tokens | Accessibility by default |
| Backend | TypeScript (Node, e.g. Fastify/NestJS/Next route handlers) **or** Python FastAPI if the AI team prefers | One language end to end simplifies sharing schemas |
| DB | PostgreSQL with row-level security per tenant; `pgvector` for embeddings | Relational model plus similarity search in one store |
| Jobs | A durable queue (e.g. a Postgres-backed queue, BullMQ, Temporal, or a managed equivalent) | LLM calls, ingestion and re-analysis run asynchronously |
| Files | S3-compatible object storage with virus scanning | Signal attachments |
| Auth | OIDC/SAML SSO (via an auth provider), SCIM provisioning for enterprise tier | B2B requirement |
| AI | A provider-agnostic LLM gateway; default to current Claude models (e.g. `claude-sonnet-5-5` for structuring and analysis, `claude-haiku-5-5` for cheap classification and dedupe, `claude-opus-5-5` for deep scoping), with bring-your-own-key and alternative providers | Enterprises demand choice and data control |
| Hosting | Any container platform. A static-only Netlify deploy is fine for a marketing/demo build only | The product now needs a backend |
| Observability | OpenTelemetry traces, structured logs, error tracking, product analytics | |

### 2.2 Logical services

```
Web App ──► API (REST or tRPC/GraphQL, versioned)
              ├─ Auth / Tenancy / RBAC
              ├─ Signals service (capture, upload, connectors, dedupe, routing)
              ├─ Initiatives service (CRUD, versions, relations, outcomes)
              ├─ Analysis orchestrator (queue) ──► LLM Gateway ──► providers
              │     tasks: structure_signal, match_initiative, scope, recommend,
              │            solution_fit, requirements, lens_eval, pattern_tag, playbook_suggest
              ├─ Patterns service (tag normalisation, clustering, trends)
              ├─ Playbooks service
              ├─ Export / Integrations (issue trackers, chat, docs, webhooks, MCP server)
              └─ Admin (taxonomy, lenses, prompts, models, usage, billing)
Postgres (+pgvector) · Object storage · Queue · Cache
```

### 2.3 Code organisation (frontend)

`src/app` (routes), `src/features/{signals,initiatives,intake,patterns,playbooks,admin}/{components,hooks,api}`, `src/ui` (design-system components), `src/lib` (api client, schemas, utils), `src/theme` (tokens). No file over roughly 400 lines.

---

## 3. Data model

Implement the target schema in [02_DOMAIN_MODEL.md, section C](02_DOMAIN_MODEL.md#c-proposed-target-schema-for-the-rebuild). Key requirements:

- MUST make signals standalone, with a many-to-many link to initiatives.
- MUST version Waypoints, scoping assessments, solution-path assessments and target state, keeping full history.
- MUST attribute every generated field (`source: model | user | rule`, with `model_run_id`).
- MUST make taxonomies (functional areas, workflow areas, systems, source types, custom lenses, optionally custom solution paths) tenant data.
- MUST store patterns as normalised tags. SHOULD embed tags and initiatives for similarity.
- MUST store outcomes and feedback.
- MUST enforce tenant isolation at the DB level (RLS) and in every query.

---

## 4. Functional requirements

### 4.1 Signal capture (Intake)

- MUST support manual entry: title, raw content, source type, functional areas, optional notes, optional requested solution.
- MUST support file upload (PDF, DOCX, TXT, MD, CSV, email `.eml`) with text extraction. SHOULD support images via OCR or vision.
- MUST support CSV bulk import with column mapping to signal or initiative fields. This replaces the spec's "synthetic dataset import".
- SHOULD support email-in (a unique tenant address), a chat-tool shortcut or slash command, a browser extension, and a public API.
- MUST provide a **Signal Inbox** for unrouted signals, with suggested routing.
- On submission, the system MUST (asynchronously, within seconds):
  1. Extract summary, pain points, systems, stakeholders and requested solution.
  2. Suggest the top three matching existing initiatives, with an explanation, or "create new".
  3. Flag likely duplicates of other signals.
  4. For "create new", draft a full initiative (see 4.3).
- The user MUST be able to edit the draft before saving, attach to a suggested or chosen initiative, or dismiss.
- MUST let users attach a signal *without* generating an initiative draft (fixes B5).

### 4.2 Initiative workspace

- MUST include a header with title, objective, functional areas, workflow area, **status**, **readiness**, owner, stakeholders, systems, created/updated dates, and signal count.
- Sections, in a fixed order (the order is a product decision; the prototype's recommendation-early order tested well and is recommended):
  1. Problem understanding: problem statement, context, requested solution (if any), root-cause hypothesis.
  2. **Waypoint**: next action; why; expected output; decision enabled; what would change it; accept / override / regenerate controls.
  3. Signals: list with source, date and submitter; attach new; each signal shows which fields it influenced.
  4. Scoping analysis: an eight-dimension table with qualitative value, rationale and evidence links to signals.
  5. Decision lenses: all lenses available (built-in and custom), computed on demand.
  6. Solution map: only relevant paths, each with fit, why, what it requires, key risk/unknown, and relationship to the Waypoint.
  7. Candidate requirements: by category; status (candidate / accepted / rejected); now / later / deferred.
  8. Requirements by path.
  9. Target state (editable, versioned) and future scope, including **Not recommended yet**.
  10. Pattern learning and related initiatives (clickable).
  11. Outcome: path taken, result, lessons.
- MUST let users edit any field and record the edit as a user override.
- MUST trigger re-analysis (manually, and optionally automatically when a signal is attached) and show a **diff** of what changed in the Waypoint, fit and requirements.
- MUST have comments with @mentions, an activity history, and an audit trail.
- MUST export the initiative brief as Markdown, PDF or DOCX, and as a shareable read-only link (permissioned).
- MUST hand off to delivery tools: create an epic or issue in common issue trackers, with requirements mapped to the description or child items, and link back.

### 4.3 AI analysis pipeline

- Every task MUST return **schema-validated JSON** (Zod or JSON Schema). Retry on validation failure; fall back to a deterministic baseline.
- Tasks and outputs:

| Task | Input | Output |
|---|---|---|
| `structure_signal` | raw text + files | summary, pains[], systems[], stakeholders[], requested_solution, source_type guess |
| `match_initiative` | structured signal + embedding | top-k candidates with reason + "new" option |
| `scope` | initiative + signals | 8 dimensions × {value, rationale, evidence_signal_ids} + readiness_state + root-cause hypothesis |
| `recommend` | scope + tenant playbooks + similar initiatives + outcomes | Waypoint fields |
| `solution_fit` | scope + Waypoint | relevant paths only, with fit + 4 fields |
| `requirements` | all above | requirements by category (medium depth) + by path |
| `lens_eval` | initiative + lens definition | 7-field lens output; must allow "unchanged" |
| `pattern_tag` | initiative | normalised tags (reuse existing tags preferentially) |
| `playbook_suggest` | pattern clusters + outcomes | draft playbooks for admin review |

- Prompts MUST encode the recommendation heuristics in [04, section 3.6](04_LOGIC_AND_ALGORITHMS.md#36-implied-recommendation-rules-from-the-seed-data-and-spec). In particular: don't jump to AI or automation before ownership, data and governance are clear; prefer the smallest useful next step; always state what would change the recommendation.
- Readiness MUST gate actions. For example, "Prepare Engineering Handoff" requires Engineering Ready, or an explicit override with a reason.
- Retrieval: include similar past initiatives and their outcomes, plus tenant playbooks, as context (RAG over pgvector).
- **Skill files / prompt management:** prompts are versioned assets. Admins can view them and (on higher tiers) customise tenant-level guidance. Every model run records the prompt version.
- Guardrails: PII redaction options before sending to a provider; per-tenant data-retention and no-training settings; a token budget per tenant; timeouts; prompt-injection hardening, since signal content is untrusted (never follow instructions inside signals).
- MUST work in "no AI" mode for tenants that disable it, with manual entry plus a deterministic fallback.

### 4.4 Decision lenses

- Eight built-in lenses (see 02, section A4), each with a canonical name, display label, purpose, and favoured/disfavoured paths.
- Admins MAY add custom lenses (name, purpose, guidance text, path preferences).
- Selecting a lens computes or loads its result; the user can clear the selection or compare two lenses side by side.
- MUST visibly state when the recommendation does not change.

### 4.5 Home / portfolio dashboard

- MUST rank "Needs action" by explicit rules: stale (no update in N days), newly ready, blocked, high signal velocity, Waypoint awaiting acceptance. Labels are qualitative, with no visible score.
- MUST show distribution by readiness, status, primary path and next action, filterable by functional area.
- MUST show emerging patterns with trend arrows (e.g. "new this month", "growing").
- MUST show the latest signals sorted by time, with an inbox count.
- SHOULD support personal views ("My initiatives", "Awaiting my review").
- The prototype's before/after hero SHOULD become an onboarding or empty-state explainer, populated with neutral examples.

### 4.6 Initiatives list

- Search across title, problem and signals (full-text, plus optional semantic search).
- Filters: functional area, workflow area, status, readiness, next action, primary path, fit of primary, owner, updated range, has-unrouted-signals.
- Sort: updated, created, signal count, readiness. Columns: everything in the spec list.
- Saved views, CSV export, bulk assign/status, pagination or virtualisation.

### 4.7 Patterns

- Clusters per tag kind, with counts linking to initiatives, trends over time, and a co-occurrence view (e.g. a blocker that frequently appears with a given system).
- Solution-path trends: chosen versus outcome success rate (shown qualitatively).
- "Create playbook from pattern" action.

### 4.8 Playbooks and methodology

- Two parts:
  - **Methodology reference.** Explainers for solution paths, fit labels, readiness states, requirement categories, lenses, Waypoint logic and the learning model. Static content, editable by the tenant.
  - **Playbooks.** CRUD, draft/published states, AI-suggested from patterns, linked to the initiatives that used them. Seed with the three generic playbooks in [03, section 6](03_FEATURES_AND_SCREENS.md#6-recommendation-playbook-playbookpage).
- Recommendations SHOULD cite the playbook they drew on.

### 4.9 Tenant onboarding and configuration

- A guided setup: organisation name; functional areas; workflow areas; common systems; signal source types; optional custom lenses; AI provider/key settings; integrations.
- An optional "context interview" or document upload that pre-populates taxonomy and organisational context. This is the productised, generic version of the prototype's deep-research and adaptation prompts. The user always confirms the result; nothing is invented.
- An empty-state experience and a **neutral demo workspace** (see 4.12).

### 4.10 Outcomes and learning loop

- When an initiative reaches done, deferred or abandoned, prompt for an outcome: path taken, result, lessons.
- Thumbs up/down with a reason on every generated artifact (Waypoint, fit, requirement, lens output).
- An admin "Recommendation quality" page: acceptance rate, override reasons, outcome success by path, and feedback trends.
- An exportable dataset (prompt, output, user correction, outcome) for evaluation or fine-tuning, subject to tenant opt-in.

### 4.11 Collaboration, notifications and integrations

- Roles: Owner/Admin, Editor (PM/ops), Contributor (submit signals, comment), Viewer, plus optional Reviewer (governance).
- Notifications (in-app, email, chat tool): assigned, mentioned, Waypoint changed, new signal on my initiative, initiative stale.
- Integrations: SSO/SCIM; issue trackers (create, link, sync status back); chat tools (capture signal, notifications, unfurl); docs and drive (import signal, export brief); calendar or meeting-notes tools (import notes as signals); webhooks; a public REST API with tokens; **an MCP server** exposing tools such as `create_signal`, `get_initiative`, `get_waypoint` and `list_patterns`, so external agents can use Wayfinder.

### 4.12 Demo / sandbox

- A one-click neutral demo workspace with 8–12 initiatives covering every next action, path, fit label and readiness state, written in **cross-industry language** (e.g. internal requests about reporting, approvals, onboarding, knowledge lookup, handoffs). No real or industry-specific organisations.
- A "reset demo" action.
- Clearly marked as sample data.

---

## 5. Non-functional requirements

| Area | Requirement |
|---|---|
| **Security** | OWASP ASVS L2; tenant isolation tests; encryption in transit and at rest; secrets in a vault; CSP; dependency scanning; SAST; signed uploads; malware scan on files |
| **Compliance** | Readiness for SOC 2 Type II; GDPR/CCPA (DPA, data export and deletion per user and tenant, data residency option on the enterprise tier); subprocessor list including LLM providers; AI usage disclosure |
| **Privacy for AI** | Per-tenant toggles: AI on/off, provider choice, BYO key, PII redaction, zero-retention providers only |
| **Audit** | Immutable audit log of create/update/delete, exports, permission changes and AI runs; exportable |
| **Performance** | p95 page load < 2 s on broadband; list views stay fast up to 10k initiatives per tenant; initial structuring result < 10 s, streamed progress for longer runs |
| **Reliability** | 99.9% target; graceful degradation when the LLM is unavailable (save the signal, queue analysis, notify); idempotent jobs; backups with PITR |
| **Accessibility** | WCAG 2.2 AA: keyboard navigation everywhere, `aria-pressed`/`aria-current`, focus management on route change, live regions, contrast-checked tokens, non-colour fit indicators |
| **Internationalisation** | All copy externalised; locale-aware dates; layouts that tolerate RTL (MAY defer actual translations) |
| **Responsive** | Fully usable down to 375px wide; signal capture optimised for mobile |
| **Observability** | Traces across API, queue and LLM; per-task latency, cost and error dashboards; alerting |
| **Cost control** | Token metering per tenant; caching of lens and analysis results per version; cheaper models for classification tasks |

---

## 6. Commercial readiness

- Plans: Free/Trial (limited initiatives, shared AI quota), Team, Business (SSO, integrations, custom lenses), Enterprise (SCIM, data residency, BYO model, audit export, SLA).
- Usage-based AI add-on or fair-use limits; billing via a payment provider; seat management.
- Marketing site with positioning ("from scattered requests to the right next step"), interactive demo, pricing, security page, docs, changelog.
- In-app onboarding checklist, tooltips for vocabulary, a help centre, support contact.
- Product analytics events: signal_created, initiative_created, waypoint_generated/accepted/overridden, lens_applied, requirement_accepted, export_created, handoff_created, outcome_recorded.
- Legal: ToS, Privacy Policy, DPA, AI terms, cookie consent.

---

## 7. Quality engineering

- Unit tests (logic, schema validators, rule fallbacks); component tests (Testing Library); E2E tests (Playwright) for intake → initiative → lens → export → handoff; tenant-isolation tests; accessibility checks (axe) in CI; visual regression for the design system.
- **LLM evals:** a golden set of neutral initiatives with expected next action, path set and readiness; run on every prompt or model change; track accuracy and regressions. The rubric checks for "didn't jump to AI", "stated what would change it", and "only relevant paths".
- CI/CD: lint, type-check (the current repo would fail this), test, build, preview deploys per PR, migrations, staged rollout with feature flags.

---

## 8. Phased roadmap

### Phase 0: Stabilise the prototype (≈1 week)
- Fix B1 (build), B2 (keyword boundaries), B3/B4 (sorting), B5 (attach without a draft), B12 (fit visuals).
- Unify tokens, remove dead code and assets, set title and favicon.
- Split `App.tsx` into feature modules; add a router.
- Replace the domain seed data with a neutral demo dataset.
- **Accept when:** `npm run build`, lint and type-check pass in CI; the neutral demo is deployed; every page is deep-linkable.

### Phase 1: MVP SaaS (core loop, single tenant per account)
- Backend, Postgres, auth (email + Google/Microsoft OIDC), the target data model, CRUD for signals and initiatives, standalone signal inbox, editable everything, versioned Waypoint.
- LLM pipeline: `structure_signal`, `match_initiative`, `scope`, `recommend`, `solution_fit`, `requirements`, `lens_eval` (all eight lenses).
- Readiness, status, scoping table, full Waypoint fields, Not-recommended-yet, outcomes.
- Home "needs action" rules, list filters and sorts, patterns via tags.
- Export brief (MD/PDF). Basic roles. Audit log.
- **Accept when:** a new user can paste a signal and, in under a minute, get an editable initiative with readiness, Waypoint, relevant paths, requirements and all eight lenses; attaching a new signal triggers re-analysis with a visible diff; every generated field shows its source and can be overridden.

### Phase 2: Team and integrations
- Multi-user workspaces, comments, mentions, notifications, issue-tracker handoff, chat capture, file upload with extraction, CSV import, email-in.
- Patterns with embeddings, clustering and trends; playbooks CRUD plus AI suggestions; methodology reference.
- Tenant onboarding and taxonomy admin; custom lenses.
- Feedback capture; recommendation-quality dashboard; LLM eval suite in CI.
- Billing and plans.
- **Accept when:** a team of five can run their intake process in Wayfinder end to end and hand off to their tracker; pattern pages link to initiatives; admins can configure taxonomy without code.

### Phase 3: Enterprise
- SSO SAML, SCIM, RBAC with a reviewer/governance role and review triggers (e.g. AI on sensitive data → requires review), data residency, BYO model/key, PII redaction, audit export, SOC 2.
- Public API, webhooks, MCP server; connectors to docs/drive and meeting-notes tools.
- Prompt and skill-file management UI; fine-tuning dataset export.
- **Accept when:** passes a standard enterprise security review; admins can prove tenant isolation and AI data handling.

### Phase 4: Intelligence compounding
- Outcome-weighted recommendations (paths that worked for similar initiatives are surfaced with evidence); proactive alerts ("three new signals match a stalled initiative"); portfolio-level suggestions; cross-initiative dependency mapping; benchmark insights (opt-in, anonymised).
