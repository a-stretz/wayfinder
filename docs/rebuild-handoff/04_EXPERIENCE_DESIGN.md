# 04: Experience Design

## 1. Information architecture

| Area | Purpose |
|---|---|
| **Home** | Strategic control surface: what needs attention, what's recommended, what keeps recurring, what just came in |
| **Initiatives** | Find, filter and open initiatives |
| **Initiative workspace** | The full-page home of a single initiative |
| **Add Signal / Intake** | Capture raw input; create a new initiative or attach to an existing one |
| **Signal Inbox** | Unrouted signals awaiting triage, with suggested matches |
| **Patterns** | What recurs across the organisation |
| **Playbook** | Reusable guidance, plus an explanation of how Wayfinder thinks |
| **Settings** | The organisation's vocabulary, lenses, people, integrations |

## 2. Home

- **Recommended next moves:** the initiatives that most need a decision. A featured card leads, showing area, next action, title, short problem summary, and recommended path. "Needs attention" is decided by explicit, explainable rules (e.g. new and unassessed, recently became ready, stalled, many new signals, recommendation awaiting acceptance), never by a hidden score.
- **Operating picture:** counts by readiness, status, primary path, next action and area.
- **Emerging patterns:** the most frequent pains, blockers and data issues, with trend.
- **Latest signals:** newest first.
- **Next-action mix:** how many initiatives sit at each recommended action.

### Signature pattern: "Raw request → Wayfinder output"
A two-column before/after explainer. On the left, a solution-first request as people actually phrase it. On the right, the recommended action in bold with a one-line reason. Three example rows usually suffice: one that becomes *Map Workflow first*, one that becomes *Assess AI Fit*, and one where the answer really is *Build Prototype* (showing that Wayfinder says yes when it is the right moment). This communicates the whole product in seconds. Use it for onboarding, empty states and marketing, with neutral examples.

A short "how to use" sequence complements it: review recommended initiatives → open one → apply a lens → add a signal.

## 3. Initiatives list

Search across titles, problems and signals. Filter by area, status, readiness, next action, primary path, owner, and recency. Each row shows area, primary path, title, short problem, next action, readiness, owner, last updated, and signal count. A helpful empty state suggests broadening the filters.

## 4. The initiative workspace

A full page, never a modal or drawer. Its layout follows one idea: **"Start with the problem, then scan the decision support only as needed."**

Recommended order:

1. **Header:** area, title, problem summary, plus status, readiness, owner.
2. **Problem understanding** (a compact card group):
   - *Problem*, led by the prompt "What needs to be understood before choosing the path?" and the context
   - *Current understanding*: the scoping summary
   - *Key objective*: the target state
   - *Requirement signals*: the three or four most important emerging requirements (business, workflow, success)
3. **Recommended path (the Waypoint):** primary path, reasoning, and a visually emphasised "Recommended next action". This is the most prominent element on the page.
4. **Decision brief:** quick-jump links to Signals · Lenses · Solution options · Supporting detail.
5. **Signals:** what informs this initiative, plus an inline form to add new context ("Paste an update, meeting note, stakeholder concern, source detail, or workflow discovery note", with optional "why this changes urgency, scope, risk, or ownership"). Adding a signal can trigger re-assessment, showing what changed.
6. **Decision lenses:** the prompt "Are there unique prioritisation factors here that may influence the recommendation?", then all lenses as selectable chips. Before a selection: "Select a lens to see how it changes emphasis." After: "Recommendation changed: Yes/No", the steady-state message when No, and the five output lists.
7. **Solution options:** a card per relevant path with fit label, a "Recommended" badge on the primary, and its reasoning, requirements, risk, and relationship to the Waypoint.
8. **Supporting detail**, using progressive disclosure:
   - *Candidate requirements map* (open by default): "Open when the recommendation needs to become scoped delivery work."
   - *Requirements by path*: "How solution choices change the work."
   - *Target state and future scope*: "Keep the future visible without forcing every detail into the primary decision view."
   - *Pattern learning*: "Signals this initiative contributes."
9. **Outcome**, once available.

**Order rationale:** the original spec placed the Waypoint *after* context, signals and scoping, so the reader sees the evidence first. The prototype moved it earlier, after a compact problem summary, so the decision is visible immediately and the evidence is one scroll or click away. The recommendation-early layout reads better for executives. Either is defensible; choose deliberately.

## 5. Intake

- One clear instruction: "Paste the rough issue, request, note, or idea."
- A mode switch: **Create new initiative** / **Attach to existing initiative**.
- Fields: title, areas involved (multi-select; the first chosen is primary), source type, raw input, optional notes, optional attachment.
- A live **structured draft** beside the form: title, problem summary, areas, readiness, recommended next action, recommended path, supporting paths, likely matches with existing initiatives, starter requirements. The user can edit it before saving.
- Attaching to an existing initiative should not require generating a new-initiative draft.
- Honest framing: say clearly what is automated and what is a suggestion.

## 6. Patterns

Grouped clusters (pain patterns, blockers, data readiness issues, recurring systems, similar initiatives, reusable requirement shapes, ownership gaps, path trends), each with counts and trend, and each linking to its initiatives. Framing line: "Patterns show where problems repeat across the organisation, which helps identify where standard solutions or playbooks should exist." Offer "Create playbook from this pattern".

## 7. Playbook

Numbered playbook cards (01, 02, 03…), each with *when to use*, *recommended first actions*, *typical paths* and *common risks*. Beneath them, a band that ties the guidance to evidence ("Informed by N initiatives and recurring patterns such as…"). Plus a methodology section explaining paths, fit, readiness, lenses and Waypoint logic.

## 8. Visual and tonal direction

**Tone:** calm, structured, serious, executive-readable, focused on product operations. Strong whitespace, clear labels, subtle status colour.

**Avoid:** futuristic "AI" styling, neon, heavy icon use, overdone map or compass metaphors, dense dashboards, fake complexity, numbers that imply more precision than the evidence holds.

**Brand palette:**

| Role | Colour |
|---|---|
| Primary accent (dominant) | `#ee8922` warm orange |
| Main dark | `#0a1045` deep navy |
| Supporting green | `#73937e` sage |
| Supporting red | `#a12523` brick |
| Supporting mauve | `#8e6c88` plum |

Supporting tints: a soft peach for accent chips; a warm off-white or cream for backgrounds.

**Look and feel established in the prototype:**
- Deep-navy navigation rail with a subtle warm glow; the active item marked with an orange edge.
- Light, warm page background; white rounded cards with soft shadows.
- Small uppercase "eyebrow" labels above section titles: a consistent way to name what each block is.
- Pill-shaped chips for area, path and next action.
- A dark navy emphasis panel for the most important statement on a page (the hero, the Waypoint).
- A simple compass mark as the logo (ring, cardinal lines, arrow), used sparingly.

**Fit label treatment:** five clearly distinct states, each with label text plus a non-colour cue. Strong is the most prominent, ideally with the primary accent. Good is green. Possible and Later are cautionary but distinguishable from each other. Poor is red and used rarely.

**Accessibility:** fully keyboard operable; selected and current states announced; confirmations announced; contrast that meets recognised standards; nothing communicated by colour alone; works on phone-sized screens, especially signal capture.
