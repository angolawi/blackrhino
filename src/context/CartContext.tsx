"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Currency } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUsd: number) => string;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD_BRL = 350;

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: string }> = {
  BRL: { rate: 1.0, symbol: "R$", prefix: "R$ " },
  USD: { rate: 0.18, symbol: "$", prefix: "$" },
  EUR: { rate: 0.16, symbol: "€", prefix: "€" },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<Currency>("BRL");
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("blackrhino_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCurr = localStorage.getItem("blackrhino_currency") as Currency;
      if (storedCurr && CURRENCY_RATES[storedCurr]) {
        setCurrency(storedCurr);
      } else {
        setCurrency("BRL");
      }
    } catch (e) {
      console.error("Failed loading cart state", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("blackrhino_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed persisting cart state", e);
    }
  }, [items, isHydrated]);

  const setAppCurrency = (c: Currency) => {
    setCurrency(c);
    try {
      localStorage.setItem("blackrhino_currency", c);
    } catch (e) {
      console.error("Failed persisting currency", e);
    }
  };

  const addItem = (itemData: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === itemData.productId && i.cut === itemData.cut
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += itemData.quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          ...itemData,
          id: `${itemData.productId}-${itemData.cut}-${Date.now()}`,
        };
        return [...prev, newItem];
      }
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_BRL - subtotal);

  const formatPrice = (amountInBrl: number): string => {
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES.BRL;
    const converted = amountInBrl * config.rate;
    if (currency === "BRL") {
      return `${config.prefix}${converted.toFixed(2).replace(".", ",")}`;
    }
    return `${config.prefix}${converted.toFixed(2)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD_BRL,
        amountUntilFreeShipping,
        currency,
        setCurrency: setAppCurrency,
        formatPrice,
        isCheckoutOpen,
        openCheckout: () => {
          setIsOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
