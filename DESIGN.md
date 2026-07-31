---
name: lacorte.city
description: A systems-engineering notebook rendered as one operator's terminal session — bone on ink, flat as a printout.
colors:
  bone: "#e6e2d8"
  ink: "#0b0b0d"
  oxide: "#e8845c"
  verdigris: "#5fbfa8"
  ochre: "#e0b050"
  comment: "#9a948a"
  rule: "#4a4750"
  win-bar: "#16151a"
  win-edge: "#6a6470"
  pure-white: "#ffffff"
  paper-page: "#e6e2d8"
  paper-ink: "#141317"
  oxide-printed: "#9c3a17"
  verdigris-printed: "#0f6b58"
  ochre-printed: "#7a5300"
  comment-printed: "#55515c"
  rule-printed: "#a9a49a"
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
  label:
    fontFamily: "Departure Mono, Iosevka, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
  code:
    fontFamily: "Iosevka, ui-monospace, Cascadia Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
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
    textColor: "{colors.bone}"
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
- Two inks and three accents with fixed meanings; flat as paper; corners always square.
- Fully working with scripting off; JavaScript only enhances.
- Bilingual (en / pt-BR) as equals — every string through the typed dictionary.
- One 984px column (`width: calc(100% - 32px)`), breakpoints at 700px (windows join the flow, menu aligns left) and 1740px (windows dock in the gutter beside the column).

## 2. Colors

A two-ink page — bone on ink — annotated by three accents that behave like margin marks, each with one fixed meaning.

