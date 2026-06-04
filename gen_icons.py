from PIL import Image, ImageDraw
import os

OUT = os.path.dirname(os.path.abspath(__file__))
BG = (193, 95, 60, 255)    # #C15F3C terracotta (accento Argo)
FG = (255, 255, 255, 255)

def make(size, maskable=False):
    SS = 4                 # super-sampling per bordi morbidi
    S = size * SS
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        d.rectangle([0, 0, S, S], fill=BG)               # full-bleed
        pts = [(0.32, 0.53), (0.45, 0.66), (0.70, 0.39)]  # check nella safe-zone
    else:
        d.rounded_rectangle([0, 0, S, S], radius=int(S * 0.225), fill=BG)
        pts = [(0.30, 0.53), (0.44, 0.67), (0.72, 0.36)]
    P = [(int(x * S), int(y * S)) for x, y in pts]
    w = int(S * 0.095)
    d.line(P, fill=FG, width=w, joint="curve")
    r = w // 2
    for (x, y) in P:                                       # cap arrotondati
        d.ellipse([x - r, y - r, x + r, y + r], fill=FG)
    return img.resize((size, size), Image.LANCZOS)

make(192).save(os.path.join(OUT, "icon-192.png"))
make(512).save(os.path.join(OUT, "icon-512.png"))
make(512, maskable=True).save(os.path.join(OUT, "icon-maskable-512.png"))
make(180, maskable=True).convert("RGB").save(os.path.join(OUT, "apple-touch-icon.png"))
print("icons written to", OUT)
