'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import Sidebar, { NavTab } from '@/components/navigation/Sidebar';
import Header from '@/components/navigation/Header';
import SettingsModal from '@/components/dashboard/SettingsModal';
import { APP_VERSION } from '@/constants/version';

// Components by Domain
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
import MonthlyBriefingCard from '@/components/dashboard/MonthlyBriefingCard';
import EmergencyFundCard from '@/components/dashboard/EmergencyFundCard';
import FinancialLevelCard from '@/components/dashboard/FinancialLevelCard';
import GoalTrackerSection from '@/components/dashboard/GoalTrackerSection';
import SpendingTemperatureCard from '@/components/dashboard/SpendingTemperatureCard';
import FireRoutineCard from '@/components/dashboard/FireRoutineCard';
import Tooltip from '@/components/common/Tooltip';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import { Sparkles, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function Home() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, getMonthlyDividend, getNisaTotal, isPrivate } = useAssetStore();
  const { fireTarget, nisaAnnualLimit } = useSettingsStore();

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const totalNetWorth = getTotalNetWorth();
  const monthlyDividend = getMonthlyDividend();
  const nisaContributed = getNisaTotal();

  const nisaProgress = Math.min(100, Number(((nisaContributed / nisaAnnualLimit) * 100).toFixed(1)));
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
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Sticky Top Header */}
        <Header
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* View Content Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* TAB 1: 🚀 관제 요약 (Overview) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Executive Monthly Performance Briefing Center */}
              <MonthlyBriefingCard />

              {/* Gamified FIRE Rank & Quest Badges */}
              <FinancialLevelCard />

              {/* Goal Achievement & Pace Tracker */}
              <GoalTrackerSection />

              {/* FIRE Habit Routine Checklist */}
              <FireRoutineCard />

              {/* 4 KPI Cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Net Worth / Total Assets */}
                <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-zinc-400 flex items-center">
                      현재 총자산 (Total Assets)
                      <Tooltip content="등록된 현금, 주식, 신NISA, iDeCo, 부동산 등 모든 계좌(JPY ￥) 자산의 전체 합계액입니다." />
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      전 계좌 합산
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight text-white font-mono">
                    {fmt(totalNetWorth)}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {isPrivate ? '' : '현금 + 주식 + 신NISA + iDeCo + 부동산 전 계좌 합산액'}
                  </p>
                </div>

                {/* FIRE Progress */}
                <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-400 flex items-center">
                      FIRE 은퇴 진척도
                      <Tooltip content="설정된 FIRE 은퇴 목표 자금 대비 현재 총자산의 달성 비율입니다." />
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {isHydrated ? fireProgress : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${isHydrated ? fireProgress : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>달성: {formatJPY(totalNetWorth)}</span>
                    <span>목표: {formatJPY(fireTarget)}</span>
                  </div>
                </div>

                {/* Monthly Dividend */}
                <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-zinc-400 flex items-center">
                      월 배당/불로소득
                      <Tooltip content="총 자산을 연 4% 인출 규칙으로 운용할 때 매월 안전하게 인출할 수 있는 월별 자가배당 소득입니다." />
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      연 4% 룰
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight text-white font-mono">
                    {fmt(monthlyDividend)}{' '}
                    <span className="text-xs font-normal text-zinc-400">/ 월</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">월별 자가 배당 흐름</p>
                </div>

                {/* Shin-NISA Progress */}
                <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-400 flex items-center">
                      신NISA 연간 한도
                      <Tooltip content="신NISA 연간 납입 한도(360만엔) 대비 실제 적립 비율입니다." />
                    </span>
                    <span className="text-xs font-bold text-purple-400 font-mono">
                      {isHydrated ? nisaProgress : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${isHydrated ? nisaProgress : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>적립: {formatJPY(nisaContributed)}</span>
                    <span>한도: {formatJPY(nisaAnnualLimit)}</span>
                  </div>
                </div>
              </section>

              {/* Emergency Fund Card & Forecast Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6">
                  <EmergencyFundCard />
                </div>
                <div className="lg:col-span-6">
                  <NisaTrackerCard />
                </div>
              </div>

              {/* 50 Year Forecast Chart */}
              <ForecastChart />
            </div>
          )}

          {/* TAB 2: 💼 자산 & 현금흐름 (Assets & Cashflow) */}
          {activeTab === 'assets' && (
            <div className="space-y-8 animate-fade-in">
              <AssetSection />
              <RunwaySection />
              <SpendingTemperatureCard />
              <BucketSection />
            </div>
          )}

          {/* TAB 3: 🎯 세제 & FIRE 플래너 (Intelligence & Milestones) */}
          {activeTab === 'intelligence' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-8">
                  <TaxReturnSection />
                  <NisaTrackerCard />
                </div>
                <div className="lg:col-span-6 space-y-8">
                  <SavingsPlannerSection />
                </div>
              </div>
              <LifeEventSection />
            </div>
          )}

          {/* TAB 4: 📊 성장이력 & 데이터 보안 (Snapshots & Security) */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7">
                  <SnapshotGrowthChart />
                </div>
                <div className="lg:col-span-5">
                  <StressTestSection />
                </div>
              </div>
              <LiquidityMatrix />
              <HistorySection />
            </div>
          )}
        </main>

        {/* Global Settings Modal */}
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

        {/* Footer */}
        <footer className="mt-auto py-6 border-t border-zinc-800/60 px-4 md:px-8 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Financial OS {APP_VERSION} · Production Architecture (일본 거주 한국인 전용)</span>
          <span>Privacy-First · Local Persistent · Clean Architecture</span>
        </footer>
      </div>
    </div>
  );
}
