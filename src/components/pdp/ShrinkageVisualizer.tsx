"use client";

import React, { useState } from "react";
import { Waves, Flame, Sun, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ShrinkageVisualizer() {
  const { language, t } = useLanguage();
  const [washSetting, setWashSetting] = useState<"cold" | "warm" | "hot">("cold");

  const settings = {
    cold: {
      label: language === "pt" ? "Lavagem Fria (< 30°C) + Secar no Varal à Sombra" : "Cold Wash (< 30°C) + Line Dry",
      shrinkPercent: 0.8,
      sleeveDelta: "-0.4 cm",
      pantsDelta: "-0.5 cm",
      ibjjfStatus: language === "pt" ? "100% Homologado na Medição Oficial" : "100% Tournament Legal Length Maintained",
      description:
        language === "pt"
          ? "Preserva as dimensões exatas sanforizadas de fábrica. Recomendado para manter o comprimento legal na checagem de uniforme."
          : "Preserves factory sanforized dimensions. Recommended for maintaining exact IBJJF uniform checker inspection standards.",
      icon: Waves,
      iconColor: "text-blue-400",
    },
    warm: {
      label: language === "pt" ? "Lavagem Morna (40°C) + Secar no Varal" : "Warm Wash (40°C) + Line Dry",
      shrinkPercent: 2.5,
      sleeveDelta: "-1.8 cm",
      pantsDelta: "-2.2 cm",
      ibjjfStatus: language === "pt" ? "Leve ajuste anatômico nos ombros e costas" : "Slight snug fit across lats and shoulders",
      description:
        language === "pt"
          ? "Acomodação suave das fibras. Ideal se comprou meio tamanho acima e deseja ajustar o caimento do tórax."
          : "Subtle dimensional settling. Ideal if you bought a half-size larger and want to dial in the chest wrap.",
      icon: Sun,
      iconColor: "text-amber-400",
    },
    hot: {
      label: language === "pt" ? "Lavagem Quente + Secadora de Roupa" : "Warm/Hot Wash + Machine Tumble Dry",
      shrinkPercent: 4.8,
      sleeveDelta: "-3.8 cm",
      pantsDelta: "-4.5 cm",
      ibjjfStatus: language === "pt" ? "Encolhimento agressivo (Atenção ao punho)" : "Aggressive shrinkage (May affect cuff length)",
      description:
        language === "pt"
          ? "Use com cuidado. Reduz intencionalmente o kimono em até meio tamanho. A borracha vulcanizada da gola permanece intacta."
          : "Use with caution. Intentionally down-sizes a loose Gi by nearly a full half-cut. Collar EVA core remains unaffected.",
      icon: Flame,
      iconColor: "text-matred",
    },
  };

  const current = settings[washSetting];

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-border/80 pb-3">
        <div className="flex items-center space-x-2">
          <Waves className="w-4 h-4 text-rhinogold" />
          <h3 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
            {t("shrinkageTitle")}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
          {t("sanforizedCore")}
        </span>
      </div>

      {/* Wash Protocol Switcher */}
      <div className="grid grid-cols-3 gap-2">
        {(["cold", "warm", "hot"] as const).map((key) => {
          const isSelected = washSetting === key;
          const conf = settings[key];
          const tabLabel =
            key === "cold"
              ? language === "pt" ? "Fria" : "Cold"
              : key === "warm"
              ? language === "pt" ? "Morna" : "Warm"
              : language === "pt" ? "Quente" : "Hot";
          return (
            <button
              key={key}
              onClick={() => setWashSetting(key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-semibold shadow-sm"
                  : "border-slate-border bg-obsidian-900 text-bonewhite-muted hover:border-slate-lightBorder"
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <conf.icon className={`w-3.5 h-3.5 ${conf.iconColor}`} />
                <span className="text-xs font-mono uppercase font-bold text-bonewhite">
                  {tabLabel}
                </span>
              </div>
              <span className="text-[11px] font-mono block text-rhinogold">
                {conf.shrinkPercent}% {language === "pt" ? "perda" : "loss"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visual Impact Box */}
      <div className="p-4 bg-obsidian-900 border border-slate-border rounded-xl space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-rhinogold uppercase font-bold block">
              {current.label}
            </span>
            <p className="text-xs text-bonewhite-muted mt-1 leading-relaxed">
              {current.description}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <span className="text-2xl font-mono font-black text-bonewhite block">
              {current.shrinkPercent}%
            </span>
            <span className="text-[10px] font-mono uppercase text-bonewhite-dim">
              {t("estimatedLoss")}
            </span>
          </div>
        </div>

        {/* Dimension Deltas */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-border/50 text-xs font-mono">
          <div className="p-2 bg-slate-surface rounded border border-slate-border/50 flex justify-between">
            <span className="text-bonewhite-dim">{t("sleeveDrift")}</span>
            <span className={washSetting === "hot" ? "text-matred font-bold" : "text-bonewhite"}>
              {current.sleeveDelta}
            </span>
          </div>
          <div className="p-2 bg-slate-surface rounded border border-slate-border/50 flex justify-between">
            <span className="text-bonewhite-dim">{t("pantsDrift")}</span>
            <span className={washSetting === "hot" ? "text-matred font-bold" : "text-bonewhite"}>
              {current.pantsDelta}
            </span>
          </div>
        </div>

        {/* IBJJF Rule Status Banner */}
        <div className="p-2.5 rounded bg-slate-surface/80 border border-slate-border/60 flex items-center space-x-2 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-bonewhite-muted">
            <strong className="text-bonewhite">{t("tournamentCheck")}</strong> {current.ibjjfStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
