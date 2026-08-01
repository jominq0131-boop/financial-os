'use client';

import React from 'react';
import { useAssetStore } from '@/store/useAssetStore';
import { useHydrated } from '@/hooks/useHydrated';
import {
  LayoutDashboard,
  Wallet,
  Target,
  ShieldCheck,
  Eye,
  EyeOff,
  Settings,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';

export type NavTab = 'overview' | 'assets' | 'intelligence' | 'security';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSettings: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
  onOpenSettings,
}: SidebarProps) {
  const isHydrated = useHydrated();
  const { isPrivate, togglePrivacy, resetToDefault } = useAssetStore();

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'overview',
      label: '관제 요약 (Overview)',
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'assets',
      label: '자산 & 현금흐름',
      icon: <Wallet className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: 'intelligence',
      label: '세제 & FIRE 플래너',
      icon: <Target className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'security',
      label: '성장이력 & 보안',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    },
  ];

  const content = (
    <div className="flex flex-col h-full justify-between p-4 bg-zinc-950 border-r border-zinc-800/80 text-zinc-300">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-black text-xs shadow-lg shadow-emerald-900/30">
              FOS
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Financial OS
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    JP
                  </span>
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono">Mission Control v1.3</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
            title={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80 border border-transparent'
                }`}
                title={item.label}
              >
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Action Controls */}
      <div className="space-y-2 pt-4 border-t border-zinc-800/80">
        {/* Privacy Toggle */}
        <button
          onClick={togglePrivacy}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-300 hover:text-white transition"
          title="금액 마스킹 모드"
        >
          <div className="flex items-center gap-2">
            {isPrivate ? (
              <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            {!isCollapsed && <span>{isPrivate ? '마스킹 켜짐' : '금액 노출'}</span>}
          </div>
        </button>

        {/* Settings Modal Toggle */}
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-300 hover:text-white transition"
          title="재정 관제 설정"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-400 shrink-0" />
            {!isCollapsed && <span>재정 설정</span>}
          </div>
        </button>

        {/* Reset Sample Data */}
        <button
          onClick={resetToDefault}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-400 hover:text-zinc-200 transition"
          title="샘플 데이터 리셋"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            {!isCollapsed && <span>샘플 복원</span>}
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 transition-transform duration-300 md:hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>
    </>
  );
}
