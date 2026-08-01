'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { TIER_LABELS, BucketTier } from '@/types/asset';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Layers, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BucketSection() {
  const { getTierAllocation, setTargetRatio, isPrivate, getTotalNetWorth } = useAssetStore();

  const allocations = getTierAllocation();
  const totalNetWorth = getTotalNetWorth();

  const formatVal = (val: number) => {
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(val);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'TIER_1_SAFETY':
        return { text: 'text-emerald-400', bg: 'bg-emerald-500', barBg: 'from-emerald-500 to-teal-400' };
      case 'TIER_2_GROWTH':
        return { text: 'text-cyan-400', bg: 'bg-cyan-500', barBg: 'from-cyan-500 to-blue-400' };
      case 'TIER_3_MISSION':
        return { text: 'text-amber-400', bg: 'bg-amber-500', barBg: 'from-amber-500 to-orange-400' };
      default:
        return { text: 'text-zinc-400', bg: 'bg-zinc-500', barBg: 'from-zinc-500 to-zinc-400' };
    }
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            3-Tier 자본 배치 버킷 (Capital Allocation Buckets)
            <Tooltip content="자산을 안전망(Tier 1), 장기성장(Tier 2), 목표미션(Tier 3) 3단계 버킷으로 분류하여 최적의 리밸런싱 비율을 유지하는 전략 관리 도구입니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            안전망(Safety), 성장(Growth), 미션/꿈(Mission) 자본의 목표 비중 및 리밸런싱 가이드 (엔화 ￥ 기준)
          </p>
        </div>
      </div>

      {/* 3-Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {allocations.map((item) => {
          const style = getTierColor(item.tier);
          const diffRatio = Number((item.currentRatio - item.targetRatio).toFixed(1));
          const diffAmount = Math.round(totalNetWorth * (Math.abs(diffRatio) / 100));
          const tierInfo = TIER_LABELS[item.tier as BucketTier];

          return (
            <div
              key={item.tier}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center">
                    {tierInfo.label}
                    <Tooltip content={tierInfo.description} />
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.text} bg-zinc-800 border border-zinc-700/60`}>
                    {item.currentRatio}%
                  </span>
                </div>

                <div className="text-2xl font-extrabold text-white font-mono tracking-tight mb-2">
                  {formatVal(item.currentAmount)}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>현재: {item.currentRatio}%</span>
                    <span>목표: {item.targetRatio}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${style.barBg} transition-all duration-500`}
                      style={{ width: `${Math.min(100, item.currentRatio)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Target Ratio Control Slider */}
              <div className="pt-4 border-t border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <label htmlFor={`slider-${item.tier}`}>목표 비중 조율</label>
                  <span className="font-bold text-white">{item.targetRatio}%</span>
                </div>
                <input
                  id={`slider-${item.tier}`}
                  aria-label={`${tierInfo.label} 목표 비중 조율`}
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={item.targetRatio}
                  onChange={(e) => setTargetRatio(item.tier, Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />

                {/* Rebalancing Suggestion Badge */}
                <div className="pt-1 text-[11px]">
                  {Math.abs(diffRatio) <= 2 ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 목표 비중 유지 중
                    </span>
                  ) : diffRatio < 0 ? (
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {formatVal(diffAmount)} 추가 매수 추천 ({Math.abs(diffRatio)}% 부족)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-cyan-400 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> 목표 대비 {diffRatio}% 초과 (리밸런싱 고려)
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
