"use client";

import React, { useState } from "react";
import { GiCut } from "@/types/product";
import { Ruler, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SizeCalculatorProps {
  onSelectCut: (cut: GiCut) => void;
  selectedCut: string;
}

export function SizeCalculator({ onSelectCut, selectedCut }: SizeCalculatorProps) {
  const { language, t } = useLanguage();
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">(language === "pt" ? "metric" : "metric");
  const [heightCm, setHeightCm] = useState<number>(182);
  const [weightKg, setWeightKg] = useState<number>(78);
  const [build, setBuild] = useState<"slim" | "standard" | "muscular">("standard");

  // Calculate recommendation based on BJJ sizing curves
  const calculateRecommendation = (): { cut: GiCut; reason: string } => {
    const h = heightCm;
    const w = weightKg;

    if (h < 165) {
      if (w < 60) return { cut: "A0", reason: language === "pt" ? "Envergadura compacta e peso leve" : "Compact wingspan and lightweight frame" };
      return { cut: "A1", reason: language === "pt" ? "Tronco padrão com caimento regulamentar" : "Standard torso with hem clearance" };
    } else if (h <= 175) {
      if (w < 68) return { cut: "A1", reason: language === "pt" ? "Proporção ideal de manga e comprimento" : "Ideal torso and sleeve proportion" };
      if (w <= 77) {
        if (build === "slim") return { cut: "A1L", reason: language === "pt" ? "Manga mais longa sem excesso de pano no peito" : "Extra sleeve length without baggy torso" };
        return { cut: "A1", reason: language === "pt" ? "Caimento padrão de competição" : "Standard tournament competition drape" };
      }
      return { cut: "A2", reason: language === "pt" ? "Conforto no peitoral e ombros com punho regulamentar" : "Chest and shoulder comfort with legal cuffs" };
    } else if (h <= 184) {
      if (w < 75 && (build === "slim" || build === "standard")) {
        return { cut: "A1L", reason: language === "pt" ? "Corte longilíneo evitando manga curta na medição" : "Long wingspan cut preventing illegal sleeve pull" };
      }
      if (w <= 86) {
        if (build === "slim" || h >= 181) {
          return { cut: "A2L", reason: language === "pt" ? "Corte Longo (L): envergadura perfeita com tronco ajustado anti-pegada" : "Fitted long cut: optimal wingspan with anti-grip torso taper" };
        }
        return { cut: "A2", reason: language === "pt" ? "Padrão de campeonatos mundiais" : "Industry standard championship cut" };
      }
      if (build === "muscular") {
        return { cut: "A2H", reason: language === "pt" ? "Corte Robusto (H) acomodando dorsais e trapézios largos" : "Broad heavy cut accommodating wide lat & shoulder span" };
      }
      return { cut: "A2", reason: language === "pt" ? "Contorno clássico de competição" : "Competition contour" };
    } else if (h <= 192) {
      if (w <= 84 && build === "slim") {
        return { cut: "A2L", reason: language === "pt" ? "Maior alcance de manga com saia ajustada" : "Long reach contour with fitted skirt" };
      }
      if (w <= 95) {
        if (build === "slim") return { cut: "A3L", reason: language === "pt" ? "Atleta alto e magro com punho preciso" : "Tall lean frame with tournament-legal wrists" };
        return { cut: "A3", reason: language === "pt" ? "Proporção padrão da categoria pesado" : "Standard heavyweight bracket proportion" };
      }
      return { cut: "A3", reason: language === "pt" ? "Lapela robusta com folga nas coxas" : "Robust collar drape and thigh clearance" };
    } else {
      if (w <= 92 && build === "slim") {
        return { cut: "A3L", reason: language === "pt" ? "Comprimento extra nos braços e pernas" : "Extended sleeve and pants hem" };
      }
      return { cut: "A4", reason: language === "pt" ? "Kimono para pesadíssimo com ajuste perfeito e mobilidade" : "Super-heavyweight division kimono with unrestricted mobility" };
    }
  };

  const recommendation = calculateRecommendation();

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-border/80 pb-3">
        <div className="flex items-center space-x-2">
          <Ruler className="w-4 h-4 text-rhinogold" />
          <h3 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
            {t("sizeCalcTitle")}
          </h3>
        </div>

        {/* Unit Toggle */}
        <div className="flex bg-obsidian-900 border border-slate-border rounded p-0.5 text-[10px] font-mono">
          <button
            onClick={() => setUnitSystem("metric")}
            className={`px-2 py-0.5 rounded transition-colors ${
              unitSystem === "metric"
                ? "bg-rhinogold text-obsidian-950 font-bold"
                : "text-bonewhite-muted hover:text-bonewhite"
            }`}
          >
            Métrico (cm/kg)
          </button>
          <button
            onClick={() => setUnitSystem("imperial")}
            className={`px-2 py-0.5 rounded transition-colors ${
              unitSystem === "imperial"
                ? "bg-rhinogold text-obsidian-950 font-bold"
                : "text-bonewhite-muted hover:text-bonewhite"
            }`}
          >
            Imperial (ft/lbs)
          </button>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Height Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-bonewhite-dim">{t("athleteHeight")}</span>
            <span className="text-rhinogold font-bold">
              {unitSystem === "metric"
                ? `${heightCm} cm`
                : `${Math.floor(heightCm / 30.48)}'${Math.round((heightCm % 30.48) / 2.54)}"`}
            </span>
          </div>
          <input
            type="range"
            min={155}
            max={205}
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full accent-rhinogold bg-obsidian-900 h-1.5 rounded cursor-pointer"
          />
        </div>

        {/* Weight Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-bonewhite-dim">{t("athleteWeight")}</span>
            <span className="text-rhinogold font-bold">
              {unitSystem === "metric"
                ? `${weightKg} kg`
                : `${Math.round(weightKg * 2.20462)} lbs`}
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={125}
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full accent-rhinogold bg-obsidian-900 h-1.5 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Athletic Build Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase text-bonewhite-dim block">
          {t("buildProfile")}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "slim", label: t("buildSlim") },
            { id: "standard", label: t("buildStandard") },
            { id: "muscular", label: t("buildMuscular") },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setBuild(b.id as any)}
              className={`py-2 px-2 rounded-lg text-xs font-mono border transition-all text-center ${
                build === b.id
                  ? "border-rhinogold bg-rhinogold/15 text-bonewhite font-bold shadow-sm"
                  : "border-slate-border bg-obsidian-900 text-bonewhite-muted hover:border-slate-lightBorder"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tailored Recommendation Card */}
      <div className="p-4 bg-obsidian-900 border border-rhinogold/40 rounded-xl space-y-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase text-bonewhite-muted">{t("recommendedCut")}</span>
            <span className="px-2 py-0.5 bg-rhinogold text-obsidian-950 font-black font-mono text-sm rounded">
              {recommendation.cut}
            </span>
          </div>
          <p className="text-xs text-bonewhite-muted leading-relaxed">
            {recommendation.reason}. {language === "pt" ? "Garantia de conformidade com a régua oficial da IBJJF / CBJJ." : "Guaranteed compliant with IBJJF 4-finger cuff tolerance rule."}
          </p>
        </div>

        <button
          onClick={() => onSelectCut(recommendation.cut)}
          className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center space-x-1.5 flex-shrink-0 ${
            selectedCut === recommendation.cut
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              : "bg-rhinogold hover:bg-rhinogold-light text-obsidian-950"
          }`}
        >
          {selectedCut === recommendation.cut ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t("appliedToOrder")}</span>
            </>
          ) : (
            <>
              <span>{t("applyCut")} {recommendation.cut}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
