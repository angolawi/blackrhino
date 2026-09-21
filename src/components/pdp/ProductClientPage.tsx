"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, GiCut } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { SizeCalculator } from "@/components/pdp/SizeCalculator";
import { ShrinkageVisualizer } from "@/components/pdp/ShrinkageVisualizer";
import { StickyMobileActionBar } from "@/components/pdp/StickyMobileActionBar";
import { ProductCard } from "@/components/catalog/ProductCard";
import {
  ShieldCheck,
  Star,
  ShoppingBag,
  Zap,
  Check,
  ChevronRight,
  Truck,
  RotateCcw,
  Ruler,
} from "lucide-react";

const BELT_RANKS = [
  { id: "white", namePt: "Branca", nameEn: "White", bgClass: "bg-bonewhite text-obsidian-950 border border-slate-400" },
  { id: "blue", namePt: "Azul", nameEn: "Blue", bgClass: "bg-blue-600 text-bonewhite" },
  { id: "purple", namePt: "Roxa", nameEn: "Purple", bgClass: "bg-purple-700 text-bonewhite" },
  { id: "brown", namePt: "Marrom", nameEn: "Brown", bgClass: "bg-amber-900 text-bonewhite" },
  { id: "black", namePt: "Preta", nameEn: "Black", bgClass: "bg-neutral-900 text-bonewhite border border-red-600" },
];

const BELT_LENGTHS: Record<string, string> = {
  A0: "2,50 m",
  A1: "2,70 m",
  A2: "2,90 m",
  A3: "3,10 m",
  A4: "3,30 m",
};

interface ProductClientPageProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductClientPage({ product, relatedProducts }: ProductClientPageProps) {
  const { addItem, formatPrice, openCheckout } = useCart();
  const { language, t } = useLanguage();
  const [selectedCut, setSelectedCut] = useState<GiCut>(product.availableCuts[0] || "A2");
  const [selectedRank, setSelectedRank] = useState(BELT_RANKS[4]); // Default to Faixa Preta
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "compliance">("specs");

