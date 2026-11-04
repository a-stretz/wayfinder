# Wayfinder: Explanation of This Version

> **For the Claude session receiving this file.** This document explains one existing version of a product called **Wayfinder**: what it is, the thinking behind it, the decision method it embodies, how each part of the application behaves, what information it holds, how it looks, and what it does and does not do. It is a description, not a plan. It contains no code, no sample data, and nothing specific to any industry or organisation, and it gives no instructions for future work.
>
> Two sources are described:
> - **The application**: what a user can actually see and do in this version.
> - **The specification**: the product definition this version was built from. Where the specification defines something the application doesn't show, this document says so.
>
> **Parts:** 1 Concept · 2 Decision Method · 3 Information Held · 4 Screens and Behaviour · 5 Visual Design · 6 Scope of This Version · 7 Organisation Adaptation Method

---

## Part 1: Concept

### 1.1 What Wayfinder is

Wayfinder is an **internal initiative intelligence and decision-support tool**. It is aimed at the stage *before* work is committed to delivery, when a request is still a rough idea, complaint, or ask. Its central question is:

> "Given what we know right now, what is the real problem, what should we do next, and which solution path is most appropriate?"

It is positioned explicitly as **not** a project-management tool, ticket tracker, PRD generator, autonomous agent, or numeric scoring engine. Its value is the reasoning it presents, not record-keeping.

### 1.2 The thesis

Internal improvement requests usually arrive phrased as solutions: "we need a dashboard", "can AI help with this", "we should automate this", "this spreadsheet keeps breaking", "we need better visibility", "we missed a deadline", "someone built a quick prototype; should it become real?". Taken literally, these lead teams to build before they understand the workflow, ownership, data or risk.

Wayfinder converts such scattered inputs into structured initiatives. Each initiative carries its context, source signals, scoping analysis, candidate requirements, solution path options, decision lenses, future scope, and pattern learning. Its stated core value is *helping teams move from scattered internal demand to better product decisions*: the useful output is insight about what should happen next.

### 1.3 Intended users

- **Primary:** product managers, product leaders, operations leaders, and internal-systems leaders who discover, shape, prioritise and route internal improvement work.
- They need to make sense of messy inputs, decide what is worth solving, separate symptoms from root causes, judge whether something is ready, choose the right kind of next step, and explain the reasoning to stakeholders.
- Executives are a secondary audience for the portfolio-level views.

### 1.4 Goals stated by the specification

1. Capture scattered internal signals.
2. Attach signals to new or existing initiatives.
3. Synthesise raw input into structured context.
4. Evaluate readiness.
5. Surface workflow, stakeholder, system, data and governance considerations.
6. Produce medium-depth candidate requirements.
7. Compare solution paths without false precision.
8. Recommend the next useful action.
9. Apply decision lenses that adjust emphasis.
10. Keep the target state and future scope visible without distracting from the immediate action.
11. Learn from patterns, outcomes, successes and failures.
12. Remain open to later connection with AI models, connectors, file ingestion and similar capabilities.

### 1.5 Stated non-goals

Not a full project-management system; not a ticket-tracker replacement; not an "automated corporate brain"; not a real-time autonomous agent system; not a complete PRD generator; not a production AI-orchestration platform; not a source of truth for all enterprise workflows; not a forced numeric scoring engine.

### 1.6 Distinctive ideas

| Idea | Meaning |
|---|---|
| **Qualitative judgement over false precision** | Fit labels and qualitative assessments, never numeric scores |
| **A single clear recommendation** | Each initiative has one recommended next action and one recommended solution path |
| **Lenses that may agree** | Applying a different priority can leave the recommendation unchanged, and the product says so explicitly |
| **Requirements as decision tools** | Early requirements are shown to expose cost, risk and prerequisites before commitment |
| **"Not yet" as a real answer** | Discovery, workflow mapping, data validation and deferral are legitimate recommendations |
| **Pattern learning** | Each initiative records reusable lessons that are aggregated across the portfolio |

### 1.7 Vocabulary

| Term | Meaning in this version |
|---|---|
| **Signal** | A raw input: meeting note, request, file, pain point, workflow issue, dashboard ask, prototype, AI idea |
| **Initiative** | The central object; a full workspace for one problem |
| **Solution Path** | One of eight broad ways to address an initiative |
| **Fit** | A qualitative label for how well a path suits an initiative: Strong, Good, Possible, Later, Poor |
| **Waypoint** | The specification's name for the recommendation section. **The application labels it "Recommended Path".** |
| **Decision Lens** | A priority perspective. **The application labels it "Prioritization Lens"; the user guide calls it "Decision Priority".** |
| **Target State** | The desired future outcome (shown in the app as "Key objective" and "Target State") |
| **Future Scope** | Later capabilities, deferred requirements, dependencies and revisit triggers |
| **Pattern** | A recurring pain point, blocker, system, data issue or requirement shape |
| **Playbook** | Reusable guidance for a common situation |
| **Map** | The specification's general term for a structured view (requirements, workflows, options) |

The specification's naming guidance: "Wayfinder" for the system; "Initiative" as the primary object; "Waypoint" only for the recommendation output; keep the navigation metaphor light.

### 1.8 Success criteria stated by the specification

