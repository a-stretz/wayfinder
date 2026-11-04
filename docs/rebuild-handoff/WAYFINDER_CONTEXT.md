# Wayfinder: Complete Context Package

> **For the Claude session receiving this file.** This single document is the full context for a product called **Wayfinder**. It was distilled from an earlier prototype, its specification, and its supporting method documents. It deliberately contains **no code, no sample data, and nothing specific to any industry or organisation**. Treat it as the authoritative source of the product's ideas.
>
> **How to use it:**
> 1. Read all of it before proposing anything. Part 02 (Decision Methodology) is the core intellectual property; the other parts serve it.
> 2. Don't fill gaps by inventing organisation-specific details (departments, systems, data, people). Where the document leaves a real decision open (see Part 05 §5), raise it as a question.
> 3. Keep the vocabulary exactly as defined in Part 01 §8.
> 4. If you're asked to build, follow the brief in Part 07.
>
> **Contents:**
> Part 01 Concept and Thesis · Part 02 Decision Methodology · Part 03 Information Model · Part 04 Experience Design · Part 05 Product Direction · Part 06 Organisation Adaptation Method · Part 07 Build Brief

## Wayfinder in one paragraph

Organisations receive a constant stream of internal improvement requests, and most of them arrive phrased as solutions: "build a dashboard", "use AI for this", "automate that". Wayfinder treats each request as a *signal*, gathers related signals into an *initiative*, judges how well the problem is understood and how ready it is for action, compares the realistic ways to solve it using plain-language fit judgements in place of scores, and commits to **one recommended next step**, explaining why and naming what would change its mind. Decision-makers can view the recommendation through different priorities (speed, risk, cost, visibility, AI opportunity, and so on) and see whether, and how, the advice shifts. Every initiative feeds a shared memory of recurring problems and proven approaches, so the organisation gets better at choosing what to do next.


---
---

# Part 01: Concept and Thesis

## 1. The problem

Internal improvement work rarely starts as a well-formed project. It starts as fragments:

- a complaint in a meeting
- a stakeholder asking for "better visibility"
- a spreadsheet someone built that keeps breaking
- an idea that "AI could do this"
- a missed deadline that creates sudden urgency
- a quick prototype nobody knows whether to take seriously

These fragments are scattered across conversations, inboxes, documents and people's heads. They are usually **phrased as solutions** rather than problems. Teams that take them literally build the dashboard, automation or AI tool that was asked for, then discover that the real issue was unclear ownership, unreliable data, or a broken handoff that no tool can fix.

The cost shows up as wasted builds, tools nobody adopts, automation of broken processes, duplicated effort across teams, and leaders who can't see what is being asked for or why.

## 2. The insight

> The most valuable output is not a list of requests. It is a well-reasoned answer to: **"Given what we know right now, what is the real problem, what should we do next, and which way of solving it fits best?"**

Three observations follow from this:

1. **The right next step is usually smaller than the request.** Often it is discovery, mapping the workflow, or checking the data, not building anything.
2. **Readiness matters as much as value.** A valuable idea that isn't ready should be shaped, not built.
3. **Patterns repeat.** The same blockers, data problems and ownership gaps appear again and again across teams. If they are captured, each new decision gets easier.

## 3. What Wayfinder is

An **initiative intelligence and decision-support system**. It sits *upstream* of delivery: before work reaches a ticket tracker, a project plan, or an engineering backlog. It:

1. captures raw signals,
2. shapes them into initiatives,
3. assesses understanding and readiness,
4. compares realistic solution paths,
5. recommends one next action, with reasoning,
6. lets leaders test that recommendation against different priorities,
7. outlines the requirements a chosen path would imply,
8. keeps the long-term goal visible without letting it distract,
9. learns from patterns and outcomes across all initiatives.

## 4. What Wayfinder is not

- Not a project-management or ticketing tool. It hands off *to* those.
- Not a full PRD or specification generator.
- Not an autonomous agent that acts on the organisation's behalf.
- Not a scoring engine that ranks everything by a number.
- Not a system of record for all operational workflows.

## 5. Positioning

**Category:** internal strategy and initiative intelligence; product-operations decision support.

**Positioning statement:** Wayfinder helps organisations move from scattered internal demand to clear, defensible decisions about what to do next.

