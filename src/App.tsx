import { useState } from 'react'
import {
  decisionLensPresets,
  departments,
  initiatives,
  recommendedNextActions,
  requirementCategories,
  solutionPathOptions,
  wayfinderDataSummary,
  type Department,
  type Initiative,
  type RecommendedNextAction,
  type SolutionPathOption,
} from './data/wayfinderData'
import './App.css'

type SectionKey = 'home' | 'initiatives' | 'intake' | 'patterns' | 'playbook'

type NavItem = {
  key: SectionKey
  label: string
  eyebrow: string
}

type SectionContent = {
  title: string
  summary: string
  stat: string
  statLabel: string
  points: string[]
}

type CountItem<T extends string = string> = {
  label: T
  count: number
}

type RecentSignal = {
  id: string
  summary: string
  initiativeTitle: string
  department: Department
}

type FilterValue<T extends string> = T | 'All'

const navItems: NavItem[] = [
  { key: 'home', label: 'Wayfinder', eyebrow: 'Command' },
  { key: 'initiatives', label: 'Initiatives', eyebrow: 'Portfolio' },
  { key: 'intake', label: 'Intake', eyebrow: 'Signals' },
  { key: 'patterns', label: 'Patterns', eyebrow: 'Learning' },
  { key: 'playbook', label: 'Playbook', eyebrow: 'Guidance' },
]

const sectionContent: Record<SectionKey, SectionContent> = {
  home: {
    title: 'Wayfinder Home',
    summary:
      'A strategic control surface for what needs attention, what actions are recommended, and where operational friction is building.',
    stat: String(wayfinderDataSummary.initiativeCount),
    statLabel: 'active mock initiatives',
    points: [
      'Surface cross-functional signals without treating them as generic tasks.',
      'Keep solution mapping and recommendation at the center of the workflow.',
      'Prepare a clean foundation for later initiative intelligence passes.',
    ],
  },
  initiatives: {
    title: 'Initiatives',
    summary:
      'A typed local dataset now anchors structured initiatives, mapped solution options, and recommendation status.',
    stat: String(wayfinderDataSummary.initiativeCount),
    statLabel: 'sample records',
    points: [
      'Each initiative includes signals, target state, future scope, and pattern learning.',
      'Solution paths use qualitative fit labels instead of numeric scoring.',
      'Designed as a dashboard surface rather than a generic project list.',
    ],
  },
  intake: {
    title: 'Intake',
    summary:
      'A future signal capture space for operational inputs, constraints, risks, and decision prompts.',
    stat: String(wayfinderDataSummary.rawSignalCount),
    statLabel: 'raw signals',
    points: [
      'Collect operational signals before they become formal initiatives.',
      'Frame incoming context around friction, opportunity, and urgency.',
      'Hold space for later candidate requirement extraction.',
    ],
  },
  patterns: {
    title: 'Patterns',
    summary:
      'A future intelligence layer for recurring operational patterns and reusable solution cues.',
    stat: String(wayfinderDataSummary.solutionPathCount),
    statLabel: 'solution paths',
    points: [
      'Spot repeated constraints across teams and workflows.',
      'Connect similar signals to known recommendation patterns.',
      'Support sharper solution paths over time.',
    ],
  },
  playbook: {
    title: 'Playbook',
    summary:
      'A future guide surface for operating principles, recommendation criteria, and next-action templates.',
    stat: String(wayfinderDataSummary.decisionLensCount),
    statLabel: 'decision lenses',
    points: [
      'Keep solution mapping consistent across strategy work.',
      'Make recommendation logic visible and reusable.',
      'Capture practical next actions without adding workflow complexity.',
    ],
  },
}

const countBy = <T extends string>(
  values: T[],
  preferredOrder?: readonly T[],
): CountItem<T>[] => {
  const countMap = values.reduce<Map<T, number>>(
    (map, value) => map.set(value, (map.get(value) ?? 0) + 1),
    new Map<T, number>(),
  )

  const orderedLabels = preferredOrder
    ? preferredOrder.filter((label) => countMap.has(label))
    : Array.from(countMap.keys())

  return orderedLabels.map((label) => ({
    label,
    count: countMap.get(label) ?? 0,
  }))
}