A user opening Wayfinder can quickly understand: what initiatives exist; what signals inform them; which need action; what the recommended next action is; why; which paths are viable; what requirements are emerging; what future state each initiative aims at; what patterns appear across the organisation; and how the system would become smarter as more inputs and outcomes accumulate.

---

## Part 2: Decision Method

This is the reasoning framework the version embodies. Some of it appears in the application; some is defined only in the specification. Each section says which.

### 2.1 Pipeline

The specification defines the flow as:

```
Signal → Initiative → Scoping Analysis → Candidate Requirements → Solution Paths → Waypoint → Outcome Learning
```

The demo materials summarise it as **Signal → Initiative → Solution Path → Action**.

### 2.2 Signals

**Specification:** a signal is raw or semi-structured input that either creates a new initiative or attaches to an existing one. It lists these sources: meeting note, stakeholder request, uploaded document, data import, email excerpt, existing project description, dashboard request, workflow complaint, prototype idea, AI idea, manual note, roadmap item, research finding, support or operations issue. A signal should record a title, source type, date added, raw input or summary, any attached file, extracted pain points, extracted systems, extracted stakeholders, a suggested initiative match, and whether it created or attached.

**Application:** a signal holds a source label, a summary, and an "observed impact" note. It recognises eight source labels: Meeting Notes, File, Stakeholder Request, Pain Point, Workflow Issue, Dashboard, Prototype, AI Idea. Signals added during use take their source label from the title the user typed, defaulting to "Added Signal" (or "Initiative Signal" when added from inside an initiative). Signals live inside an initiative; there is no separate signal list or inbox.

### 2.3 Initiative

**Specification:** each initiative is a full workspace with ID, title, objective, department, workflow area, status, readiness, owner, stakeholders, systems, created and updated dates, context summary, problem statement, requested solution, root-cause hypothesis, recommended next action, Waypoint rationale, primary and relevant solution paths, candidate requirements, requirements by path, target state, future scope, attached signals, related patterns, and outcome learning.

**Application:** see Part 3 for what is actually held.

### 2.4 Lifecycle status (specification only)

Newly discovered · Already known · Active · Stalled · Revisiting · Ready for prototype · Ready for engineering handoff · Deferred. **Not shown in the application.**

### 2.5 Readiness states (specification only)

| State | Meaning |
|---|---|
| Unclear | The request is vague, solution-first, or lacks context |
| Problem Defined | The pain is clear; requirements or data are not ready |
| Requirements Emerging | Early requirements can be mapped; the path isn't final |
| Prototype Ready | A narrow, low-risk test could validate the idea |
| Engineering Ready | Scope, data, owners, risks and requirements are clear enough for formal planning |
| Defer / Revisit | The problem may be real, but timing, ownership, value or readiness is insufficient |

**Not shown in the application.**

### 2.6 Scoping analysis

**Specification:** eight dimensions, each assessed qualitatively (Clear, Partial, Unclear, High, Medium, Low, Needs validation):

| Dimension | Core question |
|---|---|
| Business Pain | Is there a real operational problem, or just a requested feature? |
| Workflow Clarity | Do we understand how the process works today? |
| Stakeholder Ownership | Who owns the problem, process, decision and outcome? |
| Data Readiness | Are the required inputs, sources, entities and quality issues known? |
| Requirement Clarity | Can early requirements be described? |
| Solution Fit | Which solution paths appear viable? |
| Risk / Governance | What could go wrong if the solution is inaccurate, unsupported or poorly adopted? |
| Value Potential | What improves if this works? |

**Application:** scoping is a single written paragraph per initiative, shown as "Current understanding". The eight dimensions are not displayed separately.

### 2.7 Recommended next actions (ten)

Used in both the specification and the application.

| Action | Meaning |
|---|---|
| Run Discovery | The problem is not yet clear enough |
| Map Workflow | The current process, ownership or handoffs need to be understood |
| Define Requirements | The problem is known, but solution needs are not specific |
| Validate Data | Data sources, quality or access are uncertain |
| Build Prototype | A narrow, low-risk test could clarify value |
| Create Reporting View | Visibility is the main need and the data is available |
| Automate Workflow | Repetitive actions or notifications can be systematised |
| Assess AI Fit | AI may help, but use case, data, risk and review model need validation |
| Prepare Engineering Handoff | Scope is mature enough for formal delivery planning |
| Defer / Revisit | Not enough value, urgency, ownership or readiness |

### 2.8 Solution paths (eight)

Used in both the specification and the application.

| Path | When it fits |
|---|---|
| Process Improvement | Ownership, handoffs, checklists, policies or workflow discipline need improvement |
| Reporting / Visibility | The issue is surfacing, monitoring, summarising or visualising known information |
| Workflow Automation | Repetitive routing, reminders, approvals, notifications, status updates or data movement |
| AI-Assisted Workflow | AI could summarise, classify, extract, draft, search, compare, reason or recommend |
| Lightweight Prototype | A narrow, low-risk tool could test value before formal investment |
| Formal Engineering | Reliability, integrations, permissions, scale, audit history or production support are required |
| Knowledge / Memory Layer | Repeated questions, scattered documents, unclear decisions or lost institutional context |
| Defer / Revisit | Not enough value, clarity, ownership, urgency, timing or feasibility |

