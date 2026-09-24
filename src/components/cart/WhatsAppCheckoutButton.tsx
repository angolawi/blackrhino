"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "@/types/product";
import { AddressInfo, ShippingQuote } from "@/types/shipping";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WhatsAppCheckoutButtonProps {
  items: CartItem[];
  totalAmount: number;
  subtotal?: number;
  shippingQuote?: ShippingQuote | null;
  shippingAddress?: AddressInfo | null;
  className?: string;
  label?: string;
}

export function WhatsAppCheckoutButton({
  items,
  totalAmount,
  subtotal,
  shippingQuote,
  shippingAddress,
  className,
  label = "Finalizar Pedido via WhatsApp",
}: WhatsAppCheckoutButtonProps) {
  const isDisabled = items.length === 0;

  const handleCheckout = () => {
    if (isDisabled) return;
    const url = generateWhatsAppOrderUrl({
      items,
      subtotal: subtotal ?? totalAmount,
      totalAmount,
      shippingQuote,
      shippingAddress,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isDisabled}
      aria-label={label}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg shadow-green-900/20 active:scale-[0.99]",
        isDisabled
          ? "cursor-not-allowed bg-slate-card text-bonewhite-dim border border-slate-border"
          : "bg-green-600 text-white hover:bg-green-500 active:bg-green-700",
        className
      )}
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}
