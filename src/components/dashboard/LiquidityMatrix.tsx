'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { Asset } from '@/types/asset';
import { formatJPY } from '@/utils/currency';
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

  const fmt = (val: number) => (isPrivate ? '¥ ••••••' : formatJPY(val));

  const essentialExpense = getEssentialExpense();

  const tiers: LiquidityTier[] = [
    {
      label: '即時換金',
      sublabel: '24〜72時間 (現金/普通預金)',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      filter: (a) => a.category === 'CASH',
    },
    {
      label: '短期換金',
      sublabel: '30日以内 (株式 / ETF / NISA)',
      icon: <TrendingDown className="w-4 h-4 text-cyan-400" />,
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      filter: (a) => a.category === 'STOCK' || a.category === 'NISA',
    },
    {
      label: '中期換金',
      sublabel: '60歳以降 (iDeCo)',
      icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
      filter: (a) => a.category === 'PENSION' || a.category === 'IDECO',
    },
    {
      label: '非流動資産',
      sublabel: '1年以上 (不動産 / その他)',
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
          流動性マトリクス & 資産防衛網
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          危機時の換金スピード別資産分類と安全網達成度
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
                {fmt(tierTotal)}
              </div>
              <div className="text-xs text-zinc-400">総資産の {tierRatio}%</div>

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
            <h3 className="text-base font-bold text-white">🆘 緊急予備費 防衛網達成度</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              即時換金可能資産で、何ヶ月の生活費を守れるか
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 block">月間必須生活費</span>
            <span className="text-lg font-bold text-rose-400 font-mono">
              {fmt(essentialExpense)} / 月
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
                <span className="text-zinc-400 font-medium">{months}ヶ月 予備費 ({fmt(required)})</span>
                <span className={isMet ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
                  {isMet ? '✅ 達成' : `${progress.toFixed(0)}% 達成`}
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
