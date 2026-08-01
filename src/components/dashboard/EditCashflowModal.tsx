'use client';

import React, { useState, useEffect } from 'react';
import { CashflowItem, CashflowType } from '@/types/cashflow';
import { useCashflowStore } from '@/store/useCashflowStore';
import { X } from 'lucide-react';

interface EditCashflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CashflowItem | null;
}

export default function EditCashflowModal({ isOpen, onClose, item }: EditCashflowModalProps) {
  const { updateItem } = useCashflowStore();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<CashflowType>('EXPENSE_FIXED');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [isEssential, setIsEssential] = useState(true);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setType(item.type);
      setAmount(item.amount);
      setCategory(item.category);
      setIsEssential(item.isEssential);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateItem(item.id, {
      title,
      type,
      amount: Number(amount),
      category,
      isEssential,
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
          ✏️ 현금흐름 항목 수정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">항목명</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">구분</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as CashflowType)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="INCOME_ACTIVE">근로/사업 수입</option>
                <option value="INCOME_PASSIVE">배당/자산 수입</option>
                <option value="EXPENSE_FIXED">고정 지출</option>
                <option value="EXPENSE_VARIABLE">변동/가치 지출</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="주거">주거 (월세/공과금)</option>
                <option value="식비">식비 (장보기/외식)</option>
                <option value="고정비">고정비 (통신/수수료)</option>
                <option value="여가">여가 (취미/자기계발)</option>
                <option value="투자">투자 (NISA/적립)</option>
                <option value="기타">기타</option>
                <option value="급여">급여 (수입)</option>
                <option value="배당">배당 (수입)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">월 금액 (엔 ￥)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              min={0}
              required
            />
          </div>

          {(type === 'EXPENSE_FIXED' || type === 'EXPENSE_VARIABLE') && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isEssential"
                checked={isEssential}
                onChange={(e) => setIsEssential(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-0"
              />
              <label htmlFor="isEssential" className="text-xs text-zinc-300">
                필수 생존 지출 (비상금 생존기간 계산에 포함)
              </label>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
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
