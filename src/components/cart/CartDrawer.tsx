"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldAlert, Sparkles, PackageCheck } from "lucide-react";
import Image from "next/image";
import { CART_ADDONS } from "@/data/products";
import { WhatsAppCheckoutButton } from "./WhatsAppCheckoutButton";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
    formatPrice,
    addItem,
  } = useCart();
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const localizedAddons = CART_ADDONS.map((addon) => ({
    ...addon,
    title:
      language === "pt"
        ? addon.id === "addon-tape"
          ? "Esparadrapo Tático Coesivo (Kit com 4)"
          : addon.id === "addon-drawstring"
          ? "Cordão de Calça com Ponta de Silicone"
          : "Saco Mochila de Ripstop Respirável"
        : addon.title,
    subhead:
      language === "pt"
        ? addon.id === "addon-tape"
          ? "Fita de alta aderência anti-suor para proteção de dedos e articulações"
          : addon.id === "addon-drawstring"
          ? "Cordão especial de alta fricção para 6 passadores"
          : "Bolsa resistente à água e anti-odor para transporte de kimono"
        : addon.subhead,
  }));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-slate-border text-bonewhite flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-border flex items-center justify-between bg-obsidian-950">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rhinogold animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-bonewhite">
                {t("cartTitle")} ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-bonewhite-muted hover:text-bonewhite hover:bg-slate-card rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-4 bg-slate-surface border-b border-slate-border">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {amountUntilFreeShipping > 0 ? (
                <span className="text-bonewhite-muted">
                  {language === "pt" ? "Adicione " : "Add "}
                  <strong className="text-rhinogold">{formatPrice(amountUntilFreeShipping)}</strong>{" "}
                  {t("freeShippingRemaining")}
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold flex items-center">
                  <PackageCheck className="w-4 h-4 mr-1 inline" /> {t("freeShippingQualified")}
                </span>
              )}
              <span className="font-mono text-xs text-bonewhite-muted">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-obsidian-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rhinogold-dark via-rhinogold to-rhinogold-light transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShieldAlert className="w-12 h-12 text-bonewhite-dim mx-auto stroke-1" />
                <p className="text-sm text-bonewhite-muted">{t("emptyCart")}</p>
                <button
                  onClick={closeCart}
                  className="mt-2 text-xs uppercase tracking-wider text-rhinogold hover:underline"
                >
                  {t("browseKimonos")} &rarr;
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-3 p-3 bg-slate-card border border-slate-border rounded-lg transition-all"
                >
                  <div className="relative w-20 h-20 bg-obsidian-900 rounded overflow-hidden flex-shrink-0 border border-slate-border/50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-semibold text-bonewhite line-clamp-1 pr-2">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-bonewhite-dim hover:text-matred transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-bonewhite-muted">
                        <span className="px-1.5 py-0.5 bg-obsidian-900 border border-slate-border rounded font-mono text-rhinogold">
                          {language === "pt" ? "Tam" : "Cut"}: {item.cut}
                        </span>
                        <span>{item.colorName}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-border/30">
                      <div className="flex items-center space-x-1.5 bg-obsidian-900 border border-slate-border rounded px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-bonewhite-muted hover:text-bonewhite p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-bonewhite-muted hover:text-bonewhite p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-bonewhite">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* In-Cart One-Click Tactical Add-Ons */}
            <div className="pt-4 border-t border-slate-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-rhinogold flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 inline" /> {t("matEssentials")}
                </span>
                <span className="text-[10px] text-bonewhite-dim">{t("oneClickAdd")}</span>
              </div>
              <div className="space-y-2">
                {localizedAddons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between p-2.5 bg-slate-surface/80 border border-slate-border/60 rounded-lg hover:border-rhinogold/50 transition-all text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="relative w-9 h-9 bg-obsidian-900 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={addon.image}
                          alt={addon.title}
                          fill
                          sizes="36px"
                          className="object-contain p-0.5"
                        />
                      </div>
                      <div className="max-w-[170px]">
                        <p className="font-semibold text-bonewhite truncate">{addon.title}</p>
                        <p className="text-[10px] text-rhinogold">{formatPrice(addon.price)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          productId: addon.id,
                          slug: addon.id,
                          title: addon.title,
                          colorName: language === "pt" ? "Preto Fosco" : "Tactical Matte",
                          cut: language === "pt" ? "Padrão" : "Universal",
                          price: addon.price,
                          image: addon.image,
                          quantity: 1,
                          isAddon: true,
                        })
                      }
                      className="px-2.5 py-1 bg-slate-card hover:bg-rhinogold hover:text-obsidian-950 border border-slate-border rounded text-[11px] font-bold transition-colors"
                    >
                      + {language === "pt" ? "Adicionar" : "Add"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Subtotal & Checkout */}
          <div className="p-5 bg-obsidian-950 border-t border-slate-border space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-bonewhite-muted">
                <span>{t("subtotal")}</span>
                <span className="font-semibold text-bonewhite">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-bonewhite-muted">
                <span>{t("shipping")}</span>
                <span>{subtotal >= freeShippingThreshold ? t("free") : t("calculatedStep2")}</span>
              </div>
            </div>

            <WhatsAppCheckoutButton items={items} totalAmount={subtotal} />



            <p className="text-center text-[10px] text-bonewhite-dim tracking-wider uppercase">
              {language === "pt"
                ? "Garantia 100% Homologado IBJJF/CBJJ • Inspecionado no Ateliê em Brasília, DF"
                : "100% IBJJF Legal Guarantee • Hand-Checked in Brasília Atelier"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
