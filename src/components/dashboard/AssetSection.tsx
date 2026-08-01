'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { CATEGORY_LABELS, AssetCategory } from '@/types/asset';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Plus, Trash2, Shield, Eye, EyeOff, Edit3 } from 'lucide-react';
import AddAssetModal from './AddAssetModal';
import EditAssetModal from './EditAssetModal';
import { Asset } from '@/types/asset';

export default function AssetSection() {
  const { assets, isPrivate, togglePrivacy, deleteAsset } = useAssetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'ALL'>('ALL');

  const filteredAssets = selectedCategory === 'ALL'
    ? assets
    : assets.filter((a) => a.category === selectedCategory);

  const formatAmount = (val: number) => {
    if (isPrivate) return '￥ ••••••••';
    return formatJPY(val);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            자산 포트폴리오 (Asset Breakdown)
            <Tooltip content="등록된 자산들의 카테고리별 유동성, 엔화(JPY ￥) 평가액 및 기대수익률을 관리합니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            등록된 자산 항목별 유동성 및 실시간 평가액 (엔화 ￥ 기준)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Privacy Toggle Button */}
          <button
            onClick={togglePrivacy}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition"
            title="금액 마스킹 토글"
          >
            {isPrivate ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
            <span>{isPrivate ? '마스킹 켜짐' : '금액 표시'}</span>
          </button>

          {/* Add Asset Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition"
          >
            <Plus className="w-4 h-4" />
            <span>자산 추가</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
            selectedCategory === 'ALL'
              ? 'bg-zinc-100 text-black font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          전체 ({assets.length})
        </button>

        {Object.entries(CATEGORY_LABELS).map(([catKey, item]) => {
          const count = assets.filter((a) => a.category === catKey).length;
          return (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey as AssetCategory)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                selectedCategory === catKey
                  ? 'bg-zinc-100 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-zinc-900/30 border border-zinc-800/60 rounded-3xl text-zinc-500 text-sm">
            등록된 자산 항목이 없습니다. 우측 상단의 [자산 추가] 버튼을 눌러보세요.
          </div>
        ) : (
          filteredAssets.map((asset) => {
            const categoryInfo = CATEGORY_LABELS[asset.category];
            return (
              <div
                key={asset.id}
                className="group relative bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-400 px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center">
                      {categoryInfo.label}
                      <Tooltip content={categoryInfo.description} />
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => setEditingAsset(asset)}
                        className="text-zinc-400 hover:text-emerald-400 p-1"
                        title="자산 수정"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAsset(asset.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1"
                        title="자산 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{asset.name}</h3>
                  <div className="text-2xl font-extrabold text-zinc-100 font-mono tracking-tight">
                    {formatAmount(asset.amount)}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/50 mt-4 flex items-center justify-between text-xs text-zinc-400">
                  <span>기대수익률: <strong className="text-emerald-400">+{asset.expectedYield}%</strong></span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {asset.tier.replace('TIER_', 'Tier ')}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Asset Modal */}
      <AddAssetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Edit Asset Modal */}
      <EditAssetModal
        isOpen={Boolean(editingAsset)}
        onClose={() => setEditingAsset(null)}
        asset={editingAsset}
      />
    </section>
  );
}
