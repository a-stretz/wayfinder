# 02: Domain Model

This document covers three things: (A) the controlled vocabularies, (B) the data model as built in `src/data/wayfinderData.ts`, and (C) the fuller model the spec calls for, combined into a proposed target schema for the rebuild.

---

## A. Controlled vocabularies

These are product-level enums. They do not depend on any domain, so the rebuild should keep them as system defaults and let tenants rename or extend them where noted.

### A1. Solution paths (8), when each one fits

| Path | Fits when… |
|---|---|
| Process Improvement | Ownership, handoffs, checklists, policies or workflow discipline need fixing |
| Reporting / Visibility | The main need is surfacing, monitoring, summarising or visualising known information |
| Workflow Automation | Repetitive routing, reminders, approvals, notifications, status updates or data movement |
| AI-Assisted Workflow | AI could summarise, classify, extract, draft, search, compare, reason or recommend |
| Lightweight Prototype | A narrow, low-risk tool could test value before formal investment |
| Formal Engineering | Reliability, integrations, permissions, scale, audit history or production support are required |
| Knowledge / Memory Layer | Repeated questions, scattered documents, unclear decisions, lost institutional context |
| Defer / Revisit | Not enough value, clarity, ownership, urgency, timing or feasibility |

### A2. Recommended next actions (10)

| Action | Meaning |
|---|---|
| Run Discovery | The problem is not clear enough yet |
| Map Workflow | The current process, ownership or handoffs need to be understood |
| Define Requirements | The problem is known but solution needs are not specific |
| Validate Data | Data sources, quality or access are uncertain |
| Build Prototype | A narrow, low-risk test could clarify value |
| Create Reporting View | Visibility is the main need and the data is available |
| Automate Workflow | Repetitive actions can be systematised |
| Assess AI Fit | AI may help, but use case, data, risk and review model need validation |
| Prepare Engineering Handoff | Scope is mature enough for formal delivery planning |
| Defer / Revisit | Not enough value, urgency, ownership or readiness |

### A3. Fit labels (5)

| Label | Spec visual | Prototype visual | Meaning |
|---|---|---|---|
| Strong | Green + primary-accent highlight | Navy chip, white text | Top recommended path |
| Good | Green | Sage chip | Viable and well supported |
| Possible | Yellow | Peach chip | Plausible, needs validation |
| Later | Yellow | Grey chip | Useful later, not first |
| Poor | Red | Grey chip (same as Later) | Not supported now. Use rarely, only to explain why a requested path is wrong |

Rule: show **only relevant paths**. Never pad to a fixed count. If no path fits, say so and recommend discovery, mapping, validation, or deferral.

### A4. Decision lenses (8)

| Canonical name (data) | Display label (UI) | Purpose |
|---|---|---|
| Fastest Useful Output | Quickest Delivery | Quick visible value |
| Low Engineering Lift | Easiest to Build | Little formal engineering |
| Safer First Step | Lowest Risk | Low-risk, reversible moves |
| Executive Visibility | Visibility | Leadership clarity and decision support |
| AI Leverage | AI Opportunity | AI-assisted opportunities |
| Operational Stability | Stability | Reliable, supportable approaches |
| Cost Sensitive | Cost Control | Avoid expensive or resource-heavy options |
| Scale Ready | Scalability | Durable solutions that can grow |

The display mapping lives in `lensDisplayLabels` in `App.tsx`. The rebuild should store one label per lens and allow tenant-defined custom lenses.

### A5. Requirement categories (8)

| Category | Purpose |
|---|---|
| Business Requirements | Desired business outcome and the decision it supports |
| User Requirements | What users need to do, know, submit, review, decide |
| Workflow Requirements | Steps, handoffs, triggers, approvals, exceptions, ownership |
| Data Requirements | Entities, fields, documents, sources, quality, cadence |
| System Requirements | Tools, integrations, permissions, environments, dependencies |
| AI / Automation Requirements | Classification, extraction, summarisation, generation, routing, review, confidence |
| Governance Requirements | Review rules, auditability, risk controls, escalation, compliance, support ownership |
| Success Metrics | How impact will be measured |

Depth target: **medium**. More specific than filler, far short of a PRD.

### A6. Readiness states (6). Specified, not implemented

| State | Meaning |
|---|---|
| Unclear | Vague, solution-first, or missing context |
| Problem Defined | The pain is clear; requirements or data are not ready |
| Requirements Emerging | Early requirements can be mapped; path not final |
| Prototype Ready | A narrow, low-risk test could validate |
| Engineering Ready | Scope, data, owners, risks and requirements are clear enough for formal planning |
| Defer / Revisit | Real, but timing, ownership, value or readiness is insufficient |

### A7. Initiative lifecycle status. Specified, not implemented

Newly discovered · Already known · Active · Stalled · Revisiting · Ready for prototype · Ready for engineering handoff · Deferred. These overlap with readiness. The rebuild should separate **status** (workflow position) from **readiness** (assessment).

