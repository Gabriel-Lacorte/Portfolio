# lacorte.city

```sh
npm install
npm run dev      # http://localhost:4321, reloads as you edit
npm run build    # -> dist/
npm run preview  # serve dist/
```

## Writing a post

One directory per post, under the locale it is written in.
The numeric prefix orders the source tree.

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
translationKey: "kerberos-attacks"
---
```

## Licences

Iosevka and Departure Mono are SIL OFL 1.1; their licences are in `public/fonts/`.
