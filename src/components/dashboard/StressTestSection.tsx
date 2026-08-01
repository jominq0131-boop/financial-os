'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { runStressTestScenario, StressScenario } from '@/engine/stressTestEngine';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { ShieldAlert, AlertTriangle, Zap, CheckCircle } from 'lucide-react';

export default function StressTestSection() {
  const { assets, isPrivate } = useAssetStore();
  const { getEssentialExpense, items } = useCashflowStore();

  const [activeScenario, setActiveScenario] = useState<StressScenario>('NORMAL');

  const essentialExpense = getEssentialExpense();
  const passiveIncome = items
    .filter((i) => i.type === 'INCOME_PASSIVE')
    .reduce((sum, i) => sum + i.amount, 0);

  const result = runStressTestScenario(activeScenario, assets, essentialExpense, passiveIncome);

  const formatVal = (val: number) => {
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(val);
  };

  const getRiskBadge = (rating: string) => {
    switch (rating) {
      case 'SAFE':
        return { label: '안전 (Safe)', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'MODERATE':
        return { label: '주의 (Moderate Impact)', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' };
      case 'SEVERE':
        return { label: '충격 (Severe Impact)', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'CRITICAL':
        return { label: '위험 (Critical Threat)', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
      default:
        return { label: '보통', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  const badge = getRiskBadge(result.riskRating);

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            위기 대응 스트레스 테스트 (Stress Test Simulator)
            <Tooltip content="시장 주식 -30% 폭락, 인플레이션 급등(+25%), 소득 중단 등 위기 상황 발생 시 자산 손실 충격액 및 생존 기간(Runway) 변화를 조율하는 시뮬레이터입니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            시장 폭락(-30%), 인플레이션 급등, 복합 위기 시 내 재정 방어력 시뮬레이션 (엔화 ￥ 기준)
          </p>
        </div>
      </div>

      {/* Scenario Select Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveScenario('NORMAL')}
          className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeScenario === 'NORMAL'
              ? 'bg-zinc-800 border-emerald-500/80 text-white'
              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">Base Case</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-white">정상 상태</span>
        </button>

        <button
          onClick={() => setActiveScenario('MARKET_CRASH')}
          className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeScenario === 'MARKET_CRASH'
              ? 'bg-zinc-800 border-cyan-500/80 text-white'
              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">Market Crash</span>
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold text-white">주식 -30% 폭락</span>
        </button>

        <button
          onClick={() => setActiveScenario('INFLATION_SPIKE')}
          className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeScenario === 'INFLATION_SPIKE'
              ? 'bg-zinc-800 border-amber-500/80 text-white'
              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">Inflation Spike</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-sm font-bold text-white">고물가 +25% 급등</span>
        </button>

        <button
          onClick={() => setActiveScenario('BLACK_SWAN')}
          className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeScenario === 'BLACK_SWAN'
              ? 'bg-zinc-800 border-rose-500/80 text-white'
              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">Black Swan</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-sm font-bold text-white">소득 중단 복합 위기</span>
        </button>
      </div>

      {/* Result Display Card */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">{result.scenarioTitle}</h3>
            <p className="text-xs text-zinc-400 mt-1">{result.impactDescription}</p>
          </div>

          {result.netWorthLoss > 0 && (
            <div className="text-left md:text-right">
              <span className="text-xs text-zinc-400">예상 자산 손실 충격액</span>
              <div className="text-lg font-bold text-rose-400 font-mono">
                -{formatVal(result.netWorthLoss)}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Impact Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Adjusted Net Worth */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4">
            <span className="text-xs text-zinc-400 block mb-1">위기 발생 후 변동 총자산</span>
            <div className="text-2xl font-extrabold text-white font-mono">
              {formatVal(result.adjustedNetWorth)}
            </div>
          </div>

          {/* Adjusted Runway */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4">
            <span className="text-xs text-zinc-400 block mb-1">위기 발생 후 생존 가능 기간 (Runway)</span>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">
              {result.adjustedRunway.runwayYears}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
