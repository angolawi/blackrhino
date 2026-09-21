"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/catalog/ProductCard";
import { FacetedFilterBar, FilterState } from "@/components/catalog/FacetedFilterBar";
import { QuickViewModal } from "@/components/catalog/QuickViewModal";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const { language, t } = useLanguage();

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    weaveGsm: [],
    pantsMaterial: [],
    compliance: [],
    cuts: [],
    sanforizedOnly: false,
  });

  const [sortOption, setSortOption] = useState<"featured" | "price-asc" | "price-desc" | "gsm-desc" | "rating">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      category: "all",
      weaveGsm: [],
      pantsMaterial: [],
      compliance: [],
      cuts: [],
      sanforizedOnly: false,
    });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }
      // Weave GSM filter
      if (filters.weaveGsm.length > 0 && !filters.weaveGsm.includes(product.weaveWeight)) {
        return false;
      }
      // Pants material filter
      if (filters.pantsMaterial.length > 0 && !filters.pantsMaterial.includes(product.pantsMaterial)) {
        return false;
      }
      // Compliance filter
      if (filters.compliance.length > 0 && !filters.compliance.includes(product.compliance)) {
        return false;
      }
      // Cuts filter
      if (filters.cuts.length > 0) {
        const hasMatchingCut = filters.cuts.some((c) => product.availableCuts.includes(c as any));
        if (!hasMatchingCut) return false;
      }
      // Sanforized
      if (filters.sanforizedOnly && !product.sanforized) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "gsm-desc") return b.weaveWeight - a.weaveWeight;
      if (sortOption === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [filters, sortOption]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-slate-border flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-rhinogold font-bold">
            {t("catalogTag")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-bonewhite tracking-tight mt-1">
            {t("catalogTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-bonewhite-muted mt-1 font-light">
            {t("catalogSubhead")}
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center space-x-2 bg-slate-surface border border-slate-border px-3.5 py-2 rounded-lg text-xs font-mono uppercase text-bonewhite"
          >
            <SlidersHorizontal className="w-4 h-4 text-rhinogold" />
            <span>{t("filters")} ({filteredProducts.length})</span>
          </button>

          <div className="flex items-center space-x-2 bg-slate-surface border border-slate-border px-3 py-1.5 rounded-lg text-xs font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-rhinogold" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-transparent text-bonewhite focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-obsidian-900">{t("featuredOrder")}</option>
              <option value="price-asc" className="bg-obsidian-900">{t("priceLowHigh")}</option>
              <option value="price-desc" className="bg-obsidian-900">{t("priceHighLow")}</option>
              <option value="gsm-desc" className="bg-obsidian-900">{t("heaviestWeave")}</option>
              <option value="rating" className="bg-obsidian-900">{t("topRated")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28">
          <FacetedFilterBar
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            totalMatches={filteredProducts.length}
          />
        </div>

        {/* Mobile Collapsible Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-12 mb-4">
            <FacetedFilterBar
              filters={filters}
              onChange={(newFilters) => {
                setFilters(newFilters);
              }}
              onReset={resetFilters}
              totalMatches={filteredProducts.length}
            />
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="lg:col-span-8 xl:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-slate-surface border border-slate-border rounded-xl p-8 space-y-4">
              <p className="text-base text-bonewhite font-semibold">
                {t("noMatches")}
              </p>
              <p className="text-xs text-bonewhite-muted">
                {language === "pt"
                  ? "Tente limpar os filtros de gramatura ou tamanho para ver todo o estoque disponível."
                  : "Try clearing weave GSM or cut constraints to see all available inventory."}
              </p>
              <button
                onClick={resetFilters}
                className="bg-rhinogold text-obsidian-950 px-6 py-2 rounded-lg text-xs font-mono uppercase font-bold"
              >
                {t("clearAllFilters")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function CollectionsPage() {
  const { language } = useLanguage();
  return (
    <Suspense fallback={<div className="p-12 text-center text-bonewhite font-mono">{language === "pt" ? "Carregando Catálogo..." : "Loading Catalog..."}</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
