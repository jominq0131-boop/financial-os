import { create } from 'zustand';
import { Asset, AssetCategory } from '@/types/asset';

interface TargetRatios {
  TIER_1_SAFETY: number;
  TIER_2_GROWTH: number;
  TIER_3_MISSION: number;
}

interface AssetStore {
  assets: Asset[];
  isPrivate: boolean;
  targetRatios: TargetRatios;
  
  // Actions
  togglePrivacy: () => void;
  addAsset: (asset: Omit<Asset, 'id' | 'updatedAt'>) => void;
  deleteAsset: (id: string) => void;
  updateAsset: (id: string, updated: Partial<Asset>) => void;
  setTargetRatio: (tier: keyof TargetRatios, ratio: number) => void;
  
  // Computed
  getTotalNetWorth: () => number;
  getAssetsByCategory: (category: AssetCategory) => Asset[];
  getMonthlyDividend: () => number;
  getTierAllocation: () => { tier: keyof TargetRatios; currentAmount: number; currentRatio: number; targetRatio: number }[];
}

const INITIAL_ASSETS: Asset[] = [
  {
    id: '1',
    name: '비상금 통장 (CMA)',
    category: 'CASH',
    tier: 'TIER_1_SAFETY',
    amount: 45000000,
    expectedYield: 3.2,
    currency: 'KRW',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: '미국 배당 성장 ETF (SCHD)',
    category: 'STOCK',
    tier: 'TIER_2_GROWTH',
    amount: 125000000,
    expectedYield: 4.5,
    currency: 'KRW',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: '글로벌 테크 인덱스 (S&P500 / QQQ)',
    category: 'STOCK',
    tier: 'TIER_2_GROWTH',
    amount: 98000000,
    expectedYield: 8.0,
    currency: 'KRW',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: '개인형 IRP 연금저축',
    category: 'PENSION',
    tier: 'TIER_2_GROWTH',
    amount: 34800000,
    expectedYield: 5.0,
    currency: 'KRW',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: '실물 보증금 및 실물 자산',
    category: 'REAL_ESTATE',
    tier: 'TIER_1_SAFETY',
    amount: 40000000,
    expectedYield: 0.0,
    currency: 'KRW',
    updatedAt: new Date().toISOString(),
  },
];

export const useAssetStore = create<AssetStore>((set, get) => ({
  assets: INITIAL_ASSETS,
  isPrivate: false,
  targetRatios: {
    TIER_1_SAFETY: 25,
    TIER_2_GROWTH: 60,
    TIER_3_MISSION: 15,
  },

  togglePrivacy: () => set((state) => ({ isPrivate: !state.isPrivate })),

  addAsset: (newAsset) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ assets: [asset, ...state.assets] }));
  },

  deleteAsset: (id) => {
    set((state) => ({ assets: state.assets.filter((a) => a.id !== id) }));
  },

  updateAsset: (id, updated) => {
    set((state) => ({
      assets: state.assets.map((a) =>
        a.id === id ? { ...a, ...updated, updatedAt: new Date().toISOString() } : a
      ),
    }));
  },

  setTargetRatio: (tier, ratio) => {
    set((state) => ({
      targetRatios: {
        ...state.targetRatios,
        [tier]: Math.max(0, Math.min(100, ratio)),
      },
    }));
  },

  getTotalNetWorth: () => {
    return get().assets.reduce((sum, a) => sum + a.amount, 0);
  },

  getAssetsByCategory: (category) => {
    return get().assets.filter((a) => a.category === category);
  },

  getMonthlyDividend: () => {
    const total = get().getTotalNetWorth();
    return Math.floor((total * 0.04) / 12);
  },

  getTierAllocation: () => {
    const total = get().getTotalNetWorth();
    const assets = get().assets;
    const targetRatios = get().targetRatios;

    const tiers: (keyof TargetRatios)[] = ['TIER_1_SAFETY', 'TIER_2_GROWTH', 'TIER_3_MISSION'];

    return tiers.map((tier) => {
      const currentAmount = assets
        .filter((a) => a.tier === tier)
        .reduce((sum, a) => sum + a.amount, 0);
      const currentRatio = total > 0 ? Number(((currentAmount / total) * 100).toFixed(1)) : 0;
      return {
        tier,
        currentAmount,
        currentRatio,
        targetRatio: targetRatios[tier],
      };
    });
  },
}));
