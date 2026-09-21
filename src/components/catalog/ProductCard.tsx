"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, GiCut } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem, formatPrice } = useCart();
  const { language, t } = useLanguage();
  const [selectedCut, setSelectedCut] = useState<GiCut>(product.availableCuts[0] || "A2");

  const stock = product.inventory[selectedCut] ?? 6;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const localizedColor =
    language === "pt"
      ? product.colorName === "Bone White"
        ? "Branco Natural"
        : product.colorName === "Royal Mat Blue"
        ? "Azul Royal de Tatame"
        : product.colorName === "Obsidian Black"
        ? "Preto Obsidiana"
        : product.colorName
      : product.colorName;

  return (
    <div className="group bg-slate-surface border border-slate-border rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-rhinogold/50 hover:shadow-xl hover:shadow-rhinogold/5">
      <div>
        {/* Dual-Image Hover Viewport */}
        <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] bg-obsidian-900 overflow-hidden">
          <Image
            src={product.images.primary}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={product.images.secondary || product.images.primary}
            alt={`${product.title} detail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />

          {/* Badges Overlays */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span className="bg-obsidian-950/90 text-bonewhite border border-slate-border text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase backdrop-blur-sm">
              {product.weaveWeight} GSM
            </span>
            <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase backdrop-blur-sm">
              {language === "pt" ? "Homologado IBJJF / CBJJ" : product.compliance}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="bg-rhinogold text-obsidian-950 text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase">
              {t("sanforizedTag")}
            </span>
          </div>

          {/* Quick-View Overlay Action Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 right-3 z-20 bg-obsidian-950/90 hover:bg-rhinogold hover:text-obsidian-950 text-bonewhite border border-slate-border p-2 rounded-lg text-xs font-mono transition-all opacity-0 group-hover:opacity-100 shadow-lg flex items-center space-x-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">{t("quickInspect")}</span>
          </button>
        </Link>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-rhinogold font-mono uppercase text-[11px] font-semibold">
              {localizedColor}
            </span>
            <div className="flex items-center space-x-1 text-bonewhite-muted">
              <Star className="w-3.5 h-3.5 fill-rhinogold text-rhinogold" />
              <span className="font-mono text-[11px]">{product.rating}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-bold text-bonewhite uppercase line-clamp-1 group-hover:text-rhinogold transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-bonewhite-muted line-clamp-2 leading-relaxed">
            {product.subhead}
          </p>

          {/* Instant Size-Availability Chips */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-bonewhite-dim uppercase">{t("inStockCuts")}</span>
              {stock <= 4 && stock > 0 && (
                <span className="text-matred font-bold">
                  {language === "pt" ? `Apenas ${stock} em ${selectedCut}` : `Only ${stock} in ${selectedCut}`}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {product.availableCuts.map((cut) => {
                const isSelected = selectedCut === cut;
                return (
                  <button
                    key={cut}
                    type="button"
                    onClick={() => setSelectedCut(cut)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                      isSelected
                        ? "border-rhinogold bg-rhinogold text-obsidian-950 font-bold"
                        : "border-slate-border bg-obsidian-900 text-bonewhite hover:border-slate-lightBorder"
                    }`}
                  >
                    {cut}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Rail */}
      <div className="p-5 pt-0">
        <div className="border-t border-slate-border/50 pt-4 flex items-center justify-between">
          <div>
            <span className="text-base font-mono font-bold text-bonewhite">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs font-mono text-bonewhite-dim line-through ml-1.5">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center space-x-1.5 bg-slate-card hover:bg-rhinogold hover:text-obsidian-950 text-bonewhite border border-slate-border px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t("addCut")} {selectedCut}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