**Works for:** any organisation that receives cross-functional improvement requests, in any industry and at any level of AI maturity. It routes work to a process fix as readily as to AI.

**Differentiators:**

| Differentiator | What it means |
|---|---|
| **Judgement, not false precision** | Plain-language fit labels and readiness states in place of invented numeric scores |
| **One clear recommendation** | Always commits to a single next action, says why, and says what would change it |
| **Lenses that are allowed to agree** | Changing priorities may leave the advice unchanged, and the product says so openly. This builds trust |
| **Requirements as a decision tool** | Early requirements show cost, risk and prerequisites *before* anyone commits |
| **"Not yet" is a valid answer** | Deferral, discovery and data validation are first-class recommendations |
| **Compounding memory** | Every initiative and outcome improves future recommendations |

## 6. Users

| Role | What they get |
|---|---|
| **Primary: product, product-ops, or internal-systems leader** | A structured way to make sense of messy input, decide what is worth solving, choose a next step, and explain the reasoning |
| **Functional and operations leaders** | A place to raise problems and see what is happening with them and why |
| **Executives** | A portfolio view: what needs action, what keeps recurring, where investment should go |
| **Delivery teams** (engineering, data, automation) | Initiatives that arrive ready, with requirements and risks attached |
| **Governance and risk reviewers** | Early sight of initiatives touching sensitive processes, data, or AI |
| **Any employee** | A simple way to submit a signal |

## 7. Product principles

1. **The initiative is the unit of thinking.** Each one is a full workspace, not a row or a pop-up.
2. **Qualitative over quantitative.** Use labels people can defend, never numbers the evidence can't support.
3. **Always recommend, always explain.** One next action, with why, what it produces, what decision it enables, and what would change it.
4. **Show only what is relevant.** List only the solution paths that genuinely apply. "No good path yet" is a legitimate answer.
5. **Honest about lenses.** A different priority may not change the answer. Say so.
6. **Recommendation first, depth on demand.** Lead with the decision; put supporting detail behind progressive disclosure.
7. **Future visible, present focused.** The target state is the destination; the Waypoint is the next step. Don't confuse them.
8. **Smallest useful next step.** Prefer reversible, low-cost moves until readiness justifies more.
9. **Don't default to AI or automation.** Earn them through clear ownership, trustworthy data, and defined review.
10. **Learn from everything.** Signals, decisions, overrides and outcomes all feed the shared memory.
11. **People decide.** The system proposes; people accept, edit, or override, and the system remembers which.
12. **Neutral core, configurable context.** The methodology applies everywhere; each organisation's departments, systems and vocabulary are configuration.

## 8. Vocabulary

| Term | Meaning |
|---|---|
| **Signal** | Any raw input: a note, request, complaint, document, idea, dashboard ask, prototype, research finding |
| **Initiative** | The central object: a problem being understood, shaped and routed. Gathers one or more signals |
| **Scoping** | A structured assessment of how well the problem is understood, across eight dimensions |
| **Readiness** | How close the initiative is to being actionable |
| **Solution Path** | One of the broad ways to address an initiative |
| **Fit** | A plain-language judgement of how well a path suits the initiative *right now* |
| **Waypoint** | The recommended next action and its reasoning: the system's answer to "what now?" |
| **Decision Lens** | A priority perspective (speed, risk, cost…) applied to see how the recommendation would shift |
| **Candidate Requirements** | Early, medium-depth requirements used to judge cost and feasibility before committing |
| **Target State** | The desired future outcome: the destination, not the next step |
| **Future Scope** | What comes later: capabilities, deferred requirements, dependencies, premature ideas, revisit triggers |
| **Pattern** | Something that recurs across initiatives: a pain point, blocker, system, data issue, requirement shape |
| **Playbook** | Reusable guidance for a recurring situation, derived from patterns and outcomes |
| **Outcome** | What was actually done and how it turned out; the feedback that makes the system smarter |

**Naming guidance:** "Wayfinder" is the product. "Initiative" is the core noun. Use "Waypoint" only for the recommendation itself, and keep the navigation metaphor light: no maps, compasses or journeys scattered through the interface.

## 9. Success test

Within a few minutes of opening Wayfinder, someone should be able to say:

