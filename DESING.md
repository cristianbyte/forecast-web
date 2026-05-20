# DESIGN.md

Industrial data panel. Light theme only. Dense, readable, no decoration.

---

## Font

**Geist Mono** — `medium (500)` and `bold (700)` only.

---

## Color Tokens

### CSS Variables

```css
:root {
  --font-base: "Geist Mono", monospace;

  /* Primary — 2 */
  --color-primary: #f97316;
  --color-primary-dim: #ffe8d5;

  --color-accent: #0ea5e9;
  --color-accent-dim: #e0f2fe;

  /* Support — 5 */
  --color-ok: #10b981;
  --color-ok-dim: #d1fae5;
  --color-danger: #dc2626;
  --color-danger-dim: #fee2e2;
  --color-warning: #f59e0b;

  /* Surface — 3 */
  --surface-app: #f4f6f8;
  --surface-card: #ffffff;
  --surface-hover: #e5e7eb;

  /* Border — 2 */
  --border-subtle: #e5e7eb;
  --border-default: #d1d5db;

  /* Text — 3 */
  --text-primary: #111827;
  --text-muted: #4b5563;
  --text-faint: #9ca3af;

  /* Radius */
  --radius-card: 0.75rem;
  --radius-input: 0.375rem;
  --radius-btn: 0.5rem;
  --radius-pill: 9999px;
}
```

### Tailwind Config

```js
theme: {
  extend: {
    fontFamily: { mono: ["Geist Mono", "monospace"] },
    colors: {
      primary:  { DEFAULT: "#f97316", dim: "#ffe8d5" },
      accent:   { DEFAULT: "#0ea5e9", dim: "#e0f2fe" },
      ok:       { DEFAULT: "#10b981", dim: "#d1fae5" },
      danger:   { DEFAULT: "#dc2626", dim: "#fee2e2" },
      warning:  "#f59e0b",
      surface:  { app: "#f4f6f8", card: "#ffffff", hover: "#e5e7eb" },
      border:   { subtle: "#e5e7eb", default: "#d1d5db" },
      text:     { primary: "#111827", muted: "#4b5563", faint: "#9ca3af" },
    },
    borderRadius: {
      card: "0.75rem", input: "0.375rem", btn: "0.5rem",
    },
  },
}
```

---

## Typography Scale

| Role           | Weight | Size  | Color        | Transform       |
| -------------- | ------ | ----- | ------------ | --------------- |
| Section title  | bold   | 11px  | text-primary | uppercase wide  |
| Table header   | bold   | 10px  | text-faint   | uppercase wider |
| Table cell     | medium | 12px  | text-primary | —               |
| Label          | medium | 11px  | text-muted   | uppercase       |
| Numeric value  | bold   | 14px+ | text-primary | —               |
| Secondary info | medium | 11px  | text-muted   | —               |
| Badge          | bold   | 10px  | contextual   | uppercase wider |

---

## Layout

Collapsible sidebar. Full-height. Content area takes remaining width.

```
┌──────────┬───────────────────────────────────────────┐
│ SIDEBAR  │  TOPBAR   module title · spacer · actions │
│ expanded ├───────────────────────────────────────────┤
│  w-56    │  PAGE HEADER   title · period · save btn  │
│          ├───────────────────────────────────────────┤
│ collapse │                                           │
│  → w-12  │  CONTENT AREA                             │
│          │  ┌─────────────────────────────────────┐  │
│ nav icon │  │  KPI STRIP  (optional)              │  │
│ + label  │  ├─────────────────────────────────────┤  │
│          │  │  AG GRID                            │  │
│          │  └─────────────────────────────────────┘  │
└──────────┴───────────────────────────────────────────┘
```

**Sidebar**

- Expanded: `w-56` · Collapsed: `w-12` · transition `duration-200`
- bg `surface-card` · right border `border-default` · full height fixed
- Toggle button: bottom of sidebar · icon only · `text-faint hover:text-primary`
- Nav item expanded: icon + label · `text-[12px] font-bold uppercase tracking-wider`
- Nav item collapsed: icon only · tooltip on hover
- Active state: `bg-primary-dim text-primary border-r-2 border-primary`
- Inactive: `text-muted hover:bg-surface-hover hover:text-primary`

**Topbar**

- Height: `h-12` · bg `surface-card` · border-b `border-default`
- Module title: `text-[11px] font-bold uppercase tracking-widest text-primary`
- Right slot: user info · secondary actions

**Page header**

- bg `surface-app` · `px-6 py-4` · border-b `border-subtle`
- Left: view title `text-[13px] font-bold uppercase text-primary`
- Right: period picker · **Save button** (appears only when pending changes exist)

**Content area**

- bg `surface-app` · `p-6`
- KPI strip: optional — only when summary metrics add value above the grid
- Grid fills remaining height: `flex-1` · do not constrain height arbitrarily

---

## Components

### KPI Card

```
┌─────────────────────┐
│ LABEL               │  10px bold uppercase text-faint
│ 4 475.7             │  24px bold text-primary
│ sublabel            │  11px medium text-muted
└─────────────────────┘
border border-subtle rounded-card — no shadow
```

### Badge

```
rounded-pill  px-2 py-0.5  text-[10px] font-bold uppercase tracking-wider

ok / active   → bg-ok-dim       text-ok
inactive      → bg-surface-hover text-muted border-default
danger        → bg-danger-dim   text-danger
warning       → bg-amber-50     text-warning
info          → bg-accent-dim   text-accent
```

### Diff Chip

```
rounded-input  px-2 py-0.5  text-[11px] font-bold

in range    → bg-ok-dim     text-ok
out range   → bg-danger-dim text-danger
neutral     → bg-surface-hover text-muted
```

### Table

```
Library: TBD

Tokens to apply regardless of library:
  header:       surface-app · text-faint · 10px bold uppercase · border-b border-default
  row:          surface-card · text-primary · 12px medium · border-b border-subtle
  row hover:    surface-hover
  cell padding: px-4 py-2.5
  numeric cols: text-right font-bold
  id / link:    text-primary font-bold · color-primary on hover
```

### Input / Select

```
border border-default rounded-input bg-surface-card
text-primary text-[13px] font-medium
focus: border-primary ring-1 ring-primary/30
```

### Button — Primary

```
bg-primary text-white font-bold rounded-btn px-4 py-2 text-[12px] uppercase tracking-wide
hover: opacity-90
```

### Button — Ghost

```
border border-default text-muted font-medium rounded-btn px-4 py-2 text-[12px]
hover: bg-surface-hover
```

---

## Rules

- Fonts: `medium` and `bold` only.
- Shadows: none — borders only.
- Gradients: none.
- Dark mode: never.
- Border radius: max `rounded-card` (0.75rem).
- Colors: tokens only — no arbitrary values.
- Numeric truncation: never use `…` on values — resize column instead.
- Semantic color: context-driven, not sign-driven (positive ≠ green).
