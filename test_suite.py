import urllib.request
import urllib.error
import json
import http.cookiejar

base_url = 'http://localhost:3000'
results = []

def run_test(name, fn):
    try:
        fn()
        results.append((name, 'PASS', None))
        print(f'✓ {name}')
    except Exception as e:
        results.append((name, 'FAIL', str(e)))
        print(f'✗ {name}: {e}')

# 1. Homepage
def test_homepage():
    req = urllib.request.urlopen(f'{base_url}/')
    assert req.status == 200
    html = req.read().decode('utf-8')
    assert 'The Right Vehicles' in html
    assert 'The Right Partners' in html
    assert 'BBD' in html and 'AUTOS' in html
    assert 'Quality Products' in html
    assert 'Explore Our Products' in html
    assert 'Featured Products' in html

run_test('1. Homepage Layout & Content', test_homepage)

# 2. Catalogue & Categories
def test_catalogue():
    for path in ['/products', '/tyres', '/trucks', '/vehicles']:
        req = urllib.request.urlopen(f'{base_url}{path}')
        assert req.status == 200, f'Status {req.status} for {path}'
        html = req.read().decode('utf-8')
        assert 'Product Catalogue' in html or 'Products' in html

run_test('2. Product Catalogue & Category Routes', test_catalogue)

# 3. Product Details
def test_product_detail():
    req = urllib.request.urlopen(f'{base_url}/products/truck-tyre-295-80r22-5')
    assert req.status == 200
    html = req.read().decode('utf-8')
    assert 'Truck Tyre' in html
    assert '295/80R22.5' in html
    assert 'Radial' in html
    assert 'Key Specifications' in html
    assert 'Add to Quote' in html

run_test('3. Product Details & Technical Specs', test_product_detail)

# 4. Public Supporting Pages
def test_supporting_pages():
    for p in ['/about', '/contact', '/privacy', '/terms', '/quote', '/request-quote', '/sitemap.xml', '/robots.txt']:
        req = urllib.request.urlopen(f'{base_url}{p}')
        assert req.status == 200, f'Status {req.status} for {p}'

run_test('4. Supporting Pages & SEO Assets', test_supporting_pages)

