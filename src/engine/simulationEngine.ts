import { LifeEvent } from '@/types/timeline';

export interface SimulationYearData {
  age: number;
  year: number;
  netWorth: number; // 만원 또는 원 단위
  eventTitle?: string;
  eventAmount?: number;
}

export function run50YearSimulation(
  currentAge: number,
  initialNetWorth: number,
  annualSurplus: number,
  expectedYieldPercent: number = 5.5,
  inflationRatePercent: number = 2.0,
  events: LifeEvent[] = []
): SimulationYearData[] {
  const currentYear = new Date().getFullYear();
  const realYieldRate = (expectedYieldPercent - inflationRatePercent) / 100;

  const data: SimulationYearData[] = [];
  let runningNetWorth = initialNetWorth;

  for (let i = 0; i <= 50; i++) {
    const age = currentAge + i;
    const year = currentYear + i;

    // 해당 연도에 발생하는 생애 미션 이벤트 검색
    const matchedEvents = events.filter((e) => e.targetAge === age);
    let totalEventExpenditure = 0;
    let eventTitles = '';

    if (matchedEvents.length > 0) {
      totalEventExpenditure = matchedEvents.reduce((sum, e) => sum + e.requiredAmount, 0);
      eventTitles = matchedEvents.map((e) => e.title).join(', ');
    }

    // 자산 성장 연산
    if (i === 0) {
      // 0년차 (현재)
      data.push({
        age,
        year,
        netWorth: Math.round(runningNetWorth),
        eventTitle: eventTitles || undefined,
        eventAmount: totalEventExpenditure || undefined,
      });
    } else {
      // (이전 자산 + 연간 잉여금 - 이벤트 지출) * (1 + 실질 수익률)
      runningNetWorth = (runningNetWorth + annualSurplus - totalEventExpenditure) * (1 + realYieldRate);
      runningNetWorth = Math.max(0, runningNetWorth); // 0 미만 마이너스 방지

      data.push({
        age,
        year,
        netWorth: Math.round(runningNetWorth),
        eventTitle: eventTitles || undefined,
        eventAmount: totalEventExpenditure || undefined,
      });
    }
  }

  return data;
}
