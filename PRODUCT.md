# Product

## Register

brand

## Users

Fellow systems and security engineers — kernel, hypervisor, compiler, and AD-security people — usually arriving from a link to one specific writeup (search, a forum, another blog). They read on their own terms, often beside an open terminal, and they are allergic to being marketed at.

Secondary readers: recruiters and the retro/indie-web crowd. Both are welcome; neither is catered to.

The job to be done: read one post to the end, conclude "this person actually takes things apart", and maybe wander to another post or the homepage.

## Product Purpose

lacorte.city is Gabriel Lacorte's systems-engineering notebook — hypervisors, compilers, operating systems, and the protocols that hold them together — published as a bilingual (en / pt-BR) static Astro site. It exists so the work can speak for itself: writeups deep enough that a finished read IS the conversion. Success looks like a post read to the end, a bookmark, a return visit when the next one lands. There is deliberately no funnel: no newsletter, no tracking, no CTA.

## Brand Personality

**terse · warm · exacting**

First person, dry, allergic to posturing (no proficiency bars, no "passionate about" copy). The site presents as a terminal session — every section is the output of a command he would actually run — but a human is visibly behind the prompt: a changelog in the first person, floating windows you can close and drag, 88×31 buttons free to hotlink. Warmth over polish. Document, not dashboard.

## Anti-references

Largely codified in the manifesto atop `src/styles/global.css`; kept here deliberately:

- **Dashboard chrome.** Grids of bordered cards, admin-panel texture, stat tiles. This is a DOCUMENT: one column, top to bottom.
- **Marketing-site scale.** Display headings, hero sections, CTA blocks. Headings stay body-size; hierarchy comes from command lines and the inverted chip, not from size.
- **The references' own chrome.** bezu.dev and kin supplied the register (terminal, 1-bit, no ornament) — not the moves. No dashed-rule signature, no grey-and-purple palette, no cloned layouts.
- **Tone posing as art.** 1-bit dithers of complex images are static, not illustration. Line work or nothing; no decorative images on a page whose substance is text.
- **LinkedIn smell.** Self-assessed skill bars, engagement hooks, newsletter popups, anything performing competence instead of demonstrating it.

## Design Principles

1. **The command is the heading.** Every section is the output of something he would actually run (`$ whoami`, `$ ls ~/writing`, `$ systemctl status lab`). A new surface must find its command, not invent chrome.
2. **One base pair; accents counted on one hand.** Bone on ink. Oxide, verdigris, and ochre each appear a few times per page with fixed meanings (links/marks, ok, warn). An accent used more than ~4 times is decoration and gets cut.
3. **Reading is the conversion.** Every choice is judged by whether it helps a peer finish a post: measure, contrast, and code-block legibility outrank any flourish.
4. **JS is garnish, never load-bearing.** With scripting off the site works completely (windows sit in the flow, copy buttons vanish). The "no javascript" claim in the copy means no *required* JavaScript — keep it true.
5. **Warmth over polish.** Prefer the handmade move — first-person changelog, closable windows, hotlinkable buttons — to the professional one.

## Accessibility & Inclusion

- **Contrast: AAA**, documented per color for both themes in the `global.css` header (bone 15.20:1, oxide 7.38:1, verdigris 8.90:1, ochre 9.83:1 on ink). Keep that table true when the palette moves; `--rule` (2.16:1) never carries text.
- **Works without JavaScript** — everything scripted is a progressive enhancement with a sensible static fallback.
- `prefers-reduced-motion` honored globally; print stylesheet; skip link; `sr-only` page headings.
- **Bilingual en / pt-BR as equals**: every UI string flows through the typed dictionary (a missing pt-BR key is a build error), untranslated posts show a fallback notice rather than silently switching language.
- **Keyboard**: `:focus-visible` shares the reverse-video hover treatment everywhere interactive.
