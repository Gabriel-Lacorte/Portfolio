# Product

## Register

brand

## Users

Fellow systems and security engineers arriving from a writeup link, a CVE reference, or the WebCírculo BR webring — here to read one specific post and judge whether the author knows their stuff. Secondary: hiring managers and collaborators doing due diligence via GitHub/LinkedIn. Bilingual audience: English-first, with pt-BR as a first-class locale, not a translation afterthought.

## Product Purpose

lacorte.city is Gabriel Lacorte's personal site: a notebook of what he finds when he takes things apart — Windows internals, Kerberos, ransomware, compilers, homelab plumbing — plus the projects that came out of it (CVEs, side-channel research, tooling). Success looks like: a peer reads one post, trusts the author enough to read another, and the site itself demonstrates the craft it describes.

## Brand Personality

The focus is **building**: systems creation and development, mostly around compilers and Windows internals. Offensive security is the other half — genuinely loved, deeply practised, and the subject of most of the writing — but it follows the building rather than leading it. Copy and ordering should reflect that: engineer first, attacker second, never "security researcher" as the headline.

The unifying stance is **"I take things apart"** — the site is the notebook, so the writing leans toward analysis and attack even though the work leans toward construction. Curious, not edgy. Three moods held deliberately in tension:

- **Dry workshop honesty** — the baseline register. Plain, precise, zero theater; the terminal as an honest tool. Content is presented as command output, not marketing.
- **Ominous precision** — the visual signature. Blood-red on near-black, horror-adjacent restraint: the quiet menace of a machine that knows too much. Lean into the red.
- **Personal-web warmth** — the human layer. 88x31 badges, webring membership, ASCII play, hand-made details. Nostalgic friendliness, never corporate.

Menacing in palette, welcoming in copy.

## Anti-references

- **Corporate dev-portfolio**: hero headshot, skill bars, "Hi, I'm Gabriel 👋", card grids, testimonial energy.
- **Hollywood hacker kitsch**: Matrix-green glitch text, scanlines, neon "cyber" gradients, gratuitous skull ASCII. The menace is quiet or it isn't menace.
- **Sanitized minimal blog**: Medium/Substack-style reading experience, friendly rounded sans, character sanded off.
- **Heavy JS showpiece**: WebGL scroll-jacking, cursor trails, motion for its own sake — the site advertises a no-JS button and must deserve it.

## Design Principles

1. **The terminal is real, not costume.** Shell metaphors (`$ whoami`, floating windows, the taskbar) must behave like the real thing: honest output, windows that degrade to static panels, monospace grids that align. If a metaphor can't be executed faithfully, don't use it.
2. **Demonstrate, don't claim.** No skill bars, no buzzwords. Competence shows through writeups, working details, and facts surfaced from the actual deploy (commit hash, word counts, build date).
3. **Quiet menace, warm host.** Blood-red and near-black set the mood; the copy stays plain and welcoming. Menace lives in restraint — never kitsch.
4. **Works with the power off.** Every feature has a no-JS fallback; print styles, RSS, and semantic HTML are part of the design, not afterthoughts.
5. **Both locales are home.** pt-BR is a parallel first-class site — every design decision must survive translation (longer strings, different idioms).

## Accessibility & Inclusion

- WCAG 2.2 AA as the formal bar: contrast verified in **both** dark and light themes, including syntax-highlighting tokens and the red accent on dark.
- No-JS first-class: every interactive feature ships a working fallback (floating windows render as static asides; theme honors `color-scheme`).
- Reduced-motion alternative for every animation; visible keyboard focus everywhere (2px blood outline); skip link; sr-only headings; `aria-current` nav state.
- Bilingual parity: `lang` attributes, hreflang alternates, translated UI strings enforced at the type level.
