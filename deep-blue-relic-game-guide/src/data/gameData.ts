import { LightOrbInfo, SubmarineStat, DepthZone, RelicSet, StrategyTip, FAQItem } from '../types';

export const LIGHT_ORBS_DATA: LightOrbInfo[] = [
  {
    id: 'red',
    name: 'Red Light',
    jpName: '赤い光（強化パーツ）',
    colorClass: 'from-red-500 to-rose-600',
    glowColor: 'rgba(239, 68, 68, 0.7)',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
    badgeBorder: 'border-red-500',
    iconName: 'Wrench',
    shortDesc: '潜水艦のステータス強化に必要なパーツ',
    detailedEffect: '集めた個数に応じて「装甲厚」「推進推力」「姿勢制御」「耐圧効率」「EMP」「レーダー」の6大ステータス（最大Lv.10）を強化できます。',
    beginnerPriority: 'S',
    tips: '序盤はまず「耐圧効率」と「推進推力」に優先投資することで、潜水時間と機動力が飛躍的に向上します。見つけたら最優先で回収しましょう。'
  },
  {
    id: 'yellow',
    name: 'Yellow Light',
    jpName: '黄色い光（遺物）',
    colorClass: 'from-amber-400 to-yellow-500',
    glowColor: 'rgba(234, 179, 8, 0.8)',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    badgeBorder: 'border-amber-500',
    iconName: 'Package',
    shortDesc: '沈んだ旧文明の遺物（日常品）',
    detailedEffect: 'ハンカチやコップ、文房具など沈没前の生活遺物を入手。特定組み合わせの遺物を集めると「遺物セット効果（強力なパッシブバフ）」が恒久発動します。',
    beginnerPriority: 'S',
    tips: '遺物を揃えると「酸素消費-15%」や「強化パーツドロップ率UP」などの強烈なセット効果が解放されるため、探索の要となります。'
  },
  {
    id: 'white',
    name: 'White Light',
    jpName: '白い光（経験値 / 呼吸バー拡張）',
    colorClass: 'from-cyan-100 to-white',
    glowColor: 'rgba(255, 255, 255, 0.85)',
    badgeBg: 'bg-cyan-100/20 text-cyan-200 border-cyan-300/40',
    badgeBorder: 'border-cyan-200',
    iconName: 'Sparkles',
    shortDesc: '経験値を獲得し、酸素バー最大値を延長',
    detailedEffect: '大小2種類の光が存在。大サイズは多くの経験値を獲得可能。プレイヤーレベルが上がると「呼吸可能バー（酸素ゲージの最大値）」が恒久的に拡張されます。',
    beginnerPriority: 'A',
    tips: '最大酸素量が増えるほど一度の潜水で深部まで探索できる時間が増加します。浅瀬でしっかり集めて基礎体力を鍛えましょう。'
  },
  {
    id: 'purple',
    name: 'Purple Light',
    jpName: '紫の光（深度セーブポイント）',
    colorClass: 'from-purple-500 to-fuchsia-600',
    glowColor: 'rgba(168, 85, 247, 0.8)',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    badgeBorder: 'border-purple-500',
    iconName: 'Anchor',
    shortDesc: '潜水開始深度のチェックポイント',
    detailedEffect: '深海の特定深度（200m、700m、1200mなど）に配置された拠点標識。到達して触れることで、次回以降の潜水開始地点として選択可能になります。',
    beginnerPriority: 'S',
    tips: '浅瀬から潜り直す手間を大幅に短縮できる最重要拠点。深層に挑む際は、まず次の紫の光を目指してルートを開拓しましょう。'
  }
];

