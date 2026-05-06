# Wayfinder Test Plan

## Purpose

This test plan covers manual checks for the Wayfinder prototype. The goal is to confirm the main prototype flows work as expected without backend services, persistence, or real AI.

## Navigation

Test:
- Open each primary nav item: Home, Initiative Queue, Add Signal, Pattern Intelligence, Recommendation Playbook.
- Move between pages after selecting an initiative.
- Return to Initiative Queue from the detail page.

Expected behavior:
- Each nav item renders the correct page.
- The active nav state updates.
- Leaving Initiative Queue clears the selected initiative.

## Initiative Selection

Test:
- Open Initiative Queue.
- Search by a known initiative title.
- Filter by department.
- Filter by recommended next action.
- Filter by primary solution path.
- Select an initiative row.

Expected behavior:
- Search filters by title and problem summary.
- Filters combine with search.
- Empty state appears when no item matches.
- Selecting an initiative opens the full detail page.

## Detail Page Rendering

Test:
- Open each mock initiative from the list.
- Confirm all detail sections render.
- Check that Recommended Path appears immediately after the compact initiative header.
- Confirm solution paths show qualitative fit labels only.

Expected behavior:
- Header, Recommended Path, rationale, decision priority, solution options, requirements, future scope, and pattern learning all render.
- No numeric scoring appears.

## Decision Priority Behavior

Test:
- Open an initiative detail page.
- Go to Decision Priority.
- Confirm the default message appears before selecting a lens.
- Select enabled lenses.
- Try disabled lenses if present.

Expected behavior:
- Default message says to select a lens.
- Selecting a lens shows the related behavior from the dataset.
- Recommendation changed displays Yes or No.
- If No, the UI states that the recommendation stays the same and only emphasis shifts.
- Disabled lenses cannot be selected.

## Intake Flow

Test:
- Open Intake.
- Enter a title, department, raw signal, optional tags, and notes.
- Select Structure Signal.
- Review the simulated draft.
- Select Add to Initiative Queue.
- Go to Initiative Queue and search for the new item.
- Open the new item detail page.

Expected behavior:
- A simulated structured output appears.
- Suggested action and solution paths come from template logic.
- Added initiatives appear in the Initiative Queue during the current session.
- Added initiatives disappear after refresh.

## Patterns Page

Test:
- Open Patterns.
- Review each pattern section.
- Add a local initiative through Intake.
- Return to Patterns.

Expected behavior:
- Pattern sections show simple frequency counts.
- Locally added initiatives are included while the session is active.

## Playbook Page

Test:
- Open Playbook.
- Review playbook cards.
- Confirm each card includes when to use, first actions, solution paths, and risks.

Expected behavior:
- Playbooks are generated from observed pattern themes.
- If pattern data is sparse, a general discovery-first playbook appears.

## Known Limitations

- No persistence across refreshes.
- Intake structuring is simulated with simple templates.
- No real AI analysis.
- No backend, authentication, database, file parsing, or external integrations.
- No real prioritization model.
- No numeric scoring.
