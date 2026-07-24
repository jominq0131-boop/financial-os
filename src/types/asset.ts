export type AssetCategory = 'CASH' | 'STOCK' | 'REAL_ESTATE' | 'PENSION' | 'OTHERS';
export type BucketTier = 'TIER_1_SAFETY' | 'TIER_2_GROWTH' | 'TIER_3_MISSION';
export type Currency = 'KRW' | 'USD' | 'JPY';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  tier: BucketTier;
  amount: number; // KRW 원화 환산 기준 기본값
  expectedYield: number; // 연간 기대 수익률 (%)
  currency: Currency;
  notes?: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<AssetCategory, { label: string; color: string }> = {
  CASH: { label: '현금 / 예적금', color: 'emerald' },
  STOCK: { label: '주식 / ETF', color: 'cyan' },
  REAL_ESTATE: { label: '부동산 / 실물', color: 'amber' },
  PENSION: { label: '연금 / IRP', color: 'indigo' },
  OTHERS: { label: '대안 자산 / 기타', color: 'purple' },
};

export const TIER_LABELS: Record<BucketTier, string> = {
  TIER_1_SAFETY: 'Tier 1: 안전망 (Safety)',
  TIER_2_GROWTH: 'Tier 2: 성장 (Growth)',
  TIER_3_MISSION: 'Tier 3: 미션/꿈 (Mission)',
};