export const SUBMARINE_STATS_DATA: SubmarineStat[] = [
  {
    id: 'armor',
    name: 'Armor Thickness',
    jpName: '装甲厚',
    maxLevel: 10,
    description: '潜水艦の最大体力（HP）が増加します。',
    gameplayRole: '深海の尖鋭な岩礁や敵性生物との接触ダメージに耐える耐久力を底上げします。',
    scalingFormula: (lvl) => ({
      value: `${100 + (lvl - 1) * 30} HP`,
      num: 100 + (lvl - 1) * 30,
      unit: 'HP'
    }),
    recommendedPriority: 4,
    icon: 'Shield'
  },
  {
    id: 'thrust',
    name: 'Propulsion Thrust',
    jpName: '推進推力',
    maxLevel: 10,
    description: '潜水艦の最大移動速度が上昇します。',
    gameplayRole: 'より素早く深部へ到達し、酸素が尽きる前に広範囲の光や遺物を回収・脱出できるようになります。',
    scalingFormula: (lvl) => ({
      value: `+${(lvl - 1) * 15}% 速度`,
      num: 100 + (lvl - 1) * 15,
      unit: '%'
    }),
    recommendedPriority: 2,
    icon: 'Zap'
  },
  {
    id: 'control',
    name: 'Attitude Control',
    jpName: '姿勢制御',
    maxLevel: 10,
    description: 'コントロール性能・旋回追従性が向上します。',
    gameplayRole: '水流や慣性に流されにくくなり、狭い海底洞窟や敵の攻撃を精密に回避できるようになります。',
    scalingFormula: (lvl) => ({
      value: `+${(lvl - 1) * 12}% 旋回力`,
      num: 100 + (lvl - 1) * 12,
      unit: '%'
    }),
    recommendedPriority: 5,
    icon: 'Compass'
  },
  {
    id: 'pressure',
    name: 'Pressure Resistance',
    jpName: '耐圧効率',
    maxLevel: 10,
    description: '深度による酸素減少量の加速度的増加が大幅に緩和されます。',
    gameplayRole: '【最重要】深海では水圧により酸素消費が激増しますが、耐圧効率を高めることで深層での活動可能時間が劇的に伸びます。',
    scalingFormula: (lvl) => ({
      value: `水圧耐性 +${(lvl - 1) * 10}%`,
      num: (lvl - 1) * 10,
      unit: '% 軽減'
    }),
    recommendedPriority: 1,
    icon: 'Gauge'
  },
  {
    id: 'emp',
    name: 'EMP Burst',
    jpName: 'EMP',
    maxLevel: 10,
    description: '敵をフリーズさせる技の硬直時間延長とクールタイム短縮。',
    gameplayRole: '周囲に電磁パルスを放ち、迫り来る深海生物を一時的に完全停止させます。危機脱出の切り札。',
    scalingFormula: (lvl) => ({
      value: `停止 ${2.0 + (lvl - 1) * 0.6}秒 / CT ${30 - (lvl - 1) * 2}秒`,
      num: lvl,
      unit: 'Lv'
    }),
    recommendedPriority: 3,
    icon: 'Radio'
  },
  {
    id: 'radar',
    name: 'Sonar Radar',
    jpName: 'レーダー',
    maxLevel: 10,
    description: '敵や重要目標の場所を矢印で表す探知範囲が拡大します。',
    gameplayRole: '視界が極めて暗い深海において、遠方の脅威や遺物の位置を事前に感知して安全な航路を確保できます。',
    scalingFormula: (lvl) => ({
      value: `探知半径 +${(lvl - 1) * 20}m`,
      num: 50 + (lvl - 1) * 20,
      unit: 'm'
    }),
    recommendedPriority: 6,
    icon: 'Scan'
  }
];

