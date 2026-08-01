'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { Asset } from '@/types/asset';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { ShieldCheck, Zap, Lock, TrendingDown } from 'lucide-react';

type LiquidityTier = {
  label: string;
  sublabel: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  filter: (a: Asset) => boolean;
};

export default function LiquidityMatrix() {
  const { assets, isPrivate } = useAssetStore();
  const { getEssentialExpense } = useCashflowStore();

  const fmt = (val: number) => (isPrivate ? '￥ ••••••••' : formatJPY(val));

  const essentialExpense = getEssentialExpense();

  const tiers: LiquidityTier[] = [
    {
      label: '즉시 환금',
      sublabel: '24~72시간 (현금/보통예금)',
      description: '즉시 출금 가능한 예금 및 보통예금 자산',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      filter: (a) => a.category === 'CASH',
    },
    {
      label: '단기 환금',
      sublabel: '30일 이내 (주식 / ETF / 신NISA)',
      description: '매도 후 수일 내 현금화 가능한 주식, ETF, 신NISA 자산',
      icon: <TrendingDown className="w-4 h-4 text-cyan-400" />,
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      filter: (a) => a.category === 'STOCK' || a.category === 'NISA',
    },
    {
      label: '중기 환금',
      sublabel: '60세 이후 (iDeCo / 연금)',
      description: '60세까지 인출 제한이 있는 iDeCo 및 절세 연금 자산',
      icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
      filter: (a) => a.category === 'PENSION' || a.category === 'IDECO',
    },
    {
      label: '비유동 자산',
      sublabel: '1년 이상 (부동산 / 실물 / 기타)',
      description: '환금에 시간이 소요되는 임대 보증금, 부동산 및 실물 자산',
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
          <Tooltip content="위기 발생 시 자산을 현금화할 수 있는 속도별(즉시/단기/중기/비유동) 분류와 필수 생활비 방어 기간을 시각화합니다." />
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          위기 시 현금화 스피드별 자산 분류 및 비상금 안전망 달성도 (엔화 ￥ 기준)
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
                <div className="flex items-center gap-1.5 font-semibold">
                  {tier.icon}
                  <span className="text-xs">{tier.label}</span>
                  <Tooltip content={tier.description} />
                </div>
              </div>

              <div className="text-xl font-extrabold text-white font-mono mb-1">
                {fmt(tierTotal)}
              </div>
              <div className="text-xs text-zinc-400">총 자산의 {tierRatio}%</div>

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
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              🆘 비상 예비금 방어망 달성도
              <Tooltip content="즉시 출금 가능한 현금 자산만으로 3개월, 6개월, 12개월, 24개월 필수 생활비를 충당할 수 있는지 측정합니다." />
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              즉시 환금 가능 현금 자산으로 몇 개월의 필수 생활비를 방어할 수 있는지 측정합니다.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 block">월간 필수 생활비</span>
            <span className="text-lg font-bold text-rose-400 font-mono">
              {fmt(essentialExpense)} / 월
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
                <span className="text-zinc-400 font-medium">{months}개월 예비금 ({fmt(required)})</span>
                <span className={isMet ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
                  {isMet ? '✅ 달성 완료' : `${progress.toFixed(0)}% 달성`}
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
