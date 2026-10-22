export type ProductCategory = 'tyres' | 'trucks' | 'vehicles';

export type QuoteStatus = 
  | 'New' 
  | 'Under Review' 
  | 'Quotation Sent' 
  | 'Accepted' 
  | 'Declined' 
  | 'Closed';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  image: string;
  galleryImages?: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  featured?: boolean;
  inStock?: boolean;
  published?: boolean;
  createdAt: string;
}

export interface BasketItem {
  productId: string;
  name: string;
  brand: string;
  category: ProductCategory;
  specificationSummary: string;
  image: string;
  quantity: number;
  slug: string;
}

export interface QuoteRequest {
  id: string; // RFQ reference code e.g. RFQ-2026-7842
  createdAt: string;
  status: QuoteStatus;
  companyName?: string;
  businessType?: string;
  fullName: string;
  email: string;
  phone: string;
  deliveryLocation: string;
  additionalNotes?: string;
  items: BasketItem[];
  internalNotes?: {
    date: string;
    text: string;
    author: string;
  }[];
  history?: {
    status: QuoteStatus;
    changedAt: string;
    note?: string;
  }[];
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'manager';
}
