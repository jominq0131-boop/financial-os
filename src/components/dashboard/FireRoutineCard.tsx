'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRoutineStore, FIRE_ROUTINES, MAX_XP_PER_MONTH } from '@/store/useRoutineStore';
import { useHydrated } from '@/hooks/useHydrated';
import ConfettiOverlay from '@/components/common/ConfettiOverlay';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Flame, Zap, Trophy } from 'lucide-react';
import Tooltip from '@/components/common/Tooltip';

export default function FireRoutineCard() {
  const isHydrated = useHydrated();
  const { toggleRoutine, getRecord, getMonthXP, getCompletionRate } = useRoutineStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMsg, setConfettiMsg] = useState('');
  const prevCompletedCountRef = useRef(0);

  // Month navigation
  const todayMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);

  const navigateMonth = (dir: -1 | 1) => {
    const [y, m] = selectedMonth.split('-').map(Number);
    const d = new Date(y, m - 1 + dir, 1);
    setSelectedMonth(d.toISOString().slice(0, 7));
  };

  const record = getRecord(selectedMonth);
  const completedIds = record?.completedIds ?? [];
  const monthXP = getMonthXP(selectedMonth);
  const completionRate = getCompletionRate(selectedMonth);
  const allDone = completedIds.length === FIRE_ROUTINES.length;

  // Confetti on full completion
  useEffect(() => {
    if (!isHydrated) return;
    const prev = prevCompletedCountRef.current;
    const current = completedIds.length;
    if (current > prev && current === FIRE_ROUTINES.length) {
      setConfettiMsg('🔥 이번 달 FIRE 루틴 완료! 완벽합니다!');
      setShowConfetti(true);
    }
    prevCompletedCountRef.current = current;
  }, [completedIds.length, isHydrated]);

  const xpPercent = Math.min(100, Math.round((monthXP / MAX_XP_PER_MONTH) * 100));

  const getXpColor = () => {
    if (xpPercent >= 100) return 'bg-amber-400';
    if (xpPercent >= 70) return 'bg-emerald-500';
    if (xpPercent >= 40) return 'bg-cyan-500';
    return 'bg-zinc-600';
  };

  const formatMonth = (m: string) => {
    const [y, mo] = m.split('-');
    return `${y}년 ${mo}월`;
  };

  return (
    <>
      <ConfettiOverlay
        isVisible={showConfetti}
        message={confettiMsg}
        onComplete={() => setShowConfetti(false)}
      />

      <section className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 md:p-7 backdrop-blur-xl hover:border-zinc-700 transition space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              FIRE 습관 루틴 체크리스트
              <Tooltip content="매월 반복해야 할 FIRE 달성 루틴을 완료할 때마다 XP를 획득합니다. 전체 완료 시 폭죽 팡파르가 터집니다!" />
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              월간 재정 루틴 달성으로 FIRE 습관을 만들어가세요
            </p>
          </div>

          {/* Month Navigator */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-white font-mono w-28 text-center">
              {formatMonth(selectedMonth)}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              disabled={selectedMonth >= todayMonth}
              className="p-1.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              이번 달 루틴 XP
            </span>
            <span className="font-extrabold text-amber-400 font-mono text-sm">
              {isHydrated ? monthXP : 0} / {MAX_XP_PER_MONTH} XP
            </span>
          </div>
          <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800/80">
            <div
              className={`h-full rounded-full transition-all duration-700 ${getXpColor()}`}
              style={{ width: `${isHydrated ? xpPercent : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>달성률 {isHydrated ? completionRate : 0}% ({completedIds.length}/{FIRE_ROUTINES.length})</span>
            {allDone && isHydrated && (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Trophy className="w-3 h-3" /> 이번 달 완주!
              </span>
            )}
          </div>
        </div>

        {/* Routine Checklist */}
        <div className="space-y-2">
          {FIRE_ROUTINES.map((routine) => {
            const isDone = isHydrated && completedIds.includes(routine.id);
            return (
              <button
                key={routine.id}
                onClick={() => toggleRoutine(selectedMonth, routine.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition group ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-700/40 hover:border-emerald-600/60'
                    : 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-800/30'
                }`}
              >
                {/* Checkbox Icon */}
                <div className={`shrink-0 transition-transform group-hover:scale-110 ${isDone ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  {isDone
                    ? <CheckCircle2 className="w-6 h-6" />
                    : <Circle className="w-6 h-6" />
                  }
                </div>

                {/* Emoji */}
                <span className="text-2xl shrink-0">{routine.emoji}</span>

                {/* Label + Description */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold truncate ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                    {routine.label}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{routine.description}</div>
                </div>

                {/* XP Badge */}
                <div className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border font-mono flex items-center gap-1 transition ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-500/30 group-hover:bg-amber-500/10'
                }`}>
                  <Zap className="w-2.5 h-2.5" />
                  +{routine.xp} XP
                </div>
              </button>
            );
          })}
        </div>

        {/* All Done Banner */}
        {allDone && isHydrated && (
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border border-amber-500/30 rounded-2xl p-4 text-center animate-fade-in">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-sm font-extrabold text-amber-400">
              {formatMonth(selectedMonth)} FIRE 루틴 완주 달성!
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              모든 루틴을 완료하여 {MAX_XP_PER_MONTH} XP를 획득했습니다. 훌륭합니다!
            </div>
          </div>
        )}
      </section>
    </>
  );
}
