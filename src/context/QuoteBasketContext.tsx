'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BasketItem } from '@/types';

interface QuoteBasketContextType {
  items: BasketItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearBasket: () => void;
  isInBasket: (productId: string) => boolean;
  totalCount: number;
  lastAddedName: string | null;
  clearLastAdded: () => void;
}

const QuoteBasketContext = createContext<QuoteBasketContextType | undefined>(undefined);

const STORAGE_KEY = 'bbdautos_quote_basket_v1';

export function QuoteBasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load basket from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save basket to localStorage:', e);
    }
  }, [items, isInitialized]);

  const addItem = (product: Product, quantity: number = 1) => {
    const qty = Math.max(1, quantity);
    let specSummary = '';
    if (product.category === 'tyres') {
      const size = product.specifications['Size'] || '';
      const type = product.specifications['Type'] || '';
      specSummary = [size, type].filter(Boolean).join(' · ');
    } else if (product.category === 'trucks') {
      const model = product.specifications['Model'] || product.specifications['Drive Configuration'] || '6x4';
      specSummary = `${model} · Cargo`;
    } else {
      const model = product.specifications['Model'] || '4x4';
      const type = product.specifications['Vehicle Type'] || 'SUV';
      specSummary = `${model} · ${type}`;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          specificationSummary: specSummary || product.brand,
          image: product.image,
          quantity: qty,
          slug: product.slug,
        },
      ];
    });

    setLastAddedName(product.name);
    setTimeout(() => {
      setLastAddedName(null);
    }, 3500);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const isInBasket = (productId: string) => {
    return items.some((item) => item.productId === productId);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const clearLastAdded = () => setLastAddedName(null);

  return (
    <QuoteBasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        isInBasket,
        totalCount,
        lastAddedName,
        clearLastAdded,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  );
}

export function useQuoteBasket() {
  const context = useContext(QuoteBasketContext);
  if (!context) {
    throw new Error('useQuoteBasket must be used within a QuoteBasketProvider');
  }
  return context;
}
