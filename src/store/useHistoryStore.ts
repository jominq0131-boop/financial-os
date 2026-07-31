import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HistoryLog {
  id: string;
  timestamp: string; // ISO String
  type: 'ASSET' | 'CASHFLOW' | 'TIMELINE' | 'SYSTEM';
  action: 'ADD' | 'UPDATE' | 'DELETE' | 'RESET';
  title: string;
  detail: string;
}

interface HistoryStore {
  logs: HistoryLog[];
  addLog: (log: Omit<HistoryLog, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      logs: [
        {
          id: 'log-init',
          timestamp: new Date().toISOString(),
          type: 'SYSTEM',
          action: 'ADD',
          title: 'Financial OS 초기화',
          detail: '일본 거주 한국인 맞춤형 자산 관리 시스템이 시작되었습니다.',
        },
      ],
      addLog: (newLog) => {
        const log: HistoryLog = {
          ...newLog,
          id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({ logs: [log, ...state.logs] }));
      },
      clearHistory: () => set({ logs: [] }),
    }),
    {
      name: 'financial-os-history',
    }
  )
);