export const DEPTH_ZONES_DATA: DepthZone[] = [
  {
    depthRange: '0m 〜 200m',
    startMeters: 0,
    endMeters: 200,
    title: '陽光層（浅海）',
    subtitle: 'Sunlit Surface & Coral Reefs',
    color: '#38bdf8',
    bgGradient: 'from-sky-900/60 to-blue-950/80',
    checkpointDepth: 0,
    oxygenDrainMultiplier: 1.0,
    hazards: ['弱い海流', '小型の回遊魚'],
    recommendedStats: '初期状態（Lv.1〜2）で安全に周回可能',
    description: '太陽の光が届く青く穏やかな浅瀬。白い光（EXP）や赤い光（強化パーツ）が豊富に漂い、潜水艦の基礎強化を行うのに最適なエントリーエリアです。'
  },
  {
    depthRange: '200m 〜 700m',
    startMeters: 200,
    endMeters: 700,
    title: '薄光層（中深海）',
    subtitle: 'Twilight Zone & Fish Schools',
    color: '#0284c7',
    bgGradient: 'from-blue-950/80 to-indigo-950/90',
    checkpointDepth: 200,
    oxygenDrainMultiplier: 1.8,
    hazards: ['酸素消費の加速', '大型肉食魚の突進', '急流'],
    recommendedStats: '耐圧効率 Lv.3以上 / 推進推力 Lv.3以上',
    description: '青みが急速に濃くなり、日光が遮断され始める層。水圧によって酸素の減少速度が加速し始めます。200m地点の紫の光（セーブポイント）を最優先で開放しましょう。'
  },
  {
    depthRange: '700m 〜 1200m',
    startMeters: 700,
    endMeters: 1200,
    title: '無光層（深海都市遺跡）',
    subtitle: 'Midnight Metropolis Ruins',
    color: '#6366f1',
    bgGradient: 'from-indigo-950/90 to-purple-950/95',
    checkpointDepth: 700,
    oxygenDrainMultiplier: 3.2,
    hazards: ['激しい酸素減少', '発光クラゲ群の電撃', '崩落した信号機・廃墟の障害物'],
    recommendedStats: '耐圧効率 Lv.6以上 / EMP Lv.4以上',
    description: 'かつて人類が暮らしていたビル群や道路、信号機が沈む幻想的な海底都市。多くの貴重な「遺物」が眠っていますが、生物の攻撃性も水圧も極めて危険です。'
  },
  {
    depthRange: '1200m 〜 深淵',
    startMeters: 1200,
    endMeters: 2000,
    title: '超深海・深淵層（失われた文明の最奥）',
    subtitle: 'Abyssal Trench & The Memento',
    color: '#a855f7',
    bgGradient: 'from-purple-950/95 to-slate-950',
    checkpointDepth: 1200,
    oxygenDrainMultiplier: 5.5,
    hazards: ['極限水圧による超高速酸素枯渇', '深淵の捕食者', '完全な暗闇'],
    recommendedStats: '全ステータス Lv.8〜10 / 遺物セット効果必須',
    description: '光が一切届かない絶対の深淵。主人公が探し求めるかけがえのない「形見」が眠る最後の未踏領域。万全の強化と遺物バフを整えた者だけが生還できます。'
  }
];

