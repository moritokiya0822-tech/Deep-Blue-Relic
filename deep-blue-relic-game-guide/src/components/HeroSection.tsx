import { useState } from 'react';
import { Play, Sparkles, Anchor, ChevronDown, Compass, ShieldAlert, Zap } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeroSectionProps {
  onOpenSimulator: () => void;
}

export default function HeroSection({ onOpenSimulator }: HeroSectionProps) {
  const [isSonarActive, setIsSonarActive] = useState(false);

  const triggerSonar = () => {
    setIsSonarActive(true);
    soundEffects.playSonarPing();
    setTimeout(() => setIsSonarActive(false), 2000);
  };

  return (
    <header
      id="hero-section"
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Deep Ocean Caustics & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540]/80 via-[#03152c] to-[#020b18] -z-20 pointer-events-none" />
      
      {/* Bioluminescent Light Rays */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/15 via-blue-600/5 to-transparent -z-10 pointer-events-none" />

      {/* Floating Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="bubble w-4 h-4 left-[15%] bottom-[-20px] bg-cyan-400/20 rounded-full animate-[bounce_8s_infinite_ease-in-out]" />
        <div className="bubble w-6 h-6 left-[35%] bottom-[-20px] bg-blue-300/15 rounded-full animate-[bounce_11s_infinite_ease-in-out]" />
        <div className="bubble w-3 h-3 left-[70%] bottom-[-20px] bg-cyan-200/25 rounded-full animate-[bounce_9s_infinite_ease-in-out]" />
        <div className="bubble w-5 h-5 left-[85%] bottom-[-20px] bg-indigo-300/15 rounded-full animate-[bounce_13s_infinite_ease-in-out]" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Genre & Target Audience Tag */}
        <div
          id="hero-badge"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>海洋探索ローグライク × 遺物収集アクション</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>初心者完全攻略</span>
        </div>

        {/* Main Title Typography with Ocean Glow */}
        <h1
          id="hero-title"
          className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]"
        >
          Deep Blue Relic
        </h1>

        {/* Catchphrase & Synopsis */}
        <p
          id="hero-subtitle"
          className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-300 bg-clip-text text-transparent max-w-3xl mb-4 leading-snug"
        >
          海に沈んだ旧文明の記憶と、最愛の「形見」を求めて深海へ。
        </p>

        <p
          id="hero-description"
          className="text-sm sm:text-base text-slate-300/90 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          水圧により加速度的に失われる酸素と戦いながら、4つの光球を集めて潜水艦を強化。
          沈没前の日常遺物を集めてセット効果を発動させ、深度1200mを超える深淵の秘密を解き明かせ。
        </p>

        {/* Submarine Visual Centerpiece with Interactive Glow */}
        <div
          id="hero-submarine-card"
          className="relative w-full max-w-md my-4 p-4 rounded-2xl bg-gradient-to-b from-[#061e38]/80 to-[#020d1c]/90 border border-cyan-700/40 backdrop-blur-md shadow-2xl shadow-cyan-950/50 group"
        >
          {/* Sonar Ping Wave Animation */}
          {isSonarActive && (
            <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 animate-ping pointer-events-none opacity-60" />
          )}

          <div className="relative flex flex-col items-center justify-center p-4">
            {/* Retro Submarine Graphic */}
            <div className="relative w-48 h-32 sm:w-64 sm:h-40 flex items-center justify-center">
              {/* Yellow exploration submarine illustration styling */}
              <div className="relative w-44 h-24 sm:w-56 sm:h-28 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 rounded-[40px] border-4 border-amber-950 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                {/* Cockpit Dome */}
                <div className="absolute -top-4 w-20 sm:w-24 h-12 bg-sky-200/40 rounded-t-full border-2 border-amber-900 overflow-hidden backdrop-blur-xs flex items-center justify-center">
                  <div className="w-12 h-6 bg-white/40 rounded-full -rotate-12 translate-x-1" />
                </div>
                {/* Porthole Light */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-300 border-4 border-amber-800 shadow-[0_0_15px_rgba(250,204,21,0.8)] flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full opacity-80" />
                </div>
                {/* Propeller */}
                <div className="absolute -right-3 w-4 h-12 bg-amber-950 rounded-sm animate-[spin_1.5s_linear_infinite]" />
                {/* Periscope / Antenna */}
                <div className="absolute -top-7 right-12 w-2.5 h-6 bg-amber-900 rounded-t-sm" />
                {/* Submarine Headlight Beam */}
                <div className="absolute -left-20 w-24 h-16 bg-gradient-to-l from-yellow-300/30 to-transparent clip-polygon opacity-60 pointer-events-none" />
              </div>
            </div>

            {/* Submarine Status Quick Summary */}
            <div className="grid grid-cols-3 gap-2 w-full mt-3 pt-3 border-t border-cyan-800/40 text-center">
              <div className="px-2 py-1 bg-[#020b18]/60 rounded-lg border border-cyan-900/40">
                <span className="block text-[10px] text-cyan-400 font-mono">MAX DEPTH</span>
                <span className="text-xs font-bold text-white">1200m+</span>
              </div>
              <div className="px-2 py-1 bg-[#020b18]/60 rounded-lg border border-cyan-900/40">
                <span className="block text-[10px] text-cyan-400 font-mono">STATS</span>
                <span className="text-xs font-bold text-amber-300">6項目 (Lv.10)</span>
              </div>
              <div className="px-2 py-1 bg-[#020b18]/60 rounded-lg border border-cyan-900/40">
                <span className="block text-[10px] text-cyan-400 font-mono">SPECIAL</span>
                <span className="text-xs font-bold text-cyan-300">EMP / レーダー</span>
              </div>
            </div>

            {/* Sonar Ping Trigger Button */}
            <button
              id="hero-sonar-trigger-btn"
              onClick={triggerSonar}
              className="mt-3 text-xs flex items-center gap-1.5 text-cyan-300/80 hover:text-cyan-200 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>ソナーを照射（クリックして音を鳴らす）</span>
            </button>
          </div>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            id="hero-cta-simulator"
            onClick={() => {
              soundEffects.playLevelUp();
              onOpenSimulator();
            }}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>潜水シミュレーターで体験する</span>
          </button>

          <a
            href="#lights"
            id="hero-cta-lights-guide"
            onClick={() => soundEffects.playBubble()}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 text-cyan-300 font-semibold text-base border border-cyan-700/50 hover:border-cyan-400/60 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>4つの光・基本ルールを見る</span>
          </a>
        </div>

        {/* 4 Lights Quick Indicator */}
        <div className="flex items-center justify-center gap-6 mt-10 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            <span>赤：強化パーツ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" />
            <span>黄：遺物</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
            <span>白：EXP/酸素UP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
            <span>紫：セーブ拠点</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#story"
          onClick={() => soundEffects.playBubble()}
          className="inline-flex flex-col items-center gap-1 text-cyan-400/60 hover:text-cyan-300 text-xs mt-12 transition-colors group"
        >
          <span>ゲームの概要・世界観を読む</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </header>
  );
}
