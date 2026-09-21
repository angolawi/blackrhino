"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/home/HeroSection";
import { WeaveMatrixShowcase } from "@/components/home/WeaveMatrixShowcase";
import { TechnicalAnatomy } from "@/components/home/TechnicalAnatomy";
import { VerifiedMatReviews } from "@/components/home/VerifiedMatReviews";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { formatPrice } = useCart();
  const featuredGis = PRODUCTS.filter((p) => p.category === "gis");
  const rankedBelts = PRODUCTS.find((p) => p.category === "belts");

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Core Line Preview (White, Royal Blue, Obsidian Black) */}
      <section className="py-20 bg-obsidian border-b border-slate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-rhinogold font-bold">
                {t("battleRotation")}
              </span>
              <h2 className="text-3xl font-black uppercase text-bonewhite tracking-tight mt-1">
                {t("atelierCompGis")}
              </h2>
            </div>
            <Link
              href="/collections"
              className="mt-4 md:mt-0 text-xs font-mono uppercase tracking-wider text-rhinogold hover:underline flex items-center space-x-1"
            >
              <span>{t("viewFullCatalog")} ({PRODUCTS.length} {language === "pt" ? "Modelos" : "Models"})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGis.map((product) => (
              <div
                key={product.id}
                className="group bg-slate-surface border border-slate-border rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-rhinogold/50 hover:shadow-xl hover:shadow-rhinogold/5"
              >
                <div>
                  {/* Image Container with dual hover effect */}
                  <div className="relative aspect-[4/5] bg-obsidian-900 overflow-hidden">
                    <Image
                      src={product.images.primary}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6 transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                    />
                    <Image
                      src={product.images.secondary}
                      alt={`${product.title} secondary`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6 absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-obsidian-950/90 text-bonewhite border border-slate-border text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                        {product.weaveWeight} GSM
                      </span>
                      <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                        {language === "pt" ? "Homologado IBJJF / CBJJ" : product.compliance}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-rhinogold text-obsidian-950 text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase">
                        {t("sanforizedTag")}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-rhinogold font-mono uppercase">
                        {language === "pt"
                          ? product.colorName === "Bone White"
                            ? "Branco Natural"
                            : product.colorName === "Royal Mat Blue"
                            ? "Azul Royal de Tatame"
                            : "Preto Obsidiana"
                          : product.colorName}
                      </span>
                      <div className="flex items-center space-x-1 text-bonewhite-muted">
                        <Star className="w-3.5 h-3.5 fill-rhinogold text-rhinogold" />
                        <span className="font-mono text-[11px]">{product.rating}</span>
                        <span className="text-[10px]">({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-bonewhite uppercase line-clamp-1 group-hover:text-rhinogold transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-xs text-bonewhite-muted line-clamp-2 leading-relaxed">
                      {product.subhead}
                    </p>

                    {/* Quick Available Cuts Chips */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase text-bonewhite-dim block mb-1">
                        {t("inStockCuts")}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.availableCuts.slice(0, 6).map((cut) => (
                          <span
                            key={cut}
                            className="text-[10px] font-mono px-1.5 py-0.5 bg-obsidian-900 border border-slate-border rounded text-bonewhite"
                          >
                            {cut}
                          </span>
                        ))}
                        {product.availableCuts.length > 6 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 text-bonewhite-dim">
                            +{product.availableCuts.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <div className="border-t border-slate-border/50 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-mono font-bold text-bonewhite">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs font-mono text-bonewhite-dim line-through ml-2">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-mono font-bold uppercase tracking-wider text-rhinogold hover:text-rhinogold-light"
                    >
                      <span>{t("inspect")}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Weave Matrix Showcase */}
      <WeaveMatrixShowcase />

      {/* 4. Technical Anatomy Hotspot Breakdown */}
      <TechnicalAnatomy />

      {/* 5. Master Ranked Belts Spotlight */}
      {rankedBelts && (
        <section className="py-20 bg-slate-surface border-b border-slate-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-obsidian-900 border border-slate-border rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-obsidian-950 border border-slate-border/80">
                <Image
                  src={rankedBelts.images.primary}
                  alt={rankedBelts.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-rhinogold text-obsidian-950 text-xs font-mono font-bold px-2 py-0.5 rounded uppercase">
                  {language === "pt" ? "Todas as Graduações Oficiais" : "All Official IBJJF Ranks"}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-rhinogold tracking-wider font-bold">
                    {t("beltsTitle")}
                  </span>
                  <h3 className="text-3xl font-black uppercase text-bonewhite mt-1">
                    {rankedBelts.title}
                  </h3>
                  <p className="text-sm text-bonewhite-muted mt-2 leading-relaxed">
                    {t("beltsDesc")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-card border border-slate-border rounded-lg">
                    <span className="text-bonewhite-dim block text-[11px]">{t("rankPalette")}</span>
                    <span className="text-bonewhite font-semibold">{t("allRanks")}</span>
                  </div>
                  <div className="p-3 bg-slate-card border border-slate-border rounded-lg">
                    <span className="text-bonewhite-dim block text-[11px]">{t("coreThickness")}</span>
                    <span className="text-bonewhite font-semibold">{t("coreDesc")}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <span className="text-2xl font-mono font-bold text-bonewhite">
                    {formatPrice(rankedBelts.price)}
                  </span>
                  <Link
                    href={`/products/${rankedBelts.slug}`}
                    className="inline-flex items-center space-x-2 bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
                  >
                    <span>{t("selectRankAndSize")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Academy B2B Callout */}
      <section className="py-20 bg-obsidian-950 border-b border-slate-border relative overflow-hidden">
        <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-rhinogold/10 border border-rhinogold/30 text-xs font-mono text-rhinogold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("academyCalloutTag")}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-bonewhite tracking-tight">
            {t("academyCalloutTitle")}
          </h2>

          <p className="text-base text-bonewhite-muted font-light max-w-2xl mx-auto leading-relaxed">
            {t("academyCalloutDesc")}
          </p>

          <div className="pt-4">
            <Link
              href="/custom-academy"
              className="inline-flex items-center space-x-2 bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-xs transition-all shadow-xl shadow-rhinogold/20"
            >
              <span>{t("launchAcademyConfigurator")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Verified Mat Reviews */}
      <VerifiedMatReviews />
    </div>
  );
}
