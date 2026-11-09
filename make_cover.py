# 《吃灰》封面：16:9（1920x1080）和 4:3（1440x1080）各一张。
# 底图不是从成片截帧（成片每帧都有歌词条），而是 src/scenes/cover.js 专门画的：
#   左下阿灰举着手机一脸陶醉，右上一柜落灰的小鸡，最后一格新来的那只还亮着。4:3 用 cover43（三列机柜，内容收在中间 1440 宽）。
# 标题「吃灰」用华文中宋、纯米白、拉开字距，只加一层柔和暗影；放在左上空白处，避开脸、手机和机柜，右下角留给时长角标。
# 用法：python make_cover.py → out/cover/吃灰_封面_16x9.jpg、_4x3.jpg
# 标题字体是 Windows 自带的华文中宋；其他系统改 FONT 指向任意中文衬线字体。

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
OUT = HERE / "out" / "cover"
FONT = "C:/Windows/Fonts/STZHONGS.TTF"   # 华文中宋
COLOR = (240, 234, 222)                 # 米白
TRACKING = 0.32
TITLE = "吃灰"


def base(loop):
    d = HERE / "out" / loop
    subprocess.run(["node", "render.mjs", f"--loop={loop}", "--stills=0.5", f"--out=out/{loop}"], cwd=HERE, check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return Image.open(d / "t0_50.png").convert("RGB")


def title_layer(size):
    f = ImageFont.truetype(FONT, size)
    track = int(size * TRACKING)
    widths = [f.getlength(ch) for ch in TITLE]
    asc, desc = f.getmetrics()
    pad = 60
    w = int(sum(widths) + track * (len(TITLE) - 1)) + pad * 2
    h = asc + desc + pad * 2
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    x = pad
    for ch, cw in zip(TITLE, widths):
        d.text((x, pad), ch, font=f, fill=255)
        x += cw + track
    shadow = m.filter(ImageFilter.GaussianBlur(size // 14)).point(lambda v: int(v * 0.6))
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out.paste((60, 30, 20, 255), (6, 8), shadow)
    out.paste(COLOR + (255,), (0, 0), m)
    return out


def compose(im, size, cx, cy):
    lay = title_layer(size)
    im.paste(lay, (int(cx - lay.width / 2), int(cy - lay.height / 2)), lay)
    return im


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    wide = compose(base("cover169"), 240, 450, 260)
    p = OUT / "吃灰_封面_16x9.jpg"
    wide.save(p, quality=95)
    print("wrote", p, wide.size)

    four = compose(base("cover43").crop((240, 0, 1680, 1080)), 200, 320, 250)
    p = OUT / "吃灰_封面_4x3.jpg"
    four.save(p, quality=95)
    print("wrote", p, four.size)


if __name__ == "__main__":
    main()
