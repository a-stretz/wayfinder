# 04: Logic and Algorithms (as built)

This document lists every piece of behavioural logic in the prototype, exactly as it runs today, with notes on what each piece should become.

## 1. State model (root `App`)

| State | Type | Purpose |
|---|---|---|
| `activePage` | `'home' \| 'initiatives' \| 'intake' \| 'patterns' \| 'playbook'` | Current page |
| `addedInitiatives` | `Initiative[]` | Initiatives created through intake this session (newest first) |
| `signalAdditions` | `Record<initiativeId, Signal[]>` | Signals attached this session, keyed by initiative |
| `selectedInitiativeId` | `string \| null` | When set, the detail view replaces the page |

**Derived:** `allInitiatives = [...seedInitiatives, ...addedInitiatives]`, with each initiative's `rawSignals` extended by `signalAdditions[id]` (memoised). Added initiatives therefore always come **after** the seed data, so they never appear in Home's "top 3".

Local state per page: the queue keeps search and three filters; the detail view keeps the selected lens and the attach-form fields; intake keeps the `DraftSignal` form, the generated `StructuredDraft`, and a confirmation message. All of it resets on navigation (unmount) or refresh.

**Rebuild:** a server is the source of truth, with a client query cache (e.g. TanStack Query) and URL-addressable routes (`/initiatives/:id#lens`). Filter state belongs in query params.

## 2. Utility functions

| Function | Behaviour |
|---|---|
| `getLensLabel(lens)` | Maps the canonical lens name to its display label, falling back to the name |
| `getFitClass(fit)` | Lowercase slug for the CSS class (`Strong` → `strong`) |
| `truncate(s, n=168)` | If longer than `n`, cuts to `n`, trims, and appends `...` (may cut mid-word) |
| `toSentence(items)` | Comma-join, or "None captured yet" |
| `getTopCounts(items, limit=6)` | Frequency count of exact strings; sort by count desc, then label asc; take `limit` |
| `countBy(items, fn)` | `getTopCounts(items.map(fn), items.length)`, i.e. unlimited |
| `aggregatePatterns(initiatives)` | `getTopCounts` over six flattened pattern lists (pain, blockers, data issues, systems, similar initiatives, requirement patterns) |
| `getRequirementHighlights(i)` | Flatten Business → Workflow → Success Metrics requirements, take the first four texts |
| `emptyRequirementsByCategory()` | All eight categories → `[]` |

## 3. Core behaviours

### 3.1 Queue filtering

```
match = lower(title + " " + problemSummary).includes(lower(search))
     && (dept   == "All" || initiative.department          == dept)
     && (action == "All" || initiative.recommendedNextAction == action)
     && (path   == "All" || initiative.primarySolutionPath   == path)
```

Results keep array order. There is no sort and no ranking.

### 3.2 Intake structuring heuristic (`generateDraft`)

This is the only "intelligence" that runs at runtime. It concatenates `title + rawInput + notes`, lowercases the result, and applies four rules **in order, with the last match winning**:

| Order | If text contains any of | → Next action | → Primary path |
|---|---|---|---|
| default | (none) | Run Discovery | Process Improvement |
| 1 | `report`, `visibility`, `dashboard`, `status` | Create Reporting View | Reporting / Visibility |
| 2 | `automate`, `handoff`, `routing` | Map Workflow | Workflow Automation |
| 3 | `ai`, `summary`, `idea` | Assess AI Fit | AI-Assisted Workflow |
| 4 | `data`, `field`, `source` | Validate Data | Reporting / Visibility |

**Supporting paths:** always the first three entries of the solution-path enum, excluding the primary and "Defer / Revisit". The input text plays no part in choosing them.

**Draft defaults:** title falls back to "Untitled Operational Signal"; summary falls back to "A rough operational signal needs discovery before the right solution path can be selected."

**Known defects:**
- Plain substring matching causes false positives. `ai` matches "email", "detail", "maintain", "said", "wait"; `source` matches "resource"; `status` and `report` fire on incidental mentions.
- Last-match-wins means that any text mentioning "data" overrides everything else.
- There is no readiness, no fit assessment, no requirements extraction, and no matching against existing initiatives.

**Rebuild:** replace this with an LLM structuring call that returns schema-validated JSON (see 07, section 4.3). Keep a deterministic fallback for offline or no-key mode, using token or regex word boundaries and weighted scoring in place of last-match-wins.

### 3.3 Creating a signal (`createAttachedSignal`)

```
id             = "signal-" + Date.now() + "-" + random5
source         = title.trim() || "Added Signal"          // ← free text into a typed union: BUILD ERROR
summary        = rawInput.trim() || "Additional signal added for review."
observedImpact = join(" | ", [
                   departments.length ? "Departments: " + departments.join(", ") : "",
                   notes.trim() || "Impact and urgency should be clarified during discovery."
                 ].filter(nonEmpty))
```

From the detail page, the title is the fixed "Initiative Signal" and the departments are the initiative's own.

### 3.4 Building an initiative from a draft (`createInitiativeFromDraft`)

These are generic template defaults and worth keeping as the "blank initiative" scaffold:

