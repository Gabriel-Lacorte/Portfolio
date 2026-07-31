---
name: lacorte.city
description: A systems-engineering notebook rendered as one operator's terminal session — bone on ink, flat as a printout.
colors:
  bone: "#ece4e2"
  ink: "#0a0507"
  blood: "#ff4d5c"
  blood-deep: "#a30f1e"
  blood-dark: "#1f0509"
  green: "#4fd67f"
  amber: "#e8b04b"
  comment: "#a39694"
  rule: "#5e2a2f"
  win-line: "#7a2b33"
  win-bar: "#1a0a0e"
  pure-white: "#ffffff"
  paper-page: "#f0e9e6"
  paper-ink: "#17100f"
  blood-printed: "#a8071a"
  blood-deep-printed: "#d9394a"
  blood-dark-printed: "#f7e7e5"
  green-printed: "#0d6b38"
  amber-printed: "#7a5300"
  comment-printed: "#6b5c59"
  rule-printed: "#c2a5a2"
typography:
  display:
    fontFamily: "Departure Mono, Iosevka, ui-monospace, monospace"
    fontSize: "19px"
    fontWeight: 400
    letterSpacing: "0.06em"
  headline:
    fontFamily: "Departure Mono, Iosevka, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.32
  body:
    fontFamily: "Departure Mono, Iosevka, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.32
  prose:
    fontFamily: "Iosevka, ui-monospace, Cascadia Mono, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Departure Mono, Iosevka, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
  code:
    fontFamily: "Iosevka, ui-monospace, Cascadia Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
spacing:
  row: "1px"
  gap: "8px"
  pad: "12px"
  line: "15px"
  indent: "16px"
  section: "26px"
  gutter: "32px"
components:
  link:
    textColor: "{colors.bone}"
  link-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
  chip-inverted:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
  cmd-heading:
    typography: "{typography.body}"
    textColor: "{colors.bone}"
  output-block:
    padding: "0 0 0 16px"
  window-bar:
    backgroundColor: "{colors.win-bar}"
    textColor: "{colors.blood}"
    padding: "4px 8px"
  taskbar-button:
    textColor: "{colors.bone}"
    padding: "2px 10px"
  button-88:
    width: "88px"
    height: "31px"
---

# Design System: lacorte.city

## 1. Overview

**Creative North Star: "The Operator's Notebook"**

One person's working terminal, kept the way a systems engineer keeps a lab notebook. Every section on every page is the output of a command the operator would actually run — `$ whoami`, `$ ls -la ~/writing`, `$ systemctl status lab` — and the page is the session transcript: one column, top to bottom, set in type. It is a DOCUMENT, not a dashboard. Nothing appears that would not survive being printed.

The system is one engraving in two states: **lit** (bone phosphor on ink — the default, and the design) and **printed** (paper mode — the same marks pressed into paper). Dark is not a preference mirror; it is the artwork. Light is the printout, persisted once chosen.

Controls are **hand-labeled instruments**. Every window, button, and chip is real and load-bearing, labeled by the person who uses it — "status", "lab", "[+] contents", "copy". Nothing is decorative; the warmth comes from the visible hand (a first-person changelog, windows you can drag and close, 88×31 buttons free to hotlink), never from ornament.

