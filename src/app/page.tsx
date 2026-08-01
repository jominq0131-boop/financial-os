'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import Tooltip from '@/components/common/Tooltip';
import AssetSection from '@/components/dashboard/AssetSection';
import RunwaySection from '@/components/dashboard/RunwaySection';
import BucketSection from '@/components/dashboard/BucketSection';
import LifeEventSection from '@/components/dashboard/LifeEventSection';
import ForecastChart from '@/components/dashboard/ForecastChart';
import StressTestSection from '@/components/dashboard/StressTestSection';
import LiquidityMatrix from '@/components/dashboard/LiquidityMatrix';
import HistorySection from '@/components/dashboard/HistorySection';
import SnapshotGrowthChart from '@/components/dashboard/SnapshotGrowthChart';
import NisaTrackerCard from '@/components/dashboard/NisaTrackerCard';
import TaxReturnSection from '@/components/dashboard/TaxReturnSection';
import SavingsPlannerSection from '@/components/dashboard/SavingsPlannerSection';
import SettingsModal from '@/components/dashboard/SettingsModal';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import { Eye, EyeOff, ShieldCheck, RefreshCw, Settings, Sparkles } from 'lucide-react';

export default function Home() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, getMonthlyDividend, getNisaTotal, isPrivate, togglePrivacy, resetToDefault } = useAssetStore();
  const { fireTarget, nisaAnnualLimit } = useSettingsStore();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const totalNetWorth = getTotalNetWorth();
  const monthlyDividend = getMonthlyDividend();

  // 실제 등록된 신NISA 자산 합계
  const nisaContributed = getNisaTotal();
  const nisaProgress = Math.min(100, Number(((nisaContributed / nisaAnnualLimit) * 100).toFixed(1)));

  // FIRE 목표 진척도 (동적 fireTarget 적용)
  const fireProgress = fireTarget > 0
    ? Math.min(100, Number(((totalNetWorth / fireTarget) * 100).toFixed(1)))
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
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-sans selection:bg-zinc-800">
      <main className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                Financial OS · Japan (일본 거주 한국인 맞춤형)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
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

          <div className="flex items-center gap-3">
            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white hover:border-zinc-700 transition shadow-sm"
              title="설정 모달 열기"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>재정 설정</span>
            </button>

            {/* Reset Sample Button */}
            <button
              onClick={resetToDefault}
              className="text-xs text-zinc-400 hover:text-zinc-300 transition flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl"
              title="샘플 데이터 복원"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 샘플 리셋
            </button>

            <div className="hidden sm:block text-right border-l border-zinc-800 pl-3">
              <p className="text-[11px] text-zinc-400 font-mono flex items-center justify-end gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> LOCAL-ONLY
              </p>
              <p className="text-xs text-zinc-300 font-medium">엔화 (JPY ￥) 기준</p>
            </div>
          </div>
        </header>

        {/* Top KPI Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 총자산 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400 flex items-center">
                총 순자산 (Net Worth)
                <Tooltip content="등록된 현금, 주식, 연금, 부동산 등 모든 엔화(JPY ￥) 자산 계좌의 실시간 합계액입니다." />
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                실시간
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
                {fmt(totalNetWorth)}
              </div>
              <p className="text-[11px] text-zinc-400">
                {isPrivate ? '' : `≈ ${fmtShort(totalNetWorth)} — 전체 계좌 합산`}
              </p>
            </div>
          </div>

          {/* Card 2: FIRE진척도 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-400 flex items-center">
                FIRE 조기은퇴 진척도
                <Tooltip content="설정된 FIRE 은퇴 목표 자금 대비 현재 총 순자산의 달성 비율입니다." />
              </span>
              <span className="text-xs font-bold text-amber-400 font-mono">
                {isHydrated ? fireProgress : 0}%
              </span>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${isHydrated ? fireProgress : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>달성: {isPrivate ? '••••' : fmtShort(totalNetWorth)}</span>
                <span>목표: {fmtShort(fireTarget)}</span>
              </div>
            </div>
          </div>

          {/* Card 3: 월간 불로소득 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400 flex items-center">
                월간 배당/불로소득 추정
                <Tooltip content="총 자산을 연 4% 인출 규칙으로 운용할 때 매월 안전하게 인출할 수 있는 월별 자가배당 소득입니다." />
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                연 4% 룰
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
                {fmt(monthlyDividend)}{' '}
                <span className="text-xs font-normal text-zinc-400">/ 월</span>
              </div>
              <p className="text-[11px] text-zinc-400">자산이 창출하는 월별 캐시플로우</p>
            </div>
          </div>

          {/* Card 4: 신NISA 연간진척 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-400 flex items-center">
                신NISA 연간한도 소진율
                <Tooltip content="신NISA 연간 납입 한도(360만엔) 대비 실제 등록된 NISA 자산 적립 비율입니다." />
              </span>
              <span className="text-xs font-bold text-purple-400 font-mono">
                {isHydrated ? nisaProgress : 0}%
              </span>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${isHydrated ? nisaProgress : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>적립: {fmtShort(nisaContributed)}</span>
                <span>한도: {fmtShort(nisaAnnualLimit)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Multi-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Asset, Cashflow, Emergency Fund, Bucket Allocation */}
          <div className="lg:col-span-7 space-y-8">
            <AssetSection />
            <RunwaySection />
            <BucketSection />
          </div>

          {/* Right Column: Monthly Snapshot, Growth Tracker, NISA/Tax Intelligence, Simulations */}
          <div className="lg:col-span-5 space-y-8">
            <SnapshotGrowthChart />
            <NisaTrackerCard />
            <TaxReturnSection />
            <SavingsPlannerSection />
            <ForecastChart />
            <StressTestSection />
          </div>
        </div>

        {/* Bottom Full-Width Sections: Timeline, Liquidity, Backup */}
        <div className="space-y-8 pt-4 border-t border-zinc-800/80">
          <LifeEventSection />
          <LiquidityMatrix />
          <HistorySection />
        </div>

        {/* Settings Modal */}
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

        {/* Footer */}
        <footer className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
          <span>Financial OS v1.2 · Mission Control Dashboard (일본 거주 한국인 전용)</span>
          <span>Privacy-First · Local Persistent · 신NISA 엔화 지원</span>
        </footer>
      </main>
    </div>
  );
}