### A8. Scoping dimensions (8). Specified, prototype uses a single free-text paragraph instead

| Dimension | Core question |
|---|---|
| Business Pain | Is there a real operational problem, or just a requested feature? |
| Workflow Clarity | Do we understand how the process works today? |
| Stakeholder Ownership | Who owns the problem, process, decision and outcome? |
| Data Readiness | Are inputs, sources, entities and quality issues known? |
| Requirement Clarity | Can early requirements be described? |
| Solution Fit | Which paths look viable? |
| Risk / Governance | What goes wrong if the solution is inaccurate, unsupported or poorly adopted? |
| Value Potential | What improves if this works? |

Allowed qualitative values: Clear · Partial · Unclear · High · Medium · Low · Needs validation. (The rebuild should split these into two scales: a clarity scale (Clear/Partial/Unclear) and a magnitude scale (High/Medium/Low), each plus "Needs validation".)

### A9. Signal source types

| Prototype `SignalSource` union (8) | Spec list (14) |
|---|---|
| Meeting Notes, File, Stakeholder Request, Pain Point, Workflow Issue, Dashboard, Prototype, AI Idea | Meeting note, Stakeholder request, Uploaded document, CSV import, Email excerpt, Existing project description, Dashboard request, Workflow complaint, Prototype idea, AI idea, Manual note, Roadmap item, Research finding, Support/operations issue |

Rebuild: use the spec list as the default, make it tenant-extensible, and separate **source type** (what kind of input) from **channel** (manual, upload, email, connector).

### A10. Functional areas / departments

The prototype hardcodes a six-value `departments` tuple drawn from its original demo domain. **This list must not carry over.** Departments, business units, and workflow areas should be tenant-configured taxonomy, set during onboarding.

---

## B. Data model as built

```ts
interface Signal {
  id: string
  source: SignalSource          // see A9; runtime code also writes free text here → type error
  summary: string
  observedImpact: string        // free text; intake writes "Departments: A, B | notes"
}

interface SolutionPathFit {
  path: SolutionPathOption
  fit: FitLabel
  rationale: string
}

interface RequirementItem {
  id: string
  category: RequirementCategory
  requirement: string
  rationale: string
}

type RequirementsByCategory   = Record<RequirementCategory, RequirementItem[]>       // all 8 keys always present
type RequirementsBySolutionPath = Partial<Record<SolutionPathOption, RequirementsByCategory>>

interface FutureScope {
  laterCapabilities: string[]
  deferredRequirements: string[]
  dependencies: string[]
  revisitTriggers: string[]
}

interface PatternLearning {
  repeatedPainPatterns: string[]
  commonBlockers: string[]
  similarInitiatives: string[]          // other initiatives' *titles* as plain strings, not IDs
  recurringSystems: string[]
  reusableRequirementPatterns: string[]
  solutionPathsChosen: SolutionPathOption[]
  successfulSolutionApproaches: string[]
  failedOrDeferredApproaches: string[]
  commonDiscoveryGaps: string[]
  dataReadinessIssues: string[]
  stakeholderOwnershipProblems: string[]
}

interface LensBehavior {
  lens: DecisionLens
  recommendationChanged: boolean
  currentRecommendedNextAction: RecommendedNextAction
  emphasisChanges: string[]
  pathsAffected: SolutionPathOption[]
  newQuestionsToAsk: string[]
  futureDirection: string
}

interface Initiative {
  id: string
  title: string
  department: Department                 // single value
  problemSummary: string
  contextSummary: string
  rawSignals: Signal[]                   // embedded, not referenced
  scopingAnalysis: string                // one paragraph, not the 8 dimensions
  recommendedNextAction: RecommendedNextAction
  primarySolutionPath: SolutionPathOption
  solutionPaths: SolutionPathFit[]
  candidateRequirementsMap: RequirementsByCategory
  requirementsBySolutionPath: RequirementsBySolutionPath
  targetState: string
  futureScope: FutureScope
  patternLearning: PatternLearning
  decisionLensBehaviors: LensBehavior[]  // precomputed per lens; seed data has 3 of 8 per initiative
}
```

### Seed data helpers (generic, worth keeping as patterns)

- `requirements(prefix, partialMap)` expands a sparse `{category: [[text, rationale], …]}` into a full `RequirementsByCategory` with deterministic IDs `${prefix}-${slug(category)}-${n}`.
- `pathRequirements(prefix, {path: partialMap})` does the same per solution path.
- `wayfinderDataSummary` holds counts of initiatives, signals and enums. It is exported but unused.

### Seed data shape (contents intentionally omitted)