### Primary
- **Oxide** (#e8845c lit / #9c3a17 printed): the mark. Emphasis (`strong`/`b` render oxide + underline, never bold), command arguments, inline code, table headers, the currently-reading title. The one thing on a line that matters. Never a background, never running text. 7.38:1 on ink — AAA. Note the doctrine: `--red` aliases oxide; danger and emphasis deliberately share one ink.

### Secondary
- **Verdigris** (#5fbfa8 lit / #0f6b58 printed): the OK ink. The `$` prompt glyph, `up`/`online` states, "open ports: none". 8.90:1 — AAA.

### Tertiary
- **Ochre** (#e0b050 lit / #7a5300 printed): the warn ink. `idle` states, the untranslated-post notice, warning callout labels. 9.83:1 — AAA.

### Neutral
- **Bone** (#e6e2d8): all running text when lit; the page itself when printed; and the fill of every reversed (hovered/selected/current) element.
- **Ink** (#0b0b0d lit page / #141317 printed text): the other half of the pair; text inside reversed elements.
- **Comment** (#9a948a lit / #55515c printed): the quiet half of every line — dates, descriptions, asides, figcaptions, list punctuation.
- **Rule** (#4a4750 lit / #a9a49a printed): hairlines only.
- **Window bar** (#16151a) + **window edge** (#6a6470): the one tinted surface in the system and its edge.
- **Pure white** (#ffffff): reserved for code function tokens in the lit theme.

### Named Rules
**The One-Hand Rule.** Each accent appears a handful of times per page, always with its fixed meaning — oxide marks, verdigris OK, ochre warn. An accent used more than ~4 times on a page is decoration; cut it.

**The Silent Hairline Rule.** `--rule` is 2.16:1 and draws lines only. It never, under any circumstance, carries text.

**The AAA Ledger Rule.** The contrast table in the `global.css` header (bone 15.20:1, oxide 7.38:1, verdigris 8.90:1, ochre 9.83:1) is normative. A palette change updates the ledger or does not ship.

## 3. Typography

**Display/Body Font:** Departure Mono (with Iosevka, ui-monospace fallback)
**Code Font:** Iosevka 400/600 (with ui-monospace, Cascadia Mono fallback)

**Character:** Two textures of one register. Departure Mono is a pixel grotesque — chunky, CRT-adjacent, the voice of the interface. Iosevka is the narrow workhorse that code and ASCII diagrams are actually read in. Both self-hosted, both OFL.

### Hierarchy
- **Display** (400, 19px, +0.06em): the masthead wordmark `lacorte.city`. Nowhere else.
- **Headline** (700, 15px, 1.32): h1–h6 in prose. Body-size bold — hierarchy comes from inversion and indentation, never from scale. Command headings stay weight 400; their structure is carried by color (verdigris `$`, bone command, oxide argument).
- **Body** (400, 15px, 1.32): everything. The column caps at 984px.
- **Label** (400, 14px): asides, figcaptions, taskbar buttons, metadata — usually in comment color.
- **Code** (Iosevka 400, 14px, 1.45): blocks and inline. Bold spans use Iosevka 600.

### Named Rules
**The 19px Ceiling.** The largest type on the site is the masthead. If a new surface seems to need bigger type, it needs a better command instead.

**The Even-Pixel Rule.** Mono runs at even pixel sizes only (14px, not 15px, for code and ASCII art): Iosevka advances 0.5em per cell, so odd sizes land glyphs on half-pixels and solid `───` rules render dashed. (ASCII figures drop to 10px on mobile.)

## 4. Elevation

**The Printout Rule.** The system is flat as paper: zero `box-shadow`, zero gradients, zero blur, corners always square (0px). Depth is conveyed three ways only — reverse video for state, 1px hairlines for structure, and the window bar's single tint (#16151a) for chrome. The one true overlap is the draggable windows, governed by a small fixed z-ladder: taskbar 40, lifted windows increment from 50, skip link 100. Nothing else may take a z-index.

## 5. Components

Hand-labeled instruments: each control is real, load-bearing, and named by its operator. Nothing exists in a "disabled" or purely decorative state.

### Command Heading (signature)
- **Anatomy:** verdigris `$` (drawn by CSS, silent to screen readers) + 16px pixel icon (decorative, `aria-hidden`) + command in bone + argument in oxide + optional right-aligned aside in comment 14px.
- **Semantics:** it IS the heading element (h1–h3); what a screen reader announces is the command text itself.
- **Rule:** a new section must find the command its content would actually be the output of — never invent chrome instead.

### Output Block (signature)
- **Style:** `padding-left: 16px; border-left: 1px solid {colors.rule}` — output sits indented under its command the way it does in a terminal.
- This pairing (`.cmd` + `.out`) is the entire page grammar; sections are separated by rhythm (26px), not by boxes.

### Navigation
- **Style:** hairline above and below, links pushed right (left-aligned under 700px), each label bracketed: `[ ~/ ] [ blog ] [ projects ]`.
- **States:** `aria-current="page"` and hover both render full reverse video. The language switch (`EN / PT`) sits after them in comment color.

### Buttons
- **Shape:** square, 1px border in `{colors.rule}` (window controls, taskbar) or borderless strips (code-copy).
- **Taskbar:** 13px label, `2px 10px` padding, transparent at rest; pressed (`aria-pressed="true"`) and hover render reverse video.
- **Window controls:** 18×18px, the label is a literal `x`.
- **Code-copy:** appears on hover/focus of the block, top-right, bone-on-ink strip with hairline edges; its label is its state ("copy" → "copied"/"failed").

### Chips
- **Inverted chip** (`.titulo`, article `h2 > span`): bone background, ink text, underlined, weight 400. The chip is how a heading shouts without getting bigger.

### Cards / Containers
- **The floating window is the only card the system tolerates.** 1px `{colors.win-bar}`-topped frame: title bar (26px min, `4px 8px`, #16151a, hairline bottom in `{colors.win-edge}`), monospace `pre` body (`10px 12px`), close control. Draggable by the bar (pointer events, viewport-clamped, position remembered); reopenable from the taskbar; with scripting off it simply sits open in the flow. 340px wide, full-width under 700px, docked in the right gutter above 1740px.
- No other card, panel, or bordered grid exists. Do not add one.

### Callout (article aside)
- **Anatomy:** label line (`! note` / `! warning` / `! danger`) in comment / ochre / oxide, body indented behind a left border. Framed and labeled rather than led by an emoji — the label is real text.
- **Note:** its border still cites the retired `--dashed` token (as do the TOC and ASCII figure frames) and currently renders borderless; per the Silent Hairline Rule the frame, if kept, is a 1px `{colors.rule}` hairline.

### ASCII Figure
- **Style:** framed `pre` in Iosevka 14px/1.2 (10px on mobile), horizontal scroll contained, caption below in comment 14px with an oxide label. `role="img"` with a required prose `alt` — the art is drawn, the description is announced.
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
**The Scripting-Off Rule.** Every scripted behavior ships its static fallback: windows sit open in the flow, copy buttons vanish, the theme stays lit. If a proposed component cannot state its no-JS fallback, it is not in the system.

## 6. Do's and Don'ts

### Do:
- **Do** head every new section with a command the operator would actually run, and indent its output 16px behind a 1px hairline.
- **Do** use reverse video — full bone ⇄ ink swap — for every hover, focus, selection, pressed, and current state. It is instant: a cut, not a fade.
- **Do** keep borders hairline (1px `{colors.rule}`) or absent. "Borders are hairlines or nothing."
- **Do** keep each accent to its fixed meaning (oxide marks, verdigris OK, ochre warn) and to a handful of uses per page.
- **Do** keep mono at even pixel sizes (the Even-Pixel Rule) and the AAA ledger in `global.css` true.
- **Do** ship the static fallback with every scripted enhancement, and every UI string through the i18n dictionary in both languages.
- **Do** draw art, when a surface earns it, as line work — ASCII logotypes, box-drawn panels, engraving-style borders — never tone.

### Don't:
- **Don't** build dashboard chrome — "grids of bordered cards, admin-panel texture, stat tiles" (PRODUCT.md). One column. Document, not dashboard.
- **Don't** use marketing-site scale — "display headings, hero sections, CTA blocks". Nothing on the site exceeds 19px.
- **Don't** resurrect the references' chrome: no dashed-rule signature (`--dashed` is dead — retire its three remaining citations toward hairline-or-nothing), no grey-and-purple palette, no cloned layouts.
- **Don't** pose tone as art: no 1-bit dithers of photographs or complex images. Line work (ASCII figures) or nothing.
- **Don't** add LinkedIn smell — skill bars, newsletter popups, engagement hooks, "passionate about" copy.
- **Don't** introduce a third typeface, a border-radius, a box-shadow, a gradient, or an arbitrary z-index outside the fixed ladder.
- **Don't** thicken the structural 1px left hairline into a colored side-stripe accent, and never let `--rule` carry text.
- **Don't** animate what can cut. Reverse video snaps; the only tolerated motion is Astro's page crossfade, which `prefers-reduced-motion` already flattens.
