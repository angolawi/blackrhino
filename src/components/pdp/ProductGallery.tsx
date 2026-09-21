"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductGalleryProps {
  images: {
    primary: string;
    secondary: string;
    macroCollar?: string;
    pants?: string;
    lifestyle?: string;
  };
  title: string;
  category?: string;
}

export function ProductGallery({ images, title, category }: ProductGalleryProps) {
  const { language, t } = useLanguage();

  const isBelt = category === "belts";
  const isSeparate = category === "separates";

  const primaryLabel = isBelt
    ? (language === "pt" ? "Todas as Graduações" : "Official Ranks")
    : isSeparate
    ? (language === "pt" ? "Visão Principal" : "Primary View")
    : (language === "pt" ? "Kimono Completo" : "Full Kimono");

  const secondaryLabel = isBelt
    ? (language === "pt" ? "Ponteira & Bolsa de Transporte" : "Rank Sleeve & Bag")
    : isSeparate
    ? (language === "pt" ? "Detalhes do Tecido" : "Fabric Detail")
    : (language === "pt" ? "Vista Lateral" : "Side View");

  const imageList = [
    { label: primaryLabel, src: images.primary },
    { label: secondaryLabel, src: images.secondary },
    ...(images.macroCollar ? [{ label: language === "pt" ? "Macro Gola / Lapela" : "Lapel / Collar Macro", src: images.macroCollar }] : []),
    ...(images.pants ? [{ label: language === "pt" ? "Calça Reforçada" : "Reinforced Pants", src: images.pants }] : []),
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = imageList[activeImageIndex] || imageList[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="space-y-4">
      {/* Main Interactive Zoom Stage */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-square w-full bg-obsidian-900 border border-slate-border rounded-2xl overflow-hidden cursor-crosshair group shadow-2xl"
      >
        <Image
          src={currentImage.src}
          alt={`${title} - ${currentImage.label}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain p-6 transition-transform duration-200 ${
            isZooming ? "scale-175 origin-center" : "scale-100"
          }`}
          style={
            isZooming
              ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        />

        {/* Zoom Cue Helper */}
        <div className="absolute top-4 right-4 bg-obsidian-950/80 backdrop-blur-md border border-slate-border text-[11px] font-mono text-bonewhite-muted px-2.5 py-1 rounded-lg flex items-center space-x-1 pointer-events-none group-hover:text-rhinogold transition-colors">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>{isZooming ? t("macroActive") : t("hoverInspect")}</span>
        </div>

        {/* Active Tag */}
        <div className="absolute bottom-4 left-4 bg-obsidian-950/80 backdrop-blur-md border border-slate-border text-[11px] font-mono text-rhinogold px-3 py-1 rounded-lg">
          {currentImage.label}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-3">
        {imageList.map((img, idx) => {
          const isActive = idx === activeImageIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-square bg-obsidian-900 border rounded-xl overflow-hidden transition-all ${
                isActive
                  ? "border-rhinogold ring-2 ring-rhinogold/20"
                  : "border-slate-border hover:border-slate-lightBorder opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="100px"
                className="object-contain p-2"
              />
              <span className="absolute bottom-1 inset-x-1 text-center bg-obsidian-950/90 text-[9px] font-mono text-bonewhite truncate rounded px-0.5">
                {img.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
