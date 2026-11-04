# 03: Features and Screens (as built)

Every screen lives in `src/App.tsx`. Component names are given in `code`. Copy is quoted where it carries product meaning. Domain-specific example text is replaced with `[example]`.

## Global shell (`App`)

**Layout:** a two-column CSS grid: a 292px sticky sidebar plus the main surface. The sidebar narrows to 240px at ≤1180px and stacks above the content at ≤820px, where the nav becomes a two-column grid.

**Sidebar:**
- Brand lockup: rounded square "W" mark, "Wayfinder", and the subtitle "Strategy intelligence".
- Primary nav, five buttons:

| Nav label | Page id | Spec name |
|---|---|---|
| Home | `home` | Wayfinder (Home) |
| Initiative Queue | `initiatives` | Initiatives |
| Add Signal | `intake` | Intake |
| Pattern Intelligence | `patterns` | Patterns |
| Recommendation Playbook | `playbook` | Playbook |

- The active nav item is highlighted. While an initiative detail is open, **no** nav item is shown as active.
- Footer note: "Prototype mode: Local data, simulated structuring, no persistence."

**Navigation model:** clicking a nav item sets `activePage` and clears `selectedInitiativeId`. When `selectedInitiativeId` is set, the detail view replaces every page. There is no router: no URLs, no deep links, no browser back/forward, no refresh survival.

**Page header (`PageHeader`)** appears on every list page: the eyebrow "Wayfinder workspace", an H1 title, a purpose line, an optional primary action button, and a compass SVG logo (`WayfinderLogo`). Copy comes from the `pageCopy` table:

| Page | Purpose line | Primary action |
|---|---|---|
| Home | See the highest-priority initiatives, recommended next actions, and emerging operational patterns. | Add signal → opens intake |
| Initiative Queue | Search, filter, and open candidate workstreams for scoping and recommendation. | Add signal → opens intake |
| Add Signal | Convert a rough operational issue into a structured initiative draft. | Generate draft → runs heuristic |
| Pattern Intelligence | See repeated blockers, workflow gaps, data issues, and reusable solution patterns across initiatives. | (none) |
| Recommendation Playbook | Understand how Wayfinder routes work to practical solution paths. | (none) |

---

## 1. Home (`HomePage`)

Top to bottom:

1. **Page header.**
2. **Hero (`WayfinderHero`)**: a dark navy panel. This is a demo and marketing surface, not a data view.
   - Eyebrow "Strategic intelligence cockpit". Headline: "Wayfinder turns scattered operational demand into structured decisions, practical next actions, and recommended solution paths." Supporting line and an "Add Signal" CTA.
   - A four-step "How to use this demo" list: review top initiatives → open one → apply a lens → add a signal.
   - A **before/after panel** with columns "Raw request" and "Wayfinder output". Three hardcoded rows, each showing a solution-first request turned into a recommended action plus a one-line reason. The pattern is good to keep. The content is domain-specific.
   - An "Example recommended next action" card, hardcoded.
3. **"Recommended next moves"**: three priority cards. They are simply the **first three initiatives in array order**, not ranked. The first card is "featured": larger, with a 230-character summary versus 150. Each card shows a department chip, a next-action chip, the title, the truncated problem summary, and a "Recommended path" callout.
4. **Two-column grid:**
   - *Initiative Overview*: metric tiles for total initiatives and raw signals; count lists by department and by primary path.
   - *Emerging Patterns*: the top four each of pain patterns, common blockers and data-readiness issues, with counts.
5. **Two-column grid:**
   - *Recent Signals*: the first five signals in flattened array order, with summary, parent initiative title and department. These are **not** sorted by recency, because signals have no timestamps.
   - *Recommended Next Actions*: counts of initiatives per recommended action.

Gaps against the spec: no "initiatives needing action" logic, no readiness, no full solution-path distribution, no strategic summary based on status.

---

## 2. Initiative Queue (`InitiativesPage`)

