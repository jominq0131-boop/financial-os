'use client';

import React, { useState } from 'react';
import { useHoldingStore } from '@/store/useHoldingStore';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import { ACCOUNT_TYPE_LABELS, Holding } from '@/types/holding';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { TrendingUp, Plus, Trash2, Edit3, DollarSign, RefreshCw, Layers } from 'lucide-react';
import AddHoldingModal from './AddHoldingModal';
import EditHoldingModal from './EditHoldingModal';

export default function StockPortfolioSection() {
  const isHydrated = useHydrated();
  const { isPrivate } = useAssetStore();
  const {
    holdings: stockList,
    deleteHolding,
    getTotalInvestment,
    getTotalEvaluation,
    getTotalUnrealizedGain,
  } = useHoldingStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Holding | null>(null);

  const totalCost = getTotalInvestment();
  const totalEval = getTotalEvaluation();
  const { amount: gainAmount, rate: gainRate } = getTotalUnrealizedGain();

  const fmt = (val: number) => {
    if (!isHydrated) return '￥ 0';
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(val);
  };

  const isPositive = gainAmount >= 0;

  return (
    <section className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 md:p-7 backdrop-blur-xl space-y-6 hover:border-zinc-700 transition">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            주식 / ETF 종목별 수익률 기록기
            <Tooltip content="개별 주식 및 ETF의 평균매입가, 현재가(수기), 수량을 기록하여 종목별 및 전체 포트폴리오 평가손익(%)을 추적합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            신NISA 및 특정계좌 보유 종목의 실시간 평가금액 및 수익률 수기 기록
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>종목 추가</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Cost */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4">
          <span className="text-xs text-zinc-400 font-mono block mb-1">총 매입금액 (Cost)</span>
          <div className="text-xl font-extrabold text-zinc-200 font-mono">
            {fmt(totalCost)}
          </div>
        </div>

        {/* Total Evaluation */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4">
          <span className="text-xs text-zinc-400 font-mono block mb-1">현재 평가금액 (Eval)</span>
          <div className="text-xl font-extrabold text-white font-mono">
            {fmt(totalEval)}
          </div>
        </div>

        {/* Total Profit / Loss */}
        <div className={`bg-zinc-950/60 border rounded-2xl p-4 ${
          isPositive ? 'border-emerald-500/30' : 'border-rose-500/30'
        }`}>
          <span className="text-xs text-zinc-400 font-mono block mb-1">총 평가손익 (Profit/Loss)</span>
          <div className={`text-xl font-extrabold font-mono flex items-center gap-2 ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            <span>{isPositive ? '+' : ''}{fmt(gainAmount)}</span>
            <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
              isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {isPositive ? '+' : ''}{isHydrated ? gainRate : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Holdings List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[11px]">
            <tr>
              <th className="py-3 px-4">종목 (Ticker)</th>
              <th className="py-3 px-4">계좌 유형</th>
              <th className="py-3 px-4 text-right">수량</th>
              <th className="py-3 px-4 text-right">평균 매입가</th>
              <th className="py-3 px-4 text-right">현재가 (수기)</th>
              <th className="py-3 px-4 text-right">평가금액 (엔화)</th>
              <th className="py-3 px-4 text-right">손익 (수익률)</th>
              <th className="py-3 px-4 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {stockList.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-zinc-500 text-sm">
                  등록된 주식/ETF 종목이 없습니다. [종목 추가] 버튼으로 첫 종목을 추가하세요.
                </td>
              </tr>
            ) : (
              stockList.map((item) => {
                const rate = item.currency === 'USD' ? (item.exchangeRate || 150) : 1;
                const itemCost = item.quantity * item.avgCostPrice * rate;
                const itemEval = item.quantity * item.currentPrice * rate;
                const itemGain = itemEval - itemCost;
                const itemGainRate = itemCost > 0 ? ((itemGain / itemCost) * 100).toFixed(2) : '0';
                const isGain = itemGain >= 0;
                const accountBadge = ACCOUNT_TYPE_LABELS[item.accountType];

                return (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition">
                    {/* Ticker & Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white font-mono flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-400 text-[10px]">
                          {item.ticker}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {item.notes && (
                        <div className="text-[10px] text-zinc-500 mt-0.5">{item.notes}</div>
                      )}
                    </td>

                    {/* Account Type */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${accountBadge.badgeColor}`}>
                        {accountBadge.label}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-200">
                      {isHydrated ? item.quantity.toLocaleString() : 0} 주
                    </td>

                    {/* Avg Cost */}
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-400">
                      {item.currency === 'USD' ? '$' : '￥'}
                      {item.avgCostPrice.toLocaleString()}
                    </td>

                    {/* Current Price */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                      {item.currency === 'USD' ? '$' : '￥'}
                      {item.currentPrice.toLocaleString()}
                    </td>

                    {/* Evaluation JPY */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-100">
                      {fmt(itemEval)}
                    </td>

                    {/* Gain / Rate */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <div className={`font-extrabold ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isGain ? '+' : ''}{fmt(itemGain)}
                      </div>
                      <div className={`text-[10px] ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                        ({isGain ? '+' : ''}{itemGainRate}%)
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1 text-zinc-400 hover:text-cyan-400 transition"
                          title="수정"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteHolding(item.id)}
                          className="p-1 text-zinc-500 hover:text-rose-400 transition"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddHoldingModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditHoldingModal
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        holding={editingItem}
      />
    </section>
  );
}