  const isBelt = product.category === "belts";
  const stock = product.inventory[selectedCut] ?? 5;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: isBelt ? `Faixa ${language === "pt" ? selectedRank.namePt : selectedRank.nameEn} Legend` : product.title,
      colorName: isBelt ? `Faixa ${language === "pt" ? selectedRank.namePt : selectedRank.nameEn}` : product.colorName,
      cut: selectedCut,
      price: product.price,
      image: product.images.primary,
      quantity: 1,
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-32">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-mono text-bonewhite-dim">
        <Link href="/" className="hover:text-bonewhite transition-colors">
          {language === "pt" ? "Ateliê" : "Atelier"}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/collections" className="hover:text-bonewhite transition-colors">
          {language === "pt" ? "Coleções" : "Collections"}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-bonewhite truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Product Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} category={product.category} />
        </div>

        {/* Right Column: Conversion Engine */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Badges & Title */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-rhinogold text-obsidian-950 text-xs font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                {product.weaveWeight} GSM
              </span>
              <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold px-2.5 py-0.5 rounded uppercase flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {language === "pt" ? "Homologado IBJJF / CBJJ" : product.compliance}
              </span>
              <span className="bg-obsidian-900 border border-slate-border text-bonewhite text-xs font-mono px-2 py-0.5 rounded uppercase">
                {t("sanforizedTag")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase text-bonewhite tracking-tight font-sans">
              {product.title}
            </h1>

            <p className="text-sm text-bonewhite-muted font-light leading-relaxed">
              {product.subhead}
            </p>

            {/* Ratings & Reviews */}
            <div className="flex items-center space-x-2 pt-1">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-rhinogold text-rhinogold" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-bonewhite">{product.rating}</span>
              <span className="text-xs text-bonewhite-dim">•</span>
              <span className="text-xs font-mono text-rhinogold">
                {product.reviewCount} {t("verifiedReviewsCount")}
              </span>
            </div>
          </div>

          {/* Pricing & Guarantee */}
          <div className="p-4 bg-slate-surface border border-slate-border rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-mono font-black text-bonewhite">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm font-mono text-bonewhite-dim line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-bonewhite-dim mt-0.5">
                {t("dutiesIncluded")}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-rhinogold uppercase block font-bold">
                {t("batchReady")}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center justify-end">
                <Check className="w-3.5 h-3.5 mr-0.5 inline" /> {t("inStock")}
              </span>
            </div>
          </div>

          {/* Rank Selection (Belts only) */}
          {isBelt && (
            <div className="space-y-2.5 p-4 bg-slate-surface border border-slate-border rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase text-bonewhite font-semibold">
                  {language === "pt" ? "1. Escolha sua Graduação:" : "1. Select Rank:"}{" "}
                  <strong className="text-rhinogold">
                    {language === "pt" ? `Faixa ${selectedRank.namePt}` : `${selectedRank.nameEn} Belt`}
                  </strong>
                </span>
                <span className="text-[10px] font-mono text-bonewhite-dim uppercase">
                  {language === "pt" ? "Ponteira Oficial 10cm" : "Official 10cm Sleeve"}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {BELT_RANKS.map((rank) => {
                  const isSelected = selectedRank.id === rank.id;
                  return (
                    <button
                      key={rank.id}
                      type="button"
                      onClick={() => setSelectedRank(rank)}
                      className={`py-2 px-1 rounded-lg border text-xs font-mono font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? "border-rhinogold ring-2 ring-rhinogold/30 bg-obsidian-900 shadow-lg shadow-rhinogold/10"
                          : "border-slate-border bg-slate-card hover:border-slate-lightBorder opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${rank.bgClass} flex items-center justify-center shadow-inner`} />
                      <span className={`text-[11px] ${isSelected ? "text-rhinogold font-black" : "text-bonewhite"}`}>
                        {language === "pt" ? rank.namePt : rank.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cut / Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono uppercase text-bonewhite font-semibold">
                {isBelt ? (language === "pt" ? "2. Tamanho da Faixa:" : "2. Belt Size:") : t("selectCutGauge")}{" "}
                <strong className="text-rhinogold">
                  {selectedCut} {isBelt && BELT_LENGTHS[selectedCut] ? `(${BELT_LENGTHS[selectedCut]})` : ""}
                </strong>
              </span>
              {stock <= 4 && stock > 0 ? (
                <span className="text-matred font-mono text-xs font-bold animate-pulse">
                  {language === "pt" ? `Apenas ${stock} restantes em ${selectedCut}!` : `Only ${stock} units left in ${selectedCut}!`}
                </span>
              ) : (
                <span className="text-bonewhite-dim text-[11px] font-mono">
                  {stock} {t("unitsReady")}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.availableCuts.map((cut) => {
                const isSelected = selectedCut === cut;
                const cutStock = product.inventory[cut] ?? 5;
                return (
                  <button
                    key={cut}
                    onClick={() => setSelectedCut(cut)}
                    className={`py-2.5 px-2 rounded-lg font-mono text-xs border transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "border-rhinogold bg-rhinogold text-obsidian-950 font-black shadow-md shadow-rhinogold/20"
                        : "border-slate-border bg-slate-card text-bonewhite hover:border-slate-lightBorder"
                    }`}
                  >
                    <span>{cut}</span>
                    <span className="text-[9px] opacity-75 font-mono">
                      {isBelt && BELT_LENGTHS[cut]
                        ? BELT_LENGTHS[cut]
                        : cutStock <= 3
                        ? language === "pt" ? `${cutStock} rest` : `${cutStock} left`
                        : language === "pt" ? "Em estoque" : "In stock"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-black py-4 px-6 rounded-xl uppercase tracking-wider text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl shadow-rhinogold/20 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t("addToMatBag")} • {formatPrice(product.price)}</span>
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                openCheckout();
              }}
              className="w-full bg-slate-surface hover:bg-slate-hover border border-slate-border text-bonewhite font-bold py-3 px-6 rounded-xl uppercase tracking-wider text-xs transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-rhinogold" />
              <span>{t("expressCheckout")}</span>
            </button>
          </div>

          {/* Shipping and Return Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-bonewhite-muted">
            <div className="p-3 bg-slate-card border border-slate-border rounded-lg flex items-center space-x-2.5">
              <Truck className="w-4 h-4 text-rhinogold flex-shrink-0" />
              <span>{t("fastDispatch")}</span>
            </div>
            <div className="p-3 bg-slate-card border border-slate-border rounded-lg flex items-center space-x-2.5">
              <RotateCcw className="w-3.5 h-3.5 text-rhinogold flex-shrink-0" />
              <span>{t("fitGuarantee")}</span>
            </div>
          </div>

          {/* Size & Care Tools: Dedicated Belt Guide or Gi Sizing Tools */}
          {isBelt ? (
            <div className="p-5 bg-slate-card border border-slate-border rounded-xl space-y-4 text-xs">
              <div className="flex items-center space-x-2 border-b border-slate-border/70 pb-3">
                <Ruler className="w-4 h-4 text-rhinogold" />
                <h3 className="font-mono font-bold uppercase text-bonewhite tracking-wider">
                  {language === "pt" ? "Guia de Medidas & Normas de Faixas" : "Belt Sizing & Regulation Guide"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="space-y-1.5 p-3 bg-obsidian-900 rounded-lg border border-slate-border/50">
                  <span className="font-mono text-rhinogold uppercase font-bold block">
                    {language === "pt" ? "Tabela de Comprimento" : "Length Chart"}
                  </span>
                  <div className="space-y-1 text-bonewhite-muted font-mono">
                    <div className="flex justify-between"><span>A0: 2,50 m</span><span>(até 65kg / 1,65m)</span></div>
                    <div className="flex justify-between"><span>A1: 2,70 m</span><span>(65 - 77kg / 1,75m)</span></div>
                    <div className="flex justify-between"><span>A2: 2,90 m</span><span>(77 - 88kg / 1,85m)</span></div>
                    <div className="flex justify-between"><span>A3: 3,10 m</span><span>(88 - 100kg / 1,95m)</span></div>
                    <div className="flex justify-between"><span>A4: 3,30 m</span><span>(100kg+ / Pesadíssimo)</span></div>
                  </div>
                </div>

                <div className="space-y-1.5 p-3 bg-obsidian-900 rounded-lg border border-slate-border/50">
                  <span className="font-mono text-emerald-400 uppercase font-bold block">
                    {language === "pt" ? "Normas Oficiais CBJJ / IBJJF" : "Official Standards"}
                  </span>
                  <ul className="space-y-1 text-bonewhite-muted list-disc list-inside">
                    <li>{language === "pt" ? "Largura oficial: 4,2 cm (norma de 4 a 5 cm)" : "Official width: 4.2 cm"}</li>
                    <li>{language === "pt" ? "Ponteira de 10 cm para colocação de graus" : "10 cm ranking sleeve for stripes"}</li>
                    <li>{language === "pt" ? "Sobras de 20 a 30 cm nas pontas após o nó" : "20-30 cm tails after knot"}</li>
                    <li>{language === "pt" ? "Espessura de 5 mm de lona anti-desamarração" : "Dense 5 mm anti-slip core"}</li>
                  </ul>
                </div>
              </div>

              <p className="text-[11px] text-bonewhite-dim italic">
                {language === "pt"
                  ? "💡 Dica: Não lave sua faixa com água quente nem centrifugue em secadora para preservar a estrutura de lona interna e manter o nó firme no rola."
                  : "💡 Tip: Hand wash or cold spot clean only to preserve the dense core."}
              </p>
            </div>
          ) : (
            <>
              {/* Size Calculator Tool */}
              <div className="pt-4">
                <SizeCalculator
                  selectedCut={selectedCut}
                  onSelectCut={(c) => setSelectedCut(c)}
                />
              </div>

              {/* Shrinkage Visualizer Tool */}
              <div className="pt-2">
                <ShrinkageVisualizer />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Technical Specifications Deep Dive Tabs */}
      <div className="bg-slate-surface border border-slate-border rounded-2xl p-6 sm:p-10 space-y-8">
        <div className="flex border-b border-slate-border space-x-6 text-xs font-mono uppercase">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-4 transition-colors font-bold border-b-2 ${
              activeTab === "specs"
                ? "border-rhinogold text-rhinogold"
                : "border-transparent text-bonewhite-muted hover:text-bonewhite"
            }`}
          >
            {t("techSpecsTab")}
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`pb-4 transition-colors font-bold border-b-2 ${
              activeTab === "features"
                ? "border-rhinogold text-rhinogold"
                : "border-transparent text-bonewhite-muted hover:text-bonewhite"
            }`}
          >
            {t("craftsmanshipTab")}
          </button>
          <button
            onClick={() => setActiveTab("compliance")}
            className={`pb-4 transition-colors font-bold border-b-2 ${
              activeTab === "compliance"
                ? "border-rhinogold text-rhinogold"
                : "border-transparent text-bonewhite-muted hover:text-bonewhite"
            }`}
          >
            {t("complianceTab")}
          </button>
        </div>

        {activeTab === "specs" && (
          isBelt ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Tecido Externo:" : "Outer Weave:"}
                  </span>
                  <span className="text-bonewhite font-mono">450 GSM Pearl Weave (100% Algodão)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Estrutura do Núcleo:" : "Internal Core:"}
                  </span>
                  <span className="text-bonewhite font-mono">Lona de Algodão Alta Densidade (5mm)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Costuras Estruturais:" : "Structural Stitching:"}
                  </span>
                  <span className="text-rhinogold font-mono font-bold">12 Fileiras Paralelas Reforçadas</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Largura Oficial:" : "Official Width:"}
                  </span>
                  <span className="text-bonewhite font-mono">4,2 cm (Regulamentar CBJJ / IBJJF)</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Ponteira de Graduação:" : "Rank Sleeve:"}
                  </span>
                  <span className="text-bonewhite font-mono">10 cm com Acabamento Reforçado</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Índice de Firmeza do Nó:" : "Knot Friction Rating:"}
                  </span>
                  <span className="text-rhinogold font-mono font-bold">9.5 / 10 (Não desamarra)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Tempo de Secagem:" : "Drying Time:"}
                  </span>
                  <span className="text-bonewhite font-mono">2.0 Horas</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Origem da Manufatura:" : "Atelier Origin:"}
                  </span>
                  <span className="text-bonewhite font-mono">
                    {language === "pt" ? "Brasília, DF (Brasil)" : "Brasília, Brazil"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Trançado do Casaco:" : "Jacket Weave:"}
                  </span>
                  <span className="text-bonewhite font-mono">{product.technicalSpecs.jacketWeave}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Densidade do Tecido:" : "Fabric Density (GSM):"}
                  </span>
                  <span className="text-rhinogold font-mono font-bold">{product.technicalSpecs.jacketGsm} GSM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Tecnologia da Gola:" : "Collar Technology:"}
                  </span>
                  <span className="text-bonewhite font-mono">{product.technicalSpecs.collarMaterial}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Tecido da Calça:" : "Pants Fabric:"}
                  </span>
                  <span className="text-bonewhite font-mono">{product.technicalSpecs.pantsMaterial}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Canais de Cordão:" : "Drawstring Channels:"}
                  </span>
                  <span className="text-bonewhite font-mono">
                    {product.technicalSpecs.drawstringLoops} {language === "pt" ? "Passadores Reforçados" : "Loop System"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Índice de Rigidez / Tração:" : "Tensile Stiffness Index:"}
                  </span>
                  <span className="text-rhinogold font-mono font-bold">{product.technicalSpecs.tensileStiffnessRating} / 10</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Tempo de Secagem:" : "Drying Cycle:"}
                  </span>
                  <span className="text-bonewhite font-mono">
                    {product.technicalSpecs.dryTimeHours} {language === "pt" ? "Horas" : "Hours"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-border/60">
                  <span className="text-bonewhite-dim">
                    {language === "pt" ? "Origem da Manufatura:" : "Atelier Origin:"}
                  </span>
                  <span className="text-bonewhite font-mono">
                    {language === "pt" ? "Brasília, DF (Brasil)" : "Brasília, Brazil"}
                  </span>
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-obsidian-900 rounded-lg border border-slate-border/60">
                <Check className="w-4 h-4 text-rhinogold flex-shrink-0 mt-0.5" />
                <span className="text-xs text-bonewhite leading-relaxed">{feat}</span>
              </div>
            ))}
            {product.technicalSpecs.reinforcements.map((reinf, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-obsidian-900 rounded-lg border border-slate-border/60">
                <Check className="w-4 h-4 text-rhinogold flex-shrink-0 mt-0.5" />
                <span className="text-xs text-bonewhite leading-relaxed">{reinf}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-4 text-xs text-bonewhite-muted leading-relaxed">
            <div className="p-4 bg-obsidian-900 border border-emerald-500/30 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <span>
                  {language === "pt"
                    ? "Certificado para Competições Oficiais da IBJJF, CBJJ, UAEJJF e AJP"
                    : "Certified for Official IBJJF, UAEJJF & AJP Tournaments"}
                </span>
              </div>
              <p>
                {language === "pt"
                  ? "Este kimono atende integralmente ao Artigo 8 do livro de regras oficial da Federação Internacional de Jiu-Jitsu Brasileiro:"
                  : "This Kimono conforms to Article 8 of the International Brazilian Jiu-Jitsu Federation rules:"}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-bonewhite">
                <li>
                  {language === "pt"
                    ? "Espessura da gola: exatos 1,3 cm com largura inferior a 5 cm."
                    : "Collar thickness: exactly 1.3 cm with width under 5 cm."}
                </li>
                <li>
                  {language === "pt"
                    ? "Abertura da manga: mantém a folga regulamentar de 7 cm com braço estendido."
                    : "Sleeve opening: maintains standard 7 cm clearance when arm is fully extended."}
                </li>
                <li>
                  {language === "pt"
                    ? "Comprimento da saia: termina entre o meio da coxa e o joelho."
                    : "Skirt hem terminates between mid-thigh and knee."}
                </li>
                <li>
                  {language === "pt"
                    ? "Bordados e patches posicionados exclusivamente nas zonas regulamentadas livres de pegada."
                    : "Embroideries and patches are positioned strictly within sanctioned non-grip zones."}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Recommendation */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-slate-border pb-4">
          <h2 className="text-xl font-bold uppercase text-bonewhite">
            {t("completeKit")}
          </h2>
          <Link
            href="/collections"
            className="text-xs font-mono uppercase text-rhinogold hover:underline"
          >
            {language === "pt" ? "Ver Todos →" : "View All →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} onQuickView={() => {}} />
          ))}
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <StickyMobileActionBar
        product={product}
        selectedCut={selectedCut}
        onOpenQuickSelect={() => {
          const el = document.getElementById("cut-selector");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
