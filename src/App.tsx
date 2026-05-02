import { useState, type FormEvent, type ReactNode } from 'react'
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

type InitiativeSelectionProps = {
  initiativeItems: Initiative[]
  selectedInitiative: Initiative | null
  onSelectInitiative: (initiative: Initiative) => void
  onBackToInitiatives: () => void
}

type IntakePageProps = {
  onAddInitiative: (initiative: Initiative) => void
}

type StructuredDraft = {
  title: string
  problemSummary: string
  recommendedNextAction: RecommendedNextAction
  primarySolutionPath: SolutionPathOption
  supportingSolutionPaths: SolutionPathOption[]
}

type PatternPageProps = {
  initiativeItems: Initiative[]
}

type PlaybookCard = {
  title: string
  whenToUse: string
  recommendedFirstActions: RecommendedNextAction[]
  typicalSolutionPaths: SolutionPathOption[]
  commonRisks: string[]
}

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

const requirementHeading = (category: string): string =>
  category
    .replace(' Requirements', '')
    .replace('AI / Automation', 'AI / Automation')

function SimpleList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="empty-inline">No items captured in the current dataset.</p>
  }

  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function RequirementGroup({
  title,
  requirements,
}: {
  title: string
  requirements: Initiative['candidateRequirementsMap'][keyof Initiative['candidateRequirementsMap']]
}) {
  return (
    <article className="requirement-group">
      <h4>{requirementHeading(title)}</h4>
      {requirements.length > 0 ? (
        <div className="requirement-items">
          {requirements.map((requirement) => (
            <div className="requirement-item" key={requirement.id}>
              <strong>{requirement.requirement}</strong>
              <p>{requirement.rationale}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-inline">No requirements captured for this category.</p>
      )}
    </article>
  )
}

function DetailSection({
  children,
  eyebrow,
  title,
  className = '',
}: {
  children: ReactNode
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <section className={`initiative-detail-section ${className}`} aria-labelledby={`${title.replaceAll(/\s+/g, '-').toLowerCase()}-title`}>
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h3 id={`${title.replaceAll(/\s+/g, '-').toLowerCase()}-title`}>{title}</h3>
      </div>
      {children}
    </section>
  )
}

function DecisionLensSection({ initiative }: { initiative: Initiative }) {
  const [selectedLens, setSelectedLens] = useState<string | null>(null)
  const selectedBehavior =
    initiative.decisionLensBehaviors.find(
      (behavior) => behavior.lens === selectedLens,
    ) ?? null

  return (
    <DetailSection eyebrow="Decision lens" title="Lens behavior">
      <div className="lens-chip-row" role="list" aria-label="Decision lenses">
        {decisionLensPresets.map((lens) => {
          const hasBehavior = initiative.decisionLensBehaviors.some(
            (behavior) => behavior.lens === lens,
          )

          return (
            <button
              className={selectedLens === lens ? 'lens-chip selected' : 'lens-chip'}
              disabled={!hasBehavior}
              key={lens}
              onClick={() => setSelectedLens(lens)}
              type="button"
            >
              {lens}
            </button>
          )
        })}
      </div>

      {selectedBehavior ? (
        <article className="lens-behavior-card selected-behavior">
          <div className="lens-behavior-header">
            <div>
              <span>Lens applied</span>
              <h4>{selectedBehavior.lens}</h4>
            </div>
            <strong>
              Recommendation changed:{' '}
              {selectedBehavior.recommendationChanged ? 'Yes' : 'No'}
            </strong>
          </div>

          {!selectedBehavior.recommendationChanged ? (
            <p className="lens-stability-note">
              The recommendation stays the same; this lens shifts emphasis within
              the current direction.
            </p>
          ) : null}

          <div className="selected-next-action">
            <span>Current recommended next action</span>
            <strong>{selectedBehavior.currentRecommendedNextAction}</strong>
          </div>

          <div className="lens-detail-grid">
            <div>
              <strong>Emphasis changes</strong>
              <SimpleList items={selectedBehavior.emphasisChanges} />
            </div>
            <div>
              <strong>Paths affected</strong>
              <SimpleList items={[...selectedBehavior.pathsAffected]} />
            </div>
            <div>
              <strong>New questions to ask</strong>
              <SimpleList items={selectedBehavior.newQuestionsToAsk} />
            </div>
            <div>
              <strong>Future direction</strong>
              <p>{selectedBehavior.futureDirection}</p>
            </div>
          </div>
        </article>
      ) : (
        <div className="lens-empty-state">
          <p>Select a decision lens to see how it changes emphasis.</p>
        </div>
      )}
    </DetailSection>
  )
}

function InitiativeDetailPage({
  initiative,
  onBack,
}: {
  initiative: Initiative
  onBack: () => void
}) {
  const primaryRationale =
    initiative.solutionPaths.find((path) => path.path === initiative.primarySolutionPath)
      ?.rationale ?? initiative.scopingAnalysis
  const notRecommendedYet = initiative.solutionPaths.filter(
    (path) => path.fit === 'Later' || path.fit === 'Poor',
  )
  const requirementPathEntries = Object.entries(initiative.requirementsBySolutionPath)

  return (
    <section className="initiative-detail-page" aria-labelledby="detail-title">
      <button className="back-button" onClick={onBack} type="button">
        Back to Initiatives
      </button>

      <header className="initiative-detail-header">
        <div>
          <p className="eyebrow">Initiative header</p>
          <h3 id="detail-title">{initiative.title}</h3>
          <p>{initiative.problemSummary}</p>
        </div>
        <span>{initiative.department}</span>
      </header>

      <DetailSection eyebrow="Context summary" title="Situation">
        <p className="detail-copy">{initiative.contextSummary}</p>
      </DetailSection>

      <DetailSection eyebrow="Inputs and signals" title="Raw inputs">
        <div className="signal-detail-grid">
          {initiative.rawSignals.map((signal) => (
            <article className="signal-detail-card" key={signal.id}>
              <div>
                <span>{signal.source}</span>
                <small>{signal.id}</small>
              </div>
              <p>{signal.summary}</p>
              <strong>{signal.observedImpact}</strong>
            </article>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Scoping analysis" title="Shape of the work">
        <p className="detail-copy">{initiative.scopingAnalysis}</p>
      </DetailSection>

      <DetailSection eyebrow="Waypoint" title="Recommendation" className="waypoint-section">
        <div className="waypoint-grid">
          <div>
            <span>Recommended next action</span>
            <strong>{initiative.recommendedNextAction}</strong>
          </div>
          <div>
            <span>Primary solution path</span>
            <strong>{initiative.primarySolutionPath}</strong>
          </div>
        </div>
        <p>{primaryRationale}</p>
      </DetailSection>

      <DetailSection eyebrow="Solution map" title="Path options">
        <div className="solution-map-grid">
          {initiative.solutionPaths.map((path) => (
            <article className="solution-map-card" key={path.path}>
              <div>
                <h4>{path.path}</h4>
                <span>{path.fit}</span>
              </div>
              <p>{path.rationale}</p>
            </article>
          ))}
        </div>
      </DetailSection>

      <DecisionLensSection initiative={initiative} />

      <DetailSection eyebrow="Candidate requirements map" title="Requirement categories">
        <div className="requirements-grid">
          {requirementCategories.map((category) => (
            <RequirementGroup
              key={category}
              requirements={initiative.candidateRequirementsMap[category]}
              title={category}
            />
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Requirements by solution path" title="Path-specific requirements">
        <div className="path-requirements-list">
          {requirementPathEntries.map(([path, requirements]) => (
            <article className="path-requirements-card" key={path}>
              <h4>{path}</h4>
              <div className="requirements-grid">
                {requirementCategories.map((category) => (
                  <RequirementGroup
                    key={category}
                    requirements={requirements[category]}
                    title={category}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Target state and future scope" title="Future direction">
        <div className="target-state-card">
          <span>Target State</span>
          <strong>{initiative.targetState}</strong>
        </div>
        <div className="future-scope-grid">
          <article>
            <h4>Later Capabilities</h4>
            <SimpleList items={initiative.futureScope.laterCapabilities} />
          </article>
          <article>
            <h4>Deferred Requirements</h4>
            <SimpleList items={initiative.futureScope.deferredRequirements} />
          </article>
          <article>
            <h4>Dependencies</h4>
            <SimpleList items={initiative.futureScope.dependencies} />
          </article>
          <article>
            <h4>Not Recommended Yet</h4>
            <SimpleList
              items={notRecommendedYet.map(
                (path) => `${path.path}: ${path.rationale}`,
              )}
            />
          </article>
          <article>
            <h4>Trigger to Revisit</h4>
            <SimpleList items={initiative.futureScope.revisitTriggers} />
          </article>
        </div>
      </DetailSection>

      <DetailSection eyebrow="Pattern learning" title="Reusable learning">
        <div className="pattern-learning-grid">
          <article>
            <h4>Repeated pain patterns</h4>
            <SimpleList items={initiative.patternLearning.repeatedPainPatterns} />
          </article>
          <article>
            <h4>Common blockers</h4>
            <SimpleList items={initiative.patternLearning.commonBlockers} />
          </article>
          <article>
            <h4>Similar initiatives</h4>
            <SimpleList items={initiative.patternLearning.similarInitiatives} />
          </article>
          <article>
            <h4>Recurring systems</h4>
            <SimpleList items={initiative.patternLearning.recurringSystems} />
          </article>
          <article>
            <h4>Reusable requirement patterns</h4>
            <SimpleList items={initiative.patternLearning.reusableRequirementPatterns} />
          </article>
          <article>
            <h4>Solution paths chosen</h4>
            <SimpleList items={[...initiative.patternLearning.solutionPathsChosen]} />
          </article>
          <article>
            <h4>Successful approaches</h4>
            <SimpleList items={initiative.patternLearning.successfulSolutionApproaches} />
          </article>
          <article>
            <h4>Failed/deferred approaches</h4>
            <SimpleList items={initiative.patternLearning.failedOrDeferredApproaches} />
          </article>
          <article>
            <h4>Discovery gaps</h4>
            <SimpleList items={initiative.patternLearning.commonDiscoveryGaps} />
          </article>
          <article>
            <h4>Data readiness issues</h4>
            <SimpleList items={initiative.patternLearning.dataReadinessIssues} />
          </article>
          <article>
            <h4>Ownership problems</h4>
            <SimpleList items={initiative.patternLearning.stakeholderOwnershipProblems} />
          </article>
        </div>
      </DetailSection>
    </section>
  )
}

function InitiativesPage({
  initiativeItems,
  onBackToInitiatives,
  onSelectInitiative,
  selectedInitiative,
}: InitiativeSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] =
    useState<FilterValue<Department>>('All')
  const [nextActionFilter, setNextActionFilter] =
    useState<FilterValue<RecommendedNextAction>>('All')
  const [solutionPathFilter, setSolutionPathFilter] =
    useState<FilterValue<SolutionPathOption>>('All')

  if (selectedInitiative) {
    return (
      <InitiativeDetailPage
        initiative={selectedInitiative}
        onBack={onBackToInitiatives}
      />
    )
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredInitiatives = initiativeItems.filter((initiative) => {
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
            Showing of {initiativeItems.length}
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

      {filteredInitiatives.length > 0 ? (
        <div className="initiative-list" aria-label="Filtered initiatives">
          {filteredInitiatives.map((initiative) => (
            <button
              className="initiative-row"
              key={initiative.id}
              onClick={() => onSelectInitiative(initiative)}
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

const createEmptyRequirementMap = (): Initiative['candidateRequirementsMap'] =>
  ({
    'Business Requirements': [],
    'User Requirements': [],
    'Workflow Requirements': [],
    'Data Requirements': [],
    'System Requirements': [],
    'AI / Automation Requirements': [],
    'Governance Requirements': [],
    'Success Metrics': [],
  })

const createLocalRequirementMap = (
  id: string,
  draft: StructuredDraft,
): Initiative['candidateRequirementsMap'] => {
  const map = createEmptyRequirementMap()

  map['Business Requirements'] = [
    {
      id: `${id}-business-1`,
      category: 'Business Requirements',
      requirement: `Clarify the operating outcome for ${draft.title}.`,
      rationale: 'The intake signal needs a crisp business reason before deeper shaping.',
    },
  ]
  map['Workflow Requirements'] = [
    {
      id: `${id}-workflow-1`,
      category: 'Workflow Requirements',
      requirement: 'Identify the current handoff, owner, and decision points.',
      rationale: 'This keeps the simulated initiative grounded in practical workflow discovery.',
    },
  ]
  map['Data Requirements'] = [
    {
      id: `${id}-data-1`,
      category: 'Data Requirements',
      requirement: 'Confirm what source information is reliable enough to support action.',
      rationale: 'Data readiness should be checked before building reporting or automation.',
    },
  ]

  return map
}

const inferDraftFromSignal = ({
  department,
  rawInput,
  title,
}: {
  department: Department
  rawInput: string
  title: string
}): StructuredDraft => {
  const normalizedInput = `${title} ${rawInput}`.toLowerCase()
  const problemSummary =
    rawInput.trim().length > 0
      ? shorten(rawInput.trim(), 220)
      : 'A new operational signal needs discovery before it can be shaped into an initiative.'

  if (
    normalizedInput.includes('dashboard') ||
    normalizedInput.includes('report') ||
    normalizedInput.includes('visibility') ||
    normalizedInput.includes('status')
  ) {
    return {
      title,
      problemSummary,
      recommendedNextAction: 'Create Reporting View',
      primarySolutionPath: 'Reporting / Visibility',
      supportingSolutionPaths: ['Process Improvement', 'Lightweight Prototype'],
    }
  }

  if (
    normalizedInput.includes('automation') ||
    normalizedInput.includes('manual') ||
    normalizedInput.includes('handoff') ||
    normalizedInput.includes('workflow')
  ) {
    return {
      title,
      problemSummary,
      recommendedNextAction: 'Map Workflow',
      primarySolutionPath: 'Process Improvement',
      supportingSolutionPaths: ['Workflow Automation', 'Reporting / Visibility'],
    }
  }

  if (
    normalizedInput.includes('ai') ||
    normalizedInput.includes('summarize') ||
    normalizedInput.includes('assistant')
  ) {
    return {
      title,
      problemSummary,
      recommendedNextAction: 'Assess AI Fit',
      primarySolutionPath: 'AI-Assisted Workflow',
      supportingSolutionPaths: ['Knowledge / Memory Layer', 'Lightweight Prototype'],
    }
  }

  if (
    normalizedInput.includes('data') ||
    normalizedInput.includes('exception') ||
    normalizedInput.includes('payment') ||
    department === 'Accounting'
  ) {
    return {
      title,
      problemSummary,
      recommendedNextAction: 'Validate Data',
      primarySolutionPath: 'Reporting / Visibility',
      supportingSolutionPaths: ['Process Improvement', 'Workflow Automation'],
    }
  }

  if (
    normalizedInput.includes('prototype') ||
    normalizedInput.includes('tool') ||
    normalizedInput.includes('intake')
  ) {
    return {
      title,
      problemSummary,
      recommendedNextAction: 'Build Prototype',
      primarySolutionPath: 'Lightweight Prototype',
      supportingSolutionPaths: ['Knowledge / Memory Layer', 'Process Improvement'],
    }
  }

  return {
    title,
    problemSummary,
    recommendedNextAction: 'Run Discovery',
    primarySolutionPath: 'Knowledge / Memory Layer',
    supportingSolutionPaths: ['Process Improvement', 'Lightweight Prototype'],
  }
}

const createInitiativeFromDraft = ({
  department,
  draft,
  notes,
  rawInput,
  tags,
}: {
  department: Department
  draft: StructuredDraft
  notes: string
  rawInput: string
  tags: string
}): Initiative => {
  const id = `local-${Date.now()}`
  const candidateRequirementsMap = createLocalRequirementMap(id, draft)

  return {
    id,
    title: draft.title,
    department,
    problemSummary: draft.problemSummary,
    contextSummary:
      notes.trim().length > 0
        ? notes.trim()
        : 'This locally added initiative was created from a manual intake signal and needs further discovery.',
    rawSignals: [
      {
        id: `${id}-signal-1`,
        source: 'Stakeholder Request',
        summary: rawInput.trim() || draft.problemSummary,
        observedImpact:
          tags.trim().length > 0
            ? `Tagged during intake: ${tags.trim()}`
            : 'Impact should be clarified during discovery.',
      },
    ],
    scopingAnalysis:
      'This is a simulated structuring output. Confirm owners, workflow boundaries, source information, and urgency before treating it as a fully shaped initiative.',
    recommendedNextAction: draft.recommendedNextAction,
    primarySolutionPath: draft.primarySolutionPath,
    solutionPaths: [
      {
        path: draft.primarySolutionPath,
        fit: 'Possible',
        rationale:
          'Suggested by simple keyword-based intake logic and should be validated by discovery.',
      },
      ...draft.supportingSolutionPaths.map((path) => ({
        path,
        fit: 'Later' as const,
        rationale:
          'Supporting path captured for consideration after the first discovery pass.',
      })),
    ],
    candidateRequirementsMap,
    requirementsBySolutionPath: {
      [draft.primarySolutionPath]: candidateRequirementsMap,
    },
    targetState:
      'The signal is clarified into a structured initiative with an accountable owner, defined workflow context, and practical next action.',
    futureScope: {
      laterCapabilities: ['Refine requirements after discovery', 'Compare alternate solution paths'],
      deferredRequirements: ['Durable workflow design', 'Integration planning', 'Automation rules'],
      dependencies: ['Stakeholder owner', 'Source information', 'Workflow boundary'],
      revisitTriggers: ['Signal repeats', 'Manual work increases', 'Leadership asks for visibility'],
    },
    patternLearning: {
      repeatedPainPatterns: ['Manual intake signal needs structured follow-up'],
      commonBlockers: ['Unclear owner', 'Incomplete source context'],
      similarInitiatives: [],
      recurringSystems: [],
      reusableRequirementPatterns: ['Owner, workflow, source information, next action'],
      solutionPathsChosen: [draft.primarySolutionPath],
      successfulSolutionApproaches: ['Start with discovery before committing to a build path'],
      failedOrDeferredApproaches: ['Treating raw input as a complete requirement'],
      commonDiscoveryGaps: ['Current workflow boundary', 'Decision owner', 'Source reliability'],
      dataReadinessIssues: ['Source information not yet validated'],
      stakeholderOwnershipProblems: ['Owner should be confirmed before execution'],
    },
    decisionLensBehaviors: [
      {
        lens: 'Fastest Useful Output',
        recommendationChanged: false,
        currentRecommendedNextAction: draft.recommendedNextAction,
        emphasisChanges: ['Focus on the smallest useful clarification step.'],
        pathsAffected: [draft.primarySolutionPath],
        newQuestionsToAsk: ['What would make this signal useful enough to act on next?'],
        futureDirection: 'Use the first pass to decide whether this becomes a larger initiative.',
      },
      {
        lens: 'Safer First Step',
        recommendationChanged: false,
        currentRecommendedNextAction: draft.recommendedNextAction,
        emphasisChanges: ['Emphasize validation before solution commitment.'],
        pathsAffected: [draft.primarySolutionPath],
        newQuestionsToAsk: ['What assumptions could make the suggested path risky?'],
        futureDirection: 'Defer build decisions until the problem and owner are clearer.',
      },
      {
        lens: 'Operational Stability',
        recommendationChanged: false,
        currentRecommendedNextAction: draft.recommendedNextAction,
        emphasisChanges: ['Prioritize ownership, workflow fit, and repeatability.'],
        pathsAffected: [draft.primarySolutionPath],
        newQuestionsToAsk: ['Who owns the workflow and what happens if nothing changes?'],
        futureDirection: 'Convert the signal into an operating rhythm only after discovery.',
      },
    ],
  }
}

function IntakePage({ onAddInitiative }: IntakePageProps) {
  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState<Department>('Operations')
  const [rawInput, setRawInput] = useState('')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [draft, setDraft] = useState<StructuredDraft | null>(null)
  const [addedTitle, setAddedTitle] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fallbackTitle = 'Untitled Intake Signal'
    const nextDraft = inferDraftFromSignal({
      department,
      rawInput,
      title: title.trim() || fallbackTitle,
    })

    setDraft(nextDraft)
    setAddedTitle(null)
  }

  const handleAddToInitiatives = () => {
    if (!draft) {
      return
    }

    const initiative = createInitiativeFromDraft({
      department,
      draft,
      notes,
      rawInput,
      tags,
    })

    onAddInitiative(initiative)
    setAddedTitle(initiative.title)
  }

  return (
    <section className="intake-page" aria-labelledby="intake-title">
      <div className="list-page-header">
        <div>
          <p className="eyebrow">Intake</p>
          <h3 id="intake-title">Structure a raw signal</h3>
          <p>
            Capture messy notes, ideas, or operational pain and shape them into a
            draft initiative direction.
          </p>
        </div>
        <div className="list-page-count">
          <span>{departments.length}</span>
          <p>Departments available</p>
        </div>
      </div>

      <div className="intake-workspace">
        <form className="intake-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <p className="eyebrow">Raw input</p>
            <h3>Signal capture</h3>
          </div>

          <label>
            <span>Title</span>
            <input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Short title for the signal"
              type="text"
              value={title}
            />
          </label>

          <label>
            <span>Department</span>
            <select
              onChange={(event) => setDepartment(event.target.value as Department)}
              value={department}
            >
              {departments.map((departmentOption) => (
                <option key={departmentOption} value={departmentOption}>
                  {departmentOption}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Raw Input / Signal</span>
            <textarea
              onChange={(event) => setRawInput(event.target.value)}
              placeholder="Paste notes, describe the workflow issue, or capture the rough idea."
              rows={8}
              value={rawInput}
            />
          </label>

          <label>
            <span>Optional tags</span>
            <input
              onChange={(event) => setTags(event.target.value)}
              placeholder="visibility, workflow, data, automation"
              type="text"
              value={tags}
            />
          </label>

          <label>
            <span>Optional notes</span>
            <textarea
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Any context, constraints, or open questions."
              rows={4}
              value={notes}
            />
          </label>

          <button type="submit">Structure Signal</button>
        </form>

        <section className="intake-output" aria-live="polite">
          <div className="section-heading">
            <p className="eyebrow">Simulated structuring</p>
            <h3>Draft output</h3>
          </div>
          <p className="simulation-note">
            This is a simulated structuring step. In a full system, signals would
            be analyzed and shaped into initiatives.
          </p>

          {draft ? (
            <div className="draft-output-card">
              <div>
                <span>Draft Initiative Title</span>
                <strong>{draft.title}</strong>
              </div>
              <div>
                <span>Problem Summary</span>
                <p>{draft.problemSummary}</p>
              </div>
              <div className="draft-output-grid">
                <article>
                  <span>Suggested Recommended Next Action</span>
                  <strong>{draft.recommendedNextAction}</strong>
                </article>
                <article>
                  <span>Suggested Primary Solution Path</span>
                  <strong>{draft.primarySolutionPath}</strong>
                </article>
              </div>
              <div>
                <span>Example Supporting Solution Paths</span>
                <div className="data-chip-row">
                  {draft.supportingSolutionPaths.map((path) => (
                    <span key={path}>{path}</span>
                  ))}
                </div>
              </div>
              <button onClick={handleAddToInitiatives} type="button">
                Add to Initiatives
              </button>
              {addedTitle ? (
                <p className="intake-confirmation">
                  Added to local initiatives: {addedTitle}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="lens-empty-state">
              <p>Submit a signal to generate a simulated structured output.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

const countedPatternItems = (items: string[], limit = 6): CountItem[] =>
  countBy(items)
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
    .slice(0, limit)

const collectPatternLearning = (
  initiativeItems: Initiative[],
  selector: (initiative: Initiative) => string[],
): CountItem[] =>
  countedPatternItems(initiativeItems.flatMap((initiative) => selector(initiative)))

function PatternCountList({ items }: { items: CountItem[] }) {
  if (items.length === 0) {
    return <p className="empty-inline">No patterns captured yet.</p>
  }

  return (
    <div className="pattern-count-list">
      {items.map((item) => (
        <div className="pattern-count-row" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.count}</strong>
        </div>
      ))}
    </div>
  )
}

function PatternsPage({ initiativeItems }: PatternPageProps) {
  const patternGroups = [
    {
      title: 'Repeated Pain Patterns',
      items: collectPatternLearning(
        initiativeItems,
        (initiative) => initiative.patternLearning.repeatedPainPatterns,
      ),
    },
    {
      title: 'Common Blockers',
      items: collectPatternLearning(
        initiativeItems,
        (initiative) => initiative.patternLearning.commonBlockers,
      ),
    },
    {
      title: 'Data Readiness Issues',
      items: collectPatternLearning(
        initiativeItems,
        (initiative) => initiative.patternLearning.dataReadinessIssues,
      ),
    },
    {
      title: 'Recurring Systems',
      items: collectPatternLearning(
        initiativeItems,
        (initiative) => initiative.patternLearning.recurringSystems,
      ),
    },
    {
      title: 'Similar Initiatives',
      items: collectPatternLearning(
        initiativeItems,
        (initiative) => initiative.patternLearning.similarInitiatives,
      ),
    },
    {
      title: 'Reusable Requirement Patterns',
      items: collectPatternLearning(
        initiativeItems,
        (initiative) => initiative.patternLearning.reusableRequirementPatterns,
      ),
    },
  ]

  return (
    <section className="patterns-page" aria-labelledby="patterns-page-title">
      <div className="list-page-header">
        <div>
          <p className="eyebrow">Patterns</p>
          <h3 id="patterns-page-title">Cross-initiative intelligence</h3>
          <p>
            Patterns show where problems repeat across the organization. This
            helps identify where standard solutions or playbooks should exist.
          </p>
        </div>
        <div className="list-page-count">
          <span>{initiativeItems.length}</span>
          <p>Initiatives analyzed</p>
        </div>
      </div>

      <div className="patterns-page-grid">
        {patternGroups.map((group) => (
          <article className="patterns-page-card" key={group.title}>
            <h4>{group.title}</h4>
            <PatternCountList items={group.items} />
          </article>
        ))}
      </div>
    </section>
  )
}

const includesAnyPattern = (initiativeItems: Initiative[], words: string[]): boolean =>
  initiativeItems
    .flatMap((initiative) => [
      ...initiative.patternLearning.repeatedPainPatterns,
      ...initiative.patternLearning.commonBlockers,
      ...initiative.patternLearning.dataReadinessIssues,
      ...initiative.patternLearning.reusableRequirementPatterns,
    ])
    .some((item) => words.some((word) => item.toLowerCase().includes(word)))

const buildPlaybookCards = (initiativeItems: Initiative[]): PlaybookCard[] => {
  const cards: PlaybookCard[] = []

  if (includesAnyPattern(initiativeItems, ['visibility', 'status', 'report'])) {
    cards.push({
      title: 'Workflow Visibility Gaps',
      whenToUse:
        'Use when teams cannot see current status, blockers, owners, or upcoming operational obligations.',
      recommendedFirstActions: ['Define Requirements', 'Create Reporting View'],
      typicalSolutionPaths: ['Reporting / Visibility', 'Process Improvement'],
      commonRisks: [
        'Building a view before agreeing on required fields',
        'Treating unclear ownership as a reporting-only issue',
      ],
    })
  }

  if (includesAnyPattern(initiativeItems, ['handoff', 'transition', 'owner'])) {
    cards.push({
      title: 'Handoff and Ownership Breakdowns',
      whenToUse:
        'Use when work crosses teams and accountability, acceptance criteria, or backup ownership is unclear.',
      recommendedFirstActions: ['Map Workflow', 'Run Discovery'],
      typicalSolutionPaths: ['Process Improvement', 'Knowledge / Memory Layer'],
      commonRisks: [
        'Automating unclear handoffs',
        'Skipping the receiving team perspective',
      ],
    })
  }

  if (includesAnyPattern(initiativeItems, ['data', 'source', 'field', 'naming'])) {
    cards.push({
      title: 'Data Readiness First',
      whenToUse:
        'Use when source fields, status definitions, naming, or data ownership are not trusted enough for action.',
      recommendedFirstActions: ['Validate Data', 'Define Requirements'],
      typicalSolutionPaths: ['Reporting / Visibility', 'Workflow Automation'],
      commonRisks: [
        'Designing automation around unreliable inputs',
        'Using inconsistent status language across teams',
      ],
    })
  }

  if (includesAnyPattern(initiativeItems, ['idea', 'intake', 'context'])) {
    cards.push({
      title: 'Structured Idea Intake',
      whenToUse:
        'Use when raw ideas, AI opportunities, or lightweight tool requests are arriving without a consistent review path.',
      recommendedFirstActions: ['Run Discovery', 'Build Prototype'],
      typicalSolutionPaths: ['Knowledge / Memory Layer', 'Lightweight Prototype'],
      commonRisks: [
        'Letting informal ideas become ungoverned pilots',
        'Capturing submissions without a routing owner',
      ],
    })
  }

  return cards.length > 0
    ? cards
    : [
        {
          title: 'Discovery Before Solution Commitment',
          whenToUse:
            'Use when a raw operational signal needs shaping before choosing a solution path.',
          recommendedFirstActions: ['Run Discovery', 'Map Workflow'],
          typicalSolutionPaths: ['Process Improvement', 'Knowledge / Memory Layer'],
          commonRisks: [
            'Treating a signal as a complete requirement',
            'Committing to a build path before ownership is clear',
          ],
        },
      ]
}

function PlaybookPage({ initiativeItems }: PatternPageProps) {
  const playbookCards = buildPlaybookCards(initiativeItems)

  return (
    <section className="playbook-page" aria-labelledby="playbook-page-title">
      <div className="list-page-header">
        <div>
          <p className="eyebrow">Playbook</p>
          <h3 id="playbook-page-title">Reusable action guidance</h3>
          <p>
            Playbooks provide repeatable approaches to common operational
            problems.
          </p>
        </div>
        <div className="list-page-count">
          <span>{playbookCards.length}</span>
          <p>Playbooks available</p>
        </div>
      </div>

      <div className="playbook-grid">
        {playbookCards.map((card) => (
          <article className="playbook-card" key={card.title}>
            <h4>{card.title}</h4>
            <p>{card.whenToUse}</p>
            <div className="playbook-card-section">
              <strong>Recommended first actions</strong>
              <div className="data-chip-row">
                {card.recommendedFirstActions.map((action) => (
                  <span key={action}>{action}</span>
                ))}
              </div>
            </div>
            <div className="playbook-card-section">
              <strong>Typical solution paths</strong>
              <div className="data-chip-row">
                {card.typicalSolutionPaths.map((path) => (
                  <span key={path}>{path}</span>
                ))}
              </div>
            </div>
            <div className="playbook-card-section">
              <strong>Common risks</strong>
              <SimpleList items={card.commonRisks} />
            </div>
          </article>
        ))}
      </div>
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
  const [localInitiatives, setLocalInitiatives] = useState<Initiative[]>([])
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(
    null,
  )
  const initiativeItems = [...initiatives, ...localInitiatives]

  const handleNavChange = (section: SectionKey) => {
    setActiveSection(section)

    if (section !== 'initiatives') {
      setSelectedInitiative(null)
    }
  }

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
              onClick={() => handleNavChange(item.key)}
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
          <InitiativesPage
            initiativeItems={initiativeItems}
            onBackToInitiatives={() => setSelectedInitiative(null)}
            onSelectInitiative={setSelectedInitiative}
            selectedInitiative={selectedInitiative}
          />
        ) : activeSection === 'intake' ? (
          <IntakePage
            onAddInitiative={(initiative) =>
              setLocalInitiatives((currentInitiatives) => [
                ...currentInitiatives,
                initiative,
              ])
            }
          />
        ) : activeSection === 'patterns' ? (
          <PatternsPage initiativeItems={initiativeItems} />
        ) : activeSection === 'playbook' ? (
          <PlaybookPage initiativeItems={initiativeItems} />
        ) : (
          <PlaceholderSection activeSection={activeSection} />
        )}
      </main>
    </div>
  )
}

export default App
