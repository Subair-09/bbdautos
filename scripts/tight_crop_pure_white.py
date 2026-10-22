from PIL import Image
import glob
import os

def crop_tight_on_white(image_path, pad_percent=0.03):
    im = Image.open(image_path).convert('RGB')
    gray = im.convert('L')
    # Non-white pixels are < 252
    mask = gray.point(lambda p: 255 if p < 252 else 0)
    bbox = mask.getbbox()
    
    if not bbox:
        print(f"Skipping empty: {image_path}")
        return
    
    # Crop to content
    cropped = im.crop(bbox)
    cw, ch = cropped.size
    
    # Add minimal pad_percent
    pad_w = max(4, int(cw * pad_percent))
    pad_h = max(4, int(ch * pad_percent))
    
    new_w = cw + pad_w * 2
    new_h = ch + pad_h * 2
    
    canvas = Image.new('RGB', (new_w, new_h), (255, 255, 255))
    canvas.paste(cropped, (pad_w, pad_h))
    
    if image_path.lower().endswith('.png'):
        canvas.save(image_path, 'PNG')
    else:
        canvas.save(image_path, 'JPEG', quality=95)
    
    print(f"Tight cropped {os.path.basename(image_path)}: was {im.size} -> now {canvas.size}")

# 1. Products
for p in glob.glob('public/images/products/*.jpg'):
    crop_tight_on_white(p, pad_percent=0.02)

# 2. Clients
for p in glob.glob('public/images/clients/*.*'):
    crop_tight_on_white(p, pad_percent=0.03)

# 3. Brand
for p in glob.glob('public/images/brand/*.*'):
    crop_tight_on_white(p, pad_percent=0.02)

print("\nALL IMAGES TIGHT-CROPPED ON PURE WHITE BACKGROUND SUCCESSFULLY!")
