import { create } from 'zustand';
import { CashflowItem } from '@/types/cashflow';

interface CashflowStore {
  items: CashflowItem[];
  
  // Actions
  addItem: (item: Omit<CashflowItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  
  // Computed
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getEssentialExpense: () => number;
  getNetSurplus: () => number;
}

const INITIAL_CASHFLOWS: CashflowItem[] = [
  {
    id: 'cf-1',
    title: '주 소득 (월급 / 사업)',
    type: 'INCOME_ACTIVE',
    amount: 4500000,
    category: '근로',
    isEssential: true,
  },
  {
    id: 'cf-2',
    title: '금융 배당 & 이자 수입',
    type: 'INCOME_PASSIVE',
    amount: 350000,
    category: '배당',
    isEssential: true,
  },
  {
    id: 'cf-3',
    title: '주거비 및 공과금',
    type: 'EXPENSE_FIXED',
    amount: 850000,
    category: '주거',
    isEssential: true,
  },
  {
    id: 'cf-[4]',
    title: '기본 식비 및 생활비',
    type: 'EXPENSE_FIXED',
    amount: 900000,
    category: '생활',
    isEssential: true,
  },
  {
    id: 'cf-5',
    title: '자기개발 & 문화/여가',
    type: 'EXPENSE_VARIABLE',
    amount: 600000,
    category: '가치',
    isEssential: false,
  },
];

export const useCashflowStore = create<CashflowStore>((set, get) => ({
  items: INITIAL_CASHFLOWS,

  addItem: (newItem) => {
    const item: CashflowItem = {
      ...newItem,
      id: `cf-${Date.now()}`,
    };
    set((state) => ({ items: [item, ...state.items] }));
  },

  deleteItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  getTotalIncome: () => {
    return get().items
      .filter((i) => i.type === 'INCOME_ACTIVE' || i.type === 'INCOME_PASSIVE')
      .reduce((sum, i) => sum + i.amount, 0);
  },

  getTotalExpense: () => {
    return get().items
      .filter((i) => i.type === 'EXPENSE_FIXED' || i.type === 'EXPENSE_VARIABLE')
      .reduce((sum, i) => sum + i.amount, 0);
  },

  getEssentialExpense: () => {
    return get().items
      .filter((i) => (i.type === 'EXPENSE_FIXED' || i.type === 'EXPENSE_VARIABLE') && i.isEssential)
      .reduce((sum, i) => sum + i.amount, 0);
  },

  getNetSurplus: () => {
    return get().getTotalIncome() - get().getTotalExpense();
  },
}));
