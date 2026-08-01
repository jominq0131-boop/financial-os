'use client';

import React, { useState } from 'react';
import {
  useMonthlySpendingStore,
  SPENDING_CATEGORIES,
  CATEGORY_META,
  TEMPERATURE_THRESHOLDS,
  SpendingCategory,
  MonthlySpendingRecord,
} from '@/store/useMonthlySpendingStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import {
  Thermometer, Plus, Save, Trash2, ChevronDown, ChevronUp,
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Flame, Leaf,
} from 'lucide-react';

type CategoryInputs = Record<SpendingCategory, string>;

const EMPTY_INPUTS: CategoryInputs = {
  주거: '',
  식비: '',
  고정비: '',
  여가: '',
  교통: '',
  기타: '',
};

function getTemperatureStatus(changePercent: number): {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  if (changePercent > TEMPERATURE_THRESHOLDS.DANGER) {
    return {
      label: '위험',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
    };
  }
  if (changePercent > TEMPERATURE_THRESHOLDS.WARNING) {
    return {
      label: '주의',
      icon: <Flame className="w-3.5 h-3.5" />,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
    };
  }
  if (changePercent < TEMPERATURE_THRESHOLDS.SAVING) {
    return {
      label: '절약',
      icon: <Leaf className="w-3.5 h-3.5" />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    };
  }
  return {
    label: '안정',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  };
}

