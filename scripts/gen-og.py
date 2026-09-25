#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "vendor" / "DepartureMono-Regular.otf"
OUT = ROOT / "public" / "og.png"

BG = "#060606"
BASE = "#ededed"
ACCENT = "#eb242a"
GREEN = "#4fd67f"
RULE = "#50171c"

W, H = 1200, 630

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

big = ImageFont.truetype(str(FONT), 132)
small = ImageFont.truetype(str(FONT), 30)


def advance(text, font):
    return draw.textlength(text, font=font)


DOT = "■"
head = "lacort"
tail = "ee"
gap = 26
total = advance(head, big) + gap + 96 + gap + advance(tail, big)
x = (W - total) / 2
y = 190
ascent, descent = big.getmetrics()

draw.text((x, y), head, font=big, fill=BASE)
x += advance(head, big) + gap
block_y = y + ascent - 92
draw.rectangle([x, block_y, x + 96, block_y + 92], fill=ACCENT)
x += 96 + gap
draw.text((x, y), tail, font=big, fill=BASE)

rule_y = y + ascent + 58
draw.line([(70, rule_y), (W - 70, rule_y)], fill=RULE, width=2)

py = rule_y + 42
draw.text((70, py), "$", font=small, fill=GREEN)
draw.text((70 + advance("$ ", small) + 18, py), "whoami", font=small, fill=BASE)
draw.text(
    (70, py + 54),
    "gabriel lacorte  ·  systems engineer",
    font=small,
    fill=BASE,
)

img.save(OUT, "PNG", optimize=True)
print(f"{OUT} written ({OUT.stat().st_size // 1024} KB)")