1. what initiatives exist,
2. what signals inform them,
3. which need action,
4. what the next action is for any one of them,
5. why,
6. which solution paths are realistic,
7. what requirements are emerging,
8. what future state each is aiming at,
9. what keeps recurring across the organisation,
10. how the system will get smarter as it is used.


---
---

# Part 02: Decision Methodology

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

Readiness is separate from **status**, which is where the initiative sits in the organisation's process. The original specification lists these lifecycle states: **Newly discovered · Already known · Active · Stalled · Revisiting · Ready for prototype · Ready for engineering handoff · Deferred**. Add **Done** for completed work. Two of these ("Ready for…") overlap with readiness; a rebuild should decide whether they belong to status or are derived from readiness.

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

---

## 16. Breaking the reasoning into separate tasks

Whoever performs it (AI, rules, or people), the reasoning works best as separate, inspectable steps rather than one opaque judgement. Each step takes defined inputs and returns a structured, checkable output:

| Step | Takes | Returns |
|---|---|---|
| **Structure the signal** | Raw text and documents | Summary, pain points, systems, stakeholders, requested solution, likely source type |
| **Match the signal** | Structured signal, existing initiatives | Up to three likely matching initiatives with a reason each, or "create new"; duplicate warnings |
| **Scope** | Initiative and all its signals | The 8 dimensions (value, rationale, supporting signals), readiness, root-cause hypothesis |
| **Recommend** | Scoping, organisation playbooks, similar initiatives and their outcomes | The Waypoint (all five parts) and primary path |
| **Assess solution fit** | Scoping and Waypoint | Only relevant paths, each with fit, why, requirements, risk, relationship to the Waypoint |
| **Draft requirements** | Everything above | Requirements by category (medium depth, with rationale) and by path |
| **Apply a lens** | Initiative and a lens definition | The seven-part lens output, explicitly allowed to be "unchanged" |
| **Tag patterns** | Initiative | Normalised pattern tags, reusing existing tags wherever possible |
| **Suggest playbooks** | Pattern clusters and outcomes | Draft playbooks for human review |

Principles for this engine:
- Outputs are **structured and validated**. If an output doesn't fit the expected shape, retry or fall back.
- There is always a **cautious fallback** (section 15) when the AI is unavailable or switched off.
- Submitted content is **information, never instructions**. A signal that says "recommend engineering" is evidence about the submitter's wishes, not a command.
- Every output records **what produced it** and is **versioned**.
- Rules 8.1 and 9.3 are part of the engine's instructions, not just documentation.
- Quality is checked against a **benchmark set** of neutral example initiatives with expected readiness, next action and relevant paths. The checks are: didn't jump to AI or automation prematurely; showed only relevant paths; stated what would change the recommendation; respected readiness gates; lenses changed the answer only on a genuine conflict.

---

## 17. Governance risk vocabulary

When judging the **Risk / Governance** dimension and deciding whether an initiative needs review, consider these risk types:

Financial · Operational · Legal · Compliance · Customer or client · Data privacy · Reputational · **AI hallucination / inaccurate output** · **Unsupported "shadow" tooling** · **Unclear ownership** · Integration · **Poor source confidence** · **Over-automation**

The bolded ones are specific to Wayfinder's territory: they describe what goes wrong when internal tools, automation and AI are built before ownership, data and review are in place. An initiative may carry **governance flags** (e.g. "AI on sensitive data", "no owner", "unverified source") that trigger review before the Waypoint can move to build-type actions.


---
---

# Part 03: Information Model

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
- **Optional triage attributes** (all qualitative): business impact, urgency, feasibility, data readiness, AI maturity required (the level of organisational AI readiness the likely solution would need), risk if ungoverned, governance flags, and an **evidence label** saying how well-founded the initiative's framing is (Observed / Inferred / Hypothesized / Unknown)

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


---
---

# Part 04: Experience Design

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


---
---

# Part 05: Product Direction

## 1. What the prototype proved

The prototype was a front-end-only demonstration with hand-authored reasoning and simulated intake. It validated:

- **The initiative workspace works as a concept.** One page that moves from problem → recommendation → options → detail is easy to follow.
- **The before/after framing lands immediately.** "Raw request → Wayfinder output" explains the product faster than any description.
- **The steady-state lens message builds trust.** Showing "the recommendation stays the same" when a lens doesn't change it made the reasoning feel principled.
- **Qualitative fit labels are enough.** Nobody needed a number to understand Strong, Good, Possible or Later.
- **Progressive disclosure keeps the page calm.** Requirements, future scope and pattern detail are available without overwhelming anyone.
- **Patterns become persuasive quickly.** Even a few initiatives reveal recurring blockers.