Its lineage is filed in PRODUCT.md § References: the 1-bit information machine (NETLINK, INTDEV, U.S. Graphics' instrument panels), engraved line work on ink, desktop chrome as a place, and the inhabited personal web — never the link-hub layouts or skill meters that travel alongside them.

This system explicitly rejects, in PRODUCT.md's words: **dashboard chrome** ("grids of bordered cards, admin-panel texture, stat tiles"), **marketing-site scale** ("display headings, hero sections, CTA blocks"), **the references' own chrome** (bezu.dev's dashed-rule signature, grey-and-purple), **tone posing as art** (1-bit dithers of complex images; "line work or nothing"), and **LinkedIn smell**.

**Key Characteristics:**
- Command → indented output: 16px indent behind a 1px hairline, the whole grammar of the site.
- Reverse video (bone ⇄ ink swap) is the only interaction material: hover, focus, selection, current page, pressed state.
- Headings are body-size. The loudest type on the entire site is a 19px masthead.
- Two inks and one signature — blood — with green and amber as fixed-meaning margin marks; flat as paper; corners always square.
- Fully working with scripting off; JavaScript only enhances.
- Bilingual (en / pt-BR) as equals — every string through the typed dictionary.
- One 984px column (`width: calc(100% - 32px)`), breakpoints at 700px (windows join the flow, menu aligns left) and 1740px (windows dock in the gutter beside the column).

## 2. Colors

A two-ink page — bone on red-black ink — cut by one signature: blood. Blood is the voice, not a rare accent; green and amber stay margin marks with fixed meanings.

### Primary
- **Blood** (#ff4d5c lit / #a8071a printed): the signature. Emphasis marks, command arguments, article links and the `##` heading marks, window titles, `[new]`. 6.23:1 on ink — the only member of the blood triad that may carry text. `--accent` and `--red` both alias it: identity, emphasis, and danger deliberately share one ink. **Emphasis is the ink alone — never underlined**; see the Underline Rule.
- **Blood deep** (#a30f1e lit / #d9394a printed): fills, the quote rail, the window edge. Never text.
- **Blood dark** (#1f0509 lit / #f7e7e5 printed): the code-block and table-header ground — picked so all seven syntax colours pass against it, not just against the page. Never text.

### Secondary
- **Green** (#4fd67f lit / #0d6b38 printed): the OK ink. The `$` prompt glyph, `up`/`online` states, "open ports: none".

### Tertiary
- **Amber** (#e8b04b lit / #7a5300 printed): the warn ink. `idle` states, the untranslated-post notice, warning callout labels, syntax strings.

### Neutral
- **Bone** (#ece4e2): all running text when lit, and the fill of every reversed (hovered/selected/current) element.
- **Ink** (#0a0507): the page when lit — near-black with a red undertone; text inside reversed elements. Printed flips the pair: page #f0e9e6, text #17100f.
- **Comment** (#a39694 lit / #6b5c59 printed): the quiet half of every line — dates, descriptions, asides, figcaptions.
- **Rule** (#5e2a2f lit / #c2a5a2 printed): hairlines only — blood-toned, so even the ruling sits in the signature's family.
- **Window chrome**: line #7a2b33, bar ground #1a0a0e, edge = blood deep, title = blood. The one tinted surface in the system.
- **Pure white** (#ffffff): the `--white` token, held in reserve.

### Named Rules
**The Blood Ledger Rule.** Among the blood triad only `--blood` carries text (6.23:1); `--blood-deep` and `--blood-dark` are fills, rails, and grounds — never text. The contrast notes beside the tokens in `global.css` are normative: a palette change updates them or does not ship.

**The One-Hand Rule.** Green and amber appear a handful of times per page, always with their fixed meaning — green OK, amber warn. Blood is exempt: it is the signature, not an accent.

**The Silent Hairline Rule.** `--rule` draws lines only. It never, under any circumstance, carries text.

**The Underline Rule.** Underline means "this navigates" and nothing else. Anchors carry it; `strong`/`b`, box names, and reading titles are blood without it. A reader who clicks an emphasis word once has been lied to.

## 3. Typography

**Display/Body Font:** Departure Mono (with Iosevka, ui-monospace fallback)
**Code Font:** Iosevka 400/600 (with ui-monospace, Cascadia Mono fallback)

**Character:** Two textures of one register. Departure Mono is a pixel grotesque — chunky, CRT-adjacent, the voice of the interface. Iosevka is the narrow workhorse that prose, code, and ASCII diagrams are actually read in — the article body is set in it, because twenty minutes of reading in a pixel face is a punishment. Both self-hosted, both OFL.

### Hierarchy
- **Display** (Departure 400, 19px): the masthead wordmark `lacorte.city` (+0.06em) — and, since the article rework, the `## `-marked h2 inside prose. Still the ceiling.
- **Headline** (700, 15px, 1.32): headings in the chrome. Body-size bold — hierarchy comes from inversion and indentation, never from scale. Command headings stay weight 400; their structure is carried by color (green `$`, bone command, blood argument).
- **Body** (Departure 400, 15px, 1.32): the chrome — home, listings, menus, windows. The column caps at 984px.
- **Prose** (Iosevka 400, 15px, 1.65): the article body, measured at 72ch; h3 16px, h4 15px in comment; `##`/`###` markers in blood.
- **Label** (400, 14px): asides, figcaptions, taskbar buttons, metadata — usually in comment color. The code-bar strip runs 12px tracked uppercase.
- **Code** (Iosevka 400, 14px, 1.5): blocks and inline, on the blood-dark ground. Bold spans use Iosevka 600.

### Named Rules
**The 19px Ceiling.** The largest type on the site is the masthead. If a new surface seems to need bigger type, it needs a better command instead.

**The Even-Pixel Rule.** Mono runs at even pixel sizes only (14px, not 15px, for code and ASCII art): Iosevka advances 0.5em per cell, so odd sizes land glyphs on half-pixels and solid `───` rules render dashed. (ASCII figures drop to 10px on mobile.)

## 4. Elevation

**The Printout Rule.** The system is flat as paper: zero `box-shadow`, zero gradients, zero blur, corners always square (0px). Depth is conveyed three ways only — reverse video for state, 1px hairlines for structure, and the window bar's single tint (#1a0a0e) for chrome. The one true overlap is the draggable windows, governed by a small fixed z-ladder: taskbar 40, lifted windows increment from 50, skip link 100. Nothing else may take a z-index.

## 5. Components

Hand-labeled instruments: each control is real, load-bearing, and named by its operator. Nothing exists in a "disabled" or purely decorative state.

### Command Heading (signature)
- **Anatomy:** green `$` (drawn by CSS, silent to screen readers) + 16px pixel icon (decorative, `aria-hidden`) + command in bone + argument in blood + optional right-aligned aside in comment 14px (drops to its own line under 700px).
- **Semantics:** it IS the heading element (h1–h3); what a screen reader announces is the command text itself.
- **Rule:** a new section must find the command its content would actually be the output of — never invent chrome instead.

### Output Block (signature)
- **Style:** `padding-left: 16px; border-left: 1px solid {colors.rule}` — output sits indented under its command the way it does in a terminal.
- This pairing (`.cmd` + `.out`) is the entire page grammar; sections are separated by rhythm (26px), not by boxes.

### Masthead Wordmark (signature, home only)
- **What:** the one drawing the site allows itself — "lacorte.city" hand-drawn as 8px-tall pixel bitmaps per glyph, rendered as four rows of half blocks (▀▄█) at `line-height: 1`, which squares every half block (7×7px at 14px; 5×5 at 10px ≤700px; 4×4 at 8px ≤370px — even sizes only, 66 cells wide so it never scrolls).
- **Color:** bone; the domain dot is the one blood mark in the masthead.
- **Semantics:** `role="img"` + `aria-label="lacorte.city"` — announced once, never block by block. Subpages keep the two-line type ident via the `ident` slot's fallback.
- **Rule:** it stays the only drawing in the chrome. A second one demotes both.

### Navigation
- **Style:** hairline above and below, links pushed right (left-aligned under 700px), each label bracketed: `[ ~/ ] [ blog ] [ projects ]`. Every control is `white-space: nowrap` with 3px block padding — a bracket must never orphan from its word, and the target clears 24px.
- **States:** `aria-current="page"` and hover both render full reverse video. The language switch (`EN / PT`) and theme switch (`crt / paper`) sit after them in comment color.

### Buttons
- **Shape:** square, 1px border in `{colors.rule}` (window controls, taskbar) or borderless strips (code-copy).
- **Taskbar:** 13px label, `2px 10px` padding, transparent at rest; pressed (`aria-pressed="true"`) and hover render reverse video.
- **Window controls:** 18×18px, the label is a literal `x`.
- **Code-copy:** lives in the code-bar strip that names the block's language (12px tracked uppercase on the window-bar ground); hairline-bordered, hover floods blood; its label is its state ("copy" → "copied"/"failed").

### Chips
- **Inverted chip** (`.titulo`): bone background, ink text, weight 400 — how the chrome shouts without getting bigger. Currently unused in markup (the article carries `## ` marks in blood instead); kept as a system primitive, not a live component.

### Cards / Containers
- **A window must earn its glass.** It shows only what the page does not: `status` carries build, timestamp, and engine (the counts live in the `ls` aside); `lab` carries the network posture and a link to the writeup (the boxes are listed by the `systemctl` section). A window that repeats the section beside it is decoration wearing an instrument's label — the exact thing the manifesto bans.
- **The floating window is the only card the system tolerates.** 1px frame in window-line (#7a2b33): title bar (26px min, `4px 8px`, ground #1a0a0e, blood title, hairline bottom in blood-deep), monospace `pre` body (`10px 12px`), close control. From 900px of viewport it lifts to fixed positioning up front — parked at the right edge, stacked, position remembered per id, draggable by the bar (pointer events, viewport-clamped, re-clamped on resize), reopenable from the taskbar. Below 900px, and always with scripting off, it simply sits open in the flow.
- No other card, panel, or bordered grid exists. Do not add one.

### Callout (article aside)
- **Anatomy:** label line (`! note` / `! warning` / `! danger`) in comment / amber / blood, body indented behind a 1px `{colors.rule}` hairline on the left. Framed and labeled rather than led by an emoji — the label is real text.

### ASCII Figure
- **Style:** framed `pre` in Iosevka 14px/1.2 (10px on mobile), horizontal scroll contained, caption below in comment 14px with a blood label. `role="img"` with a required prose `alt` — the art is drawn, the description is announced.
- **Permission:** instrument-grade density is sanctioned here and in window bodies — dotted leaders (`host.......`), `[••--]` meters, box-drawn schematics — per the 1-bit-information-machine reference lane.

### Table of Contents
- **Style:** a `<details open>` disclosure labeled `[+] contents` / `[-] contents` in comment color; summary hover reverses. Only h2/h3 make the outline.

### Row Listing
- **Style:** `[dd/mm/yyyy] title [new] 12 min` — date and length in comment, title as a normal link, `[new]` in oxide for anything under 90 days. 1px row rhythm; descriptions may follow as a comment-colored second column of the same listing.

### Inputs
- None exist. The site has no forms; if one is ever needed it must be designed in this register from scratch (hairline field, reverse-video focus), not imported.

### 88×31 Buttons
- Classic web buttons, `image-rendering: pixelated`, centered under the footer. The site's own button is free to hotlink.

### Named Rule
**The Scripting-Off Rule.** Every scripted behavior ships its static fallback: windows sit open in the flow, copy buttons vanish, the theme switch and the taskbar do not render at all (both gated behind the `js` class that lands before first paint), and the body loses the padding that existed for the taskbar. A control only script can serve must not exist without it. If a proposed component cannot state its no-JS fallback, it is not in the system.

## 6. Do's and Don'ts

### Do:
- **Do** head every new section with a command the operator would actually run, and indent its output 16px behind a 1px hairline.
- **Do** use reverse video — full bone ⇄ ink swap — for every hover, focus, selection, pressed, and current state. It is instant: a cut, not a fade.
- **Do** keep borders hairline (1px `{colors.rule}`) or absent — "borders are hairlines or nothing". The article's 2px blood-deep quote rail is the one committed exception; do not add a second.
- **Do** reserve underline for anchors, and cap prose inside `.out` at 80ch — the column is for listings, not for 129-character sentences.
- **Do** keep green and amber to their fixed meanings (OK, warn) and a handful of uses per page — including the command icons: `warn` (amber triangle) heads a warning section or nothing. Blood is the signature and exempt from counting — but among its triad only `--blood` ever carries text.
- **Do** keep mono at even pixel sizes (the Even-Pixel Rule) and the contrast notes beside the tokens in `global.css` true.
- **Do** ship the static fallback with every scripted enhancement, and every UI string through the i18n dictionary in both languages.
- **Do** draw art, when a surface earns it, as line work — ASCII logotypes, box-drawn panels, engraving-style borders — never tone.

### Don't:
- **Don't** build dashboard chrome — "grids of bordered cards, admin-panel texture, stat tiles" (PRODUCT.md). One column. Document, not dashboard.
- **Don't** use marketing-site scale — "display headings, hero sections, CTA blocks". Nothing on the site exceeds 19px.
- **Don't** resurrect the references' chrome: no dashed-rule signature (`--dashed` and the citations that outlived it were retired 2026-07-31), no grey-and-purple palette, no cloned layouts.
- **Don't** pose tone as art: no 1-bit dithers of photographs or complex images. Line work (ASCII figures) or nothing.
- **Don't** add LinkedIn smell — skill bars, newsletter popups, engagement hooks, "passionate about" copy. (The RSS feed is not a funnel: it is subscription on the reader's terms, and it ships per locale.)
- **Don't** ship scaffold rows. A placeholder that reaches production ("— add yours") costs more credibility than a short list; filter them at render.
- **Don't** introduce a third typeface, a border-radius, a box-shadow, a gradient, or an arbitrary z-index outside the fixed ladder.
- **Don't** thicken the structural 1px left hairline into a colored side-stripe accent, and never let `--rule` carry text.
- **Don't** animate what can cut. Reverse video snaps; the only tolerated motion is Astro's page crossfade, which `prefers-reduced-motion` already flattens.
