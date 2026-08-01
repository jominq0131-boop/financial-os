'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import Tooltip from '@/components/common/Tooltip';
import ConfettiOverlay from '@/components/common/ConfettiOverlay';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import { ShieldCheck, Award, Flame, Zap, Trophy, Crown, CheckCircle2, Lock } from 'lucide-react';

// Progressive Level Thresholds Table (엔화 JPY 기준 레벨 구간)
const LEVEL_THRESHOLDS = [
  { level: 1, amount: 0, title: '🌱 초보 탐험가 (Financial Novice)' },
  { level: 2, amount: 100000, title: '🌱 저축 입문자 (Savings Starter)' },
  { level: 3, amount: 300000, title: '☘️ 시드머니 탐험가 (Seed Explorer)' },
  { level: 4, amount: 500000, title: '☘️ 50만 자본 입문자 (Half-Millioneer)' },
  { level: 5, amount: 800000, title: '🛡️ 비상금 수호자 (Safety Guardian)' },
  { level: 6, amount: 1200000, title: '🚀 100만 자본가 (Millionaire Novice)' },
  { level: 7, amount: 1700000, title: '🚀 자산 형성가 (Asset Builder)' },
  { level: 8, amount: 2300000, title: '💎 엘리트 자본가 (Elite Builder)' },
  { level: 9, amount: 3000000, title: '💎 300만 자산가 (3M Asset Master)' },
  { level: 10, amount: 4000000, title: '⚡ 자본 아키텍트 (Capital Architect)' },
  { level: 11, amount: 5500000, title: '⚡ 500만 자산가 (5M Asset Master)' },
  { level: 12, amount: 7000000, title: '👑 700만 자본가 (7M Tycoon)' },
  { level: 13, amount: 8500000, title: '👑 은퇴 준비생 (Pre-FIRE Pioneer)' },
  { level: 14, amount: 10000000, title: '🏆 8자리 자본가 (10M Capitalist)' },
  { level: 15, amount: 12500000, title: '🏆 FIRE 쿼터백 (FIRE Quarter Master)' },
  { level: 16, amount: 15000000, title: '👑 파이어 마스터 (FIRE Master)' },
  { level: 17, amount: 18000000, title: '👑 NISA 완주자 (NISA Lifetime Master)' },
  { level: 18, amount: 22000000, title: '⚡ 타이쿤 커맨더 (Tycoon Commander)' },
  { level: 19, amount: 26000000, title: '👑 FIRE 파이오니어 (FIRE Pioneer)' },
  { level: 20, amount: 30000000, title: '👑 파이어 커맨더 (FIRE Commander)' },
];

