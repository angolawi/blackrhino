"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatCep, cleanCep } from "@/lib/shipping";
import { ShippingQuote } from "@/types/shipping";
import {
  Truck,
  MapPin,
  Loader2,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Zap,
  Store,
  RotateCcw,
} from "lucide-react";

export function ShippingCalculator() {
  const {
    shippingCep,
    shippingAddress,
    shippingQuotes,
    selectedShippingQuote,
    isCalculatingShipping,
    shippingError,
    calculateShipping,
    selectShippingQuote,
    clearShipping,
    formatPrice,
    items,
  } = useCart();

  const { language, t } = useLanguage();
  const [inputCep, setInputCep] = useState<string>(shippingCep || "");

  if (items.length === 0) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatCep(e.target.value);
    setInputCep(masked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = cleanCep(inputCep);
    if (raw.length === 8) {
      await calculateShipping(raw);
    }
  };

  const handleReset = () => {
    clearShipping();
    setInputCep("");
  };

  const getCarrierIcon = (quote: ShippingQuote) => {
    if (quote.company?.picture) {
      return (
        <div className="w-5 h-5 rounded bg-white/95 p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
          <img
            src={quote.company.picture}
            alt={quote.company.name}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    switch (quote.carrier) {
      case "blackrhino_express":
        return <Zap className="w-4 h-4 text-rhinogold flex-shrink-0" />;
      case "local_pickup":
        return <Store className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
      case "transportadora":
        return <Truck className="w-4 h-4 text-blue-400 flex-shrink-0" />;
      default:
        return <Truck className="w-4 h-4 text-rhinogold flex-shrink-0" />;
    }
  };

  return (
    <div className="p-3.5 bg-slate-surface/90 border border-slate-border/80 rounded-xl space-y-3 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-rhinogold" />
          <h4 className="text-xs font-mono uppercase font-bold text-bonewhite tracking-wider">
            {t("shippingCalculatorTitle")}
          </h4>
        </div>

        {shippingAddress && (
          <button
            onClick={handleReset}
            className="text-[11px] font-mono text-bonewhite-muted hover:text-rhinogold flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            {t("changeCep")}
          </button>
        )}
      </div>

      {/* Se ainda não calculou endereço */}
      {!shippingAddress ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputCep}
                onChange={handleInputChange}
                placeholder={t("shippingCepPlaceholder")}
                maxLength={9}
                className="w-full bg-obsidian-900 border border-slate-border text-bonewhite placeholder:text-bonewhite-dim text-xs font-mono px-3 py-2.5 rounded-lg focus:border-rhinogold focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={cleanCep(inputCep).length !== 8 || isCalculatingShipping}
              className="bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold px-4 py-2.5 text-xs uppercase tracking-wider rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[90px]"
            >
              {isCalculatingShipping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{t("calculate")}</span>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-bonewhite-muted pt-0.5">
            <span className="text-[10px] text-bonewhite-dim">
              {language === "pt" ? "Envio direto do Ateliê em Brasília, DF" : "Dispatched from Brasília Atelier"}
            </span>
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bonewhite-dim hover:text-rhinogold inline-flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3 h-3" />
              {t("dontKnowCep")}
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </div>

          {shippingError && (
            <p className="text-[11px] text-matred bg-matred/10 border border-matred/20 rounded p-2">
              {shippingError}
            </p>
          )}
        </form>
      ) : (
        /* Endereço Identificado e Opções de Cotação */
        <div className="space-y-2.5">
          {/* Badge de Endereço Identificado */}
          <div className="flex items-center justify-between bg-obsidian-950/80 border border-slate-border/70 rounded-lg p-2.5 text-xs">
            <div className="flex items-center space-x-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-rhinogold flex-shrink-0" />
              <div className="truncate">
                <span className="text-bonewhite font-semibold">
                  {shippingAddress.city} - {shippingAddress.state}
                </span>
                {shippingAddress.neighborhood && (
                  <span className="text-bonewhite-dim text-[11px] ml-1">
                    ({shippingAddress.neighborhood})
                  </span>
                )}
                <span className="text-rhinogold font-mono text-[11px] ml-2">
                  CEP {shippingAddress.cep}
                </span>
              </div>
            </div>
          </div>

          {/* Opções de Envio Disponíveis */}
          <div className="space-y-1.5">
            {shippingQuotes.map((quote) => {
              const isSelected = selectedShippingQuote?.id === quote.id;
              const daysText =
                quote.deliveryDaysMin === quote.deliveryDaysMax
                  ? `${quote.deliveryDaysMin} ${
                      quote.deliveryDaysMin === 1 ? t("businessDaySingle") : t("businessDays")
                    }`
                  : `${quote.deliveryDaysMin} a ${quote.deliveryDaysMax} ${t("businessDays")}`;

              return (
                <div
                  key={quote.id}
                  onClick={() => selectShippingQuote(quote.id)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "border-rhinogold bg-rhinogold/10 text-bonewhite shadow-sm"
                      : "border-slate-border/60 bg-slate-card/60 hover:border-slate-border text-bonewhite-muted"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-rhinogold bg-rhinogold text-obsidian-950"
                          : "border-bonewhite-dim bg-transparent"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-obsidian-950" />}
                    </div>

                    {getCarrierIcon(quote)}

                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-semibold text-bonewhite">
                          {quote.name}
                        </span>
                        {quote.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                              quote.isFree
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-slate-border text-rhinogold"
                            }`}
                          >
                            {quote.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-bonewhite-muted">
                        {language === "pt" ? `Chega em ${daysText}` : `Arrives in ${daysText}`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {quote.isFree ? (
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {t("free")}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-bonewhite font-mono">
                        {formatPrice(quote.price)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
