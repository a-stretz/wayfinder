# 03: Information Model

This describes the concepts Wayfinder reasons about and how they relate, in plain language. It is technology-neutral: it says *what must be known*, not how to store it.

## 1. Concept map

```
Organisation
 ├─ Configuration: functional areas, workflow areas, systems, signal source types, custom lenses
 ├─ People (with roles)
 ├─ Signals ──(many-to-many)── Initiatives
 │                               ├─ Scoping assessment (8 dimensions)
 │                               ├─ Readiness + Status
 │                               ├─ Waypoint (current + history)
 │                               ├─ Solution path assessments
 │                               ├─ Lens views
 │                               ├─ Candidate requirements (general + by path)
 │                               ├─ Target state + Future scope
 │                               ├─ Pattern contributions
 │                               ├─ Related initiatives
 │                               └─ Outcome
 ├─ Patterns (shared across initiatives)
 ├─ Playbooks
 └─ Feedback and decision history
```

## 2. Concepts

### Signal
A raw input. It exists **on its own**: it can sit unrouted in an inbox, and it can link to more than one initiative.
- Title, summary, original content, any attached documents
- Source type and channel (typed in, uploaded, emailed, imported, from another tool)
- When it was captured and who submitted it
- Extracted: pain points, systems, stakeholders, requested solution, observed impact
- Routing state: unrouted, suggested, attached, dismissed
- Which initiatives it informs, and whether a person or the system made the link

### Initiative
The central workspace.
- **Identity:** title, short objective
- **Context:** functional areas, workflow area, owner, stakeholders, systems involved
- **Lifecycle:** status, readiness, created and last updated
- **Understanding:** problem statement, context summary, requested solution, root-cause hypothesis
- **Assessment:** scoping (8 dimensions, each with value, rationale and supporting signals)
- **Recommendation:** current Waypoint, its history, primary solution path
- **Options:** solution path assessments (fit, why, what it requires, key risk, relationship to the Waypoint)
- **Requirements:** candidate requirements by category, each with a rationale; plus requirements by solution path; each can be marked now / later / deferred and candidate / accepted / rejected
- **Direction:** target state (editable, with history); future scope (later capabilities, deferred requirements, dependencies, not recommended yet, revisit triggers)
- **Learning:** pattern contributions, related initiatives, outcome
- **Collaboration:** comments, activity history

### Waypoint
Next action, why, expected output, decision enabled, what would change it. Every version records who or what produced it (a person, the system, a rule) and whether a person accepted or overrode it, and why.

### Solution path assessment
Path, fit, why, what it would require, key risk or unknown, relationship to the Waypoint, whether it is primary.

### Lens view
Lens, whether the recommendation changed, resulting action, emphasis changes, paths affected, new questions, future direction. Every lens is available for every initiative. Views are produced on request and refreshed when the initiative changes.

### Lens definition
Name, plain label, priority statement, paths it favours and disfavours. Eight are built in; organisations may add more.

### Pattern
A recurring element shared across initiatives. Kinds: pain point, blocker, system, data issue, requirement shape, discovery gap, ownership problem. It has a canonical label, the initiatives that contribute to it, and a trend over time.

### Initiative relationship
Similar to, duplicate of, depends on, supersedes, each with a reason.

### Playbook
Title, when to use, first actions, typical paths, common risks, the patterns and outcomes it came from, and its state (draft or published).

### Outcome
Path taken, action taken, result, lessons, and when it was recorded.

### Feedback
A judgement on any recommendation or generated content (useful or not, with a reason), plus a record of overrides.

## 3. Rules the model must uphold

1. Signals stand alone and may link to several initiatives.
2. Every system-generated judgement is **attributed** (system or person) and **versioned**, so changes can be explained and quality can be measured.
3. A person can override any judgement; the override and its reason are kept.
4. Patterns are shared, normalised concepts, not free-text copies on each initiative.
5. All organisation-specific vocabulary (departments, workflow areas, systems, source types, custom lenses) is configuration, never built into the product.
6. Qualitative values only in anything users see.
7. Each organisation's information is completely isolated from every other's.