- **Controls row:** a free-text search on title and problem summary (case-insensitive substring), plus three `FilterSelect` dropdowns: Department, Next action, Solution path. Each defaults to "All" and the filters combine with AND.
- **List:** each initiative is a full-row `<button>` containing a department chip, a primary-path chip, the title (an `h2` inside the button), the summary truncated to 210 characters, and a right-aligned "Next action" block. Clicking a row opens the detail view.
- **Empty state:** "No initiatives match these filters / Adjust the search text or filters to broaden the initiative queue."
- Missing against the spec: status, readiness, fit label, owner, last updated, signal count, sorting, pagination, saved views, bulk actions.

---

## 3. Initiative Detail (`InitiativeDetail`)

A full page, as the spec requires (not a modal). Actual section order:

1. **Back button**: "Back to Initiative Queue". It clears the selection and returns to whichever page was active.
2. **Detail header**: the department as eyebrow, the title as H1, and the problem summary.
3. **Problem understanding**: a four-card grid.
   - *Problem* (the primary card) has the fixed heading "What needs to be understood before choosing the path?" and shows `contextSummary`.
   - *Current understanding* shows `scopingAnalysis`.
   - *Key objective* shows `targetState`.
   - *Requirement signals* shows up to four requirement texts, taken in order from Business, Workflow and Success Metrics. Fallback: "No candidate requirements captured yet."