## 2. What the prototype taught (lessons for the real product)

| Lesson | Implication |
|---|---|
| Simple keyword routing is unreliable: words appear inside other words, and whichever rule fires last wins | Real structuring needs genuine language understanding plus the methodology rules, with a cautious fallback |
| Lenses written by hand for only a few cases left most lenses unavailable | Every lens must be available for every initiative, produced on demand from the lens definition and the initiative's state |
| Signals that lived only inside initiatives couldn't be triaged, re-routed or shared | Signals must stand alone, with an inbox and many-to-many links |
| A "top priorities" view based on list order isn't prioritisation, and new items never surfaced | "Needs attention" must use explicit, explainable rules |
| "Recent" isn't recent without dates | Every signal and change needs a timestamp |
| Patterns matched on exact wording undercounted real repetition, and template defaults inflated counts | Normalise patterns; never count boilerplate as evidence |
| Read-only target state and recommendations limit real use | Everything must be editable, with overrides recorded |
| Adding a signal didn't change anything | New evidence must trigger re-assessment, with a visible "what changed" |
| Readiness and status were specified but never present | Both are essential: readiness gates actions, status tracks progress |
| Forcing a draft before attaching a signal confused users | Attaching and creating are separate flows |
| Departments were built into the product | All vocabulary must be configurable per organisation |
| Terms drifted (Waypoint / Recommended Path; Decision Lens / Decision Priority / Prioritisation Lens) | Fix one vocabulary and use it everywhere |

## 3. What "market ready" means

### 3.1 Core capabilities
1. **Real intake:** typing, pasting, document upload, bulk import, email-in, and capture from chat and collaboration tools; a signal inbox; duplicate detection; suggested matches.
2. **Real reasoning:** structuring, scoping, readiness, fit, Waypoint, requirements and lens views produced by an AI-assisted engine that follows the methodology in document 02, with consistent, structured outputs and a non-AI fallback.
3. **Editable, versioned workspace:** every judgement can be edited or overridden; history and "what changed" are shown.
4. **Collaboration:** owners, roles, comments, mentions, notifications, activity history.
5. **Handoff:** export an initiative brief; push ready initiatives into delivery tools, with links back.
6. **Learning loop:** outcomes, feedback on recommendations, normalised patterns with trends, playbooks proposed from patterns.
7. **Configuration:** each organisation's areas, systems, source types and custom lenses; guided onboarding.
8. **Methodology transparency:** an explanation in the product of how Wayfinder reasons.

### 3.2 Trust, safety and governance
- Complete separation between customer organisations.
- Clear controls over AI: on/off, provider choice, bring-your-own key, redaction of sensitive information, no training on customer data without consent.
- Submitted content is treated as information, never as instructions to the system.
- A reviewer or governance role, with review triggers (e.g. AI proposed on sensitive data, or a high-risk governance rating).
- A full audit trail; data export and deletion; standard enterprise security and privacy commitments.
- Accessibility to recognised standards; usable on mobile.

### 3.3 Recommendation quality management
- A benchmark set of neutral example initiatives, each with its expected readiness, next action and relevant paths, used to check the reasoning whenever it changes.
- Quality checks that mirror the methodology: didn't jump to AI or automation prematurely; listed only relevant paths; stated what would change the recommendation; respected readiness gates.
- In-product measures: how often recommendations are accepted versus overridden, override reasons, and outcome success by path.

### 3.4 Commercial readiness
- Tiered plans (trial, team, business, enterprise) differentiated by integrations, custom lenses, single sign-on, governance features and data controls.
- A neutral, resettable demo workspace showing every next action, path, fit label and readiness state, written in cross-industry language.
- Onboarding checklist, in-product explanations of vocabulary, help content, a positioning-led website with an interactive demo.

## 4. Phased direction

