# BBD Autos — Enterprise Commercial Automotive Dealership Website

A complete, production-quality website built for **BBD Autos**, a premier Nigerian automotive dealership and commercial vehicle supplier specializing in tyres, heavy-duty trucks, and commercial vehicles.

Recreated faithfully from the primary BBD Autos design specification, maintaining the exact visual identity, layout proportions, colour hierarchy, typography, product cards, quote basket, and multi-product quotation workflow.

---

## 🎨 Design System & Visual Specification

| Token | Value | Application |
|---|---|---|
| **Primary Red** | `#C91F26` | Primary CTAs, brand highlights, active states, icons |
| **Dark Red Hover**| `#A71920` | Hover states on primary buttons |
| **Charcoal** | `#171B1F` | Benefit strip, Bulk CTA banner, dark footer, primary headings |
| **Dark Secondary Surface** | `#22272D` | Benefit card icons and dark panel dividers |
| **Primary Text** | `#191B1F` | Confident, deep black body and title typography |
| **Secondary Text** | `#6B7077` | Descriptive text, specifications, and breadcrumbs |
| **Main Background**| `#FFFFFF` | Predominant clean white surface |
| **Soft Background**| `#F5F5F5` | Category badges, filter tabs, product card backgrounds |
| **Border** | `#E3E4E6` | Clean fine borders for cards, inputs, and section dividers |

- **Typography**: Clean, confident typography with Inter/Manrope font stack.
- **Logo**: Text-based wordmark: **BBD** in deep black, **AUTOS** in `#C91F26` red.
- **Hero Image**: Prominent red heavy-duty modern cabover truck with silver trailer on an infinity white automotive studio floor, matching the reference's 3/4 frontal perspective.

---

## 🚀 Key Features & Pages

### 1. Public Pages
- **Homepage (`/`)**:
  - Two-column hero with the prominent red heavy-duty truck.
  - Eyebrow: `TYRES · TRUCKS · COMMERCIAL VEHICLES`.
  - Main heading: *"The Right Vehicles. The Right Partners."*
  - Dark charcoal business benefits strip (`Quality Products`, `Business Supply`, `Nationwide Enquiries`).
  - Explore Our Products (3 category cards: Tyres, Trucks, Vehicles).
  - Featured Products (4 responsive automotive cards with specifications).
  - Bulk Supply Quotation CTA with dark macro tyre tread photography.
  - Corporate near-black footer.
- **Product Catalogue (`/products`)**:
  - Live text search across names, brands, categories, and technical specifications.
  - Category pill tabs: *All, Tyres, Trucks, Vehicles*.
  - Left sidebar filters: Category radios, Brand dropdown, Size/Model dropdown, Clear Filters action.
  - Responsive 3-column desktop grid with empty state handling.
- **Category Direct Routes**:
  - `/tyres`: Filtered directly to commercial and heavy-duty tyres.
  - `/trucks`: Filtered to haulage, cargo, and tipper trucks.
  - `/vehicles`: Filtered to commercial vans, pickups, and fleet SUVs.
- **Product Details (`/products/:slug`)**:
  - Breadcrumb navigation (`Home > Category > Product`).
  - Large product photography showcase and thumbnail selector.
  - Key Specifications table (dimensions, ply rating, axle configuration, etc.).
  - Enforced positive integer quantity stepper.
  - Dual actions: **Add to Quote** (with real-time toast alert) and **Request a Quote**.
  - Restrained Product Overview and related products section.
- **Quote Basket (`/quote`)**:
  - Central commercial quotation basket.
  - Clean desktop table & structured mobile cards.
  - Quantity controls, item removal, and "Clear Basket" with confirmation dialog.
  - Client-side persistence via `localStorage` across refreshes and page navigation.
  - Empty state with direct "Explore Products" CTA.
- **Request a Quote (`/request-quote`)**:
  - Clean multi-section form matching the reference:
    - *Company Information* (Company Name, Business Type).
    - *Contact Information* (Full Name, Email, Phone).
    - *Delivery Information* (Delivery Location in Nigeria, Additional Notes).
    - *Selected Products Review* (Item list, specifications, quantities).
  - Server-side validation and sanitization.
  - Unique RFQ Reference generation (e.g. `RFQ-2026-XXXX`).
  - Professional confirmation screen upon submission.
- **About Us (`/about`)**:
  - *"Built on Trust. Focused on Your Business."*
  - 4 core value pillars (*Quality Products*, *Customer Focus*, *Nationwide Reach*, *Professional Support*).
  - Sourcing approach & mission statement.
  - Target client segments (*Fleet operators, construction, transit, dealers*).
- **Contact Us (`/contact`)**:
  - Clean two-column layout with tyre tread visual accent.
  - Serving Nigeria, Email Desk, and Direct Commercial WhatsApp Desk.
  - Working message submission form with database persistence.
- **Legal & SEO**:
  - `/privacy`: Privacy policy.
  - `/terms`: Commercial terms and conditions.
  - `/sitemap.xml`: Dynamic XML sitemap.
  - `/robots.txt`: Search crawler directives.
  - Custom `404` Page: Clean automotive error handler.

---

### 2. Administration Portal
Discreetly accessible via `/admin/login` or the admin link in the footer.

- **Admin Login (`/admin/login`)**:
  - Default Credentials:
    - **Username**: `admin`
    - **Password**: `bbdautos2026`
- **Dashboard Overview (`/admin`)**:
  - Real-time database metrics: Total Products, Published Products, Total RFQs, Pending Review RFQs.
  - Recent quotation requests table with status badges and quick links.
- **RFQ Management (`/admin/quotes` & `/admin/quotes/:id`)**:
  - Status tracking: `New`, `Under Review`, `Quotation Sent`, `Accepted`, `Declined`, `Closed`.
  - Detailed customer contact & Nigerian delivery destination.
  - Full product specifications and requested quantities.
  - Internal notes thread and status update workflow.
- **Product Management (`/admin/products` & `/admin/products/new`)**:
  - View all catalogue products.
  - Instant toggle for *Published* / *Archived* and *In Stock* / *Out of Stock*.
  - Delete product with confirmation modal.
  - Add product form with dynamic Key Specifications builder and high-resolution asset presets.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript.
- **Styling**: Tailwind CSS + Custom Design Tokens.
- **Icons**: Lucide React.
- **Database / Persistence**: JSON-backed atomic file storage (`data/products.json`, `data/quotes.json`, `data/messages.json`) with zero external DB prerequisites.
- **Authentication**: HTTP-Only session cookie verification.
- **SEO**: Meta tags, OpenGraph data, dynamic XML sitemap, robots.txt.

---

## 💻 Running the Application

### Development Server:
```bash
npm run dev
```
The site will run at `http://localhost:3000`.

### Production Build & Run:
```bash
npm run build
npm start
```

### Running Automated Test Suite:
```bash
python test_suite.py
```
Validates the entire end-to-end customer journey, form validation, RFQ generation, persistent storage, and admin management endpoints.
