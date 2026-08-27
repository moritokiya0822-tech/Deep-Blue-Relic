import { useState } from 'react';
import { Layers, Activity, Gauge, Anchor, AlertTriangle, ArrowDownCircle } from 'lucide-react';
import { DEPTH_ZONES_DATA } from '../data/gameData';
import { soundEffects } from '../utils/audio';

export default function DepthOxygenChart() {
  const [testDepth, setTestDepth] = useState<number>(350);
  const [pressureLevel, setPressureLevel] = useState<number>(3);

  // Compute oxygen loss rate per second
  // Base drain: 1.0/s at 0m, exponential growth with depth
  // Mitigation: (pressureLevel - 1) * 10% reduction
  const rawDrainMultiplier = 1.0 + Math.pow(testDepth / 250, 1.6);
  const mitigationRate = (pressureLevel - 1) * 0.08; // up to ~72% mitigation at Lv.10
  const actualDrainPerSec = (rawDrainMultiplier * (1 - mitigationRate)).toFixed(2);
  const baseSurvivalSeconds = Math.round(300 / parseFloat(actualDrainPerSec));

  const handleDepthSlider = (val: number) => {
    setTestDepth(val);
  };

  const handlePressureChange = (lvl: number) => {
    soundEffects.playBubble();
    setPressureLevel(lvl);
  };

  return (
    <section id="depth-chart" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>DEPTH & OXYGEN PHYSICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Cinzel'] mb-4">
          深度と酸素消費の加速度的法則
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          深海に潜るほど強大な水圧がかかり、酸素ゲージの減り方は加速度的に増加します。
          レベルを上げ、紫の光のセーブポイントを開放しながら段階的に深層を開拓していく必要があります。
        </p>
      </div>

      {/* Interactive Depth & Oxygen Physics Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#061b36] via-[#031326] to-[#020b18] border border-cyan-700/50 shadow-2xl mb-12">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-cyan-800/40">
          <div className="flex items-center gap-2.5">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              水圧・酸素消費シミュレーター
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            BASE OXYGEN: 300 UNITS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* Controls: Depth & Pressure Stat */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ArrowDownCircle className="w-4 h-4 text-cyan-400" />
                  テスト潜水深度 (Depth)
                </label>
                <span className="text-sm font-bold text-cyan-300 font-mono">
                  {testDepth} m
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="25"
                value={testDepth}
                onChange={(e) => handleDepthSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0m (海面)</span>
                <span>200m (浅海)</span>
                <span>700m (遺跡)</span>
                <span>1200m (深淵)</span>
                <span>1500m</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-rose-400" />
                  【耐圧効率】ステータスレベル
                </label>
                <span className="text-sm font-bold text-rose-300 font-mono">
                  Lv.{pressureLevel} / 10
                </span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePressureChange(i + 1)}
                    className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${
                      i + 1 === pressureLevel
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-950 scale-105'
                        : i < pressureLevel
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                        : 'bg-slate-800/80 text-slate-500 hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results: Calculated Consumption Gauge */}
          <div className="p-5 rounded-2xl bg-[#010813] border border-cyan-900/50 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/40">
                <span className="block text-[10px] text-slate-400 font-mono">O2 CONSUMPTION</span>
                <span className="text-2xl font-black text-cyan-300 font-mono">
                  {actualDrainPerSec} <span className="text-xs font-normal">/秒</span>
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  基本速度の {parseFloat(actualDrainPerSec).toFixed(1)}倍
                </span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-900/40">
                <span className="block text-[10px] text-slate-400 font-mono">EST. SURVIVAL TIME</span>
                <span className="text-2xl font-black text-indigo-300 font-mono">
                  {baseSurvivalSeconds} <span className="text-xs font-normal">秒</span>
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  約 {Math.floor(baseSurvivalSeconds / 60)}分 {baseSurvivalSeconds % 60}秒
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#020b18] border border-cyan-900/40 flex items-center gap-3 text-xs text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {testDepth < 200
                  ? '【低水圧】安全に探索可能。白い光で酸素最大値を伸ばす絶好の深度。'
                  : testDepth < 700
                  ? '【中水圧】酸素減少が加速。耐圧効率Lv.3以上と200mセーブポイントの確保を推奨。'
                  : testDepth < 1200
                  ? '【強水圧】急激な酸素消費！耐圧効率Lv.6以上と遺物セットバフが必須です。'
                  : '【極限水圧】耐圧効率Lv.9〜10と万全の準備なしでは数秒で酸素が尽きます！'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Depth Zones Breakdown Cards */}
      <div className="space-y-4">
        {DEPTH_ZONES_DATA.map((zone, idx) => (
          <div
            key={zone.depthRange}
            className={`p-6 rounded-2xl bg-gradient-to-r ${zone.bgGradient} border border-cyan-900/40 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  {zone.depthRange}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {zone.title}
                </h3>
                <span className="text-xs text-slate-400 font-['Rajdhani']">
                  {zone.subtitle}
                </span>
                {zone.checkpointDepth !== undefined && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                    <Anchor className="w-3 h-3" />
                    {zone.checkpointDepth}m セーブ拠点
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {zone.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">主な危険要因:</span>
                {zone.hazards.map((h) => (
                  <span key={h} className="px-2 py-0.5 rounded bg-[#020b18]/80 text-rose-300/90 border border-rose-900/40 text-[11px]">
                    ⚠️ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full md:w-60 p-4 rounded-xl bg-[#010813]/90 border border-cyan-900/50 text-center">
              <span className="text-[10px] text-slate-400 block font-mono">RECOMMENDED STATS</span>
              <span className="text-xs font-bold text-cyan-300 block mb-1">
                {zone.recommendedStats}
              </span>
              <div className="text-[11px] text-slate-400 font-mono">
                酸素消費係数: <strong className="text-amber-300">{zone.oxygenDrainMultiplier}x</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
