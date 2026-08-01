export interface Holding {
  id: string;
  ticker: string;          // 예: 'VOO', 'VT', 'SCHD', '7203.T'
  name: string;            // 예: Vanguard S&P 500 ETF
  accountType: 'NISA_GROWTH' | 'NISA_TSUMITATE' | 'SPECIFIC' | 'GENERAL' | 'IDECO'; // 계좌 유형
  quantity: number;        // 보유 수량 (주)
  avgCostPrice: number;    // 평균 매입가 (엔/달러 단위 입력 가능 또는 엔화 환산)
  currentPrice: number;    // 현재가 (수기 업데이트)
  currency: 'JPY' | 'USD'; // 원화/엔화/달러
  exchangeRate?: number;   // USD일 경우 JPY 적용 환율 (기본값 150 등)
  notes?: string;
  updatedAt: string;
}

export const ACCOUNT_TYPE_LABELS: Record<Holding['accountType'], { label: string; badgeColor: string }> = {
  NISA_GROWTH: { label: '신NISA 성장투자', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  NISA_TSUMITATE: { label: '신NISA 적립투자', badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  SPECIFIC: { label: '특정계좌(과세)', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  GENERAL: { label: '일반계좌', badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
  IDECO: { label: 'iDeCo', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
};
