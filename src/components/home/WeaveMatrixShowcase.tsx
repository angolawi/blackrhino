"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WEAVE_MATRIX_DATA } from "@/data/products";
import { Shield, Zap, Flame, Check, ArrowRight, Gauge, Clock, Scale } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function WeaveMatrixShowcase() {
  const [selectedWeaveId, setSelectedWeaveId] = useState<string>("competition");
  const { language, t } = useLanguage();

  const currentWeave = WEAVE_MATRIX_DATA.find((w) => w.id === selectedWeaveId) || WEAVE_MATRIX_DATA[1];

  // Portuguese localized labels for weaves
  const weaveLabels: Record<string, { title: string; bestFor: string; feel: string }> = {
    ultralight: {
      title: language === "pt" ? "Legend Azul Ultraleve (350 GSM)" : "Ultralight Legend Blue (350 GSM)",
      bestFor:
        language === "pt"
          ? "Pesagens em campeonatos, climas quentes, especialistas em raspagens e velocidade"
          : "Tournament weigh-ins, hot climates, scramble specialists",
      feel:
        language === "pt" ? "Extremamente leve, maleável, zero atrito" : "Featherlight, supple, zero hindrance",
    },
    competition: {
      title:
        language === "pt"
          ? "Legend Branco Competição (450 GSM)"
          : "Standard Competition Legend White (450 GSM)",
      bestFor:
        language === "pt"
          ? "Treinos diários para campeonato, finais da IBJJF/CBJJ, equilíbrio de quebra de pegada"
          : "Daily tournament training, IBJJF championship finals, balanced grip-breaking",
      feel:
        language === "pt"
          ? "Firme, estruturado, alta rejeição de pegadas"
          : "Crisp, structured, high grip rejection",
    },
    armored: {
      title:
        language === "pt"
          ? "Legend Preto Trançado Pesado (550 GSM)"
          : "Heavyweight Legend Black (550 GSM)",
      bestFor:
        language === "pt"
          ? "Atletas pesados, treinos duros diários, máxima durabilidade e quebra de pegada"
          : "Heavyweights, hard daily sparring, judo cross-training, maximum durability",
      feel:
        language === "pt"
          ? "Casca-grossa, gola inquebrável, cansaço brutal para a pegada do oponente"
          : "Indestructible structure, brutal grip fatigue for opponents",
    },
  };

  const activeLabel = weaveLabels[currentWeave.id] || {
    title: currentWeave.title,
    bestFor: currentWeave.bestFor,
    feel: currentWeave.feel,
  };

  return (
    <section id="weave-matrix" className="py-24 bg-obsidian border-b border-slate-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-slate-card border border-slate-border text-[11px] font-mono uppercase text-rhinogold">
            <span>{t("matrixTag")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-bonewhite tracking-tight">
            {t("matrixTitle")}
          </h2>
          <p className="text-sm sm:text-base text-bonewhite-muted font-light leading-relaxed">
            {t("matrixSubhead")}
          </p>
        </div>

        {/* 3-Way Split Interactive Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
          {WEAVE_MATRIX_DATA.map((weave) => {
            const isSelected = weave.id === selectedWeaveId;
            const wLabel = weaveLabels[weave.id] || { title: weave.title, bestFor: weave.bestFor };
            return (
              <button
                key={weave.id}
                onClick={() => setSelectedWeaveId(weave.id)}
                className={`p-5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-surface border-rhinogold shadow-xl shadow-rhinogold/10"
                    : "bg-slate-card/60 border-slate-border hover:border-slate-lightBorder hover:bg-slate-card"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="bg-rhinogold text-obsidian-950 text-[9px] font-mono font-bold uppercase py-0.5 text-center transform rotate-45 translate-x-4 translate-y-2">
                      {language === "pt" ? "Ativo" : "Active"}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-bonewhite">
                    {weave.gsm} <span className="text-xs text-rhinogold font-normal">GSM</span>
                  </span>
                  {weave.gsm === 350 && <Zap className="w-5 h-5 text-blue-400" />}
                  {weave.gsm === 450 && <Shield className="w-5 h-5 text-rhinogold" />}
                  {weave.gsm === 550 && <Flame className="w-5 h-5 text-matred" />}
                </div>
                <h3 className="text-sm font-bold uppercase text-bonewhite mb-1">
                  {wLabel.title}
                </h3>
                <p className="text-xs text-bonewhite-muted line-clamp-2 leading-relaxed">
                  {wLabel.bestFor}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Spec Showcase of Selected Weave */}
        <div className="bg-slate-surface border border-slate-border rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5">
            <div className="relative h-80 sm:h-96 w-full bg-obsidian-900 rounded-xl overflow-hidden border border-slate-border/80">
              <Image
                src={currentWeave.image}
                alt={activeLabel.title}
                fill
                className="object-contain p-4 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-obsidian-950/80 backdrop-blur-md px-3 py-1 rounded border border-slate-border text-xs font-mono text-rhinogold">
                {currentWeave.gsm} GSM • {currentWeave.pantFabric}
              </div>
            </div>
          </div>

          {/* Technical Data Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-rhinogold tracking-wider">
                {language === "pt" ? "Perfil Técnico" : "Tactical Profile"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-bonewhite mt-1">
                {activeLabel.title}
              </h3>
              <p className="text-sm text-bonewhite-muted mt-2 leading-relaxed">
                {activeLabel.bestFor}. {language === "pt" ? "Desenvolvido de acordo com as normas da IBJJF / CBJJ para peso e pegadas." : "Engineered to maximize compliance under IBJJF Article 8 Gi regulations while optimizing weight and grip resistance."}
              </p>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-obsidian-900 border border-slate-border rounded-lg space-y-1">
                <div className="flex items-center text-bonewhite-dim text-[11px] font-mono">
                  <Scale className="w-3.5 h-3.5 mr-1 text-rhinogold" /> {t("suitWeight")}
                </div>
                <div className="text-sm font-bold font-mono text-bonewhite">
                  {currentWeave.jacketWeight}
                </div>
              </div>

              <div className="p-3 bg-obsidian-900 border border-slate-border rounded-lg space-y-1">
                <div className="flex items-center text-bonewhite-dim text-[11px] font-mono">
                  <Gauge className="w-3.5 h-3.5 mr-1 text-rhinogold" /> {t("tensileStiffness")}
                </div>
                <div className="text-sm font-bold font-mono text-bonewhite">
                  {currentWeave.tensileStrength}
                </div>
              </div>

              <div className="p-3 bg-obsidian-900 border border-slate-border rounded-lg space-y-1">
                <div className="flex items-center text-bonewhite-dim text-[11px] font-mono">
                  <Clock className="w-3.5 h-3.5 mr-1 text-rhinogold" /> {t("dryCycle")}
                </div>
                <div className="text-sm font-bold font-mono text-bonewhite">
                  {language === "pt" ? currentWeave.dryTime.replace("Hours", "Horas") : currentWeave.dryTime}
                </div>
              </div>
            </div>

            {/* Tactical Characteristics */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-rhinogold flex-shrink-0 mt-0.5" />
                <span className="text-bonewhite">
                  <strong>{t("collarSpec")}</strong> {currentWeave.collarThickness} {language === "pt" ? "com núcleo anti-bacteriano" : "with anti-microbial core"}.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-rhinogold flex-shrink-0 mt-0.5" />
                <span className="text-bonewhite">
                  <strong>{t("tactileTexture")}</strong> {activeLabel.feel}.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-rhinogold flex-shrink-0 mt-0.5" />
                <span className="text-bonewhite">
                  <strong>{t("pantsConstruction")}</strong> {currentWeave.pantFabric} {language === "pt" ? "com reforço de joelho" : "with reinforced knee channels"}.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/products/${currentWeave.slug}`}
                className="inline-flex items-center space-x-2 bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
              >
                <span>{t("inspectFullGsm")} ({currentWeave.gsm} GSM)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
