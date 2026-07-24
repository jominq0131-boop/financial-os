'use client';

import React, { useState } from 'react';
import { useTimelineStore } from '@/store/useTimelineStore';
import { useAssetStore } from '@/store/useAssetStore';
import { EVENT_CATEGORY_LABELS } from '@/types/timeline';
import { Calendar, Plus, Trash2, Milestone } from 'lucide-react';
import AddEventModal from './AddEventModal';

export default function LifeEventSection() {
  const { getSortedEvents, deleteEvent, getTotalRequiredTarget, currentAge } = useTimelineStore();
  const { getTotalNetWorth, isPrivate } = useAssetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = getSortedEvents();
  const totalRequired = getTotalRequiredTarget();
  const totalNetWorth = getTotalNetWorth();

  const formatCurrency = (val: number) => {
    if (isPrivate) return '••••••••';
    return `₩ ${val.toLocaleString()}`;
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Milestone className="w-5 h-5 text-amber-400" />
            생애 주기 이정표 타임라인 (Life Financial Timeline)
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            내 삶의 핵심 미션 연령대별 필요 자금 목표 (현재 연령: 만 {currentAge}세)
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>미션 이벤트 추가</span>
        </button>
      </div>

      {/* Timeline Event Cards */}
      <div className="relative border-l-2 border-zinc-800 ml-4 pl-6 space-y-6">
        {events.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/30 border border-zinc-800/60 rounded-3xl text-zinc-500 text-sm">
            등록된 생애 미션 이벤트가 없습니다. [미션 이벤트 추가] 버튼을 눌러보세요.
          </div>
        ) : (
          events.map((evt) => {
            const categoryInfo = EVENT_CATEGORY_LABELS[evt.category];
            const isTargetReached = totalNetWorth >= evt.requiredAmount;

            return (
              <div key={evt.id} className="relative group">
                {/* Timeline Dot Node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-900 border-2 border-amber-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>

                {/* Event Card */}
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryInfo.icon}</span>
                      <h3 className="text-base font-bold text-white">{evt.title}</h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                        {evt.targetAge}세 ({evt.targetYear}년)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          isTargetReached
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {isTargetReached ? '자금 달성 완료' : '준비 진행 중'}
                      </span>
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-zinc-800/50 text-xs">
                    <p className="text-zinc-400">{evt.description || '인생 목표 미션 이벤트'}</p>
                    <div className="text-base font-extrabold text-amber-400 font-mono">
                      {formatCurrency(evt.requiredAmount)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Timeline Total Summary */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-cyan-400" /> 총 등록된 생애 미션 필요 자금 합계
        </span>
        <span className="text-sm font-bold text-white font-mono">
          {formatCurrency(totalRequired)}
        </span>
      </div>

      {/* Add Modal */}
      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
