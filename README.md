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

Two faces, on purpose. Departure Mono is the chrome: menu, headings,
windows, buttons. It is a pixel display face and long prose in it is
tiring, so article body text is Iosevka, which is drawn to be read at
length.

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

- The column is 984px. Floating windows only detach above 1740px, which is
  where the arithmetic says they fit: the gutter is `(100vw - 984) / 2` and
  a 340px window plus gaps needs 372px of it.
- Prose is capped at 72 characters. The cap sits on the prose elements, not
  on the article container — put it on the container and diagrams and
  pasted hashes get squeezed to reading width too.
- `minmax(min(44ch, 100%), 1fr)`, never a bare `minmax(44ch, 1fr)`: the
  bare form refuses to go below 44ch and overflows a narrow phone.
- Grid and flex children need `min-width: 0`. They default to `auto` and
  will not shrink below their content, and one long unbreakable string is
  enough to stretch a panel past the viewport.

---

## Still to fill in

`src/consts.ts` has `TODO(gabriel)` on the parts only you can write:
`USES` (editor, shell, terminal, machine), `READING`, and `PROJECTS`,
which still lists what was on the old Neocities site.

---

## Licences

Site content © Gabriel Lacorte. Iosevka and Departure Mono are SIL OFL 1.1;
their licences are in `public/fonts/`.
