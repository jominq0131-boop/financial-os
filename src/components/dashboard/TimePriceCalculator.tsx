'use client';

import React, { useState } from 'react';
import { useCashflowStore } from '@/store/useCashflowStore';
import { Clock, Calculator, Target } from 'lucide-react';

const VALUE_TAGS = [
  { label: '🏥 健康 / 医療', value: 'HEALTH' },
  { label: '📚 学習 / 成長', value: 'GROWTH' },
  { label: '👨‍👩‍👧 家族 / 人間関係', value: 'FAMILY' },
  { label: '🍽️ 食事 / 生活必需', value: 'ESSENTIAL' },
  { label: '✈️ 体験 / 旅行', value: 'EXPERIENCE' },
  { label: '🎮 娯楽 / 趣味', value: 'LEISURE' },
  { label: '🛍️ モノ / 物欲', value: 'PURCHASE' },
];

export default function TimePriceCalculator() {
  const { getTotalIncome } = useCashflowStore();

  const totalMonthlyIncome = getTotalIncome();
  // 月収ベース 実質時給 = 月収 × 0.8（可処分率）÷ 160時間（月間労働時間）
  const hourlyRealWage = totalMonthlyIncome > 0
    ? Math.round((totalMonthlyIncome * 0.8) / 160)
    : 1750; // デフォルト: 1,750円/hr（月収35万 × 0.8 ÷ 160）

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedTag, setSelectedTag] = useState('ESSENTIAL');

  const priceNum = Number(price) || 0;
  const hoursRequired = hourlyRealWage > 0 ? (priceNum / hourlyRealWage).toFixed(1) : '0';
  const daysRequired = hourlyRealWage > 0 ? (priceNum / (hourlyRealWage * 8)).toFixed(1) : '0';

  const getValueJudgment = () => {
    const hours = parseFloat(hoursRequired);
    if (hours <= 1) return { text: '✅ 迷わず決断できる金額です', color: 'text-emerald-400' };
    if (hours <= 8) return { text: '💛 1日以内 — 価値を確認してから', color: 'text-amber-400' };
    if (hours <= 40) return { text: '⚠️ 1週間分 — じっくり考えよう', color: 'text-orange-400' };
    return { text: '🚨 1ヶ月分超 — 価値観・優先度を再確認', color: 'text-rose-400' };
  };

  const judgment = priceNum > 0 ? getValueJudgment() : null;

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            Time-Price 支出価値計算機
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            労働時間を基準に「本当のコスト」を可視化する
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-2 text-xs">
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span className="text-zinc-400">実質時給:</span>
          <span className="text-white font-bold font-mono">¥{hourlyRealWage.toLocaleString('ja-JP')}/hr</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-5">
          <h3 className="text-sm font-semibold text-zinc-300">支出項目を入力</h3>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">何を購入しようとしていますか？</label>
            <input
              type="text"
              placeholder="例: 新しいノートPC、旅行費、外食"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">金額（円）</label>
            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 font-mono"
            />
            {price && (
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                ¥{priceNum.toLocaleString('ja-JP')} 円
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-2">価値カテゴリ</label>
            <div className="flex flex-wrap gap-2">
              {VALUE_TAGS.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => setSelectedTag(tag.value)}
                  className={`text-xs px-3 py-1 rounded-full border transition ${
                    selectedTag === tag.value
                      ? 'bg-zinc-100 text-black border-transparent font-semibold'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-5">
          <h3 className="text-sm font-semibold text-zinc-300">💡 労働時間に換算すると？</h3>

          {priceNum > 0 ? (
            <>
              <div className="space-y-4">
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 text-center">
                  <p className="text-xs text-zinc-400 mb-1">
                    「{itemName || 'この支出'}」に必要な労働時間
                  </p>
                  <div className="text-4xl font-extrabold text-amber-400 font-mono">
                    {hoursRequired}
                  </div>
                  <p className="text-sm text-zinc-400 mt-0.5">時間 (hours)</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">勤務日数換算</p>
                    <div className="text-xl font-bold text-cyan-400 font-mono">{daysRequired}日</div>
                  </div>
                  <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">実質時給</p>
                    <div className="text-xl font-bold text-zinc-200 font-mono">¥{hourlyRealWage.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {judgment && (
                <div className="pt-4 border-t border-zinc-800/60">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                    <p className={`text-sm font-semibold ${judgment.color}`}>
                      {judgment.text}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
              金額を入力すると労働時間換算結果が表示されます
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
