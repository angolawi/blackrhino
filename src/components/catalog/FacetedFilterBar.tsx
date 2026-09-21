"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface FilterState {
  category: string;
  weaveGsm: number[];
  pantsMaterial: string[];
  compliance: string[];
  cuts: string[];
  sanforizedOnly: boolean;
}

interface FacetedFilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

export function FacetedFilterBar({
  filters,
  onChange,
  onReset,
  totalMatches,
}: FacetedFilterBarProps) {
  const { language, t } = useLanguage();

  const toggleGsm = (gsm: number) => {
    const exists = filters.weaveGsm.includes(gsm);
    const updated = exists
      ? filters.weaveGsm.filter((g) => g !== gsm)
      : [...filters.weaveGsm, gsm];
    onChange({ ...filters, weaveGsm: updated });
  };

  const togglePants = (mat: string) => {
    const exists = filters.pantsMaterial.includes(mat);
    const updated = exists
      ? filters.pantsMaterial.filter((m) => m !== mat)
      : [...filters.pantsMaterial, mat];
    onChange({ ...filters, pantsMaterial: updated });
  };

  const toggleCompliance = (comp: string) => {
    const exists = filters.compliance.includes(comp);
    const updated = exists
      ? filters.compliance.filter((c) => c !== comp)
      : [...filters.compliance, comp];
    onChange({ ...filters, compliance: updated });
  };

  const toggleCut = (cut: string) => {
    const exists = filters.cuts.includes(cut);
    const updated = exists
      ? filters.cuts.filter((c) => c !== cut)
      : [...filters.cuts, cut];
    onChange({ ...filters, cuts: updated });
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.weaveGsm.length > 0 ||
    filters.pantsMaterial.length > 0 ||
    filters.compliance.length > 0 ||
    filters.cuts.length > 0 ||
    filters.sanforizedOnly;

  return (
    <div className="bg-slate-surface border border-slate-border rounded-xl p-5 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-border">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-rhinogold" />
          <h3 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
            {t("technicalFilters")}
          </h3>
          <span className="text-[11px] font-mono text-rhinogold bg-rhinogold/10 px-1.5 py-0.2 rounded">
            {totalMatches} {language === "pt" ? "Modelos" : "Models"}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-[11px] font-mono text-bonewhite-muted hover:text-matred transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t("reset")}</span>
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase text-bonewhite-dim block">
          {t("equipmentClass")}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: "all", label: language === "pt" ? "Todos os Kimonos" : "All Kimonos" },
            { id: "gis", label: language === "pt" ? "Kimonos Completos" : "Full Gis" },
            { id: "belts", label: language === "pt" ? "Faixas Graduadas" : "Ranked Belts" },
            { id: "separates", label: language === "pt" ? "Peças Avulsas" : "Separates" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ ...filters, category: cat.id })}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all text-left border ${
                filters.category === cat.id
                  ? "border-rhinogold bg-rhinogold/10 text-bonewhite font-bold"
                  : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Weave Weight (GSM) */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase text-bonewhite-dim block">
          {t("weaveDensity")}
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[350, 450, 550].map((gsm) => {
            const active = filters.weaveGsm.includes(gsm);
            return (
              <button
                key={gsm}
                onClick={() => toggleGsm(gsm)}
                className={`py-1.5 px-2 rounded text-xs font-mono transition-all border text-center ${
                  active
                    ? "border-rhinogold bg-rhinogold text-obsidian-950 font-black"
                    : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                }`}
              >
                {gsm} GSM
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit & Cuts: Standard vs Long vs Heavy */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase text-bonewhite-dim block">
          {t("targetFit")}
        </label>
        <div className="flex flex-wrap gap-1">
          {["A0", "A1", "A1L", "A2", "A2L", "A2H", "A3", "A3L", "A4"].map((cut) => {
            const active = filters.cuts.includes(cut);
            return (
              <button
                key={cut}
                onClick={() => toggleCut(cut)}
                className={`px-2 py-1 rounded text-xs font-mono transition-all border ${
                  active
                    ? "border-rhinogold bg-rhinogold text-obsidian-950 font-bold"
                    : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                }`}
              >
                {cut}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pants Material */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase text-bonewhite-dim block">
          {t("pantsMaterial")}
        </label>
        <div className="space-y-1">
          {[
            { id: "10 oz Diamond Ripstop", label: language === "pt" ? "Ripstop Diamantado 10 oz" : "10 oz Diamond Ripstop" },
            { id: "10 oz Cotton Canvas", label: language === "pt" ? "Lona de Algodão 10 oz" : "10 oz Cotton Canvas" },
          ].map((mat) => {
            const active = filters.pantsMaterial.includes(mat.id);
            return (
              <label
                key={mat.id}
                className="flex items-center space-x-2 text-xs text-bonewhite-muted hover:text-bonewhite cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => togglePants(mat.id)}
                  className="rounded border-slate-border bg-slate-card text-rhinogold focus:ring-0 focus:ring-offset-0"
                />
                <span>{mat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Tournament Compliance */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase text-bonewhite-dim block">
          {t("tournCompliance")}
        </label>
        <div className="space-y-1">
          {[
            { id: "IBJJF Legal", label: language === "pt" ? "Homologado IBJJF / CBJJ" : "IBJJF Legal" },
            { id: "Academy / In-House Edition", label: language === "pt" ? "Edição Especial de Academia" : "Academy / In-House Edition" },
          ].map((comp) => {
            const active = filters.compliance.includes(comp.id);
            return (
              <label
                key={comp.id}
                className="flex items-center space-x-2 text-xs text-bonewhite-muted hover:text-bonewhite cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleCompliance(comp.id)}
                  className="rounded border-slate-border bg-slate-card text-rhinogold focus:ring-0"
                />
                <span>{comp.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sanforization Toggle */}
      <div className="pt-2 border-t border-slate-border/80">
        <label className="flex items-center justify-between text-xs cursor-pointer py-1">
          <span className="font-mono text-bonewhite">{t("preShrunkOnly")}</span>
          <input
            type="checkbox"
            checked={filters.sanforizedOnly}
            onChange={(e) => onChange({ ...filters, sanforizedOnly: e.target.checked })}
            className="rounded border-slate-border bg-slate-card text-rhinogold focus:ring-0"
          />
        </label>
      </div>
    </div>
  );
}
