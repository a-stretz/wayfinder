# 06: Gap Analysis

Legend: ✅ built · 🟡 partial · ❌ missing · ⚠️ built but diverges from the spec

## 1. Spec vs. built matrix

### Object model

| Spec item | Status | Notes |
|---|---|---|
| Initiative as central workspace | ✅ | Full-page detail |
| Signal model with source, date, raw input, file ref, extracted pains/systems/stakeholders, suggested match, new-vs-attached | 🟡 | Only id, source, summary, observedImpact. Embedded in initiatives |
| Initiative fields: ID, title, objective, department, workflow area, status, readiness, owner, stakeholders, systems, created/updated, context, problem, requested solution, root cause, next action, Waypoint rationale, primary path, relevant paths, requirements (candidate + by path), target state, future scope, signals, patterns, outcome learning | 🟡 | Missing: objective/subtitle, workflow area, status, readiness, owner, stakeholders, systems, dates, requested solution, root-cause hypothesis, dedicated Waypoint rationale, outcome learning |
| Readiness states (6) | ❌ | |
| Lifecycle status (8) | ❌ | |
| Scoping analysis across 8 dimensions, qualitative | ⚠️ | One free-text paragraph |
| Waypoint: action, why, what it produces, decision it enables, what would change it | 🟡 | Action plus a rationale borrowed from the primary path |
| Solution path fields: name, fit, why, what it requires, key risk, relationship to Waypoint | 🟡 | Name, fit, rationale only |
| Fit label visuals (green/yellow/red) | ⚠️ | Navy/sage/peach/grey; Later = Poor |
| Decision lens output (7 fields) | ✅ | For precomputed lenses only |
| All 8 lenses usable on every initiative | ❌ | 3 of 8 per initiative; the rest disabled |
| Candidate requirements (8 categories) | ✅ | |
| Requirements by solution path | ✅ | |
| Target state, **editable** | ⚠️ | Read-only |
| Future scope incl. "Not Recommended Yet" | 🟡 | Missing that list |
| Pattern learning (12 types incl. model feedback) | 🟡 | 11 stored per initiative; 6 aggregated; no feedback |
| Outcome notes | ❌ | |

### Screens

| Spec item | Status | Notes |
|---|---|---|
| Home: summary cards, priority Waypoints, patterns, path distribution, recent signals, needing action | 🟡 | "Priority" = first three in array; recent ≠ by time; no "needing action" logic |
| Initiatives: search, filters, status, readiness, next action, path, fit, dept, owner, updated, signal count | 🟡 | Search plus three filters; shows dept, path, action only |
| Intake: new vs attach, paste, context fields, upload, source type, preview signal, preview match, preview requirements and action | 🟡 | No upload, source type, match preview or requirements preview |
| Patterns: pains, blockers, path trends, requirement patterns, similar, data readiness, ownership gaps | 🟡 | No path trends or ownership gaps; no drill-down |
| Playbook: explains paths, fit labels, readiness, req categories, lenses, Waypoint logic, learning model | ⚠️ | Three hardcoded playbooks instead |
| Detail section order: header → context → inputs → scoping → Waypoint → map → lens → reqs → reqs-by-path → future → patterns → outcome | ⚠️ | Waypoint comes *before* signals and lens; scoping merged into the problem cards (a deliberate redesign: recommendation earlier, detail behind disclosures) |

### Product quality expectations from spec §26

| Item | Status |
|---|---|
| Clear architecture | ⚠️ Single 1,381-line component file |
| Reusable data model | 🟡 Types are good; embedding and strings limit reuse |
| Synthetic dataset import/mapping | ❌ |
| LLM connector strategy | ❌ |
| API / MCP connector strategy | ❌ |
| GitHub repo | ✅ |
| Netlify deployment | ❌ No config |
| README / user guide / demo strategy / test plan | 🟡 Present but drifted (see section 4) |
| Demo data reset | ❌ (refresh resets by accident) |
| Simulated-vs-functional explanation | ✅ Sidebar note, README |
| Roadmap | ❌ |

## 2. Confirmed bugs

