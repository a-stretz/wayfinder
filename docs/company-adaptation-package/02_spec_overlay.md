# 02 Spec Overlay

## Company-Specific Positioning

Frame Wayfinder as an internal operating layer for disciplined initiative discovery, scoping, recommendation, and governance. It should help leadership and operating teams see what internal improvement initiatives exist, understand the real problem behind each request, identify the right next action, and decide which ideas should be mapped, validated, prototyped, scaled, merged, retired, or deferred.

The emphasis should be operational discipline, financial control, workflow clarity, governed experimentation, and pilot-to-scale visibility. Do not frame the product as an AI lab, generic innovation portal, or project tracker.

## Primary Users and Sponsors

### Daily Users

- Internal product manager or initiative owner
- Technology or systems operations lead
- Data or analytics partner
- Department operations lead
- Business analyst supporting internal workflows

### Sponsors

- Executive operations sponsor
- Technology or systems executive
- Product or AI enablement leader
- Finance or capital markets leader for high-control financial initiatives
- Business unit leader for domain-specific initiatives

### Reviewers and Governance Participants

- Business owner
- Product or initiative owner
- System owner
- Data steward
- IT / systems reviewer
- Finance reviewer
- Legal / compliance reviewer
- Executive sponsor for scale decisions

### Beneficiaries

- Development teams
- Entitlements, environmental, and government affairs teams
- Construction and engineering teams
- Leasing teams
- Property management teams
- Multifamily operations teams
- Accounting and AP teams
- Asset management teams
- Investments and capital markets teams
- Investor-facing teams
- Technology and systems support teams

## Workflow Emphasis

| Workflow Domain | Why It Matters | Evidence Label |
|---|---|---|
| Site screening and powered-land evaluation | High strategic value, multiple data layers, decision-grade summaries, and data center relevance. | Observed/Inferred |
| Entitlement, permitting, and public approval tracking | Missed milestones or unclear dependencies can affect timing, cost, and reputation. | Observed/Inferred |
| Environmental diligence and risk review | Unstructured documents and agency communications need controlled summarization and review. | Observed/Inferred |
| Lease abstraction and obligation QA | Lease data influences billing, operations, legal exposure, and tenant obligations. | Observed/Inferred |
| Billing variance and revenue administration | Financial accuracy, tenant trust, and reconciliation speed are executive-legible outcomes. | Observed/Inferred |
| Debt covenant and maturity monitoring | Deadline and covenant visibility is a high-control finance workflow with clear downside risk. | Inferred |
| AP invoice exception handling | Structured workflow and existing procure-to-pay signals make this a likely quick-win candidate. | Observed/Inferred |
| Investor reporting packet preparation | Sensitive, deadline-bound materials require governance and source-of-truth discipline. | Inferred |
| Yardi or business-systems support | Support demand, SQL/report requests, and admin workflows create knowledge and routing opportunities. | Observed/Inferred |
| Internal AI and lightweight-tool registry | Shows what exists, where it overlaps, who owns it, and what risk it carries. | Inferred |

## Added or Emphasized Fields

| Field Name | Type | Why It Matters | Evidence Label |
|---|---|---|---|
| assetType | Enum | Distinguishes industrial, multifamily, data center, investment, corporate, and shared-services contexts. | Observed |
| marketOrRegion | String / multi-select | Shows whether an initiative is local, regional, or scalable across markets. | Inferred |
| lifecycleStage | Enum | Differentiates sourcing, diligence, development, construction, lease-up, operations, reporting, and support. | Inferred |
| businessOwner | Person / role | Establishes who owns the operational outcome. | Inferred |
| systemOwner | Person / role | Identifies who controls source system access, configuration, or support. | Inferred |
| sourceSystemConfidence | Enum | Prevents fake certainty where source systems are not confirmed. | Unknown |
| dataSensitivity | Enum | Flags tenant, resident, investor, legal, financial, and confidential data. | Inferred |
| financialControlImpact | Enum | Highlights workflows affecting billing, AP, debt, accounting, or investor reporting. | Inferred |
| regulatoryOrPublicExposure | Boolean / enum | Captures entitlement, environmental, government affairs, or public-approval sensitivity. | Observed/Inferred |
| tenantResidentImpact | Enum | Flags workflows affecting external customers or resident communications. | Inferred |
| investorOrLenderImpact | Enum | Flags reporting, covenant, capital-market, and financing implications. | Inferred |
| requestedSolutionType | Enum | Captures whether the ask came in as dashboard, automation, AI, workflow fix, report, prototype, or engineering request. | Inferred |
| duplicateOrOverlapRisk | Enum | Supports rationalization of shadow tools and redundant pilots. | Inferred |
| reviewPath | Array | Shows required review roles before pilot, scale, or production use. | Inferred |
| pilotStage | Enum | Tracks idea, discovery, prototype, pilot, live, scaling, retire, merge, or defer. | Inferred |
| scaleDecision | Enum | Converts the portfolio into scale, merge, retire, standardize, or defer decisions. | Inferred |
| evidenceLabel | Enum | Preserves evidence discipline in demo data and generated recommendations. | Required |

## Recommendation Logic Adjustments

Waypoint recommendations should favor operating discipline over novelty.

