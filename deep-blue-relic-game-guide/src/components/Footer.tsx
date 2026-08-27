import { useState } from 'react';
import { Compass, Sparkles, Download, Copy, Check, Heart, Code2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    soundEffects.playLevelUp();
    const summaryText = `【Deep Blue Relic 公式ゲーム概要】
・4つの光球:
  🔴 赤：潜水艦の6大ステータス強化（最大Lv.10）
  🟡 黄：旧文明の生活遺物（セット効果で強力パッシブ発動）
  ⚪ 白：EXP獲得 ＆ 呼吸バー（最大酸素容量）拡張
  🟣 紫：潜水開始地点の深度チェックポイント（0m, 200m, 700m, 1200m）
・6大ステータス: 装甲厚 / 推進推力 / 姿勢制御 / 耐圧効率 / EMP / レーダー
・深度と水圧: 深くなるほど酸素消費が加速度的に増加。耐圧効率とセーブポイントで深淵1200m+の形見を目指す。`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="border-t border-cyan-900/40 bg-[#010712] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Concept */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-['Cinzel'] text-xl font-bold tracking-wider text-white">
              Deep Blue Relic
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            海に沈んだ文明の遺物と形見を求めて深淵へ潜る海洋探索ゲーム。
            公式Web解説ポータル ＆ 初心者ガイド
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#story" className="hover:text-cyan-300 transition-colors">世界観</a>
          <a href="#lights" className="hover:text-cyan-300 transition-colors">4つの光</a>
          <a href="#upgrade" className="hover:text-cyan-300 transition-colors">潜水艦強化</a>
          <a href="#depth-chart" className="hover:text-cyan-300 transition-colors">深度と酸素</a>
          <a href="#relics" className="hover:text-cyan-300 transition-colors">遺物図鑑</a>
          <a href="#strategy" className="hover:text-cyan-300 transition-colors">初心者攻略</a>
        </div>

        {/* Action Button: Copy Summary Text */}
        <div className="flex items-center gap-3">
          <button
            id="copy-summary-btn"
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-600/40 text-cyan-200 text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '要約テキストをコピー完了！' : 'ゲーム要約テキストをコピー'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-cyan-950/80 text-center text-[11px] text-slate-500 font-mono">
        © 2026 Deep Blue Relic. Designed for beginner divers exploring the abyssal deep sea.
      </div>
    </footer>
  );
}
