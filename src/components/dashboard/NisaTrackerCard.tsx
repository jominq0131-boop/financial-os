'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { NISA_LIFETIME_LIMIT } from '@/constants/finance';

export default function NisaTrackerCard() {
  const isHydrated = useHydrated();
  const { getNisaTotal, isPrivate } = useAssetStore();

  // 실제 자산 데이터에서 동적으로 NISA 잔액 집계
  const nisaContributed = getNisaTotal();
  const annualLimit = 3600000; // 연간 한도 360만 엔 (성장 240만 + 적립 120만)
  const lifetimeLimit = NISA_LIFETIME_LIMIT; // 생애 한도 1,800만 엔

  const annualProgress = Math.min(100, Number(((nisaContributed / annualLimit) * 100).toFixed(1)));
  const lifetimeProgress = Math.min(100, Number(((nisaContributed / lifetimeLimit) * 100).toFixed(1)));

  const fmtShort = (v: number) => {
    if (!isHydrated) return '0 엔';
    if (isPrivate) return '••••';
    return formatJPYShort(v);
  };

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 backdrop-blur-xl hover:border-zinc-700 transition space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> 신NISA 한도 소진 현황
          <Tooltip content="일본 신NISA 제도의 연간 한도(360만엔) 및 생애 통산 한도(1,800만엔) 대비 실제 적립된 자산 금액입니다." />
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          자동 집계 연동
        </span>
      </div>

      {/* Annual Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">연간 한도 소진율 (360만 엔)</span>
          <span className="font-bold text-purple-400 font-mono">
            {isHydrated ? annualProgress : 0}%
          </span>
        </div>
        <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${isHydrated ? annualProgress : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>적립: {fmtShort(nisaContributed)}</span>
          <span>잔여 연간한도: {fmtShort(Math.max(0, annualLimit - nisaContributed))}</span>
        </div>
      </div>

      {/* Lifetime Progress */}
      <div className="space-y-2 pt-2 border-t border-zinc-800/80">
        <div className="flex justify-between text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">생애 한도 소진율 (1,800만 엔)</span>
          <span className="font-bold text-indigo-400 font-mono">
            {isHydrated ? lifetimeProgress : 0}%
          </span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${isHydrated ? lifetimeProgress : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>평생 누적: {fmtShort(nisaContributed)}</span>
          <span>잔여 생애한도: {fmtShort(Math.max(0, lifetimeLimit - nisaContributed))}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-purple-950/20 border border-purple-800/30 rounded-2xl p-3 text-xs text-purple-200">
        <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
        <span className="text-[11px] text-zinc-300">
          신NISA 계좌 내의 모든 운용 수익 및 배당금은 **20.315% 비과세** 처리됩니다.
        </span>
      </div>
    </div>
  );
}
