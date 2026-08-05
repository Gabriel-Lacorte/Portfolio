---
name: lacorte.city
description: Terminal-native personal site — blood-soaked near-black, two monospace voices, hard cuts, drawn depth, old-web warmth.
colors:
  bg: "#0a0507"
  base: "#ece4e2"
  comment: "#a39694"
  blood: "#db001a"
  accent: "#eb242a"
  blood-deep: "#9c0615"
  blood-dark: "#0e0204"
  rule: "#50171c"
  green: "#4fd67f"
  amber: "#e8b04b"
  win-bar: "#1a0a0e"
  win-line: "#5f171e"
  win-edge: "#8d1622"
  win-title: "#f2252b"
  code-surface: "#0c0505"
  code-panel: "#160606"
typography:
  display:
    fontFamily: "Departure Mono, Departure stand-in, Iosevka, ui-monospace, monospace"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.06em"
  body:
    fontFamily: "Departure Mono, Departure stand-in, Iosevka, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.32
  article:
    fontFamily: "Iosevka, Iosevka stand-in, ui-monospace, Cascadia Mono, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Departure Mono, Departure stand-in, Iosevka, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.32
  code:
    fontFamily: "Iosevka, Iosevka stand-in, ui-monospace, Cascadia Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0px"
spacing:
  para: "15px"
  flow: "17px"
  heading: "22px"
  section: "40px"
  article-heading: "34px"
  gutter: "16px"
  indent: "16px"
components:
  link:
    textColor: "{colors.base}"
  link-hover:
    backgroundColor: "{colors.base}"
    textColor: "{colors.bg}"
  link-article:
    textColor: "{colors.accent}"
  link-article-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
  nav-item:
    textColor: "{colors.base}"
    padding: "3px 0"
  nav-item-active:
    backgroundColor: "{colors.base}"
    textColor: "{colors.bg}"
  cmd-heading:
    textColor: "{colors.base}"
    typography: "{typography.body}"
  out-block:
    padding: "0 0 8px 16px"
  window-bar:
    backgroundColor: "{colors.win-bar}"
    textColor: "{colors.win-title}"
    padding: "4px 8px"
  window-body:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.base}"
    typography: "{typography.code}"
    padding: "10px 12px"
  taskbar-button:
    textColor: "{colors.base}"
    padding: "2px 10px"
  taskbar-button-active:
    backgroundColor: "{colors.base}"
    textColor: "{colors.bg}"
  listing-title-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
  tag:
    textColor: "{colors.comment}"
    typography: "{typography.label}"
  code-copy:
    textColor: "{colors.comment}"
    padding: "0 8px"
---

# Design System: lacorte.city

## 1. Overview

**Creative North Star: "The Autopsy Bench"**

This is the bench where machines get taken apart and the findings get written down. Everything on the site is presented as evidence of work performed: pages open with a shell command (`$ whoami`, `ls -la ~/writing`), content arrives as that command's output, and live facts (commit hash, word counts, build date) come from the actual deploy. The mood is three things at once, deliberately held in tension: dry workshop honesty as the baseline register, blood-red menace as the visual signature (a near-black soaked in red, the quiet dread of a machine that knows too much), and personal-web warmth as the human layer — 88x31 badges, a webring, ASCII block letters, hand-labeled everything.

The system is dense and single-columned (984px max, 16px gutters), set entirely in two monospace voices, and refuses ornament: no rounded corners, no shadows, no gradients, no transitions. Depth is drawn with 1px hairlines and window chrome; interaction is an instant repaint. Per PRODUCT.md, it explicitly rejects the corporate dev-portfolio, Hollywood hacker kitsch, the sanitized minimal blog, and the heavy JS showpiece. The terminal here is real, not costume: every metaphor (windows, taskbar, prompts) behaves like the real thing and degrades to honest static HTML with JavaScript off.

