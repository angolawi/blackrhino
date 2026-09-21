"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assetPath";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-border bg-obsidian-950">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getAssetPath("/images/products/black-gi-lapel-macro.png")}
          alt="Black Rhino Kimono Heavy Pearl Weave Texture"
          fill
          priority
          className="object-cover object-center opacity-25 filter contrast-125 brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/80 to-transparent" />
        <div className="absolute inset-0 bg-tactical-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Tactical Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-surface/90 border border-rhinogold/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rhinogold animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-rhinogold font-bold">
              {t("heroBadge")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-bonewhite leading-[1.05] font-sans">
            {t("heroTitle1")} <br />
            <span className="gold-text-gradient">{t("heroTitle2")}</span>
          </h1>

          {/* Quick Subhead */}
          <p className="text-lg sm:text-xl text-bonewhite-muted font-light leading-relaxed max-w-2xl">
            {t("heroSubhead")}
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center space-x-2 bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-xs transition-all shadow-lg shadow-rhinogold/20 group"
            >
              <span>{t("exploreComp")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/#weave-matrix"
              className="inline-flex items-center justify-center space-x-2 bg-slate-card hover:bg-slate-hover border border-slate-border text-bonewhite font-semibold px-8 py-4 rounded-lg uppercase tracking-wider text-xs transition-all"
            >
              <span>{t("viewMatrix")}</span>
            </Link>
          </div>

          {/* Tactical Trust Badges */}
          <div className="pt-10 border-t border-slate-border/50 grid grid-cols-3 gap-4 text-left">
            <div className="space-y-1">
              <span className="text-lg font-mono font-bold text-bonewhite block">350 - 550</span>
              <span className="text-[11px] font-mono uppercase text-bonewhite-dim block">
                {t("gsmSpectrum")}
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-border/60 pl-4">
              <span className="text-lg font-mono font-bold text-rhinogold block">&lt; 1.0%</span>
              <span className="text-[11px] font-mono uppercase text-bonewhite-dim block">
                {t("coldShrinkRatio")}
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-border/60 pl-4">
              <span className="text-lg font-mono font-bold text-emerald-400 block">100%</span>
              <span className="text-[11px] font-mono uppercase text-bonewhite-dim block">
                {t("ibjjfGuarantee")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Product Highlight Card (Desktop) */}
      <div className="hidden xl:block absolute right-12 bottom-12 z-20 w-80 bg-slate-surface/90 backdrop-blur-md border border-slate-border rounded-xl p-4 shadow-2xl">
        <div className="relative h-44 w-full bg-obsidian-900 rounded-lg overflow-hidden mb-3 border border-slate-border/50">
          <Image
            src={getAssetPath("/images/products/black-gi-jacket-angle.png")}
            alt="Black Rhino Trançado Pesado 550"
            fill
            className="object-contain p-2"
          />
          <div className="absolute top-2 right-2 bg-rhinogold text-obsidian-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
            550 GSM
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-rhinogold uppercase">{t("featuredArmor")}</p>
          <h4 className="text-xs font-bold text-bonewhite uppercase">Kimono Legend Preto (550 GSM)</h4>
          <p className="text-[11px] text-bonewhite-muted line-clamp-2">
            Gola inquebrável em EVA vulcanizado de 12 camadas que desgasta a pegada do adversário.
          </p>
        </div>
        <Link
          href="/products/black-rhino-armour-550-obsidian-black"
          className="mt-3 block text-center text-xs font-mono font-bold text-rhinogold hover:underline uppercase tracking-wider"
        >
          {t("inspectArchitecture")} &rarr;
        </Link>
      </div>
    </section>
  );
}
