import { useState } from 'react';
import { Sparkles, Wrench, Package, Anchor, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LIGHT_ORBS_DATA } from '../data/gameData';
import { LightOrbInfo } from '../types';
import { soundEffects } from '../utils/audio';

export default function FourLightsSection() {
  const [selectedOrbId, setSelectedOrbId] = useState<string>('red');

  const selectedOrb = LIGHT_ORBS_DATA.find((o) => o.id === selectedOrbId) || LIGHT_ORBS_DATA[0];

  const handleOrbClick = (orb: LightOrbInfo) => {
    setSelectedOrbId(orb.id);
    if (orb.id === 'red') soundEffects.playLevelUp();
    else if (orb.id === 'yellow') soundEffects.playRelicChime();
    else if (orb.id === 'white') soundEffects.playBubble();
    else if (orb.id === 'purple') soundEffects.playCheckpoint();
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Wrench': return Wrench;
      case 'Package': return Package;
      case 'Sparkles': return Sparkles;
      case 'Anchor': return Anchor;
      default: return Sparkles;
    }
  };

  return (
    <section id="lights" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FOUR OCEANIC LIGHTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Cinzel'] mb-4">
          深海に浮かぶ『4つの光』の意味と役割
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          暗い海中には、潜水艦の強化・遺物・酸素拡張・セーブ地点を示す4色の発光体が漂っています。
          それぞれの役割を把握することが、深海生存の鍵となります。
        </p>
      </div>

      {/* 4 Light Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {LIGHT_ORBS_DATA.map((orb) => {
          const Icon = getIcon(orb.iconName);
          const isSelected = selectedOrbId === orb.id;

          return (
            <button
              key={orb.id}
              onClick={() => handleOrbClick(orb)}
              className={`text-left p-6 rounded-2xl transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#041c38] border-2 border-cyan-400 shadow-xl shadow-cyan-950/80 scale-[1.02]'
                  : 'bg-[#020d1c]/80 border border-cyan-900/40 hover:border-cyan-600/50 hover:bg-[#03152c]'
              }`}
            >
              {/* Glowing Top Ambient */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-xl pointer-events-none opacity-40"
                style={{ backgroundColor: orb.glowColor }}
              />

              <div>
                {/* Glowing Orb Animation Circle */}
                <div className="flex items-center justify-between mb-5">
                  <div className="relative flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse shadow-lg"
                      style={{
                        background: `radial-gradient(circle, ${orb.glowColor} 0%, rgba(0,0,0,0.4) 100%)`,
                        boxShadow: `0 0 20px ${orb.glowColor}`
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${orb.badgeBg}`}>
                    優先度 {orb.beginnerPriority}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {orb.jpName}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {orb.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between text-xs font-medium text-cyan-400">
                <span>詳細を見る</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Box for the Selected Orb */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#041c38] via-[#021124] to-[#010813] border border-cyan-600/40 shadow-2xl relative overflow-hidden">
        <div
          className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: selectedOrb.glowColor }}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="w-4 h-4 rounded-full shadow-md"
                style={{
                  backgroundColor: selectedOrb.glowColor,
                  boxShadow: `0 0 10px ${selectedOrb.glowColor}`
                }}
              />
              <h3 className="text-2xl font-bold text-white tracking-wide">
                {selectedOrb.jpName} の徹底解説
              </h3>
              <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${selectedOrb.badgeBg}`}>
                初心者おすすめ優先度: {selectedOrb.beginnerPriority}ランク
              </span>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
              {selectedOrb.detailedEffect}
            </p>

            <div className="p-4 rounded-2xl bg-[#020b18]/80 border border-cyan-800/40 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-cyan-200 block mb-0.5">初心者向け攻略アドバイス：</strong>
                {selectedOrb.tips}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-[#020b18]/90 rounded-2xl border border-cyan-800/40 w-full lg:w-72 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-3 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${selectedOrb.glowColor} 20%, rgba(2,11,24,0.9) 80%)`,
                boxShadow: `0 0 30px ${selectedOrb.glowColor}`
              }}
            >
              {(() => {
                const Icon = getIcon(selectedOrb.iconName);
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              {selectedOrb.name}
            </span>
            <span className="text-[11px] text-cyan-400 font-mono">
              IN-GAME LIGHT ENTITY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
