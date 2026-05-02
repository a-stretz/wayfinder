import { useState } from 'react'
import {
  decisionLensPresets,
  initiatives,
  recommendedNextActions,
  requirementCategories,
  solutionPathOptions,
  wayfinderDataSummary,
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
      'A strategic workspace for turning scattered operational signals into solution paths, candidate requirements, and practical next actions.',
    stat: String(wayfinderDataSummary.initiativeCount),
    statLabel: 'mock initiatives',
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

function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home')
  const activeContent = sectionContent[activeSection]
  const previewInitiatives = initiatives.slice(0, 3)

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

        <section className="content-grid" aria-live="polite">
          <article className="feature-panel">
            <div className="panel-heading">
              <p className="eyebrow">{navItems.find((item) => item.key === activeSection)?.eyebrow}</p>
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
              The shell is lightly connected to typed mock data for later portfolio
              and initiative pages.
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
      </main>
    </div>
  )
}

export default App
