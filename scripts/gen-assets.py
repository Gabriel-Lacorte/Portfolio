#!/usr/bin/env python3

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

BONE = "#ece4e2"
INK = "#0a0507"
BLOOD = "#ff4d5c"
DIM = "#a39694"
GREEN = "#4fd67f"
AMBER = "#e8b04b"

MASK = "#ffffff"
PIXELS = {".": None}

ICONS = {
    "term": [
        "................", ".xxxxxxxxxxxxxx.", ".x............x.", ".x.oo.........x.",
        ".x...oo.......x.", ".x.oo.........x.", ".x............x.", ".x..dddd......x.",
        ".x............x.", ".x............x.", ".xxxxxxxxxxxxxx.", "................",
        "................", "................", "................", "................",
    ],
    "disk": [
        "................", "..xxxxxxxxxxxx..", "..x..........x..", "..x.dddddddd.x..",
        "..x.d......d.x..", "..x.d..oo..d.x..", "..x.d......d.x..", "..x.dddddddd.x..",
        "..x..........x..", "..x.dddddddd.x..", "..x.d......d.x..", "..xxxxxxxxxxxx..",
        "................", "................", "................", "................",
    ],
    "book": [
        "................", "...xxxxxxxxxx...", "...x........x...", "...x.dddddd.x...",
        "...x........x...", "...x.dddddd.x...", "...x........x...", "...x.oooo...x...",
        "...x........x...", "...xxxxxxxxxx...", "....x......x....", "................",
        "................", "................", "................", "................",
    ],
    "chip": [
        "................", "....x.x.x.x.....", "..xxxxxxxxxxx...", "..x.........x...",
        "x.x.oooooooo.x..", "..x.o......o.x..", "x.x.o......o.x..", "..x.o......o.x..",
        "x.x.oooooooo.x..", "..x.........x...", "..xxxxxxxxxxx...", "....x.x.x.x.....",
        "................", "................", "................", "................",
    ],
    "note": [
        "................", ".........xxxxx..", ".........x...x..", ".........x...x..",
        ".........x......", ".........x......", ".........x......", "..dddd...x......",
        ".doooood.x......", ".doooood.xxx....", ".doooood.doox...", "..dddd...doox...",
        ".........dddd...", "................", "................", "................",
    ],
    "star": [
        "................", "................", ".......o........", "......ooo.......",
        "....ooooooo.....", ".ooooooooooooo..", "..ooooooooooo...", "...ooooooooo....",
        "....ooooooo.....", "...ooo...ooo....", "..oo.......oo...", "................",
        "................", "................", "................", "................",
    ],
    "warn": [
        "................", "................", ".......g........", "......ggg.......",
        "......g.g.......", ".....g.g.g......", ".....g.g.g......", "....g..g..g.....",
        "....g..g..g.....", "...g.......g....", "...ggggggggg....", "................",
        "................", "................", "................", "................",
    ],
    "mail": [
        "................", "................", "..xxxxxxxxxxxx..", "..x..........x..",
        "..xx........xx..", "..x.dd....dd.x..", "..x...dddd...x..", "..x..........x..",
        "..xxxxxxxxxxxx..", "................", "................", "................",
        "................", "................", "................", "................",
    ],
}


def build_icons() -> None:
    out = PUBLIC / "icons"
    out.mkdir(parents=True, exist_ok=True)
    for name, grid in ICONS.items():
        assert len(grid) == 16 and all(len(r) == 16 for r in grid), name
        im = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
        px = im.load()
        for y, row in enumerate(grid):
            for x, ch in enumerate(row):
                if ch != ".":
                    px[x, y] = (*bytes.fromhex(MASK[1:]), 255)
        im.save(out / f"{name}.png")
    print(f"icons    -> {len(ICONS)} files in public/icons/")


# ── 88x31 buttons ──────────────────────────────────────────────────────
# The webring tradition. Drawn at native size and served with
# image-rendering: pixelated, so they stay crisp.

BUTTONS = {
    "lacorte": ([("lacorte", BONE, 12), (".city", BLOOD, 11)], BLOOD),
    # "no javascript" was a lie: the site ships ~18KB of it for the theme
    # switch, the draggable windows and the copy buttons. What is true is
    # that none of it is required, scripting off, every page still works.
    "nojs": ([("works without", GREEN, 9), ("javascript", BONE, 10)], GREEN),
    "astro": ([("built with", DIM, 9), ("A S T R O", BONE, 10)], DIM),
}


