'use client';

import React from 'react';
import { NavTab } from './Sidebar';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import { formatJPY, formatJPYShort } from '@/utils/currency';
import { Menu, ShieldCheck, Settings, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onOpenMobileSidebar: () => void;
  onOpenSettings: () => void;
}

const TAB_TITLES: Record<NavTab, { title: string; subtitle: string }> = {
  overview: {
    title: '관제 요약 (Mission Control)',
    subtitle: '전체 자산, 3개월 비상금, 50년 시뮬레이션 핵심 관제',
  },
  assets: {
    title: '자산 포트폴리오 & 현금흐름',
    subtitle: '자산 개별 잔액, 월 현금흐름 탱크, 3-Tier 자본 배치',
  },
  intelligence: {
    title: '세제 혜택 & FIRE 목표 플래너',
    subtitle: '신NISA 한도, 세후 실수익 시뮬레이션, 생애 주기 마일스톤',
  },
  security: {
    title: '스냅샷 & 로컬 보안 (Snapshots & Security)',
    subtitle: '월간 총자산 스냅샷, 위기 테스트, 데이터 백업/복원',
  },
};

export default function Header({
  activeTab,
  onOpenMobileSidebar,
  onOpenSettings,
}: HeaderProps) {
  const isHydrated = useHydrated();
  const { getTotalNetWorth, isPrivate, togglePrivacy } = useAssetStore();
  const currentNetWorth = getTotalNetWorth();

  const currentTabInfo = TAB_TITLES[activeTab];

  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          title="메뉴 열기"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
            {currentTabInfo.title}
          </h1>
          <p className="text-xs text-zinc-400 hidden sm:block">
            {currentTabInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right Stats & Quick Actions */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="text-[10px] text-zinc-400 font-mono block">현재 총자산</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">
            {!isHydrated ? '￥ 0' : isPrivate ? '￥ ••••••••' : formatJPY(currentNetWorth)}
          </span>
        </div>

        <button
          onClick={togglePrivacy}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
          title="마스킹 토글"
        >
          {isPrivate ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
          title="재정 설정"
        >
          <Settings className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </header>
  );
}
