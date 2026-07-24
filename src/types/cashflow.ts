export type CashflowType = 'INCOME_ACTIVE' | 'INCOME_PASSIVE' | 'EXPENSE_FIXED' | 'EXPENSE_VARIABLE';

export interface CashflowItem {
  id: string;
  title: string;
  type: CashflowType;
  amount: number; // 월 기준 금액 (KRW)
  category: string;
  isEssential: boolean; // 소득 중단 시 필수 지출 여부
}

export const CASHFLOW_TYPE_LABELS: Record<CashflowType, { label: string; color: string; isIncome: boolean }> = {
  INCOME_ACTIVE: { label: '근로 / 사업 소득', color: 'emerald', isIncome: true },
  INCOME_PASSIVE: { label: '배당 / 패시브 소득', color: 'cyan', isIncome: true },
  EXPENSE_FIXED: { label: '고정 필수 지출', color: 'rose', isIncome: false },
  EXPENSE_VARIABLE: { label: '변동 / 가치 지출', color: 'amber', isIncome: false },
};