**Key Characteristics:**
- Terminal-native: content framed as command + output, everywhere
- Blood-soaked dark palette, and only that: one theme, red-cast neutrals, never gray, plus a monochrome print stylesheet
- Two monospace voices: Departure Mono (machine chrome) and Iosevka (the written word)
- Flat, sharp, instant: 0px radius, no shadows, no tweens
- Old-web artifacts worn sincerely: pixel icons, 88x31 badges, ASCII art, webring
- Bilingual (EN / PT-BR) and no-JS resilient by doctrine

## 2. Colors

A blood-soaked terminal: red-cast blacks, a warm bone-white ink, and one arterial accent — the palette keeps the code's own token names.

### Primary
- **Blood** (#db001a): the structural red. Focus outlines, the window-bar focus ring, and the base the window chrome is mixed from. On the near-black body it measures 3.88:1 — enough for the 3:1 that non-text UI needs, and deliberately not used for anything smaller or wordier.
- **Accent** (#eb242a): the same hue lifted to 4.64:1, and the only red allowed to touch text. Markdown heading markers (`## `), command arguments/flags, `strong`, `[new]`, tag `#` prefixes, article links, inline code, table headers, and every hover fill that sits behind Bg-coloured text.
- **Blood-deep** (#9c0615): blockquote spine and pressed/secondary red moments.
- **Blood-dark** (#0e0204): the faintest red-black, used as table-header tint.
- **Window chrome reds** — win-line #5f171e (window borders), win-edge #8d1622 (bar underline), win-title #f2252b (window title text), win-bar #1a0a0e (bar fill): the floating-window vocabulary, all mixed from Blood.

### Secondary
- **Green** (#4fd67f): the prompt. `$` glyphs and success/affirmative status only.
- **Amber** (#e8b04b): warnings and the translation-fallback notice.

### Neutral
- **Bg** (#0a0507): the body — near-black with blood in it, never a neutral gray-black.
- **Base** (#ece4e2): the ink. All primary text and inverted-state fills.
- **Comment** (#a39694): de-emphasis, named after code comments — dates, descriptions, asides, labels, metadata.
- **Rule** (#50171c): the 1px hairline (`--hair`) that draws all structure — menu borders, output-block spines, heading underlines.
- **Code surfaces** — code-surface #0c0505 (pre background), code-panel #160606 (code-block frame): slightly lifted red-blacks for code, with a full Shiki token palette.

Print collapses everything to pure black on white.

### Named Rules
**The Soaked Neutrals Rule.** Every neutral carries the red. Backgrounds, rules, window chrome, and code surfaces are all red-cast blacks — a plain gray anywhere is a bug. The menace lives in the neutrals, not in how much red is painted on top.

**The Inversion Rule.** Interactive state is a full color inversion: base-on-bg becomes bg-on-base (or bg-on-accent for emphasis). Never an opacity fade, never a tint, never a color-mix. Selection, nav, links, buttons, and window controls all obey it.

**The Two Reds Rule.** `--blood` draws, `--accent` speaks. If red touches a glyph — as ink or as the fill behind one — it is `--accent`; contrast is symmetric, so the same token serves both directions. `--blood` is only for borders, rings, and chrome, which answer to 3:1 rather than 4.5:1. Reaching for `--blood` on text is the one way to reintroduce the failure this split exists to prevent.

## 3. Typography

**Display Font:** Departure Mono (with size-adjusted local mono stand-ins to prevent layout shift)
**Body Font:** Departure Mono for UI; Iosevka for article prose
**Code Font:** Iosevka (400/600)

**Character:** Two monospaces on a deliberate contrast axis — Departure Mono is the machine's own chrome, pixel-bitmap and slightly alien; Iosevka is the written word, narrow and long-form readable. There is no proportional typeface anywhere on the site, and no bold weight in UI: emphasis is carried by color (Accent) instead.

### Hierarchy
- **Display** (400, 19px, 1.3, +0.06em): the site mark and article `h2`. The masthead itself is ASCII block art (Iosevka, 14px → 10px → 8px at 700px/370px), not type at display size.
- **Body-UI** (Departure Mono 400, 15px, 1.32): all interface text — nav, command headings, listings, windows, footer.
- **Article** (Iosevka 400, 15px, 1.65, max 72ch): long-form prose. The one place the site breathes.
- **Label** (400, 14px): asides, dates, reading times, tags, captions — always in Comment.
- **Code** (Iosevka 400, 14px, 1.55): code blocks, window bodies, ASCII figures.

### Named Rules
**The Visible Markdown Rule.** Structure is denoted, not sized. Headings keep their literal markdown markers (`## `, `### `) rendered in Accent; an `h2` is 19px, an `h3` 16px, body 15px — the scale barely moves, and the markers plus hairline underlines do the work. Do not introduce large display sizes to create hierarchy.

**The Two Voices Rule.** Departure Mono speaks for the machine (chrome, commands, navigation); Iosevka speaks for the human (articles, code, ASCII drawings). Never swap their roles, never add a third voice.

## 4. Elevation

Fully flat: there is not a single box-shadow on the site, and none may be added. Depth is *drawn*, not cast — a surface that sits above another gets a 1px border (win-line), a title bar (win-bar with a win-edge underline), and a place in the z-order. The stacking scale is semantic and small: taskbar (40) → floating windows (50+, incremented on focus) → skip-link (100). Code blocks lift off the page by background shift alone (bg → code-panel/code-surface), the same way a terminal pane differs from its screen.

### Named Rules
**The Drawn-Depth Rule.** If something must read as "above", give it a border and a bar, never a shadow, never a blur. If it can't earn window chrome, it isn't above.

## 5. Components

Blunt instruments: zero radius, hard color inversions, no easing — every control responds like a keystroke: instant, unambiguous, slightly severe.

### Command Heading (signature)
- **Anatomy:** 16px pixel icon (PNG mask, `currentColor`) + green `$` + command in Base + argument in Accent + optional aside (Comment, 14px) carrying real stats ("3 posts · 9.4k words"), pushed right by a dotted leader.
- **Leader:** a 1px dotted Rule line fills the gap between the command and its stats. At full column width the two sit ~500px apart and otherwise read as unrelated items; the leader is the same idiom the window bodies use. It is suppressed below 700px, where the aside wraps onto its own line and has nothing left to connect.
- **Role:** the section heading grammar for the whole site. Renders as `h2` by default.
- **Rhythm:** 40px above, 10px below. The gap above a command is the largest on the page and the gap below it the smallest, so a section visibly belongs to its command while scrolling.

### Output Block (`.out`)
- **Structure:** 1px Rule hairline on the left, 16px indent — everything that follows a command is its output.
- **Content:** paragraphs (Iosevka, max 72ch), listings, or nested components. This spine + indent is the only sanctioned "container"; there are no cards on this site.

### Links
- **Default:** Base with underline; hover/focus inverts fully (Base background, Bg text).
- **In articles:** Accent with a Rule-colored underline; hover fills Accent behind Bg text.
- **Post titles in listings:** underlined Base; hover fills Accent. External links open with `rel="noopener noreferrer"`.

### Navigation
- **Style:** `[ label ]` brackets in Departure Mono, single row between two hairlines; language switcher (EN / PT) sits right, in Comment. There is no theme control: the site is dark, full stop.
- **States:** `aria-current="page"` and hover both invert (Base fill, Bg text). Below 700px the bar stacks left-aligned.

### Listing Row
- **Structure:** baseline grid `date (105px) / title (1fr) / meta (auto)` — projects use a 48px year column; description and `#`-prefixed tags follow in Comment. Collapses to a stacked column below 700px.

### Floating Window (signature)
- **Chrome:** 1px win-line border, title bar in win-bar with win-title text and a win-edge underline; 24px square bordered control buttons.
- **Body:** `pre` in Iosevka 14px/1.5, opening with a green `$` prompt line; real facts only.
- **Behavior:** in flow they are a horizontal row (`.windows`, 16px gap) sitting one section-gap below the content, so a pair of panels reads as deliberate rather than stranded in the empty band above the footer; the wrapper becomes `display: contents` once they lift, reserving nothing. Lifting happens when the measured margins fit a window plus gaps, and they are draggable (pointer + arrow keys, `role="application"`), z-index incremented on focus, position persisted. Below that they stack full-width and stay readable — never `display: none`, since that would take the build facts and the writeup link away from every phone and every reader at 200% zoom. Only the taskbar hides, because it means nothing once nothing floats. **No-JS: renders as a static bordered aside** — this fallback is mandatory for any new window.

### Taskbar
- **Style:** fixed bottom strip (win-bar fill, win-edge top border, z 40), JS-only, with bordered toggle buttons; `aria-pressed` state inverts Base/Bg.
- **Behavior:** the shell is server-rendered (so its label is translated) and the buttons are built from the windows actually present, one per window, labelled from each window's title bar. It is the only way back from a closed window, so any page that ships a closable window ships the taskbar with it.

### Callout
- **Style:** hairline-left aside; label line reads `! note` / `! warning` / `! danger` in Comment / Amber / Accent respectively. Body is normal article prose. No fills, no icons.

### Code Block
- **Frame:** code-panel background; header bar with lowercase language name and a `copy` button — both Comment, 12px, uppercase, +0.14em tracking (the site's only tracked-caps moment).
- **Copy button:** bare; hover fills Accent behind Bg text; swaps its own label to `copied` / `failed` for 1.6s.

### Table of Contents
- **Style:** `<details>` with `[+]` / `[-]` textual markers on the summary (Comment; hover inverts), hairline-left, h2/h3 only.

### Article Figures
- **Measure:** prose caps at 72ch (~540px), but a paragraph holding only an image is released to the full column (~967px). Screenshots are not prose: at the prose measure a 1920px UI capture is scaled down 3.5x and the interface inside it becomes unreadable, which defeats a post meant to be followed step by step.
- **Loading:** `width`/`height` from the real file (via the rehype plugin) so nothing reflows, plus `loading="lazy"` and `decoding="async"`. A 1px win-line border frames the capture.
- **Authoring note:** on a phone even the full column is ~326px, so a 1920px screenshot still lands around 6x down. Crop captures to the region that matters rather than shipping the whole desktop.

### ASCII Figure
- **Style:** `pre` in Iosevka inside a hairline border, horizontal scroll allowed; caption in Comment 14px with an optional Accent label. Font steps 14 → 10 → 8px at 700/430px.

### Badges (88x31)
- **Style:** the classic old-web strip, centered under the footer: `image-rendering: pixelated`, each badge at its own intrinsic size (the 88x31 buttons plus a 29x20 webring flag), vertically centred, `width`/`height` on every one so the row never reflows. The site's own badge sits first.
- **Data:** the wall is a `BADGES` array, not markup — src, true size, alt, optional artwork language, optional still frame, optional link. A membership badge that points nowhere is a webring worn as costume, so anything that represents belonging somewhere should carry its `HREF`.
- **Linked badges** get 3px of padding so the smallest one clears the 24px target minimum, and invert on hover like everything else.
- **Motion:** an animated badge that loops must ship a still frame through `<picture>` with `media="(prefers-reduced-motion: reduce)"` — a looping GIF is the one moving thing the global reduced-motion block cannot stop.

### Named Rules
**The Real Command Rule.** A command heading names the command that would actually produce the output beneath it. `./status` prints a real build hash, so the rest has to hold to the same standard: the changelog is headed `git log --date=short --format="%ad %s"` rather than `--oneline`, because `--oneline` prints abbreviated hashes and that section prints dates and subjects. An audience that reads `man` pages checks this, and one honest command teaches them to check the others.

**The Hard Cut Rule.** No CSS transitions or keyframe animations on interactive states — hover, focus, open, and close are instant repaints. The only motion on the site is physical (the user dragging a window) and the page repaint below, and `prefers-reduced-motion` flattens both.

**The Screen Repaint Rule.** Pages never dissolve into one another. On navigation the outgoing screen holds still and the incoming one is painted straight over it from the top down, in eight discrete steps across 140ms (`clip-path` + `steps()`, `mix-blend-mode: normal` so the two overwrite instead of blending). It must stay a step function: an eased wipe is just a fade wearing a costume. Reduced motion drops it to a plain cut.

**The Power-Off Rule.** Every interactive component ships its no-JS form: windows become static asides, code blocks render plain with no copy button, and the single dark theme needs no negotiation at all. If a proposed component has no honest power-off state, it doesn't ship.

## 6. Do's and Don'ts

### Do:
- **Do** frame new content as command + output: a `Cmd` heading (`$ verb ~/object`) followed by an `.out` block. That grammar is the site.
- **Do** cap any summary line at 72ch, the same measure as prose, even inside a dense list row.
- **Do** use full inversion for every interactive state — exact pairs only: Base↔Bg, or Bg-on-Accent for emphasis.
- **Do** keep every corner 0px, every border 1px, every surface shadowless.
- **Do** keep neutrals soaked: new darks mix from Blood (like #0c0505, #160606), never from gray.
- **Do** ship the no-JS fallback and the reduced-motion path with the feature, not after it.
- **Do** reach for `--accent` the moment red meets text, and re-measure when any red changes: every text pair clears 4.5:1, and the margin on the accent is 0.14.
- **Do** give decorative generated content empty CSS alt text (`content: "## " / ""`) so the markers stay on screen and out of the screen reader.
- **Do** keep both locales first-class: grids use `minmax(0, 1fr)`, rows wrap, and PT-BR strings (typically longer) must fit without truncation.
- **Do** keep facts live: stats, dates, and build info come from the deploy, never hard-coded theater.

### Don't:
- **Don't** build the corporate dev-portfolio: no hero headshot, no skill bars, no "Hi, I'm Gabriel 👋", no card grids, no testimonial energy. There are deliberately **no cards** on this site — grouping is done by the Output Block spine or window chrome.
- **Don't** do Hollywood hacker kitsch: no Matrix-green glitch text, no scanlines, no neon "cyber" gradients, no gratuitous skull ASCII. The menace is quiet or it isn't menace.
- **Don't** sand it into a sanitized minimal blog: no friendly rounded sans, no boundless whitespace, no reading-app chrome.
- **Don't** ship a heavy JS showpiece: no WebGL, no scroll-jacking, no cursor trails — the site advertises a no-JS button and must deserve it.
- **Don't** tween. No `transition:`, no easing curves, no fade-on-hover. The Hard Cut Rule is doctrine.
- **Don't** round a corner, cast a shadow, or paint a gradient. Ever.
- **Don't** introduce a proportional typeface, a third font family, or bold-weight UI text — emphasis is Accent, not weight.
- **Don't** replace textual markers (`$`, `## `, `[+]`, `! note`, `#tag`) with icons. The markers are the interface.

### Social card
- **Style:** 1200x630, body Bg, the ASCII wordmark with its single Accent dot, a Rule hairline, and `$ whoami` answering itself. Rendered from `public/_og-card.html` in the site's real fonts (screenshot at exactly 1200x630), not approximated in an image editor, so the mark is pixel-identical to the masthead.
- **Wiring:** absolute URL via `og:image` + `twitter:image`, `summary_large_image`, explicit width/height, and alt text. Regenerate by restoring the card HTML into `public/`, screenshotting it, and deleting it again.

**The audit test:** if a control eases, glows, floats on a shadow, or sits in a rounded card — it's not this site.