const topPatternItems = (items: string[], limit = 4): string[] =>
  countBy(items)
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
    .slice(0, limit)
    .map((item) => item.label)

const shorten = (text: string, maxLength = 132): string =>
  text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text

const priorityInitiatives = initiatives.slice(0, 3)

const departmentBreakdown = countBy(
  initiatives.map((initiative) => initiative.department),
).sort((left, right) => left.label.localeCompare(right.label))

const solutionPathBreakdown = countBy(
  initiatives.map((initiative) => initiative.primarySolutionPath),
  solutionPathOptions,
)

const nextActionBreakdown = countBy(
  initiatives.map((initiative) => initiative.recommendedNextAction),
  recommendedNextActions,
)

const emergingPatterns = {
  repeatedPainPatterns: topPatternItems(
    initiatives.flatMap((initiative) => initiative.patternLearning.repeatedPainPatterns),
  ),
  commonBlockers: topPatternItems(
    initiatives.flatMap((initiative) => initiative.patternLearning.commonBlockers),
  ),
  dataReadinessIssues: topPatternItems(
    initiatives.flatMap((initiative) => initiative.patternLearning.dataReadinessIssues),
  ),
}

const recentSignals: RecentSignal[] = initiatives
  .flatMap((initiative) =>
    initiative.rawSignals.map((signal) => ({
      id: signal.id,
      summary: signal.summary,
      initiativeTitle: initiative.title,
      department: initiative.department,
    })),
  )
  .slice(0, 6)