export const RELIC_SETS_DATA: RelicSet[] = [
  {
    id: 'lost-toys',
    title: '亡くされた玩具',
    description: 'かつて子どもたちの笑顔を彩っていた無邪気な宝物たち。',
    buffTitle: '純真な探求心',
    buffDetail: '白い光（EXP）の獲得量が +35% 増加し、呼吸バー成長速度がアップ',
    color: '#f59e0b',
    relicIds: ['toy-1', 'toy-2', 'toy-3'],
    relics: [
      {
        id: 'toy-1',
        name: 'ガラスのビー玉',
        category: '玩具',
        icon: 'CircleDot',
        rarity: 'Common',
        description: '光にかざすと万華鏡のように青く煌めくビー玉。',
        memoryStory: '太陽の光を閉じ込めたように輝いていたあの夏の日の記憶。',
        depthFound: '150m (浅海層)'
      },
      {
        id: 'toy-2',
        name: 'ブリキのゼンマイロボット',
        category: '玩具',
        icon: 'Bot',
        rarity: 'Rare',
        description: '少し錆びついているが、今にも動き出しそうな小型ロボット。',
        memoryStory: 'ゼンマイを巻くとカタカタと不器用に歩いた少年の友達。',
        depthFound: '450m (中深海)'
      },
      {
        id: 'toy-3',
        name: '水濡れしたぬいぐるみ',
        category: '玩具',
        icon: 'HeartHandshake',
        rarity: 'Epic',
        description: '長い歳月海中にあっても、温もりを留めているクマのぬいぐるみ。',
        memoryStory: '眠る時いつも抱きしめていた、世界で一番安心できる存在。',
        depthFound: '850m (深海遺跡)'
      }
    ]
  },
  {
    id: 'kitchen-trace',
    title: '台所の面影',
    description: '湯気と笑い声が満ちていた、家庭の温かな食卓の残り香。',
    buffTitle: '家庭の団らん',
    buffDetail: '潜水中の基礎酸素消費速度が -15% 恒久減少（生存時間延長）',
    color: '#10b981',
    relicIds: ['kit-1', 'kit-2', 'kit-3', 'kit-4'],
    relics: [
      {
        id: 'kit-1',
        name: '陶器のマグカップ',
        category: '生活',
        icon: 'Coffee',
        rarity: 'Common',
        description: '少し欠けているが、温かいココアを注いでいた日常の器。',
        memoryStory: '寒い朝に両手で包み込んで飲んだ、母特製のホットミルク。',
        depthFound: '180m (浅海層)'
      },
      {
        id: 'kit-2',
        name: '銀のスプーン',
        category: '生活',
        icon: 'UtensilsCrossed',
        rarity: 'Common',
        description: '柄に繊細な模様が刻まれた小さなスプーン。',
        memoryStory: '誕生日のケーキを一番最初に口へ運んだ時の輝き。',
        depthFound: '320m (中深海)'
      },
      {
        id: 'kit-3',
        name: '錆びたホーローケトル',
        category: '生活',
        icon: 'Flame',
        rarity: 'Rare',
        description: 'お湯が沸くと軽やかな笛を鳴らしたレトロなやかん。',
        memoryStory: '夕暮れ時に台所から響いた、晩ご飯の合図。',
        depthFound: '750m (深海遺跡)'
      },
      {
        id: 'kit-4',
        name: '手織りのコースター',
        category: '生活',
        icon: 'Disc',
        rarity: 'Rare',
        description: '色とりどりの糸で編まれた円形の敷物。',
        memoryStory: '家族みんなでお揃いで編んだ手作りの思い出。',
        depthFound: '900m (深海遺跡)'
      }
    ]
  },
  {
    id: 'sole-companion',
    title: '唯一の友達',
    description: '主人公の手元に残されていた文具と、かけがえのない記憶の断片。',
    buffTitle: '共鳴するソナー',
    buffDetail: 'レーダー探知範囲 +25% ＆ 未所持の遺物への方向ガイドが常時表示',
    color: '#06b6d4',
    relicIds: ['sole-1', 'sole-2'],
    relics: [
      {
        id: 'sole-1',
        name: '黒と金のボールペン',
        category: '文具',
        icon: 'PenTool',
        rarity: 'Rare',
        description: '頑丈なクリップと金属の重みを持つボールペン。海中でも文字が書けそう。',
        memoryStory: '日誌に毎日の潜水記録と夢を綴っていた大切な一本。',
        depthFound: '250m (中深海)'
      },
      {
        id: 'sole-2',
        name: '革表紙の手帳',
        category: '文具',
        icon: 'BookOpen',
        rarity: 'Epic',
        description: '防水加工されたページに、沈没前の風景スケッチが描かれている。',
        memoryStory: '「いつか青い海をもう一度見たい」と記された誓い。',
        depthFound: '780m (深海遺跡)'
      }
    ]
  },
  {
    id: 'forgotten-years',
    title: '忘れられた歳月',
    description: 'かつて時を刻み、人々を約束の場所へと導いた時計たち。',
    buffTitle: 'タイム・ディレイション',
    buffDetail: 'EMPのクールダウン時間 -20% ＆ 敵のフリーズ停止時間が +1.5秒 延長',
    color: '#8b5cf6',
    relicIds: ['time-1', 'time-2', 'time-3', 'time-4'],
    relics: [
      {
        id: 'time-1',
        name: '止まった腕時計',
        category: '精密機器',
        icon: 'Watch',
        rarity: 'Rare',
        description: '針が「14時23分」で静止した防水腕時計。',
        memoryStory: '世界が水に沈み始めた、あの運命の刻限。',
        depthFound: '380m (中深海)'
      },
      {
        id: 'time-2',
        name: '真鍮の砂時計',
        category: '道具',
        icon: 'Hourglass',
        rarity: 'Rare',
        description: 'ガラスの中で青い砂がゆっくりと落ちる装飾品。',
        memoryStory: '3分間だけ息を止めるゲームをして遊んだ幼い日の記憶。',
        depthFound: '620m (中深海)'
      },
      {
        id: 'time-3',
        name: 'アンティーク目覚まし時計',
        category: '生活',
        icon: 'AlarmClock',
        rarity: 'Epic',
        description: '2つのベルが付いた金属製置き時計。',
        memoryStory: '毎朝鳴り響いて起こしてくれた、懐かしい目覚まし。',
        depthFound: '880m (深海遺跡)'
      },
      {
        id: 'time-4',
        name: '壁掛け日めくりカレンダー',
        category: '記録',
        icon: 'Calendar',
        rarity: 'Epic',
        description: '濡れて固まった紙の束。日付が鮮明に残っている。',
        memoryStory: '記念日や行事の予定がびっしりと書き込まれた愛しい日々。',
        depthFound: '1050m (深海都市遺跡)'
      }
    ]
  },
  {
    id: 'classroom-afterglow',
    title: '教室の残像',
    description: 'チャイムの音と黒板のチョークの匂いが蘇る学び舎の遺構。',
    buffTitle: '知恵の探求者',
    buffDetail: '赤い光（強化パーツ）のドロップ率 +30% ＆ 潜水艦の最大HP +50',
    color: '#ec4899',
    relicIds: ['class-1', 'class-2', 'class-3', 'class-4'],
    relics: [
      {
        id: 'class-1',
        name: '木製の30cm定規',
        category: '文具',
        icon: 'Ruler',
        rarity: 'Common',
        description: '使い込まれて角が丸くなった竹製の定規。',
        memoryStory: '几帳面にノートへ線を引いていた真面目な横顔。',
        depthFound: '210m (浅海・中海境)'
      },
      {
        id: 'class-2',
        name: 'チョークのケース',
        category: '学用品',
        icon: 'Box',
        rarity: 'Rare',
        description: '白いチョークが数本綺麗に並んで残っている小箱。',
        memoryStory: '放課後の黒板にみんなで落書きした笑顔の肖像画。',
        depthFound: '580m (中深海)'
      },
      {
        id: 'class-3',
        name: '真鍮のハンドベル',
        category: '学用品',
        icon: 'Bell',
        rarity: 'Rare',
        description: '振ると海底でも澄んだ高い音を響かせる鈴。',
        memoryStory: '授業の始まりと終わりを告げていた、あの懐かしい音色。',
        depthFound: '820m (深海都市遺跡)'
      },
      {
        id: 'class-4',
        name: '卒業アルバムの断片',
        category: '記念品',
        icon: 'Image',
        rarity: 'Epic',
        description: '集合写真が奇跡的に色褪せず残された写真紙。',
        memoryStory: '「またいつか会おう」と裏面に寄せ書きされた約束。',
        depthFound: '1150m (深海都市遺跡)'
      }
    ]
  },
  {
    id: 'silenced-mechanics',
    title: '沈黙した機械',
    description: '人類の発展を支え、海へ没した電子と歯車の結晶。',
    buffTitle: 'オーバードライブ機構',
    buffDetail: '潜水艦の最高速度 +20% ＆ 酸素が30%以下になると自動で推進力がブースト',
    color: '#eab308',
    relicIds: ['mech-1', 'mech-2', 'mech-3'],
    relics: [
      {
        id: 'mech-1',
        name: '黄銅の精密歯車',
        category: '機械',
        icon: 'Cog',
        rarity: 'Rare',
        description: '噛み合わせが完璧なまま錆びずに残った歯車。',
        memoryStory: '巨大な工場を動かし続けていた心臓部の一片。',
        depthFound: '680m (中深海)'
      },
      {
        id: 'mech-2',
        name: 'トランジスタラジオ',
        category: '電子機器',
        icon: 'Radio',
        rarity: 'Epic',
        description: '電池を入れたらノイズ混じりに音楽が流れそうなラジオ。',
        memoryStory: '真夜中に電波を探して聴いた、遠い街のヒットソング。',
        depthFound: '950m (深海都市遺跡)'
      },
      {
        id: 'mech-3',
        name: '耐水ダイビングライト',
        category: '探査機器',
        icon: 'Flashlight',
        rarity: 'Epic',
        description: '高出力のLEDランプを備えた頑丈な手持ちライト。',
        memoryStory: '暗闇の海を初めて照らした、開拓者たちの希望の光。',
        depthFound: '1200m (深海チェックポイント)'
      }
    ]
  },
  {
    id: 'the-memento',
    title: '深海の約束（最愛の形見）',
    description: '主人公が深海へ潜り続ける真の目的。最深部に眠る究極の記憶。',
    buffTitle: '失われた文明の光',
    buffDetail: '【真のエンディング到達条件】全ステータス限界突破 ＆ 深海全域の完全視界確保',
    color: '#38bdf8',
    relicIds: ['memento-final'],
    relics: [
      {
        id: 'memento-final',
        name: '青い石のペンダント（形見）',
        category: '形見',
        icon: 'Gem',
        rarity: 'Legendary',
        description: '透き通る海の色を宿した美しい宝石の首飾り。裏面に主人公の名前が刻まれている。',
        memoryStory: '「どれほど世界が変わっても、この海の下でずっと待っている」――旅立ちの日に交わした最後の約束。',
        depthFound: '1400m+ (深淵最深部)'
      }
    ]
  }
];

