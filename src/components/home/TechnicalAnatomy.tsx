"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TECHNICAL_HOTSPOTS } from "@/data/products";
import { Crosshair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assetPath";

export function TechnicalAnatomy() {
  const [activeHotspotId, setActiveHotspotId] = useState<string>("collar");
  const { language, t } = useLanguage();

  const hotspotTranslations: Record<string, { title: string; description: string }> = {
    collar: {
      title: language === "pt" ? "Gola de Espuma EVA Vulcanizada" : "Vulcanized EVA Foam Collar",
      description:
        language === "pt"
          ? "Núcleo de 12 camadas de borracha EVA vulcanizada envolto em sarja de algodão de alta densidade. Secagem rápida, anti-microbiana e com rigidez ideal para dificultar o estrangulamento adversário sem reprovação na medição oficial da IBJJF/CBJJ."
          : "A 12-layer vulcanized EVA rubber core wrapped in high-density cotton twill. Quick-drying, anti-microbial, and engineered with optimal stiffness to deny opponent lapel chokes while passing IBJJF flexible collar thickness gauge.",
    },
    shoulders: {
      title: language === "pt" ? "Costura Tripla Reforçada no Ombro" : "Triple-Needle Reinforced Yoke",
      description:
        language === "pt"
          ? "Construção inteiriça sem costuras nas costas elimina pontos de ruptura. As interseções dos ombros recebem costura tripla de nylon com fita de acabamento interna para evitar queimaduras por atrito durante raspagens."
          : "Continuous seamless back construction eliminates vulnerable spinal seams. Back and shoulder intersections feature triple-stitched nylon thread with internal twill binding to eliminate skin friction burns during hard guard recovery.",
    },
    "skirt-vents": {
      title: language === "pt" ? "Abertura Lateral com Travetes Reforçados" : "Bar-Tacked Split Vent Skirt",
      description:
        language === "pt"
          ? "As aberturas laterais da saia sofrem tração constante quando os adversários buscam lapelas ou guarda worm. Cada abertura é reforçada com fita espinha de peixe e travetes em X para suportar arrancadas sem rasgar."
          : "Lateral skirt vents receive maximum torque when opponents tug for worm guard and lapel controls. Every vent is backed with woven herringbone twill tape and cross-box bartacked for zero tearing under stress.",
    },
    "pants-waist": {
      title: language === "pt" ? "Cós com 6 Passadores e Cordão Reforçado" : "6-Channel Loop Drawstring Channel",
      description:
        language === "pt"
          ? "Kimonos comuns usam 2 a 4 passadores que sobem durante berimbolos. A Black Rhino utiliza 6 canais passadores reforçados com cordão tubular especial, mantendo a calça firme no quadril em qualquer movimentação."
          : "Standard gis use 2 or 4 loops that ride up during berimbolos. Black Rhino features 6 reinforced channel loops paired with custom woven cord, keeping your pants locked around your hips through every scramble.",
    },
  };

  const activeHotspot =
    TECHNICAL_HOTSPOTS.find((h) => h.id === activeHotspotId) || TECHNICAL_HOTSPOTS[0];

  const currentTranslation = hotspotTranslations[activeHotspot.id] || {
    title: activeHotspot.title,
    description: activeHotspot.description,
  };

  return (
    <section id="anatomy" className="py-24 bg-obsidian-950 border-b border-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-slate-card border border-slate-border text-[11px] font-mono uppercase text-rhinogold">
            <Crosshair className="w-3.5 h-3.5 text-rhinogold" />
            <span>{t("anatomyTag")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-bonewhite tracking-tight">
            {t("anatomyTitle")}
          </h2>
          <p className="text-sm text-bonewhite-muted font-light">
            {t("anatomySubhead")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Gi Blueprint with Hotspot Targets */}
          <div className="lg:col-span-7 bg-slate-surface border border-slate-border rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="relative aspect-[4/5] sm:aspect-square w-full max-w-lg mx-auto bg-obsidian-900 rounded-xl overflow-hidden border border-slate-border/50">
              <Image
                src={getAssetPath("/images/products/white-gi-jacket.png")}
                alt="Black Rhino Gi Technical Anatomy Blueprint"
                fill
                className="object-contain p-4"
              />

              {/* Hotspot Target Markers */}
              {TECHNICAL_HOTSPOTS.map((hotspot) => {
                const isActive = hotspot.id === activeHotspotId;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveHotspotId(hotspot.id)}
                    style={{
                      left: `${hotspot.xPercent}%`,
                      top: `${hotspot.yPercent}%`,
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group`}
                    aria-label={hotspot.title}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isActive ? "bg-rhinogold" : "bg-bonewhite/40"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-7 w-7 border-2 items-center justify-center font-mono text-xs font-bold transition-transform group-hover:scale-110 shadow-lg ${
                          isActive
                            ? "bg-rhinogold border-obsidian-950 text-obsidian-950"
                            : "bg-obsidian-900/90 border-rhinogold text-rhinogold"
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick selector buttons below image on mobile */}
            <div className="grid grid-cols-2 gap-2 mt-4 lg:hidden">
              {TECHNICAL_HOTSPOTS.map((h) => {
                const label = hotspotTranslations[h.id]?.title || h.title;
                return (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspotId(h.id)}
                    className={`p-2 rounded text-[11px] font-mono uppercase text-left transition-colors border ${
                      activeHotspotId === h.id
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite"
                        : "border-slate-border bg-slate-card text-bonewhite-muted"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Hotspot Deep-Dive Detail Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-card border border-slate-border rounded-xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rhinogold/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rhinogold" />
                <span className="text-xs font-mono uppercase tracking-widest text-rhinogold font-bold">
                  {language === "pt" ? "Inspeção do Componente" : "Component Inspection"} 0{TECHNICAL_HOTSPOTS.findIndex((h) => h.id === activeHotspotId) + 1}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase text-bonewhite tracking-tight">
                {currentTranslation.title}
              </h3>

              <p className="text-sm text-bonewhite-muted leading-relaxed">
                {currentTranslation.description}
              </p>

              {/* Sub-Technical Callouts */}
              <div className="pt-4 border-t border-slate-border/80 space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-obsidian-900 rounded border border-slate-border/50">
                  <span className="text-bonewhite-dim font-mono">{t("ibjjfRuleCompliance")}</span>
                  <span className="text-emerald-400 font-mono font-bold">100% {language === "pt" ? "Homologado" : "Certified"}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-obsidian-900 rounded border border-slate-border/50">
                  <span className="text-bonewhite-dim font-mono">{t("stitchDensity")}</span>
                  <span className="text-bonewhite font-mono">14 {language === "pt" ? "Pontos" : "Stitches"} / 3cm</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-obsidian-900 rounded border border-slate-border/50">
                  <span className="text-bonewhite-dim font-mono">{t("fabricOrigin")}</span>
                  <span className="text-rhinogold font-mono">{language === "pt" ? "Ateliê Brasília, DF (Brasil)" : "Brasília Atelier (Brazil)"}</span>
                </div>
              </div>
            </div>

            {/* Micro-Navigation between all 4 hotspots */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-bonewhite-dim block">
                {t("jumpToPoint")}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {TECHNICAL_HOTSPOTS.map((h) => {
                  const label = hotspotTranslations[h.id]?.title || h.title;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspotId(h.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        h.id === activeHotspotId
                          ? "border-rhinogold bg-slate-surface text-bonewhite font-semibold"
                          : "border-slate-border bg-slate-card/50 text-bonewhite-muted hover:border-slate-lightBorder"
                      }`}
                    >
                      <span className="text-xs block truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
