# 04 Build Instructions

## Build Objective

Build or modify the Wayfinder prototype so it can demonstrate a company adaptation package for a complex real estate operating environment without hard-coding company-specific names into the product architecture.

The build should show how Wayfinder converts scattered operational signals into structured initiatives, candidate requirements, solution path recommendations, governance flags, pattern insights, and practical next actions.

The goal is not to build a production system. The goal is a credible, executive-readable, interview-ready prototype that demonstrates product judgment, AI systems thinking, governance discipline, and implementation realism.

## Inputs

Required inputs:

1. Canonical Wayfinder Core Product Spec.
2. Company adaptation summary.
3. Spec overlay.
4. Initiative dataset JSON.
5. Demo narrative.
6. Current Wayfinder codebase.
7. Existing synthetic initiative dataset, if already present.

Optional inputs:

- Visual design guide.
- Existing README.
- Existing Netlify deployment settings.
- Existing GitHub repository structure.

## Current-State Assumptions

Assume the current app is static or mock-data driven unless proven otherwise.

- Do not assume backend services exist.
- Do not assume real integrations exist.
- Do not assume live LLM calls exist.
- Do not add API keys.
- Do not connect to production systems.
- Do not use the company name in code-level identifiers, variable names, route names, component names, or comments.
- Demo content may be shaped around the company context, but the product should remain reusable.

The app should be treated as a V1 prototype with simulated intelligence.

## Page-Level Instructions

### Home

The Home page should be called **Wayfinder**.

It should provide a strategic portfolio overview:

- Total initiatives.
- High-impact initiatives.
- Initiatives needing workflow mapping.
- Initiatives needing data validation.
- Initiatives with governance flags.
- Prototype-ready initiatives.
- Priority Waypoints.
- Emerging patterns.
- Solution path distribution.
- Recent signals.
- Initiatives needing action.

The home page should make it obvious that Wayfinder is not only storing initiatives. It is helping leadership see what action is needed next.

### Initiatives

The Initiatives page should show a searchable and filterable list.

Required fields in list or cards:

- Title.
- Functional area.
- Workflow area.
- Readiness state.
- Recommended next action.
- Primary solution path.
- Business impact.
- Urgency.
- Data readiness.
- Governance flags.
- Evidence label.

Recommended filters:

- Functional area.
- Readiness state.
- Recommended next action.
- Primary solution path.
- Business impact.
- Data readiness.
- Governance flag.
- Evidence label.

### Initiative Detail

Each initiative must have a full page, not a modal.

Recommended section order:

1. Header.
2. Context summary.
3. Raw signal.
4. Problem and root-cause hypothesis.
5. Detected signals.
6. Scoping summary.
7. Waypoint recommendation.
8. Solution map.
9. Decision lens panel.
10. Candidate requirements.
11. Risks and governance flags.
12. Pattern matches.
13. Success metrics.
14. Why this belongs in the prototype.

The Waypoint should not appear before enough context is shown.

### Intake

The Intake page should simulate structured signal capture.

Include:

- Paste raw input.
- Source type.
- Functional area.
- Workflow area.
- Requested solution.
- Stakeholders.
- Systems mentioned.
- Business impact.
- Urgency.
- Data readiness.
- Evidence label.
- Preview synthesized initiative.
- Preview suggested Waypoint.
- Preview governance flags.

The V1 intake can be non-persistent or use local state only. If persistence already exists, use it safely.

### Patterns

The Patterns page should show repeated themes across initiatives.

Include:

- Dashboard request masking workflow issue.
- Data readiness validation.
- Financial control workflow.
- Document-heavy diligence.
- AI summarization with source-link requirement.
- Structured workflow automation.
- High-governance AI drafting.
- Shadow tool risk.
- Portfolio visibility.
- Knowledge layer.

Each pattern should show:

- Pattern name.
- Description.
- Related initiatives.
- Common next action.
- Common risk.
- Reusable requirement pattern.

### Playbook

The Playbook page should explain the operating model.

Include:

