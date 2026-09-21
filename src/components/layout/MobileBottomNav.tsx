"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Sparkles, ShoppingBag, Layers } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();
  const { language, t } = useLanguage();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-obsidian-950/95 backdrop-blur-lg border-t border-slate-border py-2 px-3 lg:hidden">
      <div className="flex items-center justify-around">
        <Link
          href="/collections"
          className={`flex flex-col items-center py-1 px-2 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
            pathname === "/collections"
              ? "text-rhinogold font-bold"
              : "text-bonewhite-muted hover:text-bonewhite"
          }`}
        >
          <Shield className="w-5 h-5 mb-1" />
          <span>{language === "pt" ? "Kimonos" : "Shop Gis"}</span>
        </Link>

        <Link
          href="/#weave-matrix"
          className="flex flex-col items-center py-1 px-2 rounded text-[10px] font-mono uppercase tracking-wider text-bonewhite-muted hover:text-bonewhite transition-colors"
        >
          <Layers className="w-5 h-5 mb-1" />
          <span>{language === "pt" ? "Trançados" : "Matrix"}</span>
        </Link>

        <Link
          href="/custom-academy"
          className={`flex flex-col items-center py-1 px-2 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
            pathname === "/custom-academy"
              ? "text-rhinogold font-bold"
              : "text-bonewhite-muted hover:text-bonewhite"
          }`}
        >
          <Sparkles className="w-5 h-5 mb-1 text-rhinogold" />
          <span>{language === "pt" ? "Equipes" : "Academy"}</span>
        </Link>

        <button
          onClick={openCart}
          className="relative flex flex-col items-center py-1 px-2 rounded text-[10px] font-mono uppercase tracking-wider text-bonewhite hover:text-rhinogold transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-1 text-rhinogold" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-rhinogold text-obsidian-950 rounded-full w-4 h-4 text-[9px] font-black flex items-center justify-center font-mono">
                {totalItems}
              </span>
            )}
          </div>
          <span>{language === "pt" ? "Mochila" : "Mat Bag"}</span>
        </button>
      </div>
    </div>
  );
}
