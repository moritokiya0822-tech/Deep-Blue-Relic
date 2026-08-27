export interface LightOrbInfo {
  id: 'red' | 'yellow' | 'white' | 'purple';
  name: string;
  jpName: string;
  colorClass: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  iconName: string;
  shortDesc: string;
  detailedEffect: string;
  beginnerPriority: 'S' | 'A' | 'B';
  tips: string;
}

export interface SubmarineStat {
  id: 'armor' | 'thrust' | 'control' | 'pressure' | 'emp' | 'radar';
  name: string;
  jpName: string;
  maxLevel: number;
  description: string;
  gameplayRole: string;
  scalingFormula: (level: number) => { value: string; num: number; unit: string };
  recommendedPriority: number; // 1 (highest) to 6
  icon: string;
}

export interface DepthZone {
  depthRange: string;
  startMeters: number;
  endMeters: number;
  title: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  checkpointDepth?: number;
  oxygenDrainMultiplier: number;
  hazards: string[];
  recommendedStats: string;
  description: string;
}

export interface RelicItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  memoryStory: string;
  depthFound: string;
}

export interface RelicSet {
  id: string;
  title: string;
  description: string;
  buffTitle: string;
  buffDetail: string;
  relicIds: string[];
  relics: RelicItem[];
  color: string;
}

export interface StrategyTip {
  title: string;
  phase: '序盤' | '中盤' | '終盤' | '共通';
  summary: string;
  details: string[];
  badgeColor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
