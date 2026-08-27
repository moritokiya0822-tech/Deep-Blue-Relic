import { useState } from 'react';
import { Wrench, Shield, Zap, Compass, Gauge, Radio, Scan, RotateCcw, Sparkles, Check, Info } from 'lucide-react';
import { SUBMARINE_STATS_DATA } from '../data/gameData';
import { soundEffects } from '../utils/audio';

export default function SubmarineUpgradeSimulator() {
  const [statLevels, setStatLevels] = useState<Record<string, number>>({
    armor: 1,
    thrust: 1,
    control: 1,
    pressure: 1,
    emp: 1,
    radar: 1,
  });

  const totalUsedParts = (Object.values(statLevels) as number[]).reduce((acc, lvl) => acc + (lvl - 1), 0);
  const maxPossibleParts = 6 * 9; // 54 points

  const handleLevelChange = (id: string, newLevel: number) => {
    const clamped = Math.max(1, Math.min(10, newLevel));
    if (clamped > statLevels[id]) {
      soundEffects.playLevelUp();
    } else {
      soundEffects.playBubble();
    }
    setStatLevels((prev) => ({ ...prev, [id]: clamped }));
  };

  const handleReset = () => {
    soundEffects.playBubble();
    setStatLevels({
      armor: 1,
      thrust: 1,
      control: 1,
      pressure: 1,
      emp: 1,
      radar: 1,
    });
  };

  const applyPreset = (preset: 'beginner' | 'deepAbyss' | 'speedExplorer' | 'maxAll') => {
    soundEffects.playLevelUp();
    switch (preset) {
      case 'beginner':
        setStatLevels({
          pressure: 6,
          thrust: 5,
          emp: 4,
          armor: 4,
          control: 2,
          radar: 3,
        });
        break;
      case 'deepAbyss':
        setStatLevels({
          pressure: 10,
          armor: 8,
          emp: 9,
          thrust: 6,
          radar: 7,
          control: 5,
        });
        break;
      case 'speedExplorer':
        setStatLevels({
          thrust: 10,
          radar: 8,
          pressure: 7,
          control: 7,
          emp: 5,
          armor: 3,
        });
        break;
      case 'maxAll':
        setStatLevels({
          armor: 10,
          thrust: 10,
          control: 10,
          pressure: 10,
          emp: 10,
          radar: 10,
        });
        break;
    }
  };

  const getStatIcon = (id: string) => {
    switch (id) {
      case 'armor': return Shield;
      case 'thrust': return Zap;
      case 'control': return Compass;
      case 'pressure': return Gauge;
      case 'emp': return Radio;
      case 'radar': return Scan;
      default: return Wrench;
    }
  };

  // Calculated overall submarine rating
  const overallRating = Math.round((totalUsedParts / maxPossibleParts) * 100);

  return (
    <section id="upgrade" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>SUBMARINE STATUS SIMULATOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Cinzel'] mb-4">
          潜水艦ステータス強化シミュレーター
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          赤い光を集めて配分する6つのステータス（各最大Lv.10）。
          ゲーム内の強化画面を模したシミュレーターで、ステータス上昇値やおすすめビルドを試算できます。
        </p>
      </div>

      {/* Preset Buttons & Stats Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-[#03152c] border border-cyan-800/40 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-cyan-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            おすすめビルド：
          </span>
          <button
            id="preset-beginner"
            onClick={() => applyPreset('beginner')}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-medium transition-all"
          >
            初心者バランス型 (Lv.24)
          </button>
          <button
            id="preset-deep"
            onClick={() => applyPreset('deepAbyss')}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-200 text-xs font-medium transition-all"
          >
            深海・深淵攻略特化 (Lv.45)
          </button>
          <button
            id="preset-speed"
            onClick={() => applyPreset('speedExplorer')}
            className="px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-medium transition-all"
          >
            高速遺物回収型 (Lv.40)
          </button>
          <button
            id="preset-max"
            onClick={() => applyPreset('maxAll')}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 text-xs font-medium transition-all"
          >
            全MAX (Lv.60)
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-cyan-900/40">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">CONSUMED PARTS</span>
            <span className="text-sm font-bold text-red-400 font-mono">
              🔴 赤い光: {totalUsedParts} / 54個
            </span>
          </div>
          <button
            id="reset-upgrade-btn"
            onClick={handleReset}
            title="すべてLv.1にリセット"
            className="p-2 rounded-lg bg-[#020b18] border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: 6 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {SUBMARINE_STATS_DATA.map((stat) => {
          const currentLevel = statLevels[stat.id] || 1;
          const Icon = getStatIcon(stat.id);
          const computed = stat.scalingFormula(currentLevel);

          return (
            <div
              key={stat.id}
              className={`p-6 rounded-2xl bg-[#020e21]/90 border transition-all flex flex-col justify-between ${
                currentLevel === 10
                  ? 'border-amber-400/60 shadow-lg shadow-amber-950/30'
                  : stat.recommendedPriority <= 2
                  ? 'border-cyan-500/40 shadow-md shadow-cyan-950/20'
                  : 'border-cyan-900/40'
              }`}
            >
              <div>
                {/* Header with Priority badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                        【{stat.jpName}】
                        {currentLevel === 10 && (
                          <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded font-mono">
                            MAX
                          </span>
                        )}
                      </h3>
                      <span className="text-[10px] text-cyan-400 font-['Rajdhani'] font-medium">
                        {stat.name}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                    stat.recommendedPriority === 1
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : stat.recommendedPriority === 2
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    優先度 #{stat.recommendedPriority}
                  </span>
                </div>

                {/* Description & In-game Role */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {stat.description}
                </p>
                <div className="p-2.5 rounded-lg bg-[#010813] border border-cyan-950 text-[11px] text-cyan-300/80 leading-relaxed mb-4">
                  {stat.gameplayRole}
                </div>
              </div>

              <div>
                {/* Level Display & Stepper */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">現在値</span>
                  <span className="text-xs font-bold text-cyan-200 font-mono">
                    {computed.value}
                  </span>
                </div>

                {/* Segmented Level Bar */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleLevelChange(stat.id, i + 1)}
                      title={`Lv.${i + 1}に設定`}
                      className={`flex-1 h-3 rounded-xs transition-all ${
                        i < currentLevel
                          ? currentLevel === 10
                            ? 'bg-gradient-to-t from-amber-500 to-yellow-300'
                            : 'bg-gradient-to-t from-cyan-600 to-cyan-300'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Level Stepper Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-cyan-900/30">
                  <div className="text-sm font-bold text-white font-mono">
                    Lv.<span className="text-cyan-400">{currentLevel}</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleLevelChange(stat.id, currentLevel - 1)}
                      disabled={currentLevel <= 1}
                      className="w-8 h-8 rounded-lg bg-[#010813] border border-cyan-800/40 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-950 text-xs"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleLevelChange(stat.id, currentLevel + 1)}
                      disabled={currentLevel >= 10}
                      className="w-8 h-8 rounded-lg bg-cyan-900/60 border border-cyan-500/50 text-cyan-200 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-700 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submarine Diagnostic Summary Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#061b33] via-[#031326] to-[#020b18] border border-cyan-700/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Info className="w-4 h-4" />
            <span>SUBMARINE DIAGNOSTIC EVALUATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            総合潜水艦性能評価: <span className="text-cyan-300 font-mono">{overallRating}%</span>
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {overallRating < 30
              ? '【浅海探索仕様】0m〜200mの浅瀬で白い光を集めて酸素上限を伸ばすのに適した状態です。'
              : overallRating < 70
              ? '【中深海対応仕様】耐圧効率と推進推力が強化され、700m地点の深海都市遺跡の攻略が可能です！'
              : '【深淵深層到達仕様】最高峰の耐圧性とEMP兵装を備え、最深部1200m+の形見回収に挑戦可能です！'}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-4 bg-[#010a17]/90 px-6 py-4 rounded-2xl border border-cyan-800/40">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">RECOMMENDED DEPTH</span>
            <span className="text-lg font-bold text-amber-300 font-mono">
              {overallRating < 30 ? '0m 〜 200m' : overallRating < 70 ? '200m 〜 700m' : '700m 〜 1200m+'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 font-mono font-black text-sm">
            {overallRating >= 80 ? 'S' : overallRating >= 50 ? 'A' : 'B'}
          </div>
        </div>
      </div>
    </section>
  );
}
