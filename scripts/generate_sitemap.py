import json
from datetime import datetime

with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

base_url = 'https://www.bbdautosng.com'
now = datetime.now().strftime('%Y-%m-%d')

static_pages = [
    ('/', '1.0', 'daily'),
    ('/products', '0.9', 'daily'),
    ('/trucks', '0.9', 'weekly'),
    ('/tyres', '0.9', 'weekly'),
    ('/batteries', '0.9', 'weekly'),
    ('/vehicles', '0.9', 'weekly'),
    ('/request-quote', '0.8', 'monthly'),
    ('/about', '0.7', 'monthly'),
    ('/contact', '0.7', 'monthly'),
    ('/privacy', '0.3', 'yearly'),
    ('/terms', '0.3', 'yearly'),
]

xml = ['<?xml version="1.0" encoding="UTF-8"?>']
xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for path, prio, freq in static_pages:
    url = base_url + path
    xml.append('  <url>')
    xml.append(f'    <loc>{url}</loc>')
    xml.append(f'    <lastmod>{now}</lastmod>')
    xml.append(f'    <changefreq>{freq}</changefreq>')
    xml.append(f'    <priority>{prio}</priority>')
    xml.append('  </url>')

for p in products:
    url = f"{base_url}/products/{p['slug']}"
    created = p.get('createdAt', now)[:10]
    xml.append('  <url>')
    xml.append(f'    <loc>{url}</loc>')
    xml.append(f'    <lastmod>{created}</lastmod>')
    xml.append('    <changefreq>weekly</changefreq>')
    xml.append('    <priority>0.8</priority>')
    xml.append('  </url>')

xml.append('</urlset>')

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml))

print('Wrote public/sitemap.xml with', len(static_pages) + len(products), 'URLs')
