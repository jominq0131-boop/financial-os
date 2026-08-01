'use client';

import React, { useState, useEffect } from 'react';
import { Asset, AssetCategory, BucketTier } from '@/types/asset';
import { useAssetStore } from '@/store/useAssetStore';
import { X } from 'lucide-react';

interface EditAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
}

export default function EditAssetModal({ isOpen, onClose, asset }: EditAssetModalProps) {
  const { updateAsset } = useAssetStore();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('CASH');
  const [tier, setTier] = useState<BucketTier>('TIER_1_SAFETY');
  const [amount, setAmount] = useState<number>(0);
  const [expectedYield, setExpectedYield] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (asset) {
      setName(asset.name);
      setCategory(asset.category);
      setTier(asset.tier);
      setAmount(asset.amount);
      setExpectedYield(asset.expectedYield || 0);
      setNotes(asset.notes || '');
    }
  }, [asset]);

  if (!isOpen || !asset) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateAsset(asset.id, {
      name,
      category,
      tier,
      amount: Number(amount),
      expectedYield: Number(expectedYield),
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          ✏️ 자산 정보 수정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">자산명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">자산 카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="CASH">현금 / 예금</option>
                <option value="NISA">신NISA 비과세</option>
                <option value="STOCK">특정/일반 주식·ETF</option>
                <option value="IDECO">iDeCo 연금</option>
                <option value="REAL_ESTATE">부동산 / 보증금</option>
                <option value="OTHERS">기타 자산</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">배분 Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as BucketTier)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="TIER_1_SAFETY">Tier 1: 안전망 (비상금)</option>
                <option value="TIER_2_GROWTH">Tier 2: 성장 자산</option>
                <option value="TIER_3_MISSION">Tier 3: 미션/시도 자산</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">평가 금액 (엔 ￥)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                min={0}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">기대 연 수익률 (%)</label>
              <input
                type="number"
                step="0.1"
                value={expectedYield}
                onChange={(e) => setExpectedYield(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">비고 / 메모</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="예: SBI증권 주식 계좌"
            />
          </div>

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