export default function FinancialLevelCard() {
  const [confettiMsg, setConfettiMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const prevUnlockedRef = useRef<number>(0);
  const isHydrated = useHydrated();
  const { getTotalNetWorth, getNisaTotal, isPrivate } = useAssetStore();
  const { getTotalIncome, getTotalCapitalInflow, getEssentialExpense } = useCashflowStore();
  const { emergencyFundMonths, fireTarget, nisaAnnualLimit } = useSettingsStore();

  const totalNetWorth = getTotalNetWorth();
  const essentialExpense = getEssentialExpense();
  const targetFund = essentialExpense * emergencyFundMonths;
  const currentCash = useAssetStore
    .getState()
    .assets.filter((a) => a.category === 'CASH')
    .reduce((sum, a) => sum + a.amount, 0);

  const nisaTotal = getNisaTotal();

  const totalIncome = getTotalIncome();
  const capitalInflow = getTotalCapitalInflow();
  const surplusRate = totalIncome > 0 ? (capitalInflow / totalIncome) * 100 : 0;

  // Find Current Base Level from Assets
  let baseLevelIndex = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalNetWorth >= LEVEL_THRESHOLDS[i].amount) {
      baseLevelIndex = i;
    } else {
      break;
    }
  }

  const baseLevelObj = LEVEL_THRESHOLDS[baseLevelIndex];
  const nextLevelObj = LEVEL_THRESHOLDS[baseLevelIndex + 1] || {
    level: baseLevelObj.level + 1,
    amount: baseLevelObj.amount + 5000000,
    title: '👑 파이어 마스터 (FIRE Master)',
  };

  const bonusLevel = Math.floor(surplusRate / 25); // 25% 저축률당 +1 레벨
  const currentLevel = Math.min(99, baseLevelObj.level + bonusLevel);

  // Next Level Progress Calculations
  const currentLevelFloorAmount = baseLevelObj.amount;
  const nextLevelTargetAmount = nextLevelObj.amount;
  const levelRange = Math.max(1, nextLevelTargetAmount - currentLevelFloorAmount);
  const currentProgressInLevel = Math.max(0, totalNetWorth - currentLevelFloorAmount);
  const xpPercent = Math.min(100, Math.floor((currentProgressInLevel / levelRange) * 100));

  const remainingForNextLevel = Math.max(0, nextLevelTargetAmount - totalNetWorth);

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
    },
    {
      id: 'quest-nisa',
      icon: <Flame className="w-5 h-5" />,
      title: '신NISA 파이어니어',
      desc: `NISA ${isPrivate ? '••••' : formatJPY(nisaTotal)} / 한도50% ${formatJPYShort(nisaTargetAmount)}`,
      progress: nisaProgress,
      isUnlocked: isNisaCompleted,
    },
    {
      id: 'quest-10m',
      icon: <Award className="w-5 h-5" />,
      title: '8자리 자본가',
      desc: `총자산 ${isPrivate ? '••••' : formatJPY(totalNetWorth)} / 목표 ￥10,000,000`,
      progress: eightFigureProgress,
      isUnlocked: isEightFigureCompleted,
    },
    {
      id: 'quest-fire-quarter',
      icon: <Crown className="w-5 h-5" />,
      title: 'FIRE 쿼터 백',
      desc: `총자산 ${isPrivate ? '••••' : formatJPY(totalNetWorth)} / 은퇴25% ${formatJPYShort(quarterFireTargetAmount)}`,
      progress: quarterFireProgress,
      isUnlocked: isQuarterFireCompleted,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  // Detect newly unlocked quests and trigger confetti
  useEffect(() => {
    if (!isHydrated) return;
    if (unlockedCount > prevUnlockedRef.current && prevUnlockedRef.current > 0) {
      const newlyUnlocked = achievements.find((a, i) => a.isUnlocked && !prevUnlockedRef.current);
      setConfettiMsg('🏆 퀘스트 달성! 축하합니다!');
      setShowConfetti(true);
    }
    prevUnlockedRef.current = unlockedCount;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedCount, isHydrated]);

  return (
    <>
    <ConfettiOverlay
      isVisible={showConfetti}
      message={confettiMsg}
      onComplete={() => setShowConfetti(false)}
    />
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
                {isHydrated ? baseLevelObj.title : '로딩 중...'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              게이밍 재정 랭킹 & FIRE 퀘스트 센터
              <Tooltip content="점진적 자산 레벨 곡선: 초반 10만~20만엔 단위의 성취감 있는 레벨업 구간과, 저축률 보너스(+1Lv)가 연동된 게이밍 성장 시스템입니다." />
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
          <span className="text-zinc-400">📊 자산 형성 레벨</span>
          <span className="font-bold text-white font-mono">
            Lv. {baseLevelObj.level} <span className="text-[10px] text-zinc-400 font-normal">({formatJPY(baseLevelObj.amount)} 달성)</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">🔥 저축률 보너스 레벨</span>
          <span className="font-bold text-amber-400 font-mono">
            +Lv. {bonusLevel} <span className="text-[10px] text-zinc-400 font-normal">(저축률 {surplusRate.toFixed(1)}% / 25%당 +1)</span>
          </span>
        </div>
      </div>

      {/* XP Progress Bar to Next Level */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
          <span className="text-zinc-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            다음 <strong>Lv.{nextLevelObj.level} ({formatJPY(nextLevelObj.amount)})</strong> 달성까지:
          </span>
          <span className="text-emerald-400 font-bold">
            {remainingForNextLevel === 0
              ? '다음 레벨 달성! 🎉'
              : `￥${remainingForNextLevel.toLocaleString()} 남음 (${xpPercent}%)`}
          </span>
        </div>
        <div className="w-full bg-zinc-950 h-3.5 rounded-full overflow-hidden border border-zinc-800/80 p-0.5">
          <div
            className="bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-md"
            style={{ width: `${isHydrated ? xpPercent : 0}%` }}
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
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 해금 완료
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" /> {quest.progress}%
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
    </>
  );
}
