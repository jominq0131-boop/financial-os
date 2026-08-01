'use client';

import React, { useState } from 'react';
import { useCashflowStore } from '@/store/useCashflowStore';
import { formatJPY } from '@/utils/currency';
import Tooltip from '@/components/common/Tooltip';
import { Clock, Calculator, AlertCircle, ShoppingBag } from 'lucide-react';

const VALUE_CATEGORIES = [
  { label: '🏥 건강 / 의료', value: 'HEALTH' },
  { label: '📚 배움 / 자기계발', value: 'GROWTH' },
  { label: '👨‍👩‍👧 가족 / 인간관계', value: 'FAMILY' },
  { label: '🍽️ 식사 / 필수생활', value: 'ESSENTIAL' },
  { label: '✈️ 경험 / 여행', value: 'EXPERIENCE' },
  { label: '🎮 여가 / 취미', value: 'LEISURE' },
  { label: '🛍️ 소유 / 물욕 지출', value: 'PURCHASE' },
];

export default function TimePriceCalculator() {
  const { getTotalIncome } = useCashflowStore();
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('PURCHASE');

  const monthlyIncome = getTotalIncome();
  // 실수령 시급 = 월 실수령 수입 × 0.8(가처분 비율) ÷ 160시간(월 노동시간)
  const realHourlyWage = monthlyIncome > 0
    ? Math.round((monthlyIncome * 0.8) / 160)
    : 1750; // 기본값: 1,750엔/시간 (월 35만엔 기준)

  const priceNum = Number(price) || 0;
  const hoursRequired = realHourlyWage > 0 ? Number((priceNum / realHourlyWage).toFixed(1)) : 0;
  const daysRequired = Number((hoursRequired / 8).toFixed(1)); // 8시간 기준 근무일수

  const getDecisionGuide = (hours: number) => {
    if (hours <= 0) return null;
    if (hours <= 1) return { text: '✅ 망설임 없이 구매해도 좋은 부담 없는 금액입니다', color: 'text-emerald-400' };
    if (hours <= 8) return { text: '💛 근무 하루 분량 — 진정한 가치와 필요성을 점검해보세요', color: 'text-amber-400' };
    if (hours <= 40) return { text: '⚠️ 1주일 분량 노동 — 신중하게 며칠간 고민 후 결정하세요', color: 'text-orange-400' };
    return { text: '🚨 한 달 이상의 노동 시간 — 장기 재정 목표에 미칠 영향을 재점검하세요', color: 'text-rose-400' };
  };

  const guide = getDecisionGuide(hoursRequired);

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            시간-가격 지출 가치 평가기 (Time-Price Calculator)
            <Tooltip content="내가 지출하려는 금액을 내 실제 시급 노동 시간으로 환산하여 소비의 진정한 가치를 평가하는 도구입니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            단순 돈의 액수가 아닌 나의 노동 시간(Real Hourly Wage)을 기준으로 지출 비용을 평가합니다.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-mono">
          <span className="text-zinc-400">내 실질 시급: </span>
          <span className="font-bold text-emerald-400">￥ {realHourlyWage.toLocaleString()} / 시간</span>
          <Tooltip content="월 실수령액 × 80% ÷ 160시간 기준으로 계산된 나의 실질 시급입니다." />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            지출하려는 항목 정보 입력
          </h3>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5 font-medium">무엇을 구매하려고 하시나요?</label>
            <input
              type="text"
              placeholder="예: 신형 최신 노트북, 해외 여행, 위스키"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5 font-medium flex items-center">
              지출 예정 금액 (엔 / JPY)
              <Tooltip content="구매하려는 물건이나 서비스의 가격(엔화 ￥)을 입력하세요." />
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="예: 250000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-mono"
              />
              {priceNum > 0 && (
                <span className="absolute right-3 top-2.5 text-xs text-zinc-400 font-mono">
                  {formatJPY(priceNum)} (엔)
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-2 font-medium">소비 가치 분류</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VALUE_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-2 rounded-xl text-xs font-medium border text-left transition ${
                    category === cat.value
                      ? 'bg-zinc-800 border-cyan-500/80 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Output Result */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-emerald-400" />
              💡 내 노동 시간 환산 평가 결과
            </h3>

            {priceNum > 0 ? (
              <div className="space-y-4">
                <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 text-center">
                  <span className="text-xs text-zinc-400 block mb-1">
                    「{itemName || '이 지출'}」을 위해 일해야 하는 노동 시간
                  </span>
                  <div className="text-4xl font-extrabold text-white font-mono my-1">
                    {hoursRequired}{' '}
                    <span className="text-base font-normal text-zinc-400">시간</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-800/60">
                    <div>
                      <p className="text-[11px] text-zinc-400 mb-0.5">근무일수 환산 (일 8시간)</p>
                      <div className="text-lg font-bold text-cyan-400 font-mono">{daysRequired} 일</div>
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-400 mb-0.5">실질 적용 시급</p>
                      <div className="text-lg font-bold text-emerald-400 font-mono">
                        ￥{realHourlyWage.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {guide && (
                  <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-4 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className={`text-xs font-medium ${guide.color}`}>{guide.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-2xl">
                금액을 입력하시면 내 노동 시간 환산 결과가 즉시 표시됩니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
