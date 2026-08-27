import { useState } from 'react';
import { Package, Sparkles, Check, Layers, BookOpen, Coffee, PenTool, Watch, Ruler, Cog, Gem, CircleDot, Bot, HeartHandshake, UtensilsCrossed, Flame, Disc, Hourglass, AlarmClock, Calendar, Box, Bell, Image, Radio, Flashlight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RELIC_SETS_DATA } from '../data/gameData';
import { RelicSet, RelicItem } from '../types';
import { soundEffects } from '../utils/audio';

export default function RelicCompendium() {
  const [activeTab, setActiveTab] = useState<'sets' | 'all'>('sets');
  const [collectedRelicIds, setCollectedRelicIds] = useState<Set<string>>(
    new Set(['toy-1', 'toy-2', 'kit-1', 'kit-2', 'sole-1', 'time-1', 'class-1', 'mech-1'])
  );
  const [selectedRelic, setSelectedRelic] = useState<RelicItem | null>(null);

  const getRelicIcon = (iconName: string) => {
    switch (iconName) {
      case 'CircleDot': return CircleDot;
      case 'Bot': return Bot;
      case 'HeartHandshake': return HeartHandshake;
      case 'Coffee': return Coffee;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Flame': return Flame;
      case 'Disc': return Disc;
      case 'PenTool': return PenTool;
      case 'BookOpen': return BookOpen;
      case 'Watch': return Watch;
      case 'Hourglass': return Hourglass;
      case 'AlarmClock': return AlarmClock;
      case 'Calendar': return Calendar;
      case 'Ruler': return Ruler;
      case 'Box': return Box;
      case 'Bell': return Bell;
      case 'Image': return Image;
      case 'Cog': return Cog;
      case 'Radio': return Radio;
      case 'Flashlight': return Flashlight;
      case 'Gem': return Gem;
      default: return Package;
    }
  };

  const toggleCollectRelic = (relic: RelicItem, set: RelicSet) => {
    const next = new Set(collectedRelicIds);
    if (next.has(relic.id)) {
      next.delete(relic.id);
      soundEffects.playBubble();
    } else {
      next.add(relic.id);
      soundEffects.playRelicChime();
      
      // Check if this newly collected relic completes the set
      const isSetNowComplete = set.relicIds.every((id) => id === relic.id || next.has(id));
      if (isSetNowComplete) {
        soundEffects.playLevelUp();
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#38bdf8', '#fbbf24', '#c084fc', '#4ade80']
        });
      }
    }
    setCollectedRelicIds(next);
  };

  const allRelicsList = RELIC_SETS_DATA.flatMap((s) => s.relics);
  const activeCompletedSetsCount = RELIC_SETS_DATA.filter((s) =>
    s.relicIds.every((id) => collectedRelicIds.has(id))
  ).length;

  return (
    <section id="relics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Package className="w-3.5 h-3.5" />
          <span>RELIC COMPENDIUM & SET BUFFS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Cinzel'] mb-4">
          遺物図鑑とセット効果一覧
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          黄色い光から入手する沈没前の生活遺物。
          集めた遺物を揃えると「遺物セット効果（強力なパッシブバフ）」が恒久的に発動します。
          アイコンをクリックして所持状態の切り替えや詳細ストーリーを確認できます。
        </p>
      </div>

      {/* Stats Summary & Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#03152c] border border-cyan-800/40 mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playBubble();
              setActiveTab('sets');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sets'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>遺物セット一覧 ({activeCompletedSetsCount}/{RELIC_SETS_DATA.length} 発動中)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playBubble();
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>すべての遺物 ({collectedRelicIds.size}/{allRelicsList.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playLevelUp();
              setCollectedRelicIds(new Set(allRelicsList.map((r) => r.id)));
              confetti({ particleCount: 100, spread: 70 });
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-semibold transition-all"
          >
            全収集ON (全バフ発動)
          </button>
          <button
            onClick={() => {
              soundEffects.playBubble();
              setCollectedRelicIds(new Set());
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 text-xs transition-all"
          >
            リセット
          </button>
        </div>
      </div>

      {/* Relic Sets View */}
      {activeTab === 'sets' && (
        <div className="space-y-6">
          {RELIC_SETS_DATA.map((set) => {
            const isCompleted = set.relicIds.every((id) => collectedRelicIds.has(id));
            const collectedCount = set.relicIds.filter((id) => collectedRelicIds.has(id)).length;

            return (
              <div
                key={set.id}
                className={`p-6 sm:p-8 rounded-3xl bg-[#020e21]/90 border transition-all relative overflow-hidden ${
                  isCompleted
                    ? 'border-amber-400/60 shadow-xl shadow-amber-950/30'
                    : 'border-cyan-900/40'
                }`}
              >
                {/* Background glow when complete */}
                {isCompleted && (
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-15"
                    style={{ backgroundColor: set.color }}
                  />
                )}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Set Header & Buff info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                        【{set.title}】
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {isCompleted ? '✓ セット効果発動中' : '未発動'} ({collectedCount}/{set.relicIds.length})
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                      {set.description}
                    </p>

                    {/* Buff Card */}
                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      isCompleted
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                        : 'bg-[#010813] border-cyan-950 text-slate-400'
                    }`}>
                      <Sparkles className={`w-5 h-5 shrink-0 mt-0.5 ${isCompleted ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold block mb-0.5 text-white">
                          セット効果: {set.buffTitle}
                        </span>
                        <span>{set.buffDetail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Relic Slots Grid */}
                  <div className="shrink-0 w-full lg:w-auto">
                    <div className="flex flex-wrap gap-3 items-center">
                      {set.relics.map((relic) => {
                        const isCollected = collectedRelicIds.has(relic.id);
                        const Icon = getRelicIcon(relic.icon);

                        return (
                          <button
                            key={relic.id}
                            onClick={() => {
                              toggleCollectRelic(relic, set);
                              setSelectedRelic(relic);
                            }}
                            className={`group relative p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all w-28 sm:w-32 ${
                              isCollected
                                ? 'bg-gradient-to-b from-cyan-950/80 to-[#020b18] border-cyan-400 shadow-md shadow-cyan-950/40'
                                : 'bg-[#010813]/80 border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isCollected
                                ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-400/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            <span className="text-[11px] font-bold text-white text-center line-clamp-1">
                              {relic.name}
                            </span>

                            <span className="text-[9px] text-cyan-400 font-mono">
                              {relic.depthFound.split(' ')[0]}
                            </span>

                            {isCollected && (
                              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
                                ✓
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* All Relics Grid View */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allRelicsList.map((relic) => {
            const isCollected = collectedRelicIds.has(relic.id);
            const Icon = getRelicIcon(relic.icon);
            const parentSet = RELIC_SETS_DATA.find((s) => s.relicIds.includes(relic.id));

            return (
              <button
                key={relic.id}
                onClick={() => {
                  if (parentSet) toggleCollectRelic(relic, parentSet);
                  setSelectedRelic(relic);
                }}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCollected
                    ? 'bg-[#020e21] border-cyan-500/50 shadow-md shadow-cyan-950/30'
                    : 'bg-[#010813] border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCollected
                        ? 'bg-cyan-950 border border-cyan-400/50 text-cyan-300'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {relic.rarity}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {relic.name}
                  </h4>
                  <p className="text-xs text-cyan-400/80 mb-2">
                    所属: 【{parentSet?.title}】
                  </p>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {relic.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cyan-900/30 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{relic.depthFound}</span>
                  <span className={isCollected ? 'text-cyan-300 font-bold' : 'text-slate-600'}>
                    {isCollected ? '所持中' : '未所持'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Relic Detail Modal / Preview Drawer if selected */}
      {selectedRelic && (
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-[#041c38] to-[#020d1c] border border-cyan-600/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shrink-0">
              {(() => {
                const Icon = getRelicIcon(selectedRelic.icon);
                return <Icon className="w-7 h-7" />;
              })()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-[10px] font-mono">
                  {selectedRelic.rarity}
                </span>
                <span className="text-xs text-amber-300 font-mono">
                  発見場所: {selectedRelic.depthFound}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                {selectedRelic.name}
              </h4>
              <p className="text-xs text-slate-300 italic mt-0.5">
                "{selectedRelic.memoryStory}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedRelic(null)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
          >
            閉じる
          </button>
        </div>
      )}
    </section>
  );
}
