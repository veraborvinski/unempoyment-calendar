---
name: "The Unemployment Calendar"
description: "One long gig bill announcing a month of unemployment as shows anyone can attend."
colors:
  paper: "#f3ead8"
  ink: "#211b12"
  ink-muted: "#4a4238"
  paper-mid: "#e8ddc5"
  red: "#e8452c"
  yellow: "#f5d64c"
  blue: "#1b2a52"
typography:
  display:
    fontFamily: "\"Alfa Slab One\", serif"
    fontSize: "clamp(2.6rem, 11vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "0.01em"
  headline:
    fontFamily: "\"Alfa Slab One\", serif"
    fontSize: "clamp(1.35rem, 5vw, 1.8rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0.005em"
  body:
    fontFamily: "\"Archivo\", system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "\"Courier Prime\", monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.11em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "26px"
  xl: "42px"
components:
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1.5rem 0.6rem 1.9rem"
  button-primary-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  stamp-default:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.1rem 0.5rem"
  stamp-food:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
  stamp-outdoors:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
---

# Design System: The Unemployment Calendar

## Overview

**Creative North Star: "The Riso Gig Poster"**

A single continuous gig bill printed on recycled bone stock. The world is code-led letterpress: bone paper under fluoro riso inks — red-orange, acid yellow, navy — with halftone grain, misregistered ghost layers, heavy ink borders, perforation tears, and stub-tear interaction. Joining means tearing a ticket stub, not clicking a card. Density is loud but committed: stacked masthead, then an uninterrupted run of date headers and bill strips, no card grid, no clean white cards.

The system serves PRODUCT.md directly: self-deprecating unemployment humor, fun / loud / a little ugly, never a clean corporate SaaS landing page. Ground truth is `src/pages/index.astro` built to `dist/index.html` (seed `e903b6f4` injected via `scripts/inject-contract.mjs`; screenshots `.impeccable/review/desktop.png` + `mobile.png` are authoritative post-fix2 captures). Where intention and build diverge, the build wins.

**Key Characteristics:**
- Bone stock + halftone grain everywhere (8px / 0.16 on `body` and every `.act`)
- Ink-struck borders (2px–2.5px `var(--ink)`) and dashed perforations, never soft cards
- Riso triplet: red `#e8452c`, yellow `#f5d64c`, blue `#1b2a52` on bone `#f3ead8`
- Slab display (Alfa Slab One) vs. mono inventory type (Courier Prime) tension
- Continuous bill strips with alternating tilt (-0.45deg / 0.4deg), overlapping at -2.5px

## Colors

Four inks on newsprint. Warm bone paper holds heavy ink linework; fluoro accents are used flat as solid fills, never as gradient or tint.

