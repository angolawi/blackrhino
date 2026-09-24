"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Currency } from "@/types/product";
import { AddressInfo, ShippingQuote } from "@/types/shipping";
import { fetchAddressByCep, getShippingQuotes, isValidCep } from "@/lib/shipping";
import { SHIPPING_CONFIG } from "@/data/shippingRates";

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

  // Frete & Endereço Brasileiro
  shippingCep: string;
  shippingAddress: AddressInfo | null;
  shippingQuotes: ShippingQuote[];
  selectedShippingQuote: ShippingQuote | null;
  isCalculatingShipping: boolean;
  shippingError: string | null;
  calculateShipping: (cep: string) => Promise<boolean>;
  selectShippingQuote: (quoteId: string) => void;
  clearShipping: () => void;
  shippingCost: number;
  finalTotal: number;
}

const FREE_SHIPPING_THRESHOLD_BRL = SHIPPING_CONFIG.freeShippingThreshold;

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

  // Estados de Frete
  const [shippingCep, setShippingCep] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<AddressInfo | null>(null);
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuote[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState<boolean>(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  // Carregar do localStorage
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

      const storedCep = localStorage.getItem("blackrhino_shipping_cep");
      const storedAddr = localStorage.getItem("blackrhino_shipping_address");
      if (storedCep) setShippingCep(storedCep);
      if (storedAddr) {
        try {
          setShippingAddress(JSON.parse(storedAddr));
        } catch {
          // ignore parsing error
        }
      }
    } catch (e) {
      console.error("Failed loading cart state", e);
    }
    setIsHydrated(true);
  }, []);

  // Sincronizar carrinho com localStorage
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

  // Recalcular cotações automaticamente se o subtotal ou itens mudarem
  useEffect(() => {
    if (!shippingAddress || items.length === 0) {
      if (items.length === 0) {
        setShippingQuotes([]);
        setSelectedQuoteId(null);
      }
      return;
    }

    let isCurrent = true;
    getShippingQuotes(shippingAddress, subtotal, items).then((quotes) => {
      if (!isCurrent) return;
      setShippingQuotes(quotes);
      setSelectedQuoteId((prev) => {
        if (prev && quotes.some((q) => q.id === prev)) {
          return prev;
        }
        return quotes.length > 0 ? quotes[0].id : null;
      });
    });

    return () => {
      isCurrent = false;
    };
  }, [items, subtotal, shippingAddress]);

  const calculateShipping = async (rawCep: string): Promise<boolean> => {
    if (!isValidCep(rawCep)) {
      setShippingError("CEP inválido. Digite 8 números.");
      return false;
    }

    setIsCalculatingShipping(true);
    setShippingError(null);

    try {
      const address = await fetchAddressByCep(rawCep);
      if (!address) {
        setShippingError("CEP não encontrado. Verifique e tente novamente.");
        setIsCalculatingShipping(false);
        return false;
      }

      setShippingCep(address.cep);
      setShippingAddress(address);

      try {
        localStorage.setItem("blackrhino_shipping_cep", address.cep);
        localStorage.setItem("blackrhino_shipping_address", JSON.stringify(address));
      } catch {
        // ignore
      }

      const quotes = await getShippingQuotes(address, subtotal, items);
      setShippingQuotes(quotes);
      if (quotes.length > 0) {
        setSelectedQuoteId(quotes[0].id);
      }

      setIsCalculatingShipping(false);
      return true;
    } catch (err) {
      console.error("Erro ao calcular frete:", err);
      setShippingError("Erro ao calcular frete. Tente novamente.");
      setIsCalculatingShipping(false);
      return false;
    }
  };

  const selectShippingQuote = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
  };

  const clearShipping = () => {
    setShippingCep("");
    setShippingAddress(null);
    setShippingQuotes([]);
    setSelectedQuoteId(null);
    setShippingError(null);
    try {
      localStorage.removeItem("blackrhino_shipping_cep");
      localStorage.removeItem("blackrhino_shipping_address");
    } catch {
      // ignore
    }
  };

  const selectedShippingQuote = shippingQuotes.find((q) => q.id === selectedQuoteId) || null;
  const shippingCost = selectedShippingQuote ? selectedShippingQuote.price : 0;
  const finalTotal = subtotal + shippingCost;

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

        // Frete
        shippingCep,
        shippingAddress,
        shippingQuotes,
        selectedShippingQuote,
        isCalculatingShipping,
        shippingError,
        calculateShipping,
        selectShippingQuote,
        clearShipping,
        shippingCost,
        finalTotal,
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
