# lacort.ee

```sh
npm install
npm run dev      # http://localhost:4321, reloads as you edit
npm run build    # -> dist/ + nginx.conf + headers.conf
npm run preview  # serve dist/
```

## Deploy

Static output, served from a Raspberry Pi behind a cloudflared tunnel —
no inbound ports open on the router, Cloudflare terminates TLS and takes
the DDoS/WAF load before traffic ever reaches the Pi.

```sh
npm run build    # astro check + build + nginx/headers generation
rsync -a --delete dist/ pi:/var/www/lacort.ee/
```

`nginx.conf` and `headers.conf` are regenerated on every build by
`scripts/gen-headers.mjs` (it hashes the inline scripts into the CSP, so
a stale header file fails CI). On the Pi, `nginx.conf` is the site's
server block and `headers.conf` the snippet it includes; cloudflared
points the tunnel at nginx's port. The writeup lives at
`/blog/home-server-guide`.

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
