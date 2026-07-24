'use client';

import React, { useState } from 'react';
import { useCashflowStore } from '@/store/useCashflowStore';
import { Clock, Calculator, Target } from 'lucide-react';

const VALUE_TAGS = [
  { label: '🏥 건강 / 의료', value: 'HEALTH' },
  { label: '📚 배움 / 성장', value: 'GROWTH' },
  { label: '👨‍👩‍👧 가족 / 관계', value: 'FAMILY' },
  { label: '🍽️ 식사 / 생활', value: 'ESSENTIAL' },
  { label: '✈️ 경험 / 여행', value: 'EXPERIENCE' },
  { label: '🎮 오락 / 취미', value: 'LEISURE' },
  { label: '🛍️ 소비 / 물건', value: 'PURCHASE' },
];

export default function TimePriceCalculator() {
  const { getTotalIncome } = useCashflowStore();

  const totalMonthlyIncome = getTotalIncome();
  // 월 소득 기반 실질 시간당 임금 연산 (월 160시간 기준, 실질 가처분의 80% 적용)
  const hourlyRealWage = totalMonthlyIncome > 0
    ? Math.round((totalMonthlyIncome * 0.8) / 160)
    : 20000;

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedTag, setSelectedTag] = useState('ESSENTIAL');

  const priceNum = Number(price) || 0;
  const hoursRequired = hourlyRealWage > 0 ? (priceNum / hourlyRealWage).toFixed(1) : '0';
  const daysRequired = hourlyRealWage > 0 ? (priceNum / (hourlyRealWage * 8)).toFixed(1) : '0';

  const getValueJudgment = () => {
    const hours = parseFloat(hoursRequired);
    if (hours <= 1) return { text: '✅ 가볍게 결정 가능한 금액입니다', color: 'text-emerald-400' };
    if (hours <= 8) return { text: '💛 1일 이내 — 신중하게 선택하세요', color: 'text-amber-400' };
    if (hours <= 40) return { text: '⚠️ 1주일 이상 — 충분히 고민하세요', color: 'text-orange-400' };
    return { text: '🚨 1개월 이상 — 가치관 기준 재점검 필요', color: 'text-rose-400' };
  };

  const judgment = priceNum > 0 ? getValueJudgment() : null;

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            Time-Price 지출 가치 계산기
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            내 노동 시간 기준으로 지출의 진짜 가격을 측정합니다
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-2 text-xs">
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span className="text-zinc-400">실질 시간당 임금:</span>
          <span className="text-white font-bold font-mono">₩ {hourlyRealWage.toLocaleString()}/hr</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-5">
          <h3 className="text-sm font-semibold text-zinc-300">지출 항목 입력</h3>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">구매하려는 것</label>
            <input
              type="text"
              placeholder="예: 새 노트북, 여행 경비, 저녁 외식"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">금액 (원)</label>
            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 font-mono"
            />
            {price && (
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                ₩ {priceNum.toLocaleString()} 원
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-2">가치 카테고리</label>
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
          <h3 className="text-sm font-semibold text-zinc-300">💡 노동 시간으로 환산하면?</h3>

          {priceNum > 0 ? (
            <>
              <div className="space-y-4">
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 text-center">
                  <p className="text-xs text-zinc-400 mb-1">
                    {itemName || '이 지출'}을 위해 필요한 노동 시간
                  </p>
                  <div className="text-4xl font-extrabold text-amber-400 font-mono">
                    {hoursRequired}
                  </div>
                  <p className="text-sm text-zinc-400 mt-0.5">시간 (hours)</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">근무일수 환산</p>
                    <div className="text-xl font-bold text-cyan-400 font-mono">{daysRequired}일</div>
                  </div>
                  <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-400 mb-1">시간당 임금</p>
                    <div className="text-xl font-bold text-zinc-200 font-mono">₩{hourlyRealWage.toLocaleString()}</div>
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
              금액을 입력하면 노동 시간 환산 결과가 표시됩니다
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