# 5. RFQ Submission API
submitted_rfq_id = None
def test_rfq_submission():
    global submitted_rfq_id
    payload = {
        'fullName': 'Emeka Okafor',
        'email': 'emeka.okafor@trans-nigeria-logistics.com',
        'phone': '+234 803 111 2233',
        'companyName': 'Trans-Nigeria Heavy Haulage Ltd',
        'businessType': 'Fleet Logistics Operator',
        'deliveryLocation': 'Apapa Port Terminal, Lagos',
        'additionalNotes': 'Need 20 tyres and 2 heavy trucks delivered before month-end.',
        'items': [
            {
                'productId': 'prod-truck-tyre-295-80r22',
                'name': 'Truck Tyre',
                'brand': 'Premium Brand',
                'category': 'tyres',
                'specificationSummary': '295/80R22.5 · Radial',
                'image': '/images/products/commercial_truck_tyre.jpg',
                'quantity': 20,
                'slug': 'truck-tyre-295-80r22-5'
            },
            {
                'productId': 'prod-heavy-duty-truck-6x4',
                'name': 'Heavy-Duty Truck',
                'brand': 'Reliable Brand',
                'category': 'trucks',
                'specificationSummary': '6x4 · Cargo',
                'image': '/images/hero/red_heavy_truck_hd.jpg',
                'quantity': 2,
                'slug': 'heavy-duty-truck-6x4-cargo'
            }
        ]
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(f'{base_url}/api/quotes', data=data, headers={'Content-Type': 'application/json'}, method='POST')
    res = urllib.request.urlopen(req)
    assert res.status == 200
    res_data = json.loads(res.read().decode('utf-8'))
    assert res_data['success'] is True
    assert 'quote' in res_data
    assert res_data['quote']['id'].startswith('RFQ-2026-')
    submitted_rfq_id = res_data['quote']['id']

run_test('5. Multi-Product RFQ Submission & ID Generation', test_rfq_submission)

# 6. RFQ Validation (Empty items or missing fields)
def test_rfq_validation():
    payload = {'fullName': 'Test'}
    data = json.dumps(payload).encode('utf-8')
    try:
        req = urllib.request.Request(f'{base_url}/api/quotes', data=data, headers={'Content-Type': 'application/json'}, method='POST')
        urllib.request.urlopen(req)
        assert False, 'Should have failed with 400'
    except urllib.error.HTTPError as e:
        assert e.code == 400

run_test('6. Server-side RFQ Validation', test_rfq_validation)

# 7. Contact Form Submission
def test_contact_submission():
    payload = {
        'fullName': 'Amina Bello',
        'email': 'amina.bello@abuja-fleet.ng',
        'phone': '+234 809 555 6677',
        'subject': 'Bulk Supply Enquiry',
        'message': 'Inquiring about 15-seater passenger buses for corporate staff mobility in Abuja.'
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(f'{base_url}/api/contact', data=data, headers={'Content-Type': 'application/json'}, method='POST')
    res = urllib.request.urlopen(req)
    assert res.status == 200
    res_data = json.loads(res.read().decode('utf-8'))
    assert res_data['success'] is True

run_test('7. Contact Enquiry API & Storage', test_contact_submission)

# 8. Admin Auth & Workflow
def test_admin_workflow():
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

    # Unauthorized access fails
    try:
        opener.open(f'{base_url}/api/admin/stats')
        assert False, 'Should fail 401'
    except urllib.error.HTTPError as e:
        assert e.code == 401

    # Login with valid credentials
    login_data = json.dumps({'username': 'admin', 'password': 'bbdautos2026'}).encode('utf-8')
    login_req = urllib.request.Request(f'{base_url}/api/admin/auth/login', data=login_data, headers={'Content-Type': 'application/json'}, method='POST')
    login_res = opener.open(login_req)
    assert login_res.status == 200

    # Check stats
    stats_res = opener.open(f'{base_url}/api/admin/stats')
    assert stats_res.status == 200
    stats = json.loads(stats_res.read().decode('utf-8'))['stats']
    assert stats['totalProducts'] >= 8
    assert stats['totalQuotes'] >= 1

    # Update RFQ status
    if submitted_rfq_id:
        update_data = json.dumps({'status': 'Under Review', 'note': 'Sales engineer assigned to review logistics'}).encode('utf-8')
        patch_req = urllib.request.Request(f'{base_url}/api/admin/quotes/{submitted_rfq_id}', data=update_data, headers={'Content-Type': 'application/json'}, method='PATCH')
        patch_res = opener.open(patch_req)
        assert patch_res.status == 200
        updated_q = json.loads(patch_res.read().decode('utf-8'))['quote']
        assert updated_q['status'] == 'Under Review'

    # Create new product
    prod_data = json.dumps({
        'name': 'Test Haulage Flatbed Semi-Trailer',
        'brand': 'Reliable Brand',
        'category': 'trucks',
        'subcategory': 'Semi-Trailer',
        'shortDescription': 'Tri-axle flatbed cargo semi-trailer with container twist-locks.',
        'specifications': {'Axles': '3 x 13-Tonne FUWA', 'Length': '40 ft', 'Payload': '50 Tonnes'}
    }).encode('utf-8')
    create_req = urllib.request.Request(f'{base_url}/api/admin/products', data=prod_data, headers={'Content-Type': 'application/json'}, method='POST')
    create_res = opener.open(create_req)
    assert create_res.status == 200
    new_prod = json.loads(create_res.read().decode('utf-8'))['product']
    assert 'id' in new_prod

run_test('8. Admin Authentication, RFQ Workflow & Product Creation', test_admin_workflow)

print('\n================ TEST SUMMARY ================')
all_passed = True
for name, status, err in results:
    msg = f'[{status}] {name}'
    if err:
        msg += f' - Error: {err}'
        all_passed = False
    print(msg)
print('==============================================')
if all_passed:
    print('ALL 8 INTEGRATION & END-TO-END TESTS PASSED!')
else:
    exit(1)
