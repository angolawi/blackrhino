"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { GiCut } from "@/types/product";
import { ShoppingBag, Layers } from "lucide-react";

export default function SeparatesPage() {
  const { addItem, formatPrice } = useCart();
  const { language, t } = useLanguage();

  // Pants state
  const [pantsColor, setPantsColor] = useState<"black" | "blue" | "white">("black");
  const [pantsMaterial, setPantsMaterial] = useState<"ripstop" | "canvas">("ripstop");
  const [pantsCut, setPantsCut] = useState<GiCut>("A2");

  // Jacket state
  const [jacketColor, setJacketColor] = useState<"white" | "blue" | "black">("white");
  const [jacketGsm, setJacketGsm] = useState<350 | 450 | 550>(450);
  const [jacketCut, setJacketCut] = useState<GiCut>("A2");

  const pantsImages = {
    black: "/images/products/black-gi-pants.png",
    blue: "/images/products/blue-gi-pants.png",
    white: "/images/products/white-gi-pants.png",
  };

  const jacketImages = {
    white: "/images/products/white-gi-jacket.png",
    blue: "/images/products/blue-gi-jacket.png",
    black: "/images/products/black-gi-jacket-angle.png",
  };

  const pantsPrice = pantsMaterial === "ripstop" ? 189 : 199;
  const jacketPrice = jacketGsm === 350 ? 319 : jacketGsm === 450 ? 329 : 349;

  const handleAddPants = () => {
    addItem({
      productId: `br-pants-${pantsColor}-${pantsMaterial}`,
      slug: "black-rhino-diamond-ripstop-replacement-pants",
      title:
        language === "pt"
          ? `Calça Avulsa Black Rhino 'Legend' ${pantsMaterial === "ripstop" ? "Ripstop 10oz" : "Lona 10oz"}`
          : `Black Rhino 'Legend' ${pantsMaterial === "ripstop" ? "10oz Diamond Ripstop" : "10oz Canvas"} Replacement Pants`,
      colorName:
        language === "pt"
          ? pantsColor === "black"
            ? "Preta"
            : pantsColor === "blue"
            ? "Azul"
            : "Branca"
          : pantsColor.charAt(0).toUpperCase() + pantsColor.slice(1),
      cut: pantsCut,
      price: pantsPrice,
      image: pantsImages[pantsColor],
      quantity: 1,
    });
  };

  const handleAddJacket = () => {
    addItem({
      productId: `br-jacket-${jacketColor}-${jacketGsm}`,
      slug: "black-rhino-atelier-kimono-jacket-only",
      title:
        language === "pt"
          ? `Vagui Avulso Black Rhino 'Legend' ${jacketGsm} GSM`
          : `Black Rhino 'Legend' ${jacketGsm} GSM Atelier Kimono Jacket`,
      colorName:
        language === "pt"
          ? jacketColor === "black"
            ? "Preto"
            : jacketColor === "blue"
            ? "Azul"
            : "Branco"
          : jacketColor.charAt(0).toUpperCase() + jacketColor.slice(1),
      cut: jacketCut,
      price: jacketPrice,
      image: jacketImages[jacketColor],
      quantity: 1,
    });
  };

  const cuts: GiCut[] = ["A0", "A1", "A1L", "A2", "A2L", "A2H", "A3", "A3L", "A4"];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-slate-card border border-slate-border text-xs font-mono uppercase text-rhinogold">
          <Layers className="w-3.5 h-3.5" />
          <span>{t("separatesTag")}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-bonewhite tracking-tight">
          {t("separatesTitle")}
        </h1>
        <p className="text-sm text-bonewhite-muted font-light leading-relaxed">
          {t("separatesDesc")}
        </p>
      </div>

      {/* 2-Column Split: Pants Module & Jacket Module */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Pants-Only */}
        <div className="bg-slate-surface border border-slate-border rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-border pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-rhinogold font-bold">
                  {t("moduleLower")}
                </span>
                <h2 className="text-2xl font-black uppercase text-bonewhite mt-0.5">
                  {t("replacementPants")}
                </h2>
              </div>
              <span className="text-2xl font-mono font-black text-bonewhite">
                {formatPrice(pantsPrice)}
              </span>
            </div>

            {/* Pants Image Viewport */}
            <div className="relative aspect-[4/3] bg-obsidian-900 border border-slate-border rounded-xl overflow-hidden">
              <Image
                src={pantsImages[pantsColor]}
                alt="Replacement Pants"
                fill
                className="object-contain p-4 transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute top-3 left-3 bg-obsidian-950/90 text-[10px] font-mono text-bonewhite border border-slate-border px-2 py-0.5 rounded uppercase">
                {language === "pt" ? "Canal com 6 Passadores" : "6-Channel Loop System"}
              </div>
            </div>

            {/* Pants Controls */}
            <div className="space-y-4">
              {/* Material Toggle */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-dim block mb-1.5">
                  {language === "pt" ? "1. Especificação do Tecido" : "1. Fabric Specification"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPantsMaterial("ripstop")}
                    className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-left ${
                      pantsMaterial === "ripstop"
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-bold"
                        : "border-slate-border bg-slate-card text-bonewhite-muted"
                    }`}
                  >
                    <span className="block font-bold">10 oz Diamond Ripstop</span>
                    <span className="text-[10px] text-rhinogold">
                      {language === "pt" ? "Ultraleve e Anti-Rasgo" : "Ultralight & Tear-Proof"}
                    </span>
                  </button>
                  <button
                    onClick={() => setPantsMaterial("canvas")}
                    className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-left ${
                      pantsMaterial === "canvas"
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-bold"
                        : "border-slate-border bg-slate-card text-bonewhite-muted"
                    }`}
                  >
                    <span className="block font-bold">{language === "pt" ? "Lona de Algodão 10 oz" : "10 oz Cotton Canvas"}</span>
                    <span className="text-[10px] text-rhinogold">
                      {language === "pt" ? "Máxima Proteção no Tatame" : "Heavy Mat Friction Shield"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-dim block mb-1.5">
                  {language === "pt" ? "2. Cor da Calça" : "2. Color Matching"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["black", "blue", "white"] as const).map((c) => {
                    const cLabel =
                      c === "black"
                        ? language === "pt" ? "Preta" : "Black"
                        : c === "blue"
                        ? language === "pt" ? "Azul" : "Blue"
                        : language === "pt" ? "Branca" : "White";
                    return (
                      <button
                        key={c}
                        onClick={() => setPantsColor(c)}
                        className={`p-2 rounded-lg border text-xs font-mono uppercase transition-all flex items-center justify-center space-x-1.5 ${
                          pantsColor === c
                            ? "border-rhinogold bg-rhinogold/15 text-bonewhite font-bold"
                            : "border-slate-border bg-slate-card text-bonewhite-muted"
                        }`}
                      >
                        <span>{cLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cut Selection */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-dim block mb-1.5">
                  {language === "pt" ? "3. Tamanho:" : "3. Cut Gauge:"} <strong className="text-rhinogold">{pantsCut}</strong>
                </label>
                <div className="flex flex-wrap gap-1">
                  {cuts.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPantsCut(c)}
                      className={`px-2.5 py-1 rounded text-xs font-mono border transition-all ${
                        pantsCut === c
                          ? "border-rhinogold bg-rhinogold text-obsidian-950 font-bold"
                          : "border-slate-border bg-slate-card text-bonewhite"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddPants}
            className="w-full bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-rhinogold/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t("addReplacementPants")} • {formatPrice(pantsPrice)}</span>
          </button>
        </div>

        {/* Module 2: Jacket-Only */}
        <div className="bg-slate-surface border border-slate-border rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-border pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-rhinogold font-bold">
                  {t("moduleUpper")}
                </span>
                <h2 className="text-2xl font-black uppercase text-bonewhite mt-0.5">
                  {t("jacketOnly")}
                </h2>
              </div>
              <span className="text-2xl font-mono font-black text-bonewhite">
                {formatPrice(jacketPrice)}
              </span>
            </div>

            {/* Jacket Image Viewport */}
            <div className="relative aspect-[4/3] bg-obsidian-900 border border-slate-border rounded-xl overflow-hidden">
              <Image
                src={jacketImages[jacketColor]}
                alt="Replacement Jacket"
                fill
                className="object-contain p-4 transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute top-3 left-3 bg-obsidian-950/90 text-[10px] font-mono text-rhinogold border border-slate-border px-2 py-0.5 rounded uppercase">
                {language === "pt" ? "Gola de Espuma EVA Vulcanizada" : "Vulcanized EVA Foam Lapel"}
              </div>
            </div>

            {/* Jacket Controls */}
            <div className="space-y-4">
              {/* GSM Selector */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-dim block mb-1.5">
                  {language === "pt" ? "1. Densidade do Trançado (GSM)" : "1. Weave Density (GSM)"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[350, 450, 550].map((gsm) => (
                    <button
                      key={gsm}
                      onClick={() => setJacketGsm(gsm as any)}
                      className={`p-2.5 rounded-lg border text-xs font-mono transition-all text-center ${
                        jacketGsm === gsm
                          ? "border-rhinogold bg-rhinogold text-obsidian-950 font-bold"
                          : "border-slate-border bg-slate-card text-bonewhite-muted"
                      }`}
                    >
                      <span className="block font-bold">{gsm} GSM</span>
                      <span className="text-[9px] opacity-80">
                        {gsm === 350 ? (language === "pt" ? "Ultraleve" : "Ultralight") : gsm === 450 ? (language === "pt" ? "Médio" : "Mid") : language === "pt" ? "Pesado" : "Heavy"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-dim block mb-1.5">
                  {language === "pt" ? "2. Cor Oficial Regulamentar" : "2. Official IBJJF Color"}
                </label>
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
                        onClick={() => setJacketColor(c)}
                        className={`p-2 rounded-lg border text-xs font-mono uppercase transition-all flex items-center justify-center space-x-1.5 ${
                          jacketColor === c
                            ? "border-rhinogold bg-rhinogold/15 text-bonewhite font-bold"
                            : "border-slate-border bg-slate-card text-bonewhite-muted"
                        }`}
                      >
                        <span>{cLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cut Selection */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-dim block mb-1.5">
                  {language === "pt" ? "3. Tamanho:" : "3. Cut Gauge:"} <strong className="text-rhinogold">{jacketCut}</strong>
                </label>
                <div className="flex flex-wrap gap-1">
                  {cuts.map((c) => (
                    <button
                      key={c}
                      onClick={() => setJacketCut(c)}
                      className={`px-2.5 py-1 rounded text-xs font-mono border transition-all ${
                        jacketCut === c
                          ? "border-rhinogold bg-rhinogold text-obsidian-950 font-bold"
                          : "border-slate-border bg-slate-card text-bonewhite"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddJacket}
            className="w-full bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-rhinogold/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t("addReplacementJacket")} • {formatPrice(jacketPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