**Specification rules:** show only relevant paths; never force a fixed number; if no path is viable, say so and recommend discovery, mapping, data validation or deferral. Each path should state its fit, why it fits, what it would require, its key risk or unknown, and its relationship to the Waypoint.

**Application:** each displayed path shows its fit label and a one-sentence rationale. The primary path carries a "Recommended" badge.

### 2.9 Fit labels

| Label | Meaning | Specification visual | Application visual |
|---|---|---|---|
| Strong | Top recommended path | Green with primary-accent highlight | Navy |
| Good | Viable and well supported | Green | Sage green |
| Possible | Plausible, needs validation | Yellow | Peach |
| Later | Useful later, not the first move | Yellow | Light grey |
| Poor | Not supported now; used rarely, mainly to explain why a requested path isn't appropriate yet | Red | Light grey (same as Later) |

### 2.10 The Waypoint / Recommended Path

**Specification:** a prominent recommendation section answering "What should happen next?", deliberately placed *after* context, inputs and scoping, so the reader understands why it exists. Its fields are: recommended next action; why it is recommended; what the action should produce; what decision it enables; what would change the recommendation.

**Application:** a "Recommended Path" panel showing the primary solution path, a rationale, and a highlighted "Recommended next action". The rationale shown is the primary path's own rationale; if there isn't one, the scoping paragraph is shown instead. The separate fields for output, decision enabled, and what would change it are not shown. The panel appears near the top of the initiative page, after a compact problem summary, rather than after signals and scoping.

### 2.11 Recommendation reasoning patterns

The recommendations written into this version consistently follow these patterns, which reflect the specification's guidance:

1. When the problem is unclear or idea-driven, the next action is **Run Discovery**.
2. When ownership, handoffs or process are unclear, the next action is **Map Workflow** and the primary path is **Process Improvement**. Reporting and automation are rated Good, Possible or Later until the process is understood.
3. When visibility is wanted but status definitions, fields or sources are inconsistent, the next action is **Validate Data**, with **Reporting / Visibility** as the primary path.
4. When the need is understood but the reporting contents, audience or fields are undefined, the next action is **Define Requirements**, with a **Lightweight Prototype** rated Good as a way to test the format.
5. AI is never the first build. AI-Assisted Workflow is typically **Later** or **Possible** until schema, governance and review are defined, and AI-oriented lenses move the action to **Assess AI Fit**.
6. Automation is typically **Possible** until ownership and source of truth are settled. "Automating before ownership is clear" is recorded as a failed or deferred approach.
7. Formal Engineering is typically **Later** until the workflow is validated.
8. When ideas arrive faster than they can be routed, the primary path is a **Knowledge / Memory Layer**, starting with structured intake.
9. In each initiative, exactly one path is rated **Strong**, and it matches the recommended path.

### 2.12 Decision lenses

**Eight lenses**, each with a canonical name and a display label used in the application:

| Canonical name | Display label | Purpose |
|---|---|---|
| Fastest Useful Output | Quickest Delivery | Quick visible value |
| Low Engineering Lift | Easiest to Build | Little formal engineering |
| Safer First Step | Lowest Risk | Low-risk, reversible moves |
| Executive Visibility | Visibility | Leadership clarity and decision support |
| AI Leverage | AI Opportunity | AI-assisted opportunities |
| Operational Stability | Stability | Reliable, supportable approaches |
| Cost Sensitive | Cost Control | Avoid expensive or resource-heavy options |
| Scale Ready | Scalability | Durable solutions that can grow |

**What a lens shows:** the lens applied; "Recommendation changed: Yes / No"; the current recommended next action under that lens; emphasis changes; paths affected; new questions to ask; future direction.

**Central principle:** a lens does not have to change the recommendation. When it doesn't, the application says: *"The recommendation stays the same. The prioritization lens changes emphasis, tradeoffs, and follow-up questions."*

**How lenses behave in the application:** lens results are written in advance for each initiative. Each example initiative has results for three of the eight lenses, and exactly one of those three changes the recommendation. Lenses without a result appear but can't be selected. Examples of the recorded behaviour:
- a visibility-oriented lens moving a workflow-mapping initiative to *Create Reporting View*;
- a stability lens moving a data-validation initiative to *Map Workflow*;
- a speed lens moving a requirements-definition initiative to *Build Prototype*;
- an AI lens moving an action to *Assess AI Fit*;
- risk, cost, ease and scale lenses usually confirming the existing action while sharpening the questions.

Initiatives created during use get three generated lens results (see Part 4.5).

### 2.13 Candidate requirements

Requirements are presented as **decision tools**: they expose cost, complexity, risk, feasibility and prerequisites before a path is committed to. Their depth is "medium": more than filler, less than a full specification. There are eight categories, used in both the specification and the application:

| Category | Covers |
|---|---|
| Business Requirements | Desired outcome and decision need |
| User Requirements | What users need to do, know, submit, review or decide |
| Workflow Requirements | Steps, handoffs, triggers, approvals, exceptions, ownership |
| Data Requirements | Entities, fields, documents, sources, quality, cadence |
| System Requirements | Tools, integrations, permissions, environments, dependencies |
| AI / Automation Requirements | Classification, extraction, summarisation, generation, routing, review, confidence |
| Governance Requirements | Review rules, auditability, risk controls, escalation, compliance, support ownership |
| Success Metrics | How impact is measured |

