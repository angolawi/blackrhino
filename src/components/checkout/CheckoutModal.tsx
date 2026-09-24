"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, QrCode, Lock, ArrowRight, Loader2 } from "lucide-react";

export function CheckoutModal() {
  const {
    subtotal,
    formatPrice,
    clearCart,
    items,
    isCheckoutOpen,
    closeCheckout,
    currency,
    freeShippingThreshold,
    shippingCost: contextShippingCost,
    selectedShippingQuote,
  } = useCart();
  const { language, t } = useLanguage();
  const [step, setStep] = useState<"details" | "processing" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "google_pay" | "pix">("pix");

  const [formData, setFormData] = useState({
    name: "Rodrigo Gracie da Silva",
    email: "rodrigo.bjj@academia.com.br",
    address: language === "pt" ? "SHTN Trecho 1, Bloco A" : "742 Evergreen Terrace",
    city: language === "pt" ? "Brasília" : "San Diego",
    state: language === "pt" ? "DF" : "CA",
    postalCode: language === "pt" ? "70800-200" : "92101",
    country: language === "pt" ? "Brasil" : "United States",
    cardNumber: "•••• •••• •••• 4242",
    expiry: "08/29",
    cvc: "888",
  });

  const [orderNumber, setOrderNumber] = useState("");

  if (!isCheckoutOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      const generatedOrder = `BR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setStep("success");
      clearCart();
    }, 1800);
  };

  const handleClose = () => {
    setStep("details");
    closeCheckout();
  };

  const shippingCost = selectedShippingQuote
    ? selectedShippingQuote.price
    : subtotal >= freeShippingThreshold
    ? 0
    : language === "pt"
    ? 35
    : 15;
  const tax = language === "pt" ? 0 : subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-surface border border-slate-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-border bg-obsidian-900">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-rhinogold/10 border border-rhinogold/30 flex items-center justify-center text-rhinogold font-bold text-xs">
              BR
            </div>
            <div>
              <h3 className="text-sm font-semibold text-bonewhite tracking-wider uppercase">
                {t("checkoutTitle")}
              </h3>
              <p className="text-xs text-bonewhite-muted flex items-center space-x-1">
                <Lock className="w-3 h-3 text-rhinogold inline mr-1" /> {t("encryptedGateway")}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-bonewhite-muted hover:text-bonewhite transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {step === "details" && (
            <form onSubmit={handlePay} className="space-y-6">
              {/* Express Payment Options */}
              <div>
                <label className="text-xs font-mono uppercase text-bonewhite-muted tracking-wider block mb-2">
                  {t("expressGateway")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all ${
                      paymentMethod === "card"
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite"
                        : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-rhinogold" />
                    {language === "pt" ? "Cartão" : "Credit / Debit"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all ${
                      paymentMethod === "pix"
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite"
                        : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1 text-emerald-400" />
                    PIX (Brasil 🇧🇷)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple_pay")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all ${
                      paymentMethod === "apple_pay"
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite"
                        : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mb-1 text-bonewhite" />
                    Apple Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("google_pay")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all ${
                      paymentMethod === "google_pay"
                        ? "border-rhinogold bg-rhinogold/10 text-bonewhite"
                        : "border-slate-border bg-slate-card text-bonewhite-muted hover:border-slate-lightBorder"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mb-1 text-blue-400" />
                    Google Pay
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-rhinogold tracking-wider">
                  {t("deliveryDestination")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-bonewhite-muted block mb-1">{t("athleteName")}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-sm text-bonewhite focus:border-rhinogold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-bonewhite-muted block mb-1">{t("emailTracking")}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-sm text-bonewhite focus:border-rhinogold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-bonewhite-muted block mb-1">{t("academyAddress")}</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-sm text-bonewhite focus:border-rhinogold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-bonewhite-muted block mb-1">{t("city")}</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-sm text-bonewhite focus:border-rhinogold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-bonewhite-muted block mb-1">{t("state")}</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-sm text-bonewhite focus:border-rhinogold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-bonewhite-muted block mb-1">{t("postalCode")}</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-sm text-bonewhite focus:border-rhinogold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details if Card */}
              {paymentMethod === "card" && (
                <div className="p-4 bg-slate-card border border-slate-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-bonewhite uppercase">
                      {language === "pt" ? "Dados do Cartão (Simulação Stripe)" : "Stripe Test Card Details"}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <label className="text-[11px] text-bonewhite-muted block mb-1">
                      {language === "pt" ? "Número do Cartão" : "Card Number"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-obsidian-900 border border-slate-border rounded px-3 py-2 text-sm font-mono text-bonewhite focus:border-rhinogold focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-bonewhite-muted block mb-1">
                        {language === "pt" ? "Validade" : "Expires"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full bg-obsidian-900 border border-slate-border rounded px-3 py-2 text-sm font-mono text-bonewhite focus:border-rhinogold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-bonewhite-muted block mb-1">CVV / CVC</label>
                      <input
                        type="text"
                        required
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="w-full bg-obsidian-900 border border-slate-border rounded px-3 py-2 text-sm font-mono text-bonewhite focus:border-rhinogold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "pix" && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-center space-y-2">
                  <QrCode className="w-12 h-12 text-emerald-400 mx-auto" />
                  <p className="text-xs text-emerald-300 font-semibold">
                    PIX Instantâneo: QR Code e chave Copia e Cola gerados na confirmação.
                  </p>
                  <p className="text-[11px] text-bonewhite-muted">
                    Confirmação imediata com envio prioritário no mesmo dia.
                  </p>
                </div>
              )}

              {/* Order Summary Line */}
              <div className="p-4 bg-obsidian-900 rounded-lg border border-slate-border space-y-2 text-xs">
                <div className="flex justify-between text-bonewhite-muted">
                  <span>{t("subtotal")} ({items.length} {language === "pt" ? "itens" : "items"})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-bonewhite-muted">
                  <span>
                    {selectedShippingQuote
                      ? selectedShippingQuote.name
                      : language === "pt"
                      ? "Frete Expresso para o Tatame"
                      : "Mat Priority Shipping"}
                  </span>
                  <span>{shippingCost === 0 ? (language === "pt" ? "GRÁTIS (Qualificado)" : "FREE (Qualified)") : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-bonewhite-muted">
                  <span>{language === "pt" ? "Impostos & Tributos" : "Estimated Tax"}</span>
                  <span>{language === "pt" ? "Inclusos no Preço" : formatPrice(tax)}</span>
                </div>
                <div className="border-t border-slate-border pt-2 flex justify-between font-bold text-sm text-bonewhite">
                  <span className="text-rhinogold">{language === "pt" ? "Total a Pagar" : "Total Due"} ({currency})</span>
                  <span className="text-rhinogold">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold py-3.5 px-6 rounded-lg uppercase tracking-wider text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-rhinogold/20"
              >
                <span>{t("authorizeBtn")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "processing" && (
            <div className="py-16 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-rhinogold animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-bonewhite uppercase tracking-wider">
                {t("authorizingStatus")}
              </h4>
              <p className="text-sm text-bonewhite-muted max-w-sm mx-auto">
                {language === "pt"
                  ? "Separando seu kimono do lote e gerando romaneio de despacho no ateliê em Brasília, DF."
                  : "Securing batch serial numbers and dispatching shipping manifests from the Brasília atelier."}
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-rhinogold uppercase tracking-widest">
                  {t("orderConfirmedTag")}
                </span>
                <h3 className="text-2xl font-black text-bonewhite uppercase tracking-wide">
                  {t("orderConfirmed")}
                </h3>
                <p className="text-xs text-bonewhite-muted">
                  {language === "pt" ? "Código do Pedido:" : "Order Ref:"}{" "}
                  <span className="text-bonewhite font-mono font-bold">{orderNumber}</span>
                </p>
              </div>

              <div className="bg-slate-card border border-slate-border rounded-lg p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-border/50 pb-2">
                  <span className="text-bonewhite-muted">{t("recipient")}</span>
                  <span className="text-bonewhite font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-border/50 pb-2">
                  <span className="text-bonewhite-muted">{t("destination")}</span>
                  <span className="text-bonewhite font-medium">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between border-b border-slate-border/50 pb-2">
                  <span className="text-bonewhite-muted">{t("dispatchedFrom")}</span>
                  <span className="text-bonewhite font-medium">
                    {language === "pt" ? "Ateliê Black Rhino (Brasília, DF - Brasil)" : "Black Rhino Atelier (Brasília, Brazil)"}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-bonewhite-muted">{t("estDelivery")}</span>
                  <span className="text-emerald-400 font-medium">
                    {language === "pt" ? "2-4 Dias Úteis (Sedex Rastreável)" : "3-5 Business Days (Tracked)"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="bg-slate-card hover:bg-slate-hover border border-slate-border text-bonewhite font-bold py-3 px-8 rounded-lg text-xs uppercase tracking-wider transition-all"
              >
                {t("returnToCatalog")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
