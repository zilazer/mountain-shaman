from __future__ import annotations

import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "dist/assets/field-records"
FONT = Path("/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf")

RECORDS = (
    ("001", 29.88563390, 121.65065004),
    ("002", 29.87178956, 121.62689254),
    ("003", 29.87191456, 121.62686096),
    ("004", 29.88632227, 121.63400794),
)


def snapshot_url(latitude: float, longitude: float) -> str:
    point = f"{longitude},{latitude}"
    return (
        "https://api.map.baidu.com/staticimage"
        f"?center={point}&width=900&height=900&zoom=18&markers={point}"
    )


def label_snapshot(source: bytes, number: str, output: Path) -> None:
    image = Image.open(BytesIO(source)).convert("RGB")
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(str(FONT), 34)
    x = image.width // 2 + 24
    y = image.height // 2 - 70
    text_box = draw.textbbox((0, 0), number, font=font, anchor="lt")
    width = text_box[2] - text_box[0]
    height = text_box[3] - text_box[1]
    padding_x = 14
    padding_y = 10
    draw.rounded_rectangle(
        (x, y, x + width + padding_x * 2, y + height + padding_y * 2),
        radius=4,
        fill=(17, 19, 18),
        outline=(232, 229, 219),
        width=2,
    )
    draw.text(
        (x + padding_x, y + padding_y),
        number,
        font=font,
        fill=(232, 229, 219),
        anchor="lt",
    )
    image.save(output, quality=92, optimize=True)


def main() -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    for number, latitude, longitude in RECORDS:
        url = snapshot_url(latitude, longitude)
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        snapshot = urllib.request.urlopen(request, timeout=30).read()
        label_snapshot(snapshot, number, ASSET_DIR / f"map-{number}.jpg")


if __name__ == "__main__":
    main()
