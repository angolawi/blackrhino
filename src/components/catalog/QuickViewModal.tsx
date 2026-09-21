"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, GiCut } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addItem, formatPrice } = useCart();
  const { language, t } = useLanguage();
  const [selectedCut, setSelectedCut] = useState<GiCut | string>("");

  if (!product) return null;

  const currentCut = selectedCut || product.availableCuts[0] || "Universal";
  const stockForCurrentCut = product.inventory[currentCut as GiCut] ?? 8;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      colorName: product.colorName,
      cut: currentCut,
      price: product.price,
      image: product.images.primary,
      quantity: 1,
    });
    onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-surface border border-slate-border rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-bonewhite-muted hover:text-bonewhite bg-obsidian-950/80 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Half */}
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-[420px] bg-obsidian-900 border-b md:border-b-0 md:border-r border-slate-border">
          <Image
            src={product.images.primary}
            alt={product.title}
            fill
            className="object-contain p-6"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className="bg-obsidian-950/90 text-bonewhite border border-slate-border text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
              {product.weaveWeight} GSM
            </span>
            <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
              {language === "pt" ? "Homologado IBJJF / CBJJ" : product.compliance}
            </span>
          </div>
        </div>

        {/* Details Half */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-rhinogold font-bold">
                {localizedColor}
              </span>
              <span className="text-xs font-mono text-bonewhite-muted">
                {language === "pt" ? "Sanforizado Pré-Encolhido" : "Sanforized Pre-Shrunk"}
              </span>
            </div>

            <h3 className="text-xl font-bold uppercase text-bonewhite">
              {product.title}
            </h3>

            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-mono font-black text-bonewhite">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-mono text-bonewhite-dim line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-bonewhite-muted leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Cut Selector */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase text-bonewhite-muted">
                  {language === "pt" ? "Selecione o Tamanho:" : "Select Cut / Size:"}
                </span>
                {stockForCurrentCut <= 4 && stockForCurrentCut > 0 && (
                  <span className="text-matred text-[11px] font-mono font-bold animate-pulse">
                    {language === "pt"
                      ? `Apenas ${stockForCurrentCut} unidades em ${currentCut}!`
                      : `Only ${stockForCurrentCut} units left in ${currentCut}!`}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {product.availableCuts.map((cut) => {
                  const isCutActive = (selectedCut || product.availableCuts[0]) === cut;
                  return (
                    <button
                      key={cut}
                      onClick={() => setSelectedCut(cut)}
                      className={`px-3 py-1.5 rounded font-mono text-xs border transition-all ${
                        isCutActive
                          ? "border-rhinogold bg-rhinogold text-obsidian-950 font-bold"
                          : "border-slate-border bg-slate-card text-bonewhite hover:border-slate-lightBorder"
                      }`}
                    >
                      {cut}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-border">
            <button
              onClick={handleAddToCart}
              className="w-full bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold py-3 px-4 rounded-lg uppercase tracking-wider text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-rhinogold/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t("addToMatBag")} • {formatPrice(product.price)}</span>
            </button>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs font-mono text-bonewhite-muted hover:text-rhinogold uppercase tracking-wider py-1"
            >
              {language === "pt" ? "Ver Página Técnica Completa e Calculadora de Tamanho →" : "Open Full Spec Page & Fit Visualizer →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
