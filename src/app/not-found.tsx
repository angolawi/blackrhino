import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-surface border border-slate-border p-8 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-rhinogold/10 border border-rhinogold/30 flex items-center justify-center mx-auto text-rhinogold">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-rhinogold font-bold">
            Erro 404 • Fora do Tatame
          </span>
          <h1 className="text-2xl font-black uppercase text-bonewhite tracking-tight">
            Página Não Encontrada
          </h1>
          <p className="text-sm text-bonewhite-muted leading-relaxed">
            A posição ou técnica que você tentou acessar não existe no catálogo oficial Black Rhino.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-rhinogold hover:bg-rhinogold-light text-obsidian-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Ateliê</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