function PriorityRecommendations() {
  return (
    <section className="home-section priority-section" aria-labelledby="priority-title">
      <div className="section-heading">
        <p className="eyebrow">Priority recommendations</p>
        <h3 id="priority-title">Needs attention now</h3>
      </div>

      <div className="priority-list">
        {priorityInitiatives.map((initiative: Initiative) => (
          <article className="priority-card" key={initiative.id}>
            <div className="priority-card-header">
              <span>{initiative.department}</span>
              <strong>{initiative.recommendedNextAction}</strong>
            </div>
            <h4>{initiative.title}</h4>
            <p>{shorten(initiative.problemSummary)}</p>
            <div className="path-pill">{initiative.primarySolutionPath}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CountList<T extends string>({
  items,
  label,
}: {
  items: CountItem<T>[]
  label: string
}) {
  return (
    <div className="count-list" aria-label={label}>
      {items.map((item) => (
        <div className="count-row" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.count}</strong>
        </div>
      ))}
    </div>
  )
}

function InitiativeOverview() {
  return (
    <section className="home-section overview-section" aria-labelledby="overview-title">
      <div className="section-heading">
        <p className="eyebrow">Initiative overview</p>
        <h3 id="overview-title">Portfolio shape</h3>
      </div>

      <div className="overview-metric">
        <span>{wayfinderDataSummary.initiativeCount}</span>
        <p>Total initiatives</p>
      </div>

      <div className="overview-columns">
        <div>
          <h4>By department</h4>
          <CountList items={departmentBreakdown} label="Initiatives by department" />
        </div>
        <div>
          <h4>By primary solution path</h4>
          <CountList items={solutionPathBreakdown} label="Initiatives by primary solution path" />
        </div>
      </div>
    </section>
  )
}

function EmergingPatterns() {
  const patternGroups = [
    { title: 'Repeated pain patterns', items: emergingPatterns.repeatedPainPatterns },
    { title: 'Common blockers', items: emergingPatterns.commonBlockers },
    { title: 'Data readiness issues', items: emergingPatterns.dataReadinessIssues },
  ]

  return (
    <section className="home-section patterns-section" aria-labelledby="patterns-title">
      <div className="section-heading">
        <p className="eyebrow">Emerging patterns</p>
        <h3 id="patterns-title">Friction themes</h3>
      </div>

      <div className="pattern-grid">
        {patternGroups.map((group) => (
          <article className="pattern-card" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function RecentSignals() {
  return (
    <section className="home-section signals-section" aria-labelledby="signals-title">
      <div className="section-heading">
        <p className="eyebrow">Recent signals</p>
        <h3 id="signals-title">Operational inputs</h3>
      </div>

      <div className="signal-list">
        {recentSignals.map((signal) => (
          <article className="signal-row" key={signal.id}>
            <p>{signal.summary}</p>
            <span>
              {signal.initiativeTitle} / {signal.department}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function NextActionsSummary() {
  return (
    <section className="home-section next-actions-section" aria-labelledby="actions-title">
      <div className="section-heading">
        <p className="eyebrow">Recommended next actions</p>
        <h3 id="actions-title">Action mix</h3>
      </div>

      <CountList items={nextActionBreakdown} label="Initiatives by recommended next action" />
    </section>
  )
}

function WayfinderHome() {
  return (
    <section className="home-dashboard" aria-label="Wayfinder Home dashboard">
      <PriorityRecommendations />
      <InitiativeOverview />
      <EmergingPatterns />
      <RecentSignals />
      <NextActionsSummary />
    </section>
  )
}

function InitiativesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] =
    useState<FilterValue<Department>>('All')
  const [nextActionFilter, setNextActionFilter] =
    useState<FilterValue<RecommendedNextAction>>('All')
  const [solutionPathFilter, setSolutionPathFilter] =
    useState<FilterValue<SolutionPathOption>>('All')
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(
    null,
  )

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredInitiatives = initiatives.filter((initiative) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      initiative.title.toLowerCase().includes(normalizedSearch) ||
      initiative.problemSummary.toLowerCase().includes(normalizedSearch)

    const matchesDepartment =
      departmentFilter === 'All' || initiative.department === departmentFilter
    const matchesNextAction =
      nextActionFilter === 'All' ||
      initiative.recommendedNextAction === nextActionFilter
    const matchesSolutionPath =
      solutionPathFilter === 'All' ||
      initiative.primarySolutionPath === solutionPathFilter

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesNextAction &&
      matchesSolutionPath
    )
  })

  return (
    <section className="initiatives-page" aria-labelledby="initiatives-title">
      <div className="list-page-header">
        <div>
          <p className="eyebrow">Initiatives</p>
          <h3 id="initiatives-title">Initiative intelligence queue</h3>
          <p>
            Search and filter the local mock portfolio by operational context,
            recommended next action, and primary solution path.
          </p>
        </div>
        <div className="list-page-count">
          <span>{filteredInitiatives.length}</span>
          <p>
            Showing of {initiatives.length}
          </p>
        </div>
      </div>

      <div className="initiative-toolbar">
        <label className="search-field">
          <span>Search initiatives</span>
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title or problem summary"
            type="search"
            value={searchTerm}
          />
        </label>

        <div className="filter-grid">
          <label>
            <span>Department</span>
            <select
              onChange={(event) =>
                setDepartmentFilter(event.target.value as FilterValue<Department>)
              }
              value={departmentFilter}
            >
              <option value="All">All departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Recommended next action</span>
            <select
              onChange={(event) =>
                setNextActionFilter(
                  event.target.value as FilterValue<RecommendedNextAction>,
                )
              }
              value={nextActionFilter}
            >
              <option value="All">All next actions</option>
              {recommendedNextActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Primary solution path</span>
            <select
              onChange={(event) =>
                setSolutionPathFilter(
                  event.target.value as FilterValue<SolutionPathOption>,
                )
              }
              value={solutionPathFilter}
            >
              <option value="All">All solution paths</option>
              {solutionPathOptions.map((path) => (
                <option key={path} value={path}>
                  {path}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {selectedInitiative ? (
        <aside className="selection-banner" aria-live="polite">
          <div>
            <span>Selected for Pass 5</span>
            <strong>{selectedInitiative.title}</strong>
          </div>
          <button onClick={() => setSelectedInitiative(null)} type="button">
            Clear selection
          </button>
        </aside>
      ) : null}

      {filteredInitiatives.length > 0 ? (
        <div className="initiative-list" aria-label="Filtered initiatives">
          {filteredInitiatives.map((initiative) => (
            <button
              className={
                selectedInitiative?.id === initiative.id
                  ? 'initiative-row selected'
                  : 'initiative-row'
              }
              key={initiative.id}
              onClick={() => setSelectedInitiative(initiative)}
              type="button"
            >
              <div className="initiative-row-main">
                <div className="initiative-row-heading">
                  <h4>{initiative.title}</h4>
                  <span>{initiative.department}</span>
                </div>
                <p>{shorten(initiative.problemSummary, 168)}</p>
              </div>

              <div className="initiative-row-meta">
                <span>
                  <small>Next action</small>
                  {initiative.recommendedNextAction}
                </span>
                <span>
                  <small>Primary path</small>
                  {initiative.primarySolutionPath}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h4>No initiatives match this view</h4>
          <p>Adjust the search text or filters to broaden the initiative queue.</p>
        </div>
      )}
    </section>
  )
}

function PlaceholderSection({ activeSection }: { activeSection: SectionKey }) {
  const activeContent = sectionContent[activeSection]
  const previewInitiatives = initiatives.slice(0, 3)

  return (
    <section className="content-grid" aria-live="polite">
      <article className="feature-panel">
        <div className="panel-heading">
          <p className="eyebrow">
            {navItems.find((item) => item.key === activeSection)?.eyebrow}
          </p>
          <h3>{activeContent.title}</h3>
        </div>
        <p>{activeContent.summary}</p>

        <div className="solution-strip">
          <span>{wayfinderDataSummary.rawSignalCount} operational signals</span>
          <span>{solutionPathOptions.length} solution paths</span>
          <span>{recommendedNextActions.length} next actions</span>
        </div>
      </article>

      <aside className="metric-panel">
        <span>{activeContent.stat}</span>
        <p>{activeContent.statLabel}</p>
      </aside>

      <article className="detail-panel">
        <h3>Data Foundation</h3>
        <ul>
          {activeContent.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <article className="recommendation-panel">
        <p className="eyebrow">Mock initiative preview</p>
        <h3>Local dataset loaded</h3>
        <p>
          The shell is lightly connected to typed mock data for later portfolio and
          initiative pages.
        </p>
        <div className="initiative-preview-list">
          {previewInitiatives.map((initiative) => (
            <article className="initiative-preview" key={initiative.id}>
              <div>
                <strong>{initiative.title}</strong>
                <span>{initiative.department}</span>
              </div>
              <p>
                {initiative.primarySolutionPath} to {initiative.recommendedNextAction}
              </p>
            </article>
          ))}
        </div>
        <div className="data-chip-row" aria-label="Dataset reference counts">
          <span>{requirementCategories.length} requirement categories</span>
          <span>{decisionLensPresets.length} decision lenses</span>
        </div>
      </article>
    </section>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home')

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            W
          </div>
          <div>
            <p className="brand-kicker">Strategy intelligence</p>
            <h1>Wayfinder</h1>
          </div>
        </div>

        <nav className="primary-nav">
          {navItems.map((item) => (
            <button
              className={item.key === activeSection ? 'nav-item active' : 'nav-item'}
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              type="button"
            >
              <span>{item.label}</span>
              <small>{item.eyebrow}</small>
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="note-dot" aria-hidden="true" />
          <p>Local mock data only. Product screens and integrations come later.</p>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Internal strategy system</p>
            <h2>Turn scattered operational signals into recommended solution paths.</h2>
            <p className="positioning">
              Wayfinder helps product and operations leaders structure initiatives,
              compare solution directions, and identify useful next actions.
            </p>
          </div>
          <div className="header-panel" aria-label="Current focus">
            <span>Core value</span>
            <strong>Solution Mapping and Recommendation</strong>
          </div>
        </header>

        {activeSection === 'home' ? (
          <WayfinderHome />
        ) : activeSection === 'initiatives' ? (
          <InitiativesPage />
        ) : (
          <PlaceholderSection activeSection={activeSection} />
        )}
      </main>
    </div>
  )
}

export default App
