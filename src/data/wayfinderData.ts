export const departments = [
  'Finance',
  'Accounting',
  'Leasing',
  'Operations',
  'Construction',
  'Strategy',
] as const

export type Department = (typeof departments)[number]

export const solutionPathOptions = [
  'Process Improvement',
  'Reporting / Visibility',
  'Workflow Automation',
  'AI-Assisted Workflow',
  'Lightweight Prototype',
  'Formal Engineering',
  'Knowledge / Memory Layer',
  'Defer / Revisit',
] as const

export type SolutionPathOption = (typeof solutionPathOptions)[number]

export const recommendedNextActions = [
  'Run Discovery',
  'Map Workflow',
  'Define Requirements',
  'Validate Data',
  'Build Prototype',
  'Create Reporting View',
  'Automate Workflow',
  'Assess AI Fit',
  'Prepare Engineering Handoff',
  'Defer / Revisit',
] as const

export type RecommendedNextAction = (typeof recommendedNextActions)[number]

export const fitLabels = ['Strong', 'Good', 'Possible', 'Later', 'Poor'] as const

export type FitLabel = (typeof fitLabels)[number]

export const decisionLensPresets = [
  'Fastest Useful Output',
  'Low Engineering Lift',
  'Safer First Step',
  'Executive Visibility',
  'AI Leverage',
  'Operational Stability',
  'Cost Sensitive',
  'Scale Ready',
] as const

export type DecisionLens = (typeof decisionLensPresets)[number]

export const requirementCategories = [
  'Business Requirements',
  'User Requirements',
  'Workflow Requirements',
  'Data Requirements',
  'System Requirements',
  'AI / Automation Requirements',
  'Governance Requirements',
  'Success Metrics',
] as const

export type RequirementCategory = (typeof requirementCategories)[number]

export type SignalSource =
  | 'Meeting Notes'
  | 'File'
  | 'Stakeholder Request'
  | 'Pain Point'
  | 'Workflow Issue'
  | 'Dashboard'
  | 'Prototype'
  | 'AI Idea'

export interface Signal {
  id: string
  source: SignalSource
  summary: string
  observedImpact: string
}

export interface SolutionPathFit {
  path: SolutionPathOption
  fit: FitLabel
  rationale: string
}

export interface RequirementItem {
  id: string
  category: RequirementCategory
  requirement: string
  rationale: string
}

export type RequirementsByCategory = Record<RequirementCategory, RequirementItem[]>

export type RequirementsBySolutionPath = Partial<
  Record<SolutionPathOption, RequirementsByCategory>
>

export interface FutureScope {
  laterCapabilities: string[]
  deferredRequirements: string[]
  dependencies: string[]
  revisitTriggers: string[]
}

export interface PatternLearning {
  repeatedPainPatterns: string[]
  commonBlockers: string[]
  similarInitiatives: string[]
  recurringSystems: string[]
  reusableRequirementPatterns: string[]
  solutionPathsChosen: SolutionPathOption[]
  successfulSolutionApproaches: string[]
  failedOrDeferredApproaches: string[]
  commonDiscoveryGaps: string[]
  dataReadinessIssues: string[]
  stakeholderOwnershipProblems: string[]
}

export interface LensBehavior {
  lens: DecisionLens
  recommendationChanged: boolean
  currentRecommendedNextAction: RecommendedNextAction
  emphasisChanges: string[]
  pathsAffected: SolutionPathOption[]
  newQuestionsToAsk: string[]
  futureDirection: string
}

export interface Initiative {
  id: string
  title: string
  department: Department
  problemSummary: string
  contextSummary: string
  rawSignals: Signal[]
  scopingAnalysis: string
  recommendedNextAction: RecommendedNextAction
  primarySolutionPath: SolutionPathOption
  solutionPaths: SolutionPathFit[]
  candidateRequirementsMap: RequirementsByCategory
  requirementsBySolutionPath: RequirementsBySolutionPath
  targetState: string
  futureScope: FutureScope
  patternLearning: PatternLearning
  decisionLensBehaviors: LensBehavior[]
}

const emptyRequirementsByCategory = (): RequirementsByCategory => ({
  'Business Requirements': [],
  'User Requirements': [],
  'Workflow Requirements': [],
  'Data Requirements': [],
  'System Requirements': [],
  'AI / Automation Requirements': [],
  'Governance Requirements': [],
  'Success Metrics': [],
})

const requirements = (
  prefix: string,
  items: Partial<Record<RequirementCategory, Array<[string, string]>>>,
): RequirementsByCategory => {
  const mapped = emptyRequirementsByCategory()

  requirementCategories.forEach((category) => {
    mapped[category] =
      items[category]?.map(([requirement, rationale], index) => ({
        id: `${prefix}-${category.toLowerCase().replaceAll(/[^a-z]+/g, '-')}-${index + 1}`,
        category,
        requirement,
        rationale,
      })) ?? []
  })

  return mapped
}