4. **Recommended Path** (the Waypoint): the primary solution path as H2, a rationale (the primary path's `rationale`, falling back to `scopingAnalysis`), and a highlighted "Recommended next action" block.
5. **Decision brief**: the heading "Start with the problem, then scan the decision support only as needed." and four in-page anchor links: Signals, Prioritization lens, Solution options, Supporting detail.
6. **Initiative signals** (`#initiative-signals`): a list of attached signals (source label plus summary) next to an attach form.
   - Fields: "New signal or context" textarea (required, must be non-blank) and "Optional impact / notes" input.
   - Submitting appends a signal (see 04, section 3.3) and clears the form. Explanatory copy says that in the full product, new signals would refresh requirements, lens and recommendation. Today, nothing is recomputed.
7. **Prioritization lens** (`#prioritization-lens`): an explainer plus eight lens chips using display labels. A chip is **disabled** when the initiative has no precomputed behaviour for that lens, which in the seed data means five of eight.
   - Before any selection: "Select a prioritization lens to see how it changes emphasis."
   - After selection, the output panel shows the lens chip and "Recommendation changed: Yes/No". If No, it adds a steady-state note ("The recommendation stays the same. The prioritization lens changes emphasis, tradeoffs, and follow-up questions."), followed by five lists: Current recommended next action, Emphasis changes, Paths affected, New questions to ask, Future direction.
   - Lenses can't be deselected. Only one is active at a time.
8. **Solution options** (`#solution-options`): a grid of path cards, each with a fit chip, a "Recommended" badge on the primary, the path name and its rationale.
9. **Supporting detail** (`#supporting-detail`): four native `<details>` disclosures.
   - *Candidate requirements map* (open by default): eight category cards, each listing requirement and rationale, or "No candidate requirements yet."
   - *Requirements by path*: one card per path with a compact requirements grid that hides empty categories.
   - *Future scope*: a Target State panel plus lists of Later capabilities, Deferred requirements, Dependencies and Triggers to revisit.
   - *Pattern learning*: all 11 pattern lists.

Missing against the spec: an editable target state; header metadata (status, readiness, owner, stakeholders, systems, dates); requested solution; root-cause hypothesis; a structured scoping table; Waypoint sub-fields (expected output, decision enabled, what would change it); per-path requirements, risk and relationship fields; "Not recommended yet"; outcome notes; export or share; edit anything; comments; history.

---

## 4. Add Signal / Intake (`IntakePage`)

Two-column layout: the form on the left, a "Simulated structuring" draft panel on the right.

**Form:**
- Intro: "Paste the rough issue, request, note, or idea." plus an `[example]` prompt.
- **Mode toggle:** "Create new initiative" | "Attach to existing initiative". In existing mode, a dropdown of all initiatives appears (defaulting to the first).
- *Title* (optional).
- *Departments involved*: a multi-select chip grid. At least one chip always stays selected, because deselecting the last one re-selects it. Helper text: "Primary department for new initiatives: {first selected}".
- *Raw input / signal*: an eight-row textarea (optional; the code supplies a default).
- *Optional tags or notes*: an input.
- A "Generate draft" submit button. The header button does the same thing.

**Draft panel:**
- Before any draft: "No draft generated yet / Add a signal and generate a structured initiative draft."
- After a draft: a "Structured initiative draft" chip, the title, the summary, and fields for Departments involved, Recommended next action, Recommended solution path and Supporting solution paths.
- In new mode: "Add to Initiative Queue" builds a full initiative (see 04, section 3.4), adds it, and **navigates to the Initiative Queue**.
- In existing mode: "Attach Signal to Initiative" appends the signal to the chosen initiative, shows "Signal attached to {title}.", and clears the raw input and notes. **A draft must be generated before attaching is possible**, even though the draft output is irrelevant when attaching.

Missing against the spec: source-type selection, file upload, a preview of the suggested initiative match, a duplicate warning, a preview of requirements, editing the draft before saving, a signal inbox.

---

## 5. Pattern Intelligence (`PatternsPage`)

- A page note explains that patterns reveal where standard solutions or playbooks should exist.
- Six `PatternCluster` cards: Repeated Pain Patterns, Common Blockers, Data Readiness Issues, Recurring Systems, Similar Initiatives, Reusable Requirement Patterns. Each shows the top six items with counts, and a header total that is the **sum of the top six counts**, not the overall total.
- Includes initiatives added locally during the session.
- Not aggregated, although the data exists: solution paths chosen, successful approaches, failed/deferred approaches, discovery gaps, ownership problems. Missing against the spec: solution-path trends, stakeholder/ownership gaps, drill-down from a pattern to its initiatives.

---

## 6. Recommendation Playbook (`PlaybookPage`)

- A page note: "Playbooks provide repeatable approaches to common operational problems."
- **Three hardcoded playbook cards.** These are generic and can serve as seed templates:

| # | Title | When to use | First actions | Typical paths | Common risks |
|---|---|---|---|---|---|
| 01 | Workflow Visibility Gaps | Critical work is happening across email, spreadsheets, meetings, and personal tracking habits | Map Workflow; Define ownership; Create a shared operating view | Process Improvement; Reporting / Visibility | Automating before ownership is clear; Confusing reporting with process control |
| 02 | Data Readiness Before Reporting | Teams need visibility but source fields, status language, or ownership are inconsistent | Validate Data; Normalize status definitions; Confirm trusted fields | Reporting / Visibility; Workflow Automation | Building dashboards from unreliable fields; Skipping source-of-truth decisions |
| 03 | Structured Intake and Memory | Ideas, requests, and issues are appearing faster than they can be routed | Run Discovery; Define intake fields; Route to the right solution path | Knowledge / Memory Layer; Lightweight Prototype; AI-Assisted Workflow | Letting informal ideas become ungoverned work; Treating AI as the default answer |

- A footer band reads "Current playbook logic is informed by {N} initiatives and recurring patterns such as {top pain 1} and {top pain 2}." Only this sentence is dynamic. The playbooks are not derived from data.
- Missing against the spec: explainers for solution paths, fit labels, readiness states, requirement categories, lenses, Waypoint logic and the pattern-learning model. The spec intended the Playbook to double as the product's methodology reference.

---

## 7. Shared presentational components

| Component | Role |
|---|---|
| `InsightPanel` | A card with an eyebrow and H2, wrapping children |
| `CountList` | A titled list of label/count rows |
| `DetailList` | A titled bullet list with the fallback "None captured yet." |
| `RequirementsGrid` | Eight category cards; the `compact` variant hides empty categories; strips " Requirements" from headings |
| `FilterSelect` | A labelled `<select>` |
| `PatternCluster` | A pattern card with a header total and item counts |
| `WayfinderLogo` | An inline compass SVG |
