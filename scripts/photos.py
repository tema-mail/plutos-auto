"""Фото сайта из снятых с plutosauto.ru и Wikimedia исходников → public/img/**.webp.

Запуск: python3 scripts/photos.py <папка с исходниками tild*_*.{jpeg,png}> <папка wikimedia>
Из нескольких копий одного кадра (Тильда хранит превью и оригинал) берётся самая крупная.
"""
import glob, os, re, sys
from PIL import Image

SRC, WM = sys.argv[1], sys.argv[2]
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img')

def biggest(name, only=None):
    files = [f for f in glob.glob(os.path.join(SRC, f'tild*_{name}')) if os.path.getsize(f) > 0]
    if only:  # одно имя файла встречается в разных блоках Тильды – берём только из нужного
        files = [f for f in files if os.path.basename(f).split('_')[0] in only]
    if not files:
        raise SystemExit(f'нет исходника: {name}')
    return max(files, key=lambda f: Image.open(f).size[0] * Image.open(f).size[1])

def save(src, dest, widths=(800, 1600), crop=None, quality=80):
    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
    if crop:  # доля кадра: (лево, верх, право, низ)
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    os.makedirs(os.path.dirname(os.path.join(OUT, dest)), exist_ok=True)
    for wd in widths:
        c = im if im.width <= wd else im.resize((wd, round(im.height * wd / im.width)), Image.LANCZOS)
        c.save(os.path.join(OUT, f'{dest}-{wd}.webp'), 'WEBP', quality=quality, method=6)

# кейсы «150+ авто»: по 4 кадра на машину, порядок как на сайте
CASES = {
    'v300': ['_DSC9168__.jpeg', '_DSC9144__.jpeg', '_DSC9019__.jpeg', '_DSC8688__.jpeg'],
    'rs5': ['_DSC6262__.jpeg', '_DSC6142__.jpeg', '_DSC6175__.jpeg', '_DSC5970__.jpeg'],
    'x5-40d': ['Group_1171274968.png', 'Group_1171274969.png', '_DSC8399__.jpeg', '_DSC8475__.jpeg'],
    'x6-m60i': ['_DSC5953__.jpeg', '_DSC5618__.jpeg', '_DSC5774__.jpeg', '_DSC5937__.jpeg'],
    'x7-40d': ['_DSC0640-__.jpeg', '_DSC0629-__.jpeg', '_DSC0652-__.jpeg', '_DSC0721__.jpeg'],
    'x5m': ['_DSC0535-__.jpeg', '_DSC0515-__.jpeg', '_DSC0556-__.jpeg', '_DSC0572-__.jpeg'],
}
for slug, names in CASES.items():
    for i, n in enumerate(names, 1):
        save(biggest(n), f'cases/{slug}-{i}')

# галерея «Совсем скоро вы познакомитесь…» (BMW X5): 9 кадров в порядке сайта.
# Имена image_2x.png есть и у вырезок в блоке моделей, поэтому – только файлы этого блока.
GALLERY_IDS = {
    'tild3465-3065-4235-a635-343232323037', 'tild6261-3063-4665-a331-663739343834', 'tild3736-3938-4965-a361-396236666366',
    'tild3764-3066-4234-b330-313263626132', 'tild6139-6337-4538-a663-623764373132', 'tild3332-6139-4564-a237-646431303438',
    'tild6363-3961-4363-b766-353062323833', 'tild6165-3333-4631-a235-376263663231', 'tild6264-6138-4731-b666-356164373464',
    'tild3138-3461-4339-b834-613266656161', 'tild3134-6163-4666-b633-303933343161', 'tild6661-3731-4534-a132-643635346236',
    'tild3561-3639-4837-b934-656465383033', 'tild6332-3262-4732-b933-653530346137', 'tild6338-6334-4036-a461-663665623639',
    'tild3336-6130-4264-b563-316461663535', 'tild3732-6261-4763-b865-313463346165', 'tild3133-3930-4966-b261-386530373632',
}
for i, n in enumerate([21, 22, 25, 23, 24, 28, 29, 26, 27], 1):
    save(biggest(f'image_{n}.png', GALLERY_IDS), f'gallery/x5-{i}', widths=(600, 1200))

# фоны и иллюстрации блоков
save(biggest('Group_1171274953.png'), 'bg/nuances', widths=(1200,))
save(biggest('Group_1171274954_1.png'), 'bg/conditions', widths=(1680,))
save(biggest('Group_1171274960_1.png'), 'quiz-phone', widths=(400, 800))
save(biggest('image_20_1.png'), 'quiz-car', widths=(700, 1400))

# партнёры: порядок как на сайте
PARTNERS = ['Mask_group_1.png', 'Mask_group_2.png', 'Mask_group_4.png', 'Mask_group_3.png',
            'Mask_group_5.png', 'Mask_group_6.png', 'Mask_group_7.png', 'logo-new_1.png',
            'Mask_group_8.png', 'Mask_group_9.png', 'logo_1.png', 'logo-vtb-d_1.png',
            'Group_1.png', 'Mask_group_11.png', 'logotype_1_1.png', 'Group_1171274951_1.png']
for i, n in enumerate(PARTNERS, 1):
    save(biggest(n), f'partners/{i:02d}', widths=(480,), quality=90)

# карточки «Модели, которые заказывают чаще всего»: Wikimedia (лицензии – в src/data/cars.ts)
for name, dest, crop in [
    ('cayenne.jpg', 'models/cayenne', None),
    ('911.jpg', 'models/911', None),
    ('g63.jpg', 'models/g63', None),
    ('rr.jpg', 'models/range-rover', None),
]:
    save(os.path.join(WM, name), dest, widths=(800, 1400), crop=crop)