| # | Severity | Location | Issue |
|---|---|---|---|
| B1 | **Blocker** | `src/App.tsx:105` | `npm run build` fails: `source: signal.title.trim() \|\| 'Added Signal'` assigns `string` to the `SignalSource` union. The app runs in dev (Vite skips type-checking) but cannot produce a production build |
| B2 | High | `generateDraft` | Substring keyword matching gives false positives (`ai` ⊂ "email", "detail", "maintain"), and last-match-wins makes routing unpredictable |
| B3 | Medium | `HomePage` | "Recommended next moves" are just the first three array items. Newly added initiatives never appear there because they are appended after the seeds |
| B4 | Medium | `HomePage` | "Recent Signals" are not recent: array order, no timestamps |
| B5 | Medium | `IntakePage` | Attaching to an existing initiative requires generating an irrelevant draft first |
| B6 | Medium | `createPatternLearning` | Every intake initiative injects the same default patterns, inflating pattern counts |
| B7 | Low | `PatternCluster` | The header total sums only the top six items |
| B8 | Low | Supporting paths | Always the same first three enum entries, regardless of input |
| B9 | Low | Lens chips | Can't deselect; disabled with no explanation |
| B10 | Low | `truncate` | Cuts mid-word |
| B11 | Low | IDs | `Date.now()`-based IDs; requirement IDs can collide when two are created in the same millisecond |
| B12 | Low | Fit chips | Later and Poor render identically |
| B13 | A11y | Various | See 05, section 6 |

## 3. Technical debt

- All components, helpers and page logic live in one file. There are no hooks or services layer and no feature folders.
- Two conflicting CSS token sets. The CSS has accumulated "passes": duplicate selectors (e.g. `.recommendation-action`, `.lens-grid`, `.lens-chip`, `.detail-header`, `.insight-band`, `.page-note`, `.solution-card` are each defined more than once, with later rules overriding earlier ones) and a "Merged Wayfinder hero, Pass 12 visual system" block.
- Dead code: CSS for `.home-intro`, `.demo-steps`, `.connected-panel`; the unused export `wayfinderDataSummary`; the Vite template `public/icons.svg`; the default Vite `favicon.svg`; `<title>wayfinder</title>`.
- Seed content hardcoded in TypeScript, and hero and playbook copy hardcoded in components.
- Department taxonomy hardcoded as a TS `const` tuple, which bakes domain into types.
- No tests, no CI, no type-check in CI, no formatter config.
- `React.ReactNode` used without an import (works through ambient types, but is fragile).
- Package version `0.0.0`. Deps are cutting-edge majors (TS 6, Vite 8, ESLint 10); check stability before committing to them.

## 4. Documentation drift (docs vs. UI)

| Doc says | UI actually |
|---|---|
| Button "Structure Signal" | "Generate draft" |
| Button "Add to Initiatives" | "Add to Initiative Queue" |
| Section "Decision Priority" | "Prioritization Lens" |
| Intake has a "department" field (single) and "optional tags" plus "notes" | Multi-select departments; one combined "tags or notes" field |
| "Recommended Path appears immediately after the compact header" | The four-card problem-understanding grid sits in between |
| "If pattern data is sparse, a general discovery-first playbook appears" | Not implemented; playbooks are static |
| "Playbooks are generated from observed pattern themes" | Static content |
| Section order (header → context → inputs → scoping → recommended path…) | Reordered (see the matrix above) |
| Spec term "Waypoint" | UI says "Recommended Path" |

## 5. Content to exclude from the rebuild

- The entire seed initiative dataset in `src/data/wayfinderData.ts` (line 197 onward).
- Hero before/after examples and the example Waypoint card (domain-specific).
- Intake example prompt text (domain-specific).
- The department list (domain-specific).
- Core Spec §§19 (generic department name list), 24, 25 (industry examples), and any industry phrasing in §17's example.
- `Wayfinder Deep Research Prompt.txt` and `Wayfinder Adaptation Prompt.txt`, except as inspiration for a tenant-onboarding feature.
- The deleted `docs/company-adaptation-package/*` (removed in commit `23c98b9`; it is in git history but out of scope).