# Where the display face may live. Deliberately a fixed list: the first
# version of this globbed **/ under $HOME, which walks the entire home
# directory and hangs on any machine with a large one.
FONT_CANDIDATES = (
    ROOT / "vendor" / "DepartureMono-Regular.otf",
    ROOT / "vendor" / "DepartureMono-Regular.ttf",
    Path.home() / ".local/share/fonts/DepartureMono-Regular.otf",
    Path.home() / ".fonts/DepartureMono-Regular.otf",
    Path("/usr/share/fonts/opentype/DepartureMono-Regular.otf"),
    Path("/usr/local/share/fonts/DepartureMono-Regular.otf"),
)


def find_display_font() -> Path:
    """Departure Mono, in one of the places it is normally kept."""
    for path in FONT_CANDIDATES:
        if path.is_file():
            return path
    listed = "\n  ".join(str(p) for p in FONT_CANDIDATES)
    raise SystemExit(
        "Departure Mono (.otf) not found. Get it from https://departuremono.com\n"
        f"and put it at one of:\n  {listed}"
    )


def build_buttons() -> None:
    font_path = find_display_font()
    out = PUBLIC / "buttons"
    out.mkdir(parents=True, exist_ok=True)
    for name, (lines, accent) in BUTTONS.items():
        im = Image.new("RGB", (88, 31), INK)
        d = ImageDraw.Draw(im)
        d.rectangle([0, 0, 87, 30], outline=accent)
        d.rectangle([1, 1, 86, 29], outline=INK)
        y = 4 if len(lines) > 1 else 9
        for text, colour, size in lines:
            f = ImageFont.truetype(str(font_path), size)
            w = d.textbbox((0, 0), text, font=f)[2]
            d.text(((88 - w) // 2, y), text, font=f, fill=colour)
            y += size + 1
        im.save(out / f"{name}.png")
    print(f"buttons  -> {len(BUTTONS)} files in public/buttons/")


# ── fonts ──────────────────────────────────────────────────────────────
# Iosevka ships ~960KB per weight. Subsetting to what the site actually
# draws takes it to ~19KB. The range matters: Google Fonts strips box
# drawing from its subsets, which would silently break every ASCII figure
# by dropping ┌─┐│ to a fallback face with different metrics.

SUBSET = ",".join([
    "U+0020-007E",   # basic latin
    "U+00A0-00FF",   # latin-1, accented characters for pt-BR
    "U+0100-017F",   # latin extended-A
    "U+2010-2027",   # dashes and quotes
    "U+2030-205E",   # general punctuation
    "U+2190-21FF",   # arrows
    "U+2500-257F",   # box drawing
    "U+2580-259F",   # block elements
    "U+25A0-25FF",   # geometric shapes
    "U+2713,U+2717",
])


def build_fonts() -> None:
    from fontTools import subset

    src_dir = ROOT / "node_modules" / "@fontsource" / "iosevka" / "files"
    if not src_dir.exists():
        raise SystemExit(
            "Install the source first:  npm install --no-save @fontsource/iosevka"
        )
    out = PUBLIC / "fonts"
    out.mkdir(parents=True, exist_ok=True)
    for weight in ("400", "600"):
        src = src_dir / f"iosevka-latin-{weight}-normal.woff2"
        dst = out / f"iosevka-{weight}.woff2"
        subset.main([
            str(src), f"--unicodes={SUBSET}", "--flavor=woff2",
            f"--output-file={dst}", "--layout-features=",
            "--no-hinting", "--desubroutinize",
        ])
        before = src.stat().st_size // 1024
        after = dst.stat().st_size // 1024
        print(f"fonts    -> iosevka-{weight}.woff2  {before}KB -> {after}KB")


JOBS = {"icons": build_icons, "buttons": build_buttons, "fonts": build_fonts}

if __name__ == "__main__":
    wanted = sys.argv[1:] or list(JOBS)
    unknown = [w for w in wanted if w not in JOBS]
    if unknown:
        raise SystemExit(f"unknown: {', '.join(unknown)}. Pick from {', '.join(JOBS)}.")
    for job in wanted:
        JOBS[job]()
