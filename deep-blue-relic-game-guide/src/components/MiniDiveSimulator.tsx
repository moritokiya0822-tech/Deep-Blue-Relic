import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Zap, Gauge, Heart, Radio, Sparkles, Anchor, Compass, Trophy, X, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface Entity {
  id: number;
  x: number;
  y: number;
  type: 'red' | 'yellow' | 'white' | 'purple' | 'enemy';
  radius: number;
  vx?: number;
  vy?: number;
  frozenUntil?: number;
  depth: number;
}

interface MiniDiveSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniDiveSimulator({ isOpen, onClose }: MiniDiveSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [startDepth, setStartDepth] = useState<number>(0);
  const [unlockedCheckpoints, setUnlockedCheckpoints] = useState<number[]>([0]);

  // In-game stats
  const [depth, setDepth] = useState<number>(0);
  const [oxygen, setOxygen] = useState<number>(100);
  const [maxOxygen, setMaxOxygen] = useState<number>(100);
  const [hp, setHp] = useState<number>(100);
  const [maxHp, setMaxHp] = useState<number>(100);
  const [redParts, setRedParts] = useState<number>(0);
  const [relicsFound, setRelicsFound] = useState<string[]>([]);
  const [expCollected, setExpCollected] = useState<number>(0);
  const [empCooldown, setEmpCooldown] = useState<number>(0);
  const [empRadius, setEmpRadius] = useState<number>(0);

  // Submarine position & speed
  const playerRef = useRef({
    x: 300,
    y: 100,
    vx: 0,
    vy: 0,
    speed: 3.5,
    pressureLv: 3,
    empLv: 3,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const entitiesRef = useRef<Entity[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Initialize and handle Start Game
  const handleStartGame = (chosenStartDepth: number = 0) => {
    soundEffects.playLevelUp();
    setStartDepth(chosenStartDepth);
    setDepth(chosenStartDepth);
    setOxygen(100);
    setMaxOxygen(100);
    setHp(100);
    setMaxHp(100);
    setRedParts(0);
    setRelicsFound([]);
    setExpCollected(0);
    setEmpCooldown(0);
    setEmpRadius(0);
    setIsGameOver(false);
    setIsPlaying(true);

    playerRef.current = {
      x: 300,
      y: 120,
      vx: 0,
      vy: 0,
      speed: 3.8,
      pressureLv: 4,
      empLv: 3,
    };

    // Populate initial ocean entities
    const initialEntities: Entity[] = [];
    for (let i = 0; i < 30; i++) {
      const typeRand = Math.random();
      let type: Entity['type'] = 'white';
      if (typeRand < 0.35) type = 'red';
      else if (typeRand < 0.6) type = 'yellow';
      else if (typeRand < 0.8) type = 'white';
      else type = 'enemy';

      initialEntities.push({
        id: Math.random(),
        x: 50 + Math.random() * 500,
        y: 200 + i * 80,
        type,
        radius: type === 'enemy' ? 14 : 9,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 0.5,
        depth: chosenStartDepth + i * 35,
      });
    }

    // Add Purple checkpoints if not passed
    [200, 700, 1200].forEach((cpDepth) => {
      if (cpDepth > chosenStartDepth) {
        initialEntities.push({
          id: Math.random(),
          x: 300,
          y: (cpDepth - chosenStartDepth) * 2.5,
          type: 'purple',
          radius: 16,
          depth: cpDepth,
        });
      }
    });

    entitiesRef.current = initialEntities;
  };

  // Handle EMP Trigger
  const triggerEMP = () => {
    if (empCooldown > 0 || !isPlaying || isGameOver) return;
    soundEffects.playEMP();
    setEmpCooldown(12); // 12s cooldown
    setEmpRadius(150);

    const now = Date.now();
    // Freeze all on-screen enemies
    entitiesRef.current.forEach((e) => {
      if (e.type === 'enemy') {
        const dx = e.x - playerRef.current.x;
        const dy = e.y - playerRef.current.y;
        if (Math.hypot(dx, dy) < 220) {
          e.frozenUntil = now + 4000; // 4s freeze
        }
      }
    });
  };

  // Keyboard events listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        triggerEMP();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [empCooldown, isPlaying, isGameOver]);

  // Main Game Loop Canvas Render
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localO2 = oxygen;
    let localHp = hp;
    let localDepth = depth;

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Update Submarine Movement
      const p = playerRef.current;
      let ax = 0;
      let ay = 0;

      if (keysPressed.current['ArrowLeft'] || keysPressed.current['KeyA']) ax -= 1;
      if (keysPressed.current['ArrowRight'] || keysPressed.current['KeyD']) ax += 1;
      if (keysPressed.current['ArrowUp'] || keysPressed.current['KeyW']) ay -= 1;
      if (keysPressed.current['ArrowDown'] || keysPressed.current['KeyS']) ay += 1.5; // Natural gravity / diving

      p.vx = p.vx * 0.88 + ax * p.speed * 0.2;
      p.vy = p.vy * 0.88 + ay * p.speed * 0.2;

      p.x += p.vx;
      p.y += p.vy;

      // Boundaries
      p.x = Math.max(25, Math.min(canvas.width - 25, p.x));
      if (p.y < 50) {
        p.y = 50;
        p.vy = 0;
      }

      // Camera offset following player depth
      const currentSimDepth = Math.max(0, Math.round(startDepth + p.y * 0.6));
      localDepth = currentSimDepth;
      setDepth(localDepth);

      // Oxygen Depletion with Depth Acceleration
      // Exponential curve: base + depth multiplier
      const depthMultiplier = 1.0 + Math.pow(localDepth / 250, 1.5);
      const pressureMitigation = 0.7; // Lv.4
      const drainRate = 2.5 * depthMultiplier * pressureMitigation;
      localO2 -= drainRate * dt;

      if (localO2 <= 0) {
        localO2 = 0;
        soundEffects.playBubble();
        setIsGameOver(true);
        setIsPlaying(false);
      }
      setOxygen(Math.round(localO2));

      // Decrease EMP Cooldown
      setEmpCooldown((prev) => Math.max(0, prev - dt));
      setEmpRadius((prev) => Math.max(0, prev - dt * 200));

      // Update Entities & Collision
      const now = Date.now();
      entitiesRef.current.forEach((e) => {
        // Enemy patrol movement if not frozen
        if (e.type === 'enemy') {
          if (!e.frozenUntil || e.frozenUntil < now) {
            e.x += (e.vx || 0);
            if (e.x < 30 || e.x > canvas.width - 30) e.vx = -(e.vx || 1);
          }
        }

        // Collision with player
        const dist = Math.hypot(e.x - p.x, e.y - p.y);
        if (dist < e.radius + 18) {
          if (e.type === 'red') {
            soundEffects.playLevelUp();
            setRedParts((prev) => prev + 1);
            e.y = -9999; // remove
          } else if (e.type === 'yellow') {
            soundEffects.playRelicChime();
            const relicNames = ['古びたボールペン', '陶器のマグカップ', 'ブリキのロボット', '真鍮の砂時計'];
            const randomRelic = relicNames[Math.floor(Math.random() * relicNames.length)];
            setRelicsFound((prev) => [...prev, randomRelic]);
            e.y = -9999;
          } else if (e.type === 'white') {
            soundEffects.playBubble();
            localO2 = Math.min(maxOxygen, localO2 + 15);
            setExpCollected((prev) => prev + 25);
            setMaxOxygen((prev) => prev + 2);
            e.y = -9999;
          } else if (e.type === 'purple') {
            soundEffects.playCheckpoint();
            if (!unlockedCheckpoints.includes(e.depth)) {
              setUnlockedCheckpoints((prev) => [...prev, e.depth]);
              confetti({ particleCount: 60, spread: 50 });
            }
            e.y = -9999;
          } else if (e.type === 'enemy') {
            if (!e.frozenUntil || e.frozenUntil < now) {
              soundEffects.playEMP();
              localHp -= 20;
              p.vx = -p.vx * 1.5;
              p.vy = -p.vy * 1.5;
              if (localHp <= 0) {
                localHp = 0;
                setIsGameOver(true);
                setIsPlaying(false);
              }
              setHp(localHp);
            }
          }
        }
      });

      // Filter out collected
      entitiesRef.current = entitiesRef.current.filter((e) => e.y > -100);

      // Render Scene
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Depth-based water gradient
      const depthRatio = Math.min(1, localDepth / 1200);
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, `rgb(${Math.round(10 * (1 - depthRatio))}, ${Math.round(40 * (1 - depthRatio))}, ${Math.round(80 * (1 - depthRatio))})`);
      grad.addColorStop(1, `rgb(2, 8, ${Math.round(24 * (1 - depthRatio))})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sunken City silhouettes in background
      if (localDepth > 400) {
        ctx.fillStyle = 'rgba(2, 18, 38, 0.4)';
        ctx.fillRect(40, canvas.height - 120, 60, 120);
        ctx.fillRect(120, canvas.height - 160, 70, 160);
        ctx.fillRect(420, canvas.height - 140, 80, 140);
        ctx.fillRect(520, canvas.height - 90, 50, 90);
      }

      // Draw Entities
      entitiesRef.current.forEach((e) => {
        ctx.save();
        if (e.type === 'red') {
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (e.type === 'yellow') {
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (e.type === 'white') {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (e.type === 'purple') {
          ctx.fillStyle = '#a855f7';
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px Rajdhani';
          ctx.fillText(`${e.depth}m`, e.x - 12, e.y + 3);
        } else if (e.type === 'enemy') {
          const isFrozen = e.frozenUntil && e.frozenUntil > now;
          ctx.fillStyle = isFrozen ? '#38bdf8' : '#e11d48';
          ctx.shadowColor = isFrozen ? '#38bdf8' : '#e11d48';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
          // Jellyfish tentacles
          ctx.strokeStyle = isFrozen ? '#7dd3fc' : '#fda4af';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(e.x - 6, e.y + e.radius);
          ctx.lineTo(e.x - 6, e.y + e.radius + 8);
          ctx.moveTo(e.x, e.y + e.radius);
          ctx.lineTo(e.x, e.y + e.radius + 10);
          ctx.moveTo(e.x + 6, e.y + e.radius);
          ctx.lineTo(e.x + 6, e.y + e.radius + 8);
          ctx.stroke();
        }
        ctx.restore();
      });

      // Draw EMP Shockwave
      if (empRadius > 0) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 220 - empRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Player Submarine
      ctx.save();
      ctx.translate(p.x, p.y);

      // Light beam
      ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(-70, -25);
      ctx.lineTo(-70, 25);
      ctx.closePath();
      ctx.fill();

      // Submarine Hull
      ctx.fillStyle = '#eab308';
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 22, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cockpit Dome
      ctx.fillStyle = 'rgba(186, 230, 253, 0.7)';
      ctx.beginPath();
      ctx.arc(4, -5, 7, Math.PI, 0);
      ctx.fill();

      // Porthole Light
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-2, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Propeller
      ctx.fillStyle = '#451a03';
      ctx.fillRect(20, -5, 4, 10);

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, isGameOver, maxOxygen, startDepth]);

  if (!isOpen) return null;

  return (
    <div
      id="mini-dive-modal"
      className="fixed inset-0 z-50 bg-[#010813]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#020e21] border-2 border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#03152c] border-b border-cyan-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                深海潜水インタラクティブ体験（ミニゲーム）
              </h3>
              <p className="text-[11px] text-cyan-400 font-mono">
                DEEP SEA DIVE SIMULATION
              </p>
            </div>
          </div>

          <button
            id="close-sim-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* In-Game HUD Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-6 py-3 bg-[#010a17] border-b border-cyan-900/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>深度: <strong className="text-cyan-300 text-sm">{depth}m</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Gauge className={`w-4 h-4 ${oxygen < 25 ? 'text-rose-500 animate-ping' : 'text-sky-400'}`} />
            <span>酸素: <strong className={oxygen < 25 ? 'text-rose-400 font-bold' : 'text-white'}>{oxygen}%</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>装甲: <strong className="text-rose-300">{hp}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>赤パーツ: <strong className="text-red-400">{redParts}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span>遺物: <strong className="text-amber-300">{relicsFound.length}個</strong></span>
          </div>
        </div>

        {/* Canvas Game Area */}
        <div className="relative flex-1 bg-[#010813] flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
          <canvas
            ref={canvasRef}
            width={600}
            height={420}
            className="w-full max-w-[600px] h-[360px] sm:h-[420px] bg-slate-950 rounded-2xl shadow-inner border border-cyan-900/40"
          />

          {/* Start Screen Overlay */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 bg-[#020b18]/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
              <Compass className="w-12 h-12 text-cyan-400 mb-3 animate-pulse" />
              <h4 className="text-2xl font-bold text-white mb-2 font-['Cinzel']">
                潜水開始ポイントを選択
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6">
                紫の光で解放したセーブ拠点から潜水を開始できます。
                十字キーまたはWASDで移動、スペースキーでEMP発動！
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {[0, 200, 700, 1200].map((cp) => {
                  const isUnlocked = unlockedCheckpoints.includes(cp);
                  return (
                    <button
                      key={cp}
                      disabled={!isUnlocked}
                      onClick={() => handleStartGame(cp)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                        isUnlocked
                          ? 'bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 shadow-md'
                          : 'bg-slate-900/50 border border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <Anchor className="w-3.5 h-3.5" />
                      <span>{cp}m {cp === 0 ? '(表層)' : cp === 200 ? '(浅海)' : cp === 700 ? '(遺跡)' : '(深淵)'}</span>
                    </button>
                  );
                })}
              </div>

              <button
                id="start-dive-btn"
                onClick={() => handleStartGame(0)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base shadow-lg shadow-cyan-500/30 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>0mから潜水開始</span>
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-[#020b18]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <Trophy className="w-12 h-12 text-amber-400 mb-2" />
              <h4 className="text-2xl font-bold text-white mb-1 font-['Cinzel']">
                潜水結果（リザルト）
              </h4>
              <p className="text-xs text-cyan-400 mb-6 font-mono">
                EXPEDITION REPORT
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg mb-6 text-left">
                <div className="p-3 rounded-xl bg-[#010813] border border-cyan-900/40">
                  <span className="text-[10px] text-slate-400 block font-mono">MAX DEPTH</span>
                  <span className="text-base font-bold text-cyan-300 font-mono">{depth} m</span>
                </div>
                <div className="p-3 rounded-xl bg-[#010813] border border-cyan-900/40">
                  <span className="text-[10px] text-slate-400 block font-mono">RED PARTS</span>
                  <span className="text-base font-bold text-red-400 font-mono">+{redParts} 個</span>
                </div>
                <div className="p-3 rounded-xl bg-[#010813] border border-cyan-900/40">
                  <span className="text-[10px] text-slate-400 block font-mono">RELICS FOUND</span>
                  <span className="text-base font-bold text-amber-300 font-mono">{relicsFound.length} 個</span>
                </div>
                <div className="p-3 rounded-xl bg-[#010813] border border-cyan-900/40">
                  <span className="text-[10px] text-slate-400 block font-mono">EXP GAINED</span>
                  <span className="text-base font-bold text-cyan-100 font-mono">+{expCollected}</span>
                </div>
              </div>

              {relicsFound.length > 0 && (
                <div className="mb-6 p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
                  🎉 発見した遺物: {relicsFound.join(', ')}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  id="retry-dive-btn"
                  onClick={() => handleStartGame(startDepth)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>もう一度潜る ({startDepth}m)</span>
                </button>
                <button
                  onClick={() => setIsGameOver(false)}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-sm"
                >
                  拠点へ戻る
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile On-Screen Controls & EMP Button */}
        <div className="p-4 bg-[#03152c] border-t border-cyan-800/40 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 hidden sm:block">
            ⌨️ 操作: <strong className="text-slate-200">矢印キー / WASD</strong> で移動、<strong className="text-slate-200">SPACEキー</strong> でEMP放電
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="mobile-emp-btn"
              disabled={empCooldown > 0 || !isPlaying}
              onClick={triggerEMP}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                empCooldown > 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>EMP発動 {empCooldown > 0 ? `(${empCooldown.toFixed(1)}s)` : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
