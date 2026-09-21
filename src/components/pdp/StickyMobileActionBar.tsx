"use client";

import React from "react";
import { Product, GiCut } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingBag } from "lucide-react";

interface StickyMobileActionBarProps {
  product: Product;
  selectedCut: GiCut | string;
  onOpenQuickSelect: () => void;
}

export function StickyMobileActionBar({
  product,
  selectedCut,
  onOpenQuickSelect,
}: StickyMobileActionBarProps) {
  const { addItem, formatPrice } = useCart();
  const { language, t } = useLanguage();
  const stock = product.inventory[selectedCut as GiCut] ?? 4;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      colorName: product.colorName,
      cut: selectedCut,
      price: product.price,
      image: product.images.primary,
      quantity: 1,
    });
  };

  return (
    <div className="fixed bottom-14 inset-x-0 z-30 bg-obsidian-950/95 backdrop-blur-md border-t border-slate-border p-3 lg:hidden shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Cut & Stock summary button */}
        <button
          onClick={onOpenQuickSelect}
          className="flex flex-col text-left px-3 py-1.5 bg-slate-surface border border-slate-border rounded-lg"
        >
          <span className="text-[10px] font-mono text-bonewhite-dim uppercase">
            {language === "pt" ? "Tam" : "Cut"}
          </span>
          <span className="text-xs font-mono font-bold text-rhinogold">
            {selectedCut || (language === "pt" ? "Escolher" : "Select")}
          </span>
          {stock <= 4 && stock > 0 && (
            <span className="text-[9px] font-mono text-matred font-bold animate-pulse">
              {stock} {language === "pt" ? "restantes" : "left"}
            </span>
          )}
        </button>

        {/* Price & Instant Add Button */}
        <div className="flex-1 flex items-center space-x-2">
          <button
            onClick={handleAdd}
            className="flex-1 bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md shadow-rhinogold/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t("addToMatBag")} • {formatPrice(product.price)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
