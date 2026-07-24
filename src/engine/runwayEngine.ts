export type RunwayHealth = 'IMMORTAL' | 'STABLE' | 'MODERATE' | 'WARNING' | 'CRITICAL';

export interface RunwayResult {
  runwayMonths: number;
  runwayYears: string;
  netBurnRate: number;
  healthLevel: RunwayHealth;
  healthLabel: string;
  color: string;
  description: string;
}

export function calculateFinancialRunway(
  liquidAssets: number,
  monthlyEssentialExpense: number,
  monthlyPassiveIncome: number = 0
): RunwayResult {
  const netBurnRate = Math.max(0, monthlyEssentialExpense - monthlyPassiveIncome);

  if (netBurnRate === 0) {
    return {
      runwayMonths: 999,
      runwayYears: '영구 (∞)',
      netBurnRate: 0,
      healthLevel: 'IMMORTAL',
      healthLabel: '불사 (Financial Immortal)',
      color: 'emerald',
      description: '주 소득이 0이 되어도 패시브 자가배당만으로 영구 생존 가능합니다.',
    };
  }

  const months = Math.floor(liquidAssets / netBurnRate);
  const yearsNum = (months / 12).toFixed(1);
  const yearsText = months >= 12 ? `${yearsNum}년 (${months}개월)` : `${months}개월`;

  if (months >= 60) { // 5년 이상
    return {
      runwayMonths: months,
      runwayYears: yearsText,
      netBurnRate,
      healthLevel: 'STABLE',
      healthLabel: '매우 안정적 (5년 이상)',
      color: 'cyan',
      description: '소득 중단 시에도 5년 이상 현재 생계를 완벽히 방어할 수 있습니다.',
    };
  }

  if (months >= 12) { // 1년 ~ 5년
    return {
      runwayMonths: months,
      runwayYears: yearsText,
      netBurnRate,
      healthLevel: 'MODERATE',
      healthLabel: '양호 (1년 이상 방어)',
      color: 'indigo',
      description: '1년 이상 안정적으로 버틸 수 있는 안전망이 확보되어 있습니다.',
    };
  }

  if (months >= 6) { // 6개월 ~ 1년
    return {
      runwayMonths: months,
      runwayYears: yearsText,
      netBurnRate,
      healthLevel: 'WARNING',
      healthLabel: '주의 (6개월 내외)',
      color: 'amber',
      description: '비상금 유동 자산을 조금 더 확충할 필요가 있습니다.',
    };
  }

  return {
    runwayMonths: months,
    runwayYears: yearsText,
    netBurnRate,
    healthLevel: 'CRITICAL',
    healthLabel: '위험 (6개월 미만)',
    color: 'rose',
    description: '소득 중단 시 생존 기간이 6개월 미만입니다. 유동성 확보가 시급합니다.',
  };
}
