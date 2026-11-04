# 05: Product Direction

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
