"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Sparkles, Shield, Send, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CustomAcademyPage() {
  const { formatPrice } = useCart();
  const { language, t } = useLanguage();
  const [baseColor, setBaseColor] = useState<"white" | "blue" | "black">("white");
  const [placements, setPlacements] = useState({
    leftChest: true,
    upperBack: true,
    leftShoulder: false,
    lowerSkirt: false,
    pantHip: true,
  });
  const [tierQty, setTierQty] = useState<15 | 30 | 50 | 100>(30);
  const [academyName, setAcademyName] = useState(
    language === "pt" ? "Gracie Barra / Aliança BJJ" : "Alliance Jiu-Jitsu North"
  );
  const [contactName, setContactName] = useState(
    language === "pt" ? "Professor Silva" : "Head Professor Silva"
  );
  const [email, setEmail] = useState("professor@academia.com");
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pricing calculations
  const baseGiPrice = 185;
  const discountRate =
    tierQty === 15 ? 0.15 : tierQty === 30 ? 0.25 : tierQty === 50 ? 0.35 : 0.4;
  const placementCount = Object.values(placements).filter(Boolean).length;
  const embroideryFeePerUnit = placementCount * 6;
  const unitPrice = Math.round(baseGiPrice * (1 - discountRate) + embroideryFeePerUnit);
  const totalBatchPrice = unitPrice * tierQty;

  const giImageMap = {
    white: "/images/products/white-gi-jacket.png",
    blue: "/images/products/blue-gi-jacket.png",
    black: "/images/products/black-gi-jacket-angle.png",
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedLogo(url);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const placementLabels = {
    leftChest: language === "pt" ? "Peito Esquerdo (Escudo Principal da Academia)" : "Left Chest Emblem (Primary Academy Crest)",
    upperBack: language === "pt" ? "Costas Superior (Nome da Equipe & Filial)" : "Upper Back Yoke (Academy Name & Affiliation)",
    leftShoulder: language === "pt" ? "Ombro Esquerdo (Patch Redondo)" : "Left Shoulder Sleeve (Roundel Badge)",
    lowerSkirt: language === "pt" ? "Saia da Lapela (Etiqueta Tecida)" : "Lower Lapel Skirt (Woven Label)",
    pantHip: language === "pt" ? "Quadril Esquerdo da Calça (Bordado Direto)" : "Left Pant Hip (Direct Embroidery)",
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-rhinogold/10 border border-rhinogold/30 text-xs font-mono uppercase text-rhinogold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("academyPageTag")}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-bonewhite tracking-tight">
          {t("academyPageTitle")}
        </h1>
        <p className="text-sm text-bonewhite-muted font-light leading-relaxed">
          {t("academyPageDesc")}
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Visual Kimono Mockup Canvas */}
        <div className="lg:col-span-6 bg-slate-surface border border-slate-border rounded-2xl p-6 sm:p-8 sticky top-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-border pb-3">
            <span className="text-xs font-mono uppercase text-rhinogold font-bold">
              {t("liveMockupStudio")}
            </span>
            <span className="text-[11px] font-mono text-bonewhite-muted uppercase">
              {language === "pt" ? "Base" : "Base"}: {baseColor} • 450 GSM Legend
            </span>
          </div>

          <div className="relative aspect-[4/5] bg-obsidian-900 border border-slate-border rounded-xl overflow-hidden flex items-center justify-center p-6">
            <Image
              src={giImageMap[baseColor]}
              alt="Custom Academy Gi Base"
              fill
              className="object-contain p-4"
            />

            {/* Simulated Live Embroidery Overlays */}
            {placements.leftChest && (
              <div className="absolute top-[35%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-12 h-12 rounded-full border-2 border-rhinogold/80 bg-obsidian-950/80 backdrop-blur-sm flex items-center justify-center shadow-lg p-1 text-center">
                  {uploadedLogo ? (
                    <img src={uploadedLogo} alt="Gym Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-[8px] font-mono font-bold text-rhinogold uppercase leading-tight">
                      {language === "pt" ? "Escudo" : "Crest"}
                    </span>
                  )}
                </div>
                <span className="block text-[8px] font-mono text-center text-rhinogold mt-0.5">
                  {language === "pt" ? "Peito" : "Chest"}
                </span>
              </div>
            )}

            {placements.leftShoulder && (
              <div className="absolute top-[28%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-10 h-10 rounded-full border border-rhinogold bg-obsidian-950/90 flex items-center justify-center text-[7px] font-mono text-rhinogold uppercase">
                  {language === "pt" ? "Ombro" : "Shoulder"}
                </div>
              </div>
            )}

            {placements.upperBack && (
              <div className="absolute top-[22%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="px-3 py-1 rounded border border-rhinogold/60 bg-obsidian-950/90 text-[8px] font-mono text-rhinogold uppercase tracking-wider font-bold">
                  {academyName.toUpperCase()}
                </div>
              </div>
            )}

            {placements.lowerSkirt && (
              <div className="absolute bottom-[22%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="px-2 py-0.5 rounded border border-rhinogold/50 bg-obsidian-950/90 text-[7px] font-mono text-rhinogold uppercase">
                  {language === "pt" ? "Saia" : "Skirt"}
                </div>
              </div>
            )}

            {placements.pantHip && (
              <div className="absolute bottom-[8%] right-[25%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-9 h-9 rounded-full border border-rhinogold/70 bg-obsidian-950/90 flex items-center justify-center text-[7px] font-mono text-rhinogold uppercase">
                  {language === "pt" ? "Quadril" : "Hip"}
                </div>
              </div>
            )}

            {/* IBJJF Legal Placement Guarantee Stamp */}
            <div className="absolute bottom-3 left-3 bg-obsidian-950/90 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded text-[10px] font-mono flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>{language === "pt" ? "Zonas Oficiais IBJJF / CBJJ" : "IBJJF Legal Zones Maintained"}</span>
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-bonewhite-dim block">
              {t("basePalette")}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["white", "blue", "black"] as const).map((c) => {
                const cLabel =
                  c === "white"
                    ? language === "pt" ? "Branco" : "White"
                    : c === "blue"
                    ? language === "pt" ? "Azul" : "Blue"
                    : language === "pt" ? "Preto" : "Black";
                return (
                  <button
                    key={c}
                    onClick={() => setBaseColor(c)}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono uppercase transition-all flex items-center justify-center space-x-2 ${
                      baseColor === c
                        ? "border-rhinogold bg-rhinogold/15 text-bonewhite font-bold"
                        : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full border ${
                        c === "white"
                          ? "bg-bonewhite border-slate-border"
                          : c === "blue"
                          ? "bg-blue-600 border-blue-400"
                          : "bg-obsidian-950 border-slate-border"
                      }`}
                    />
                    <span>{cLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls & Instant Pricing */}
        <div className="lg:col-span-6 space-y-6">
          {/* Logo Upload Card */}
          <div className="bg-slate-surface border border-slate-border rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4 text-rhinogold" />
              <h3 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
                {t("uploadCrest")}
              </h3>
            </div>

            <div className="border-2 border-dashed border-slate-border rounded-xl p-6 text-center hover:border-rhinogold transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                id="logo-upload"
                className="hidden"
              />
              <label htmlFor="logo-upload" className="cursor-pointer block space-y-2">
                <Upload className="w-8 h-8 text-bonewhite-dim mx-auto" />
                <span className="text-xs font-bold text-rhinogold uppercase block">
                  {uploadedLogo ? t("changeCrest") : t("uploadPrompt")}
                </span>
                <span className="text-[11px] text-bonewhite-dim block">
                  {t("uploadNote")}
                </span>
              </label>
            </div>
          </div>

          {/* Embroidery Placements Toggle */}
          <div className="bg-slate-surface border border-slate-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-rhinogold" />
                <h3 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
                  {t("selectPositions")}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-rhinogold">
                {placementCount} {language === "pt" ? "Locais" : "Positions"} (+{formatPrice(6)} / {language === "pt" ? "local" : "pos"})
              </span>
            </div>

            <div className="space-y-2">
              {(["leftChest", "upperBack", "leftShoulder", "lowerSkirt", "pantHip"] as const).map((posKey) => {
                const checked = placements[posKey];
                return (
                  <label
                    key={posKey}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-card border border-slate-border hover:border-slate-lightBorder cursor-pointer transition-colors"
                  >
                    <span className="text-xs text-bonewhite">{placementLabels[posKey]}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setPlacements({ ...placements, [posKey]: !checked })
                      }
                      className="rounded border-slate-border bg-obsidian-900 text-rhinogold focus:ring-0 w-4 h-4"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Volume Tier Calculator */}
          <div className="bg-slate-surface border border-slate-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
                {t("batchTier")}
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {Math.round(discountRate * 100)}% {language === "pt" ? "de Desconto" : "Discount"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {([15, 30, 50, 100] as const).map((qty) => (
                <button
                  key={qty}
                  onClick={() => setTierQty(qty)}
                  className={`p-3 rounded-lg border text-center font-mono transition-all ${
                    tierQty === qty
                      ? "border-rhinogold bg-rhinogold text-obsidian-950 font-black shadow-md"
                      : "border-slate-border bg-slate-card text-bonewhite hover:border-slate-lightBorder"
                  }`}
                >
                  <span className="text-sm block">{qty} {language === "pt" ? "Gis" : "Gis"}</span>
                  <span className="text-[10px] opacity-80 block">
                    {qty === 15 ? "15% off" : qty === 30 ? "25% off" : qty === 50 ? "35% off" : "40% off"}
                  </span>
                </button>
              ))}
            </div>

            {tierQty >= 50 && (
              <div className="p-3 bg-rhinogold/10 border border-rhinogold/30 rounded-lg text-xs text-rhinogold flex items-center space-x-2">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>{language === "pt" ? "Benefício de Lote:" : "Tier Perk:"}</strong> {language === "pt" ? "Inclui 1 Kimono Legend 450 com detalhes dourados cortesia para o Professor Responsável." : "Includes 1 complimentary custom Head Professor Legend 450 Gi with gold lapel thread."}
                </span>
              </div>
            )}
          </div>

          {/* Instant B2B Pricing Summary Card */}
          <div className="bg-obsidian-900 border border-rhinogold/40 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-border pb-3">
              <span className="text-xs font-mono uppercase text-bonewhite-muted">
                {language === "pt" ? "Custo Unitário Estimado:" : "Estimated Unit Cost:"}
              </span>
              <span className="text-2xl font-mono font-black text-rhinogold">
                {formatPrice(unitPrice)} <span className="text-xs font-normal text-bonewhite-dim">{t("perGi")}</span>
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-bonewhite-muted">
              <div className="flex justify-between">
                <span>{t("batchQuantity")}</span>
                <span className="text-bonewhite font-mono">{tierQty} {language === "pt" ? "Unidades" : "Units"}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("retailValue")}</span>
                <span className="text-bonewhite-dim line-through font-mono">
                  {formatPrice(baseGiPrice * tierQty)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>{t("volumeDiscountApplied")}:</span>
                <span className="font-mono">-{Math.round(discountRate * 100)}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-border font-bold text-bonewhite text-sm">
                <span>{t("totalInvestment")}</span>
                <span className="text-rhinogold font-mono text-base">
                  {formatPrice(totalBatchPrice)}
                </span>
              </div>
            </div>

            {/* Formal Quote Request Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmitQuote} className="space-y-3 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder={t("academyNamePlace")}
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                    className="bg-slate-card border border-slate-border rounded px-3 py-2 text-xs text-bonewhite focus:border-rhinogold focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder={t("headCoachPlace")}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="bg-slate-card border border-slate-border rounded px-3 py-2 text-xs text-bonewhite focus:border-rhinogold focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder={t("emailPlace")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-xs text-bonewhite focus:border-rhinogold focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-rhinogold/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("submitQuoteBtn")}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-bonewhite uppercase">
                  {t("inquiryDispatched")}
                </h4>
                <p className="text-xs text-bonewhite-muted">
                  {t("inquiryNotice")} <strong className="text-bonewhite">{email}</strong>. {language === "pt" ? "Nosso diretor de produção entrará em contato em até 24 horas." : "Our Brazilian production director will contact you within 24 hours."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
