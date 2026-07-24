'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { Asset } from '@/types/asset';
import { ShieldCheck, Zap, Lock, TrendingDown } from 'lucide-react';

type LiquidityTier = {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  filter: (a: Asset) => boolean;
};

export default function LiquidityMatrix() {
  const { assets, isPrivate } = useAssetStore();
  const { getEssentialExpense } = useCashflowStore();

  const formatCurrency = (val: number) => {
    if (isPrivate) return '••••••••';
    return `₩ ${val.toLocaleString()}`;
  };

  const essentialExpense = getEssentialExpense();

  const tiers: LiquidityTier[] = [
    {
      label: '즉시 현금화',
      sublabel: 'Instant (24~72hr)',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      filter: (a) => a.category === 'CASH',
    },
    {
      label: '단기 현금화',
      sublabel: '30일 이내 (ETF / 주식)',
      icon: <TrendingDown className="w-4 h-4 text-cyan-400" />,
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      filter: (a) => a.category === 'STOCK',
    },
    {
      label: '중기 현금화',
      sublabel: '1년 이내 (연금)',
      icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
      filter: (a) => a.category === 'PENSION',
    },
    {
      label: '비유동 자산',
      sublabel: '1년 이상 (부동산 / 실물)',
      icon: <Lock className="w-4 h-4 text-amber-400" />,
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
      filter: (a) => a.category === 'REAL_ESTATE' || a.category === 'OTHERS',
    },
  ];

  const totalNetWorth = assets.reduce((sum, a) => sum + a.amount, 0);

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          유동성 매트릭스 & 자산 방어망 (Liquidity Matrix)
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          위기 시 현금화 속도별 자산 분류 및 안전망 충족도
        </p>
      </div>

      {/* Liquidity Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const tierAssets = assets.filter(tier.filter);
          const tierTotal = tierAssets.reduce((sum, a) => sum + a.amount, 0);
          const tierRatio = totalNetWorth > 0 ? ((tierTotal / totalNetWorth) * 100).toFixed(1) : '0';

          return (
            <div
              key={tier.label}
              className={`bg-zinc-900/60 border rounded-2xl p-4 backdrop-blur-md ${tier.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  {tier.icon}
                  <span className="text-xs font-semibold">{tier.label}</span>
                </div>
                <span className="text-[11px] text-zinc-400">{tier.sublabel}</span>
              </div>

              <div className="text-xl font-extrabold text-white font-mono mb-1">
                {formatCurrency(tierTotal)}
              </div>
              <div className="text-xs text-zinc-400">전체 자산의 {tierRatio}%</div>

              {/* Bar Indicator */}
              <div className="mt-3 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-current transition-all duration-500"
                  style={{ width: `${tierRatio}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Coverage Meter */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-bold text-white">🆘 비상금 방어망 충족도</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              즉시 현금화 가능 자산으로 필수 지출을 몇 개월 방어할 수 있는지 확인
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 block">월 필수 생계비</span>
            <span className="text-lg font-bold text-rose-400 font-mono">
              {formatCurrency(essentialExpense)} / 월
            </span>
          </div>
        </div>

        {[3, 6, 12, 24].map((months) => {
          const instantCash = assets.filter((a) => a.category === 'CASH').reduce((sum, a) => sum + a.amount, 0);
          const required = essentialExpense * months;
          const isMet = instantCash >= required;
          const progress = Math.min(100, essentialExpense > 0 ? (instantCash / required) * 100 : 100);

          return (
            <div key={months} className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 font-medium">{months}개월 비상금 ({formatCurrency(required)})</span>
                <span className={isMet ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
                  {isMet ? '✅ 충족' : `${progress.toFixed(0)}% 달성`}
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isMet ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
