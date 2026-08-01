import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Asset, AssetCategory } from '@/types/asset';
import { useHistoryStore } from './useHistoryStore';

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
  resetToDefault: () => void;

  // Computed
  getTotalNetWorth: () => number;
  getAssetsByCategory: (category: AssetCategory) => Asset[];
  getMonthlyDividend: () => number;
  getNisaTotal: () => number;
  getTierAllocation: () => {
    tier: keyof TargetRatios;
    currentAmount: number;
    currentRatio: number;
    targetRatio: number;
  }[];
}

const INITIAL_ASSETS: Asset[] = [
  {
    id: '1',
    name: '비상금 예금 (일본 고금리 인터넷은행)',
    category: 'CASH',
    tier: 'TIER_1_SAFETY',
    amount: 3000000,        // 300만 엔
    expectedYield: 0.2,
    currency: 'JPY',
    notes: 'SBI / 라쿠텐 인터넷은행 고금리 우대 계좌',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: '신NISA 성장투자형 (올컨트리 / S&P500)',
    category: 'NISA',
    tier: 'TIER_2_GROWTH',
    amount: 2950000,        // 295만 엔
    expectedYield: 7.0,
    currency: 'JPY',
    notes: '신NISA 성장투자형 (연간 한도 360만 엔 중 295만 엔 불입)',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: '특정계좌 미국주식 ETF (VTI / SCHD)',
    category: 'STOCK',
    tier: 'TIER_2_GROWTH',
    amount: 6500000,        // 650만 엔
    expectedYield: 6.5,
    currency: 'JPY',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'iDeCo 개인형 퇴직연금 (인덱스 펀드)',
    category: 'IDECO',
    tier: 'TIER_2_GROWTH',
    amount: 1800000,        // 180만 엔
    expectedYield: 5.5,
    currency: 'JPY',
    notes: '60세까지 인출 불가 (전액 소득공제 혜택)',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: '임대주택 보증금 (시쿠킨/보증금)',
    category: 'REAL_ESTATE',
    tier: 'TIER_1_SAFETY',
    amount: 600000,         // 60만 엔
    expectedYield: 0.0,
    currency: 'JPY',
    updatedAt: new Date().toISOString(),
  },
];

export const useAssetStore = create<AssetStore>()(
  persist(
    (set, get) => ({
      assets: INITIAL_ASSETS,
      isPrivate: false,
      targetRatios: {
        TIER_1_SAFETY: 20,
        TIER_2_GROWTH: 65,
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
        useHistoryStore.getState().addLog({
          type: 'ASSET',
          action: 'ADD',
          title: `신규 자산 추가: ${asset.name}`,
          detail: `금액: ￥${asset.amount.toLocaleString()} (엔) | 카테고리: ${asset.category}`,
        });
      },

      deleteAsset: (id) => {
        const target = get().assets.find((a) => a.id === id);
        set((state) => ({ assets: state.assets.filter((a) => a.id !== id) }));
        if (target) {
          useHistoryStore.getState().addLog({
            type: 'ASSET',
            action: 'DELETE',
            title: `자산 삭제: ${target.name}`,
            detail: `삭제된 자산 평가금: ￥${target.amount.toLocaleString()} (엔)`,
          });
        }
      },

      updateAsset: (id, updated) => {
        const target = get().assets.find((a) => a.id === id);
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === id ? { ...a, ...updated, updatedAt: new Date().toISOString() } : a
          ),
        }));
        if (target) {
          useHistoryStore.getState().addLog({
            type: 'ASSET',
            action: 'UPDATE',
            title: `자산 수정: ${updated.name || target.name}`,
            detail: updated.amount !== undefined 
              ? `금액 변경: ￥${target.amount.toLocaleString()} ➔ ￥${updated.amount.toLocaleString()} (엔)`
              : `자산 정보 업데이트`,
          });
        }
      },

      setTargetRatio: (tier, ratio) =>
        set((state) => ({
          targetRatios: {
            ...state.targetRatios,
            [tier]: Math.max(0, Math.min(100, ratio)),
          },
        })),

      resetToDefault: () => {
        set({ assets: INITIAL_ASSETS });
        useHistoryStore.getState().addLog({
          type: 'ASSET',
          action: 'RESET',
          title: '자산 데이터 초기화',
          detail: '기본 샘플 자산 데이터로 복원되었습니다.',
        });
      },

      getTotalNetWorth: () =>
        get().assets.reduce((sum, a) => sum + a.amount, 0),

      getAssetsByCategory: (category) =>
        get().assets.filter((a) => a.category === category),

      getMonthlyDividend: () => {
        const total = get().getTotalNetWorth();
        return Math.floor((total * 0.04) / 12);
      },

      getNisaTotal: () => {
        return get()
          .assets.filter((a) => a.category === 'NISA')
          .reduce((sum, a) => sum + a.amount, 0);
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
          const currentRatio = total > 0
            ? Number(((currentAmount / total) * 100).toFixed(1))
            : 0;
          return { tier, currentAmount, currentRatio, targetRatio: targetRatios[tier] };
        });
      },
    }),
    {
      name: 'financial-os-assets',
    }
  )
);
