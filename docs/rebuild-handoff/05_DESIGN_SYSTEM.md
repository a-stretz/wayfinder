# 05: Design System (as built and intended)

## 1. Brand palette

| Role | Spec name | Hex | Prototype token(s) |
|---|---|---|---|
| Primary accent (dominant) | Primary | `#ee8922` | `--accent` |
| Main dark | Secondary | `#0a1045` | `--navy` (App.css), `--nav` (index.css) |
| Supporting green | Supporting Green | `#73937e` | `--sage`, `--support-green` |
| Supporting red | Supporting Red | `#a12523` | `--red`, `--support-red` |
| Supporting mauve | Supporting Mauve | `#8e6c88` | `--plum`, `--support-plum` |

Derived colours used ad hoc: peach `#ffd8b1` (accent chips, possible-fit chips), warm surface `#f8f4ee` / `#f4f1eb`, ink `#121827` / `#14213d`, muted text `#667085`, hairline `rgba(10,16,69,0.12)`, translucent panels `rgba(255,255,255,0.86)`, shadow `0 22px 55px rgba(10,16,69,0.12)`.

**Problem:** there are two competing token sets. `index.css` defines `--nav`, `--surface`, `--border`, `--text`, and so on; `App.css` redefines `:root` with `--navy`, `--sage`, `--line`, and so on, and overrides the body background. Many values are also hardcoded inline. The rebuild needs one token source, as CSS variables or a Tailwind theme, with semantic names such as `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-fit-strong`, and so on.

## 2. Surfaces and atmosphere

- **Page background:** a soft warm gradient (cream to cool grey) with faint radial glows of accent and sage.
- **Sidebar:** a deep navy vertical gradient with an accent radial glow, white text at 68–78% opacity, and the active item marked by an accent-tinted gradient, an accent border, and an inset 3px accent left bar.
- **Hero / Waypoint emphasis panels:** a navy gradient with accent and sage glows and an accent-tinted border.
- **Cards:** white or translucent white, 14–28px radius, hairline borders, large soft shadows.
- No dark mode. The rebuild should add one, since the tokens make it cheap.

## 3. Typography

- Font stack: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Inter is not actually loaded, so most users get the system font.
- Fluid headings via `clamp()`: H1 roughly `clamp(1.85rem, 3vw, 3.15rem)`; section H2s range from `clamp(1.25rem…1.7rem)` to `clamp(1.55rem…2.5rem)`.
- **Eyebrows:** small (≈0.76rem), uppercase, heavy, tracked. They are used throughout to label sections.
- Weights skew very heavy (15 uses of 900, plus 850/800/750). Consider softening for an "executive-readable, calm" tone.
- Body line-height 1.6.

## 4. Components and visual vocabulary

| Element | Treatment |
|---|---|
| **Chip** | Pill (999px), 28px min height, 0.75rem, weight 900. Variants: `dark` (navy/white), `accent` (peach/navy), `muted` (grey-green) |
| **Fit chip** | Strong = navy; Good = sage; Possible = peach; Later and Poor = the same grey. *The spec asks for green/yellow/red, with an accent highlight on Strong, and requires Poor to be distinguishable.* |
| **Recommended badge** | Pale orange background, dark orange text, accent border |
| **Primary button** | Accent-driven, rounded |
| **Priority card** | The featured variant is larger, with an accent path callout |
| **Metric tile** | Label plus big number |
| **Count list** | Label and count rows |
| **Detail list** | Bullets with a custom `::before` marker |
| **Disclosure** | Native `<details>` with a styled summary and an "Expand/Review" pill that changes when open |
| **Jump links** | A four-up anchor grid with arrow pseudo-elements |
| **Lens chips** | A grid of toggle-like buttons with active and disabled states |
| **Department chips** | A multi-select chip grid |
| **Mode toggle** | A two-button segmented control |
| **Logo** | An inline SVG compass: ring, cardinal and diagonal lines, and an arrow with a shadow |

## 5. Layout and responsiveness

| Breakpoint | Behaviour |
|---|---|
| > 1180px | 292px sidebar; two- and three-column grids |
| ≤ 1180px | 240px sidebar; most grids collapse to one column; queue controls become two columns |
| ≤ 820px | Sidebar stacks on top with a two-column nav; one column everywhere; main padding 18px |

Main content uses `.page-stack` vertical rhythm, with gaps of roughly 22px between sections.

## 6. Accessibility state

What it does well: semantic `<section>`, `<article>`, `<nav aria-label>`, `<label>`-wrapped inputs, `aria-labelledby` on the hero, `role="img"` with a label on the logo, `:focus-visible` on rows and jump links, native `<details>`.

What is missing:
- Toggle buttons (lens chips, mode toggle, department chips) lack `aria-pressed`.
- The active nav item lacks `aria-current`.
- Headings are nested inside `<button>` (queue rows).
- Disabled lens chips give no reason.
- There is no skip link, no route-change focus management, and no live region for the "signal attached" confirmation.
- Colour contrast of white-at-68% on navy and grey fit chips needs to be checked against WCAG AA.
- Fit is communicated partly by colour. The label text helps, but Later and Poor look identical.

## 7. Tone rules (keep)

- Calm, structured, executive-readable, product-ops focused.
- Strong whitespace, clear labels, subtle status colour.
- Avoid: futuristic AI aesthetics, neon, excessive icons, heavy map and compass metaphors, dense dashboards, fake complexity, numeric precision.

## 8. Rebuild recommendations

1. One token file with semantic aliases, plus light and dark themes.
2. A component library: either an accessible headless kit (Radix or React Aria) styled to these tokens, or shadcn/ui themed accordingly.
3. Fix fit-label semantics: five visually distinct states, colour plus icon or shape, each accessible on its own.
4. Load Inter, or choose a deliberate alternative, and moderate the weights.
5. Replace the Vite favicon with the compass mark. Set the `<title>` to "Wayfinder".
6. Document components in Storybook or Ladle, with visual regression tests.
