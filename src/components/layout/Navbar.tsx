"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingBag, Shield, Menu, X, ChevronDown, Sparkles, Globe, Search, Languages } from "lucide-react";
import { Currency } from "@/types/product";

export function Navbar() {
  const { openCart, totalItems, currency, setCurrency } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: Currency[] = ["USD", "BRL", "EUR"];

  return (
    <>
      {/* Top Tactical Broadcast Ticker */}
      <div className="bg-obsidian-950 border-b border-slate-border text-[11px] py-1.5 px-4 font-mono text-bonewhite-muted flex items-center justify-between">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-rhinogold animate-pulse" />
          <span className="text-bonewhite font-medium">{t("batchAlert")}</span>
          <span className="hidden md:inline text-bonewhite-dim">•</span>
          <span className="hidden md:inline">{t("inspectedIn")}</span>
          <span className="hidden md:inline text-bonewhite-dim">•</span>
          <span className="hidden md:inline text-rhinogold">{t("freeShippingNotice")}</span>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="/custom-academy"
            className="text-bonewhite-muted hover:text-rhinogold transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-rhinogold inline" />
            <span>{t("academyBulk")}</span>
          </Link>

          {/* Interchangeable Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center space-x-1 text-bonewhite hover:text-rhinogold font-mono transition-colors bg-obsidian-900 border border-slate-border rounded px-2 py-0.5"
            >
              <Globe className="w-3 h-3 text-rhinogold" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-card border border-slate-border rounded shadow-xl py-1 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono hover:bg-slate-hover transition-colors ${
                      currency === curr ? "text-rhinogold font-bold" : "text-bonewhite"
                    }`}
                  >
                    {curr} {curr === "USD" ? "($ USD)" : curr === "BRL" ? "(R$ BRL)" : "(€ EUR)"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-obsidian/90 backdrop-blur-md border-b border-slate-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-slate-surface border border-rhinogold/40 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 shadow-md shadow-rhinogold/10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-rhinogold fill-current">
                <path d="M15,65 L25,48 L40,42 L55,42 L65,30 L72,30 L78,38 L88,38 L95,45 L90,52 L82,50 L75,58 L80,75 L70,75 L67,65 L48,65 L44,75 L34,75 L38,62 L22,65 Z M70,36 C68,36 66,34 66,32 C66,30 68,28 70,28 C72,28 74,30 74,32 C74,34 72,36 70,36 Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-widest text-bonewhite uppercase font-sans">
                  BLACK RHINO
                </span>
                <span className="text-[10px] bg-rhinogold/20 text-rhinogold px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
                  ATELIER
                </span>
              </div>
              <p className="text-[10px] tracking-tactical text-bonewhite-muted font-mono uppercase">
                {t("buildingArmourSubtitle")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-bonewhite-muted">
            <Link
              href="/collections"
              className="hover:text-bonewhite transition-colors relative py-1 hover:border-b-2 hover:border-rhinogold"
            >
              {t("gisAndArmor")}
            </Link>
            <Link
              href="/#weave-matrix"
              className="hover:text-bonewhite transition-colors relative py-1 hover:border-b-2 hover:border-rhinogold"
            >
              {t("weaveMatrix")}
            </Link>
            <Link
              href="/collections?category=belts"
              className="hover:text-bonewhite transition-colors relative py-1 hover:border-b-2 hover:border-rhinogold"
            >
              {t("rankedBelts")}
            </Link>
            <Link
              href="/separates"
              className="hover:text-bonewhite transition-colors relative py-1 hover:border-b-2 hover:border-rhinogold"
            >
              {t("separates")}
            </Link>
            <Link
              href="/custom-academy"
              className="text-rhinogold hover:text-rhinogold-light transition-colors relative py-1 font-bold flex items-center space-x-1"
            >
              <span>{t("academyStudio")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rhinogold animate-ping ml-1" />
            </Link>
          </nav>

          {/* Action Center */}
          <div className="flex items-center space-x-4">
            <Link
              href="/collections"
              className="p-2 text-bonewhite-muted hover:text-bonewhite hover:bg-slate-card rounded-lg transition-colors hidden sm:block"
              title={t("searchCatalog")}
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-slate-surface border border-slate-border hover:border-rhinogold/50 rounded-lg text-bonewhite transition-all flex items-center space-x-2 group"
            >
              <ShoppingBag className="w-4 h-4 text-rhinogold group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-mono font-bold uppercase tracking-wider">
                {t("matBag")}
              </span>
              {totalItems > 0 && (
                <span className="w-5 h-5 bg-rhinogold text-obsidian-950 rounded-full text-[11px] font-black flex items-center justify-center font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-bonewhite hover:text-rhinogold lg:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-obsidian-950 border-b border-slate-border px-6 py-6 space-y-5">
            {/* Currency in Mobile */}
            <div className="pb-3 border-b border-slate-border">
              <span className="text-[10px] font-mono text-bonewhite-muted uppercase block mb-1.5">
                {t("selectCurrency")}
              </span>
              <div className="flex space-x-1">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`flex-1 py-1 text-xs font-mono rounded border text-center ${
                      currency === c
                        ? "border-rhinogold text-rhinogold bg-rhinogold/10 font-bold"
                        : "border-slate-border text-bonewhite-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider">
              <Link
                href="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="text-bonewhite hover:text-rhinogold py-1"
              >
                {t("gisAndArmor")}
              </Link>
              <Link
                href="/#weave-matrix"
                onClick={() => setMobileMenuOpen(false)}
                className="text-bonewhite hover:text-rhinogold py-1"
              >
                {t("weaveMatrix")}
              </Link>
              <Link
                href="/collections?category=belts"
                onClick={() => setMobileMenuOpen(false)}
                className="text-bonewhite hover:text-rhinogold py-1"
              >
                {t("rankedBelts")}
              </Link>
              <Link
                href="/separates"
                onClick={() => setMobileMenuOpen(false)}
                className="text-bonewhite hover:text-rhinogold py-1"
              >
                {t("separates")}
              </Link>
              <Link
                href="/custom-academy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-rhinogold font-bold py-1 flex items-center justify-between"
              >
                <span>{t("academyStudio")}</span>
                <span className="text-[10px] bg-rhinogold/20 px-2 py-0.5 rounded font-mono">
                  B2B
                </span>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
