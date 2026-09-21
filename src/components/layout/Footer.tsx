"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Award, Sparkles, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language, t } = useLanguage();
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  return (
    <footer className="bg-obsidian-950 border-t border-slate-border text-bonewhite-muted text-xs pb-24 lg:pb-12">
      {/* Guarantees Bar */}
      <div className="border-b border-slate-border/70 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-slate-card border border-slate-border flex items-center justify-center text-rhinogold flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-bonewhite font-semibold uppercase text-xs">{t("ibjjfLegalFooter")}</h4>
              <p className="text-[11px] text-bonewhite-dim">{t("ibjjfLegalFooterDesc")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-slate-card border border-slate-border flex items-center justify-center text-rhinogold flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-bonewhite font-semibold uppercase text-xs">{t("sanforizedFooter")}</h4>
              <p className="text-[11px] text-bonewhite-dim">{t("sanforizedFooterDesc")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-slate-card border border-slate-border flex items-center justify-center text-rhinogold flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-bonewhite font-semibold uppercase text-xs">{t("evaFooter")}</h4>
              <p className="text-[11px] text-bonewhite-dim">{t("evaFooterDesc")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-slate-card border border-slate-border flex items-center justify-center text-rhinogold flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-bonewhite font-semibold uppercase text-xs">{t("brazilianAtelierFooter")}</h4>
              <p className="text-[11px] text-bonewhite-dim">{t("brazilianAtelierFooterDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-slate-surface border border-rhinogold/40 flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full text-rhinogold fill-current">
                <path d="M15,65 L25,48 L40,42 L55,42 L65,30 L72,30 L78,38 L88,38 L95,45 L90,52 L82,50 L75,58 L80,75 L70,75 L67,65 L48,65 L44,75 L34,75 L38,62 L22,65 Z M70,36 C68,36 66,34 66,32 C66,30 68,28 70,28 C72,28 74,30 74,32 C74,34 72,36 70,36 Z" />
              </svg>
            </div>
            <span className="text-base font-black tracking-widest text-bonewhite uppercase font-sans">
              BLACK RHINO KIMONOS
            </span>
          </div>
          <p className="text-xs text-bonewhite-dim max-w-sm leading-relaxed">
            {t("footerDesc")}
          </p>
          <div className="font-mono text-[11px] text-rhinogold space-y-1">
            <p>BLACK RHINO KIMONOS BRASIL</p>
            <p className="text-bonewhite-dim">BRASÍLIA, DF • BRASIL</p>
          </div>
        </div>

        {/* Kimono Line */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-bonewhite tracking-wider font-bold">
            {language === "pt" ? "Nossos Kimonos" : "Kimono Collections"}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/collections" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Todos os Kimonos" : "All Competition Gis"}
              </Link>
            </li>
            <li>
              <Link href="/#weave-matrix" className="hover:text-bonewhite transition-colors">
                Legend Azul (350 GSM)
              </Link>
            </li>
            <li>
              <Link href="/#weave-matrix" className="hover:text-bonewhite transition-colors">
                Legend Branco (450 GSM)
              </Link>
            </li>
            <li>
              <Link href="/#weave-matrix" className="hover:text-bonewhite transition-colors">
                Legend Preto (550 GSM)
              </Link>
            </li>
            <li>
              <Link href="/collections?category=belts" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Faixas Graduadas Legend" : "Legend Ranked Belts"}
              </Link>
            </li>
            <li>
              <Link href="/separates" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Peças Avulsas Legend" : "Legend Separates (Pants & Jacket)"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Academy & Technical */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-bonewhite tracking-wider font-bold">
            {language === "pt" ? "Academias & B2B" : "Academy & B2B"}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/custom-academy" className="text-rhinogold hover:underline flex items-center">
                <span>{language === "pt" ? "Estúdio de Bordados para Equipes" : "Custom Embroidery Studio"}</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </Link>
            </li>
            <li>
              <Link href="/custom-academy" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Programa de Academias Filiadas" : "Affiliate Academy Program"}
              </Link>
            </li>
            <li>
              <Link href="/#anatomy" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Anatomia & Engenharia de Costuras" : "Anatomy & Seam Spec"}
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Guia Oficial de Normas IBJJF / CBJJ" : "IBJJF Compliance Guidelines"}
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-bonewhite transition-colors">
                {language === "pt" ? "Ciência de Lavagem & Sanforização" : "Sanforization & Wash Science"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Batch Drops Newsletter */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-bonewhite tracking-wider font-bold">
            {t("batchDispatchAlert")}
          </h4>
          <p className="text-xs text-bonewhite-dim">
            {t("batchAlertDesc")}
          </p>
          {!emailSubscribed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubscribed(true);
              }}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder={language === "pt" ? "atleta@academia.com.br" : "athlete@academy.com"}
                required
                className="w-full bg-slate-card border border-slate-border rounded px-3 py-2 text-xs text-bonewhite placeholder:text-bonewhite-dim focus:border-rhinogold focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-slate-surface hover:bg-rhinogold hover:text-obsidian-950 border border-slate-border text-bonewhite font-mono text-xs uppercase tracking-wider py-2 rounded transition-all font-bold"
              >
                {t("getPriorityAccess")}
              </button>
            </form>
          ) : (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded text-[11px] text-emerald-400">
              ✓ {language === "pt" ? "Inscrição confirmada para o Lote 08." : "Registered for Batch 08 priority notification."}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-border/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-bonewhite-dim">
        <p>&copy; {new Date().getFullYear()} Black Rhino Kimonos. {language === "pt" ? "Todos os direitos reservados. Feito no Brasil • Brasília, DF." : "All rights reserved. Made in Brazil • Brasília, DF."}</p>
        <div className="flex space-x-6 mt-4 sm:mt-0 font-mono">
          <span>IBJJF / CBJJ COMPLIANT</span>
          <span>SOLI DEO GLORIA</span>
          <span>FORJADO NO TATAME</span>
        </div>
      </div>
    </footer>
  );
}
