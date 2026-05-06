# Wayfinder

Wayfinder is an internal strategy and initiative intelligence prototype. It helps product and operations leaders turn scattered operational signals into structured initiatives, solution path recommendations, candidate requirements, and practical next actions.

## What Problem It Solves

Operational improvement work often starts as scattered notes, requests, pain points, workflow issues, dashboard gaps, or early ideas. Wayfinder gives that raw input a clearer path: capture the signal, shape it into an initiative, compare solution paths, and identify the next useful action.

## Core Concepts

- **Signal:** Raw input from notes, files, requests, pain points, workflow issues, dashboards, prototypes, or ideas.
- **Initiative:** The central object being analyzed and shaped.
- **Solution Path:** A possible route for solving the initiative, such as process improvement, reporting, automation, or prototyping.
- **Recommended Path:** The prominent recommendation section inside an initiative workspace.
- **Decision Priority:** A perspective that changes emphasis, questions, or direction without forcing a recommendation change.

## What Is Included

- Home dashboard for priorities, patterns, signals, and action summaries
- Searchable and filterable initiatives list
- Full initiative detail workspace
- Interactive decision lens behavior
- Manual intake simulation for structuring raw signals
- Patterns page for cross-initiative learning
- Playbook page for reusable action guidance
- Local mock dataset and local-only added initiatives

## What Is Not Included

- No backend
- No authentication
- No database
- No persistence across refreshes
- No real AI analysis
- No file parsing or external integrations
- No numeric scoring or prioritization model

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Feature Overview

- **Home dashboard:** Strategic control surface for what needs attention, recommended actions, emerging patterns, and recent signals.
- **Initiative Queue:** Search and filter initiatives by department, recommended next action, and primary solution path.
- **Initiative detail workspace:** Full structured view of context, inputs, scoping, recommendation, solution map, requirements, future scope, and pattern learning.
- **Decision priorities:** Select a priority to see how emphasis, questions, and future direction change.
- **Add Signal:** Manually enter a raw signal and generate a simulated structured initiative draft.
- **Pattern Intelligence:** Aggregate repeated pain patterns, blockers, readiness issues, systems, similar initiatives, and reusable requirements.
- **Recommendation Playbook:** Turn common patterns into repeatable guidance for action.
