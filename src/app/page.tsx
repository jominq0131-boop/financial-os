'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import AssetSection from '@/components/dashboard/AssetSection';
import RunwaySection from '@/components/dashboard/RunwaySection';
import BucketSection from '@/components/dashboard/BucketSection';
import LifeEventSection from '@/components/dashboard/LifeEventSection';
import ForecastChart from '@/components/dashboard/ForecastChart';
import StressTestSection from '@/components/dashboard/StressTestSection';
import TimePriceCalculator from '@/components/dashboard/TimePriceCalculator';
import LiquidityMatrix from '@/components/dashboard/LiquidityMatrix';
import HistorySection from '@/components/dashboard/HistorySection';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import { Eye, EyeOff, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Home() {
  const { getTotalNetWorth, getMonthlyDividend, isPrivate, togglePrivacy, resetToDefault } = useAssetStore();

  const totalNetWorth = getTotalNetWorth();
  const monthlyDividend = getMonthlyDividend();

  // 新NISA: 연간 한도 360만엔 (적립 샘플)
  const nisaContributed = 2950000;
  const nisaLimit = 3600000;
  const nisaProgress = Math.min(100, Number(((nisaContributed / nisaLimit) * 100).toFixed(1)));

  // FIRE 목표: 5,000만엔 (4% 룰 적용 연 200만엔 인출 기준)
  const fireTarget = 50000000;
  const fireProgress = Math.min(100, Number(((totalNetWorth / fireTarget) * 100).toFixed(1)));

  const fmt = (v: number) => (isPrivate ? '￥ ••••••' : formatJPY(v));

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans selection:bg-zinc-800">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                Financial OS · Japan (일본 거주 한국인 맞춤형)
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              자산 관제 센터 (Mission Control)
              <button
                onClick={togglePrivacy}
                className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition text-xs"
                title="마스킹 모드 전환"
              >
                {isPrivate
                  ? <EyeOff className="w-4 h-4 text-amber-400" />
                  : <Eye className="w-4 h-4 text-emerald-400" />}
              </button>
            </h1>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
            <div className="text-left sm:text-right">
              <p className="text-xs text-zinc-400 font-mono flex items-center justify-end gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> LOCAL-ONLY · PERSISTENT
              </p>
              <p className="text-sm text-zinc-300 font-medium">신NISA · iDeCo 지원 (엔화 ￥)</p>
            </div>
            <button
              onClick={resetToDefault}
              className="text-[11px] text-zinc-400 hover:text-zinc-300 transition flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg"
              title="샘플 데이터 복원"
            >
              <RefreshCw className="w-3 h-3" /> 샘플 리셋
            </button>
          </div>
        </header>

        {/* KPI Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: 총자산 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-400">총 순자산 (Net Worth)</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                실시간 집계
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {fmt(totalNetWorth)}
              </div>
              <p className="text-xs text-zinc-400">
                {isPrivate ? '' : `≈ ${formatJPYShort(totalNetWorth)} — 전체 계좌 합산`}
              </p>
            </div>
          </div>

          {/* Card 2: FIRE진척도 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">FIRE 조기은퇴 진척도</span>
              <span className="text-sm font-bold text-amber-400">{fireProgress}%</span>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${fireProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>달성: {isPrivate ? '••••' : formatJPYShort(totalNetWorth)}</span>
                <span>목표: 5,000만엔 (4% 룰 기준)</span>
              </div>
            </div>
          </div>

          {/* Card 3: 월간 불로소득 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-400">월간 배당/불로소득 추정</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                연 4% 룰
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {fmt(monthlyDividend)}{' '}
                <span className="text-sm font-normal text-zinc-400">/ 월</span>
              </div>
              <p className="text-xs text-zinc-400">자산이 자동으로 창출하는 월별 캐시플로우</p>
            </div>
          </div>

          {/* Card 4: 신NISA 연간진척 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">신NISA 연간 한도 소진율</span>
              <span className="text-sm font-bold text-purple-400">{nisaProgress}%</span>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${nisaProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>적립: {isPrivate ? '••••' : '295만엔'}</span>
                <span>연간한도: 360만엔</span>
              </div>
            </div>
          </div>
        </section>

        {/* Asset Breakdown Section */}
        <AssetSection />

        {/* Runway & Cashflow Engine Section */}
        <RunwaySection />

        {/* 3-Tier Capital Allocation Bucket Section */}
        <BucketSection />

        {/* Life Financial Timeline Section */}
        <LifeEventSection />

        {/* 50 Year Timeline Asset Forecast Chart */}
        <ForecastChart />

        {/* Stress Test Simulator Section */}
        <StressTestSection />

        {/* Time-Price Expenditure Calculator */}
        <TimePriceCalculator />

        {/* Liquidity Matrix & Safety Net */}
        <LiquidityMatrix />

        {/* Persistent History & Backup Management */}
        <HistorySection />

        {/* Footer */}
        <footer className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
          <span>Financial OS v1.0 · Japan Edition (일본 거주 한국인 전용)</span>
          <span>Privacy-First · Local Persistent · 신NISA / iDeCo 엔화 지원</span>
        </footer>
      </main>
    </div>
  );
}
