'use client';

import React from 'react';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import {
  Thermometer, TrendingUp, TrendingDown, CheckCircle, Flame, AlertTriangle, Leaf, PieChart as PieIcon, ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from 'recharts';

const CATEGORY_META: Record<string, { emoji: string; color: string }> = {
  주거: { emoji: '🏠', color: '#ef4444' },
  식비: { emoji: '🍚', color: '#f97316' },
  고정비: { emoji: '⚡', color: '#eab308' },
  여가: { emoji: '🎮', color: '#ec4899' },
  교통: { emoji: '🚃', color: '#06b6d4' },
  저축: { emoji: '🏦', color: '#6366f1' },
  투자: { emoji: '📈', color: '#a855f7' },
  기타: { emoji: '📦', color: '#71717a' },
};

export default function SpendingTemperatureCard() {
  const isHydrated = useHydrated();
  const { items, getTotalIncome, getTotalExpense } = useCashflowStore();
  const { isPrivate } = useAssetStore();

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();

  // 현금흐름 탱크(items) 기반으로 카테고리별 소비 지출 자동 집계
  const expenseItems = items.filter(
    (i) => i.type === 'EXPENSE_FIXED' || i.type === 'EXPENSE_VARIABLE'
  );

  const categoryMap: Record<string, number> = {};
  expenseItems.forEach((i) => {
    const cat = i.category || '기타';
    categoryMap[cat] = (categoryMap[cat] || 0) + i.amount;
  });

  const donutChartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_META[name]?.color || '#8b5cf6',
  }));

  const formatVal = (val: number) => {
    if (!isHydrated) return '￥ 0';
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(val);
  };

  const getStatus = (percent: number) => {
    if (percent >= 35) {
      return {
        label: '과다 비중 🔴',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        desc: '전체 소비 지출 중 높은 비중을 차지합니다.',
      };
    }
    if (percent >= 20) {
      return {
        label: '주의 필요 🔥',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        desc: '지속적인 모니터링이 권장되는 비중입니다.',
      };
    }
    return {
      label: '적정 안정 ✅',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      desc: '안정적인 비중으로 유지되고 있습니다.',
    };
  };

  return (
    <section className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 md:p-7 backdrop-blur-xl hover:border-zinc-700 transition space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-rose-400" />
            월별 지출 온도계 & 소비 비중 분석 (Spending Temperature)
            <Tooltip content="등록된 현금흐름 지출 데이터를 기반으로 별도의 이중 입력 없이 카테고리별 소비 비중과 안전/주의/위험 온도를 실시간 자동 모니터링합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            현금흐름 탱크 데이터 100% 자동 연동 ➔ 카테고리별 소비 비중 및 온도 자동 판정
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          ⚡ 자동 집계 연동 (입력 불필요)
        </span>
      </div>

      {/* Donut Chart & Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Pie Chart */}
        <div className="md:col-span-5 h-52 w-full">
          {isHydrated && donutChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#18181b" strokeWidth={2} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [isPrivate ? '••••••••' : formatJPY(Number(val)), '월 소비액']}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-zinc-500">
              등록된 지출 항목이 없습니다. 상단 현금흐름 탱크에서 항목을 추가하세요.
            </div>
          )}
        </div>

        {/* Category Rows with Status Badges */}
        <div className="md:col-span-7 space-y-2">
          {Object.entries(categoryMap).map(([catName, amount]) => {
            const percent = totalExpense > 0 ? Number(((amount / totalExpense) * 100).toFixed(1)) : 0;
            const meta = CATEGORY_META[catName] || { emoji: '📦', color: '#71717a' };
            const status = getStatus(percent);

            return (
              <div
                key={catName}
                className="flex items-center justify-between text-xs bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-2.5 hover:border-zinc-700 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{meta.emoji}</span>
                  <span className="font-bold text-white">{catName}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-zinc-400">{percent}%</span>
                  <span className="font-mono font-extrabold text-zinc-100">{formatVal(amount)}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${status.bgColor} ${status.color} ${status.borderColor}`}>
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Temperature Status */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white block">월 총 소비 지출: {formatVal(totalExpense)}</span>
            <span className="text-zinc-400 text-[11px]">
              총 수입({formatVal(totalIncome)}) 대비 소비 지출 비중:{' '}
              <strong className="text-emerald-400 font-mono">
                {totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(1) : 0}%
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px]">지출 데이터 이중 입력 0건 (자동 연동 완료)</span>
        </div>
      </div>
    </section>
  );
}
