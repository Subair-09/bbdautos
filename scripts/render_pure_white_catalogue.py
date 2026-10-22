import pymupdf
import io
import os
import re
from PIL import Image

pdf_path = r'C:\Users\USER\.gemini\antigravity\brain\5603f7e5-0115-4a57-bcb7-0f1195655de3\.user_uploaded\media_1792682849542_1a34d8ca.pdf'
doc = pymupdf.open(pdf_path)

os.makedirs('public/images/products', exist_ok=True)
os.makedirs('public/images/clients', exist_ok=True)
os.makedirs('public/images/brands', exist_ok=True)
os.makedirs('public/images/brand', exist_ok=True)

def process_image_with_smask(xref, output_path, target_aspect=(4, 3), pad_percent=0.08):
    # 1. Extract RGB
    rgb_bytes = doc.extract_image(xref)['image']
    rgb_im = Image.open(io.BytesIO(rgb_bytes)).convert('RGB')
    
    # 2. Extract SMask
    obj = doc.xref_object(xref)
    m = re.search(r'/SMask\s+(\d+)\s+0\s+R', obj)
    if m:
        smask_xref = int(m.group(1))
        mask_im = pymupdf.Pixmap(doc, smask_xref).pil_image().convert('L')
        # Ensure mask matches rgb size
        if mask_im.size != rgb_im.size:
            mask_im = mask_im.resize(rgb_im.size, Image.Resampling.LANCZOS)
        rgb_im.putalpha(mask_im)
    else:
        # If no smask, convert to RGBA
        rgb_im = rgb_im.convert('RGBA')
    
    # 3. Create a canvas with pure white background
    w, h = rgb_im.size
    
    # We want a standard canvas with target_aspect (e.g. 4:3) and padding
    # Calculate canvas dimensions
    tw, th = target_aspect
    content_w = int(w / (1.0 - 2 * pad_percent))
    content_h = int(h / (1.0 - 2 * pad_percent))
    
    # Fit into target aspect ratio
    if content_w / content_h > tw / th:
        canvas_w = content_w
        canvas_h = int(content_w * th / tw)
    else:
        canvas_h = content_h
        canvas_w = int(content_h * tw / th)
    
    canvas_w = max(canvas_w, w + 20)
    canvas_h = max(canvas_h, h + 20)
    
    # Create pure white canvas
    white_canvas = Image.new('RGB', (canvas_w, canvas_h), (255, 255, 255))
    
    # Center the item on the canvas
    paste_x = (canvas_w - w) // 2
    paste_y = (canvas_h - h) // 2
    
    # Paste using alpha mask
    white_canvas.paste(rgb_im, (paste_x, paste_y), rgb_im)
    
    # Save
    if output_path.lower().endswith('.png'):
        white_canvas.save(output_path, 'PNG')
    else:
        white_canvas.save(output_path, 'JPEG', quality=95)
    
    # Verification
    tl = white_canvas.getpixel((0, 0))
    br = white_canvas.getpixel((canvas_w - 1, canvas_h - 1))
    print(f"Processed: {output_path} | Size: {canvas_w}x{canvas_h} | Corners: TL={tl}, BR={br}")
    return True

# ================= 1. OFFICIAL BBD AUTO LOGO =================
process_image_with_smask(6, 'public/images/brand/bbd_auto_logo.jpg', target_aspect=(3, 2), pad_percent=0.08)
process_image_with_smask(6, 'public/images/brand/bbd_auto_logo.png', target_aspect=(3, 2), pad_percent=0.08)

# ================= 2. PASSENGER CARS =================
process_image_with_smask(34, 'public/images/products/chery_tiggo_8_pro_max.jpg', target_aspect=(4, 3))
process_image_with_smask(36, 'public/images/products/changan_uni_t.jpg', target_aspect=(4, 3))
process_image_with_smask(30, 'public/images/products/soueast_s07.jpg', target_aspect=(4, 3))
process_image_with_smask(32, 'public/images/products/jetour_t2.jpg', target_aspect=(4, 3))

# ================= 3. PICKUP TRUCKS =================
process_image_with_smask(52, 'public/images/products/tata_xenon_x2.jpg', target_aspect=(4, 3))
process_image_with_smask(48, 'public/images/products/foton_tunland.jpg', target_aspect=(4, 3))
process_image_with_smask(50, 'public/images/products/chery_himla.jpg', target_aspect=(4, 3))