- `id = "local-" + Date.now()`. Department = first selected. Problem summary from the draft.
- `contextSummary`: "This initiative was created through the simulated intake flow. It should be reviewed, scoped, and refined before any delivery path is chosen."
- `scopingAnalysis`: "The draft should be reviewed for workflow ownership, source data readiness, expected users, and the first useful operating output."
- **Solution paths:** the primary at fit **Good** ("Suggested by the simulated intake template based on the signal language."), and each supporting path at **Possible** ("Potential supporting path once discovery clarifies workflow, data, and ownership."). A new initiative never gets "Strong".
- **Requirements** (three seeds):
  - Business: "Clarify the operating problem and intended business outcome."
  - Workflow: "Identify the current workflow, owners, handoffs, and decision points."
  - Success Metrics: "Define what a useful first outcome should make easier to see, decide, or do."
  - `requirementsBySolutionPath` = `{ [primary]: same requirements }`.
- **Target state:** "The issue is shaped into a clear initiative with a recommended next action, candidate path, and enough context for practical follow-up."
- **Future scope:**
  - later capabilities: requirements mapping, decision-priority review, playbook alignment
  - deferred: persistence, automated analysis, integrations
  - dependencies: workflow owner, source context, discovery conversation
  - revisit triggers: repeated signals, ownership clarified, data source validated
- **Pattern learning (`createPatternLearning`):** generic intake-stage defaults, e.g. pain "Unstructured signals need a clear routing path"; blockers "Incomplete source context", "Unclear next-step owner"; systems "Email", "Spreadsheets", "Meetings"; requirement pattern "Problem, owner, workflow, data source, next action"; successful approach "Structure the signal before choosing a build path"; failed approach "Moving directly from idea to implementation"; discovery gap "Who owns the workflow and where the source signal lives"; ownership problem "Submitter and accountable owner may differ".
  - Side effect: every intake-created initiative pushes "Email/Spreadsheets/Meetings" into the pattern counts, which inflates them.
- **Lens behaviours (three generated):**
  - *Fastest Useful Output*: unchanged. Emphasis: keep the first step small; question: "What useful output could be created first?"
  - *Operational Stability*: unchanged. Emphasis: clarify owners, handoffs and cadence before tooling.
  - *AI Leverage*: **changed unless the primary is already AI-Assisted Workflow**, in which case the next action becomes "Assess AI Fit". Emphasis: "Evaluate whether AI helps the workflow or only adds novelty."

This is the only place where lens output is *computed* rather than authored, and it shows the intended rule: **a lens changes the recommendation only when its priority conflicts with the current path**.

### 3.5 Decision lens evaluation

- Lookup only: `initiative.decisionLensBehaviors.find(b => b.lens === selected)`.
- Chips without a behaviour are disabled.
- Display rule: if `recommendationChanged === false`, show the steady-state explanation. This is the product's key UX statement: *lenses are allowed to not change the answer.*

**Rebuild:** compute every lens on demand from (initiative state × lens definition) using an LLM with a rubric, cache the result per analysis version, and allow tenant-defined lenses with a name, purpose and guidance prompt. Each lens definition should declare which paths it favours or disfavours, so that a deterministic fallback can work out `recommendationChanged`.

### 3.6 Implied recommendation rules (from the seed data and spec)

The prototype authors recommendations by hand. A rules engine or LLM rubric in the rebuild should encode these consistent heuristics:

1. Unclear problem or solution-first phrasing → **Run Discovery**.
2. Process, ownership, or handoffs unknown → **Map Workflow**, with primary path **Process Improvement**.
3. Visibility is the need but fields, statuses or sources are inconsistent → **Validate Data** before **Create Reporting View**.
4. Visibility is the need and the data is trusted → **Create Reporting View**.
5. Need is known but required fields or format are undefined → **Define Requirements**, with a Lightweight Prototype often rated Good.
6. Narrow, structured, reversible scope → **Build Prototype**.
7. AI is requested → **Assess AI Fit**, never build AI directly. AI-Assisted is usually "Later" until schema, governance and review are defined.
8. Automation comes only after ownership and source of truth are stable. Until then it is usually rated "Possible".
9. Formal Engineering is "Later" until the workflow has been validated.
10. Idea and request overload → Knowledge / Memory Layer plus structured intake.
11. Always say what would change the recommendation.

### 3.7 Pattern aggregation

Pattern aggregation counts exact strings across all initiatives (seed plus session). The top six per category are shown on the Patterns page and the top four on Home. Nothing is normalised, clustered or linked back to source initiatives.

**Rebuild:** normalised tags, with embedding-based clustering for near-duplicates; counts that link through to the contributing initiatives; trends over time; pattern → playbook suggestions.

### 3.8 Navigation side effects

- Adding an initiative from intake → navigate to Initiative Queue.
- Attaching a signal from intake → stay on the page and show a confirmation.
- Attaching a signal from detail → the list updates immediately; nothing is re-analysed.
- The detail view's lens selection is not reset when signals are added.

## 4. Things the prototype implies but does not do

- Re-analysis when signals are added ("would refresh requirements, priority, and recommendation logic").
- Similar-initiative matching on intake.
- Outcome capture feeding back into patterns and playbooks.
- Readiness assessment that gates which actions are allowed (e.g. Prepare Engineering Handoff only at Engineering Ready).
