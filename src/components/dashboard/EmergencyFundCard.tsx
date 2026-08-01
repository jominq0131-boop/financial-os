'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { ShieldAlert, ShieldCheck, ArrowRight, Wallet, TrendingUp } from 'lucide-react';

export default function EmergencyFundCard() {
  const isHydrated = useHydrated();
  const { assets, isPrivate } = useAssetStore();
  const { getTotalExpense } = useCashflowStore();
  const { emergencyFundMonths } = useSettingsStore();

  // 현금성 자산 합계 (CASH 카테고리)
  const cashTotal = assets
    .filter((a) => a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);

  const monthlyExpense = getTotalExpense();
  const targetEmergencyFund = monthlyExpense * emergencyFundMonths;

  // 비상금 달성률 (%)
  const progressPercent = targetEmergencyFund > 0
    ? Math.min(100, Number(((cashTotal / targetEmergencyFund) * 100).toFixed(1)))
    : 100;

  const isAchieved = cashTotal >= targetEmergencyFund;

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
    <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 backdrop-blur-xl hover:border-zinc-700 transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          {isAchieved ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          )}
          {emergencyFundMonths}개월 치 생활비 비상금 현황
          <Tooltip content="월 평균 지출액 기준 지정한 개월 수만큼의 생존 자금(현금/예금)이 확보되어 있는지 점검합니다." />
        </h3>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            isAchieved
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}
        >
          {isAchieved ? '달성 완료 🎉' : '저축 집중 단계 🛡️'}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-extrabold text-white font-mono">
            {fmt(cashTotal)}{' '}
            <span className="text-xs text-zinc-400 font-normal">
              / 목표 {fmtShort(targetEmergencyFund)}
            </span>
          </span>
          <span className="text-sm font-bold text-emerald-400 font-mono">
            {isHydrated ? progressPercent : 0}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isAchieved
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
            style={{ width: `${isHydrated ? progressPercent : 0}%` }}
          />
        </div>

        {/* Dynamic Action Strategy Advice */}
        <div className="pt-2 border-t border-zinc-800/80">
          {isAchieved ? (
            <div className="flex items-start gap-2.5 bg-emerald-950/20 border border-emerald-800/30 rounded-2xl p-3 text-xs text-emerald-200">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">비상금 확보 완료 ➔ 잉여금 100% 투자 집행</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  안전망이 충분합니다. 매월 발생하는 잉여금 전액을 **신NISA(성장/적립)** 및 주식 포트폴리오에 배분하세요.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 bg-amber-950/20 border border-amber-800/30 rounded-2xl p-3 text-xs text-amber-200">
              <Wallet className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">비상금 충원 필요 ➔ 잉여금 100% 현금 저축</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  목표 비상금({fmtShort(targetEmergencyFund)})까지 약{' '}
                  <span className="font-bold text-amber-400 font-mono">
                    {fmtShort(Math.max(0, targetEmergencyFund - cashTotal))}
                  </span>{' '}
                  남았습니다. 비상금이 모일 때까지 수입 잉여금을 저축에 우선 배분하세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
