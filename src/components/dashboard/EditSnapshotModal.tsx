'use client';

import React, { useState, useEffect } from 'react';
import { NetWorthSnapshot, useSnapshotStore } from '@/store/useSnapshotStore';
import { X } from 'lucide-react';

interface EditSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshot: NetWorthSnapshot | null;
}

export default function EditSnapshotModal({ isOpen, onClose, snapshot }: EditSnapshotModalProps) {
  const { updateSnapshot } = useSnapshotStore();

  const [date, setDate] = useState('');
  const [netWorth, setNetWorth] = useState<string>('0');
  const [totalCash, setTotalCash] = useState<string>('0');
  const [totalInvestments, setTotalInvestments] = useState<string>('0');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (snapshot) {
      setDate(snapshot.date);
      setNetWorth(String(snapshot.netWorth));
      setTotalCash(String(snapshot.totalCash));
      setTotalInvestments(String(snapshot.totalInvestments));
      setNote(snapshot.note || '');
    }
  }, [snapshot]);

  if (!isOpen || !snapshot) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date.trim()) return;

    updateSnapshot(snapshot.id, {
      date,
      netWorth: Number(netWorth) || 0,
      totalCash: Number(totalCash) || 0,
      totalInvestments: Number(totalInvestments) || 0,
      note,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          ✏️ 월간 총자산 스냅샷 수정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">정산년월 (YYYY-MM)</label>
            <input
              type="month"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              required
            />
            <p className="text-[11px] text-zinc-400 mt-1">예: 2026-07 (지난달 7월 정산 데이터인 경우)</p>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">총자산 금액 (엔 ￥)</label>
            <input
              type="number"
              value={netWorth}
              onChange={(e) => {
                const strVal = e.target.value;
                setNetWorth(strVal);
                const val = Number(strVal) || 0;
                const cashVal = Number(totalCash) || 0;
                setTotalInvestments(String(Math.max(0, val - cashVal)));
              }}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">현금성 자산 (엔 ￥)</label>
              <input
                type="number"
                value={totalCash}
                onChange={(e) => {
                  const cashStr = e.target.value;
                  setTotalCash(cashStr);
                  const cashVal = Number(cashStr) || 0;
                  const nwVal = Number(netWorth) || 0;
                  setTotalInvestments(String(Math.max(0, nwVal - cashVal)));
                }}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">투자 자산 (엔 ￥)</label>
              <input
                type="number"
                value={totalInvestments}
                onChange={(e) => setTotalInvestments(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">메모 / 비고</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="예: 7월 보너스 적립 완료"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition text-xs"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition text-xs shadow-lg shadow-emerald-900/30"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
