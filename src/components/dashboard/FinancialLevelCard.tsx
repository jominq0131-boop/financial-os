'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import Tooltip from '@/components/common/Tooltip';
import { formatJPY } from '@/utils/currency';
import { ShieldCheck, Award, Flame, Zap, Trophy, Crown, CheckCircle2, Lock } from 'lucide-react';

export default function FinancialLevelCard() {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, getNisaTotal, isPrivate } = useAssetStore();
  const { getTotalIncome, getNetSurplus, getEssentialExpense } = useCashflowStore();
  const { emergencyFundMonths, fireTarget, nisaAnnualLimit } = useSettingsStore();

  const totalNetWorth = getTotalNetWorth();
  const essentialExpense = getEssentialExpense();
  const targetFund = essentialExpense * emergencyFundMonths;
  const currentCash = useAssetStore
    .getState()
    .assets.filter((a) => a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);

  const nisaTotal = getNisaTotal();

  // 게이밍 레벨 및 경험치 연산 (Lv 1 ~ 99)
  // Base calculation: 1 Level per 2M JPY net worth + bonus level from savings rate
  const totalIncome = getTotalIncome();
  const netSurplus = getNetSurplus();
  const surplusRate = totalIncome > 0 ? (netSurplus / totalIncome) * 100 : 0;

  const baseLevel = Math.max(1, Math.floor(totalNetWorth / 2000000) + 1);
  const bonusLevel = Math.floor(surplusRate / 20); // 20% 저축률당 +1 레벨
  const currentLevel = Math.min(99, baseLevel + bonusLevel);

  // 다음 레벨 구간 계산
  const nextLevelAssetTarget = baseLevel * 2000000;
  const nextLevelRemainingJPY = Math.max(0, nextLevelAssetTarget - totalNetWorth);
  const currentXpProgress = Math.min(100, Math.floor(((totalNetWorth % 2000000) / 2000000) * 100));

  // 칭호 결정
  const getTitle = (level: number) => {
    if (level >= 50) return '👑 파이어 커맨더 (FIRE Commander)';
    if (level >= 30) return '⚡ 타이쿤 자본가 (Tycoon Capitalist)';
    if (level >= 20) return '💎 엘리트 아키텍트 (Elite Architect)';
    if (level >= 10) return '🚀 에이스 자본가 (Ace Capitalist)';
    if (level >= 5) return '🛡️ 비상금 수호자 (Safety Guardian)';
    return '🌱 초보 탐험가 (Financial Novice)';
  };

  // 4대 FIRE 퀘스트 업적 검증 및 진척률 연산
  const emergencyProgress = targetFund > 0 ? Math.min(100, Math.round((currentCash / targetFund) * 100)) : 0;
  const nisaTargetAmount = nisaAnnualLimit * 0.5;
  const nisaProgress = nisaTargetAmount > 0 ? Math.min(100, Math.round((nisaTotal / nisaTargetAmount) * 100)) : 0;
  const eightFigureProgress = Math.min(100, Number(((totalNetWorth / 10000000) * 100).toFixed(1)));
  const quarterFireTargetAmount = fireTarget * 0.25;
  const quarterFireProgress = quarterFireTargetAmount > 0 ? Math.min(100, Number(((totalNetWorth / quarterFireTargetAmount) * 100).toFixed(1))) : 0;

  const isEmergencyCompleted = emergencyProgress >= 100;
  const isNisaCompleted = nisaProgress >= 100;
  const isEightFigureCompleted = eightFigureProgress >= 100;
  const isQuarterFireCompleted = quarterFireProgress >= 100;

  const achievements = [
    {
      id: 'quest-emergency',
      icon: <ShieldCheck className="w-5 h-5" />,
      title: '3개월 비상금 완성',
      desc: `현금 ${isPrivate ? '••••' : formatJPY(currentCash)} / 필요 ${formatJPY(targetFund)}`,
      progress: emergencyProgress,
      isUnlocked: isEmergencyCompleted,
      color: 'emerald',
    },
    {
      id: 'quest-nisa',
      icon: <Flame className="w-5 h-5" />,
      title: '신NISA 파이어니어',
      desc: `NISA ${isPrivate ? '••••' : formatJPY(nisaTotal)} / 한도50% ${formatJPY(nisaTargetAmount)}`,
      progress: nisaProgress,
      isUnlocked: isNisaCompleted,
      color: 'purple',
    },
    {
      id: 'quest-10m',
      icon: <Award className="w-5 h-5" />,
      title: '8자리 자본가',
      desc: `총자산 ${isPrivate ? '••••' : formatJPY(totalNetWorth)} / 목표 ￥10,000,000`,
      progress: eightFigureProgress,
      isUnlocked: isEightFigureCompleted,
      color: 'cyan',
    },
    {
      id: 'quest-fire-quarter',
      icon: <Crown className="w-5 h-5" />,
      title: 'FIRE 쿼터 백',
      desc: `총자산 ${isPrivate ? '••••' : formatJPY(totalNetWorth)} / 은퇴25% ${formatJPY(quarterFireTargetAmount)}`,
      progress: quarterFireProgress,
      isUnlocked: isQuarterFireCompleted,
      color: 'amber',
    },
  ];

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/90 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header Level & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-amber-900/30 flex items-center justify-center">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-[10px] text-zinc-400 font-mono">LEVEL</span>
                <span className="text-xl font-extrabold text-white font-mono">
                  {isHydrated ? currentLevel : 1}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black font-black text-[9px] px-1.5 py-0.2 rounded-full border border-amber-300">
              XP
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-mono text-amber-400 font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {isHydrated ? getTitle(currentLevel) : '로딩 중...'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              게이밍 재정 랭킹 & FIRE 퀘스트 센터
              <Tooltip content="총 자산 산출 공식: 기본 자산 레벨 (200만 엔당 +1Lv) + 저축률 보너스 (저축률 20%당 +1Lv)의 합산 레벨입니다." />
            </h3>
          </div>
        </div>

        <div className="text-right sm:border-l sm:border-zinc-800 sm:pl-6">
          <span className="text-xs text-zinc-400 font-mono block">해금된 FIRE 퀘스트</span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">
            {unlockedCount} / {achievements.length} Badges
          </span>
        </div>
      </div>

      {/* Transparent Level Breakdown Formula Box */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-zinc-800/80 pb-2 sm:pb-0 sm:pr-4">
          <span className="text-zinc-400">📊 기본 자산 레벨</span>
          <span className="font-bold text-white font-mono">
            Lv. {baseLevel} <span className="text-[10px] text-zinc-400 font-normal">(200만엔 구간당 +1)</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">🔥 저축률 보너스 레벨</span>
          <span className="font-bold text-amber-400 font-mono">
            +Lv. {bonusLevel} <span className="text-[10px] text-zinc-400 font-normal">(저축률 {surplusRate.toFixed(1)}% / 20%당 +1)</span>
          </span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-zinc-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            다음 레벨(Lv.{currentLevel + 1})까지 필요한 총자산:
            <strong className="text-white font-mono">
              {isPrivate ? '••••••••' : formatJPY(nextLevelRemainingJPY)} 남음
            </strong>
          </span>
          <span className="text-amber-400 font-bold">{isHydrated ? currentXpProgress : 0}%</span>
        </div>
        <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800/80 p-0.5">
          <div
            className="bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-md"
            style={{ width: `${isHydrated ? currentXpProgress : 0}%` }}
          />
        </div>
      </div>

      {/* 4 FIRE Quest Badges with Explicit Progress Bars */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          FIRE 4대 메인 퀘스트 달성 현황
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {achievements.map((quest) => (
            <div
              key={quest.id}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                quest.isUnlocked
                  ? 'bg-zinc-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
                  : 'bg-zinc-950/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-xl ${
                    quest.isUnlocked
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {quest.icon}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    quest.isUnlocked
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {quest.isUnlocked ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> 해금 완료
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" /> 잠김 ({quest.progress}%)
                    </>
                  )}
                </span>
              </div>
              <h5 className="text-xs font-bold text-white mb-1">{quest.title}</h5>
              <p className="text-[11px] text-zinc-400 leading-tight mb-2.5">{quest.desc}</p>

              {/* Progress bar */}
              <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800/80">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    quest.isUnlocked ? 'bg-emerald-400' : 'bg-amber-500/70'
                  }`}
                  style={{ width: `${quest.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