- If the requested solution is a dashboard but ownership, source of truth, update cadence, or escalation path is unclear, recommend **Map Workflow**.
- If source systems are unknown or only likely, recommend **Validate Data** before reporting, automation, AI, or engineering handoff.
- If the workflow touches leases, billing, investor materials, debt covenants, regulatory milestones, tenant/resident communication, legal documents, or finance data, add a governance flag.
- If the initiative is document-heavy and involves summarization, extraction, comparison, drafting, or risk register creation, recommend **Assess AI Fit** only after defining human review and source-linking rules.
- If a workflow is repetitive, structured, and already governed, **Automate Workflow** can be recommended earlier than AI-assisted workflow.
- If the initiative resembles other active efforts, recommend discovery, merge, standardize, or overlap mapping before build.
- If business impact is high but data readiness is low, recommend **Validate Data** rather than prototype.
- If feasibility is high, risk is low, and scope is narrow, recommend **Build Prototype** as a reversible proof point.
- If requirements, owners, risks, permissions, and support model are clear, recommend **Prepare Engineering Handoff**.
- If the initiative is speculative, under-owned, or unsupported by confirmed data, recommend **Defer / Revisit**.

## Solution Path Emphasis

| Solution Path | Emphasis | Guidance |
|---|---|---|
| Process Improvement | Emphasize | First move for unclear ownership, handoffs, review paths, and escalation rules. |
| Reporting / Visibility | Emphasize | Strong fit for executive visibility, asset exceptions, billing variance, deadline tracking, and status. |
| Workflow Automation | Emphasize | Strong after workflows are stable and repetitive. |
| AI-Assisted Workflow | Emphasize selectively | Use for extraction, summarization, classification, memo drafting, routing, and risk comparison with review paths. |
| Lightweight Prototype | Emphasize selectively | Use for narrow tests with reversible scope and clear success metrics. |
| Formal Engineering | Defer until mature | Use when reliability, permissions, integrations, audit history, and support ownership are known. |
| Knowledge / Memory Layer | Emphasize later | Useful after enough signals and initiative history accumulate. |
| Defer / Revisit | Keep | Important for avoiding low-value or under-owned work. |

## Decision Lens Adjustments

Emphasize existing lenses: Executive Visibility, Operational Stability, Safer First Step, Scale Ready, and Cost Sensitive.

Add company-relevant lenses:

| Lens | Purpose |
|---|---|
| Financial Control | Prioritizes auditability, accuracy, ownership, and review for billing, AP, debt, accounting, or investor reporting. |
| Regulatory / Approval Risk | Prioritizes review and traceability for entitlement, environmental, government affairs, public hearing, or permit workflows. |
| Tenant / Resident Impact | Prioritizes service quality, communication guardrails, privacy, fairness, and escalation controls. |
| Investment Decision Support | Prioritizes assumption traceability, source confidence, and executive review for underwriting, site screening, and capital allocation. |
| Scale Across Markets | Prioritizes reusable processes, common requirements, and integration readiness. |
| Shadow Tool Risk | Prioritizes duplicate detection, access review, owner clarity, and retire/merge decisions. |

## Governance and Risk Triggers

Flag an initiative for review when it:

- Touches lease documents, lease terms, amendments, commencements, or contractual obligations.
- Influences billing, CAM charges, rent rolls, AP coding, payment approval, debt covenants, lender reporting, investor reporting, or financial statements.
- Uses tenant, resident, investor, lender, employee, vendor, or confidential deal data.
- Generates or summarizes materials used in investment decisions, executive approvals, capital allocation, site selection, or underwriting.
- Summarizes environmental, entitlement, legal, regulatory, public-hearing, government-affairs, or permit information.
- Drafts external-facing communications.
- Proposes production writeback into a system of record.
- Depends on an unconfirmed source system or unclear data ownership.
- Duplicates or overlaps with an active initiative in another department.
- Uses AI output without confidence scoring, source links, human review, or approval rules.
- Is intended to scale across departments, markets, asset types, or external users.

## Roadmap Emphasis

### V1: Static Portfolio and Recommendation Demo

Prove the operating concept with mock data, executive dashboard, initiative pages, Waypoints, solution maps, requirements, governance flags, decision lenses, patterns, playbook, intake simulation, README, user guide, and demo script.

### V2: Intake, Ingestion, and Review Workflow Foundation

Add manual persistence, CSV import, document/note ingestion simulation, similar-initiative detection, review queues, owner assignment, exportable briefs, and feedback capture.

### V3: Connected Intelligence and Controlled Automation

Add approved connectors, MCP strategy, LLM provider configuration, source-linked analysis, prompt/version management, skill files, evaluation logs, role-based review, and outcome tracking.

### V4: Learning System and Portfolio Optimization

Add outcome-based pattern learning, recommendation quality tracking, model-training datasets, initiative deduplication, portfolio rationalization, and scale/retire recommendations.

## What Should Remain Unchanged

- Wayfinder remains the system name.
- Initiative remains the primary object.
- Waypoint remains the recommendation output.
- The product remains a decision-support system, not a project management platform.
- V1 should not pretend to be a fully automated corporate brain.
- The system should not force numeric precision where qualitative evidence is more honest.
- Solution mapping remains the central value layer.
- Candidate requirements remain medium-depth and decision-oriented.
- Target State and Future Scope remain secondary to the current Waypoint.
- Pattern learning remains lightweight in V1.
- Future architecture remains extensible for LLMs, APIs, MCP connectors, ingestion, skill files, evaluation, and model training.
- Do not hard-code company-specific names into source code. Company-specific content should live in external content, mock data, demo copy, or configuration.