### Primary
- **Fluoro Red** (#e8452c): Primary attention. Masthead ink (`h1 .line`), `::selection` fallback, focus ring (`outline: 3px solid var(--red)`), food stamps, sold-out intrusion, scissors stroke. Text on red is bone paper.
- **Acid Yellow** (#f5d64c): Ticket and slab. Date slab (`.date-slab`) background, ticket-stub CTA (`.stub`) background, default category stamp, link hover wash. Text on yellow is ink.

### Secondary
- **Gig Navy** (#1b2a52): Misregistered masthead ghost (`h1 .line::before` offset -0.045em / 0.05em at 0.85 opacity, multiply), outdoors + culture stamps, capacity line (`.cap`). Text on navy is bone paper.

### Tertiary
- No tertiary hue. Red / yellow / navy are the complete accent set.

### Neutral
- **Bone Paper** (#f3ead8): Page, strip fill, masthead badge text. Declared as `html` + `body` + `.act` background.
- **Bone Mid** (#e8ddc5): Token `--paper-mid` defined but not rendered as a distinct surface in the built output (reserved).
- **Ink** (#211b12): Body text, primary borders (2.5px), perforation ink. All heavy linework.
- **Ink Muted** (#4a4238): Secondary text — time suffix (`.thru`), fineprint, capacity nostalgia (`.nostub`), colophon. Past filter desaturates toward it.

### Named Rules
**The Print-Only Palette Rule.** Only `paper`, `ink`, `ink-muted`, `red`, `yellow`, `blue` ship. No tints, no pastels, no added neutrals in components; past states use `opacity 0.45 + saturate 0.4`.

**The Solid-Stamp Rule.** Category stamps are saturated solid fills (yellow default, red for `food`, navy for `outdoors`/`culture`) with 2px ink stroke at 1.6deg tilt — never outlined, pill, or muted.

## Typography

**Display Font:** Alfa Slab One (with serif fallback)
**Body Font:** Archivo (with system-ui, sans-serif fallback)
**Label/Mono Font:** Courier Prime (with monospace fallback)

**Character:** Letterpress slab for shouting, grotesk sans for the joke, monospaced inventory type for stage times and stamps. Display screams; mono inventories; body bridges.

### Hierarchy
- **Display** (400, clamp(2.6rem, 11vw, 5.4rem), 0.96, 0.01em, uppercase): Masthead `THE / UNEMPLOYMENT / CALENDAR` — three lines at alternating tilt (-1deg / 0.7deg / -0.5deg) with navy ghost misregister. `UNEMPLOYMENT` optically at 0.62em.
- **Headline** (400, clamp(1.25rem, 4.5vw, 1.7rem) `dow` / clamp(1.35rem, 5vw, 1.8rem) `act-title`, 1.08, uppercase): Day weekday (`.dow`) and activity title (`.act-title`). Act titles are uppercase slab.
- **Title** (700, 1.18rem, tabular-nums): Stage time (`.stage-time` in Courier Prime); thru range at 0.85rem muted.
- **Body** (600–700, 0.98rem–1.02rem, 1.5, max ~46ch on `.standfirst`): Standfirst (600), venue (700), fineprint notes. Venue uses dotted underline in red.
- **Label** (700, 0.72rem, 0.11em, uppercase): Stamps (`.stamp` / `.relbadge`), caps (`.cap` at 0.74rem / 0.08em navy), ticketing language. All caps, mono, bold.

### Named Rules
**The Slab Shouts, Mono Inventories Rule.** Alfa Slab One only for masthead, day weekday, act titles, and sold-out intrusion. Everything inventory/time/code is Courier Prime. Archivo never substitutes for either.

**The No-Eyebrow Rule.** No kickers, eyebrows, or secondary sans labels above slab heads. The built world ships none; do not add them.

## Layout

Single-column gig bill. No grid of cards; days stack as continuous strips.

- **Container:** `main` + `footer.colophon` at `min(680px, 94vw)` centered; `.bill-top` is full-bleed `100vw` with `padding-inline: max(3vw, calc((100vw - 680px)/2))` and `padding-top: clamp(1.6rem, 5vw, 3rem)`. Mobile and desktop share the same single column (see authoritative screenshots).
- **Day structure:** perforation divider (`.perf` 26px, 4px dashed at 72% ink, `margin-top: 2.6rem`) → day header (`.day-head` flex, gap 0.55rem, rotate -0.6deg) → zero-gap `.stack` (flex column, gap 0) of `.act` strips overlapping by `margin-top: -2.5px` (first child 0).
- **Rhythm:** tight bill print rhythm — `0.35rem` to titles, `0.55rem` gutters, `1rem` day-header bottom, `3rem` before colophon. Halftone grain pins the whole page to an 8px grid.
- **Responsive:** No breakpoint tokens. Masthead, day weekday, and act titles use `clamp()`; bill-top padding uses `max()`/`calc()` to bleed. No nav to collapse.

## Elevation & Depth

Flat ink on stock, with a single deliberate shadow vocabulary for lifted print slabs — not layered cards.

Depth is conveyed by ink weight (2.5px borders), rotation, and halftone grain. At rest every surface is flat. Two elements lift:

### Shadow Vocabulary
- **Paper Slab** (`box-shadow: 0 5px 16px rgba(33, 27, 18, 0.18)`): Date slab (`.date-slab`) only.
- **Ticket Lift** (`box-shadow: 0 6px 18px rgba(33, 27, 18, 0.18)`): Ticket stub CTA (`.stub`) at rest.
- **Ticket Pressed** (`box-shadow: 0 3px 10px rgba(33, 27, 18, 0.13)` + `filter: brightness(0.96)` + `scale(0.97)`): Same stub on hover, preserving its -0.8deg tilt.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow appears only on the two lifted paper objects (slab, stub). Never add card shadows to `.act`.

**The Ink-Is-Depth Rule.** Prefer heavier border, rotation, or grain over blur. Past days dim via `opacity 0.45` + `saturate(0.4)` and a ghost `PAST SHOW` outline stroke (`-webkit-text-stroke: 1.5px var(--ink-muted)`), not deeper shadow.

## Shapes

Sharp paper, torn edges, never rounded.

- **Corners:** 0px everywhere in UI. All act strips, slabs, stamps, stubs, perf dividers, and the empty state are square-cornered. Only shipping artifact `public/favicon.svg` carries `rx="10"` / `rx="8"` on its 64px canvas — not a UI radius token.
- **Borders:** 2.5px solid ink on every `.act`; 2px solid ink on every `.stamp` and `.date-slab`; stub uses 2.5px solid ink on three sides (left edge open for the dashed tear line).
- **Dashes:** 4px dashed at 72% ink for day perforation (`.perf::before`); 2.5px dashed at 75% ink for stub tear line (`.stub::before` at 0.75rem) and 40% on `.nostub`.
- **Rotations:** Signature shape device — masthead lines at -1deg/0.7deg/-0.5deg, day header at -0.6deg, date slab at 1.2deg, stamps at 1.6deg, ticket stub at -0.8deg, nostalgia fallback at -0.6deg, act tilt-0 at -0.45deg and tilt-1 at 0.4deg, sold-out at -14deg.
- **Silhouette:** Continuous overlapping bill strips (zero-gap stack), not separated cards.

## Components

### Masthead
- **Character:** Misprinted letterpress title with ghost double.
- **Shape:** Full-bleed, centered, stacked three-line grid.
- **Type:** Alfa Slab One display at `clamp(2.6rem, 11vw, 5.4rem)` / 0.96, uppercase, red fill (`var(--red)`) with navy ghost (`::before` content `attr(data-text)` at -0.045em/0.05em offset, 0.85 opacity, `mix-blend-mode: multiply`).
- **Beneath:** `ALL AGES` strip (`.allages`) — Cour Prime 700 mono at clamp(0.66rem, 2vw, 0.8rem) / 0.06em, 2px ink border with 8px top/bottom weight, block.

### Day Header
- **Shape:** Flex row wrapping, 0.55rem gap, whole row tilted -0.6deg. Weekday slab + yellow date slab + optional badge.
- **Date Slab:** Acid yellow fill, 2px ink border, 2px-ish mono padding `0.08em 0.45em`, Courier Prime 700 at 1rem / 0.04em, tilted 1.2deg, Paper Slab shadow. (`src/pages/index.astro:386`)
- **Badge:** `TODAY` / `TOMORROW` (`.relbadge`) — red fill, bone text, Courier Prime 700 at 0.72rem / 0.09em, -2deg tilt, injected client-side; hidden otherwise. Grouped by `data-date`.
- **Perforation:** 26px tear strip with centered 4px dashed line at 72% ink separating every day.

### Act Strip / Bill Strip (Signature)
- **Shape:** 0 radius, 2.5px ink border, bone + halftone fill (`radial-gradient(rgba(33,27,18,0.16) 2.4px, transparent 2.6px) / 8px 8px`), padding `0.95rem 1.1rem 1rem`, overlapping -2.5px to read as continuous bill. Alternating tilt `tilt-0 -0.45deg` / `tilt-1 0.4deg` keyed to `(i + dayIndex) % 2`.
- **Header:** Stage time (Courier Prime 700, 1.18rem tabular, thru at 0.85rem muted) left, category stamp right.
- **Title + Venue + Fineprint:** Slab uppercase title; venue 700 with dotted red underline (hover: yellow highlight); fineprint mono 0.86rem muted.
- **Foot:** Capacity (`ROOM FOR n` in navy mono 0.74rem) + ticket row full-width bottom.
- **Past:** Whole day at `opacity 0.45`, `saturate(0.4)`, ghost `PAST SHOW` outline.

### Category Stamp
- **Shape:** 2px ink border, padding `0.1rem 0.5rem`, Courier Prime 700 at 0.72rem / 0.11em uppercase, tilted 1.6deg.
- **Fills:** Default `.cat` yellow / ink; `.food` red / bone; `.outdoors` + `.culture` navy / bone. (`.games`, `.chill`, `.default` fall through to yellow.) (`src/pages/index.astro:488`)

### Buttons — Ticket-Stub CTA (Primary) + Nostalgia Fallback
- **Shape:** Square, 2.5px ink border with open left edge; left tear line `2.5px dashed at 75% ink` inset 0.75rem (`::before`). Padding `0.6rem 1.5rem 0.6rem 1.9rem`, Archivo 900 at 1.05rem / 0.05em, acid yellow fill, ink text, `Ticket Lift` shadow, -0.8deg tilt, gap 0.55rem with inline SVG.
- **Icon:** `scissors-sm` 1.05rem, stroke `var(--red)`, inline SVG with two circles + diagonals — not an icon font.
- **States:** Hover `scale(0.97)` + `Ticket Pressed` shadow + `brightness(0.96)`; focus-visible uses global `3px solid var(--red)` at 3px offset. Reduced motion: transition none, hover holds tilt without scale.
- **Fallback:** `.nostub` — mono italic 0.86rem, 45% yellow fill `rgba(245,214,76,0.45)`, 2.5px dashed border at 45% ink (open left), tear line at 40%, -0.6deg tilt. Shown when `formUrl` unconfigured or `attendeesFull`.
- **Sold Out:** Absolute intrusion at `top 38% right 4%`, `rotate(-14deg)`, 3px solid red, red text, Alfa Slab One 1.3rem / 0.08em, `mix-blend-mode: multiply`, not a stamp variant.

### Links
- **Venue / Maps:** `color: var(--ink)`, `text-decoration: underline dotted var(--red)` at 2px / 3px offset, inline `ext` arrow SVG 0.72em. Hover: yellow wash.

### Colophon
- **Shape:** Dash border top `3px dashed at 55% ink`, centered mono caps 0.78rem / 0.07em muted. Text: `PRINTED ON 100% RECYCLED FREE TIME · VOL. 1 · NO REFUNDS · Rain or shine`.

## Do's and Don'ts

### Do:
- **Do** keep the single-column bill intact — every day is a perforated section of one continuous announcement, not a card grid.
- **Do** use the heavy ink border (2.5px `var(--ink)`) on every act strip and the 2px/8px ALL AGES strip.
- **Do** keep halftone grain on `body` and `.act` (`radial-gradient(rgba(33,27,18,0.16) 2.4px, transparent 2.6px) / 8px 8px`) on bone paper.
- **Do** alternate `tilt-0 -0.45deg` / `tilt-1 0.4deg` on consecutive acts by `(i + dayIndex) % 2`.
- **Do** place the join action at the bottom of every act as a torn stub (yellow, dashed-left, -0.8deg, scissors icon stroke red).
- **Do** use stamps as saturated solids: red=food, navy=outdoors/culture, yellow=otherwise — with 2px ink and 1.6deg tilt.
- **Do** keep date slabs yellow with 2px ink and `Paper Slab` soft shadow; keep masthead misregister (-0.045em / 0.05em navy ghost, multiply).
- **Do** use `focus-visible: 3px solid var(--red)` at 3px offset on all interactive elements.

### Don't:
- **Don't** round corners — UI ships at 0px radius; no `rounded-lg` cards or pill chips.
- **Don't** add kickers/eyebrows, hard offset shadows, glyph icon fonts, or system display faces — the built world carries none.
- **Don't** lighten yellow or wash out red; the riso trio is binary: solid fill or nothing.
- **Don't** add card shadows to act strips; only the date slab and ticket stub lift.
- **Don't** replace the dashed perforation/tear lines with solid dividers or add a corporate nav/header bar.
- **Don't** introduce photography or raster illustration — the built world ships no rasters.

### Shipping Assets & Provenance

- **Rasters shipping:** none. `dist/` contains only `dist/index.html`, `dist/_astro/index.*.css`, and `dist/favicon.svg`. No `.png` / `.jpg` / `.webp` ships.
- **`public/favicon.svg` / `dist/favicon.svg`:** authored vector (64×64, red `#e8452c` plate with yellow `#f5d64c` inner stroke and bone `#f3ead8` two-dot smile) — vector provenance, no raster provenance needed.
- **Web fonts (external, not shipped rasters):** `Alfa Slab One`, `Archivo` (400/600/700/900), `Courier Prime` (400/700) via `fonts.googleapis.com` — documented here, not bundled.
