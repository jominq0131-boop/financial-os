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
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Home() {
  const { getTotalNetWorth, getMonthlyDividend, isPrivate, togglePrivacy } = useAssetStore();

  const totalNetWorth = getTotalNetWorth();
  const monthlyDividend = getMonthlyDividend();

  const formatCurrency = (val: number) => {
    if (isPrivate) return '••••••••';
    return `₩ ${val.toLocaleString()}`;
  };

  const fireTarget = 500000000; // 5.0억 원
  const fireProgress = Math.min(100, Number(((totalNetWorth / fireTarget) * 100).toFixed(1)));

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans selection:bg-zinc-800">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Financial OS</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Mission Control
              <button
                onClick={togglePrivacy}
                className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition text-xs"
                title="금액 마스킹 토글"
              >
                {isPrivate ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
              </button>
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-zinc-400 font-mono flex items-center justify-end gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> PRIVACY-FIRST OS
            </p>
            <p className="text-sm text-zinc-300 font-medium">Apple Health Minimal Dashboard</p>
          </div>
        </header>

        {/* Dashboard Grid - Dynamic 4 Minimal Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: 총 자산 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-400">총 자산 (Net Worth)</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                실시간 연산
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {formatCurrency(totalNetWorth)}
              </div>
              <p className="text-xs text-zinc-400">포트폴리오 합산 실질 순자산</p>
            </div>
          </div>

          {/* Card 2: FIRE 진행률 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">FIRE 진행률</span>
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
                <span>달성: {isPrivate ? '••••' : `${(totalNetWorth / 100000000).toFixed(2)}억`}</span>
                <span>목표: 5.0억 원</span>
              </div>
            </div>
          </div>

          {/* Card 3: 예상 월 자가배당 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-400">예상 월 자가배당</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                연 4% 룰
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {formatCurrency(monthlyDividend)} <span className="text-sm font-normal text-zinc-400">/ 월</span>
              </div>
              <p className="text-xs text-zinc-400">자본이 자동 창출하는 월 현금 흐름</p>
            </div>
          </div>

          {/* Card 4: NISA / 비과세 진행률 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">NISA / 절세 한도</span>
              <span className="text-sm font-bold text-indigo-400">82.0%</span>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: '82%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>납입: 295만 엔</span>
                <span>연간 한도: 360만 엔</span>
              </div>
            </div>
          </div>
        </section>

        {/* Asset Breakdown Section (Issue #3) */}
        <AssetSection />

        {/* Runway & Cashflow Engine Section (Issue #4) */}
        <RunwaySection />

        {/* 3-Tier Capital Allocation Bucket Section (Issue #5) */}
        <BucketSection />

        {/* Life Financial Timeline Section (Issue #6) */}
        <LifeEventSection />

        {/* 50 Year Timeline Asset Forecast Chart (Issue #7) */}
        <ForecastChart />

        {/* Stress Test Simulator Section (Issue #8) */}
        <StressTestSection />

        {/* Time-Price Expenditure Calculator (Issue #9) */}
        <TimePriceCalculator />

        {/* Liquidity Matrix & Data Vault (Issue #10) */}
        <LiquidityMatrix />

        {/* Status Footer */}
        <footer className="pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <span>Financial OS Version 1.0 — MVP Complete</span>
          <span>Privacy-First · Local-Only · Japan NISA Ready</span>
        </footer>
      </main>
    </div>
  );
}


