import { useMemo, useState, type FormEvent } from 'react'
import './App.css'
import {
  departments,
  decisionLensPresets,
  initiatives,
  recommendedNextActions,
  requirementCategories,
  solutionPathOptions,
  type Department,
  type Initiative,
  type PatternLearning,
  type RecommendedNextAction,
  type RequirementsByCategory,
  type SolutionPathOption,
} from './data/wayfinderData'

type PageId = 'home' | 'initiatives' | 'intake' | 'patterns' | 'playbook'

type CountItem = {
  label: string
  count: number
}

type InitiativeSignal = Initiative['rawSignals'][number]

type DraftSignal = {
  title: string
  departments: Department[]
  rawInput: string
  notes: string
  mode: 'new' | 'existing'
  targetInitiativeId: string
}

type StructuredDraft = {
  title: string
  problemSummary: string
  recommendedNextAction: RecommendedNextAction
  primarySolutionPath: SolutionPathOption
  supportingSolutionPaths: SolutionPathOption[]
}

const navItems: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'initiatives', label: 'Initiative Queue' },
  { id: 'intake', label: 'Add Signal' },
  { id: 'patterns', label: 'Pattern Intelligence' },
  { id: 'playbook', label: 'Recommendation Playbook' },
]

const pageCopy: Record<PageId, { title: string; purpose: string; action?: string }> = {
  home: {
    title: 'Home',
    purpose: 'See the highest-priority initiatives, recommended next actions, and emerging operational patterns.',
    action: 'Add signal',
  },
  initiatives: {
    title: 'Initiative Queue',
    purpose: 'Search, filter, and open candidate workstreams for scoping and recommendation.',
    action: 'Add signal',
  },
  intake: {
    title: 'Add Signal',
    purpose: 'Convert a rough operational issue into a structured initiative draft.',
    action: 'Generate draft',
  },
  patterns: {
    title: 'Pattern Intelligence',
    purpose: 'See repeated blockers, workflow gaps, data issues, and reusable solution patterns across initiatives.',
  },
  playbook: {
    title: 'Recommendation Playbook',
    purpose: 'Understand how Wayfinder routes work to practical solution paths.',
  },
}

const lensDisplayLabels: Record<string, string> = {
  'Fastest Useful Output': 'Quickest Delivery',
  'Low Engineering Lift': 'Easiest to Build',
  'Safer First Step': 'Lowest Risk',
  'Executive Visibility': 'Visibility',
  'AI Leverage': 'AI Opportunity',
  'Operational Stability': 'Stability',
  'Cost Sensitive': 'Cost Control',
  'Scale Ready': 'Scalability',
}

const getLensLabel = (lens: string) => lensDisplayLabels[lens] ?? lens

const getFitClass = (fit: string) =>
  fit.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')

const getRequirementHighlights = (initiative: Initiative) => {
  const priorityCategories = ['Business Requirements', 'Workflow Requirements', 'Success Metrics'] as const

  return priorityCategories
    .flatMap((category) => initiative.candidateRequirementsMap[category] ?? [])
    .slice(0, 4)
    .map((item) => item.requirement)
}