Each requirement carries a short **rationale**. Requirements appear two ways: a general **candidate requirements map** and **requirements by solution path**, which shows what each path would add. Recurring requirement shapes (e.g. *owner, status, deadline, source, escalation rule*) are recorded as reusable patterns.

### 2.14 Target state and future scope

The Waypoint is *what to do now*; the **Target State** is *where the initiative is heading*. The specification describes future scope as "the carrot on the stick": visible, but secondary.

| Element | Meaning | In the application? |
|---|---|---|
| Target State | The desired future outcome; the specification says it is editable | Shown, read-only |
| Later Capabilities | Possible future features or workflows | Yes |
| Deferred Requirements | Useful requirements not needed now | Yes |
| Dependencies | What must be true first | Yes |
| Not Recommended Yet | Attractive but premature ideas | Specification only |
| Triggers to Revisit | Signals that would make future scope worth revisiting | Yes |

### 2.15 Pattern learning

Framed as a lightweight learning mechanism, not a "corporate brain". Each initiative records eleven pattern lists:

repeated pain patterns · common blockers · similar initiatives · recurring systems · reusable requirement patterns · solution paths chosen · successful solution approaches · failed or deferred approaches · common discovery gaps · data readiness issues · stakeholder ownership problems.

The specification adds a twelfth, model or recommendation performance feedback, which the application doesn't include. According to the specification, the purpose is to improve future scoping, requirement suggestions, path recommendations, similar-initiative matching, playbook refinement, lens behaviour, analysis guidance, and future training data. In the application, six of these lists are counted across the whole portfolio (see Part 4.6).

### 2.16 Playbooks

A playbook is reusable guidance for a recurring situation: *when to use it, recommended first actions, typical solution paths, common risks*. The application contains three:

| Playbook | When to use | First actions | Typical paths | Common risks |
|---|---|---|---|---|
| Workflow Visibility Gaps | Critical work is spread across email, spreadsheets, meetings and personal tracking habits | Map Workflow; Define ownership; Create a shared operating view | Process Improvement; Reporting / Visibility | Automating before ownership is clear; Confusing reporting with process control |
| Data Readiness Before Reporting | Teams need visibility, but source fields, status language or ownership are inconsistent | Validate Data; Normalize status definitions; Confirm trusted fields | Reporting / Visibility; Workflow Automation | Building dashboards from unreliable fields; Skipping source-of-truth decisions |
| Structured Intake and Memory | Ideas, requests and issues appear faster than they can be routed | Run Discovery; Define intake fields; Route to the right solution path | Knowledge / Memory Layer; Lightweight Prototype; AI-Assisted Workflow | Letting informal ideas become ungoverned work; Treating AI as the default answer |

The specification also describes the Playbook area as explaining the method itself (solution paths, fit labels, readiness states, requirement categories, lenses, Waypoint logic, the learning model). The application shows only the three playbooks.

### 2.17 Outcome learning (specification only)

The specification includes outcome notes and outcome tracking for completed initiatives. **Not present in the application.**

---

## Part 3: Information Held by the Application

Each initiative holds:

| Item | Description |
|---|---|
| Identifier and title | |
| Department | One value from a fixed list of six functional areas (the list reflects the original demo context) |
| Problem summary | Short statement of the problem |
| Context summary | Situation behind the initiative |
| Signals | Two or three per example initiative; each has a source label, a summary and an observed impact |
| Scoping analysis | One paragraph |
| Recommended next action | One of the ten actions |
| Primary solution path | One of the eight paths |
| Solution paths | Three to five paths in the examples, each with a fit label and a rationale |
| Candidate requirements | All eight categories; each item has text and a rationale |
| Requirements by solution path | One to three paths in the examples, each with its own categorised requirements |
| Target state | One sentence |
| Future scope | Later capabilities, deferred requirements, dependencies, revisit triggers |
| Pattern learning | The eleven lists in 2.15; "similar initiatives" holds other initiatives' titles as plain text |
| Lens results | Pre-written results for some lenses (three in the examples), each with the seven outputs in 2.12 |

The application **does not hold**: status, readiness, owner, stakeholders, systems as a field, dates, requested solution, root-cause hypothesis, separate Waypoint fields, per-path requirements, risk or relationship fields, "not recommended yet", or outcomes.

The application ships with a small set of hand-written example initiatives. Their content is out of scope for this document.

---

## Part 4: Screens and Behaviour

### 4.1 Overall shell

- A **dark navy sidebar** on the left with the brand lockup (a rounded "W" mark, "Wayfinder", and the subtitle "Strategy intelligence"), five navigation items, and a footer note: *"Prototype mode: Local data, simulated structuring, no persistence."*
- Navigation items: **Home**, **Initiative Queue**, **Add Signal**, **Pattern Intelligence**, **Recommendation Playbook**.
- Each page opens with a header: the small label "Wayfinder workspace", a title, a one-line purpose, an optional primary button, and a compass logo.

| Page | Purpose line | Header button |
|---|---|---|
| Home | See the highest-priority initiatives, recommended next actions, and emerging operational patterns. | Add signal |
| Initiative Queue | Search, filter, and open candidate workstreams for scoping and recommendation. | Add signal |
| Add Signal | Convert a rough operational issue into a structured initiative draft. | Generate draft |
| Pattern Intelligence | See repeated blockers, workflow gaps, data issues, and reusable solution patterns across initiatives. | (none) |
| Recommendation Playbook | Understand how Wayfinder routes work to practical solution paths. | (none) |

