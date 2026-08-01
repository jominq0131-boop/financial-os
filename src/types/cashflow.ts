export type CashflowType = 'INCOME_ACTIVE' | 'INCOME_PASSIVE' | 'EXPENSE_FIXED' | 'EXPENSE_VARIABLE';

export type ExpenseCategory = '주거' | '식비' | '고정비' | '여가' | '투자' | '기타';

export interface CashflowItem {
  id: string;
  title: string;
  type: CashflowType;
  amount: number; // 월 기준 금액 (JPY ￥)
  category: string;
  isEssential: boolean; // 소득 중단 시 필수 지출 여부
}

export const CASHFLOW_TYPE_LABELS: Record<CashflowType, { label: string; color: string; isIncome: boolean }> = {
  INCOME_ACTIVE: { label: '근로 / 사업 소득', color: 'emerald', isIncome: true },
  INCOME_PASSIVE: { label: '배당 / 패시브 소득', color: 'cyan', isIncome: true },
  EXPENSE_FIXED: { label: '고정 필수 지출', color: 'rose', isIncome: false },
  EXPENSE_VARIABLE: { label: '변동 / 가치 지출', color: 'amber', isIncome: false },
};

export const EXPENSE_CATEGORY_COLORS: Record<string, string> = {
  주거: '#ef4444',   // Red
  식비: '#f97316',   // Orange
  고정비: '#eab308', // Yellow
  여가: '#3b82f6',   // Blue
  투자: '#10b981',   // Emerald
  기타: '#8b5cf6',   // Purple
};
