import { Asset } from '@/types/asset';
import { calculateFinancialRunway, RunwayResult } from './runwayEngine';

export type StressScenario = 'NORMAL' | 'MARKET_CRASH' | 'INFLATION_SPIKE' | 'BLACK_SWAN';

export interface StressTestResult {
  scenario: StressScenario;
  scenarioTitle: string;
  impactDescription: string;
  adjustedNetWorth: number;
  netWorthLoss: number;
  adjustedRunway: RunwayResult;
  riskRating: 'SAFE' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
}

export function runStressTestScenario(
  scenario: StressScenario,
  assets: Asset[],
  essentialMonthlyExpense: number,
  passiveMonthlyIncome: number
): StressTestResult {
  const currentNetWorth = assets.reduce((sum, a) => sum + a.amount, 0);

  if (scenario === 'NORMAL') {
    const liquidAssets = assets
      .filter((a) => a.tier === 'TIER_1_SAFETY' || a.category === 'CASH')
      .reduce((sum, a) => sum + a.amount, 0);
    const runway = calculateFinancialRunway(liquidAssets, essentialMonthlyExpense, passiveMonthlyIncome);

    return {
      scenario: 'NORMAL',
      scenarioTitle: '정상 상태 (Base Case)',
      impactDescription: '현재 설정된 기대수익률과 정상 물가상승률 유지.',
      adjustedNetWorth: currentNetWorth,
      netWorthLoss: 0,
      adjustedRunway: runway,
      riskRating: 'SAFE',
    };
  }

  if (scenario === 'MARKET_CRASH') {
    // 주식/투자 자산 -30% 폭락
    const adjustedAssets = assets.map((a) => {
      if (a.category === 'STOCK' || a.tier === 'TIER_2_GROWTH') {
        return a.amount * 0.7; // -30%
      }
      return a.amount;
    });

    const adjustedNetWorth = adjustedAssets.reduce((sum, val) => sum + val, 0);
    const loss = currentNetWorth - adjustedNetWorth;

    const liquidAssets = assets
      .filter((a) => a.tier === 'TIER_1_SAFETY' || a.category === 'CASH')
      .reduce((sum, a) => sum + a.amount, 0);

    const runway = calculateFinancialRunway(liquidAssets, essentialMonthlyExpense, passiveMonthlyIncome * 0.7);

    return {
      scenario: 'MARKET_CRASH',
      scenarioTitle: '시장 폭락 (-30% Crash)',
      impactDescription: '주식 및 성장 자산 가치가 30% 일시 하락한 위기 상황.',
      adjustedNetWorth: Math.round(adjustedNetWorth),
      netWorthLoss: Math.round(loss),
      adjustedRunway: runway,
      riskRating: 'MODERATE',
    };
  }

  if (scenario === 'INFLATION_SPIKE') {
    // 필수 지출 +25% 급등 및 배당 실질 가치 감소
    const inflatedExpense = essentialMonthlyExpense * 1.25;
    const liquidAssets = assets
      .filter((a) => a.tier === 'TIER_1_SAFETY' || a.category === 'CASH')
      .reduce((sum, a) => sum + a.amount, 0);

    const runway = calculateFinancialRunway(liquidAssets, inflatedExpense, passiveMonthlyIncome);

    return {
      scenario: 'INFLATION_SPIKE',
      scenarioTitle: '고물가 충격 (Inflation Spike)',
      impactDescription: '물가 및 필수 생계비가 25% 급등한 상황.',
      adjustedNetWorth: currentNetWorth,
      netWorthLoss: 0,
      adjustedRunway: runway,
      riskRating: 'SEVERE',
    };
  }

  // BLACK_SWAN: 소득 중단 + 시장 -30% 폭락 + 지출 20% 증가
  const crashedAssets = assets.map((a) => {
    if (a.category === 'STOCK' || a.tier === 'TIER_2_GROWTH') {
      return a.amount * 0.7;
    }
    return a.amount;
  });

  const adjustedNetWorth = crashedAssets.reduce((sum, val) => sum + val, 0);
  const loss = currentNetWorth - adjustedNetWorth;
  const inflatedExpense = essentialMonthlyExpense * 1.2;

  const liquidAssets = assets
    .filter((a) => a.tier === 'TIER_1_SAFETY' || a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);

  const runway = calculateFinancialRunway(liquidAssets, inflatedExpense, 0); // 배당/소득 0 처리

  return {
    scenario: 'BLACK_SWAN',
    scenarioTitle: '복합 위기 (Black Swan)',
    impactDescription: '주 소득 중단 + 자산 -30% 폭락 + 물가 상승 복합 위기.',
    adjustedNetWorth: Math.round(adjustedNetWorth),
    netWorthLoss: Math.round(loss),
    adjustedRunway: runway,
    riskRating: 'CRITICAL',
  };
}