- Opening an initiative replaces the current page with the initiative page. No navigation item is highlighted while an initiative is open. Choosing any navigation item closes the initiative.
- Pages have no web addresses of their own. Refreshing returns to Home and discards anything added.

### 4.2 Home

From top to bottom:

1. **Hero panel** (dark navy):
   - Label "Strategic intelligence cockpit".
   - Headline: *"Wayfinder turns scattered operational demand into structured decisions, practical next actions, and recommended solution paths."*
   - Supporting line: *"Use it to move from raw requests and messy notes to a clear initiative queue, visible tradeoffs, and a recommended first step."*
   - An "Add Signal" button.
   - A four-step guide: review the top recommended initiatives → open an initiative to inspect the recommendation → apply a prioritisation lens to see how emphasis changes → add a new signal through intake.
   - A **"Raw request → Wayfinder output"** comparison with three rows. Each row pairs a solution-first request with Wayfinder's answer and a one-line reason. The three answers are *Map Workflow first* (owners and rules are unclear, so a dashboard would be premature), *Assess AI Fit* (review and source-linking needs must be validated before AI touches a sensitive workflow), and *Build Prototype* (narrow, structured and reversible, so this is the right moment to build). The example requests are specific to the original demo domain.
   - An "Example recommended next action" card showing a *Map Workflow* recommendation and its reason.
2. **"Recommended next moves"**: three cards for the first three initiatives in the list. The first card is larger ("featured") and shows a longer summary. Each card shows a department chip, the next action, the title, a summary, and the recommended path.
3. **Initiative Overview**: totals for initiatives and signals; counts by department and by primary path.
4. **Emerging Patterns**: the four most frequent pain patterns, common blockers and data-readiness issues, with counts.
5. **Recent Signals**: the first five signals across all initiatives, each with its parent initiative and department. These are shown in list order, because signals carry no dates.
6. **Recommended Next Actions**: how many initiatives have each next action.

### 4.3 Initiative Queue

- A search box matches text in the title and problem summary, ignoring case.
- Three dropdown filters: **Department**, **Next action**, **Solution path**, each defaulting to "All". Search and filters combine, and an initiative must match all of them.
- Each result row shows the department, the primary path, the title, a shortened summary, and its "Next action". Selecting a row opens the initiative.
- When nothing matches: *"No initiatives match these filters. Adjust the search text or filters to broaden the initiative queue."*
- There is no sorting control. Results appear in list order, with initiatives created during the session listed after the examples.

### 4.4 Initiative page

A full page, not a pop-up. From top to bottom:

1. A **"Back to Initiative Queue"** button.
2. **Header:** department, title, problem summary.
3. **Problem understanding**, four cards:
   - **Problem**, with the fixed heading *"What needs to be understood before choosing the path?"* followed by the context summary.
   - **Current understanding**: the scoping paragraph.
   - **Key objective**: the target state.
   - **Requirement signals**: up to four requirements, drawn in order from the Business, Workflow and Success Metrics categories.
4. **Recommended Path:** the primary path, its rationale, and a highlighted "Recommended next action".
5. **Decision brief:** the line *"Start with the problem, then scan the decision support only as needed."*, with jump links to Signals, Prioritization lens, Solution options and Supporting detail.
6. **Initiative signals:** the heading "Add new information to shape the next step", the list of attached signals, and a form.
   - *New signal or context*, which is required. Placeholder: *"Paste an update, meeting note, stakeholder concern, source detail, or workflow discovery note."*
   - *Optional impact / notes*. Placeholder: *"Why this changes urgency, scope, risk, or ownership."*
   - Submitting adds the signal to the list and clears the form. The page explains that in a full product, new signals would refresh the requirements, lens and recommendation. In this version, nothing else on the page changes.
7. **Prioritization lens:**
   - The prompt *"Are there unique prioritization factors here that may influence the recommendation? Click a lens below to see how speed, build effort, visibility, risk, or stability may alter the path, tradeoffs, and next questions."*
   - All eight lenses are shown as buttons. Lenses without a pre-written result are greyed out.
   - Before a selection: *"Select a prioritization lens to see how it changes emphasis."*
   - After a selection: the result described in 2.12, including the steady-state message when the recommendation doesn't change.
   - Only one lens can be active at a time, and a selection can't be cleared, only switched.
8. **Solution options:** one card per path, with its fit label, a "Recommended" badge on the primary path, the path name and its rationale.
9. **Supporting detail**, four collapsible sections:
   - **Candidate requirements map** (open by default; *"Open when the recommendation needs to become scoped delivery work."*): eight category cards, each listing requirements and rationales, or "No candidate requirements yet".
   - **Requirements by path** (*"How solution choices change the work."*): one card per path, showing only categories that have content.
   - **Future scope** (*"Target state, dependencies, and later decisions"*): the target state, plus lists of later capabilities, deferred requirements, dependencies and triggers to revisit.
   - **Pattern learning** (*"Signals this initiative contributes"*): all eleven pattern lists.

### 4.5 Add Signal (intake)

**Layout:** a form on the left and a "Simulated structuring" panel on the right. The panel notes that signals can create a new initiative or add context to an existing one, and that in a full system these inputs would refresh requirements, priority and recommendation.