Five hand-authored initiatives, each with 2–3 signals, 3–5 solution paths (exactly one Strong, and it matches `primarySolutionPath`), 5–6 populated requirement categories, 1–3 paths in `requirementsBySolutionPath`, 3–4 items per future-scope list, all 11 pattern-learning lists filled, and exactly 3 lens behaviours, of which exactly one has `recommendationChanged: true`. The content is domain-specific and is not part of this handoff. The rebuild needs a **neutral demo workspace** (see 07, section 4.12).

### Structural problems in the as-built model

1. Signals are embedded in initiatives. They can't exist on their own (an unrouted inbox), can't link to several initiatives, and can't be re-routed.
2. `similarInitiatives` holds title strings, not IDs, so the links can't be followed.
3. Lens behaviours are precomputed and stored. Five of eight lenses are unavailable per initiative.
4. There are no timestamps, owners, stakeholders, systems, status, readiness, version history or authorship anywhere.
5. Pattern items are free strings, so aggregation depends on exact text matches.
6. The Waypoint has no fields of its own. Its rationale is borrowed from the primary path's rationale.
7. Solution-path entries lack the spec's "what it would require", "key risk/unknown", and "relationship to current Waypoint".
8. `FutureScope` lacks `notRecommendedYet`.
9. There is no outcome-learning object.

---

## C. Proposed target schema (for the rebuild)

This is a relational sketch. Names are suggestions. Every table carries `tenant_id`, `created_at`, `updated_at`, `created_by`, and soft-delete where relevant.

```text
Tenant ──< Workspace ──< Initiative
Tenant ──< User (role per workspace)
Tenant ──< Taxonomy (functional_area | workflow_area | system | source_type | custom lens | custom solution path)

Signal  (standalone; may be unrouted)
  id, workspace_id, title, source_type, channel(manual|upload|email|connector|api),
  raw_content, summary, file_refs[], captured_at, submitted_by,
  extracted: { pain_points[], systems[], stakeholders[], requested_solution? },
  routing_status (unrouted|suggested|attached|dismissed), dedupe_cluster_id?

SignalInitiativeLink (many-to-many)
  signal_id, initiative_id, linked_by(user|model), confidence?, linked_at

Initiative
  id, workspace_id, title, objective/subtitle, functional_area_ids[], workflow_area_id,
  status (lifecycle), readiness_state, owner_id, stakeholder_ids[], system_ids[],
  problem_statement, context_summary, requested_solution?, root_cause_hypothesis,
  target_state (editable, versioned), primary_solution_path, current_waypoint_id,
  analysis_version, last_analyzed_at

ScopingAssessment (one row per dimension per analysis version)
  initiative_id, dimension, value, rationale, evidence_signal_ids[], source(model|user), version

Waypoint (versioned; one current)
  initiative_id, recommended_action, why, expected_output, decision_enabled,
  what_would_change_it[], generated_by(model|user|rule), model_run_id?, accepted_by?, version

SolutionPathAssessment
  initiative_id, path, fit, why_it_fits, what_it_requires, key_risk_or_unknown,
  relationship_to_waypoint, is_primary, version

Requirement
  id, initiative_id, category, solution_path? (null = candidate/general),
  text, rationale, priority(now|later|deferred), status(candidate|accepted|rejected), source(model|user)

FutureScopeItem
  initiative_id, kind(later_capability|deferred_requirement|dependency|not_recommended_yet|revisit_trigger), text

LensEvaluation (computed on demand, cached)
  initiative_id, lens_id, recommendation_changed, resulting_action, emphasis_changes[],
  paths_affected[], new_questions[], future_direction, model_run_id

PatternTag (normalised, tenant-wide)
  id, kind(pain|blocker|system|data_issue|requirement_pattern|discovery_gap|ownership_problem), label, embedding?
InitiativePatternTag (initiative_id, pattern_tag_id, source)

InitiativeRelation (initiative_a, initiative_b, kind(similar|duplicate|depends_on|supersedes), score?, source)

Outcome
  initiative_id, path_taken, action_taken, result(success|partial|failed|abandoned), notes, lessons[], recorded_at

Playbook
  id, title, when_to_use, first_actions[], typical_paths[], common_risks[], derived_from_pattern_ids[], status(draft|published)

Feedback (on any generated artifact)
  target_type, target_id, rating(useful|not_useful), reason, user_id

ModelRun (audit/eval)
  id, task(structure_signal|scope|recommend|lens|requirements|match|dedupe), prompt_version, model, input_hash,
  output_json, latency_ms, cost, created_at

AuditEvent
  actor, action, entity, entity_id, diff, at
```

Design principles for the target model:

- **Signals are first-class.** An inbox of unrouted signals is a core feature, and AI-suggested routing needs somewhere to live.
- **Everything generated is versioned and attributed** (model vs. human), so recommendations can be compared, accepted, overridden, and evaluated.
- **Normalised patterns.** Use tags with optional embeddings in place of exact-match strings.
- **Taxonomies are data, not code.**
- **No numeric scores in the UI.** The backend may hold internal confidence values for ranking and evaluation, but surface them qualitatively.