const createAttachedSignal = (signal: Pick<DraftSignal, 'title' | 'departments' | 'rawInput' | 'notes'>): InitiativeSignal => ({
  id: `signal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  source: signal.title.trim() || 'Added Signal',
  summary: signal.rawInput.trim() || 'Additional signal added for review.',
  observedImpact: [
    signal.departments.length ? `Departments: ${signal.departments.join(', ')}` : '',
    signal.notes.trim() || 'Impact and urgency should be clarified during discovery.',
  ]
    .filter(Boolean)
    .join(' | '),
})

const emptyRequirementsByCategory = (): RequirementsByCategory => {
  const requirements = {} as RequirementsByCategory

  requirementCategories.forEach((category) => {
    requirements[category] = []
  })

  return requirements
}

const truncate = (value: string, maxLength = 168) =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value

const toSentence = (items: string[]) => (items.length ? items.join(', ') : 'None captured yet')

const getTopCounts = (items: string[], limit = 6): CountItem[] => {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1
    return acc
  }, {})

  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit)
}

const countBy = <T,>(items: T[], getValue: (item: T) => string): CountItem[] =>
  getTopCounts(items.map(getValue), items.length)

const aggregatePatterns = (items: Initiative[]) => ({
  repeatedPainPatterns: getTopCounts(items.flatMap((initiative) => initiative.patternLearning.repeatedPainPatterns)),
  commonBlockers: getTopCounts(items.flatMap((initiative) => initiative.patternLearning.commonBlockers)),
  dataReadinessIssues: getTopCounts(items.flatMap((initiative) => initiative.patternLearning.dataReadinessIssues)),
  recurringSystems: getTopCounts(items.flatMap((initiative) => initiative.patternLearning.recurringSystems)),
  similarInitiatives: getTopCounts(items.flatMap((initiative) => initiative.patternLearning.similarInitiatives)),
  reusableRequirementPatterns: getTopCounts(
    items.flatMap((initiative) => initiative.patternLearning.reusableRequirementPatterns),
  ),
})

const createPatternLearning = (draft: StructuredDraft): PatternLearning => ({
  repeatedPainPatterns: ['Unstructured signals need a clear routing path'],
  commonBlockers: ['Incomplete source context', 'Unclear next-step owner'],
  similarInitiatives: [],
  recurringSystems: ['Email', 'Spreadsheets', 'Meetings'],
  reusableRequirementPatterns: ['Problem, owner, workflow, data source, next action'],
  solutionPathsChosen: [draft.primarySolutionPath, ...draft.supportingSolutionPaths],
  successfulSolutionApproaches: ['Structure the signal before choosing a build path'],
  failedOrDeferredApproaches: ['Moving directly from idea to implementation'],
  commonDiscoveryGaps: ['Who owns the workflow and where the source signal lives'],
  dataReadinessIssues: ['Source details may be incomplete at intake'],
  stakeholderOwnershipProblems: ['Submitter and accountable owner may differ'],
})

const createInitiativeFromDraft = (draft: StructuredDraft, signal: DraftSignal): Initiative => {
  const requirements = emptyRequirementsByCategory()

  requirements['Business Requirements'] = [
    {
      id: `${Date.now()}-business-1`,
      category: 'Business Requirements',
      requirement: 'Clarify the operating problem and intended business outcome.',
      rationale: 'Keeps the initiative tied to a practical decision or workflow need.',
    },
  ]

  requirements['Workflow Requirements'] = [
    {
      id: `${Date.now()}-workflow-1`,
      category: 'Workflow Requirements',
      requirement: 'Identify the current workflow, owners, handoffs, and decision points.',
      rationale: 'Turns the rough signal into a scoped operating problem.',
    },
  ]

  requirements['Success Metrics'] = [
    {
      id: `${Date.now()}-success-1`,
      category: 'Success Metrics',
      requirement: 'Define what a useful first outcome should make easier to see, decide, or do.',
      rationale: 'Prevents the initiative from becoming a vague improvement effort.',
    },
  ]

  return {
    id: `local-${Date.now()}`,
    title: draft.title,
    department: signal.departments[0] ?? departments[0],
    problemSummary: draft.problemSummary,
    contextSummary:
      'This initiative was created through the simulated intake flow. It should be reviewed, scoped, and refined before any delivery path is chosen.',
    rawSignals: [createAttachedSignal(signal)],
    scopingAnalysis:
      'The draft should be reviewed for workflow ownership, source data readiness, expected users, and the first useful operating output.',
    recommendedNextAction: draft.recommendedNextAction,
    primarySolutionPath: draft.primarySolutionPath,
    solutionPaths: [
      {
        path: draft.primarySolutionPath,
        fit: 'Good',
        rationale: 'Suggested by the simulated intake template based on the signal language.',
      },
      ...draft.supportingSolutionPaths.map((path) => ({
        path,
        fit: 'Possible' as const,
        rationale: 'Potential supporting path once discovery clarifies workflow, data, and ownership.',
      })),
    ],
    candidateRequirementsMap: requirements,
    requirementsBySolutionPath: {
      [draft.primarySolutionPath]: requirements,
    },
    targetState:
      'The issue is shaped into a clear initiative with a recommended next action, candidate path, and enough context for practical follow-up.',
    futureScope: {
      laterCapabilities: ['Additional requirements mapping', 'Decision priority review', 'Reusable playbook alignment'],
      deferredRequirements: ['Persistence', 'Automated analysis', 'System integrations'],
      dependencies: ['Workflow owner', 'Source context', 'Discovery conversation'],
      revisitTriggers: ['Repeated signals appear', 'Ownership becomes clear', 'Data source is validated'],
    },
    patternLearning: createPatternLearning(draft),
    decisionLensBehaviors: [
      {
        lens: 'Fastest Useful Output',
        recommendationChanged: false,
        currentRecommendedNextAction: draft.recommendedNextAction,
        emphasisChanges: ['Keep the first step small enough to validate quickly.'],
        pathsAffected: [draft.primarySolutionPath],
        newQuestionsToAsk: ['What useful output could be created first?'],
        futureDirection: 'Use discovery findings to decide whether this remains lightweight or needs a deeper path.',
      },
      {
        lens: 'Operational Stability',
        recommendationChanged: false,
        currentRecommendedNextAction: draft.recommendedNextAction,
        emphasisChanges: ['Clarify owners, handoffs, and review cadence before adding tooling.'],
        pathsAffected: [draft.primarySolutionPath, ...draft.supportingSolutionPaths],
        newQuestionsToAsk: ['Who owns the current workflow and who needs the output?'],
        futureDirection: 'Stabilize the operating process before expanding scope.',
      },
      {
        lens: 'AI Leverage',
        recommendationChanged: draft.primarySolutionPath !== 'AI-Assisted Workflow',
        currentRecommendedNextAction:
          draft.primarySolutionPath === 'AI-Assisted Workflow' ? draft.recommendedNextAction : 'Assess AI Fit',
        emphasisChanges: ['Evaluate whether AI helps the workflow or only adds novelty.'],
        pathsAffected: ['AI-Assisted Workflow', draft.primarySolutionPath],
        newQuestionsToAsk: ['What text, documents, or decisions would AI actually support?'],
        futureDirection: 'Only move toward AI assistance if the workflow and data context are strong enough.',
      },
    ],
  }
}

function App() {
  const [activePage, setActivePage] = useState<PageId>('home')
  const [addedInitiatives, setAddedInitiatives] = useState<Initiative[]>([])
  const [signalAdditions, setSignalAdditions] = useState<Record<string, InitiativeSignal[]>>({})
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string | null>(null)

  const allInitiatives = useMemo(
    () =>
      [...initiatives, ...addedInitiatives].map((initiative) => ({
        ...initiative,
        rawSignals: [...initiative.rawSignals, ...(signalAdditions[initiative.id] ?? [])],
      })),
    [addedInitiatives, signalAdditions],
  )

  const selectedInitiative = selectedInitiativeId
    ? allInitiatives.find((initiative) => initiative.id === selectedInitiativeId) ?? null
    : null

  const navigate = (page: PageId) => {
    setActivePage(page)
    setSelectedInitiativeId(null)
  }

  const openAddSignal = () => {
    setActivePage('intake')
    setSelectedInitiativeId(null)
  }

  const addSignalToInitiative = (initiativeId: string, signal: InitiativeSignal) => {
    setSignalAdditions((current) => ({
      ...current,
      [initiativeId]: [...(current[initiativeId] ?? []), signal],
    }))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup" aria-label="Wayfinder">
          <span className="brand-mark">W</span>
          <div>
            <strong>Wayfinder</strong>
            <span>Strategy intelligence</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              className={`nav-item ${activePage === item.id && !selectedInitiative ? 'active' : ''}`}
              key={item.id}
              onClick={() => navigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="system-note">
          <span>Prototype mode</span>
          <p>Local data, simulated structuring, no persistence.</p>
        </div>
      </aside>

      <main className="main-surface">
        {selectedInitiative ? (
          <InitiativeDetail
            initiative={selectedInitiative}
            onAddSignal={(signal) => addSignalToInitiative(selectedInitiative.id, signal)}
            onBack={() => setSelectedInitiativeId(null)}
          />
        ) : (
          <>
            {activePage === 'home' && <HomePage initiatives={allInitiatives} onAddSignal={openAddSignal} />}
            {activePage === 'initiatives' && (
              <InitiativesPage
                initiatives={allInitiatives}
                onAddSignal={openAddSignal}
                onSelectInitiative={(initiative) => setSelectedInitiativeId(initiative.id)}
              />
            )}
            {activePage === 'intake' && (
              <IntakePage
                initiatives={allInitiatives}
                onAddInitiative={(initiative) => {
                  setAddedInitiatives((current) => [initiative, ...current])
                  setActivePage('initiatives')
                }}
                onAddSignalToInitiative={addSignalToInitiative}
              />
            )}
            {activePage === 'patterns' && <PatternsPage initiatives={allInitiatives} />}
            {activePage === 'playbook' && <PlaybookPage initiatives={allInitiatives} />}
          </>
        )}
      </main>
    </div>
  )
}

function PageHeader({
  page,
  onPrimaryAction,
}: {
  page: PageId
  onPrimaryAction?: () => void
}) {
  const copy = pageCopy[page]

  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Wayfinder workspace</p>
        <h1>{copy.title}</h1>
        <p>{copy.purpose}</p>
      </div>
      <div className="page-header-actions">
        {copy.action && onPrimaryAction ? (
          <button className="primary-button" onClick={onPrimaryAction} type="button">
            {copy.action}
          </button>
        ) : null}
        <WayfinderLogo />
      </div>
    </header>
  )
}

function WayfinderLogo() {
  return (
    <svg className="wayfinder-logo" viewBox="0 0 96 96" role="img" aria-label="Wayfinder compass mark">
      <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
      <path className="logo-compass-lines" d="M48 16v26M48 54v26M16 48h26M54 48h26M28 28l14 14M54 54l14 14M68 28 54 42M42 54 28 68" />
      <path className="logo-arrow-shadow" d="M71 25 39 51l11 5 5 14 16-45Z" />
      <path className="logo-arrow" d="M72 24 34 49l18 7 7 18 13-50Z" />
    </svg>
  )
}


function WayfinderHero({ onAddSignal }: { onAddSignal: () => void }) {
  const demoSteps = [
    'Review the top recommended initiatives.',
    'Open an initiative to inspect the recommendation.',
    'Apply a prioritization lens to see how emphasis changes.',
    'Add a new signal through Intake.',
  ]

  const examples = [
    {
      before: 'Can we build a dashboard for debt covenants?',
      action: 'Map Workflow first',
      reason: 'Owners, escalation rules, and source documents are unclear. The dashboard becomes useful after workflow ownership is visible.',
    },
    {
      before: 'Let us use AI to extract lease terms.',
      action: 'Assess AI Fit',
      reason: 'Source-linking and review requirements need to be validated before AI touches a sensitive workflow.',
    },
    {
      before: 'I built a spreadsheet for billing variances.',
      action: 'Build Prototype',
      reason: 'The workflow is narrow, the data is structured, and the scope is reversible. This is the right build moment.',
    },
  ]

  return (
    <section className="wayfinder-hero" aria-labelledby="wayfinder-hero-title">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow">Strategic intelligence cockpit</p>
          <h2 id="wayfinder-hero-title">
            Wayfinder turns scattered operational demand into structured decisions, practical next actions, and recommended solution paths.
          </h2>
          <p>
            Use it to move from raw requests and messy notes to a clear initiative queue, visible tradeoffs, and a recommended first step.
          </p>
          <button className="primary-button" onClick={onAddSignal} type="button">
            Add Signal
          </button>
        </div>

        <div className="hero-steps" aria-label="How to use this demo">
          {demoSteps.map((step, index) => (
            <div className="hero-step" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-decision-panel" aria-label="Before and after Wayfinder examples">
        <div className="hero-panel-heading before-heading">Raw request</div>
        <div className="hero-panel-heading after-heading">Wayfinder output</div>
        {examples.map((example) => (
          <div className="hero-panel-row" key={example.before}>
            <div className="hero-before">{example.before}</div>
            <div className="hero-after">
              <strong>{example.action}.</strong> {example.reason}
            </div>
          </div>
        ))}
      </div>

      <article className="hero-waypoint-card" aria-label="Example recommended next action">
        <div>
          <p className="eyebrow">Example recommended next action</p>
          <h3>Map Workflow</h3>
          <p>Debt Obligation and Deadline Visibility</p>
        </div>
        <p>
          Ownership and handoffs are unclear. Reporting and automation become safer after the operational workflow is visible.
        </p>
      </article>
    </section>
  )
}

function HomePage({ initiatives, onAddSignal }: { initiatives: Initiative[]; onAddSignal: () => void }) {
  const topInitiatives = initiatives.slice(0, 3)
  const patterns = aggregatePatterns(initiatives)
  const recentSignals = initiatives.flatMap((initiative) =>
    initiative.rawSignals.map((signal) => ({
      ...signal,
      initiativeTitle: initiative.title,
      department: initiative.department,
    })),
  )

  return (
    <div className="page-stack">
      <PageHeader page="home" onPrimaryAction={onAddSignal} />

      <WayfinderHero onAddSignal={onAddSignal} />

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Priority recommendations</p>
            <h2>Recommended next moves</h2>
          </div>
          <span className="section-note">Top candidate workstreams from current signals</span>
        </div>
        <div className="priority-grid">
          {topInitiatives.map((initiative, index) => (
            <article className={`priority-card ${index === 0 ? 'featured' : ''}`} key={initiative.id}>
              <div className="card-topline">
                <span className="chip dark">{initiative.department}</span>
                <span className="chip accent">{initiative.recommendedNextAction}</span>
              </div>
              <h3>{initiative.title}</h3>
              <p>{truncate(initiative.problemSummary, index === 0 ? 230 : 150)}</p>
              <div className="path-callout">
                <span>Recommended path</span>
                <strong>{initiative.primarySolutionPath}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <InsightPanel title="Initiative Overview" eyebrow="Operating picture">
          <div className="metric-row">
            <div className="metric-card">
              <span>Total initiatives</span>
              <strong>{initiatives.length}</strong>
            </div>
            <div className="metric-card">
              <span>Raw signals</span>
              <strong>{recentSignals.length}</strong>
            </div>
          </div>
          <CountList title="By department" items={countBy(initiatives, (item) => item.department)} />
          <CountList title="By primary path" items={countBy(initiatives, (item) => item.primarySolutionPath)} />
        </InsightPanel>

        <InsightPanel title="Emerging Patterns" eyebrow="Repeated friction">
          <CountList title="Pain patterns" items={patterns.repeatedPainPatterns.slice(0, 4)} />
          <CountList title="Common blockers" items={patterns.commonBlockers.slice(0, 4)} />
          <CountList title="Data readiness issues" items={patterns.dataReadinessIssues.slice(0, 4)} />
        </InsightPanel>
      </section>

      <section className="content-grid">
        <InsightPanel title="Recent Signals" eyebrow="Raw inputs">
          <div className="signal-list">
            {recentSignals.slice(0, 5).map((signal) => (
              <article className="signal-card" key={signal.id}>
                <p>{signal.summary}</p>
                <div>
                  <span>{signal.initiativeTitle}</span>
                  <span>{signal.department}</span>
                </div>
              </article>
            ))}
          </div>
        </InsightPanel>

        <InsightPanel title="Recommended Next Actions" eyebrow="Action summary">
          <CountList title="Current recommendations" items={countBy(initiatives, (item) => item.recommendedNextAction)} />
        </InsightPanel>
      </section>
    </div>
  )
}

function InitiativesPage({
  initiatives,
  onAddSignal,
  onSelectInitiative,
}: {
  initiatives: Initiative[]
  onAddSignal: () => void
  onSelectInitiative: (initiative: Initiative) => void
}) {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All')
  const [action, setAction] = useState('All')
  const [path, setPath] = useState('All')

  const filtered = initiatives.filter((initiative) => {
    const matchesSearch = `${initiative.title} ${initiative.problemSummary}`.toLowerCase().includes(search.toLowerCase())
    const matchesDepartment = department === 'All' || initiative.department === department
    const matchesAction = action === 'All' || initiative.recommendedNextAction === action
    const matchesPath = path === 'All' || initiative.primarySolutionPath === path

    return matchesSearch && matchesDepartment && matchesAction && matchesPath
  })

  return (
    <div className="page-stack">
      <PageHeader page="initiatives" onPrimaryAction={onAddSignal} />

      <section className="queue-controls">
        <label className="search-field">
          <span>Search initiatives</span>
          <input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or problem summary"
            value={search}
          />
        </label>
        <FilterSelect label="Department" value={department} options={['All', ...departments]} onChange={setDepartment} />
        <FilterSelect label="Next action" value={action} options={['All', ...recommendedNextActions]} onChange={setAction} />
        <FilterSelect label="Solution path" value={path} options={['All', ...solutionPathOptions]} onChange={setPath} />
      </section>

      {filtered.length ? (
        <section className="initiative-list" aria-label="Initiative queue">
          {filtered.map((initiative) => (
            <button className="initiative-row" key={initiative.id} onClick={() => onSelectInitiative(initiative)} type="button">
              <div>
                <div className="card-topline">
                  <span className="chip dark">{initiative.department}</span>
                  <span className="chip muted">{initiative.primarySolutionPath}</span>
                </div>
                <h2>{initiative.title}</h2>
                <p>{truncate(initiative.problemSummary, 210)}</p>
              </div>
              <div className="row-action">
                <span>Next action</span>
                <strong>{initiative.recommendedNextAction}</strong>
              </div>
            </button>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No initiatives match these filters</h2>
          <p>Adjust the search text or filters to broaden the initiative queue.</p>
        </section>
      )}
    </div>
  )
}

function InitiativeDetail({
  initiative,
  onAddSignal,
  onBack,
}: {
  initiative: Initiative
  onAddSignal: (signal: InitiativeSignal) => void
  onBack: () => void
}) {
  const [selectedLens, setSelectedLens] = useState<string | null>(null)
  const [newSignal, setNewSignal] = useState('')
  const [newSignalNotes, setNewSignalNotes] = useState('')
  const activeBehavior = initiative.decisionLensBehaviors.find((behavior) => behavior.lens === selectedLens)
  const primaryRationale =
    initiative.solutionPaths.find((path) => path.path === initiative.primarySolutionPath)?.rationale ?? initiative.scopingAnalysis
  const requirementHighlights = getRequirementHighlights(initiative)

  const handleAttachSignal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!newSignal.trim()) {
      return
    }

    onAddSignal(
      createAttachedSignal({
        title: 'Initiative Signal',
        departments: [initiative.department],
        rawInput: newSignal,
        notes: newSignalNotes,
      }),
    )
    setNewSignal('')
    setNewSignalNotes('')
  }

  return (
    <div className="page-stack detail-page">
      <button className="back-button" onClick={onBack} type="button">
        Back to Initiative Queue
      </button>

      <header className="detail-header">
        <div>
          <p className="eyebrow">{initiative.department}</p>
          <h1>{initiative.title}</h1>
          <p>{initiative.problemSummary}</p>
        </div>
      </header>

      <section className="problem-understanding" aria-label="Problem understanding and objective">
        <article className="understanding-card primary">
          <p className="eyebrow">Problem</p>
          <h2>What needs to be understood before choosing the path?</h2>
          <p>{initiative.contextSummary}</p>
        </article>
        <article className="understanding-card">
          <p className="eyebrow">Current understanding</p>
          <p>{initiative.scopingAnalysis}</p>
        </article>
        <article className="understanding-card objective-card">
          <p className="eyebrow">Key objective</p>
          <strong>{initiative.targetState}</strong>
        </article>
        <article className="understanding-card requirements-preview">
          <p className="eyebrow">Requirement signals</p>
          <ul>
            {requirementHighlights.length ? (
              requirementHighlights.map((requirement) => <li key={requirement}>{requirement}</li>)
            ) : (
              <li>No candidate requirements captured yet.</li>
            )}
          </ul>
        </article>
      </section>

      <section className="recommended-path">
        <div>
          <p className="eyebrow">Recommended Path</p>
          <h2>{initiative.primarySolutionPath}</h2>
          <p>{primaryRationale}</p>
        </div>
        <div className="recommendation-action">
          <span>Recommended next action</span>
          <strong>{initiative.recommendedNextAction}</strong>
        </div>
      </section>

      <section className="detail-scan-panel" aria-label="Initiative decision brief">
        <div>
          <p className="eyebrow">Decision brief</p>
          <h2>Start with the problem, then scan the decision support only as needed.</h2>
        </div>
        <div className="detail-scan-grid">
          <a href="#initiative-signals">Signals</a>
          <a href="#prioritization-lens">Prioritization lens</a>
          <a href="#solution-options">Solution options</a>
          <a href="#supporting-detail">Supporting detail</a>
        </div>
      </section>

      <section className="signal-attachment-panel" id="initiative-signals">
        <div className="signal-panel-main">
          <div>
            <p className="eyebrow">Initiative signals</p>
            <h2>Add new information to shape the next step</h2>
            <p>
              Signals attached here become part of this initiative's working context. In the full product, those signals would help refresh the requirements, prioritization lens, and recommended path.
            </p>
          </div>
          <div className="attached-signal-list">
            {initiative.rawSignals.map((signal) => (
              <article className="attached-signal" key={signal.id}>
                <span>{signal.source}</span>
                <p>{signal.summary}</p>
              </article>
            ))}
          </div>
        </div>
        <form className="signal-attach-form" onSubmit={handleAttachSignal}>
          <label>
            <span>New signal or context</span>
            <textarea
              onChange={(event) => setNewSignal(event.target.value)}
              placeholder="Paste an update, meeting note, stakeholder concern, source detail, or workflow discovery note."
              rows={4}
              value={newSignal}
            />
          </label>
          <label>
            <span>Optional impact / notes</span>
            <input
              onChange={(event) => setNewSignalNotes(event.target.value)}
              placeholder="Why this changes urgency, scope, risk, or ownership"
              value={newSignalNotes}
            />
          </label>
          <button className="primary-button" type="submit">Attach signal</button>
        </form>
      </section>

      <section className="detail-section lens-section" id="prioritization-lens">
        <div className="section-heading lens-heading">
          <div>
            <p className="eyebrow">Prioritization Lens</p>
            <h2>Apply a prioritization lens</h2>
          </div>
          <p className="lens-explainer">
            Are there unique prioritization factors here that may influence the recommendation? Click a lens below to see how speed,
            build effort, visibility, risk, or stability may alter the path, tradeoffs, and next questions.
          </p>
        </div>
        <div className="lens-grid">
          {decisionLensPresets.map((lens) => {
            const available = initiative.decisionLensBehaviors.some((behavior) => behavior.lens === lens)

            return (
              <button
                className={`lens-chip ${selectedLens === lens ? 'active' : ''}`}
                disabled={!available}
                key={lens}
                onClick={() => setSelectedLens(lens)}
                type="button"
              >
                {getLensLabel(lens)}
              </button>
            )
          })}
        </div>

        {activeBehavior ? (
          <article className="lens-output">
            <div className="lens-output-top">
              <span className="chip accent">{getLensLabel(activeBehavior.lens)}</span>
              <strong>
                Recommendation changed: {activeBehavior.recommendationChanged ? 'Yes' : 'No'}
              </strong>
            </div>
            {!activeBehavior.recommendationChanged ? (
              <p className="steady-note">
                The recommendation stays the same. The prioritization lens changes emphasis, tradeoffs, and follow-up questions.
              </p>
            ) : null}
            <div className="detail-grid">
              <DetailList title="Current recommended next action" items={[activeBehavior.currentRecommendedNextAction]} />
              <DetailList title="Emphasis changes" items={activeBehavior.emphasisChanges} />
              <DetailList title="Paths affected" items={activeBehavior.pathsAffected} />
              <DetailList title="New questions to ask" items={activeBehavior.newQuestionsToAsk} />
              <DetailList title="Future direction" items={[activeBehavior.futureDirection]} />
            </div>
          </article>
        ) : (
          <div className="neutral-message">Select a prioritization lens to see how it changes emphasis.</div>
        )}
      </section>

      <section className="detail-section" id="solution-options">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Solution Options</p>
            <h2>Possible paths</h2>
          </div>
        </div>
        <div className="solution-grid">
          {initiative.solutionPaths.map((path) => {
            const isPrimary = path.path === initiative.primarySolutionPath

            return (
              <article className={`solution-card ${isPrimary ? 'primary-path' : ''}`} key={path.path}>
                <div className="card-topline">
                  <span className={`fit-chip ${getFitClass(path.fit)}`}>{path.fit}</span>
                  {isPrimary ? <span className="path-status-chip">Recommended</span> : null}
                </div>
                <h3>{path.path}</h3>
                <p>{path.rationale}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="supporting-detail-stack" id="supporting-detail">
        <details className="detail-disclosure" open>
          <summary>
            <div>
              <p className="eyebrow">Requirements</p>
              <h2>Candidate requirements map</h2>
              <p>Open when the recommendation needs to become scoped delivery work.</p>
            </div>
            <span>Review</span>
          </summary>
          <div className="disclosure-body">
            <RequirementsGrid requirements={initiative.candidateRequirementsMap} />
          </div>
        </details>

        <details className="detail-disclosure">
          <summary>
            <div>
              <p className="eyebrow">Requirements by path</p>
              <h2>How solution choices change the work</h2>
              <p>Compare how the requirements shift if the team chooses a different solution path.</p>
            </div>
            <span>Expand</span>
          </summary>
          <div className="disclosure-body path-requirements">
            {Object.entries(initiative.requirementsBySolutionPath).map(([pathName, requirements]) => (
              <article className="detail-card" key={pathName}>
                <h3>{pathName}</h3>
                <RequirementsGrid requirements={requirements} compact />
              </article>
            ))}
          </div>
        </details>

        <details className="detail-disclosure">
          <summary>
            <div>
              <p className="eyebrow">Future Scope</p>
              <h2>Target state, dependencies, and later decisions</h2>
              <p>Keep the future visible without forcing every detail into the primary decision view.</p>
            </div>
            <span>Expand</span>
          </summary>
          <div className="disclosure-body content-grid">
            <InsightPanel title="Target State" eyebrow="Future operating state">
              <p className="large-copy">{initiative.targetState}</p>
            </InsightPanel>
            <InsightPanel title="Future Scope" eyebrow="Later decisions">
              <DetailList title="Later capabilities" items={initiative.futureScope.laterCapabilities} />
              <DetailList title="Deferred requirements" items={initiative.futureScope.deferredRequirements} />
              <DetailList title="Dependencies" items={initiative.futureScope.dependencies} />
              <DetailList title="Triggers to revisit" items={initiative.futureScope.revisitTriggers} />
            </InsightPanel>
          </div>
        </details>

        <details className="detail-disclosure">
          <summary>
            <div>
              <p className="eyebrow">Pattern Learning</p>
              <h2>Signals this initiative contributes</h2>
              <p>Use this when comparing this initiative against repeated blockers, data issues, and reusable playbook patterns.</p>
            </div>
            <span>Expand</span>
          </summary>
          <div className="disclosure-body pattern-matrix">
            <DetailList title="Repeated pain patterns" items={initiative.patternLearning.repeatedPainPatterns} />
            <DetailList title="Common blockers" items={initiative.patternLearning.commonBlockers} />
            <DetailList title="Similar initiatives" items={initiative.patternLearning.similarInitiatives} />
            <DetailList title="Recurring systems" items={initiative.patternLearning.recurringSystems} />
            <DetailList title="Reusable requirement patterns" items={initiative.patternLearning.reusableRequirementPatterns} />
            <DetailList title="Solution paths chosen" items={initiative.patternLearning.solutionPathsChosen} />
            <DetailList title="Successful approaches" items={initiative.patternLearning.successfulSolutionApproaches} />
            <DetailList title="Failed or deferred approaches" items={initiative.patternLearning.failedOrDeferredApproaches} />
            <DetailList title="Discovery gaps" items={initiative.patternLearning.commonDiscoveryGaps} />
            <DetailList title="Data readiness issues" items={initiative.patternLearning.dataReadinessIssues} />
            <DetailList title="Ownership problems" items={initiative.patternLearning.stakeholderOwnershipProblems} />
          </div>
        </details>
      </section>
    </div>
  )
}

function IntakePage({
  initiatives,
  onAddInitiative,
  onAddSignalToInitiative,
}: {
  initiatives: Initiative[]
  onAddInitiative: (initiative: Initiative) => void
  onAddSignalToInitiative: (initiativeId: string, signal: InitiativeSignal) => void
}) {
  const [signal, setSignal] = useState<DraftSignal>({
    title: '',
    departments: [departments[0]],
    rawInput: '',
    notes: '',
    mode: 'new',
    targetInitiativeId: initiatives[0]?.id ?? '',
  })
  const [draft, setDraft] = useState<StructuredDraft | null>(null)
  const [attachedMessage, setAttachedMessage] = useState<string | null>(null)

  const selectedDepartments = signal.departments.length ? signal.departments : [departments[0]]

  const toggleDepartment = (department: Department) => {
    setSignal((current) => {
      const nextDepartments = current.departments.includes(department)
        ? current.departments.filter((item) => item !== department)
        : [...current.departments, department]

      return {
        ...current,
        departments: nextDepartments.length ? nextDepartments : [department],
      }
    })
  }

  const generateDraft = () => {
    const text = `${signal.title} ${signal.rawInput} ${signal.notes}`.toLowerCase()
    let nextAction: RecommendedNextAction = 'Run Discovery'
    let primaryPath: SolutionPathOption = 'Process Improvement'

    if (text.includes('report') || text.includes('visibility') || text.includes('dashboard') || text.includes('status')) {
      nextAction = 'Create Reporting View'
      primaryPath = 'Reporting / Visibility'
    }

    if (text.includes('automate') || text.includes('handoff') || text.includes('routing')) {
      nextAction = 'Map Workflow'
      primaryPath = 'Workflow Automation'
    }

    if (text.includes('ai') || text.includes('summary') || text.includes('idea')) {
      nextAction = 'Assess AI Fit'
      primaryPath = 'AI-Assisted Workflow'
    }

    if (text.includes('data') || text.includes('field') || text.includes('source')) {
      nextAction = 'Validate Data'
      primaryPath = 'Reporting / Visibility'
    }

    const supporting = solutionPathOptions
      .filter((path) => path !== primaryPath && path !== 'Defer / Revisit')
      .slice(0, 3)

    setDraft({
      title: signal.title || 'Untitled Operational Signal',
      problemSummary:
        signal.rawInput || 'A rough operational signal needs discovery before the right solution path can be selected.',
      recommendedNextAction: nextAction,
      primarySolutionPath: primaryPath,
      supportingSolutionPaths: supporting,
    })
    setAttachedMessage(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    generateDraft()
  }

  const handleAttachToExisting = () => {
    const target = initiatives.find((initiative) => initiative.id === signal.targetInitiativeId)

    if (!target) {
      return
    }

    onAddSignalToInitiative(signal.targetInitiativeId, createAttachedSignal(signal))
    setAttachedMessage(`Signal attached to ${target.title}.`)
    setSignal((current) => ({ ...current, rawInput: '', notes: '' }))
  }

  return (
    <div className="page-stack">
      <PageHeader page="intake" onPrimaryAction={generateDraft} />

      <section className="intake-layout">
        <form className="intake-form" id="signal-form" onSubmit={handleSubmit}>
          <div className="form-intro">
            <p className="eyebrow">Manual signal intake</p>
            <h2>Paste the rough issue, request, note, or idea.</h2>
            <p className="example-prompt">
              Example: The debt team keeps missing deadline updates because status lives across email, spreadsheets, and meetings.
            </p>
          </div>

          <div className="intake-mode-toggle" aria-label="Signal destination">
            <button
              className={signal.mode === 'new' ? 'active' : ''}
              onClick={() => setSignal((current) => ({ ...current, mode: 'new' }))}
              type="button"
            >
              Create new initiative
            </button>
            <button
              className={signal.mode === 'existing' ? 'active' : ''}
              onClick={() => setSignal((current) => ({ ...current, mode: 'existing' }))}
              type="button"
            >
              Attach to existing initiative
            </button>
          </div>

          {signal.mode === 'existing' ? (
            <label>
              <span>Existing initiative</span>
              <select
                onChange={(event) => setSignal((current) => ({ ...current, targetInitiativeId: event.target.value }))}
                value={signal.targetInitiativeId}
              >
                {initiatives.map((initiative) => (
                  <option key={initiative.id} value={initiative.id}>{initiative.title}</option>
                ))}
              </select>
            </label>
          ) : null}

          <label>
            <span>Title</span>
            <input
              onChange={(event) => setSignal((current) => ({ ...current, title: event.target.value }))}
              placeholder="Short name for the issue"
              value={signal.title}
            />
          </label>

          <div className="department-picker">
            <span>Departments involved</span>
            <div className="department-chip-grid">
              {departments.map((department) => (
                <button
                  className={selectedDepartments.includes(department) ? 'selected' : ''}
                  key={department}
                  onClick={() => toggleDepartment(department)}
                  type="button"
                >
                  {department}
                </button>
              ))}
            </div>
            <p>Primary department for new initiatives: {selectedDepartments[0]}</p>
          </div>

          <label>
            <span>Raw input / signal</span>
            <textarea
              onChange={(event) => setSignal((current) => ({ ...current, rawInput: event.target.value }))}
              placeholder="Describe the issue, request, meeting note, workflow gap, or operational pain point."
              rows={8}
              value={signal.rawInput}
            />
          </label>

          <label>
            <span>Optional tags or notes</span>
            <input
              onChange={(event) => setSignal((current) => ({ ...current, notes: event.target.value }))}
              placeholder="Owners, systems, urgency, or context"
              value={signal.notes}
            />
          </label>

          <button className="primary-button" type="submit">
            Generate draft
          </button>
        </form>

        <aside className="draft-panel">
          <p className="eyebrow">Simulated structuring</p>
          <p className="page-note">
            Signals can create a new initiative or attach new context to an existing initiative. In a full system, these inputs would refresh requirements, priority, and recommendation logic.
          </p>

          {draft ? (
            <article className="draft-card">
              <span className="chip accent">Structured initiative draft</span>
              <h2>{draft.title}</h2>
              <p>{draft.problemSummary}</p>
              <div className="draft-fields">
                <div>
                  <span>Departments involved</span>
                  <strong>{toSentence(selectedDepartments)}</strong>
                </div>
                <div>
                  <span>Recommended next action</span>
                  <strong>{draft.recommendedNextAction}</strong>
                </div>
                <div>
                  <span>Recommended solution path</span>
                  <strong>{draft.primarySolutionPath}</strong>
                </div>
                <div>
                  <span>Supporting solution paths</span>
                  <strong>{toSentence(draft.supportingSolutionPaths)}</strong>
                </div>
              </div>
              {signal.mode === 'new' ? (
                <button className="primary-button full-width" onClick={() => onAddInitiative(createInitiativeFromDraft(draft, signal))} type="button">
                  Add to Initiative Queue
                </button>
              ) : (
                <button className="primary-button full-width" onClick={handleAttachToExisting} type="button">
                  Attach Signal to Initiative
                </button>
              )}
              {attachedMessage ? <p className="attach-confirmation">{attachedMessage}</p> : null}
            </article>
          ) : (
            <div className="empty-draft">
              <h2>No draft generated yet</h2>
              <p>Add a signal and generate a structured initiative draft.</p>
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}

function PatternsPage({ initiatives }: { initiatives: Initiative[] }) {
  const patterns = aggregatePatterns(initiatives)

  return (
    <div className="page-stack">
      <PageHeader page="patterns" />
      <p className="page-note">
        Patterns show where problems repeat across the organization. This helps identify where standard solutions or playbooks should exist.
      </p>
      <section className="pattern-cluster-grid">
        <PatternCluster title="Repeated Pain Patterns" items={patterns.repeatedPainPatterns} />
        <PatternCluster title="Common Blockers" items={patterns.commonBlockers} />
        <PatternCluster title="Data Readiness Issues" items={patterns.dataReadinessIssues} />
        <PatternCluster title="Recurring Systems" items={patterns.recurringSystems} />
        <PatternCluster title="Similar Initiatives" items={patterns.similarInitiatives} />
        <PatternCluster title="Reusable Requirement Patterns" items={patterns.reusableRequirementPatterns} />
      </section>
    </div>
  )
}

function PlaybookPage({ initiatives }: { initiatives: Initiative[] }) {
  const patterns = aggregatePatterns(initiatives)
  const playbooks = [
    {
      title: 'Workflow Visibility Gaps',
      when: 'Use when critical work is happening across email, spreadsheets, meetings, and personal tracking habits.',
      actions: ['Map Workflow', 'Define ownership', 'Create a shared operating view'],
      paths: ['Process Improvement', 'Reporting / Visibility'],
      risks: ['Automating before ownership is clear', 'Confusing reporting with process control'],
    },
    {
      title: 'Data Readiness Before Reporting',
      when: 'Use when teams need visibility but source fields, status language, or ownership are inconsistent.',
      actions: ['Validate Data', 'Normalize status definitions', 'Confirm trusted fields'],
      paths: ['Reporting / Visibility', 'Workflow Automation'],
      risks: ['Building dashboards from unreliable fields', 'Skipping source-of-truth decisions'],
    },
    {
      title: 'Structured Intake and Memory',
      when: 'Use when ideas, requests, and operational issues are appearing faster than they can be routed.',
      actions: ['Run Discovery', 'Define intake fields', 'Route to the right solution path'],
      paths: ['Knowledge / Memory Layer', 'Lightweight Prototype', 'AI-Assisted Workflow'],
      risks: ['Letting informal ideas become ungoverned work', 'Treating AI as the default answer'],
    },
  ]

  return (
    <div className="page-stack">
      <PageHeader page="playbook" />
      <p className="page-note">Playbooks provide repeatable approaches to common operational problems.</p>
      <section className="playbook-grid">
        {playbooks.map((playbook, index) => (
          <article className="playbook-card" key={playbook.title}>
            <span className="playbook-index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{playbook.title}</h2>
            <p>{playbook.when}</p>
            <div className="playbook-columns">
              <DetailList title="Recommended first actions" items={playbook.actions} />
              <DetailList title="Typical solution paths" items={playbook.paths} />
              <DetailList title="Common risks" items={playbook.risks} />
            </div>
          </article>
        ))}
      </section>
      <section className="insight-band">
        <span>Pattern base</span>
        <p>
          Current playbook logic is informed by {initiatives.length} initiatives and recurring patterns such as{' '}
          {patterns.repeatedPainPatterns.slice(0, 2).map((item) => item.label).join(' and ')}.
        </p>
      </section>
    </div>
  )
}

function InsightPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="insight-panel">
      <div className="panel-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function CountList({ title, items }: { title: string; items: CountItem[] }) {
  return (
    <div className="count-list">
      <h3>{title}</h3>
      {items.map((item) => (
        <div className="count-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.count}</strong>
        </div>
      ))}
    </div>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="detail-list">
      <h3>{title}</h3>
      <ul>
        {items.length ? items.map((item) => <li key={item}>{item}</li>) : <li>None captured yet.</li>}
      </ul>
    </div>
  )
}

function RequirementsGrid({ requirements, compact = false }: { requirements: RequirementsByCategory; compact?: boolean }) {
  return (
    <div className={compact ? 'requirements-grid compact' : 'requirements-grid'}>
      {requirementCategories.map((category) => {
        const items = requirements[category] ?? []

        if (compact && !items.length) {
          return null
        }

        return (
          <article className="requirement-card" key={category}>
            <h3>{category.replace(' Requirements', '')}</h3>
            {items.length ? (
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.requirement}</strong>
                    <span>{item.rationale}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No candidate requirements yet.</p>
            )}
          </article>
        )
      })}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function PatternCluster({ title, items }: { title: string; items: CountItem[] }) {
  return (
    <article className="pattern-cluster">
      <div className="cluster-heading">
        <h2>{title}</h2>
        <span>{items.reduce((sum, item) => sum + item.count, 0)}</span>
      </div>
      <div className="cluster-items">
        {items.map((item) => (
          <div className="cluster-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    </article>
  )
}

export default App
