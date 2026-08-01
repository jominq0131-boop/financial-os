'use client';

import React, { useState } from 'react';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useAssetStore } from '@/store/useAssetStore';
import { calculateFinancialRunway } from '@/engine/runwayEngine';
import { CASHFLOW_TYPE_LABELS, CashflowType } from '@/types/cashflow';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Flame, Plus, Trash2, ArrowUpRight, ArrowDownRight, Activity, Edit3 } from 'lucide-react';
import EditCashflowModal from './EditCashflowModal';
import EmergencyFundCard from './EmergencyFundCard';
import { CashflowItem } from '@/types/cashflow';

export default function RunwaySection() {
  const { items, addItem, deleteItem, getTotalIncome, getTotalExpense, getEssentialExpense, getNetSurplus } =
    useCashflowStore();
  const { assets, isPrivate } = useAssetStore();

  // Tier 1 (안전망/현금) 유동 자산 합계
  const liquidAssets = assets
    .filter((a) => a.tier === 'TIER_1_SAFETY' || a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const essentialExpense = getEssentialExpense();
  const netSurplus = getNetSurplus();

  // 자가배당월수입 (패시브 소득)
  const passiveIncome = items
    .filter((i) => i.type === 'INCOME_PASSIVE')
    .reduce((sum, i) => sum + i.amount, 0);

  const runwayResult = calculateFinancialRunway(liquidAssets, essentialExpense, passiveIncome);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CashflowType>('EXPENSE_FIXED');
  const [amount, setAmount] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CashflowItem | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    addItem({
      title,
      type,
      amount: Number(amount),
      category: type.includes('INCOME') ? '수입' : '지출',
      isEssential: true,
    });

    setTitle('');
    setAmount('');
    setShowAddForm(false);
  };

  const formatVal = (val: number) => {
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(val);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Runway Banner Card */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono flex items-center">
                Financial Runway Status
                <Tooltip content="소득이 끊겼을 때 보유 중인 현금성 안전 자산만으로 버틸 수 있는 생존 가능 기간입니다." />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              소득 중단 시 생존 가능 기간: <span className="text-cyan-400">{runwayResult.runwayYears}</span>
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl">
              {runwayResult.description} (기준 유동 자산: {formatVal(liquidAssets)})
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end justify-center bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 min-w-[200px]">
            <span className="text-xs text-zinc-400 font-medium mb-1 flex items-center">
              월 실질 순버닝 (Burn Rate)
              <Tooltip content="매월 반드시 지출되는 필수 생활비에서 자동으로 발생하는 배당/패시브 소득을 뺀 실질 순지출액입니다." />
            </span>
            <span className="text-xl font-bold text-rose-400 font-mono">
              {formatVal(runwayResult.netBurnRate)} / 월
            </span>
            <span className="text-[11px] text-zinc-500 mt-1">필수 지출 - 패시브 배당</span>
          </div>
        </div>
      </div>

      {/* 3-Month Emergency Fund Strategy Card */}
      <EmergencyFundCard />

      {/* Cashflow Tank & Grid Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          월 현금 흐름 탱크 (Monthly Cashflow Tank)
          <Tooltip content="수입과 지출의 월별 캐시플로우를 관리하여 순잉여금을 연산하는 모듈입니다." />
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>항목 추가</span>
        </button>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Monthly Income */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>총 월 수입 (근로 + 배당)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {formatVal(totalIncome)}
          </div>
        </div>

        {/* Total Monthly Expense */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>총 월 지출 (고정 + 변동)</span>
            <ArrowDownRight className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-mono">
            {formatVal(totalExpense)}
          </div>
        </div>

        {/* Monthly Net Surplus */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="flex items-center">
              월 순잉여금 (Net Surplus)
              <Tooltip content="월 수입에서 총 지출을 뺀 순 자축/투자 여력 금액입니다." />
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">잉여율 {totalIncome > 0 ? ((netSurplus / totalIncome) * 100).toFixed(0) : 0}%</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">
            {formatVal(netSurplus)}
          </div>
        </div>
      </div>

      {/* Add Cashflow Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 animate-fade-in">
          <h4 className="text-sm font-bold text-white">현금 흐름 항목 추가</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              placeholder="항목명 (예: 월급, 월세, 통신비)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-600 focus:outline-none"
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CashflowType)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              {Object.entries(CASHFLOW_TYPE_LABELS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="월 엔화 금액 (예: 85000)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-600 focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end gap-2 text-xs">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200"
            >
              등록
            </button>
          </div>
        </form>
      )}

      {/* Cashflow Item List */}
      <div className="space-y-2">
        {items.map((item) => {
          const info = CASHFLOW_TYPE_LABELS[item.type];
          return (
            <div
              key={item.id}
              className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800/60 rounded-xl px-4 py-3 hover:border-zinc-700 transition group"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    info.isIncome
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {info.label}
                </span>
                <span className="text-sm font-medium text-white">{item.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold font-mono ${
                    info.isIncome ? 'text-emerald-400' : 'text-zinc-200'
                  }`}
                >
                  {info.isIncome ? '+' : '-'}{formatVal(item.amount)}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-zinc-400 hover:text-emerald-400 p-1"
                    title="항목 수정"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-zinc-500 hover:text-rose-400 p-1"
                    title="항목 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Cashflow Modal */}
      <EditCashflowModal
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        item={editingItem}
      />
    </section>
  );
}