**Form:**
- Heading: *"Paste the rough issue, request, note, or idea."*, followed by an example prompt specific to the original demo domain.
- A two-way switch: **Create new initiative** / **Attach to existing initiative**. Choosing "existing" reveals a dropdown of all initiatives.
- **Title** (optional).
- **Departments involved**: chips for the six functional areas, any number of which can be selected. At least one always stays selected. The first selected becomes the initiative's department, which is shown as "Primary department for new initiatives: …".
- **Raw input / signal**: a large text box.
- **Optional tags or notes**: a single line.
- A **Generate draft** button. The header button does the same thing.

**How the draft is produced.** This is the only automatic classification in this version. The title, raw input and notes are combined and checked for keyword families. Each family sets a next action and a primary path. The families are checked in the order below, and **the last one that matches decides the result**:

| Order | If the text contains any of… | Next action | Primary path |
|---|---|---|---|
| (no match) | | Run Discovery | Process Improvement |
| 1 | "report", "visibility", "dashboard", "status" | Create Reporting View | Reporting / Visibility |
| 2 | "automate", "handoff", "routing" | Map Workflow | Workflow Automation |
| 3 | "ai", "summary", "idea" | Assess AI Fit | AI-Assisted Workflow |
| 4 | "data", "field", "source" | Validate Data | Reporting / Visibility |

Keywords match anywhere in the text, including inside longer words. For example, "ai" also matches words that merely contain those letters.

The **supporting paths** are always the first three paths in the standard order (2.8), skipping the primary path and Defer / Revisit. They don't depend on what was typed.

**The draft panel shows:** the title (default "Untitled Operational Signal"), the summary (default *"A rough operational signal needs discovery before the right solution path can be selected."*), the departments involved, the recommended next action, the recommended path, and the supporting paths. Before any draft exists: *"No draft generated yet. Add a signal and generate a structured initiative draft."*

**Creating an initiative** ("Add to Initiative Queue") builds a complete initiative from fixed starting content and then switches to the Initiative Queue:

- **Context:** *"This initiative was created through the simulated intake flow. It should be reviewed, scoped, and refined before any delivery path is chosen."*
- **Scoping:** *"The draft should be reviewed for workflow ownership, source data readiness, expected users, and the first useful operating output."*
- **Solution paths:** the primary path rated **Good** (*"Suggested by the simulated intake template based on the signal language."*). Each supporting path is rated **Possible** (*"Potential supporting path once discovery clarifies workflow, data, and ownership."*). A new initiative is never rated Strong.
- **Requirements:**
  - Business: *"Clarify the operating problem and intended business outcome."*
  - Workflow: *"Identify the current workflow, owners, handoffs, and decision points."*
  - Success Metrics: *"Define what a useful first outcome should make easier to see, decide, or do."*
  - The same three are listed under the primary path.
- **Target state:** *"The issue is shaped into a clear initiative with a recommended next action, candidate path, and enough context for practical follow-up."*
- **Future scope:**
  - Later capabilities: additional requirements mapping, decision-priority review, reusable playbook alignment.
  - Deferred: persistence, automated analysis, system integrations.
  - Dependencies: workflow owner, source context, discovery conversation.
  - Revisit triggers: repeated signals appear, ownership becomes clear, data source is validated.
- **Pattern learning:**
  - Pain: "Unstructured signals need a clear routing path".
  - Blockers: "Incomplete source context", "Unclear next-step owner".
  - Systems: email, spreadsheets, meetings.
  - Requirement pattern: "Problem, owner, workflow, data source, next action".
  - Successful approach: "Structure the signal before choosing a build path".
  - Failed approach: "Moving directly from idea to implementation".
  - Discovery gap: "Who owns the workflow and where the source signal lives".
  - Data issue: "Source details may be incomplete at intake".
  - Ownership problem: "Submitter and accountable owner may differ".
  - Paths chosen: the primary and supporting paths.
- **Three lens results:**
  - *Quickest Delivery*: no change; keep the first step small; ask "What useful output could be created first?".
  - *Stability*: no change; clarify owners, handoffs and review cadence before adding tooling.
  - *AI Opportunity*: the action changes to *Assess AI Fit* unless the primary path is already AI-Assisted Workflow. Emphasis: "Evaluate whether AI helps the workflow or only adds novelty."
- **Signal:** the input becomes the initiative's first signal. Its observed impact reads "Departments: …", followed by the notes, or *"Impact and urgency should be clarified during discovery."* if there are none.

**Attaching to an existing initiative** ("Attach Signal to Initiative") becomes available once a draft has been generated. It adds the signal to the chosen initiative, shows "Signal attached to [title].", and clears the raw input and notes.

Anything created or attached is kept only until the page is refreshed.

### 4.6 Pattern Intelligence

- Intro: *"Patterns show where problems repeat across the organization. This helps identify where standard solutions or playbooks should exist."*
- Six cluster cards: **Repeated Pain Patterns**, **Common Blockers**, **Data Readiness Issues**, **Recurring Systems**, **Similar Initiatives**, **Reusable Requirement Patterns**.
- Each card lists up to six items, ordered by how many initiatives mention them (ties in alphabetical order). The number in the card header is the sum of those six counts.
- Items are counted only when their wording matches exactly.
- Initiatives created during the session are included in the counts.
- The other five pattern lists (paths chosen, successful approaches, failed approaches, discovery gaps, ownership problems) appear on individual initiative pages but aren't aggregated here.

