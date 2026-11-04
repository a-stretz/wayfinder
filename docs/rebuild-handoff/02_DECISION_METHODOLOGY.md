# 02: Decision Methodology

This is the heart of Wayfinder: the reasoning that turns a raw signal into a defensible next action. It applies whether a human, a rules engine, an AI model, or some combination does the reasoning.

---

## 1. The pipeline

```
 Signal ─► Initiative ─► Scoping ─► Readiness ─► Solution Paths + Fit ─► Waypoint
                                                                          │
           Lenses (re-view the Waypoint) ◄────────────────────────────────┤
           Candidate Requirements (cost / feasibility check) ◄────────────┤
           Target State + Future Scope (destination) ◄────────────────────┘
                                                                          ▼
                                 Outcome ─► Patterns ─► Playbooks ─► (informs future Waypoints)
```

Each stage answers one question:

| Stage | Question |
|---|---|
| Signal | What did someone say, send, or notice? |
| Initiative | What underlying problem do these signals point to? |
| Scoping | How well do we understand it? |
| Readiness | How close is it to being actionable? |
| Solution paths and fit | What are the realistic ways to address it, and how well does each suit it *now*? |
| Waypoint | What exactly should happen next, and why? |
| Lenses | Would different priorities change that? |
| Candidate requirements | What would the chosen path really demand? |
| Target state and future scope | Where is this ultimately going, and what is deliberately being saved for later? |
| Outcome | What happened? |
| Patterns and playbooks | What does this teach us for next time? |

---

## 2. From signal to initiative

### 2.1 What counts as a signal
Any input that suggests something could work better: meeting notes, stakeholder requests, documents, data exports, emails, existing project descriptions, dashboard requests, workflow complaints, prototype ideas, AI ideas, manual notes, roadmap items, research findings, support or operations issues.

### 2.2 What to extract from every signal
- A short summary in plain language
- **Pain points**: what hurts
- **Requested solution**, if any: what the person asked for (kept separate from the problem)
- **Systems** mentioned: tools, files, places information lives
- **Stakeholders**: who is affected, who owns what
- **Observed impact**: what goes wrong and how badly
- Source type, date, and who submitted it

### 2.3 Routing a signal
Every signal is either:
- **attached** to an existing initiative (it adds evidence or context),
- used to **create** a new initiative, or
- **held** for triage, or dismissed.

Matching considers overlap in problem, workflow, systems, stakeholders, and recurring pain patterns. The system *suggests* matches with a reason ("same handoff gap, same systems"); a person confirms. Duplicate signals are flagged instead of creating duplicate initiatives.

### 2.4 Reframing: request versus problem
A central move in the methodology is separating three things:

| Element | Example shape |
|---|---|
| **Requested solution** | "We need a dashboard." |
| **Problem statement** | "People can't see which items are overdue or who owns them." |
| **Root-cause hypothesis** | "There is no agreed owner or single source of truth for these items." |

The recommendation is driven by the *root-cause hypothesis*, not the requested solution. The requested solution is respected and recorded, and the system explains when it is premature.

---

## 3. Scoping: eight dimensions

Each initiative is assessed on eight dimensions, using **qualitative values only**.

| Dimension | Core question | Typical values |
|---|---|---|
| **Business Pain** | Is there a real operational problem, or just a requested feature? | High / Medium / Low / Needs validation |
| **Workflow Clarity** | Do we understand how the process works today? | Clear / Partial / Unclear |
| **Stakeholder Ownership** | Who owns the problem, the process, the decision, and the outcome? | Clear / Partial / Unclear |
| **Data Readiness** | Are the inputs, sources, entities and quality issues known? | Clear / Partial / Unclear / Needs validation |
| **Requirement Clarity** | Can early requirements be described? | Clear / Partial / Unclear |
| **Solution Fit** | Do any solution paths look viable? | Clear / Partial / Unclear |
| **Risk / Governance** | What goes wrong if the result is inaccurate, unsupported, or ignored? | High / Medium / Low |
| **Value Potential** | What improves if this works? | High / Medium / Low / Needs validation |

Every value carries a one-line rationale and, ideally, a link to the signals that support it. "Needs validation" is an honest answer, not a gap to hide.