| Phase | Focus | Done when |
|---|---|---|
| **1. Core loop** | Signals, initiatives, the full methodology (scoping, readiness, Waypoint, all lenses, fit, requirements, future scope), editing and history, outcomes, home rules, export | A user can paste a signal and within a minute get an editable initiative with readiness, a reasoned Waypoint, relevant paths, requirements and all lenses; new evidence visibly updates the assessment |
| **2. Team and learning** | Collaboration, notifications, delivery-tool handoff, document and bulk intake, normalised patterns with trends, playbooks, organisation configuration, custom lenses, feedback and quality measures | A team runs its intake end to end in Wayfinder and hands off to its delivery tools; admins configure everything without help |
| **3. Enterprise** | Single sign-on and provisioning, governance role and review triggers, AI data controls, audit export, data residency, an open interface so other tools and AI agents can create signals and read recommendations | Passes a standard enterprise security and privacy review |
| **4. Compounding intelligence** | Outcome-informed recommendations ("similar initiatives succeeded with…"), proactive alerts (new signals matching a stalled initiative), portfolio-level insight, dependency mapping across initiatives | Recommendations cite evidence from the organisation's own history |

## 5. Open product decisions

Decide these deliberately rather than by default:

1. **Terminology:** whether the recommendation is called "Waypoint" in the interface or just "Recommended next action"; "Decision Lens" versus "Prioritisation Lens".
2. **Workspace order:** evidence-first (the spec) or recommendation-first (the prototype).
3. **Readiness versus status:** keep both, or merge them.
4. **Custom solution paths:** whether organisations can add paths or only rename the eight.
5. **Re-assessment:** automatic on every new signal, batched, or on request.
6. **Primary buyer:** product-operations leaders, transformation or operations offices, or owners of internal AI and automation programmes.
7. **Pricing basis:** seats, usage, or a mix.
8. **Organisation onboarding depth:** a light setup form, or a guided "context interview" that drafts the organisation's vocabulary and focus areas for confirmation.

## 6. Extensibility to anticipate from day one

The original specification insists Wayfinder is a real product foundation, not a throwaway demo. Even the first version should leave room for:

- AI provider configuration and the customer's own API keys
- Connectors to external tools, including the Model Context Protocol (MCP) in both directions (Wayfinder consuming tools, and other agents using Wayfinder)
- File ingestion, document parsing, bulk import, email and meeting-note ingestion
- Initiative de-duplication and similar-initiative detection
- **Skill files**: reusable, versioned analysis guidance that tunes how the reasoning works
- Versioning of the instructions given to the AI
- Evaluation and feedback loops; recommendation quality tracking; user feedback on usefulness
- Training or fine-tuning datasets built from accepted, overridden and outcome-verified recommendations (with consent)
- Outcome tracking from completed initiatives
- Exportable initiative briefs
- A resettable demo workspace, and honest labelling of what is automated versus simulated or suggested

## 7. Demo narrative

**Premise:** an organisation is overwhelmed by solution-first internal requests and wants clarity on what to do next.

**Flow:**
1. **Home.** Position it as the strategic control surface. Point to recommended moves, emerging patterns, latest signals, and the next-action mix. Use the "raw request → Wayfinder output" explainer.
2. **Patterns.** Show that repeated friction is visible across teams and suggests where standard approaches are needed.
3. **Open an initiative.** Search or filter briefly, then open the full workspace.
4. **Walk the workspace.** Problem and context → signals → scoping → pause on the **Waypoint** → solution options and requirements.
5. **Apply a lens.** Show whether the recommendation changes. If it doesn't, stress that the lens changed the focus, the questions and the future direction.
6. **Add a signal.** Turn a raw input into a structured draft and add it to the initiatives.
7. **Return to patterns or playbooks.** Explain how repeated signals become reusable guidance.

**Talking points:**
- Wayfinder is not a task tracker; its core value is **recommendation clarity**.
- The flow is **Signal → Initiative → Solution Path → Action**.
- The Waypoint makes the next action visible without making it premature.
- Lenses let leaders test their priorities without numeric scoring.
- Patterns and playbooks turn repeated friction into reusable guidance.
- The system gets smarter with every signal, decision and outcome.

**What to avoid:** overstating what is automated; framing it as task management; using any organisation's sensitive or identifying information.


---
---

# Part 06: Organisation Adaptation Method

