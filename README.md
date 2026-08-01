# lacorte.city

A static, bilingual notebook. Astro, no client framework, no tracking, no
third-party requests. The pages are the output of commands.

```sh
npm install
npm run dev      # http://localhost:4321, reloads as you edit
npm run build    # -> dist/
npm run preview  # serve dist/
```

---

## Writing a post

One directory per post, under the locale it is written in. The numeric
prefix orders the source tree and never appears in a URL.

```
src/content/blog/
├── en/
│   ├── 00-kerberos-attacks/index.mdx
│   └── 01-home-server-guide/index.mdx
└── pt-br/
    └── 00-kerberos-attacks/index.mdx
```

```yaml
---
title: "Kerberos Attacks"
description: "Some ways to hack Kerberos"
date: "2024-05-04"
tags: ["active-directory", "kerberos"]
translationKey: "kerberos-attacks"    # required
---
```

`translationKey` is the URL and the link between languages. The same key in
`en/` and `pt-br/` makes one post available at `/blog/<key>` and
`/pt-br/blog/<key>`, and the language switcher moves between them.

**Do not set `slug`.** Astro requires slugs unique across the whole
collection, so a post and its translation collide. Routing keys off
`translationKey` instead.

**Translation is optional.** A locale with no translation yet serves the
English original with a visible notice, so nothing 404s and no post is
blocked on being translated first.

Changing an existing post's URL? Add the old path to `redirects` in
`astro.config.mjs` so shared links keep working.

---

## Diagrams

`<Figure>` takes ASCII art and handles framing, caption, mobile scrolling
and the text alternative.

```mdx
import Figure from "@components/ascii/Figure.astro";

<Figure label="fig.1" caption="What it shows." alt="Prose description.">
{`
 client                      KDC · krbtgt
   │                              │
   ├─────────────────────────────►│
`}
</Figure>
```

`alt` is required. Without it a screen reader gets several hundred box
characters read one at a time, which is worse than no figure at all.

Two things that will bite:

- **Draw with box characters, not tone.** A character cell is 8×15 pixels
  carrying five grey levels. Line art works; a shaded illustration comes
  out as noise. If you want a picture, use a picture.
- **ASCII arrowheads only: `>`, `<`, `->`, `v`.** Iosevka draws every
  Unicode arrow and geometric shape at *two* cells — `►` `◄` `→` `⇒` `▼`
  `▶`, all of them, and the em dash too. One in a line makes that line a
  cell longer than its neighbours, so a box that is square in the editor
  renders crooked and nothing in the source shows it. `node
  scripts/check-figures.mjs` measures every character against the cell
  and fails on anything that is not exactly one.
- **Check the columns line up.** Iosevka advances 0.5em per cell, so an
  odd font-size puts every glyph on a half pixel and a solid `───` renders
  dashed. Figure type is pinned to even sizes for that reason.

---

## Colour and type

Everything lives in `:root` in `src/styles/global.css`. `--blood` is the
signature and the only red that carries text; `--blood-deep` and
`--blood-dark` are fills and never do.

**Check contrast when you change a colour, and check it against the right
background.** The syntax palette was verified against the page background
while code blocks had their own darker one, and a comment token sat at
4.36:1 for a while because of it. Current numbers, on `#0a0507`: bone
16.15:1, dim 7.08:1, blood 6.23:1 — and every syntax token clears 4.5:1
against `#1f0509`.

**Focus is an outline, declared once and never turned off.** The site's
hover and focus idiom is reverse video, which works everywhere except on
a control that is *already* reversed — the current page in the menu, the
current locale, the current theme, an open window's taskbar button.
Focusing one of those changed nothing at all, so a keyboard user tabbing
the header could not tell where they were: 71 controls across the site,
every one of them in its selected state. Seven rules had bundled
`:hover` and `:focus-visible` together with `outline: none`, which was
only ever there to suppress the browser default. An outline sits outside
the box, so it reads on an inverted element and a plain one alike, in
both themes, and it does not move anything.

Printing works, and is checked by rendering to PDF rather than assumed:
controls are hidden (the menu, the copy buttons, the theme switch all
printed as live-looking widgets that cannot be pressed), outbound link
addresses are printed after the text — an article on paper with
underlined words and no URLs loses every reference it makes — and
figures, code blocks and headings do not break across a page edge.