export default function SpendingTemperatureCard() {
  const isHydrated = useHydrated();
  const { records, upsertRecord, deleteRecord, getTwoMonths } = useMonthlySpendingStore();
  const { getCategoryExpenses, getTotalExpense } = useCashflowStore();

  const todayMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);
  const [inputs, setInputs] = useState<CategoryInputs>(EMPTY_INPUTS);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load selected month's data into form
  const existingRecord = useMonthlySpendingStore.getState().getRecord(selectedMonth);

  const handleOpenForm = () => {
    const rec = useMonthlySpendingStore.getState().getRecord(selectedMonth);
    if (rec) {
      setInputs({
        주거: String(rec.주거 || ''),
        식비: String(rec.식비 || ''),
        고정비: String(rec.고정비 || ''),
        여가: String(rec.여가 || ''),
        교통: String(rec.교통 || ''),
        기타: String(rec.기타 || ''),
      });
    } else {
      setInputs(EMPTY_INPUTS);
    }
    setShowForm(true);
  };

  const handleSave = () => {
    upsertRecord(selectedMonth, {
      주거: Number(inputs.주거) || 0,
      식비: Number(inputs.식비) || 0,
      고정비: Number(inputs.고정비) || 0,
      여가: Number(inputs.여가) || 0,
      교통: Number(inputs.교통) || 0,
      기타: Number(inputs.기타) || 0,
    });
    setShowForm(false);
  };

  // Get latest two months for comparison
  const { current, prev } = getTwoMonths();

  // Budget categories from cashflow store (for reference)
  const budgetCategories = getCategoryExpenses();
  const totalBudget = getTotalExpense();
  const currentTotal = current
    ? SPENDING_CATEGORIES.reduce((sum, cat) => sum + (current[cat] || 0), 0)
    : 0;
  const budgetUsedPercent = totalBudget > 0 ? Math.min(200, Math.round((currentTotal / totalBudget) * 100)) : 0;

  return (
    <section className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 md:p-7 backdrop-blur-xl hover:border-zinc-700 transition space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-rose-400" />
            월별 지출 온도계 (Spending Temperature)
            <Tooltip content="매월 카테고리별 실제 지출액을 기록하고, 전월 대비 증감률을 온도계로 시각화합니다. 위험(🔴 +30%), 주의(🔥 +10%), 안정(✅), 절약(💚 -10%)으로 판정합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            실제 지출 기록 → 전월 대비 카테고리별 증감 비교 & 위험 지출 감지
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
          >
            {/* Generate last 12 months */}
            {Array.from({ length: 12 }, (_, i) => {
              const d = new Date();
              d.setMonth(d.getMonth() - i);
              const val = d.toISOString().slice(0, 7);
              return (
                <option key={val} value={val}>
                  {val.replace('-', '년 ')}월
                </option>
              );
            })}
          </select>
          <button
            onClick={showForm ? () => setShowForm(false) : handleOpenForm}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold hover:bg-rose-500/20 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            {existingRecord ? '지출 수정' : '지출 기록'}
          </button>
        </div>
      </div>

      {/* Input Form */}
      {showForm && (
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 space-y-4 animate-fade-in">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            ✏️ {selectedMonth.replace('-', '년 ')}월 실제 지출 기록
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SPENDING_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <div key={cat}>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">
                    {meta.emoji} {cat}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">￥</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={inputs[cat]}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [cat]: e.target.value }))
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-rose-500/60"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs text-zinc-400 font-mono">
              이번 달 합계:{' '}
              <strong className="text-white">
                {formatJPY(
                  SPENDING_CATEGORIES.reduce((s, c) => s + (Number(inputs[c]) || 0), 0)
                )}
              </strong>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 rounded-xl border border-zinc-800 text-zinc-400 text-xs hover:bg-zinc-800 transition"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-400 transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Temperature Comparison Table */}
      {!current ? (
        <div className="text-center py-10 text-zinc-500 text-sm space-y-3">
          <Thermometer className="w-10 h-10 mx-auto text-zinc-700" />
          <p>아직 기록된 지출 데이터가 없습니다.</p>
          <p className="text-xs">위 [지출 기록] 버튼으로 이번 달 실제 지출액을 카테고리별로 입력해주세요.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Month Label */}
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
            <span>카테고리</span>
            <div className="flex gap-8">
              <span>{prev ? `${prev.month.replace('-', '년 ')}월` : '이전 기록 없음'}</span>
              <span className="text-white font-bold">{current.month.replace('-', '년 ')}월 (기준)</span>
              <span className="w-20 text-right">증감 / 상태</span>
            </div>
          </div>

          {/* Category Rows */}
          <div className="space-y-2">
            {SPENDING_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const currentAmt = current[cat] || 0;
              const prevAmt = prev ? (prev[cat] || 0) : 0;
              const diff = currentAmt - prevAmt;
              const changePercent = prevAmt > 0 ? (diff / prevAmt) * 100 : (currentAmt > 0 ? 100 : 0);
              const status = getTemperatureStatus(changePercent);
              const hasPrev = !!prev;

              return (
                <div
                  key={cat}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                    hasPrev && Math.abs(changePercent) > 1
                      ? `${status.bgColor} ${status.borderColor}`
                      : 'bg-zinc-900/40 border-zinc-800/60'
                  }`}
                >
                  {/* Category label */}
                  <div className="flex items-center gap-2 w-24">
                    <span className="text-base">{meta.emoji}</span>
                    <span className="text-xs font-semibold text-white">{cat}</span>
                  </div>

                  {/* Values */}
                  <div className="flex items-center gap-6 text-xs font-mono">
                    <span className="text-zinc-400 w-24 text-right">
                      {hasPrev ? formatJPYShort(prevAmt) : '—'}
                    </span>
                    <span className="text-white font-bold w-24 text-right">
                      {formatJPYShort(currentAmt)}
                    </span>
                    <div className="flex items-center gap-1.5 w-32 justify-end">
                      {hasPrev && diff !== 0 ? (
                        <>
                          <span className={diff > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                            {diff > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          </span>
                          <span className={diff > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                            {diff > 0 ? '+' : ''}{formatJPYShort(diff)}
                          </span>
                          <span className={`text-[11px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-medium ${status.color} ${status.bgColor} border ${status.borderColor}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </>
                      ) : hasPrev ? (
                        <span className="text-cyan-400 flex items-center gap-0.5 text-[11px]">
                          <Minus className="w-3 h-3" /> 변동 없음
                        </span>
                      ) : (
                        <span className="text-zinc-600 text-[11px]">전월 없음</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Summary Bar */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-rose-400" />
                {current.month.replace('-', '년 ')}월 총 실제 지출
              </span>
              <span className="font-extrabold text-white font-mono text-lg">{formatJPY(currentTotal)}</span>
            </div>

            {/* vs Budget bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>등록 예산 총계: {formatJPYShort(totalBudget)}</span>
                <span className={budgetUsedPercent > 100 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  예산 {budgetUsedPercent}% 사용
                </span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800/80">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetUsedPercent > 100
                      ? 'bg-rose-500'
                      : budgetUsedPercent > 80
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, budgetUsedPercent)}%` }}
                />
              </div>
              {budgetUsedPercent > 100 && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  예산 {formatJPYShort(currentTotal - totalBudget)} 초과! 지출 조정이 필요합니다.
                </p>
              )}
            </div>

            {/* Prev month total comparison */}
            {prev && (
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-1 border-t border-zinc-800/60">
                <span>{prev.month.replace('-', '년 ')}월 총 지출: {formatJPYShort(
                  SPENDING_CATEGORIES.reduce((s, c) => s + (prev[c] || 0), 0)
                )}</span>
                {(() => {
                  const prevTotal = SPENDING_CATEGORIES.reduce((s, c) => s + (prev[c] || 0), 0);
                  const totalDiff = currentTotal - prevTotal;
                  const totalPct = prevTotal > 0 ? ((totalDiff / prevTotal) * 100).toFixed(1) : '0';
                  return (
                    <span className={totalDiff > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {totalDiff > 0 ? '+' : ''}{formatJPYShort(totalDiff)} ({totalDiff > 0 ? '+' : ''}{totalPct}%)
                    </span>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* History List */}
      <div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
        >
          {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          지출 기록 이력 ({records.length}건)
        </button>

        {showHistory && records.length > 0 && (
          <div className="mt-3 space-y-1.5 animate-fade-in">
            {[...records].sort((a, b) => b.month.localeCompare(a.month)).map((rec) => {
              const total = SPENDING_CATEGORIES.reduce((s, c) => s + (rec[c] || 0), 0);
              return (
                <div
                  key={rec.id}
                  className="flex items-center justify-between bg-zinc-950/60 border border-zinc-800/60 rounded-xl px-4 py-2.5 text-xs hover:border-zinc-700 transition group"
                >
                  <span className="text-zinc-300 font-mono font-medium">{rec.month.replace('-', '년 ')}월</span>
                  <span className="text-white font-bold font-mono">{formatJPY(total)}</span>
                  <button
                    onClick={() => deleteRecord(rec.month)}
                    className="text-zinc-600 hover:text-rose-400 transition opacity-0 group-hover:opacity-100 p-1"
                    title="기록 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