- What is a Signal?
- What is an Initiative?
- What is a Waypoint?
- What are Solution Paths?
- What are Readiness States?
- What are Candidate Requirements?
- What are Decision Lenses?
- What are Governance Flags?
- What is Pattern Learning?

Keep the language plain, serious, and product-ops oriented.

### Demo / README Pages

If the app has a dedicated demo or about page, include:

- Demo premise.
- What is simulated.
- What is manual.
- What future connected intelligence would unlock.
- Recommended walkthrough path.

If no demo page exists, put this in README and user guide.

## Component-Level Instructions

Create or modify components as needed:

### PortfolioSummaryCards

Displays initiative counts and portfolio health.

Inputs:

- initiatives.
- readiness states.
- governance flags.
- recommended actions.

### PriorityWaypoints

Displays top initiatives needing action.

Sort logic:

1. High business impact.
2. High urgency.
3. Governance flags present.
4. Data readiness low or medium.
5. Readiness state not engineering ready.

### InitiativeCard

Displays initiative summary with badges.

Required badges:

- Readiness state.
- Recommended next action.
- Primary solution path.
- Business impact.
- Data readiness.
- Evidence label.

### InitiativeDetailSections

Use separate section components for:

- ContextSummary.
- RawSignal.
- ScopingAnalysis.
- WaypointPanel.
- SolutionMap.
- DecisionLensPanel.
- CandidateRequirements.
- GovernanceFlags.
- PatternMatches.
- SuccessMetrics.

### WaypointPanel

Must answer:

- What should happen next?
- Why this is recommended.
- What this action should produce.
- What decision it enables.
- What would change the recommendation.

### SolutionMap

Show only relevant paths.

For V1, use the fields already present:

- primarySolutionPath.
- supportingSolutionPaths.
- waypointRationale.
- risks.
- dataReadiness.

Do not invent a top-five path list.

### GovernanceFlagList

Show flags prominently but not alarmistically.

Use concise labels such as:

- Financial control impact.
- Legal review.
- Investor/lender impact.
- Tenant/resident impact.
- Regulatory / approval risk.
- AI-generated extraction.
- Confidential data.
- Shadow tool risk.

### PatternSummary

Group initiatives by repeated patternMatches.

### IntakePreview

Shows a simulated synthesized initiative and preliminary Waypoint recommendation.

## Data Instructions

Use `03_initiative_dataset.json` as the company-shaped mock dataset.

Recommended location:

- `src/data/companyInitiatives.json`, or
- `src/data/initiatives.json`, or
- existing data folder if one already exists.

Keep the dataset generic enough to scrub.

Do not put the company name in:

- Object IDs.
- Variable names.
- Component names.
- Route names.
- File names used by app code.
- Comments.

Acceptable:

- The package documentation can mention the company.
- The demo narrative can mention the company.
- README can explain that this is a sanitized adaptation package, if appropriate.

Validate the JSON before use.

Minimum validation:

- File parses successfully.
- All initiative IDs are unique.
- Each initiative includes candidateRequirements.
- candidateRequirements includes business, user, workflow, data, system, aiAutomation, governance, and successMetrics arrays.
- Every initiative includes evidenceLabel.
- Every initiative includes recommendedNextAction.
- Every initiative includes primarySolutionPath.

## Recommendation Logic Instructions

V1 recommendation logic should be simulated from static fields. Do not build a fake LLM workflow.

### Simulated logic allowed now

- Count initiatives by readiness state.
- Count governance flags.
- Group by primary solution path.
- Group by recommended next action.
- Group by pattern matches.
- Show decision-lens explanations based on current fields.
- Show source-system and data-readiness concerns.
- Show whether an initiative looks prototype-ready, needs discovery, needs workflow mapping, needs data validation, or needs governance review.

### Logic to defer

- Real LLM-generated recommendations.
- Real scoring model.
- Production integrations.
- Automated ingestion from email, calendar, docs, or systems.
- Real duplicate detection.
- Real model training.
- Real skill-file execution.
- Real permissions and role-based access.
- Writeback to systems of record.

### Rule-based recommendation helper, optional

If you implement a helper, keep it transparent and qualitative.

Example:

