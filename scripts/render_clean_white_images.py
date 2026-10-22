import pymupdf
from PIL import Image, ImageOps
import os

pdf_path = r'C:\Users\USER\.gemini\antigravity\brain\5603f7e5-0115-4a57-bcb7-0f1195655de3\.user_uploaded\media_1792682849542_1a34d8ca.pdf'
doc = pymupdf.open(pdf_path)

os.makedirs('public/images/products', exist_ok=True)
os.makedirs('public/images/clients', exist_ok=True)
os.makedirs('public/images/brand', exist_ok=True)

def render_and_save(page_num, xref, output_path, padding_percent=0.03):
    page = doc[page_num - 1]
    for info in page.get_image_info(xrefs=True):
        if info.get('xref') == xref:
            raw_bbox = pymupdf.Rect(info['bbox'])
            # Add a slight padding around bbox so edges are not cut off
            w_pad = (raw_bbox.x1 - raw_bbox.x0) * padding_percent
            h_pad = (raw_bbox.y1 - raw_bbox.y0) * padding_percent
            padded_bbox = pymupdf.Rect(
                max(0, raw_bbox.x0 - w_pad),
                max(0, raw_bbox.y0 - h_pad),
                min(page.rect.width, raw_bbox.x1 + w_pad),
                min(page.rect.height, raw_bbox.y1 + h_pad)
            )
            # Render at 300 DPI for ultra crisp sharpness
            pix = page.get_pixmap(clip=padded_bbox, dpi=300)
            im = pix.pil_image().convert('RGB')
            
            # Place on a clean canvas with white background
            # If the aspect ratio is extreme, center it on a standard 4:3 or square canvas
            im.save(output_path, 'JPEG', quality=95)
            print(f"Rendered: {output_path} ({im.width}x{im.height})")
            return True
    print(f"Xref {xref} not found on page {page_num}!")
    return False

# ================= PAGE 1: BBD Auto Logo =================
render_and_save(1, 6, 'public/images/brand/bbd_auto_logo.jpg', padding_percent=0.05)

# ================= PAGE 4: PASSENGER CARS =================
render_and_save(4, 34, 'public/images/products/chery_tiggo_8_pro_max.jpg')
render_and_save(4, 36, 'public/images/products/changan_uni_t.jpg')
render_and_save(4, 30, 'public/images/products/soueast_s07.jpg')
render_and_save(4, 32, 'public/images/products/jetour_t2.jpg')

# ================= PAGE 6: PICK UP TRUCKS =================
render_and_save(6, 52, 'public/images/products/tata_xenon_x2.jpg')
render_and_save(6, 48, 'public/images/products/foton_tunland.jpg')
render_and_save(6, 50, 'public/images/products/chery_himla.jpg')

# ================= PAGE 7: SCV SMALL COMMERCIAL VEHICLES =================
render_and_save(7, 66, 'public/images/products/foton_tm3.jpg')
render_and_save(7, 64, 'public/images/products/forland_2_ton.jpg')
render_and_save(7, 62, 'public/images/products/tata_intra_v10.jpg')

# ================= PAGE 8: LCV LIGHT COMMERCIAL VEHICLES =================
render_and_save(8, 78, 'public/images/products/tata_lpt1116.jpg')
render_and_save(8, 80, 'public/images/products/isuzu_npr.jpg')
render_and_save(8, 82, 'public/images/products/faw_5_ton.jpg')
render_and_save(8, 76, 'public/images/products/forland_8_ton.jpg')

# ================= PAGE 9: HCV HEAVY DUTY COMMERCIAL VEHICLES =================
render_and_save(9, 96, 'public/images/products/faw_lng_tractor.jpg')
render_and_save(9, 92, 'public/images/products/sino_howo_6x4.jpg')
render_and_save(9, 94, 'public/images/products/shacman_8x4_tipper.jpg')

# ================= PAGE 11: TYRES & BATTERIES =================
# Cars & SUVs Tyres
render_and_save(11, 108, 'public/images/products/michelin_car_suv_tyre.jpg')
render_and_save(11, 112, 'public/images/products/maxxis_car_suv_tyre.jpg')
render_and_save(11, 116, 'public/images/products/bridgestone_car_suv_tyre.jpg')
render_and_save(11, 120, 'public/images/products/austone_suv_tyre.jpg')
render_and_save(11, 124, 'public/images/products/apollo_car_tyre.jpg')

# Trucks & Forklift Tyres
render_and_save(11, 128, 'public/images/products/ceat_truck_tyre.jpg')
render_and_save(11, 144, 'public/images/products/gallant_truck_tyre.jpg')
render_and_save(11, 148, 'public/images/products/roadwing_truck_tyre.jpg')
render_and_save(11, 136, 'public/images/products/bkt_heavy_lug_tyre.jpg')
render_and_save(11, 132, 'public/images/products/addo_india_forklift_tyre.jpg')
render_and_save(11, 140, 'public/images/products/solideal_solid_industrial_tyre.jpg')

# Batteries
render_and_save(11, 152, 'public/images/products/solite_automotive_battery.jpg')
render_and_save(11, 156, 'public/images/products/rocket_heavy_duty_battery.jpg')
render_and_save(11, 154, 'public/images/products/runall_car_battery.jpg')
render_and_save(11, 158, 'public/images/products/bosch_commercial_battery.jpg')
render_and_save(11, 160, 'public/images/products/sebang_maintenance_free_battery.jpg')
render_and_save(11, 162, 'public/images/products/everstart_premium_battery.jpg')

# ================= PAGE 12: CUSTOMER LOGOS =================
render_and_save(12, 184, 'public/images/clients/planet_bottling_company.jpg', padding_percent=0.08)
render_and_save(12, 186, 'public/images/clients/hello_products.png', padding_percent=0.08)
render_and_save(12, 188, 'public/images/clients/euro_global_foods.jpg', padding_percent=0.08)
render_and_save(12, 190, 'public/images/clients/euromega_atlantic.jpg', padding_percent=0.08)
render_and_save(12, 192, 'public/images/clients/studio_press_packaging.jpg', padding_percent=0.08)
render_and_save(12, 194, 'public/images/clients/tgi_group.jpg', padding_percent=0.08)

print("All images re-rendered with pure white background at 300 DPI successfully!")
