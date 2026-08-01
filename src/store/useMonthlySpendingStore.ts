import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MonthlySpendingRecord {
  id: string;
  month: string; // "2026-07"
  주거: number;
  식비: number;
  고정비: number;
  여가: number;
  투자: number;
  기타: number;
}

export const SPENDING_CATEGORIES = ['주거', '식비', '고정비', '여가', '투자', '기타'] as const;
export type SpendingCategory = typeof SPENDING_CATEGORIES[number];

export const CATEGORY_META: Record<SpendingCategory, { emoji: string; color: string }> = {
  주거: { emoji: '🏠', color: '#3b82f6' },
  식비: { emoji: '🍚', color: '#f59e0b' },
  고정비: { emoji: '⚡', color: '#8b5cf6' },
  여가: { emoji: '🎮', color: '#ec4899' },
  투자: { emoji: '📈', color: '#22c55e' },
  기타: { emoji: '📦', color: '#71717a' },
};

export const TEMPERATURE_THRESHOLDS = {
  DANGER: 30,   // +30% 초과 → 🔴 위험
  WARNING: 10,  // +10~30%  → 🔥 주의
  SAVING: -10,  // -10% 이하 → 💚 절약
  // -10~+10%  → ✅ 안정
};

interface MonthlySpendingStore {
  records: MonthlySpendingRecord[];
  upsertRecord: (month: string, categories: Omit<MonthlySpendingRecord, 'id' | 'month'>) => void;
  deleteRecord: (month: string) => void;
  getRecord: (month: string) => MonthlySpendingRecord | undefined;
  getTwoMonths: () => { current: MonthlySpendingRecord | undefined; prev: MonthlySpendingRecord | undefined };
}

export const useMonthlySpendingStore = create<MonthlySpendingStore>()(
  persist(
    (set, get) => ({
      records: [],

      upsertRecord: (month, categories) => {
        set((state) => {
          const existing = state.records.find((r) => r.month === month);
          if (existing) {
            return {
              records: state.records.map((r) =>
                r.month === month ? { ...r, ...categories } : r
              ),
            };
          }
          return {
            records: [
              ...state.records,
              { id: `spending-${month}`, month, ...categories },
            ].sort((a, b) => a.month.localeCompare(b.month)),
          };
        });
      },

      deleteRecord: (month) => {
        set((state) => ({
          records: state.records.filter((r) => r.month !== month),
        }));
      },

      getRecord: (month) => get().records.find((r) => r.month === month),

      getTwoMonths: () => {
        const records = get().records;
        if (records.length === 0) return { current: undefined, prev: undefined };

        // Sort descending to get latest
        const sorted = [...records].sort((a, b) => b.month.localeCompare(a.month));
        const current = sorted[0];
        const prev = sorted[1];
        return { current, prev };
      },
    }),
    { name: 'financial-os-monthly-spending' }
  )
);
