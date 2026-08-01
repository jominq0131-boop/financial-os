'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSnapshotStore } from '@/store/useSnapshotStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import {
  TrendingUp,
  TrendingDown,
  Camera,
  CheckCircle2,
  Calendar,
  Sparkles,
  PiggyBank,
  ArrowRight,
} from 'lucide-react';

export default function MonthlyBriefingCard() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, assets, isPrivate } = useAssetStore();
  const { getTotalIncome, getTotalExpense, getNetSurplus } = useCashflowStore();
  const { snapshots, addSnapshot } = useSnapshotStore();
  const { addLog } = useHistoryStore();

  const todayDate = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(todayDate);
  const [showMonthForm, setShowMonthForm] = useState(false);
  const [isCapturedToday, setIsCapturedToday] = useState(false);

  const currentNetWorth = getTotalNetWorth();
  const totalCash = assets
    .filter((a) => a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);
  const totalInvestments = currentNetWorth - totalCash;

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const netSurplus = getNetSurplus();
  const surplusRate = totalIncome > 0 ? Number(((netSurplus / totalIncome) * 100).toFixed(1)) : 0;

  // 스냅샷 목록 날짜 오름차순 정렬 후 최신 마감(S_latest)과 직전 마감(S_prev) 비교
  const sortedSnapshots = [...snapshots].sort((a, b) => a.date.localeCompare(b.date));
  const latestSnapshot = sortedSnapshots.length > 0 ? sortedSnapshots[sortedSnapshots.length - 1] : null;
  const prevSnapshot = sortedSnapshots.length > 1 ? sortedSnapshots[sortedSnapshots.length - 2] : null;

  // 마감된 최신 자산 평가액 vs 직전 마감 평가액 비교
  const activeNetWorth = latestSnapshot ? latestSnapshot.netWorth : currentNetWorth;
  const benchmarkNetWorth = prevSnapshot ? prevSnapshot.netWorth : 0;

  const momGrowth = prevSnapshot ? activeNetWorth - benchmarkNetWorth : 0;
  const momPercent =
    prevSnapshot && benchmarkNetWorth > 0
      ? Number(((momGrowth / benchmarkNetWorth) * 100).toFixed(1))
      : 0;

  const isSurplus = momGrowth >= 0;

  // 원터치 월말 정산 마감 실행 (지정 정산년월로 저장)
  const handleMonthlyClosing = () => {
    const targetMonth = selectedMonth || todayDate;
    addSnapshot({
      date: targetMonth,
      netWorth: currentNetWorth,
      totalCash,
      totalInvestments,
      note: `${targetMonth} 정기 재정 정산 마감`,
    });

    addLog({
      type: 'ASSET',
      action: 'ADD',
      title: `📸 ${targetMonth} 재정 정산 마감`,
      detail: `최종 순자산: ￥${currentNetWorth.toLocaleString()} (전월 대비 ${momGrowth >= 0 ? '+' : ''}￥${momGrowth.toLocaleString()})`,
    });

    setIsCapturedToday(true);
    setShowMonthForm(false);
    setTimeout(() => setIsCapturedToday(false), 3000);
  };

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
    <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800/90 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
              Monthly Executive Briefing · {todayDate}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
            월간 재정 성과 브리핑 (Executive Summary)
            <Tooltip content="월초/월말 1회 접속 시 전월 대비 자산 변화액, 흑자/적자 비중 및 이번 달 저축 성과를 한눈에 브리핑하는 핵심 헤드라인입니다." />
          </h2>
        </div>

        {/* Closing Action Button Area */}
        <div className="flex items-center gap-2">
          {!showMonthForm ? (
            <button
              onClick={() => setShowMonthForm(true)}
              disabled={isCapturedToday}
              className={`px-4 py-2.5 rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                isCapturedToday
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
              }`}
            >
              {isCapturedToday ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>정산 마감 완료! 📸</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>재정 마감 & 스냅샷 기록</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 p-2 rounded-2xl">
              <span className="text-xs text-zinc-400 font-mono">정산년월:</span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleMonthlyClosing}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-xl font-medium"
              >
                저장
              </button>
              <button
                onClick={() => setShowMonthForm(false)}
                className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: MoM Growth */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 font-medium block">
            전월 대비 순자산 변동 (MoM)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              {fmtShort(momGrowth)}
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border ${
                isSurplus
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {isSurplus ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {isSurplus ? '+' : ''}{momPercent}% {isSurplus ? '흑자 🎉' : '적자 ⚠️'}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">
            {latestSnapshot && prevSnapshot
              ? `최신 정산(${latestSnapshot.date}) vs 직전 정산(${prevSnapshot.date}) 기준 비교`
              : latestSnapshot
              ? `최신 정산(${latestSnapshot.date}) 마감 상태`
              : '최초 등록 정산 상태'}
          </p>
        </div>

        {/* Card 2: Current Net Surplus */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 font-medium block">
            이번 달 실수령 잉여 여력 (Net Surplus)
          </span>
          <div className="text-2xl md:text-3xl font-extrabold text-cyan-400 font-mono">
            {fmt(netSurplus)}
          </div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1">
            월 수입 {fmtShort(totalIncome)} - 지출 {fmtShort(totalExpense)}
          </p>
        </div>

        {/* Card 3: Savings Rate */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-zinc-400 font-medium block">
            이번 달 목표 저축/투자 성과율
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">
              {isHydrated ? surplusRate : 0}%
            </span>
            <span className="text-xs text-zinc-400">저축 여력 비율</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full"
              style={{ width: `${isHydrated ? Math.min(100, surplusRate) : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