- High impact + high urgency + unclear workflow -> Map Workflow.
- High impact + low data readiness -> Validate Data.
- Legal/financial/investor/regulatory flag -> Governance Review required.
- High feasibility + high data readiness + clear problem -> Build Prototype.
- Repetitive stable workflow -> Workflow Automation possible.
- Document-heavy summarization -> Assess AI Fit with source-link requirement.

## Visual and UX Rules

Use the Wayfinder visual direction:

- Primary accent: `#ee8922`.
- Secondary dark: `#0a1045`.
- Supporting green: `#73937e`.
- Supporting red: `#a12523`.
- Supporting mauve: `#8e6c88`.

Design principles:

- Clean.
- Serious.
- Executive-readable.
- Product-ops focused.
- Strong whitespace.
- Clear hierarchy.
- Calm labels.
- Subtle badge treatments.
- No fake AI glamour.
- No neon.
- No excessive icons.
- No dense unreadable dashboard.
- No false precision.

Tone:

- Practical.
- Direct.
- Operational.
- Financially literate.
- Governance-aware.

Do not overuse map/navigation metaphors.

## Do Not Change

Protect these product concepts:

- Wayfinder as system name.
- Initiative as primary object.
- Signal as raw input.
- Waypoint as recommendation output.
- Solution Path as possible route.
- Target State as desired future outcome.
- Future Scope as secondary, later-looking scope.
- Pattern Learning as lightweight V1 learning layer.
- Qualitative readiness states.
- Medium-depth candidate requirements.
- V1 mock-data posture.

Do not convert Wayfinder into:

- Generic project management.
- Jira replacement.
- Full PRD generator.
- Fully autonomous AI agent system.
- Production LLM orchestration platform.
- Corporate brain.
- Numeric scoring toy.

## Quality Checks

### Local run

- Install dependencies.
- Run the app locally.
- Verify no runtime errors.
- Verify all main routes work.
- Verify initiative detail pages work for all dataset records.

### Lint and build

- Run lint if configured.
- Run type check if configured.
- Run production build.
- Fix broken imports and unused variables.

### Data validation

- Validate JSON syntax.
- Validate required fields.
- Validate all array fields render safely.
- Validate empty or missing optional fields do not break UI.

### Content review

- Confirm no company name is hard-coded in source identifiers.
- Confirm visible demo copy is sanitized and professional.
- Confirm evidence labels are visible where appropriate.
- Confirm governance flags do not overstate known facts.
- Confirm unknowns are labeled honestly.

### Demo review

Walk through:

1. Home portfolio view.
2. Initiative list filter by governance flags.
3. Debt covenant initiative detail.
4. Lease abstract initiative detail.
5. Billing variance initiative detail.
6. Patterns page.
7. Intake simulation.
8. Playbook.

Make sure the demo clearly shows:

- Why the system exists.
- What a Waypoint is.
- How governance works.
- Why not every request should become a build.
- How pattern learning improves future recommendations.

## README and Deployment

Update README with:

- Product overview.
- What the prototype demonstrates.
- V1 limitations.
- Tech stack.
- Local setup.
- Available scripts.
- Data structure.
- Demo path.
- Quality checks.
- Deployment notes.
- Future roadmap.

Add a short user guide if appropriate:

- How to read Home.
- How to browse initiatives.
- How to interpret Waypoints.
- How to interpret governance flags.
- How to use Intake.
- How to use Patterns.
- How to use Playbook.

GitHub expectations:

- Clean commit history.
- Clear README.
- No secrets.
- No production credentials.
- No hard-coded company-specific identifiers in app source.
- Demo data is sanitized.

Netlify expectations:

- Production build succeeds.
- Deployment environment does not require secrets for V1.
- Public demo loads cleanly.
- README includes deployed URL once available.

## Final Implementation Guidance

Build the smallest version that makes the product judgment obvious.

The prototype should prove that Wayfinder can:

1. Capture scattered signals.
2. Structure initiatives.
3. Reveal risks and governance needs.
4. Compare solution paths.
5. Recommend the next useful action.
6. Show patterns across the portfolio.
7. Preserve a path toward connected intelligence later.
