import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Holding } from '@/types/holding';
import { useHistoryStore } from './useHistoryStore';

interface HoldingStore {
  holdings: Holding[];

  // Actions
  addHolding: (holding: Omit<Holding, 'id' | 'updatedAt'>) => void;
  updateHolding: (id: string, updated: Partial<Holding>) => void;
  deleteHolding: (id: string) => void;
  updateCurrentPrice: (id: string, currentPrice: number) => void;
  resetToDefault: () => void;

  // Computed
  getTotalInvestment: () => number;    // 총 매습금액 (JPY)
  getTotalEvaluation: () => number;    // 총 평가금액 (JPY)
  getTotalUnrealizedGain: () => { amount: number; rate: number }; // 총 평가손익 (금액, %)
}

const INITIAL_HOLDINGS: Holding[] = [
  {
    id: 'h-1',
    ticker: '2559.T',
    name: 'MAXIS 세계주식(ACWI) 상장투신',
    accountType: 'NISA_GROWTH',
    quantity: 120,
    avgCostPrice: 18500,
    currentPrice: 21500,
    currency: 'JPY',
    notes: '신NISA 성장투자틀 올컨트리 ETF',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'h-2',
    ticker: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    accountType: 'SPECIFIC',
    quantity: 25,
    avgCostPrice: 420,
    currentPrice: 510,
    currency: 'USD',
    exchangeRate: 155,
    notes: '특정계좌 미국 대표 인덱스 ETF',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'h-3',
    ticker: 'SCHD',
    name: 'Schwab U.S. Dividend Equity ETF',
    accountType: 'SPECIFIC',
    quantity: 150,
    avgCostPrice: 72,
    currentPrice: 82,
    currency: 'USD',
    exchangeRate: 155,
    notes: '미국 배당성장 ETF',
    updatedAt: new Date().toISOString(),
  },
];

export const useHoldingStore = create<HoldingStore>()(
  persist(
    (set, get) => ({
      holdings: INITIAL_HOLDINGS,

      addHolding: (newHolding) => {
        const item: Holding = {
          ...newHolding,
          id: `h-${Date.now()}`,
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ holdings: [item, ...state.holdings] }));
        useHistoryStore.getState().addLog({
          type: 'ASSET',
          action: 'ADD',
          title: `종목 추가: ${item.ticker} (${item.name})`,
          detail: `수량: ${item.quantity}주 | 매입가: ${item.avgCostPrice} ${item.currency}`,
        });
      },

      updateHolding: (id, updated) => {
        const target = get().holdings.find((h) => h.id === id);
        set((state) => ({
          holdings: state.holdings.map((h) =>
            h.id === id ? { ...h, ...updated, updatedAt: new Date().toISOString() } : h
          ),
        }));
        if (target) {
          useHistoryStore.getState().addLog({
            type: 'ASSET',
            action: 'UPDATE',
            title: `종목 수정: ${target.ticker}`,
            detail: `정보가 업데이트되었습니다.`,
          });
        }
      },

      deleteHolding: (id) => {
        const target = get().holdings.find((h) => h.id === id);
        set((state) => ({ holdings: state.holdings.filter((h) => h.id !== id) }));
        if (target) {
          useHistoryStore.getState().addLog({
            type: 'ASSET',
            action: 'DELETE',
            title: `종목 삭제: ${target.ticker}`,
            detail: `종목 정보가 삭제되었습니다.`,
          });
        }
      },

      updateCurrentPrice: (id, currentPrice) => {
        set((state) => ({
          holdings: state.holdings.map((h) =>
            h.id === id ? { ...h, currentPrice, updatedAt: new Date().toISOString() } : h
          ),
        }));
      },

      resetToDefault: () => set({ holdings: INITIAL_HOLDINGS }),

      getTotalInvestment: () => {
        return get().holdings.reduce((sum, h) => {
          const rate = h.currency === 'USD' ? (h.exchangeRate || 150) : 1;
          return sum + h.quantity * h.avgCostPrice * rate;
        }, 0);
      },

      getTotalEvaluation: () => {
        return get().holdings.reduce((sum, h) => {
          const rate = h.currency === 'USD' ? (h.exchangeRate || 150) : 1;
          return sum + h.quantity * h.currentPrice * rate;
        }, 0);
      },

      getTotalUnrealizedGain: () => {
        const cost = get().getTotalInvestment();
        const evalVal = get().getTotalEvaluation();
        const amount = evalVal - cost;
        const rate = cost > 0 ? Number(((amount / cost) * 100).toFixed(2)) : 0;
        return { amount, rate };
      },
    }),
    {
      name: 'financial-os-holdings',
    }
  )
);
