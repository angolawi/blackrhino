"use client";

import React, { useState } from "react";
import { REVIEWS } from "@/data/products";
import { Star, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function VerifiedMatReviews() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { language, t } = useLanguage();

  const filteredReviews = REVIEWS.filter((rev) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "directors") return rev.role.includes("Director");
    if (activeFilter === "champions") return rev.role.includes("Champion") || rev.role.includes("Medalist");
    return true;
  });

  const localizedQuotes: Record<string, string> = {
    "rev-1":
      language === "pt"
        ? "Dou 4 aulas por dia e rolo em todas elas. A gola do Legend Branco não amolece depois de 5 rounds como a de outras marcas. Após 60 lavagens, a lapela mantém o corte exato e a calça ripstop não desfia."
        : REVIEWS[0].quote,
    "rev-2":
      language === "pt"
        ? "O Legend Azul salvou minha pesagem no Mundial da IBJJF. Bati o peso confortavelmente sem sofrer para desidratar uma libra a mais. E na final, meu oponente não conseguia segurar a pegada de manga."
        : REVIEWS[1].quote,
    "rev-3":
      language === "pt"
        ? "Esse kimono é um verdadeiro tanque de guerra. Quando ajusto a pegada de lapela na postura do adversário, é quase impossível quebrar. A calça de lona tem proteção de joelho que salva o menisco no tatame áspero."
        : REVIEWS[2].quote,
    "rev-4":
      language === "pt"
        ? "Encontrar um kimono que sirva para quem tem 1,73m e braços compridos sem sobrar pano no tronco era impossível até eu usar o corte A1L da Black Rhino. O caimento é cirúrgico e 100% legal na pesagem."
        : REVIEWS[3].quote,
  };

  return (
    <section className="py-24 bg-obsidian border-b border-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-slate-card border border-slate-border text-[11px] font-mono uppercase text-rhinogold">
              <Award className="w-3.5 h-3.5 text-rhinogold" />
              <span>{t("reviewsTag")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-bonewhite tracking-tight">
              {t("reviewsTitle")}
            </h2>
            <p className="text-sm text-bonewhite-muted font-light max-w-xl">
              {t("reviewsSubhead")}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors border ${
                activeFilter === "all"
                  ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-bold"
                  : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
              }`}
            >
              {t("allReports")} ({REVIEWS.length})
            </button>
            <button
              onClick={() => setActiveFilter("champions")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors border ${
                activeFilter === "champions"
                  ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-bold"
                  : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
              }`}
            >
              {t("worldChampions")}
            </button>
            <button
              onClick={() => setActiveFilter("directors")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors border ${
                activeFilter === "directors"
                  ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-bold"
                  : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
              }`}
            >
              {t("academyDirectors")}
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 bg-slate-surface border border-slate-border rounded-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-rhinogold/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-rhinogold text-rhinogold" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-bonewhite-dim">{rev.date}</span>
                </div>

                <p className="text-sm sm:text-base text-bonewhite leading-relaxed italic font-light">
                  &ldquo;{localizedQuotes[rev.id] || rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-border/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-bonewhite uppercase">{rev.author}</h4>
                    {rev.verified && (
                      <span className="inline-flex items-center text-[10px] text-emerald-400 font-mono">
                        <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> {t("verifiedBuyer")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-rhinogold font-medium">{rev.role}</p>
                  <p className="text-[11px] text-bonewhite-dim">{rev.academy}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-bonewhite-dim block">
                    {t("armorDeployed")}
                  </span>
                  <span className="text-xs font-mono font-semibold text-bonewhite">
                    {rev.giModel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