const pathRequirements = (
  prefix: string,
  entries: Partial<Record<SolutionPathOption, Partial<Record<RequirementCategory, Array<[string, string]>>>>>,
): RequirementsBySolutionPath =>
  Object.fromEntries(
    Object.entries(entries).map(([path, items]) => [
      path,
      requirements(`${prefix}-${path.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`, items),
    ]),
  ) as RequirementsBySolutionPath

export const initiatives: Initiative[] = [
  {
    id: 'debt-obligation-deadline-visibility',
    title: 'Debt Obligation and Deadline Visibility',
    department: 'Finance',
    problemSummary:
      'Critical dates, lender contacts, covenant requirements, documents, and payment obligations are tracked across spreadsheets, email threads, and shared folders. A missed payment or deadline has created urgency.',
    contextSummary:
      'The work spans finance, executive operations, and document owners. The immediate need is to understand the current process before choosing a reporting or automation path.',
    rawSignals: [
      {
        id: 'debt-signal-calendar',
        source: 'Pain Point',
        summary: 'Payment dates and covenant deadlines are not visible in one trusted operating view.',
        observedImpact: 'Teams rely on manual reminders and personal tracking habits.',
      },
      {
        id: 'debt-signal-documents',
        source: 'File',
        summary: 'Key documents live across shared folders with inconsistent naming and ownership.',
        observedImpact: 'Required context can be hard to locate during urgent review windows.',
      },
      {
        id: 'debt-signal-contact',
        source: 'Stakeholder Request',
        summary: 'Lender contact details and follow-up history need a clearer home.',
        observedImpact: 'Escalation paths are unclear when questions arise.',
      },
    ],
    scopingAnalysis:
      'The first pass should map dates, obligations, owners, document locations, and handoff points. Reporting and automation become safer after the operational workflow is visible.',
    recommendedNextAction: 'Map Workflow',
    primarySolutionPath: 'Process Improvement',
    solutionPaths: [
      {
        path: 'Process Improvement',
        fit: 'Strong',
        rationale: 'The underlying issue is fragmented ownership and inconsistent operating rhythm.',
      },
      {
        path: 'Reporting / Visibility',
        fit: 'Good',
        rationale: 'A consolidated view can reduce missed obligations after workflow rules are clarified.',
      },
      {
        path: 'Workflow Automation',
        fit: 'Possible',
        rationale: 'Reminders and handoffs may be automated after source-of-truth decisions are made.',
      },
      {
        path: 'AI-Assisted Workflow',
        fit: 'Later',
        rationale: 'AI may help summarize documents, but only after governance and data readiness improve.',
      },
      {
        path: 'Formal Engineering',
        fit: 'Later',
        rationale: 'A durable system may be warranted, but process clarity should come first.',
      },
    ],
    candidateRequirementsMap: requirements('debt-candidate', {
      'Business Requirements': [
        ['Show all active obligations and deadlines in one operating view.', 'Reduces missed-payment risk.'],
        ['Identify accountable owners for each obligation.', 'Clarifies escalation and follow-through.'],
      ],
      'Workflow Requirements': [
        ['Map current intake, review, reminder, payment, and confirmation steps.', 'Creates shared process clarity.'],
        ['Define handoff rules for new or changed obligations.', 'Prevents silent gaps after document updates.'],
      ],
      'Data Requirements': [
        ['Capture due date, obligation type, owner, document source, contact, and status.', 'Supports reliable reporting.'],
      ],
      'Governance Requirements': [
        ['Define review cadence and ownership for deadline accuracy.', 'Keeps the view trusted over time.'],
      ],
      'Success Metrics': [
        ['Deadlines are reviewed on a predictable cadence without emergency reconciliation.', 'Measures operational stability.'],
      ],
    }),
    requirementsBySolutionPath: pathRequirements('debt-path', {
      'Process Improvement': {
        'Workflow Requirements': [
          ['Document obligation lifecycle from source document to completion.', 'Establishes the process baseline.'],
        ],
        'Governance Requirements': [
          ['Assign owner and backup owner for every obligation type.', 'Protects against single-person dependency.'],
        ],
      },
      'Reporting / Visibility': {
        'Data Requirements': [
          ['Normalize fields for deadline, amount, counterparty, document, status, and owner.', 'Enables a useful view.'],
        ],
        'Success Metrics': [
          ['Users can identify at-risk obligations without searching email or folders.', 'Confirms the view is useful.'],
        ],
      },
      'Workflow Automation': {
        'AI / Automation Requirements': [
          ['Trigger reminders based on deadline windows and status changes.', 'Reduces manual follow-up load.'],
        ],
      },
    }),
    targetState:
      'Finance leaders can see upcoming obligations, owners, supporting documents, and required actions in a trusted operating rhythm.',
    futureScope: {
      laterCapabilities: ['Automated reminders', 'Document summary assistance', 'Executive obligation review pack'],
      deferredRequirements: ['System integration', 'Document extraction', 'Advanced permissioning'],
      dependencies: ['Source-of-truth decision', 'Owner assignments', 'Document naming standards'],
      revisitTriggers: ['More missed deadlines', 'New debt instruments', 'Manual review burden increases'],
    },
    patternLearning: {
      repeatedPainPatterns: ['Critical dates live outside durable workflows', 'Documents and decisions are separated'],
      commonBlockers: ['Unclear owner backup', 'Inconsistent folder structure'],
      similarInitiatives: ['Accounting Payment Exception Tracking', 'Lease Handoff and Obligation Tracking'],
      recurringSystems: ['Spreadsheets', 'Email', 'Shared folders'],
      reusableRequirementPatterns: ['Owner, status, deadline, source document, escalation rule'],
      solutionPathsChosen: ['Process Improvement', 'Reporting / Visibility'],
      successfulSolutionApproaches: ['Workflow mapping before dashboard build', 'Single operating view'],
      failedOrDeferredApproaches: ['Automating reminders before ownership is clear'],
      commonDiscoveryGaps: ['Which dates are legally binding versus operationally useful'],
      dataReadinessIssues: ['Inconsistent naming', 'Incomplete ownership fields'],
      stakeholderOwnershipProblems: ['Primary and backup ownership are not consistently defined'],
    },
    decisionLensBehaviors: [
      {
        lens: 'Fastest Useful Output',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Map Workflow',
        emphasisChanges: ['Focus on the minimum workflow map needed to prevent another missed deadline.'],
        pathsAffected: ['Process Improvement', 'Reporting / Visibility'],
        newQuestionsToAsk: ['Which upcoming obligations create the most immediate risk?'],
        futureDirection: 'Move quickly to a lightweight visibility view after the workflow is mapped.',
      },
      {
        lens: 'Executive Visibility',
        recommendationChanged: true,
        currentRecommendedNextAction: 'Create Reporting View',
        emphasisChanges: ['Prioritize a concise leadership view of dates, owners, and risk status.'],
        pathsAffected: ['Reporting / Visibility'],
        newQuestionsToAsk: ['What information must leaders see in the next operating review?'],
        futureDirection: 'Pair reporting with a later workflow cleanup pass.',
      },
      {
        lens: 'Operational Stability',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Map Workflow',
        emphasisChanges: ['Emphasize ownership, cadence, backup coverage, and governance.'],
        pathsAffected: ['Process Improvement', 'Workflow Automation'],
        newQuestionsToAsk: ['Who confirms completion and who catches overdue items?'],
        futureDirection: 'Add automation only after ownership rules are stable.',
      },
    ],
  },
  {
    id: 'accounting-payment-exception-tracking',
    title: 'Accounting Payment Exception Tracking',
    department: 'Accounting',
    problemSummary:
      'Payment issues and exception handling are difficult to track across accounting, operations, and finance. Teams need clearer visibility into what is pending, blocked, approved, or at risk.',
    contextSummary:
      'The current challenge appears to be inconsistent data and status language. Validating what is tracked should happen before automating movement between teams.',
    rawSignals: [
      {
        id: 'payment-signal-status',
        source: 'Dashboard',
        summary: 'Current views do not clearly separate pending, blocked, approved, and at-risk exceptions.',
        observedImpact: 'Teams spend time reconciling status in side conversations.',
      },
      {
        id: 'payment-signal-handoff',
        source: 'Workflow Issue',
        summary: 'Exceptions move across accounting, operations, and finance without consistent handoff criteria.',
        observedImpact: 'Approvals and blockers can become hard to trace.',
      },
    ],
    scopingAnalysis:
      'The right first move is to validate fields, status definitions, and source reliability. Reporting can then become a dependable operating layer.',
    recommendedNextAction: 'Validate Data',
    primarySolutionPath: 'Reporting / Visibility',
    solutionPaths: [
      {
        path: 'Reporting / Visibility',
        fit: 'Strong',
        rationale: 'The immediate need is shared visibility into exception state and blocker ownership.',
      },
      {
        path: 'Process Improvement',
        fit: 'Good',
        rationale: 'Status definitions and handoff rules need to be standardized.',
      },
      {
        path: 'Workflow Automation',
        fit: 'Possible',
        rationale: 'Automation may help route exceptions once data and states are reliable.',
      },
    ],
    candidateRequirementsMap: requirements('payment-candidate', {
      'Business Requirements': [
        ['Provide a trusted view of open payment exceptions.', 'Improves operational follow-up.'],
      ],
      'User Requirements': [
        ['Allow teams to filter by status, owner, blocker, and urgency.', 'Supports daily triage.'],
      ],
      'Data Requirements': [
        ['Define required exception fields and allowed status values.', 'Prevents ambiguous reporting.'],
        ['Identify source systems or source files for payment exception data.', 'Clarifies data readiness.'],
      ],
      'Workflow Requirements': [
        ['Define when an exception moves from pending to blocked, approved, or at risk.', 'Creates consistent handling.'],
      ],
      'Success Metrics': [
        ['Teams can answer what is blocked and who owns the next step without manual reconciliation.', 'Measures visibility value.'],
      ],
    }),
    requirementsBySolutionPath: pathRequirements('payment-path', {
      'Reporting / Visibility': {
        'Data Requirements': [
          ['Create a normalized exception status model.', 'Makes reporting consistent.'],
        ],
        'User Requirements': [
          ['Support filtered views for accounting, operations, and finance users.', 'Keeps the same data useful to each audience.'],
        ],
      },
      'Process Improvement': {
        'Workflow Requirements': [
          ['Document approval and blocker resolution rules.', 'Reduces ambiguity across teams.'],
        ],
      },
      'Workflow Automation': {
        'AI / Automation Requirements': [
          ['Route exceptions based on status and owner when rules are clear.', 'Removes repeat manual routing.'],
        ],
      },
    }),
    targetState:
      'Teams can review payment exceptions through a shared status view with clear owners, blockers, and next actions.',
    futureScope: {
      laterCapabilities: ['Automated owner reminders', 'Exception aging view', 'Approval handoff workflow'],
      deferredRequirements: ['System writeback', 'Automated approval routing', 'Advanced exception categorization'],
      dependencies: ['Reliable source fields', 'Shared status definitions', 'Owner and blocker rules'],
      revisitTriggers: ['Exception volume increases', 'Manual status reconciliation persists', 'Approval delays continue'],
    },
    patternLearning: {
      repeatedPainPatterns: ['Status ambiguity slows triage', 'Cross-team handoffs are hard to inspect'],
      commonBlockers: ['Unclear source fields', 'Different teams use different status language'],
      similarInitiatives: ['Debt Obligation and Deadline Visibility', 'Construction Status Reporting'],
      recurringSystems: ['Accounting systems', 'Spreadsheets', 'Email'],
      reusableRequirementPatterns: ['Status, owner, blocker, source, urgency, next action'],
      solutionPathsChosen: ['Reporting / Visibility', 'Process Improvement'],
      successfulSolutionApproaches: ['Validate data definitions before dashboard rollout'],
      failedOrDeferredApproaches: ['Routing automation before exception states are trusted'],
      commonDiscoveryGaps: ['Which fields are reliable enough for operating decisions'],
      dataReadinessIssues: ['Inconsistent status fields', 'Missing blocker ownership'],
      stakeholderOwnershipProblems: ['Shared exceptions may lack one accountable next-step owner'],
    },
    decisionLensBehaviors: [
      {
        lens: 'Low Engineering Lift',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Validate Data',
        emphasisChanges: ['Favor a lightweight reporting view using available fields.'],
        pathsAffected: ['Reporting / Visibility'],
        newQuestionsToAsk: ['Which existing fields are reliable enough for an initial view?'],
        futureDirection: 'Create a simple visibility layer before deeper workflow tooling.',
      },
      {
        lens: 'Operational Stability',
        recommendationChanged: true,
        currentRecommendedNextAction: 'Map Workflow',
        emphasisChanges: ['Prioritize approval rules and blocker ownership before reports.'],
        pathsAffected: ['Process Improvement', 'Reporting / Visibility'],
        newQuestionsToAsk: ['Where do exceptions most often stall?'],
        futureDirection: 'Use workflow findings to refine reporting requirements.',
      },
      {
        lens: 'Scale Ready',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Validate Data',
        emphasisChanges: ['Check whether source fields can support future automation.'],
        pathsAffected: ['Reporting / Visibility', 'Workflow Automation'],
        newQuestionsToAsk: ['What data quality issues would block automated routing later?'],
        futureDirection: 'Preserve an automation path after data quality improves.',
      },
    ],
  },
  {
    id: 'lease-handoff-obligation-tracking',
    title: 'Lease Handoff and Obligation Tracking',
    department: 'Leasing',
    problemSummary:
      'Leasing updates, tenant obligations, and handoff details are not consistently flowing to operations and property management teams.',
    contextSummary:
      'The issue is mainly a handoff and memory problem. Teams need a repeatable transfer process and a place to preserve obligation context.',
    rawSignals: [
      {
        id: 'lease-signal-handoff',
        source: 'Meeting Notes',
        summary: 'Handoff details vary depending on who shares the update.',
        observedImpact: 'Operations teams may receive incomplete obligation context.',
      },
      {
        id: 'lease-signal-memory',
        source: 'Pain Point',
        summary: 'Tenant-specific obligations are hard to find after initial lease activity.',
        observedImpact: 'Teams revisit source documents and prior emails to recover context.',
      },
    ],
    scopingAnalysis:
      'The first step should define the handoff workflow, required obligation fields, and retention expectations. A memory layer can support continuity after the process is clearer.',
    recommendedNextAction: 'Map Workflow',
    primarySolutionPath: 'Process Improvement',
    solutionPaths: [
      {
        path: 'Process Improvement',
        fit: 'Strong',
        rationale: 'The main problem is inconsistent handoff behavior and unclear required inputs.',
      },
      {
        path: 'Reporting / Visibility',
        fit: 'Good',
        rationale: 'A simple obligation view can help receiving teams see what matters.',
      },
      {
        path: 'Knowledge / Memory Layer',
        fit: 'Good',
        rationale: 'Reusable obligation context would reduce repeated searches and lost history.',
      },
    ],
    candidateRequirementsMap: requirements('lease-candidate', {
      'Business Requirements': [
        ['Ensure material obligations reach receiving teams before operational handoff is complete.', 'Protects execution quality.'],
      ],
      'Workflow Requirements': [
        ['Define leasing-to-operations handoff stages and required participants.', 'Clarifies process ownership.'],
        ['Create a required obligation checklist for each handoff.', 'Improves consistency.'],
      ],
      'Data Requirements': [
        ['Capture obligation type, due date, responsible team, source document, and operating notes.', 'Makes obligation context findable.'],
      ],
      'System Requirements': [
        ['Identify where handoff records and obligation context should live.', 'Prevents another fragmented storage pattern.'],
      ],
      'Success Metrics': [
        ['Receiving teams can find current obligations without searching prior conversations.', 'Measures memory and handoff success.'],
      ],
    }),
    requirementsBySolutionPath: pathRequirements('lease-path', {
      'Process Improvement': {
        'Workflow Requirements': [
          ['Define handoff acceptance criteria.', 'Prevents incomplete transitions.'],
        ],
      },
      'Reporting / Visibility': {
        'User Requirements': [
          ['Provide a current obligation view for receiving teams.', 'Makes handoff output operational.'],
        ],
      },
      'Knowledge / Memory Layer': {
        'System Requirements': [
          ['Store obligation notes with source references and ownership.', 'Preserves reusable context.'],
        ],
      },
    }),
    targetState:
      'Leasing handoffs consistently transfer obligation context, ownership, and source references to the teams responsible for execution.',
    futureScope: {
      laterCapabilities: ['Reusable obligation library', 'Handoff readiness checklist', 'Context summary assistance'],
      deferredRequirements: ['Automated document parsing', 'Deep lease system integration', 'Obligation change detection'],
      dependencies: ['Required handoff fields', 'Shared storage decision', 'Receiving team ownership'],
      revisitTriggers: ['Repeated missed obligations', 'High handoff volume', 'New receiving-team requirements'],
    },
    patternLearning: {
      repeatedPainPatterns: ['Critical context is lost during team transitions', 'Document facts are separated from operating notes'],
      commonBlockers: ['No acceptance criteria', 'Unclear owner after handoff'],
      similarInitiatives: ['Debt Obligation and Deadline Visibility', 'Internal AI and Automation Idea Intake'],
      recurringSystems: ['Lease documents', 'Email', 'Shared folders'],
      reusableRequirementPatterns: ['Source reference, obligation owner, deadline, handoff acceptance criteria'],
      solutionPathsChosen: ['Process Improvement', 'Knowledge / Memory Layer'],
      successfulSolutionApproaches: ['Checklist-driven handoff with searchable obligation memory'],
      failedOrDeferredApproaches: ['Document extraction before required fields are agreed'],
      commonDiscoveryGaps: ['Which obligations are material enough to track centrally'],
      dataReadinessIssues: ['Obligation details are embedded in documents and messages'],
      stakeholderOwnershipProblems: ['Receiving team ownership may differ by obligation type'],
    },
    decisionLensBehaviors: [
      {
        lens: 'Safer First Step',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Map Workflow',
        emphasisChanges: ['Start with handoff acceptance criteria and required fields.'],
        pathsAffected: ['Process Improvement'],
        newQuestionsToAsk: ['What must be true before a handoff is considered complete?'],
        futureDirection: 'Add a memory layer after the handoff contract is stable.',
      },
      {
        lens: 'AI Leverage',
        recommendationChanged: true,
        currentRecommendedNextAction: 'Assess AI Fit',
        emphasisChanges: ['Explore whether summaries can extract obligation context from source material.'],
        pathsAffected: ['Knowledge / Memory Layer', 'AI-Assisted Workflow'],
        newQuestionsToAsk: ['Which obligation details are consistently present in source documents?'],
        futureDirection: 'Pilot assisted summarization only for well-defined obligation types.',
      },
      {
        lens: 'Operational Stability',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Map Workflow',
        emphasisChanges: ['Emphasize receiving-team ownership and obligation maintenance.'],
        pathsAffected: ['Process Improvement', 'Knowledge / Memory Layer'],
        newQuestionsToAsk: ['Who updates obligation context after the handoff is complete?'],
        futureDirection: 'Treat the memory layer as an operating asset, not a static archive.',
      },
    ],
  },
  {
    id: 'construction-status-reporting',
    title: 'Construction Status Reporting',
    department: 'Construction',
    problemSummary:
      'Project managers send updates in inconsistent formats, making executive visibility and blocker tracking difficult.',
    contextSummary:
      'There is demand for cleaner leadership visibility, but the inputs and reporting expectations need definition before a durable report or prototype is built.',
    rawSignals: [
      {
        id: 'construction-signal-format',
        source: 'Meeting Notes',
        summary: 'Project updates arrive in varied formats and levels of detail.',
        observedImpact: 'Leadership review requires manual consolidation.',
      },
      {
        id: 'construction-signal-blockers',
        source: 'Stakeholder Request',
        summary: 'Blockers and risks are not consistently highlighted across updates.',
        observedImpact: 'Escalation needs can be missed until late.',
      },
    ],
    scopingAnalysis:
      'The next useful step is to define the reporting requirements: audiences, update fields, blocker categories, cadence, and minimum useful prototype.',
    recommendedNextAction: 'Define Requirements',
    primarySolutionPath: 'Reporting / Visibility',
    solutionPaths: [
      {
        path: 'Reporting / Visibility',
        fit: 'Strong',
        rationale: 'Executive visibility and blocker tracking are the primary outcomes.',
      },
      {
        path: 'Workflow Automation',
        fit: 'Possible',
        rationale: 'Update collection could be automated after required fields are defined.',
      },
      {
        path: 'Lightweight Prototype',
        fit: 'Good',
        rationale: 'A small prototype can validate format and cadence before formal build decisions.',
      },
    ],
    candidateRequirementsMap: requirements('construction-candidate', {
      'Business Requirements': [
        ['Create consistent executive visibility into project status, blockers, and risks.', 'Supports faster operating review.'],
      ],
      'User Requirements': [
        ['Give project managers a simple, repeatable update format.', 'Improves adoption and consistency.'],
      ],
      'Workflow Requirements': [
        ['Define update cadence and escalation flow for blockers.', 'Makes status reporting actionable.'],
      ],
      'Data Requirements': [
        ['Capture project, phase, status, blocker, owner, next action, and update date.', 'Supports comparable reporting.'],
      ],
      'Success Metrics': [
        ['Leadership can identify blockers and owner follow-ups without manual consolidation.', 'Measures reporting usefulness.'],
      ],
    }),
    requirementsBySolutionPath: pathRequirements('construction-path', {
      'Reporting / Visibility': {
        'Business Requirements': [
          ['Define executive view content and cadence.', 'Anchors the reporting outcome.'],
        ],
        'Data Requirements': [
          ['Standardize project status and blocker fields.', 'Improves comparability.'],
        ],
      },
      'Workflow Automation': {
        'AI / Automation Requirements': [
          ['Collect update prompts on a defined schedule.', 'Reduces follow-up effort.'],
        ],
      },
      'Lightweight Prototype': {
        'System Requirements': [
          ['Create a low-lift reporting mockup using agreed fields.', 'Validates shape before deeper build.'],
        ],
      },
    }),
    targetState:
      'Project status updates are consistent, blocker-focused, and ready for leadership review without manual reconstruction.',
    futureScope: {
      laterCapabilities: ['Automated update collection', 'Blocker trend view', 'Leadership summary pack'],
      deferredRequirements: ['Portfolio-level rollups', 'External system sync', 'Predictive risk indicators'],
      dependencies: ['Defined report fields', 'Project manager update cadence', 'Leadership review needs'],
      revisitTriggers: ['Status updates remain inconsistent', 'Leadership asks for rollups', 'Blocker escalation delays continue'],
    },
    patternLearning: {
      repeatedPainPatterns: ['Input inconsistency makes reporting expensive', 'Blockers are not normalized'],
      commonBlockers: ['Undefined reporting audience', 'Inconsistent update cadence'],
      similarInitiatives: ['Accounting Payment Exception Tracking', 'Internal AI and Automation Idea Intake'],
      recurringSystems: ['Email', 'Spreadsheets', 'Presentation materials'],
      reusableRequirementPatterns: ['Status, blocker, owner, next action, update cadence'],
      solutionPathsChosen: ['Reporting / Visibility', 'Lightweight Prototype'],
      successfulSolutionApproaches: ['Prototype the report format before automating update collection'],
      failedOrDeferredApproaches: ['Building a dashboard before agreeing on required fields'],
      commonDiscoveryGaps: ['Which blockers require leadership escalation'],
      dataReadinessIssues: ['Project updates are freeform and inconsistent'],
      stakeholderOwnershipProblems: ['Project ownership and blocker ownership can differ'],
    },
    decisionLensBehaviors: [
      {
        lens: 'Executive Visibility',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Define Requirements',
        emphasisChanges: ['Prioritize leadership questions, blocker visibility, and rollup clarity.'],
        pathsAffected: ['Reporting / Visibility'],
        newQuestionsToAsk: ['Which decisions should the executive view support?'],
        futureDirection: 'Move from requirements into a concise reporting prototype.',
      },
      {
        lens: 'Fastest Useful Output',
        recommendationChanged: true,
        currentRecommendedNextAction: 'Build Prototype',
        emphasisChanges: ['Validate the report shape with a low-lift mockup.'],
        pathsAffected: ['Lightweight Prototype', 'Reporting / Visibility'],
        newQuestionsToAsk: ['What fields are enough for a useful first review?'],
        futureDirection: 'Use prototype feedback to finalize requirements.',
      },
      {
        lens: 'Low Engineering Lift',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Define Requirements',
        emphasisChanges: ['Avoid formal engineering until the reporting contract is clear.'],
        pathsAffected: ['Reporting / Visibility', 'Workflow Automation'],
        newQuestionsToAsk: ['Can existing tools support the first reporting rhythm?'],
        futureDirection: 'Keep automation optional until adoption is proven.',
      },
    ],
  },
  {
    id: 'internal-ai-automation-idea-intake',
    title: 'Internal AI and Automation Idea Intake',
    department: 'Strategy',
    problemSummary:
      'Employees are beginning to identify possible AI, automation, and lightweight tool opportunities, but there is no structured way to capture, evaluate, or route them.',
    contextSummary:
      'The organization needs a lightweight intake and memory layer before deciding which ideas deserve prototypes, AI assessment, workflow automation, or engineering handoff.',
    rawSignals: [
      {
        id: 'idea-signal-submissions',
        source: 'AI Idea',
        summary: 'Potential automation ideas are being shared informally across teams.',
        observedImpact: 'Useful opportunities may be lost or duplicated.',
      },
      {
        id: 'idea-signal-routing',
        source: 'Stakeholder Request',
        summary: 'There is no shared method to evaluate or route ideas by fit.',
        observedImpact: 'Promising ideas can stall before discovery.',
      },
    ],
    scopingAnalysis:
      'The first move should be discovery around idea types, evaluation criteria, routing roles, and a useful knowledge structure. AI fit should be assessed after intake patterns are understood.',
    recommendedNextAction: 'Run Discovery',
    primarySolutionPath: 'Knowledge / Memory Layer',
    solutionPaths: [
      {
        path: 'Knowledge / Memory Layer',
        fit: 'Strong',
        rationale: 'The immediate value is preserving, categorizing, and learning from incoming ideas.',
      },
      {
        path: 'Lightweight Prototype',
        fit: 'Good',
        rationale: 'A simple intake prototype can validate fields and routing behavior.',
      },
      {
        path: 'AI-Assisted Workflow',
        fit: 'Possible',
        rationale: 'AI can assist evaluation later, once intake criteria and governance are defined.',
      },
    ],
    candidateRequirementsMap: requirements('idea-candidate', {
      'Business Requirements': [
        ['Create a structured intake path for AI, automation, and lightweight tool ideas.', 'Prevents ideas from scattering.'],
      ],
      'User Requirements': [
        ['Make submission simple for employees while capturing enough context for triage.', 'Balances adoption and usefulness.'],
      ],
      'Workflow Requirements': [
        ['Define how ideas are reviewed, categorized, routed, deferred, or advanced.', 'Creates a repeatable operating model.'],
      ],
      'AI / Automation Requirements': [
        ['Capture AI fit factors without automatically recommending AI as the answer.', 'Keeps recommendations grounded.'],
      ],
      'Governance Requirements': [
        ['Define who can approve pilots, automation work, or engineering handoff.', 'Clarifies ownership and risk control.'],
      ],
      'Success Metrics': [
        ['Ideas are captured with enough context to route them to discovery, prototype, automation, or revisit paths.', 'Measures intake quality.'],
      ],
    }),
    requirementsBySolutionPath: pathRequirements('idea-path', {
      'Knowledge / Memory Layer': {
        'System Requirements': [
          ['Store idea context, category, source team, target workflow, and routing outcome.', 'Builds an institutional memory layer.'],
        ],
      },
      'Lightweight Prototype': {
        'User Requirements': [
          ['Provide a simple intake form and review queue.', 'Validates usage before larger investment.'],
        ],
      },
      'AI-Assisted Workflow': {
        'AI / Automation Requirements': [
          ['Suggest triage prompts based on idea context and known patterns.', 'Assists review without replacing judgment.'],
        ],
      },
    }),
    targetState:
      'Employees can submit AI, automation, and tool ideas through a structured intake path that preserves context and routes next steps clearly.',
    futureScope: {
      laterCapabilities: ['Idea triage assistant', 'Pattern-based routing', 'Prototype request queue'],
      deferredRequirements: ['Automated fit recommendation', 'External tool integrations', 'Pilot approval workflow'],
      dependencies: ['Review ownership', 'Intake criteria', 'Governance boundaries'],
      revisitTriggers: ['Idea volume grows', 'Duplicate submissions appear', 'Pilot routing becomes unclear'],
    },
    patternLearning: {
      repeatedPainPatterns: ['Ideas appear before evaluation criteria exist', 'Teams lack a shared routing path'],
      commonBlockers: ['Unclear approval owner', 'Insufficient context in submissions'],
      similarInitiatives: ['Construction Status Reporting', 'Lease Handoff and Obligation Tracking'],
      recurringSystems: ['Forms', 'Spreadsheets', 'Team channels'],
      reusableRequirementPatterns: ['Submitter, workflow, pain point, desired outcome, data involved, next action'],
      solutionPathsChosen: ['Knowledge / Memory Layer', 'Lightweight Prototype'],
      successfulSolutionApproaches: ['Start with structured intake and learning before AI-assisted triage'],
      failedOrDeferredApproaches: ['Letting informal ideas become ungoverned pilots'],
      commonDiscoveryGaps: ['What problem the idea solves and who owns the workflow'],
      dataReadinessIssues: ['Ideas often omit source data and system constraints'],
      stakeholderOwnershipProblems: ['Submitter, workflow owner, and pilot approver may differ'],
    },
    decisionLensBehaviors: [
      {
        lens: 'AI Leverage',
        recommendationChanged: true,
        currentRecommendedNextAction: 'Assess AI Fit',
        emphasisChanges: ['Identify where AI can assist triage without becoming the default solution.'],
        pathsAffected: ['AI-Assisted Workflow', 'Knowledge / Memory Layer'],
        newQuestionsToAsk: ['Which intake fields reveal whether AI is actually useful?'],
        futureDirection: 'Add AI-assisted triage after governance and review patterns are proven.',
      },
      {
        lens: 'Cost Sensitive',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Run Discovery',
        emphasisChanges: ['Favor existing tools and a lightweight intake process.'],
        pathsAffected: ['Knowledge / Memory Layer', 'Lightweight Prototype'],
        newQuestionsToAsk: ['What is the smallest structure that prevents idea loss?'],
        futureDirection: 'Prototype only after the intake criteria are clear.',
      },
      {
        lens: 'Scale Ready',
        recommendationChanged: false,
        currentRecommendedNextAction: 'Run Discovery',
        emphasisChanges: ['Design categories and routing rules that can support rising idea volume.'],
        pathsAffected: ['Knowledge / Memory Layer', 'Workflow Automation'],
        newQuestionsToAsk: ['Which idea attributes will matter for routing at higher volume?'],
        futureDirection: 'Use early submissions to refine reusable pattern learning.',
      },
    ],
  },
]

export const wayfinderDataSummary = {
  initiativeCount: initiatives.length,
  rawSignalCount: initiatives.reduce((total, initiative) => total + initiative.rawSignals.length, 0),
  solutionPathCount: solutionPathOptions.length,
  recommendedNextActionCount: recommendedNextActions.length,
  decisionLensCount: decisionLensPresets.length,
  requirementCategoryCount: requirementCategories.length,
}
