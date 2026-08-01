'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Compass, Sparkles, TrendingUp, ShieldAlert, CheckCircle2, ArrowRight, Zap, Target, Lightbulb } from 'lucide-react';

export default function FireAdvisorCard() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, getNisaTotal, assets, isPrivate } = useAssetStore();
  const { getTotalIncome, getTotalExpense, getTotalSavings, getTotalInvestments, getTotalCapitalInflow } = useCashflowStore();
  const { fireTarget, nisaAnnualLimit } = useSettingsStore();

  const totalNetWorth = getTotalNetWorth();
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const totalSavings = getTotalSavings();
  const totalInvestments = getTotalInvestments();
  const capitalInflow = getTotalCapitalInflow();
  const nisaTotal = getNisaTotal();

  // 1. 소비 율 & 저축/투자율 (소비지출 / 수입)
  const expenseRate = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  const capitalRate = totalIncome > 0 ? (capitalInflow / totalIncome) * 100 : 0;

  // 2. 자산 중 현금 비중
  const cashAmount = assets.filter((a) => a.category === 'CASH').reduce((sum, a) => sum + a.amount, 0);
  const cashRatio = totalNetWorth > 0 ? (cashAmount / totalNetWorth) * 100 : 0;

  // 3. 진단 점수 (100점 만점)
  // - 자본 유입율 (최대 50점): 저축/투자율 50% 이상 시 50점
  // - 현금 비중 건전성 (최대 25점): 현금 비중 20~40%일 때 25점
  // - NISA 한도 활용도 (최대 25점): NISA 100만엔 이상 25점
  const capitalScore = Math.min(50, Math.round((capitalRate / 50) * 50));
  const cashScore = cashRatio >= 15 && cashRatio <= 45 ? 25 : cashRatio > 45 ? 15 : 10;
  const nisaScore = Math.min(25, Math.round((nisaTotal / 1000000) * 25));
  const totalHealthScore = Math.min(100, capitalScore + cashScore + nisaScore);

  // 4. 상태 판정
  const getGrade = (score: number) => {
    if (score >= 85) return { grade: 'S등급', color: 'text-amber-400', label: '🔥 FIRE 최적화 모범 상태' };
    if (score >= 70) return { grade: 'A등급', color: 'text-emerald-400', label: '✅ 안정적인 자산 증식 궤도' };
    if (score >= 55) return { grade: 'B등급', color: 'text-cyan-400', label: '☘️ 양호 (소비·투자 비율 조절 권장)' };
    return { grade: 'C등급', color: 'text-rose-400', label: '⚠️ 재정 체질 개선 필요' };
  };

  const gradeInfo = getGrade(totalHealthScore);

  // 5. 시뮬레이션 단축 연산 (소비 1만엔 절감 시 은퇴 단축 연월 계산)
  const remainingFireGoal = Math.max(0, fireTarget - totalNetWorth);
  const currentMonthsNeeded = capitalInflow > 0 ? Math.ceil(remainingFireGoal / capitalInflow) : 0;
  const optimizedInflow = capitalInflow + 10000; // 월 1만엔 추가 적립
  const optimizedMonthsNeeded = optimizedInflow > 0 ? Math.ceil(remainingFireGoal / optimizedInflow) : 0;
  const savedMonths = Math.max(0, currentMonthsNeeded - optimizedMonthsNeeded);

  const fmt = (v: number) => {
    if (!isHydrated) return '￥ 0';
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(v);
  };

  return (
    <section className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/90 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6 hover:border-zinc-700 transition">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            FIRE 스마트 재정 진단 & 최적 가이드
            <Tooltip content="등록된 자산, 현금흐름 4축 배분, NISA 적립률을 종합 분석하여 재정 체력 점수(100점) 및 FIRE 달성 시점 단축을 위한 최적의 가이드를 제시합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            현재 재정 상태 진단서 ➔ 최단 경로 FIRE 진입을 위한 수입·지출·투자 가이드
          </p>
        </div>

        {/* Health Score Badge */}
        <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800 p-3 rounded-2xl shrink-0">
          <div className="text-center font-mono">
            <span className="text-[10px] text-zinc-400 block">재정 체력 점수</span>
            <span className="text-2xl font-black text-white">{isHydrated ? totalHealthScore : 0}</span>
            <span className="text-xs text-zinc-500"> / 100점</span>
          </div>
          <div className="border-l border-zinc-800 pl-3">
            <span className={`text-xs font-extrabold ${gradeInfo.color} block font-mono`}>
              {gradeInfo.grade}
            </span>
            <span className="text-[10px] text-zinc-400">{gradeInfo.label}</span>
          </div>
        </div>
      </div>

      {/* 3대 핵심 체질 진단 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 소비 비중 진단 */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">월 소비 지출율</span>
            <span className={`font-mono font-bold ${expenseRate <= 40 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isHydrated ? expenseRate.toFixed(1) : 0}%
            </span>
          </div>
          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${expenseRate <= 40 ? 'bg-emerald-400' : 'bg-rose-500'}`}
              style={{ width: `${Math.min(100, expenseRate)}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-400 pt-0.5">
            {expenseRate <= 40 ? '✅ 수입 대비 소비가 통제되고 있습니다.' : '⚠️ 소비 지출 비중 감축을 추천합니다.'}
          </p>
        </div>

        {/* 자본 유입율 진단 */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">월 자본 적립율 (저축+투자)</span>
            <span className="font-mono font-bold text-cyan-400">
              {isHydrated ? capitalRate.toFixed(1) : 0}%
            </span>
          </div>
          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, capitalRate)}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-400 pt-0.5">
            {capitalRate >= 40 ? '🔥 우수한 자산 증식 속도를 유지 중입니다.' : '💡 저축·투자 비중을 늘리면 은퇴가 빨라집니다.'}
          </p>
        </div>

        {/* NISA 활용도 진단 */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">신NISA 통산 적립액</span>
            <span className="font-mono font-bold text-purple-400">
              {formatJPYShort(nisaTotal)}
            </span>
          </div>
          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (nisaTotal / 18000000) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-400 pt-0.5">
            생애 비과세 한도 1,800만 엔 중 {((nisaTotal / 18000000) * 100).toFixed(1)}% 달성
          </p>
        </div>
      </div>

      {/* FIRE 목표 달성 단축 솔루션 3종 */}
      <div className="space-y-3 pt-2 border-t border-zinc-800/80">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          FIRE 달성 시점 단축을 위한 맞춤 가이드
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 가이드 1: 소비 절감 1만엔 시 은퇴 단축 시뮬레이션 */}
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                월 1만 엔 지출 절약 ➔ 투자 전환 시 효과
              </span>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                약 {savedMonths}개월 단축 🚀
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              매월 불필요한 여가·외식비에서 <strong className="text-amber-400">1만 엔(￥10,000)</strong>만 줄여 신NISA 투자로 돌리면, 복리 효과로 FIRE 은퇴 목표 달성이 <strong className="text-emerald-400">약 {savedMonths}개월 더 빨라집니다!</strong>
            </p>
          </div>

          {/* 가이드 2: 현금 비중 리밸런싱 추천 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                추천 현금흐름 황금 비율 (Ideal Ratio)
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">권장 가이드</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              가장 안정적이고 빠른 FIRE 진입 비율: <strong className="text-rose-300">소비 35%</strong> : <strong className="text-indigo-300">안전저축 15%</strong> : <strong className="text-purple-300">성장투자 50%</strong>. 현재 소비 비중({expenseRate.toFixed(0)}%)을 조절해 보세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
