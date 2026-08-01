export type CashflowType =
  | 'INCOME_ACTIVE'
  | 'INCOME_PASSIVE'
  | 'EXPENSE_FIXED'
  | 'EXPENSE_VARIABLE'
  | 'SAVINGS'
  | 'INVESTMENT';

export type ExpenseCategory = '주거' | '식비' | '고정비' | '여가' | '교통' | '저축' | '투자' | '기타';

export interface CashflowItem {
  id: string;
  title: string;
  type: CashflowType;
  amount: number; // 월 기준 금액 (JPY ￥)
  category: string;
  isEssential: boolean; // 소득 중단 시 필수 지출 여부
}

export const CASHFLOW_TYPE_LABELS: Record<CashflowType, { label: string; color: string; isIncome: boolean; isCapital: boolean }> = {
  INCOME_ACTIVE: { label: '근로 / 사업 소득', color: 'emerald', isIncome: true, isCapital: false },
  INCOME_PASSIVE: { label: '배당 / 패시브 소득', color: 'cyan', isIncome: true, isCapital: false },
  EXPENSE_FIXED: { label: '고정 필수 소비', color: 'rose', isIncome: false, isCapital: false },
  EXPENSE_VARIABLE: { label: '변동 / 여가 소비', color: 'amber', isIncome: false, isCapital: false },
  SAVINGS: { label: '안전 자산 저축', color: 'indigo', isIncome: false, isCapital: true },
  INVESTMENT: { label: '성장 자산 투자', color: 'purple', isIncome: false, isCapital: true },
};

export const EXPENSE_CATEGORY_COLORS: Record<string, string> = {
  주거: '#ef4444',   // Red
  식비: '#f97316',   // Orange
  고정비: '#eab308', // Yellow
  여가: '#ec4899',   // Pink
  교통: '#06b6d4',   // Cyan
  저축: '#6366f1',   // Indigo
  투자: '#a855f7',   // Purple
  기타: '#71717a',   // Zinc
};