---

## 4. Readiness

Readiness summarises scoping into one state. It is the main gate on what can be recommended.

| Readiness | Meaning | Typical scoping profile |
|---|---|---|
| **Unclear** | Vague, solution-first, or missing context | Pain or workflow unclear |
| **Problem Defined** | Pain is clear; requirements or data are not | Pain clear; workflow, data or requirements partial |
| **Requirements Emerging** | Early requirements can be described; path not final | Workflow mostly clear, requirements partial, fit partial |
| **Prototype Ready** | A narrow, low-risk test could validate value | Scope narrow, data available, risk low, reversible |
| **Engineering Ready** | Scope, data, owners, risks and requirements are clear enough for formal planning | Most dimensions clear, ownership clear, risks known |
| **Defer / Revisit** | Real, but timing, ownership, value or readiness is insufficient | Low value, no owner, or blocked by something external |

Readiness is separate from **status** (where the initiative sits in the organisation's process: new, active, stalled, revisiting, handed off, deferred, done).

---

## 5. Next actions: the ten possible Waypoints

| Next action | Use when | It should produce | Decision it enables |
|---|---|---|---|
| **Run Discovery** | The problem itself is unclear or solution-first | A clear problem statement, affected users, impact | Whether this is worth pursuing and what it really is |
| **Map Workflow** | Process, ownership, or handoffs are not understood | A current-state map: steps, owners, handoffs, exceptions | Whether the fix is process, tooling, or both |
| **Define Requirements** | The problem is known but solution needs are vague | Medium-depth requirements, audiences, required fields | Which path to pursue, and its size |
| **Validate Data** | Sources, quality, definitions or access are uncertain | A trusted field list, definitions, a source of truth, quality gaps | Whether reporting, automation or AI can be trusted |
| **Build Prototype** | Scope is narrow, low-risk and reversible | A small working test with real users | Whether value is real before formal investment |
| **Create Reporting View** | Visibility is the need and the data is trustworthy | A shared view of known information | Whether visibility alone solves it |
| **Automate Workflow** | Repetitive steps are stable, with clear owners and rules | Automated routing, reminders, approvals, or data movement | How much manual effort is removed |
| **Assess AI Fit** | AI might help, but the use case, data, risk and review model are unproven | A fit assessment: task type, data, error tolerance, human review | Whether to pilot AI, and with what guardrails |
| **Prepare Engineering Handoff** | Scope, data, owners, risks and requirements are clear | A handoff package for formal delivery | Formal investment and scheduling |
| **Defer / Revisit** | Not enough value, urgency, ownership or readiness | A recorded reason and clear revisit triggers | Consciously not acting now, without losing the idea |

---

## 6. Solution paths

Eight broad ways an initiative can be addressed:

| Solution path | Fits when | Prerequisites before it is "Strong" |
|---|---|---|
| **Process Improvement** | Ownership, handoffs, checklists, policies or discipline are the issue | A willing owner |
| **Reporting / Visibility** | The need is to surface, monitor or summarise known information | Trusted data, agreed definitions, a known audience |
| **Workflow Automation** | Repetitive routing, reminders, approvals, notifications, status updates or data movement | Stable process, clear owners and rules, reliable triggers |
| **AI-Assisted Workflow** | Summarising, classifying, extracting, drafting, searching, comparing, reasoning or recommending would help | Defined task and schema, adequate data, an acceptable error tolerance, a human review model, governance |
| **Lightweight Prototype** | A narrow, low-risk tool could test value | Narrow scope, reversible, a sponsor willing to test |
| **Formal Engineering** | Reliability, integrations, permissions, scale, audit history or production support are needed | Validated workflow, clear requirements, owners, support model |
| **Knowledge / Memory Layer** | Repeated questions, scattered documents, lost decisions, institutional context | An agreed structure and someone who maintains it |
| **Defer / Revisit** | Insufficient value, clarity, ownership, urgency, timing or feasibility | (none) |

For each relevant path, Wayfinder states:
- **Fit** (see below)
- **Why it fits**, or why not yet
- **What it would require**
- **Key risk or unknown**
- **Relationship to the Waypoint**: is it the next step, something enabled later by the next step, or an alternative?

---

## 7. Fit labels

| Fit | Meaning | Guidance |
|---|---|---|
| **Strong** | The recommended path | Normally exactly one. It aligns with the Waypoint |
| **Good** | Viable and well supported | Real alternatives or companions |
| **Possible** | Plausible but needs validation | Usually waiting on data, ownership or rules |
| **Later** | Useful, but not the right first move | Typical for automation, AI and engineering before readiness |
| **Poor** | Not supported now | Use **rarely**, mainly to explain why the *requested* solution is premature |

**Rules:**
- Show **only relevant paths**. Never pad to a fixed number.
- If nothing fits, say so and recommend Discovery, Map Workflow, Validate Data, or Defer.
- Fit describes suitability **now**, given current readiness. It changes as the initiative matures.
- Fit is visual but never conveyed by colour alone.

---

## 8. The Waypoint

The Waypoint is the system's committed answer to "what now?". Its anatomy:

1. **Recommended next action**: one of the ten.
2. **Why**: the reasoning, tied to scoping and signals.
3. **What it should produce**: a concrete output.
4. **What decision it enables**: why doing this unblocks progress.
5. **What would change it**: the evidence that would lead to a different recommendation.

The Waypoint is accompanied by its **primary solution path**: the path with Strong fit, which the next action serves.

### 8.1 Recommendation rules

These heuristics encode the methodology's judgement. Apply them in order of precedence:

1. **Unclear problem, or solution-first phrasing with no evidence of real pain** → *Run Discovery.*
2. **Process, ownership or handoffs unknown** → *Map Workflow*, with Process Improvement as the likely primary path. Tooling is rated Later or Possible until ownership is clear.
3. **Visibility is the need, but fields, statuses or sources are inconsistent** → *Validate Data* before any reporting.
4. **Visibility is the need and the data is trustworthy** → *Create Reporting View.*
5. **Need understood, but required fields, format or audience undefined** → *Define Requirements*, often with a Lightweight Prototype rated Good.
6. **Narrow, structured, reversible scope with a willing sponsor** → *Build Prototype.*
7. **AI is requested or attractive** → *Assess AI Fit*, never "build AI" directly. AI-Assisted Workflow stays Later until the task, schema, data, review model and governance are defined.
8. **Automation only after stability.** Automation is Possible until ownership, rules and source of truth are stable; then it may become Strong.
9. **Formal Engineering only after validation.** Later until the workflow is validated and requirements are clear.
10. **Ideas or requests arriving faster than they can be routed** → structured intake plus a Knowledge / Memory Layer.
11. **Low value, no owner, or blocked** → *Defer / Revisit*, with explicit revisit triggers.
12. **Readiness gates action.** For example, Prepare Engineering Handoff requires Engineering Ready; Build Prototype requires at least Prototype Ready. A person can override with a stated reason.
13. **Prefer the smallest useful, reversible step** when two actions are equally justified.
14. **Always state what would change the recommendation.**

### 8.2 Re-evaluation
When new signals arrive, scoping, readiness, fit and the Waypoint are reassessed. The product shows **what changed and why**, for example: "Data readiness moved from Unclear to Partial, so Reporting moved from Later to Possible." Previous Waypoints are kept as history.

---

## 9. Decision lenses

A lens re-reads the same initiative through one priority. Its purpose is to let leaders test their own priorities against the recommendation without resorting to scoring.

### 9.1 The eight lenses

| Lens | Plain label | Priority | Tends to favour | Tends to disfavour |
|---|---|---|---|---|
| Fastest Useful Output | Quickest Delivery | Quick visible value | Prototype, Reporting, small process fixes | Formal Engineering |
| Low Engineering Lift | Easiest to Build | Minimal formal engineering | Process, Reporting with existing tools, Prototype | Formal Engineering, deep integrations |
| Safer First Step | Lowest Risk | Low-risk, reversible moves | Discovery, Map Workflow, Validate Data, Prototype | Automation, AI on sensitive work |
| Executive Visibility | Visibility | Leadership clarity and decision support | Reporting / Visibility | Behind-the-scenes process work alone |
| AI Leverage | AI Opportunity | Where AI genuinely helps | Assess AI Fit, AI-Assisted, Knowledge Layer | Nothing outright, but must check that AI adds value and not just novelty |
| Operational Stability | Stability | Reliable, supportable operations | Process Improvement, ownership, governance | Fragile automation, unsupported prototypes |
| Cost Sensitive | Cost Control | Avoid expensive or resource-heavy options | Existing tools, Process, light Prototype | Formal Engineering, heavy AI |
| Scale Ready | Scalability | Durable solutions that can grow | Data foundations, Formal Engineering (when ready), Automation | One-off workarounds |

Organisations may add their own lenses, each defined by a name, a priority statement, and which paths it favours or disfavours.

### 9.2 What a lens returns
1. **Lens applied**
2. **Did the recommendation change?** Yes or No.
3. **Resulting next action** (the same or a different one)
4. **Emphasis changes**: what to focus on differently
5. **Paths affected**
6. **New questions to ask**
7. **Future direction**: what becomes more relevant later

### 9.3 The key rule: lenses are allowed to agree
A lens changes the next action **only when its priority genuinely conflicts with the current path and the initiative's readiness can support the alternative.** Otherwise the answer stays the same and the lens changes *emphasis, questions, and future direction*. The product says this explicitly:

> "The recommendation stays the same. This lens changes emphasis, tradeoffs, and follow-up questions."

This is a deliberate trust device. A tool that always changes its answer when you push it looks like it has no conviction.

Typical patterns:
- Visibility applied to a Map Workflow initiative can legitimately shift the action to *Create Reporting View* (a quick leadership view), paired with a later clean-up of the workflow.
- AI Opportunity usually shifts the action to *Assess AI Fit* unless AI is already the primary path, but it always asks whether AI genuinely helps.
- Quickest Delivery can shift *Define Requirements* to *Build Prototype* when a small mock-up would answer the open requirements faster.
- Stability can shift *Validate Data* to *Map Workflow* when the bottleneck is rules and ownership, not fields.
- Lowest Risk, Cost Control and Easiest to Build usually **confirm** cautious recommendations and sharpen the questions.

---

## 10. Candidate requirements

Requirements appear early because they are **decision tools**: they show cost, complexity, risk and prerequisites before commitment. They are **medium depth**: specific enough to be useful, well short of a full specification.

| Category | Captures |
|---|---|
| **Business** | Desired outcome and the decision it supports |
| **User** | What users must do, know, submit, review, decide |
| **Workflow** | Steps, handoffs, triggers, approvals, exceptions, ownership |
| **Data** | Entities, fields, documents, sources, quality, update cadence |
| **System** | Tools, integrations, permissions, environments, dependencies |
| **AI / Automation** | Classification, extraction, summarisation, generation, routing, review, confidence |
| **Governance** | Review rules, auditability, risk controls, escalation, compliance, support ownership |
| **Success Metrics** | How impact will be recognised |

Every requirement has a **rationale** ("why this matters").

**Requirements by solution path:** the same initiative is shown with the requirements each viable path would add. This makes tradeoffs concrete. For example, automation adds trigger and routing rules, AI adds review and confidence handling, and engineering adds permissions and audit history.

**Reusable requirement shapes:** many initiatives share a requirement skeleton, such as *owner, status, deadline, source, escalation rule* or *submitter, workflow, pain point, desired outcome, data involved, next action*. These shapes are captured as patterns and reused.

**Starter requirements** for a brand-new initiative:
- Business: clarify the operating problem and intended outcome.
- Workflow: identify the current workflow, owners, handoffs and decision points.
- Success: define what a useful first outcome should make easier to see, decide, or do.

---

## 11. Target state and future scope

The **Waypoint** is the next step. The **Target State** is the destination. Both are visible; the Waypoint gets the emphasis.

- **Target State**: a one- or two-sentence description of the desired future, which users can edit. It may be suggested by the system or written by the user.
- **Future Scope**, kept visible but secondary:

| Element | Meaning |
|---|---|
| **Later capabilities** | Features or workflows that may make sense afterwards |
| **Deferred requirements** | Useful requirements that aren't needed now |
| **Dependencies** | What must be true before future scope is viable |
| **Not recommended yet** | Attractive ideas that are premature, recorded so they aren't lost or rushed |
| **Triggers to revisit** | Signals that would make future scope worth reconsidering, e.g. "volume increases", "ownership clarified", "data source validated", "the same problem recurs" |

Future scope is "the carrot on the stick". It motivates and orients without pulling attention from the next step.

---

## 12. Pattern learning

Wayfinder starts knowing little. It becomes more useful as initiatives, decisions and outcomes accumulate. Pattern learning is a lightweight feedback mechanism, not a "corporate brain".

### 12.1 What is captured per initiative
- Repeated pain patterns
- Common blockers
- Similar initiatives (linked)
- Recurring systems
- Reusable requirement patterns
- Solution paths chosen
- Successful approaches
- Failed or deferred approaches
- Discovery gaps (questions that kept coming up)
- Data readiness issues
- Ownership problems
- Feedback on recommendation quality

### 12.2 What aggregation reveals
Across all initiatives: which pains, blockers, systems and data problems recur most; which initiatives resemble each other; which requirement shapes repeat; which paths get chosen and how they turn out; which discovery questions are always needed.

### 12.3 What learning improves
Scoping quality, requirement suggestions, path recommendations, similar-initiative matching, playbook refinement, lens behaviour, and the guidance used by any AI component.

### 12.4 Learning hygiene
- Patterns must be **normalised**. Near-identical phrasings count as one pattern.
- Default or template content must **not** count as evidence of a pattern.
- Every pattern should link back to the initiatives that contribute to it.
- Patterns should show **trend**: new, growing, stable, fading.

---

## 13. Playbooks

A playbook is reusable guidance for a recurring situation. It has: *when to use it, recommended first actions, typical solution paths, common risks*, and the patterns and outcomes it was derived from.

Three generic starter playbooks capture the methodology's most common situations:

| Playbook | When to use | First actions | Typical paths | Common risks |
|---|---|---|---|---|
| **Workflow Visibility Gaps** | Critical work is spread across email, spreadsheets, meetings and personal tracking | Map the workflow; define ownership; create a shared operating view | Process Improvement; Reporting / Visibility | Automating before ownership is clear; confusing reporting with process control |
| **Data Readiness Before Reporting** | Teams want visibility, but fields, status language or ownership are inconsistent | Validate data; normalise status definitions; confirm trusted fields | Reporting / Visibility; Workflow Automation | Dashboards built on unreliable fields; skipping source-of-truth decisions |
| **Structured Intake and Memory** | Ideas, requests and issues arrive faster than they can be routed | Run discovery; define intake fields; route to the right path | Knowledge / Memory Layer; Lightweight Prototype; AI-Assisted Workflow | Informal ideas becoming ungoverned work; treating AI as the default answer |

New playbooks are proposed when a pattern recurs often enough, then reviewed and published by a person. Recommendations should cite the playbook they draw on.

The playbook area also explains the methodology itself (paths, fit, readiness, requirement categories, lenses, Waypoint logic, the learning model), so users understand *how* Wayfinder thinks.

---

## 14. Outcomes: closing the loop

When an initiative is completed, deferred or abandoned, capture:
- the path actually taken and the action actually done,
- the result: success, partial, failed, or abandoned,
- lessons learned.

Alongside outcomes, capture **feedback on recommendations**: was the Waypoint useful, was it overridden and why, were the requirements right. Outcomes and feedback feed patterns, playbooks, and future recommendations. This is how the system learns which approaches actually work in *this* organisation.

---

## 15. Default reasoning for a brand-new, thin signal

When very little is known, the methodology defaults to caution:
- Readiness: Unclear or Problem Defined.
- Waypoint: Run Discovery (or Map Workflow if a process is clearly named).
- Fit: the most likely path at **Good**, never Strong on thin evidence, with alternatives at Possible.
- Starter requirements (section 10), a starter target state ("shaped into a clear initiative with a recommended next action and enough context for follow-up"), and future-scope dependencies such as *workflow owner, source context, a discovery conversation*.
- The typical blockers to expect at intake: incomplete source context; unclear next-step owner; the submitter and the accountable owner may be different people.
