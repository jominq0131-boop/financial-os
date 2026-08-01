'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import Tooltip from '@/components/common/Tooltip';
import { formatJPY } from '@/utils/currency';
import { Target, Flag, Calendar, Sparkles, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface GoalPreset {
  id: string;
  title: string;
  targetAmount: number;
  category: string;
}

export default function GoalTrackerSection() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, isPrivate } = useAssetStore();
  const { getTotalCapitalInflow } = useCashflowStore();
  const { fireTarget } = useSettingsStore();

  const totalNetWorth = getTotalNetWorth();
  const capitalInflow = getTotalCapitalInflow();

  // Preset Goals
  const presetGoals: GoalPreset[] = [
    { id: 'goal-500k', title: '🌱 50만 엔 자산 형성 (1차 목표)', targetAmount: 500000, category: 'SHORT' },
    { id: 'goal-1m', title: '☘️ 100만 엔 시드머니 구축', targetAmount: 1000000, category: 'SHORT' },
    { id: 'goal-3m', title: '🚀 300만 엔 자산 마일스톤', targetAmount: 3000000, category: 'MID' },
    { id: 'goal-5m', title: '💎 500만 엔 자본가 등극', targetAmount: 5000000, category: 'MID' },
    { id: 'goal-10m', title: '🏆 1,000만 엔 8자리 자산가', targetAmount: 10000000, category: 'LONG' },
    { id: 'goal-fire', title: '👑 FIRE 은퇴 자금 달성', targetAmount: fireTarget || 50000000, category: 'FIRE' },
  ];

  const [selectedGoalId, setSelectedGoalId] = useState<string>('goal-500k');
  const activeGoal = presetGoals.find((g) => g.id === selectedGoalId) || presetGoals[0];

  const currentGoalAmount = activeGoal.targetAmount;
  const progressPercent = currentGoalAmount > 0
    ? Math.min(100, Number(((totalNetWorth / currentGoalAmount) * 100).toFixed(1)))
    : 0;

  const remainingAmount = Math.max(0, currentGoalAmount - totalNetWorth);

  // Calculate estimated completion months based on monthly capital inflow (savings + investment + surplus)
  const monthsNeeded = capitalInflow > 0 && remainingAmount > 0
    ? Math.ceil(remainingAmount / capitalInflow)
    : 0;

  // Calculate target date (YYYY년 MM월)
  const getEstimatedDate = (months: number) => {
    if (months <= 0) return '달성 완료! 🎉';
    const now = new Date();
    now.setMonth(now.getMonth() + months);
    return `${now.getFullYear()}년 ${now.getMonth() + 1}월`;
  };

  return (
    <section className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 md:p-7 backdrop-blur-xl hover:border-zinc-700 transition space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5.5 h-5.5 text-emerald-400" />
            목표 달성도 & 저축 페이스 트래커
            <Tooltip content="설정한 목표 금액 대비 현재 총자산의 달성률과, 현재 월 저축 잉여금(Surplus) 속도로 진행 시 예상되는 목표 달성 시점을 실시간 계산합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            내 단기·중기·FIRE 목표 달성률, 남은 필요 자금 및 현재 저축 속도 기반 달성 예상월 분석
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono">월 실질 자본 유입속도:</span>
          <span className="text-xs font-bold text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-xl">
            +{isPrivate ? '••••' : formatJPY(capitalInflow)} / 월
          </span>
        </div>
      </div>

      {/* Goal Selector Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
          트래킹할 목표 선택
        </span>
        <div className="flex flex-wrap gap-2">
          {presetGoals.map((goal) => {
            const isSelected = goal.id === selectedGoalId;
            const isCompleted = totalNetWorth >= goal.targetAmount;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-lg shadow-emerald-950/40'
                    : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Flag className="w-3.5 h-3.5 text-zinc-500" />
                )}
                <span>{goal.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Goal Analytics Dashboard */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-1">선택된 목표 항목</span>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              {activeGoal.title}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 block mb-0.5">목표 설정 금액</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              {formatJPY(activeGoal.targetAmount)}
            </span>
          </div>
        </div>

        {/* Progress Bar & Key Numbers */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-zinc-400 font-mono">
              현재 총자산 {isPrivate ? '••••••••' : formatJPY(totalNetWorth)}
            </span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono">
              {isHydrated ? progressPercent : 0}% 달성
            </span>
          </div>

          <div className="w-full bg-zinc-900 h-4 rounded-full overflow-hidden border border-zinc-800/80 p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-300 h-full rounded-full transition-all duration-500 shadow-lg shadow-emerald-950/50"
              style={{ width: `${isHydrated ? progressPercent : 0}%` }}
            />
          </div>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Card 1: Remaining Needed */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1">
            <span className="text-xs text-zinc-400 font-medium block">목표까지 남은 필요 자금</span>
            <div className="text-xl font-bold text-amber-400 font-mono">
              {remainingAmount === 0 ? '달성 완료! 🎉' : isPrivate ? '••••••••' : formatJPY(remainingAmount)}
            </div>
            <p className="text-[11px] text-zinc-500">
              {remainingAmount === 0 ? '목표 달성을 축하합니다!' : '추가 저축 필요 금액'}
            </p>
          </div>

          {/* Card 2: Estimated Time */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1">
            <span className="text-xs text-zinc-400 font-medium block">목표 달성 예상 소요 기간</span>
            <div className="text-xl font-bold text-cyan-400 font-mono">
              {remainingAmount === 0
                ? '달성 완료! 🎉'
                : capitalInflow > 0
                ? `약 ${monthsNeeded} 개월`
                : '적립 여력 부족 ⚠️'}
            </div>
            <p className="text-[11px] text-zinc-500">
              {capitalInflow > 0 ? `현재 월 자본 유입 ${formatJPY(capitalInflow)} 페이스` : '월 자본 적립 여력 확보 필요'}
            </p>
          </div>

          {/* Card 3: Target Completion Month */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1">
            <span className="text-xs text-zinc-400 font-medium block">예상 목표 달성 시점</span>
            <div className="text-xl font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              {remainingAmount === 0 ? '달성 완료!' : capitalInflow > 0 ? getEstimatedDate(monthsNeeded) : '산출 불가'}
            </div>
            <p className="text-[11px] text-zinc-500">
              {capitalInflow > 0 ? '현재 저축·투자·잉여금 페이스 유지 시' : '자본 적립 수치 등록 필요'}
            </p>
          </div>
        </div>

        {/* Motivational Banner */}
        {remainingAmount > 0 && capitalInflow > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-300">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              현재의 월 <strong>{formatJPY(capitalInflow)}</strong> 자본 적립 속도를 유지하면,{' '}
              <strong>{getEstimatedDate(monthsNeeded)}</strong>에 목표 <strong>{activeGoal.title}</strong>를 완벽하게 달성하게 됩니다!
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