# ================= 4. SCV SMALL COMMERCIAL VEHICLES =================
process_image_with_smask(66, 'public/images/products/foton_tm3.jpg', target_aspect=(4, 3))
process_image_with_smask(64, 'public/images/products/forland_2_ton.jpg', target_aspect=(4, 3))
process_image_with_smask(62, 'public/images/products/tata_intra_v10.jpg', target_aspect=(4, 3))

# ================= 5. LCV LIGHT COMMERCIAL VEHICLES =================
process_image_with_smask(78, 'public/images/products/tata_lpt1116.jpg', target_aspect=(4, 3))
process_image_with_smask(80, 'public/images/products/isuzu_npr.jpg', target_aspect=(4, 3))
process_image_with_smask(82, 'public/images/products/faw_5_ton.jpg', target_aspect=(4, 3))
process_image_with_smask(76, 'public/images/products/forland_8_ton.jpg', target_aspect=(4, 3))

# ================= 6. HCV HEAVY DUTY COMMERCIAL VEHICLES =================
process_image_with_smask(96, 'public/images/products/faw_lng_tractor.jpg', target_aspect=(4, 3))
process_image_with_smask(92, 'public/images/products/sino_howo_6x4.jpg', target_aspect=(4, 3))
process_image_with_smask(94, 'public/images/products/shacman_8x4_tipper.jpg', target_aspect=(4, 3))

# ================= 7. TYRES =================
# Cars & SUVs
process_image_with_smask(108, 'public/images/products/michelin_car_suv_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(112, 'public/images/products/maxxis_car_suv_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(116, 'public/images/products/bridgestone_car_suv_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(120, 'public/images/products/austone_suv_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(124, 'public/images/products/apollo_car_tyre.jpg', target_aspect=(1, 1))

# Trucks & Forklifts
process_image_with_smask(128, 'public/images/products/ceat_truck_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(144, 'public/images/products/gallant_truck_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(148, 'public/images/products/roadwing_truck_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(136, 'public/images/products/bkt_heavy_lug_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(132, 'public/images/products/addo_india_forklift_tyre.jpg', target_aspect=(1, 1))
process_image_with_smask(140, 'public/images/products/solideal_solid_industrial_tyre.jpg', target_aspect=(1, 1))

# ================= 8. BATTERIES =================
process_image_with_smask(152, 'public/images/products/solite_automotive_battery.jpg', target_aspect=(4, 3))
process_image_with_smask(156, 'public/images/products/rocket_heavy_duty_battery.jpg', target_aspect=(4, 3))
process_image_with_smask(154, 'public/images/products/runall_car_battery.jpg', target_aspect=(4, 3))
process_image_with_smask(158, 'public/images/products/bosch_commercial_battery.jpg', target_aspect=(4, 3))
process_image_with_smask(160, 'public/images/products/sebang_maintenance_free_battery.jpg', target_aspect=(4, 3))
process_image_with_smask(162, 'public/images/products/everstart_premium_battery.jpg', target_aspect=(4, 3))

# ================= 9. CUSTOMER LOGOS =================
process_image_with_smask(184, 'public/images/clients/planet_bottling_company.jpg', target_aspect=(16, 9), pad_percent=0.1)
process_image_with_smask(186, 'public/images/clients/hello_products.png', target_aspect=(16, 9), pad_percent=0.1)
process_image_with_smask(188, 'public/images/clients/euro_global_foods.jpg', target_aspect=(16, 9), pad_percent=0.1)
process_image_with_smask(190, 'public/images/clients/euromega_atlantic.jpg', target_aspect=(16, 9), pad_percent=0.1)
process_image_with_smask(192, 'public/images/clients/studio_press_packaging.jpg', target_aspect=(16, 9), pad_percent=0.1)
process_image_with_smask(194, 'public/images/clients/tgi_group.jpg', target_aspect=(16, 9), pad_percent=0.1)

print("\nALL ASSETS PROCESSED WITH AUTHENTIC TRANSPARENCY MASKS ONTO PURE WHITE CANVASES!")