### 4.7 Recommendation Playbook

- Intro: *"Playbooks provide repeatable approaches to common operational problems."*
- Three numbered cards (01–03) showing the playbooks in 2.16, each with *Recommended first actions*, *Typical solution paths* and *Common risks*.
- A footer band: *"Current playbook logic is informed by [number] initiatives and recurring patterns such as [top pain pattern] and [second pain pattern]."* Only this sentence changes with the data; the playbooks themselves are fixed.

---

## Part 5: Visual Design

### 5.1 Tone

The specification asks for a look that is calm, structured, executive-readable and focused on product operations: clean hierarchy, subtle status treatments, strong whitespace, and clear labels. It explicitly avoids futuristic AI aesthetics, neon, excessive icons, overused map or navigation metaphors, dense dashboards, fake complexity, and numeric precision the evidence can't support.

### 5.2 Palette

| Role | Colour |
|---|---|
| Primary accent (dominant) | `#ee8922` warm orange |
| Main dark | `#0a1045` deep navy |
| Supporting green | `#73937e` sage |
| Supporting red | `#a12523` brick red |
| Supporting mauve | `#8e6c88` plum |

Supporting tones: a soft peach for accent chips and "Possible" fit; warm cream to cool-grey page backgrounds; dark ink for text; a medium grey for secondary text.

### 5.3 Look and feel

- **Background:** a soft gradient from warm cream to cool grey, with faint orange and sage glows.
- **Sidebar:** a deep navy gradient with a warm orange glow. The active item has an orange-tinted fill, an orange border, and an orange bar on its left edge.
- **Emphasis panels** (the Home hero): deep navy with orange and sage glows.
- **Cards:** white or slightly translucent, generously rounded, with soft, wide shadows and fine borders.
- **Eyebrow labels:** small, uppercase, heavy labels above section headings, used throughout to name each block.
- **Chips:** pill-shaped. Dark chips for department, peach chips for next action and accent, muted chips for paths.
- **Recommended badge:** pale orange with dark orange text.
- **Typography:** a clean sans-serif (Inter or the system font), with large headings that scale with screen width and very heavy weights for labels and chips.
- **Logo:** a compass mark (a ring, cardinal and diagonal lines, and an orange arrow) shown in each page header.
- **Collapsible sections:** an "Expand" / "Review" pill on the right of each heading.

### 5.4 Responsiveness

- On wide screens, the sidebar is fixed and content uses two or three columns.
- On medium screens, the sidebar narrows and most grids become one column.
- On narrow screens, the sidebar moves above the content, the navigation becomes two columns, and everything stacks into one column.

---

## Part 6: Scope of This Version

### 6.1 What this version is

A **front-end-only prototype** that demonstrates the Wayfinder concept with hand-written example initiatives and simulated intake. The sidebar, README and demo materials all describe it this way.

### 6.2 What it does not include

- No server, no database, no sign-in. Nothing is saved, and refreshing resets everything.
- No real AI analysis. Intake uses the keyword rules in 4.5.
- No file upload or parsing, and no connections to external tools.
- No numeric scoring or prioritisation model. Home's "priority" cards are the first three initiatives in the list.
- No readiness, status, owners, dates, outcomes or editing of existing content.
- No re-analysis when signals are added.

### 6.3 Behaviours worth knowing

- New initiatives are listed after the examples, so they never appear among Home's three recommended cards.
- "Recent Signals" are not ordered by time.
- To attach a signal to an existing initiative from intake, a draft has to be generated first.
- Every initiative created through intake contributes the same starting pattern entries, which raises those entries' counts on the Patterns page.
- "Later" and "Poor" fit labels look the same.
- Terms differ between the specification, the application and the guides: Waypoint versus Recommended Path; Decision Lens versus Prioritization Lens versus Decision Priority; Initiatives versus Initiative Queue; Intake versus Add Signal.

### 6.4 Accompanying materials in this version

- **Product specification:** the full concept definition summarised in Parts 1 and 2.
- **README:** what the product is, the problem it solves, core concepts, what is and isn't included, and a feature overview.
- **User guide:** how to use each page and an end-to-end demo flow. Some button and section names in it differ from the application.
- **Demo strategy:** a seven-step walkthrough (Home → patterns and priorities → open an initiative → walk the workspace → apply a lens → create an initiative through intake → return to patterns). Talking points:
  - Wayfinder is not a task tracker; the core value is recommendation clarity.
  - The flow is Signal → Initiative → Solution Path → Action.
  - The recommended path makes the next action visible but not premature.
  - Lenses help leaders test emphasis without numeric scoring.
  - Intake is simulated.
  - Patterns and playbooks turn repeated friction into reusable guidance.

  It also says not to present the prototype as production-ready, imply AI or persistence that doesn't exist, frame it as task management, or discuss sensitive information.
- **Test plan:** manual checks for navigation, initiative selection, the initiative page, lens behaviour, intake, patterns and playbook. It also lists the known limitations above.
- **Two organisation-adaptation prompts:** see Part 7.

---

## Part 7: Organisation Adaptation Method