export const STRATEGY_TIPS_DATA: StrategyTip[] = [
  {
    title: '序盤（0〜200m）: 白い光と赤い光で基礎ステータスをビルド',
    phase: '序盤',
    summary: '無理に深追いせず、まずは潜水艦の基礎パラメータを底上げする。',
    details: [
      '白い光（大・小）を積極的に回収してプレイヤーLvを上げ、呼吸可能バー（最大酸素容量）を広げる。',
      '赤い光で「耐圧効率」と「推進推力」をLv.3まで優先的に上げる。',
      '200m直前にある紫の光（第1チェックポイント）に必ず接触してセーブする。'
    ],
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
  },
  {
    title: '中盤（200〜700m）: 加速する酸素減少を「耐圧効率」で抑え込む',
    phase: '中盤',
    summary: '水圧による酸素激減が始まるゾーン。遺物セットの恩恵を活用する。',
    details: [
      '深度200m以降は酸素消費が1.8倍以上に跳ね上がるため、「耐圧効率」をLv.5〜7まで集中強化する。',
      '「台所の面影」セット（酸素消費-15%）や「亡くされた玩具」セット（EXP+35%）を発動させると攻略が格段に楽になる。',
      '突進してくる中型生物にはEMPを一発当てて硬直させ、その隙にすり抜ける。',
      '700m地点の紫の光（第2チェックポイント）の解放を最優先目標にする。'
    ],
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
  },
  {
    title: '終盤（700〜1200m+）: 廃墟都市の遺物コンプリートと深淵への挑戦',
    phase: '終盤',
    summary: '海底都市遺跡の危険地帯をEMPとレーダーで制圧し、最深部の形見へ。',
    details: [
      '「EMP」と「レーダー」をLv.8以上に強化し、暗闇の敵を事前に察知＆広範囲フリーズさせる。',
      '「忘れられた歳月」セット（EMPクールタイム-20%）と組み合わせることで、ほぼ常時安全圏を維持可能。',
      '1200mセーブポイントを確保後、全ステータスLv.9〜10まで整えて深淵1400m+の「形見（ペンダント）」回収に挑む！'
    ],
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'システム',
    question: '深海で酸素が急激になくなるのはなぜですか？',
    answer: '深度が深くなるほど水圧が高まり、酸素ゲージの減少スピードが加速度的（指数関数的）に増加する仕様です。これを防ぐには、赤い光で【耐圧効率】ステータスを強化するか、酸素消費を軽減する遺物セット（台所の面影など）を発動させる必要があります。'
  },
  {
    category: '強化',
    question: 'ステータス強化（6項目）のおすすめ優先順位は？',
    answer: '【耐圧効率】（深層での酸素持ち時間UP） ＞ 【推進推力】（高速移動で探索効率UP） ＞ 【EMP】（深海の敵を足止め） ＞ 【装甲厚】（事故死防止） ＞ 【レーダー】（敵・遺物探知） ＞ 【姿勢制御】の順が最も初心者におすすめです。'
  },
  {
    category: '拠点',
    question: '潜るたびに0m（海面）からやり直しになりますか？',
    answer: 'いいえ！深海に存在する「紫の光（セーブポイント）」に一度触れておけば、潜水開始時のドック画面で初期深度（0m、200m、700m、1200m）を自由に選択してリトライできるようになります。'
  },
  {
    category: '遺物',
    question: '遺物セット効果は潜水艦が破壊されても残りますか？',
    answer: 'はい、一度入手した遺物や解放したセット効果（パッシブバフ）は恒久的に図鑑に記録され、次回以降のすべての潜水で永続的に効果を発揮します。'
  },
  {
    category: '操作',
    question: '敵に囲まれて逃げられない時の対処法は？',
    answer: '【EMP】スキルを発動してください。周囲のすべての敵を数秒間完全フリーズさせることができます。レベルを上げることで停止時間が延び、クールタイムも短縮されます。'
  }
];