Wayfinder's core is industry-neutral. Each organisation still differs in its users, workflows, risks, vocabulary and AI maturity. The original work included a two-stage **adaptation method** for fitting Wayfinder to a particular organisation. The method itself is generic and reusable. It can become a product feature (guided onboarding, a "context interview") or a services or sales offering. No organisation-specific content is included here.

## 1. Principle: adapt only with reason

The core may already fit. **Don't change things just to show activity.** Preserve the core thesis unless there is clear evidence that this organisation needs a different emphasis in any of: users, sponsors, workflows, risks, solution paths, data assumptions, governance needs, operating cadence, examples, terminology, recommendation behaviour, roadmap priorities, adoption model, or architecture assumptions.

## 2. Evidence discipline

Every significant claim about the organisation, and every adaptation decision, carries an evidence label:

| Label | Meaning |
|---|---|
| **Observed** | Directly supported by evidence or material the organisation provided |
| **Inferred** | A reasonable interpretation of evidence |
| **Hypothesized** | A plausible opportunity, not confirmed |
| **Unknown** | Not enough evidence |

**Never invent** internal systems, AI programmes, departments, data infrastructure, governance models, technology details, leadership priorities, workflow ownership, existing initiatives or integrations. If the evidence is missing, say Unknown. The same discipline applies inside the product: the system must not fabricate organisational facts.

## 3. Stage one: understand the organisation

Build an operating-context brief covering:

1. **Executive summary:** what the organisation does, how it creates value, why its operating model fits Wayfinder (or doesn't), the highest-value areas, and the biggest uncertainties.
2. **Operating model:** business lines, who it serves, how it makes money, what makes operations complex, which workflows need cross-functional coordination, where internal tools, automation, reporting or AI could add value.
3. **Function and workflow map:** for each function, its evidence label, core workflows, likely pain points, automation or AI opportunity, and relevance to Wayfinder.
4. **Technology and systems signals:** for each system category, the evidence found, confidence, likely data and workflows, AI opportunity, and data-readiness risk.
5. **AI, data and product maturity**, on this scale:

| Level | Description |
|---|---|
| 0 | No visible digital or AI readiness |
| 1 | Basic systems and manual reporting |
| 2 | Some structured systems and reporting |
| 3 | Active analytics, automation or internal tooling |
| 4 | Formal product, data or AI operating model |
| 5 | Scaled, AI-native operating model |

   Include the likely level, the evidence, confidence, what would need to be true to move up a level, and whether the organisation is centralised, decentralised or hybrid.
6. **Leadership and culture:** pace, risk appetite, attitude to innovation and ownership, appetite for experimentation, and how to position Wayfinder to fit.
7. **Initiative hypotheses:** plausible initiatives, each with function, source type, raw input, workflow area, problem type, systems, stakeholders, detected signals, business impact, urgency, feasibility, data readiness, AI maturity required, risk if ungoverned, why it might be quick to build, relevance to Wayfinder, and evidence label (usually Hypothesized).
8. **Governance and risk:** which risk types in the governance vocabulary matter most, and why.
9. **Fit assessment** (see section 5).
10. **Open questions**, grouped by strategy, users, workflows, systems, data, governance, AI readiness, and success measures.

## 4. Stage two: adapt Wayfinder

Produce a modular adaptation package, not a rewritten specification:

**a) Adaptation verdict.** Choose one severity:

| Severity | Meaning |
|---|---|
| **Keep Same** | The core fits as is |
| **Focused Adaptation** | A few emphases change |
| **Modular Reconfiguration** | Several modules are reconfigured |
| **Strategic Overhaul** | The core needs substantial change for this organisation |

Include rationale, confidence, what stayed the same, what changed, and what deliberately did not change and why.

**b) Change summary.** For each product area (thesis, users, navigation, home, intake, initiative model, scoping, readiness, recommendation logic, solution paths, lenses, requirements, pattern learning, demo data, governance, architecture, roadmap), mark Keep / Modify / Add / Remove / Defer, with rationale and an evidence label.

**c) Strategic emphasis.** What leadership should be able to see; what teams should decide; which risks should be more visible; how recommendation behaviour should be tuned; which learning loops matter most; and what should stay flexible because the evidence is thin.