`prefers-reduced-motion` disables the view transitions too. The usual
`*, *::before, *::after` rule does not reach them: they animate
`::view-transition-old(root)` and `::view-transition-new(root)`, which
are not elements. The site cross-faded on every navigation for someone
who had asked it not to — the only animation on the whole site, and the
one that rule missed.

Two faces, on purpose. Departure Mono is the chrome: menu, headings,
windows, buttons. It is a pixel display face and long prose in it is
tiring, so article body text is Iosevka, which is drawn to be read at
length.

Each stack carries a **stand-in** face — a system monospace with
`size-adjust` set to the measured advance ratio (83% for Iosevka's
0.5em, 106.3% for Departure's 0.64em, against ~0.6em system faces).
Without them the swap from the fallback to the webfont rewraps every
line and the page jumps: measured on a throttled connection, that reflow
was the *only* source of layout shift on the site — CLS 0.0169 with the
webfonts and exactly 0 with them blocked. With the stand-ins it is 0
either way.

**Order in `--mono` is load-bearing.** Departure, then the stand-in, then
Iosevka. Iosevka has to stay in the chain because Departure is missing
four box-drawing characters — but put it *ahead* of the stand-in and it
also catches ordinary letters while Departure is still in flight, at
0.5em against 0.64em, and the page reflows twice as the two webfonts
land ~90ms apart. CLS went straight back to 0.045. The stand-in carves
`U+2500-25FF` out of its own `unicode-range` so box characters fall past
it to Iosevka and letters do not.

---

## Interface strings

`src/i18n/ui.ts`, one dictionary per locale.

```ts
const t = useTranslations(locale);
t("nav.blog")
```

The English dictionary defines the `UIKey` type, so a missing or misspelt
Portuguese key fails the build rather than leaving an English word in the
middle of a Portuguese page. Add a key to `en` first; TypeScript will then
demand it in `ptBR`.

---

## Generated assets

Icons, 88×31 buttons and the subset fonts in `public/` are generated and
committed. `scripts/gen-assets.py` is how they are made.

```sh
pip install pillow fonttools
python3 scripts/gen-assets.py            # everything
python3 scripts/gen-assets.py icons      # one group
```

**Rerun it after any palette change** — for the buttons. They are baked
pixels, and they were left behind in an old palette once already with
nothing to warn you.

The icons no longer have that problem. They are rendered as white-on-
transparent masks and painted with `currentColor`, so they follow the
text colour of whatever they sit in. As coloured PNGs they were stranded
twice, and on the paper theme they measured 1.04:1 against the
background — invisible. A mask cannot go stale.

The font job needs the upstream package first:

```sh
npm install --no-save @fontsource/iosevka
python3 scripts/gen-assets.py fonts
```

That subsets Iosevka from ~960KB to ~19KB a weight. The unicode range is
not optional: Google Fonts strips box drawing from its own subsets, so a
stock webfont would silently drop `┌─┐│` to a fallback face with different
metrics and misalign every diagram.

---

## Layout constraints worth knowing

- The column is 984px. Floating windows only detach at 1712px, which is
  where the arithmetic says they fit: `984 + 2 * (340 + 24)`. Keep the gap
  in that sum and the gap the default placement insets by as one constant.
  They drifted apart once — threshold derived with 16, placement insetting
  by 24 — and a window overlapped the prose by exactly those 6px.
- Prose is capped at 72 characters. The cap sits on the prose elements, not
  on the article container — put it on the container and diagrams and
  pasted hashes get squeezed to reading width too.
- `minmax(min(44ch, 100%), 1fr)`, never a bare `minmax(44ch, 1fr)`: the
  bare form refuses to go below 44ch and overflows a narrow phone.
- Grid and flex children need `min-width: 0`. They default to `auto` and
  will not shrink below their content, and one long unbreakable string is
  enough to stretch a panel past the viewport.

---

## Checks

```sh
npm run build
node scripts/check-links.mjs             # internal only, offline
node scripts/check-links.mjs --external  # also hits the network
python3 scripts/check-hreflang.py        # the two languages agree
node scripts/check-figures.mjs           # every figure cell is one cell
```

`check-figures.mjs` needs `playwright` resolvable from the project — it
is a check you run, not a build dependency. It serves `dist/` itself, so
there is no preview server to start first. (`NODE_PATH` does not work for
this: ES module resolution ignores it.)

All of it runs on every push through `.github/workflows/ci.yml`, plus
weekly for the external links — the web moves under a site that is not
being touched.

Exits non-zero on the first broken link, so it drops into CI as-is.
Internal links resolve against the files the build actually wrote, and
the site's own canonical URLs count as internal — fetching those checks
what is *deployed*, which on an unmerged branch is a different site.

It exists because a link rotted in public: the home-server post pointed
at `debian-12.5.0-amd64-netinst.iso` inside `current/`, and `current`
had become Debian 13. **Do not pin a filename inside a directory that
moves** — link the project's download page instead.

`check-hreflang.py` is the same idea for the language pairs. Each page
names its sibling in the other language, and search engines discard the
whole set unless every link is reciprocal and every URL is *exactly* the
target's canonical. Astro builds directory routes, so a canonical is
`/blog/x/` while `localised()` returns `/blog/x` — the first version
pointed every tag one redirect away from the page it meant. The markup
looked perfect. Only the graph showed it.

Two rules fall out of that, both enforced by the script:

- **A page that serves borrowed text is not the canonical.** An
  untranslated post still answers at its Portuguese URL, with the English
  body and a notice. That URL points its canonical at the English
  original and drops its own `hreflang="pt-BR"` claim, so the two do not
  compete for the same words.
- **Anything unindexable stays out of the graph.** The 404 and the
  redirect stubs carry `noindex` and no alternates.

---

## Headers

`vercel.json` is generated, not written:

```sh
npm run build            # includes `gen-headers.mjs --check`
npm run headers          # regenerate after changing the inline script
```

The CSP carries a SHA-256 of the one inline script — the pre-paint theme
switch, which has to stay inline or the page flashes light before the
stylesheet corrects it. Hashing it is what keeps `script-src` strict;
`'unsafe-inline'` would hand any injected `<script>` the same permission.

The hash and the script live in different files, so editing one silently
breaks the other: the policy stops matching, the browser blocks the
script, and the only symptom is the theme flash coming back. `npm run
build` runs `--check` and fails on the mismatch. Verified by editing the
script and watching the build exit 1.

`style-src` keeps `'unsafe-inline'`. Astro emits scoped styles as inline
`<style>` blocks that change with every component edit, and chasing those
hashes would break far more often than it protects anything.

Two exemptions, both deliberate:

- **`/buttons/`** gets `Cross-Origin-Resource-Policy: cross-origin`. The
  88×31 button's own alt text says "free to hotlink", and the site-wide
  `same-origin` is exactly the header that stops that working.
- **`/_astro/` and `/fonts/`** are immutable for a year. Their filenames
  are fingerprinted; everything else revalidates.

The whole set is verified by replaying it over the preview server and
loading all 17 pages: zero CSP violations, zero JS errors, theme switch
and window dragging still working, and the button still loading from a
foreign origin.

---

## Structured data and feeds

Posts carry a `BlogPosting` JSON-LD block; nothing else carries anything,
because nothing else has anything structured to say. `mainEntityOfPage`
is the *canonical*, not the current URL, so a borrowed Portuguese route
points at the English article it duplicates instead of announcing itself
as a second work — the same rule the hreflang set follows.

`headline` is the article title, not the `<title>`: the `<title>` carries
the " | Gabriel Lacorte" suffix meant for a browser tab, and it shipped
inside the headline once.

The two feeds are per locale, and both had the trailing-slash bug the
hreflang tags had — every entry pointing one redirect away from the
article. The Portuguese channel also pointed its `<link>` at the English
home page.

---

## Still to fill in

`src/consts.ts` has `TODO(gabriel)` on the parts that need your word:

- **`USES`** — the workstation rows were read off the machine (Debian 13
  and the CPU/RAM/GPU from `/proc` and `lspci`, VS Code from
  `~/.config/Code`, bash from your login shell). Check them. There is
  also a `~/.config/fish`, so the shell row is the likeliest to be wrong.
- **`PROJECTS`** — now the GitHub repositories, newest first. The two
  2024 web projects, notio and license-manager, were dropped rather than
  kept at the bottom.
- **`READING`** — one real entry. It used to carry two rows that said
  "add yours" on the live site.

A row set to `"—"` renders as `(unset)`, which is a useful marker while
you fill something in and a bad thing to publish. Prefer leaving the row
out.

---

## Licences

Site content © Gabriel Lacorte. Iosevka and Departure Mono are SIL OFL 1.1;
their licences are in `public/fonts/`.
