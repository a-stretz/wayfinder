# 01: Product Overview

## 1. What Wayfinder is

Wayfinder is an **initiative intelligence and decision-support system** for internal improvement work. It sits *before* delivery tooling (ticket trackers, project management, engineering backlogs) and answers one question:

> Given what we know right now, what is the real problem, what should we do next, and which solution path fits best?

It is **not** a project management tool, a ticket tracker, a PRD generator, or an autonomous agent. Its value lies in the reasoning it produces (problem framing, readiness, solution fit, next action, requirements, patterns), not in storing records.

## 2. Product thesis

Internal demand usually arrives phrased as a solution: "we need a dashboard", "can AI do this", "automate this", "this spreadsheet keeps breaking", "we need visibility", "someone built a quick tool, should it become real?". Teams often build what was asked for before they understand the workflow, ownership, data, or risk behind it.

Wayfinder slows the jump from request to build *just enough*. It converts scattered signals into a structured initiative, separates symptoms from root causes, judges readiness, and recommends the smallest useful next step, which is often discovery, workflow mapping, or data validation rather than building something.

**Core pipeline:**

```
Signal → Initiative → Scoping Analysis → Candidate Requirements → Solution Paths → Recommended Next Action (Waypoint) → Outcome Learning
```

## 3. Positioning

- Category: internal strategy / initiative intelligence / product-ops decision support.
- It works for any organisation that receives cross-functional improvement requests. It does not depend on industry.
- It works at any AI-maturity level: it can route work to process fixes as readily as to AI.
- Differentiators:
  1. **Qualitative over fake-precise.** It uses fit labels and readiness states, not numeric scores.
  2. **Recommendation-first.** It always has an opinion on the next action and explains why.
  3. **Lenses, not re-rankings.** Changing priorities often changes emphasis without changing the recommendation, and the product says so explicitly.
  4. **Requirements as decision tools.** Candidate requirements show cost, risk and prerequisites before anyone commits.
  5. **Pattern learning.** Repeated blockers and pain points across initiatives turn into reusable playbooks.

## 4. Users

| Role | Needs from Wayfinder |
|---|---|
| **Primary: Product manager / product-ops / internal-systems lead** | Make sense of messy inputs, decide what is worth solving, judge readiness, pick a next step, communicate reasoning |
| **Operations or functional leader** | Submit signals, see where their requests stand and why |
| **Executive sponsor** | Portfolio view: what needs action, emerging patterns, where investment should go |
| **Engineering / data / automation teams** | Receive initiatives that are actually ready, with requirements and risks attached |
| **Governance / risk reviewers** (future) | See initiatives that touch sensitive workflows, AI, or data before build |
| **Any employee** (future) | Lightweight signal submission |

## 5. Goals

1. Capture scattered signals.
2. Attach signals to new or existing initiatives.
3. Synthesise raw input into structured initiative context.
4. Evaluate initiative readiness.
5. Surface workflow, stakeholder, system, data and governance considerations.
6. Generate medium-depth candidate requirements.
7. Compare relevant solution paths without false precision.
8. Recommend the next useful action.
9. Apply decision lenses that adjust emphasis.
10. Keep the target state and future scope visible without distracting from the immediate action.
11. Learn from patterns, outcomes, successes and failures over time.
12. Be extensible toward LLMs, connectors (API/MCP), file ingestion, skill files, evaluation and training data.

## 6. Non-goals (keep these for the market version too)

- Full project/portfolio management or a ticket-tracker replacement.
- An autonomous "corporate brain" or agent OS.
- Complete PRD generation.
- A numeric scoring engine that ranks everything.
- A system of record for all enterprise workflows.

## 7. Vocabulary (canonical)

| Term | Definition | Notes on prototype drift |
|---|---|---|
| **Signal** | A raw or semi-structured input: a note, request, complaint, file, idea, dashboard ask, prototype, research finding | Consistent |
| **Initiative** | The central object being shaped, scoped and routed. A full workspace | The UI says "Initiative Queue" for the list |
| **Waypoint** | The recommendation output: the next action plus its rationale | The UI renamed it "Recommended Path". Pick one term and keep it |
| **Solution Path** | One of eight possible approaches (see 02) | Consistent |
| **Fit Label** | Strong / Good / Possible / Later / Poor | Consistent |
| **Readiness State** | How ready the initiative is to act on (six states) | **Not implemented** |
| **Decision Lens** | A priority perspective that changes emphasis, questions, and sometimes the recommendation | The UI says "Prioritization Lens", the docs say "Decision Priority". Unify |
| **Target State** | The editable desired future outcome | Shown, but not editable |
| **Future Scope** | Later capabilities, deferred requirements, dependencies, not-recommended-yet items, revisit triggers | "Not recommended yet" is missing |
| **Pattern** | A recurring pain point, blocker, system, data issue, or requirement shape that spans initiatives | Exact-string aggregation only |
| **Playbook** | Reusable guidance derived from patterns | Three hardcoded cards |
| **Map** | Any structured view (requirements, workflow, stakeholders, systems, solution options) | Not used explicitly |

Naming guidance from the spec: use "Wayfinder" for the system and "Initiative" for the core object. Keep the wayfinding metaphor light: "Waypoint" appears only as the recommendation section, and the UI should not overuse map or navigation imagery.

## 8. Success criteria (from the spec, still valid)

Within minutes of opening the product, a user should understand:

1. What initiatives exist.
2. What signals inform them.
3. Which initiatives need action.
4. What the recommended next action is.
5. Why that action is recommended.
6. Which solution paths are viable.
7. What requirements are emerging.
8. What future state each initiative is aiming at.
9. What patterns appear across the organisation.
10. How the system gets smarter as inputs, outcomes and feedback accumulate.

## 9. Product tone

Calm, structured, executive-readable, serious. It should not feel like a flashy AI demo: no neon, no futurism, no fake complexity, no numeric precision the evidence can't support. Use clear labels, strong whitespace, and subtle status colour.
