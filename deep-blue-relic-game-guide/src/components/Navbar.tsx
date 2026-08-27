import { useState, useEffect } from 'react';
import { Compass, Volume2, VolumeX, Menu, X, Play, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  onOpenSimulator: () => void;
}

export default function Navbar({ onOpenSimulator }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEffects.playBubble();
    }
  };

  const navLinks = [
    { label: '世界観', href: '#story' },
    { label: '4つの光', href: '#lights' },
    { label: '潜水艦強化', href: '#upgrade' },
    { label: '深度と酸素', href: '#depth-chart' },
    { label: '遺物図鑑', href: '#relics' },
    { label: '初心者攻略', href: '#strategy' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = () => {
    soundEffects.playBubble();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020b18]/90 backdrop-blur-md border-b border-cyan-900/50 shadow-lg shadow-cyan-950/20 py-2.5'
          : 'bg-gradient-to-b from-[#020b18]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="nav-logo"
          onClick={() => soundEffects.playSonarPing()}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-0.5 shadow-md shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all">
            <div className="w-full h-full bg-[#031329] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
          </div>
          <div>
            <div className="font-['Cinzel'] tracking-wider text-xl font-bold bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              Deep Blue Relic
            </div>
            <div className="text-[10px] tracking-widest text-cyan-400/70 font-['Rajdhani'] font-semibold uppercase -mt-0.5">
              Official Game Guide
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-800/40 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            title={isMuted ? 'サウンドをONにする' : 'サウンドをOFFにする'}
            className="p-2 rounded-lg bg-slate-900/80 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-950/60 hover:text-cyan-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Interactive Simulator Trigger Button */}
          <button
            id="nav-play-simulator-btn"
            onClick={() => {
              soundEffects.playSonarPing();
              onOpenSimulator();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-cyan-900/40 border border-cyan-400/30 active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>潜水体験</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-white/20 rounded font-mono">
              PLAY
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-950/60 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#031329]/95 backdrop-blur-xl border-b border-cyan-800/50 px-4 pt-3 pb-5 space-y-1.5 shadow-2xl mt-2 animate-in slide-in-from-top-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-cyan-200 hover:bg-cyan-900/40 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-cyan-900/40">
            <button
              onClick={() => {
                handleNavClick();
                onOpenSimulator();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>深海潜水シミュレーターを起動</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
