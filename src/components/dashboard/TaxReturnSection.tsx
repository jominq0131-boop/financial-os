'use client';

import React, { useState } from 'react';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import Tooltip from '@/components/common/Tooltip';
import { Calculator, Percent, ArrowUpRight } from 'lucide-react';

export default function TaxReturnSection() {
  const isHydrated = useHydrated();
  const { isPrivate } = useAssetStore();

  const [principal, setPrincipal] = useState<number>(3600000); // 360만 엔
  const [years, setYears] = useState<number>(10);
  const [annualReturn, setAnnualReturn] = useState<number>(7.0); // 연 7%

  const r = annualReturn / 100;
  const grossValue = Math.round(principal * Math.pow(1 + r, years));
  const gain = Math.max(0, grossValue - principal);

  // 세금 계산 (일본 양도세/배당세 20.315%)
  const taxAmount = Math.round(gain * 0.20315);
  const taxableNetValue = grossValue - taxAmount;

  // 비과세(NISA) 절세 혜택
  const nisaNetValue = grossValue;
  const taxSavings = taxAmount;

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
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-400" /> 세후 실수익 비교 시뮬레이터
          <Tooltip content="일반 계좌(20.315% 과세) vs 신NISA 비과세 계좌에서 복리 투자 시 발생하는 세금 절감액과 세후 실질 수익을 비교합니다." />
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          일본 세율 20.315% 적용 시 일반 계좌 vs NISA 비과세 수익 차액 연산
        </p>
      </div>

      {/* Input Slider / Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-800/40 p-4 rounded-2xl border border-zinc-800">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">투자 원금 (엔 ￥)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            step={100000}
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">기대 연 수익률 (%)</label>
          <input
            type="number"
            step="0.5"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">투자 기간 ({years}년)</label>
          <input
            type="range"
            min={1}
            max={30}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-emerald-500 mt-2"
          />
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 일반 계좌 */}
        <div className="bg-zinc-800/30 border border-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 font-medium">일반 특정계좌 (20.315% 과세)</span>
            <span className="text-rose-400 font-mono">세금 {fmtShort(taxAmount)}</span>
          </div>
          <div className="text-xl font-bold text-zinc-200 font-mono">
            {fmt(taxableNetValue)}
          </div>
          <p className="text-[11px] text-zinc-400">
            총 수익 {fmtShort(gain)} 중 20.315% 원천징수 차감
          </p>
        </div>

        {/* 신NISA 계좌 */}
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-300 font-medium flex items-center gap-1">
              신NISA 비과세 계좌 (0% 과세)
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <span className="text-emerald-400 font-bold font-mono">세금 ￥ 0</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-400 font-mono">
            {fmt(nisaNetValue)}
          </div>
          <p className="text-[11px] text-emerald-300">
            일반계좌 대비 <span className="font-bold text-amber-400 font-mono">{fmtShort(taxSavings)}</span> 추가 이득
          </p>
        </div>
      </div>
    </div>
  );
}