This version includes two prompt documents that define a generic, two-stage method for tailoring Wayfinder to one specific organisation: a research stage, then an adaptation stage. Only the method is described here. No organisation's content is included.

### 7.1 Governing principles

- **Adapt only with reason.** The core specification may already fit; changes are not made "just to show activity". The core thesis is kept unless evidence shows the organisation needs a different emphasis in users, sponsors, workflows, risks, solution paths, data assumptions, governance, operating cadence, examples, terminology, scoring logic, recommendation behaviour, roadmap priorities, adoption model, or architecture assumptions.
- **Evidence discipline.** Every major claim and adaptation decision is labelled:

| Label | Meaning |
|---|---|
| Observed | Directly supported by public evidence or provided material |
| Inferred | A reasonable interpretation of evidence |
| Hypothesized | Plausible, but not confirmed |
| Unknown | Insufficient evidence |

- **Never invent** internal systems, AI programmes, departments, data infrastructure, governance models, technology details, executive priorities, workflow ownership, existing initiatives or integrations.

### 7.2 Stage one: organisation research

The research brief covers:

1. **Executive summary:** what the organisation does, how it creates value, whether its operating model fits Wayfinder, the highest-value areas, the key uncertainties.
2. **Operating model:** business lines, who it serves, how it earns revenue, what makes it complex, which workflows need cross-functional coordination, where internal tools could add value.
3. **Department and workflow map:** for each function, its evidence label, core workflows, likely pain points, automation or AI opportunity, and relevance to Wayfinder.
4. **Technology and systems signals:** for each system category, the evidence found, confidence, likely data and workflows, AI opportunity, and data-readiness risk.
5. **AI, data and product maturity**, on a six-level scale:

| Level | Description |
|---|---|
| 0 | No visible digital or AI readiness |
| 1 | Basic systems and manual reporting |
| 2 | Some structured systems and reporting |
| 3 | Active analytics, automation or internal tooling |
| 4 | Formal product, data or AI operating model |
| 5 | Scaled, AI-native operating model |

   This section also records the evidence, confidence, what would be needed to move up a level, and whether the organisation is centralised, decentralised or hybrid.
6. **Leadership and culture:** philosophy, pace, risk appetite, attitudes to innovation and ownership, appetite for experimentation, and how to position Wayfinder.
7. **Initiative hypotheses:** each with department, source type, raw input, workflow area, problem type, systems, stakeholders, detected signals, the operational initiative, business impact, urgency, feasibility, data readiness, AI maturity required, risk if ungoverned, why it might be quick to build, relevance to Wayfinder, and evidence label (usually Hypothesized).
8. **Governance and risk:** which of these risks to emphasise:
   - financial, operational, legal, compliance, customer or client, data privacy, reputational;
   - AI hallucination, unsupported shadow tooling, unclear ownership, integration, poor source confidence, over-automation.
9. **Fit assessment** across ten dimensions: business model fit, operating complexity, initiative portfolio fit, technical readiness, data readiness, governance need, primary user fit, highest-value workflows, adoption posture, differentiation fit. Each records the finding, evidence label and product implication.
10. **Open questions**, grouped by strategy, users, workflows, systems, data, governance, AI readiness and success metrics.

### 7.3 Stage two: adaptation package

Five separate outputs, deliberately not merged into one document:

1. **Adaptation summary:**
   - A verdict on how much to adapt: **Keep Same**, **Focused Adaptation**, **Modular Reconfiguration** or **Strategic Overhaul**, with rationale and confidence, and what stayed the same, what changed, and what deliberately didn't change.
   - The fit table from 7.2.
   - A change table marking each product area (thesis, users, navigation, home, intake, initiative model, scoping, readiness, recommendation logic, solution paths, lenses, requirements, pattern learning, example data, governance, architecture, roadmap) as Keep, Modify, Add, Remove or Defer, with rationale and evidence label.
   - Strategic emphasis: what leadership should see, what teams should decide, which risks to surface, how to tune recommendations, which learning loops matter most, and what stays flexible.
2. **Specification overlay:** a patch on the core specification covering:
   - organisation-specific positioning;
   - users, sponsors, reviewers, governance participants and beneficiaries;
   - workflow emphasis;
   - added or emphasised fields (name, type, reason, evidence label);
   - recommendation-logic adjustments;
   - solution-path emphasis;
   - lens adjustments;
   - governance and risk triggers;
   - roadmap emphasis;
   - an explicit list of what remains unchanged.
3. **Initiative dataset:** anonymised example initiatives, quality over quantity. Each has title, functional area, source type, raw signal, workflow area, problem summary, requested solution, root-cause hypothesis, stakeholders, systems, detected signals, business impact, urgency, feasibility, data readiness, readiness state, next action, Waypoint rationale, primary and supporting paths, candidate requirements in all eight categories, risks, governance flags, pattern matches, success metrics, why it belongs in the demo, and an evidence label.
4. **Build instructions** tailored to the organisation.
5. **Demo narrative** tailored to the organisation:
   - premise, executive opening and walkthrough;
   - the three best example initiatives, with why each works, what it proves and what it helps decide;
   - how to explain the Waypoint, governance and pattern learning;
   - a script on current limitations, a script on future direction, and a closing value message.

The method's final rule: do not produce a fully rewritten organisation-specific specification unless explicitly asked.