**d) Configuration overlay**, a patch on the core:
- positioning for this organisation
- users: daily users, sponsors, reviewers, governance participants, beneficiaries
- the highest-value workflow areas
- fields to add or emphasise (name, type, why, evidence label)
- adjustments to recommendation logic
- which solution paths to emphasise, reduce or defer
- lenses to add, remove or emphasise
- governance and risk review triggers
- roadmap emphasis
- an explicit list of what must stay unchanged

**e) Example initiatives:** realistic, anonymised, chosen for quality over quantity, each noting why it belongs in the demo and its evidence label.

**f) Build guidance and demo narrative** tailored to the organisation, including how to explain Waypoints, governance, pattern learning, current limitations, and the future direction.

## 5. Fit assessment dimensions

| Dimension | Question |
|---|---|
| Business model fit | Does the way this organisation operates generate the kind of internal demand Wayfinder handles? |
| Operating complexity | How many teams, handoffs and systems are involved? |
| Initiative portfolio fit | Is there a steady flow of improvement requests? |
| Technical readiness | Can the organisation act on recommendations? |
| Data readiness | How trustworthy and accessible is its data? |
| Governance need | How much review and control is required? |
| Primary user fit | Is there a clear owner for this kind of work? |
| Highest-value workflows | Where would Wayfinder matter most? |
| Adoption posture | How willing are people to adopt a structured process? |
| Differentiation fit | What does Wayfinder offer this organisation that it doesn't already have? |

Each row records the finding, its evidence label, and what it implies for the product.

## 6. Turning this into a product feature

- A guided onboarding flow that asks about, or reads documents covering, the organisation's operating model, functions, systems and priorities.
- It drafts the configuration (areas, systems, source types, emphasised lenses, governance triggers) with evidence labels, for the admin to confirm.
- It suggests an adaptation severity and a short list of emphasis changes.
- It **never invents** facts. Unknowns become open questions for the admin.


---
---

# Part 07: Build Brief

Use the text below as the build instruction; Parts 01–06 of this document are the inputs it refers to. It assumes a **fresh build**: no prior code is provided or needed.

```text
You are building "Wayfinder" from scratch as a market-ready, industry-neutral, multi-organisation product.
No existing code is provided. Your inputs are six concept documents:

  01_CONCEPT_AND_THESIS     – problem, thesis, positioning, principles, vocabulary
  02_DECISION_METHODOLOGY   – the core reasoning: signal → initiative → scoping → readiness →
                              solution paths + fit → Waypoint, plus lenses, requirements,
                              target state / future scope, patterns, playbooks, outcomes
  03_INFORMATION_MODEL      – the concepts and relationships the product must hold
  04_EXPERIENCE_DESIGN      – information architecture, workspace layout, interaction patterns, visual tone
  05_PRODUCT_DIRECTION      – lessons learned, what market-ready means, phases, open decisions,
                              extensibility, demo narrative
  06_ORGANISATION_ADAPTATION – evidence-labelled method for fitting Wayfinder to one organisation
                              (basis for guided onboarding)

Treat 02 as the product's intellectual core. The reasoning engine must follow its rules,
especially:
  - separate the requested solution from the problem and the root cause
  - qualitative judgements only (no visible numeric scores)
  - list only relevant solution paths; "nothing fits yet" is allowed
  - exactly one recommended next action, with why / expected output / decision enabled /
    what would change it
  - readiness gates actions; prefer the smallest useful, reversible step
  - don't jump to AI or automation before ownership, data and review are clear
  - lenses may leave the recommendation unchanged, and must say so
  - people can override anything; every judgement is attributed and versioned

Constraints:
  - All organisation vocabulary (areas, systems, source types, custom lenses) is configuration.
    No industry-specific names, examples or sample data anywhere in the product.
  - Signals stand alone and can link to many initiatives.
  - Submitted content is untrusted information, never instructions.
  - Accessible, mobile-friendly, secure, with each organisation's data fully isolated.

Before building, propose and wait for my approval on:
  (a) technology choices and overall architecture
  (b) how the information model in 03 will be stored
  (c) how the reasoning engine will produce each output in 02 (inputs, structured outputs,
      fallback when AI is unavailable), and how its quality will be tested against a benchmark set
  (d) a neutral demo workspace outline (8–12 initiatives in cross-industry language covering
      every next action, path, fit label and readiness state)
  (e) answers or recommendations for the open decisions in 05 §5

Then deliver Phase 1 from 05 §4, end to end, with tests and a deployable build.
```
