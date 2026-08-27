import { Compass, Sparkles, Anchor, RefreshCw, Layers, Award } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function WorldLoreSection() {
  const loopSteps = [
    {
      num: '01',
      title: '深海へ潜水＆光の回収',
      desc: '潜水艦を操縦して未知の深海へ。4色の光（赤・黄・白・紫）と遺物を回収しながら深度を深める。',
      icon: Anchor,
      tag: '潜水探索',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      num: '02',
      title: 'ステータス強化＆酸素拡張',
      desc: '集めた赤い光で6つのステータスを強化。白い光の経験値で最大酸素バー（潜水可能時間）を拡張。',
      icon: RefreshCw,
      tag: '強化育成',
      color: 'from-red-500 to-rose-500'
    },
    {
      num: '03',
      title: '遺物セット効果の発動',
      desc: '黄色い光から日常遺物を収集。セットが揃うと「酸素消費軽減」や「EMP強化」など永続バフが発動。',
      icon: Layers,
      tag: '遺物図鑑',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      num: '04',
      title: 'セーブ拠点解放と形見の捜索',
      desc: '紫の光で深海チェックポイントを解放。深層（700m/1200m+）の海底都市へ潜り最愛の「形見」を目指す。',
      icon: Award,
      tag: '深淵到達',
      color: 'from-purple-500 to-fuchsia-500'
    }
  ];

  return (
    <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>WORLD & GAME OVERVIEW</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-['Cinzel'] mb-4">
          海に沈んだ世界と、遺物たちの記憶
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          かつて繁栄した人類の文明は、遥かな大洪水によってすべて深い海の下へと沈んでしまった。
          プレイヤーは潜水艦の操縦士となり、忘れ去られゆく当時の面影と、主人公にとってかけがえのない「形見」を求めて深海へと挑み続けます。
        </p>
      </div>

      {/* 2-Column Lore & Purpose Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Lore Card 1: 遺物を集める理由 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#061e38]/90 via-[#03152c] to-[#020b18] border border-cyan-800/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">なぜ遺物を集めるのか？</h3>
              <p className="text-xs text-cyan-400">沈んだ文明を風化させないための証</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            海底に眠る遺物は、ハンカチ、陶器のコップ、ボールペン、古びた目覚まし時計など、沈没前の世界ではごく当たり前に使われていた日常品ばかりです。
          </p>
          <div className="p-4 rounded-xl bg-[#020b18]/80 border border-cyan-900/50 text-xs text-slate-300 leading-relaxed">
            <span className="text-amber-300 font-semibold block mb-1">💡 遺物セット効果（バフ）</span>
            関係の深い遺物を揃えると「台所の面影」「教室の残像」などのセットが完成し、潜水艦の性能や探索を強力にサポートする永続パッシブバフが発動します。
          </div>
        </div>

        {/* Lore Card 2: 形見と深淵の探求 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0e1638]/90 via-[#060e29] to-[#020b18] border border-indigo-800/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">最深部に眠る『形見』</h3>
              <p className="text-xs text-indigo-400">主人公が繰り返し潜り続ける本当の目的</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            深度が深くなるほど水圧が増し、酸素ゲージは急速に減少します。しかし、潜水艦を強化しチェックポイントを解放していくことで、1200mを超える未知の深淵へ到達可能になります。
          </p>
          <div className="p-4 rounded-xl bg-[#020b18]/80 border border-indigo-900/50 text-xs text-slate-300 leading-relaxed">
            <span className="text-purple-300 font-semibold block mb-1">🌊 目的の到達点</span>
            最深部に眠る主人公の大切な「形見」にたどり着くこと。それがこの探索の旅の最終目的地です。
          </div>
        </div>
      </div>

      {/* Core Gameplay Loop Flow */}
      <div className="bg-[#041426]/70 border border-cyan-800/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            基本のゲームサイクル（探索ループ）
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            『潜水 → 収集 → 強化 → 深海拠点解放』を繰り返して深海最深部を目指す
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loopSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-5 rounded-2xl bg-[#020b18]/90 border border-cyan-900/40 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-['Rajdhani'] bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {step.num}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                      {step.tag}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} p-0.5 mb-3`}>
                    <div className="w-full h-full bg-[#031329] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
