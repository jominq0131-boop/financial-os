'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useTimelineStore } from '@/store/useTimelineStore';
import { run50YearSimulation } from '@/engine/simulationEngine';
import { formatJPYShort } from '@/utils/currency';
import TooltipHelp from '@/components/common/Tooltip';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Sliders, Info } from 'lucide-react';

import { useSettingsStore } from '@/store/useSettingsStore';

export default function ForecastChart() {
  const { getTotalNetWorth, isPrivate } = useAssetStore();
  const { getNetSurplus } = useCashflowStore();
  const { events } = useTimelineStore();
  const { currentAge } = useSettingsStore();

  const [expectedYield, setExpectedYield] = useState(6.0); // 기본 6%
  const [inflationRate, setInflationRate] = useState(2.0); // 기본 2%

  const totalNetWorth = getTotalNetWorth();
  const annualSurplus = getNetSurplus() * 12; // 월 잉여금 * 12

  const simulationData = run50YearSimulation(
    currentAge,
    totalNetWorth,
    annualSurplus,
    expectedYield,
    inflationRate,
    events
  );

  // 최고 자산 규모 파악하여 축 단위 판단 (1억엔 이상은 억엔, 미만은 만엔)
  const maxWorth = Math.max(...simulationData.map((d) => d.netWorth));
  const isOver100M = maxWorth >= 100000000;

  // 차트 렌더링용 데이터 변환
  const chartData = simulationData.map((d) => ({
    ...d,
    netWorthDisplay: isOver100M
      ? Number((d.netWorth / 100000000).toFixed(2))
      : Math.round(d.netWorth / 10000),
    labelAge: `${d.age}세`,
  }));

  const formatVal = (val: number) => {
    if (isPrivate) return '￥ ••••••••';
    return formatJPYShort(val);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            50년 미래 자산 시뮬레이션 (Life Forecast Engine)
            <TooltipHelp content="현재 자산, 월 순잉여금, 연간 투자수익률, 물가상승률 및 등록된 생애 마일스톤 지출을 복합 연산하여 50년간의 자산 곡선을 시뮬레이션합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            연간 잉여금 + 기대수익률 - 생애 미션 이벤트 지출을 반영한 장기 자산 곡선 (엔화 ￥ 기준)
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-2 text-xs">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">수익률:</span>
            <input
              type="number"
              step="0.5"
              value={expectedYield}
              onChange={(e) => setExpectedYield(Number(e.target.value))}
              className="w-12 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-center font-bold text-emerald-400 focus:outline-none"
            />
            <span className="text-zinc-400">%</span>
          </div>
          <div className="flex items-center gap-2 border-l border-zinc-800 pl-3">
            <span className="text-zinc-400">물가상승:</span>
            <input
              type="number"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-12 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-center font-bold text-amber-400 focus:outline-none"
            />
            <span className="text-zinc-400">%</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Card */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="labelAge" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} unit={isOver100M ? '억엔' : '만엔'} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3 shadow-2xl text-xs space-y-1">
                        <div className="font-bold text-white">
                          {data.age}세 ({data.year}년)
                        </div>
                        <div className="text-emerald-400 font-extrabold font-mono text-sm">
                          예상 자산: {formatVal(data.netWorth)}
                        </div>
                        {data.eventTitle && (
                          <div className="text-amber-400 pt-1 border-t border-zinc-800 font-medium">
                            🎯 미션 지출: {data.eventTitle} ({formatVal(data.eventAmount || 0)})
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="netWorthDisplay"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorNetWorth)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Info Banner */}
        <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/60 pt-3">
          <span className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-400" />
            실질 연간 성과: <strong className="text-zinc-200">{(expectedYield - inflationRate).toFixed(1)}%</strong> (기대수익률 {expectedYield}% - 물가상승률 {inflationRate}%)
          </span>
          <span className="text-zinc-500 font-mono">50년 몬테카를로 복리 시뮬레이션</span>
        </div>
      </div>
    </section>
  );
}
