import { useState } from 'react';
import { Compass, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { STRATEGY_TIPS_DATA, FAQ_DATA } from '../data/gameData';
import { soundEffects } from '../utils/audio';

export default function BeginnerStrategySection() {
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    soundEffects.playBubble();
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="strategy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>BEGINNER STRATEGY & ROADMAP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Cinzel'] mb-4">
          初心者向けステップ別 攻略ロードマップ
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          深海探索を無駄なく進めるためのセオリーと、優先して取るべき行動指針をフェーズごとに解説します。
        </p>
      </div>

      {/* 3 Strategy Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {STRATEGY_TIPS_DATA.map((tip, idx) => (
          <div
            key={tip.phase}
            className="p-6 sm:p-7 rounded-3xl bg-[#020e21]/90 border border-cyan-900/40 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tip.badgeColor}`}>
                  STEP {idx + 1} : {tip.phase}
                </span>
                <span className="text-xs text-slate-500 font-mono">PHASE 0{idx + 1}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {tip.title}
              </h3>

              <p className="text-xs text-cyan-300/80 mb-5 leading-relaxed">
                {tip.summary}
              </p>

              <div className="space-y-2.5">
                {tip.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div id="faq" className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Cinzel']">
            よくある質問（FAQ）
          </h3>
        </div>

        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIndices.includes(idx);
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-[#020e21]/90 border border-cyan-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-slate-100 font-semibold text-sm sm:text-base hover:text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-xs font-mono">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-950/60 bg-[#010813]/60 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-xs font-mono shrink-0">
                      A
                    </span>
                    <div>{faq.answer}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
