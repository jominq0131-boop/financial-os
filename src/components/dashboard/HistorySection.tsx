'use client';

import React, { useRef } from 'react';
import { useHistoryStore } from '@/store/useHistoryStore';
import { useAssetStore } from '@/store/useAssetStore';
import { useCashflowStore } from '@/store/useCashflowStore';
import { useTimelineStore } from '@/store/useTimelineStore';
import { useSnapshotStore } from '@/store/useSnapshotStore';
import { useMonthlySpendingStore } from '@/store/useMonthlySpendingStore';
import { useRoutineStore } from '@/store/useRoutineStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useHydrated } from '@/hooks/useHydrated';
import Tooltip from '@/components/common/Tooltip';
import { History, Download, Upload, Trash2, Clock, Activity } from 'lucide-react';

export default function HistorySection() {
  const isHydrated = useHydrated();
  const { logs, clearHistory } = useHistoryStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatTimestamp = (iso: string) => {
    if (!isHydrated) return iso.slice(0, 10);
    try {
      const date = new Date(iso);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  // Export JSON Backup (Full All Stores Backup)
  const handleExportData = () => {
    const backupData = {
      version: '1.2.0',
      exportedAt: new Date().toISOString(),
      assets: useAssetStore.getState().assets,
      cashflow: useCashflowStore.getState().items,
      timeline: useTimelineStore.getState().events,
      history: useHistoryStore.getState().logs,
      snapshots: useSnapshotStore.getState().snapshots,
      spendingRecords: useMonthlySpendingStore.getState().records,
      routineRecords: useRoutineStore.getState().records,
      settings: {
        currentAge: useSettingsStore.getState().currentAge,
        emergencyFundMonths: useSettingsStore.getState().emergencyFundMonths,
        useIdeCo: useSettingsStore.getState().useIdeCo,
        fireTarget: useSettingsStore.getState().fireTarget,
        nisaAnnualLimit: useSettingsStore.getState().nisaAnnualLimit,
      },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.assets) useAssetStore.setState({ assets: data.assets });
        if (data.cashflow) useCashflowStore.setState({ items: data.cashflow });
        if (data.timeline) useTimelineStore.setState({ events: data.timeline });
        if (data.history) useHistoryStore.setState({ logs: data.history });
        if (data.snapshots) useSnapshotStore.setState({ snapshots: data.snapshots });
        if (data.spendingRecords) useMonthlySpendingStore.setState({ records: data.spendingRecords });
        if (data.routineRecords) useRoutineStore.setState({ records: data.routineRecords });
        if (data.settings) {
          useSettingsStore.getState().updateSettings(data.settings);
        }

        useHistoryStore.getState().addLog({
          type: 'SYSTEM',
          action: 'ADD',
          title: '전체 데이터 백업 복원 완료',
          detail: '스냅샷, 지출 기록, FIRE 루틴을 포함한 전체 데이터가 정상 복원되었습니다.',
        });

        alert('모든 백업 데이터(스냅샷, 지출기록, 루틴 포함) 복원이 완료되었습니다.');
      } catch (err) {
        alert('올바른 백업 JSON 파일 형식이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'ADD':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'UPDATE':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'DELETE':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const displayLogs = isHydrated ? logs : [];

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            자산 변동 누적 히스토리 & 데이터 관리
            <Tooltip content="자산 및 현금흐름의 변경 활동이 시간에 따라 자동 누적 기록되며, 현재 전체 재정 상태를 JSON 백업 파일로 내보내거나 복원할 수 있습니다." />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            자산/현금흐름 변경 이력이 자동으로 기록되며, 로컬 저장 및 백업이 지원됩니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportData}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            데이터 복원 (Import)
          </button>

          <button
            onClick={handleExportData}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/30 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            백업 저장 (Export)
          </button>
        </div>
      </div>

      {/* History Log Feed */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            누적 활동 기록 ({displayLogs.length}건)
          </span>

          {displayLogs.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-zinc-400 hover:text-rose-400 transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> 기록 비우기
            </button>
          )}
        </div>

        {displayLogs.length === 0 ? (
          <div className="text-center py-8 text-zinc-400 text-sm">
            아직 기록된 자산 변동 히스토리가 없습니다.
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {displayLogs.map((log) => (
              <div
                key={log.id}
                className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getActionBadge(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(log.timestamp)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{log.title}</h4>
                  <p className="text-xs text-zinc-400">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
