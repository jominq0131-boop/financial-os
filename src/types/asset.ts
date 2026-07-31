export type AssetCategory = 'CASH' | 'STOCK' | 'REAL_ESTATE' | 'PENSION' | 'NISA' | 'IDECO' | 'OTHERS';
export type BucketTier = 'TIER_1_SAFETY' | 'TIER_2_GROWTH' | 'TIER_3_MISSION';
export type Currency = 'JPY' | 'USD' | 'EUR';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  tier: BucketTier;
  amount: number;        // JPY 円換算
  expectedYield: number; // 年間期待収益率 (%)
  currency: Currency;
  notes?: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<AssetCategory, { label: string; color: string }> = {
  CASH:        { label: '現金 / 普通預金', color: 'emerald' },
  STOCK:       { label: '株式 / ETF',      color: 'cyan' },
  REAL_ESTATE: { label: '不動産 / 実物',   color: 'amber' },
  PENSION:     { label: '年金 / iDeCo',    color: 'indigo' },
  NISA:        { label: 'NISA (新NISA)',   color: 'purple' },
  IDECO:       { label: 'iDeCo',           color: 'blue' },
  OTHERS:      { label: 'その他',           color: 'zinc' },
};

export const TIER_LABELS: Record<BucketTier, string> = {
  TIER_1_SAFETY:  'Tier 1：安全網 (Safety)',
  TIER_2_GROWTH:  'Tier 2：成長 (Growth)',
  TIER_3_MISSION: 'Tier 3：夢・ミッション (Mission)',
};
