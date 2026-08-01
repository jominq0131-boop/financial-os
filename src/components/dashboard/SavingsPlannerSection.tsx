'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Target, TrendingUp, PiggyBank, Flame } from 'lucide-react';

export default function SavingsPlannerSection() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, isPrivate } = useAssetStore();
  const { getTotalIncome } = useCashflowStore();
  const { fireTarget, currentAge } = useSettingsStore();

  const [targetAge, setTargetAge] = useState<number>(45);
  const [expectedYield, setExpectedYield] = useState<number>(6.0); // 연 6%

  const currentNetWorth = getTotalNetWorth();
  const totalIncome = getTotalIncome();

  const yearsLeft = Math.max(1, targetAge - currentAge);
  const monthsLeft = yearsLeft * 12;
  const targetGap = Math.max(0, fireTarget - currentNetWorth);

  // 연 수익률 r (월간 r_m)
  const r = expectedYield / 100;
  const rm = r / 12;

  // 복리 공식으로 필요한 월 투자액 산출 PMT
  // FV_gap = PMT * [ ((1 + rm)^n - 1) / rm ] + PV * (1 + rm)^n
  // 따라서 복리 성장을 감안한 미래 필요 추가자금 gap_future
  const currentWorthFuture = currentNetWorth * Math.pow(1 + r, yearsLeft);
  const neededFuture = Math.max(0, fireTarget - currentWorthFuture);

  // 필요 월 납입액
  const requiredMonthlyInvestment = rm > 0
    ? Math.round((neededFuture * rm) / (Math.pow(1 + rm, monthsLeft) - 1))
    : Math.round(neededFuture / monthsLeft);

  // 필요 저축률 (%)
  const requiredSavingsRate = totalIncome > 0
    ? Math.min(100, Number(((requiredMonthlyInvestment / totalIncome) * 100).toFixed(1)))
    : 0;

  const fmt = (v: number) => {
    if (!isHydrated) return '￥ 0';
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(v);
  };

  const fmtShort = (v: number) => {
    if (!isHydrated) return '0 엔';
    if (isPrivate) return '••••';
    return formatJPYShort(v);
  };

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 backdrop-blur-xl hover:border-zinc-700 transition space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" /> 목표 저축률 & FIRE 달성 플래너
            <Tooltip content="목표 FIRE 은퇴 금액 및 은퇴 연령 달성을 위해 매월 적립해야 하는 필요 저축액과 소득 대비 저축률을 역산합니다." />
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            목표 은퇴 연령 기준 복리 역산 필요 월 저축액 및 저축률 계산
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" /> FIRE Planner
        </span>
      </div>

      {/* Target Settings Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-800/40 p-4 rounded-2xl border border-zinc-800">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">목표 은퇴 연령 ({targetAge}세)</label>
          <input
            type="range"
            min={currentAge + 1}
            max={75}
            value={targetAge}
            onChange={(e) => setTargetAge(Number(e.target.value))}
            className="w-full accent-amber-500 mt-2"
          />
          <span className="text-[11px] text-zinc-400 block mt-1">
            잔여 기간: <span className="text-amber-400 font-bold font-mono">{yearsLeft}년</span> ({monthsLeft}개월)
          </span>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">목표 자산 (엔 ￥)</label>
          <div className="text-sm font-bold text-white font-mono mt-1">
            {fmtShort(fireTarget)}
          </div>
          <span className="text-[11px] text-zinc-400 block mt-0.5">
            잔여 필요금: {fmtShort(targetGap)}
          </span>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">기대 복리 수익률 (%)</label>
          <input
            type="number"
            step="0.5"
            value={expectedYield}
            onChange={(e) => setExpectedYield(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Output Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">목표 달성 필요 월 저축/투자액</span>
            <span className="text-xl font-extrabold text-white font-mono">
              {fmt(requiredMonthlyInvestment)} <span className="text-xs font-normal text-zinc-400">/ 월</span>
            </span>
          </div>
        </div>

        <div className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">월 소득 대비 필요 저축률</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              {isHydrated ? requiredSavingsRate : 0}%
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              월 실수령 소득 {fmtShort(totalIncome)} 기준
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
