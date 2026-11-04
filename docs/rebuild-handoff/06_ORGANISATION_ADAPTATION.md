# 06: Organisation Adaptation Method

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
