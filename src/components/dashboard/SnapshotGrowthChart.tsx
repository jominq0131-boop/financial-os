'use client';

import React, { useState } from 'react';
import { useSnapshotStore, NetWorthSnapshot } from '@/store/useSnapshotStore';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from 'recharts';
import { Camera, TrendingUp, TrendingDown, Trash2, Calendar, Edit3 } from 'lucide-react';
import EditSnapshotModal from './EditSnapshotModal';
import ConfettiOverlay from '@/components/common/ConfettiOverlay';

export default function SnapshotGrowthChart() {
  const isHydrated = useHydrated();
  const { snapshots, addSnapshot, deleteSnapshot } = useSnapshotStore();
  const { getTotalNetWorth, assets, isPrivate } = useAssetStore();

  const todayDate = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(todayDate);
  const [noteInput, setNoteInput] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [editingSnapshot, setEditingSnapshot] = useState<NetWorthSnapshot | null>(null);

  const currentNetWorth = getTotalNetWorth();
  const [showConfetti, setShowConfetti] = useState(false);
  const cashTotal = assets
    .filter((a) => a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);
  const investmentTotal = currentNetWorth - cashTotal;

  // 오늘 날짜 YYYY-MM
  const handleCaptureSnapshot = () => {
    addSnapshot({
      date: selectedMonth || todayDate,
      netWorth: currentNetWorth,
      totalCash: cashTotal,
      totalInvestments: investmentTotal,
      note: noteInput || '정기 월간 총자산 스냅샷',
    });
    setNoteInput('');
    setShowNoteInput(false);
    setShowConfetti(true);
  };

  // 스냅샷 데이터 가공 (전월 대비 증감 연산)
  const chartData = snapshots.map((s, idx) => {
    const prev = idx > 0 ? snapshots[idx - 1] : null;
    const diff = prev ? s.netWorth - prev.netWorth : 0;
    const diffPercent = prev && prev.netWorth > 0 ? ((diff / prev.netWorth) * 100).toFixed(1) : '0';

    return {
      ...s,
      diff,
      diffPercent,
      displayNetWorth: s.netWorth,
      displayCash: s.totalCash,
      displayInvestments: s.totalInvestments,
    };
  });

  const latestSnapshot = chartData[chartData.length - 1];
  const prevSnapshot = chartData.length > 1 ? chartData[chartData.length - 2] : null;
  const momGrowth = prevSnapshot ? currentNetWorth - prevSnapshot.netWorth : 0;
  const momPercent = prevSnapshot && prevSnapshot.netWorth > 0 ? ((momGrowth / prevSnapshot.netWorth) * 100).toFixed(1) : 0;

  const yFormatter = (val: number) => {
    if (!isHydrated || isPrivate) return '';
    if (val >= 100000000) return `${(val / 100000000).toFixed(1)}억엔`;
    return `${Math.round(val / 10000)}만엔`;
  };

  return (
    <>
    <ConfettiOverlay
      isVisible={showConfetti}
      message="📸 스냅샷 저장 완료! 월간 총자산 기록!"
      onComplete={() => setShowConfetti(false)}
    />
    <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 backdrop-blur-xl hover:border-zinc-700 transition space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📸 월간 총자산 스냅샷 & 성장 트래커
            <Tooltip content="매월 자산 현황을 스냅샷으로 기록하여 총자산 월별 성장 추이와 증감액(MoM)을 추적합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            월별 총자산 추이 및 전월 대비 증감 시각화
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!showNoteInput ? (
            <button
              onClick={() => setShowNoteInput(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-900/20"
            >
              <Camera className="w-3.5 h-3.5" /> 스냅샷 기록
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 p-2 rounded-2xl">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="메모 (예: 7월 보너스 적립)"
                className="bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 w-36"
              />
              <button
                onClick={handleCaptureSnapshot}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-xl font-medium"
              >
                저장
              </button>
              <button
                onClick={() => setShowNoteInput(false)}
                className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-xl hover:text-white"
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Growth Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4">
          <span className="text-xs text-zinc-400 block mb-1">현재 총자산</span>
          <span className="text-lg font-bold text-white font-mono">
            {isPrivate ? '••••••••' : formatJPY(currentNetWorth)}
          </span>
        </div>

        <div className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4">
          <span className="text-xs text-zinc-400 block mb-1">전월 대비 증감 (MoM)</span>
          <span
            className={`text-lg font-bold font-mono flex items-center gap-1 ${
              Number(momGrowth) >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {Number(momGrowth) >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {isPrivate ? '••••' : `${formatJPY(momGrowth)} (${momPercent}%)`}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4">
          <span className="text-xs text-zinc-400 block mb-1">기록된 스냅샷 수</span>
          <span className="text-lg font-bold text-purple-400 font-mono">
            {snapshots.length} 개월치
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        {isHydrated && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} tickFormatter={yFormatter} />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [
                  isPrivate ? '••••••••' : formatJPY(Number(value)),
                  '총자산',
                ]}
              />
              <Area
                type="monotone"
                dataKey="displayNetWorth"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#growthGradient)"
              />
              <Bar dataKey="displayInvestments" fill="#8b5cf6" opacity={0.6} radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-zinc-400">
            기록된 스냅샷이 없습니다. 상단 &quot;스냅샷 기록&quot; 버튼을 클릭하세요.
          </div>
        )}
      </div>

      {/* Snapshot List Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          스냅샷 기록 이력
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {snapshots.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between bg-zinc-800/40 border border-zinc-800/80 rounded-xl px-3.5 py-2 text-xs group"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-zinc-300 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {s.date}
                </span>
                <span className="text-zinc-400 font-mono">
                  {isPrivate ? '••••' : formatJPYShort(s.netWorth)}
                </span>
                {s.note && <span className="text-zinc-400 text-[11px]">({s.note})</span>}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => setEditingSnapshot(s)}
                  className="text-zinc-400 hover:text-emerald-400 p-1"
                  title="스냅샷 수정"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteSnapshot(s.id)}
                  className="text-zinc-500 hover:text-rose-400 p-1"
                  title="스냅샷 삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Snapshot Modal */}
      <EditSnapshotModal
        isOpen={Boolean(editingSnapshot)}
        onClose={() => setEditingSnapshot(null)}
        snapshot={editingSnapshot}
      />
    </div>
    </>
  );
}
