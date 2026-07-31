#!/usr/bin/env python3
"""
Checks the hreflang graph in dist/.

    npm run build
    python3 scripts/check-hreflang.py

Three things have to hold or search engines drop the whole set and go
back to guessing, which for a bilingual site means serving half the
readers the wrong language:

  1. every page names itself among its own alternates
  2. every alternate points at a page that exists
  3. that page points back

Number 3 is why this script exists rather than a spot check. The tags
were right in shape and wrong in detail the first time: Astro builds
directory routes so a canonical is `/blog/x/`, while the helper that
built the alternates returned `/blog/x`. Every tag pointed one redirect
away from the page it meant, nothing was reciprocal, and nothing about
the markup looked wrong.

Pages marked `noindex` are skipped — the 404 and the redirect stubs are
not supposed to be in the graph at all.
"""

import re
import sys
from pathlib import Path

DIST = Path(__file__).resolve().parent.parent / "dist"

ALT = re.compile(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"')
CANON = re.compile(r'<link rel="canonical" href="([^"]+)"')
NOINDEX = re.compile(r'<meta name="robots" content="[^"]*noindex')


def path_of(url: str) -> str:
    return re.sub(r"^https?://[^/]+", "", url)


def route_of(file: Path) -> str:
    rel = file.relative_to(DIST).as_posix()
    return "/" + re.sub(r"index\.html$", "", rel)


def main() -> int:
    if not DIST.is_dir():
        raise SystemExit("No dist/. Run `npm run build` first.")

    pages, skipped = {}, 0
    for file in DIST.rglob("*.html"):
        html = file.read_text(encoding="utf8")
        if NOINDEX.search(html):
            skipped += 1
            continue
        canonical = CANON.search(html)
        pages[route_of(file)] = {
            "alts": dict(ALT.findall(html)),
            "canonical": canonical.group(1) if canonical else None,
        }

    # Index by path so an alternate can be resolved with or without its slash.
    by_path = {}
    for route, info in pages.items():
        by_path[route] = info
        by_path[route.rstrip("/") or "/"] = info

    problems = 0
    for route, info in sorted(pages.items()):
        alts = {k: v for k, v in info["alts"].items() if k != "x-default"}
        canonical = path_of(info["canonical"] or "")

        if not alts:
            print(f"NO ALTERNATES   {route}")
            problems += 1
            continue

        if canonical not in {path_of(v) for v in alts.values()}:
            print(f"NO SELF-REF     {route} — canonical {canonical} is not among {sorted(path_of(v) for v in alts.values())}")
            problems += 1

        for lang, href in alts.items():
            target = path_of(href)
            other = by_path.get(target)
            if other is None:
                print(f"DANGLING        {route} -[{lang}]-> {target} does not exist")
                problems += 1
                continue
            if canonical not in {path_of(v) for v in other["alts"].values()}:
                print(f"NOT RECIPROCAL  {route} -[{lang}]-> {target}, which does not point back")
                problems += 1

    print(f"\n{len(pages)} indexable pages checked, {skipped} skipped as noindex")
    print(
        f"{problems} problems"
        if problems
        else "every hreflang set is self-referencing, reciprocal and resolves"
    )
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
