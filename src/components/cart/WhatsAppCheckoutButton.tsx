"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "@/types/product";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WhatsAppCheckoutButtonProps {
  items: CartItem[];
  totalAmount: number;
  className?: string;
}

export function WhatsAppCheckoutButton({
  items,
  totalAmount,
  className,
}: WhatsAppCheckoutButtonProps) {
  const isDisabled = items.length === 0;

  const handleCheckout = () => {
    if (isDisabled) return;
    const url = generateWhatsAppOrderUrl(items, totalAmount);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isDisabled}
      aria-label="Finalizar pedido via WhatsApp"
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
        isDisabled
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" />
      Finalizar Pedido via WhatsApp
    </button>
  );
}
