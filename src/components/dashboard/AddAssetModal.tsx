'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { AssetCategory, BucketTier, CATEGORY_LABELS, TIER_LABELS } from '@/types/asset';
import Tooltip from '@/components/common/Tooltip';
import { X } from 'lucide-react';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAssetModal({ isOpen, onClose }: AddAssetModalProps) {
  const addAsset = useAssetStore((state) => state.addAsset);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('STOCK');
  const [tier, setTier] = useState<BucketTier>('TIER_2_GROWTH');
  const [amount, setAmount] = useState('');
  const [expectedYield, setExpectedYield] = useState('4.5');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    addAsset({
      name,
      category,
      tier,
      amount: Number(amount),
      expectedYield: Number(expectedYield),
      currency: 'JPY',
    });

    // Reset & Close
    setName('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold text-white">신규 자산 추가</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-zinc-400 mb-1 font-medium flex items-center">
              자산명
              <Tooltip content="예: 미국 S&P500 ETF, 비상금 보통예금, 신NISA 올컨트리 등 보유 자산 이름을 입력하세요." />
            </label>
            <input
              type="text"
              placeholder="예: 미국 S&P500 ETF, 비상금 보통예금"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                자산 카테고리
                <Tooltip content={CATEGORY_LABELS[category].description} />
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                버킷 분류 (Tier)
                <Tooltip content={TIER_LABELS[tier].description} />
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as BucketTier)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600"
              >
                <option value="TIER_1_SAFETY">Tier 1: 안전망</option>
                <option value="TIER_2_GROWTH">Tier 2: 성장</option>
                <option value="TIER_3_MISSION">Tier 3: 미션/꿈</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                평가 금액 (엔 / JPY)
                <Tooltip content="현재 자산의 엔화(JPY ￥) 평가 금액을 숫자만 입력하세요." />
              </label>
              <input
                type="number"
                placeholder="엔화 금액 (예: 1000000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                기대 수익률 (%)
                <Tooltip content="연간 예상 투자 수익률 또는 배당 수익률 (%)을 입력하세요." />
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="4.5"
                value={expectedYield}
                onChange={(e) => setExpectedYield(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              자산 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
