import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CashflowItem } from '@/types/cashflow';
import { useHistoryStore } from './useHistoryStore';

interface CashflowStore {
  items: CashflowItem[];
  addItem: (item: Omit<CashflowItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getEssentialExpense: () => number;
  getNetSurplus: () => number;
}

const INITIAL_CASHFLOWS: CashflowItem[] = [
  {
    id: 'cf-1',
    title: '월급 수입 (실수령액)',
    type: 'INCOME_ACTIVE',
    amount: 350000,      // 월 35만엔
    category: '급여',
    isEssential: true,
  },
  {
    id: 'cf-2',
    title: '배당금 수입 (신NISA + 특정계좌)',
    type: 'INCOME_PASSIVE',
    amount: 25000,       // 월 2.5만엔
    category: '배당',
    isEssential: true,
  },
  {
    id: 'cf-3',
    title: '월세 · 공과금 · 통신비',
    type: 'EXPENSE_FIXED',
    amount: 85000,       // 월 8.5만엔
    category: '주거',
    isEssential: true,
  },
  {
    id: 'cf-4',
    title: '식비 · 생활용품 · 교통비',
    type: 'EXPENSE_FIXED',
    amount: 80000,       // 월 8만엔
    category: '생활',
    isEssential: true,
  },
  {
    id: 'cf-5',
    title: '신NISA 적립 · iDeCo 납입',
    type: 'EXPENSE_FIXED',
    amount: 50000,       // 월 5만엔 (투투자 적립)
    category: '투자',
    isEssential: true,
  },
  {
    id: 'cf-6',
    title: '자기계발 · 취미 · 여가',
    type: 'EXPENSE_VARIABLE',
    amount: 40000,       // 월 4만엔
    category: '가치지출',
    isEssential: false,
  },
];

export const useCashflowStore = create<CashflowStore>()(
  persist(
    (set, get) => ({
      items: INITIAL_CASHFLOWS,

      addItem: (newItem) => {
        const item: CashflowItem = { ...newItem, id: `cf-${Date.now()}` };
        set((state) => ({ items: [item, ...state.items] }));
        useHistoryStore.getState().addLog({
          type: 'CASHFLOW',
          action: 'ADD',
          title: `현금흐름 항목 추가: ${item.title}`,
          detail: `월 ￥${item.amount.toLocaleString()} | 구분: ${item.type}`,
        });
      },

      deleteItem: (id) => {
        const target = get().items.find((i) => i.id === id);
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        if (target) {
          useHistoryStore.getState().addLog({
            type: 'CASHFLOW',
            action: 'DELETE',
            title: `현금흐름 삭제: ${target.title}`,
            detail: `삭제된 항목: 월 ￥${target.amount.toLocaleString()}`,
          });
        }
      },

      getTotalIncome: () =>
        get().items
          .filter((i) => i.type === 'INCOME_ACTIVE' || i.type === 'INCOME_PASSIVE')
          .reduce((sum, i) => sum + i.amount, 0),

      getTotalExpense: () =>
        get().items
          .filter((i) => i.type === 'EXPENSE_FIXED' || i.type === 'EXPENSE_VARIABLE')
          .reduce((sum, i) => sum + i.amount, 0),

      getEssentialExpense: () =>
        get().items
          .filter(
            (i) =>
              (i.type === 'EXPENSE_FIXED' || i.type === 'EXPENSE_VARIABLE') &&
              i.isEssential
          )
          .reduce((sum, i) => sum + i.amount, 0),

      getNetSurplus: () =>
        get().getTotalIncome() - get().getTotalExpense(),
    }),
    {
      name: 'financial-os-cashflow',
    }
  )
);
