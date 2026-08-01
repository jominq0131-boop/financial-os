export type AssetCategory = 'CASH' | 'STOCK' | 'REAL_ESTATE' | 'PENSION' | 'NISA' | 'IDECO' | 'OTHERS';
export type BucketTier = 'TIER_1_SAFETY' | 'TIER_2_GROWTH' | 'TIER_3_MISSION';
export type Currency = 'JPY' | 'USD' | 'EUR';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  tier: BucketTier;
  amount: number;        // JPY 엔화 환산 금액
  expectedYield: number; // 연간 기대 수익률 (%)
  currency: Currency;
  notes?: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<AssetCategory, { label: string; color: string; description: string }> = {
  CASH: {
    label: '현금 / 보통예금',
    color: 'emerald',
    description: '입출금이 자유롭고 원금이 보장되는 예금 및 입출금 통장 자산',
  },
  STOCK: {
    label: '주식 / ETF',
    color: 'cyan',
    description: '국내외 상장 주식, 배당 ETF, 공모펀드 등 우상향 기대 자산',
  },
  REAL_ESTATE: {
    label: '부동산 / 보증금',
    color: 'amber',
    description: '실물 부동산, 임대 보증금, 敷金(시쿠킨) 등 주거 자산',
  },
  PENSION: {
    label: '공적/사적 연금',
    color: 'indigo',
    description: '국민연금, 후생연금 및 기타 연금 자산',
  },
  NISA: {
    label: '신NISA (비과세 적립)',
    color: 'purple',
    description: '일본의 소액투자 비과세 제도 (성장투자틀/적립틀 합산 연간 360만엔 비과세)',
  },
  IDECO: {
    label: 'iDeCo (개인형 확정출여 연금)',
    color: 'blue',
    description: '매월 납입금 전액 소득공제 혜택이 있는 일본의 개인형 퇴직연금 (60세 인출)',
  },
  OTHERS: {
    label: '기타 자산',
    color: 'zinc',
    description: '귀금속, 암호화폐, 회원권 등 기타 금융 자산',
  },
};

export const TIER_LABELS: Record<BucketTier, { label: string; description: string }> = {
  TIER_1_SAFETY: {
    label: 'Tier 1：안전망 (Safety)',
    description: '최소 6~12개월 생활비를 보장하는 비상금 및 현금성 자산 버킷',
  },
  TIER_2_GROWTH: {
    label: 'Tier 2：성장 (Growth)',
    description: '인플레이션을 방어하고 자산을 증식시키는 장기 우상향 주식/연금 버킷',
  },
  TIER_3_MISSION: {
    label: 'Tier 3：미션/꿈 (Mission)',
    description: '주택 마련, 안식년, 사업 등 장기 목표에 투입될 자금 버킷',
  },
};
